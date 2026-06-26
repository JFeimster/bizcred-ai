import { loadFromStorage, saveToStorage } from './storage.js';

let templates = [];

export async function loadTemplates() {
  try {
    const response = await fetch('data/prompt-templates.json');
    if (!response.ok) throw new Error('Failed to load templates');
    templates = await response.json();
    return templates;
  } catch (error) {
    console.error('Error loading prompt templates:', error);
    return [];
  }
}

export function generatePrompt(templateId, dataContext) {
  const templateObj = templates.find(t => t.id === templateId);
  if (!templateObj) return '';

  let promptText = templateObj.template;

  // Replace placeholders
  const placeholders = promptText.match(/{{(.*?)}}/g) || [];

  placeholders.forEach(placeholder => {
    const key = placeholder.replace('{{', '').replace('}}', '').trim();
    let value = dataContext[key];

    // Fallback for missing/undefined values
    if (value === undefined || value === null || value === '') {
      value = '[Not provided]';
    }

    // Format booleans
    if (typeof value === 'boolean') {
      value = value ? 'Yes' : 'No';
    }

    // Format arrays/objects to string
    if (typeof value === 'object') {
       if (Array.isArray(value)) {
           if(value.length === 0) value = 'None';
           else value = value.join('\n- ');
       } else {
           value = JSON.stringify(value);
       }
    }

    promptText = promptText.replace(placeholder, value);
  });

  return promptText;
}

export function savePromptHistory(promptText, title) {
  const history = loadFromStorage('PROMPTS', []);
  history.unshift({
    title,
    prompt: promptText,
    date: new Date().toISOString()
  });
  // Keep last 50
  if (history.length > 50) history.pop();
  saveToStorage('PROMPTS', history);
}
