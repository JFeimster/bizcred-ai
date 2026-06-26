const KEYS = {
  PROFILE: 'bizcred_profile_v1',
  TASKS: 'bizcred_tasks_v1',
  VENDORS: 'bizcred_vendor_tracker_v1',
  PROMPTS: 'bizcred_prompt_history_v1',
  SCORES: 'bizcred_score_history_v1'
};

export function saveToStorage(keyName, data) {
  try {
    const key = KEYS[keyName];
    if (!key) throw new Error(`Invalid storage key: ${keyName}`);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to storage (${keyName}):`, error);
  }
}

export function loadFromStorage(keyName, defaultValue = null) {
  try {
    const key = KEYS[keyName];
    if (!key) throw new Error(`Invalid storage key: ${keyName}`);
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading from storage (${keyName}):`, error);
    return defaultValue;
  }
}

export function exportAllData() {
  const data = {};
  for (const [name, key] of Object.entries(KEYS)) {
    const item = localStorage.getItem(key);
    if (item) {
      data[key] = JSON.parse(item);
    }
  }
  return data;
}

export function importAllData(data) {
  try {
    for (const [name, key] of Object.entries(KEYS)) {
      if (data[key]) {
        localStorage.setItem(key, JSON.stringify(data[key]));
      }
    }
    return true;
  } catch (error) {
    console.error("Error importing data:", error);
    return false;
  }
}

export function resetAllData() {
  for (const key of Object.values(KEYS)) {
    localStorage.removeItem(key);
  }
}
