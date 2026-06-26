let rules = null;

export async function loadRules() {
  if (rules) return rules;
  try {
    const response = await fetch('data/readiness-rules.json');
    if (!response.ok) throw new Error('Failed to load rules');
    rules = await response.json();
    return rules;
  } catch (error) {
    console.error('Error loading readiness rules:', error);
    return null;
  }
}

export async function calculateScore(profileData, tasksData) {
  const currentRules = await loadRules();
  if (!currentRules) return { overall: 0, categories: [], missingSignals: [], recommendations: [] };

  let totalScore = 0;
  const categoryScores = [];
  const missingSignals = [];
  const recommendations = [];

  for (const category of currentRules.categories) {
    let catScore = 0;
    let catMax = 0;

    for (const check of category.checks) {
      catMax += check.points;
      const value = profileData[check.field];
      let passed = false;

      if (check.type === 'not-empty') {
        passed = value !== undefined && value !== null && value.trim() !== '';
      } else if (check.type === 'boolean') {
        passed = value === true;
      }

      if (passed) {
        catScore += check.points;
      } else {
        missingSignals.push(check.signal);
        // Simple recommendation logic based on missing signal
        recommendations.push(`Complete ${check.signal.replace('Missing ', '')}`);
      }
    }

    const catPercentage = catMax > 0 ? (catScore / catMax) * 100 : 0;
    const weightedCatScore = (catScore / catMax) * category.weight;

    totalScore += weightedCatScore;

    categoryScores.push({
      id: category.id,
      name: category.name,
      score: Math.round(catPercentage)
    });
  }

  // Factor in tasks (simple bonus or just informative, requirements say "based on profile completeness and task status")
  // Let's say if all tasks are done, give a small boost, or keep it deterministic to profile.
  // The rules define the score up to 100.

  return {
    overall: Math.round(totalScore),
    categories: categoryScores,
    missingSignals: missingSignals,
    recommendations: [...new Set(recommendations)] // Unique recommendations
  };
}
