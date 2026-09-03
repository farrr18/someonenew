const subjects = [
  {name:'Mathematics', score:72, strong:'Algebra', weak:'Quadratic Equations', next:'Quadratic Equation Basics'},
  {name:'Physics', score:64, strong:'Kinematics', weak:'Newton’s Laws', next:'Free Body Diagrams'},
  {name:'Chemistry', score:81, strong:'Stoichiometry', weak:'Equilibrium', next:'Le Chatelier Principle'}
];

const questions = [
  {id:1, subject:'Mathematics', topic:'Quadratic Equations', difficulty:'Medium', text:'What are the solutions of x² − 5x + 6 = 0?', options:['x = 1 or 6','x = 2 or 3','x = −2 or −3','x = 5 or 6'], answer:1, feedback:'You identified the equation correctly, but the factor pair must multiply to +6 and sum to −5. The correct pair is −2 and −3.'},
  {id:2, subject:'Physics', topic:'Newton’s Laws', difficulty:'Medium', text:'A 2 kg object accelerates at 3 m/s². What is the net force?', options:['0.67 N','1.5 N','6 N','9 N'], answer:2, feedback:'Use F = m × a. Multiply 2 kg by 3 m/s² to get 6 N.'},
  {id:3, subject:'Chemistry', topic:'Equilibrium', difficulty:'Easy', text:'For a reversible reaction at equilibrium, which statement is true?', options:['Forward reaction stops','Reverse reaction stops','Forward and reverse rates are equal','All reactants are consumed'], answer:2, feedback:'At dynamic equilibrium, both reactions continue, but their rates are equal.'}
];

let state = {diagnosticDone:false, scores:[...subjects.map(s=>s.score)], selectedQuestion:null, practiceIndex:0, practiceAnswered:false};

const el = id => document.getElementById(id);
function showToast(msg){const t=el('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2200)}
function avg(){return Math.round(state.scores.reduce((a,b)=>a+b,0)/state.scores.length)}
function renderDashboard(){
  el('view-dashboard').innerHTML = `
    <div class="card hero"><div class="hero-inner">
      <div class="eyebrow">YOUR NEXT BEST LEARNING MOVE</div>
      <h2>Turn mistakes into a personalized path forward.</h2>
      <p>EduReach AI analyzes your diagnostic performance, identifies concept gaps, and recommends the next lesson instead of giving every learner the same path.</p>
      <div class="hero-actions"><button class="btn btn-primary" onclick="navigate('diagnostic')">Start AI Diagnostic</button><button class="btn btn-ghost" onclick="navigate('path')">View Learning Path</button></div>
    </div></div>

    <div class="grid grid-4" style="margin-top:18px">
      <div class="card metric"><div class="label">Learning Score</div><div class="value accent">${avg()}%</div><div class="sub">+8% this week</div></div>
      <div class="card metric"><div class="label">Concepts Mastered</div><div class="value">14</div><div class="sub">Across 3 subjects</div></div>
      <div class="card metric"><div class="label">Practice Streak</div><div class="value">6 <span style="font-size:15px">days</span></div><div class="sub">Keep it going</div></div>
      <div class="card metric"><div class="label">AI Recommendations</div><div class="value">4</div><div class="sub">Personalized for you</div></div>
    </div>

    <div class="section-head"><div><h2>Your learning profile</h2><p>What EduReach currently understands about your learning.</p></div><button class="link-btn" onclick="navigate('insights')">Open AI Insights →</button></div>
    <div class="card pad"><div class="profile"><div class="ring"><div class="ring-center"><div class="ring-value">72%</div><div class="ring-label">overall mastery</div></div></div><div><div class="eyebrow">AI-GENERATED SUMMARY</div><h3 style="font-family:'Space Grotesk';margin:0;font-size:22px;letter-spacing:-.04em">You learn fastest with targeted practice.</h3><div class="tags"><span class="tag">Algebra</span><span class="tag">Kinematics</span><span class="tag">Stoichiometry</span><span class="tag weak">Quadratic Equations · Needs focus</span></div><div class="feature-list"><div class="feature"><strong>Best next step</strong><span>Quadratic Equation Basics · 12 min</span></div><div class="feature"><strong>AI confidence</strong><span>High · based on recent diagnostic</span></div><div class="feature"><strong>Study mode</strong><span>Low-bandwidth optimized</span></div></div></div></div></div>

    <div class="section-head"><div><h2>Subject performance</h2><p>Diagnostic signals across your current learning scope.</p></div></div>
    <div class="subjects">${subjects.map((s,i)=>`<div class="subject"><div class="subject-top"><span class="subject-name">${s.name}</span><span class="percent">${state.scores[i]}%</span></div><div class="bar"><span style="width:${state.scores[i]}%"></span></div><div class="subject-foot"><span>Strong: ${s.strong}</span><span>Focus: ${s.weak}</span></div></div>`).join('')}</div>

    <div class="section-head"><div><h2>Recent learning activity</h2><p>Simple progress signals, not noisy gamification.</p></div></div>
    <div class="card pad"><div class="timeline">
      <div class="timeline-row"><span class="timeline-dot done"></span><div><div class="t-title">Completed “Linear Motion”</div><div class="t-meta">Physics · 18 min ago</div></div><span class="pill">+6 mastery</span></div>
      <div class="timeline-row"><span class="timeline-dot current"></span><div><div class="t-title">Recommended: Quadratic Equations</div><div class="t-meta">Mathematics · 12 min · AI selected</div></div><span class="pill active">Next</span></div>
      <div class="timeline-row"><span class="timeline-dot"></span><div><div class="t-title">Equilibrium practice set</div><div class="t-meta">Chemistry · 8 questions</div></div><span class="pill">Upcoming</span></div>
    </div></div>
  `;
}

function renderDiagnostic(){
  const qs = questions;
  el('view-diagnostic').innerHTML = `<div class="section-head" style="margin-top:0"><div><h2>AI Diagnostic Assessment</h2><p>3 questions are enough for this prototype to demonstrate adaptive profiling.</p></div><span class="pill active">Demo · 3 questions</span></div>
  <div class="card pad form-card"><div class="callout"><strong>Why diagnostic first?</strong><p>EduReach should understand a learner’s gaps before recommending content. In the hackathon version, this pipeline becomes the core AI innovation.</p></div>
  ${qs.map((q,idx)=>`<div class="question" id="q-${q.id}"><div class="q-head"><span>Question ${idx+1} · ${q.subject}</span><span>${q.difficulty}</span></div><h3>${q.text}</h3><div class="choices">${q.options.map((o,i)=>`<button class="choice" data-q="${q.id}" data-o="${i}" onclick="selectDiagnostic(${q.id},${i})">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}</div><div class="feedback" id="f-${q.id}"></div></div>`).join('')}
  <div style="margin-top:18px;display:flex;gap:10px;align-items:center"><button class="btn btn-accent" onclick="finishDiagnostic()">Analyze My Learning Profile</button><span id="diagStatus" class="mini">Choose an answer for each question.</span></div></div>`;
}

let diagAnswers={};
function selectDiagnostic(qid,idx){diagAnswers[qid]=idx;document.querySelectorAll(`[data-q="${qid}"]`).forEach(b=>b.classList.remove('selected'));document.querySelector(`[data-q="${qid}"][data-o="${idx}"]`).classList.add('selected')}
function finishDiagnostic(){
  if(Object.keys(diagAnswers).length<questions.length){showToast('Answer all diagnostic questions first.');return}
  let correct=0; questions.forEach(q=>{if(diagAnswers[q.id]===q.answer)correct++});
  const base=Math.round((correct/questions.length)*100); state.scores=[Math.min(100,base+10),Math.min(100,base),Math.min(100,base+20)]; state.diagnosticDone=true;
  questions.forEach(q=>{const ok=diagAnswers[q.id]===q.answer;const c=document.querySelector(`[data-q="${q.id}"][data-o="${diagAnswers[q.id]}"]`);c.classList.add(ok?'correct':'wrong');const f=el('f-'+q.id);f.textContent=ok?'Correct. Strong signal for this concept.':'AI Error Analysis: '+q.feedback;f.classList.add('show')});
  el('diagStatus').textContent=`Profile analyzed · ${correct}/${questions.length} correct · learning path updated`;
  showToast('AI learning profile updated.');renderDashboard();
}

function renderPath(){
  const steps=[
    ['1','Diagnostic Profile','Baseline skills captured from your recent responses.','done','Completed'],
    ['2','Quadratic Equation Basics','Repair the exact misconception detected in your answers.','current','12 min'],
    ['3','Guided Practice','6 questions dynamically selected around the weak concept.','','10 min'],
    ['4','Mastery Check','Short assessment to verify the concept is stable.','','8 min'],
    ['5','Next Concept','AI will choose the next topic from your mastery profile.','','Adaptive']
  ];
  el('view-path').innerHTML=`<div class="section-head" style="margin-top:0"><div><h2>Your Personalized Learning Path</h2><p>The next step is selected from your current concept profile, not a fixed syllabus.</p></div><span class="pill active">AI Adaptive Path</span></div><div class="card pad"><div class="path-list">${steps.map(s=>`<div class="path-item"><div class="step ${s[3]}">${s[0]}</div><div><div class="path-title">${s[1]}</div><div class="path-desc">${s[2]}</div></div><div class="path-side"><b>${s[4]}</b>${s[3]==='current'?'<small>Recommended</small>':''}</div></div>`).join('')}</div><div style="margin-top:18px"><button class="btn btn-accent" onclick="navigate('practice')">Start Recommended Practice</button></div></div>`;
}

function renderPractice(){
  const q=questions[state.practiceIndex];
  el('view-practice').innerHTML=`<div class="section-head" style="margin-top:0"><div><h2>Targeted Practice</h2><p>Practice is narrowed to the concept EduReach thinks needs the most attention.</p></div><span class="pill active">${q.subject} · ${q.topic}</span></div><div class="card pad form-card"><div class="callout"><strong>Why this question?</strong><p>AI selected this item because your profile currently shows a gap in <b>${q.topic}</b>. The goal is to repair the concept, not simply maximize your score.</p></div><div class="question"><div class="q-head"><span>Adaptive Practice</span><span>Question ${state.practiceIndex+1} / ${questions.length}</span></div><h3>${q.text}</h3><div class="choices">${q.options.map((o,i)=>`<button class="choice" data-p="${i}" onclick="answerPractice(${i})">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}</div><div id="practiceFeedback" class="feedback"></div></div><div style="margin-top:18px;display:flex;gap:9px"><button class="btn btn-accent" onclick="nextPractice()">${state.practiceIndex===questions.length-1?'Finish Practice':'Next Question'}</button><button class="btn btn-ghost" onclick="navigate('insights')">Ask AI Insights</button></div></div>`;
}
function answerPractice(idx){const q=questions[state.practiceIndex];state.practiceAnswered=true;document.querySelectorAll('[data-p]').forEach(b=>b.classList.remove('selected','correct','wrong'));const b=document.querySelector(`[data-p="${idx}"]`);b.classList.add(idx===q.answer?'correct':'wrong');const f=el('practiceFeedback');f.textContent=idx===q.answer?'Correct. You reinforced the target concept.':'AI Error Analysis: '+q.feedback;f.classList.add('show');}
function nextPractice(){if(!state.practiceAnswered){showToast('Choose an answer first.');return}if(state.practiceIndex<questions.length-1){state.practiceIndex++;state.practiceAnswered=false;renderPractice()}else{state.scores[0]=Math.min(100,state.scores[0]+6);showToast('Practice complete. Mastery score improved.');navigate('insights')}}

function renderInsights(){
  el('view-insights').innerHTML=`<div class="section-head" style="margin-top:0"><div><h2>AI Learning Insights</h2><p>Explainable recommendations: what changed, why, and what to do next.</p></div><span class="pill active">Explainable AI</span></div><div class="insight-grid">
  <div class="card insight"><div class="icon">✦</div><h3>Detected misconception</h3><p>You are likely confusing the <b>sum of factor pairs</b> with the original coefficient in quadratic equations.</p><div class="callout"><strong>Evidence</strong><p>Your selected answer on the diagnostic was consistent with this error pattern.</p></div></div>
  <div class="card insight"><div class="icon">↗</div><h3>Recommended intervention</h3><p>Review one 12-minute concept lesson, then answer 6 targeted questions. Avoid broad revision of the entire chapter.</p><div class="callout"><strong>Why this is efficient</strong><p>The path focuses learning time on the smallest concept gap with the largest expected payoff.</p></div></div>
  <div class="card insight"><div class="icon">◎</div><h3>Learning accessibility</h3><p>Low-bandwidth mode prioritizes text-first content and avoids heavy media unless the learner explicitly requests it.</p><div class="callout"><strong>Equity principle</strong><p>The same learning goal should remain reachable even when devices and connectivity are limited.</p></div></div>
  <div class="card insight"><div class="icon">▣</div><h3>Progress signals</h3><table class="score-table"><tr><th>Signal</th><th>Now</th><th>Trend</th></tr><tr><td>Overall mastery</td><td>${avg()}%</td><td>↑ 8%</td></tr><tr><td>Focus concept</td><td>72%</td><td>↑ 6%</td></tr><tr><td>Confidence</td><td>High</td><td>Stable</td></tr></table></div>
  </div>`;
}

function navigate(view){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));el('view-'+view).classList.add('active-view');document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));const titles={dashboard:'Good afternoon, Muhammad.',diagnostic:'Let’s find your next learning move.',path:'Your learning path is ready.',practice:'Practice exactly what you need.',insights:'Here’s what the AI sees.'};el('pageTitle').textContent=titles[view];if(view==='dashboard')renderDashboard();if(view==='diagnostic')renderDiagnostic();if(view==='path')renderPath();if(view==='practice')renderPractice();if(view==='insights')renderInsights();window.scrollTo({top:0,behavior:'smooth'})}

document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));
renderDashboard();
