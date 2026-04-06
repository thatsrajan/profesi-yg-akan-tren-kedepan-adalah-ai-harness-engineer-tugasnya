const skills = [
  ['Prompt design', 'Write prompts that constrain agents and tasks'],
  ['Context engineering', 'Manage memory, retrieval, and tool context'],
  ['Workflow orchestration', 'Design agent handoffs and retries'],
  ['Eval design', 'Measure quality with scorecards and fixtures'],
  ['Ops and observability', 'Debug logs, queues, and failure modes'],
];
const skillsEl = document.getElementById('skills');
skills.forEach(([name, desc], index) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'skill';
  wrapper.innerHTML = `<label><span><strong>${name}</strong><br><span class="pill">${desc}</span></span><input type="range" min="1" max="5" value="3" data-index="${index}" /></label>`;
  skillsEl.appendChild(wrapper);
});

document.getElementById('generate').addEventListener('click', () => {
  const values = [...document.querySelectorAll('input[type="range"]')].map(input => Number(input.value));
  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  document.getElementById('score').innerHTML = `<div class="score"><strong>Readiness score:</strong> ${avg.toFixed(1)} / 5<br>Focus first on the lowest-scoring areas.</div>`;
  const ordered = skills.map(([name, desc], index) => ({ name, desc, score: values[index] })).sort((a, b) => a.score - b.score);
  const plan = [
    `Week 1: sharpen ${ordered[0].name.toLowerCase()} with one small harness you can ship locally.`,
    `Week 2: add instrumentation so you can observe failures in ${ordered[1].name.toLowerCase()}.`,
    `Week 3: write an eval set for the workflow and compare baseline vs improved results.`,
    `Week 4: package the workflow into a reusable template and demo it to one real user.`
  ];
  document.getElementById('plan').innerHTML = plan.map(item => `<li>${item}</li>`).join('');
});
