import { loadFromStorage, saveToStorage, exportAllData, importAllData, resetAllData } from './storage.js';
import { calculateScore } from './readiness-engine.js';
import { loadTemplates, generatePrompt, savePromptHistory } from './prompt-builder.js';

let setupTasks = [];
let vendorRegistry = [];

async function initDashboard() {
  await loadDataFiles();
  populateProfileForm();
  renderChecklist();
  updateDashboard();
  setupEventListeners();
}

async function loadDataFiles() {
  try {
    const tasksRes = await fetch('data/setup-tasks.json');
    if (tasksRes.ok) setupTasks = await tasksRes.json();

    const vendorRes = await fetch('data/credit-vendors.registry.json');
    if (vendorRes.ok) vendorRegistry = await vendorRes.json();
  } catch (error) {
    console.error('Error loading static data:', error);
  }
}

// --- Profile Management ---

function populateProfileForm() {
  const profile = loadFromStorage('PROFILE', {});
  const form = document.getElementById('profile-form');
  if (!form) return;

  Object.keys(profile).forEach(key => {
    const el = form.elements[key];
    if (el) {
      if (el.type === 'checkbox') el.checked = profile[key];
      else el.value = profile[key];
    }
  });
}

function handleProfileSave(e) {
  e.preventDefault();
  const form = e.target;
  const profile = {};

  for (let el of form.elements) {
    if (el.name) {
      profile[el.name] = el.type === 'checkbox' ? el.checked : el.value;
    }
  }

  saveToStorage('PROFILE', profile);
  updateDashboard();

  const btn = form.querySelector('button[type="submit"]');
  const oldText = btn.innerText;
  btn.innerText = 'Saved!';
  setTimeout(() => btn.innerText = oldText, 2000);
}

// --- Checklist Management ---

function renderChecklist() {
  const container = document.getElementById('checklist-container');
  const filterSelect = document.getElementById('task-category-filter');
  if (!container) return;

  const savedTasks = loadFromStorage('TASKS', {});
  const filterVal = filterSelect ? filterSelect.value : 'all';

  // Populate filter options if needed
  if (filterSelect && filterSelect.options.length === 1) {
    const categories = new Set(setupTasks.map(t => t.category));
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      filterSelect.appendChild(opt);
    });
  }

  container.innerHTML = '';
  const filteredTasks = filterVal === 'all' ? setupTasks : setupTasks.filter(t => t.category === filterVal);

  filteredTasks.forEach(task => {
    const isCompleted = savedTasks[task.id] === true;

    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${isCompleted ? 'completed' : ''}`;
    taskDiv.innerHTML = `
      <div class="task-header">
        <label class="task-label">
          <input type="checkbox" class="task-checkbox" data-id="${task.id}" ${isCompleted ? 'checked' : ''}>
          <strong>${task.title}</strong>
        </label>
        <span class="status-chip chip-cyan" style="font-size:0.65rem;">${task.priority}</span>
      </div>
      <div class="task-details">
        <p>${task.description}</p>
        <p><em>Why it matters:</em> ${task.whyItMatters}</p>
        <p><strong>Next step:</strong> ${task.suggestedNextStep}</p>
      </div>
    `;
    container.appendChild(taskDiv);
  });

  // Bind checkbox events
  document.querySelectorAll('.task-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-id');
      const currentTasks = loadFromStorage('TASKS', {});
      currentTasks[id] = e.target.checked;
      saveToStorage('TASKS', currentTasks);

      const item = e.target.closest('.task-item');
      if(e.target.checked) item.classList.add('completed');
      else item.classList.remove('completed');

      updateDashboard();
    });
  });
}

// --- Dashboard Updates & Score ---

async function updateDashboard() {
  const profile = loadFromStorage('PROFILE', {});
  const tasks = loadFromStorage('TASKS', {});

  const scoreData = await calculateScore(profile, tasks);

  const overallEl = document.getElementById('overall-score');
  if (overallEl) overallEl.textContent = scoreData.overall;

  const detailsEl = document.getElementById('score-details');
  if (detailsEl) {
    detailsEl.innerHTML = scoreData.categories.map(c => `
      <div class="meter-row">
        <span>${c.name}</span>
        <b>${c.score}%</b>
      </div>
      <div class="meter"><span style="width: ${c.score}%"></span></div>
    `).join('');
  }

  const insightsEl = document.getElementById('score-insights');
  if (insightsEl) {
    let html = '';
    if (scoreData.missingSignals.length > 0) {
      html += `<h4>Missing Signals:</h4><ul>`;
      html += scoreData.missingSignals.map(s => `<li>${s}</li>`).join('');
      html += `</ul>`;
    }

    // Also include a few next steps from checklist
    const incompleteTasks = setupTasks.filter(t => !tasks[t.id]).slice(0, 3);
    if (incompleteTasks.length > 0) {
      html += `<h4>Next Moves:</h4><ul>`;
      html += incompleteTasks.map(t => `<li>${t.title}</li>`).join('');
      html += `</ul>`;
    }
    insightsEl.innerHTML = html;
  }
}

// --- Prompt Builder ---

async function setupPromptBuilder() {
  const select = document.getElementById('prompt-template');
  if (!select) return;

  const templates = await loadTemplates();
  templates.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.id;
    opt.textContent = t.title;
    select.appendChild(opt);
  });

  select.addEventListener('change', async (e) => {
    const id = e.target.value;
    const output = document.getElementById('generated-prompt');
    if (!id) {
      output.value = '';
      return;
    }

    const profile = loadFromStorage('PROFILE', {});
    const tasks = loadFromStorage('TASKS', {});
    const vendors = loadFromStorage('VENDORS', {});
    const scoreData = await calculateScore(profile, tasks);

    // Format incomplete tasks
    const incompleteTitles = setupTasks.filter(t => !tasks[t.id]).map(t => `- ${t.title}`);

    // Format vendor status
    let vendorStatusArr = [];
    Object.keys(vendors).forEach(vid => {
        const vendor = vendorRegistry.find(v => v.id === vid);
        const vName = vendor ? vendor.name : vid;
        if(vendors[vid] !== 'not_started') {
            vendorStatusArr.push(`- ${vName}: ${vendors[vid]}`);
        }
    });

    const dataContext = {
      ...profile,
      overallScore: scoreData.overall,
      scoreDetails: scoreData.categories.map(c => `- ${c.name}: ${c.score}%`).join('\n'),
      incompleteTasks: incompleteTitles.length > 0 ? incompleteTitles.join('\n') : 'None',
      vendorStatus: vendorStatusArr.length > 0 ? vendorStatusArr.join('\n') : 'No active vendors tracked.'
    };

    const promptText = generatePrompt(id, dataContext);
    output.value = promptText;
  });

  document.getElementById('copy-prompt-btn')?.addEventListener('click', async (e) => {
     const output = document.getElementById('generated-prompt');
     if(!output.value) return;
     try {
       await navigator.clipboard.writeText(output.value);
       const btn = e.target;
       const oldText = btn.innerText;
       btn.innerText = "Copied!";
       setTimeout(() => btn.innerText = oldText, 2000);
     } catch (err) {
       console.error("Failed to copy", err);
     }
  });

  document.getElementById('save-prompt-btn')?.addEventListener('click', (e) => {
    const output = document.getElementById('generated-prompt').value;
    const select = document.getElementById('prompt-template');
    const title = select.options[select.selectedIndex]?.text || 'Saved Prompt';
    if(!output) return;

    savePromptHistory(output, title);
    const btn = e.target;
    const oldText = btn.innerText;
    btn.innerText = "Saved!";
    setTimeout(() => btn.innerText = oldText, 2000);
  });
}

// --- Data Management ---

function setupDataManagement() {
  document.getElementById('export-data-btn')?.addEventListener('click', () => {
    const data = exportAllData();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "bizcred-backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });

  document.getElementById('import-data-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (importAllData(data)) {
          alert('Data imported successfully!');
          window.location.reload();
        } else {
          alert('Failed to import data.');
        }
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('reset-data-btn')?.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all local data? This cannot be undone.")) {
      resetAllData();
      window.location.reload();
    }
  });
}

// --- Setup ---

function setupEventListeners() {
  document.getElementById('profile-form')?.addEventListener('submit', handleProfileSave);
  document.getElementById('task-category-filter')?.addEventListener('change', renderChecklist);

  setupPromptBuilder();
  setupDataManagement();
}

// Boot
if (document.getElementById('profile-form')) {
  initDashboard();
}
