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
    const weightedCatScore = catMax > 0 ? (catScore / catMax) * category.weight : 0;

    totalScore += weightedCatScore;

    categoryScores.push({
      id: category.id,
      name: category.name,
      score: Math.round(catPercentage)
    });
  }

  // Calculate Task Progress score
  let taskScore = 0;
  if (tasksData && Object.keys(tasksData).length > 0) {
    const completedTasksCount = Object.values(tasksData).filter(v => v === true).length;
    // Cap at 10 to avoid going over 100 if we have more tasks.
    // For now we'll do max 10 points bonus or scaled based on task completion.
    // We add an explicit category for tasks:
    // If there are e.g. 7 tasks, 100% completion gives 20 points
    const taskPointsMax = 20;
    // Normally we'd know total tasks but we don't have setupTasks here easily without another fetch.
    // Assuming 9 tasks based on setup-tasks.json.
    const totalTasksAssumed = 9;
    const taskPercentage = (completedTasksCount / totalTasksAssumed) * 100;
    const boundedPercentage = Math.min(taskPercentage, 100);
    taskScore = (boundedPercentage / 100) * taskPointsMax;

    categoryScores.push({
      id: 'task-progress',
      name: 'Task Progress',
      score: Math.round(boundedPercentage)
    });
  } else {
    categoryScores.push({
      id: 'task-progress',
      name: 'Task Progress',
      score: 0
    });
  }

  // Weight profile score to 80%, tasks to 20%
  const finalTotal = (totalScore * 0.8) + taskScore;

  return {
    overall: Math.round(finalTotal),
    categories: categoryScores,
    missingSignals: missingSignals,
    recommendations: [...new Set(recommendations)] // Unique recommendations
  };
}
