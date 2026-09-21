/* Page widgets for higher-education-leadership, moved from inline script blocks by the Learning Resource Kit converter.
   Runs as an ES module after the document is parsed; the kit mounts the shell and quiz separately. */

// ---- Tabs: institution explorer ----
document.querySelectorAll('#insttabs .tab').forEach(t=>{
  t.onclick=()=>{
    document.querySelectorAll('#insttabs .tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('#explorer .panel').forEach(p=>p.classList.remove('active'));
    t.classList.add('active');
    document.getElementById(t.dataset.p).classList.add('active');
  };
});

// ---- Budget allocation widget ----
(function(){
  const rows=Array.from(document.querySelectorAll('#budget .brow'));
  const inputs=rows.map(r=>r.querySelector('input'));
  const vals=rows.map(r=>r.querySelector('.bval'));
  const totalEl=document.getElementById('budgetTotal');
  const verdict=document.getElementById('budgetVerdict');

  function normalize(changedIdx){
    // Keep total at 100 by scaling the OTHER sliders proportionally.
    let changed=parseFloat(inputs[changedIdx].value);
    if(changed>100) changed=100;
    const others=inputs.map((inp,i)=>i===changedIdx?0:parseFloat(inp.value));
    const othersSum=others.reduce((a,b)=>a+b,0);
    const remaining=100-changed;
    inputs.forEach((inp,i)=>{
      if(i===changedIdx){inp.value=Math.round(changed);return;}
      const nv = othersSum===0 ? remaining/(inputs.length-1) : others[i]*(remaining/othersSum);
      inp.value=Math.round(nv);
    });
    // Fix rounding drift so the displayed total reads 100.
    const sum=inputs.reduce((a,inp)=>a+parseFloat(inp.value),0);
    const drift=100-sum;
    if(drift!==0){
      for(let i=0;i<inputs.length;i++){
        if(i===changedIdx) continue;
        const nv=parseFloat(inputs[i].value)+drift;
        if(nv>=0&&nv<=100){inputs[i].value=nv;break;}
      }
    }
    render();
  }

  function render(){
    let sum=0;
    inputs.forEach((inp,i)=>{const v=parseFloat(inp.value);sum+=v;vals[i].textContent=v+'%';});
    totalEl.textContent=Math.round(sum)+'%';
    const instr=parseFloat(inputs[0].value);
    const acad=parseFloat(inputs[1].value);
    const admin=parseFloat(inputs[3].value);
    let msg,color;
    if(instr+acad<40){msg='Underinvested in the academic core — instruction and academic support are the mission; most healthy budgets keep them the largest shares.';color='var(--lr-bad)';}
    else if(admin>instr){msg='Administrative bloat warning — institutional support now exceeds instruction, a pattern critics flag as spending drifting away from the classroom.';color='var(--lr-warn)';}
    else if(instr+acad>=55){msg='Strongly academic-centered — a large majority of spending flows to instruction and student support.';color='var(--lr-good)';}
    else{msg='A balanced allocation — the academic core leads while support, research, and operations are sustained.';color='var(--lr-good)';}
    verdict.textContent=msg;verdict.style.color=color;
  }

  inputs.forEach((inp,i)=>inp.addEventListener('input',()=>normalize(i)));
  render();
})();

// ---- Tabs: four frames ----
document.querySelectorAll('#frametabs .tab').forEach(t=>{
  t.onclick=()=>{
    document.querySelectorAll('#frametabs .tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('#frames .panel').forEach(p=>p.classList.remove('active'));
    t.classList.add('active');
    document.getElementById(t.dataset.fp).classList.add('active');
  };
});

// ---- Mini-quiz: which frame is this? ----
(function(){
  const Q=[
    {p:'"Before we do anything, let\'s redraw the org chart and clarify exactly who reports to whom."',a:'fstructural',e:'Structural — the instinct is to fix roles, reporting lines, and coordination.'},
    {p:'"People are frightened for their jobs. Let\'s hold listening sessions and fund retraining before we move."',a:'fhr',e:'Human Resource — the focus is on people\'s needs, growth, and morale.'},
    {p:'"Let\'s map who holds power, line up the deans, and negotiate the votes we need before this goes to the floor."',a:'fpolitical',e:'Political — the lens is coalitions, interests, bargaining, and power.'},
    {p:'"We should hold a ceremony honoring the department\'s legacy so the community can grieve and find meaning."',a:'fsymbolic',e:'Symbolic — the emphasis is on ritual, culture, meaning, and story.'},
    {p:'"The metrics are unambiguous: enrollment and cost-per-degree miss our thresholds, so policy dictates the outcome."',a:'fstructural',e:'Structural — the decision flows from data, rules, and rational analysis of goals.'},
    {p:'"If the faculty senate and the union aren\'t on board first, this proposal is dead on arrival."',a:'fpolitical',e:'Political — the reality being read is stakeholder power and negotiation.'}
  ];
  let i=0,correct=0,attempted=0,answered=false;
  const qEl=document.getElementById('frameQ');
  const numEl=document.getElementById('frameQNum');
  const opts=Array.from(document.querySelectorAll('#frameOpts .opt'));
  const resEl=document.getElementById('frameResult');
  const verdictEl=document.getElementById('frameVerdict');
  const explainEl=document.getElementById('frameExplain');
  const scoreEl=document.getElementById('frameScore');
  const nextBtn=document.getElementById('frameNext');

  function load(){
    answered=false;
    qEl.textContent=Q[i].p;
    numEl.textContent='Question '+(i+1)+' of '+Q.length;
    opts.forEach(o=>o.classList.remove('sel'));
    resEl.classList.remove('show');
    nextBtn.style.display='none';
  }
  opts.forEach(o=>{
    o.onclick=()=>{
      if(answered) return;
      answered=true;attempted++;
      const pick=o.dataset.f, ans=Q[i].a;
      opts.forEach(x=>{if(x.dataset.f===ans)x.classList.add('sel');});
      if(pick===ans){correct++;verdictEl.textContent='Correct';verdictEl.style.color='var(--lr-good)';}
      else{verdictEl.textContent='Not quite';verdictEl.style.color='var(--lr-warn)';}
      explainEl.textContent=Q[i].e;
      resEl.classList.add('show');
      scoreEl.textContent='Score: '+correct+' / '+attempted;
      nextBtn.style.display='';
      nextBtn.textContent = i<Q.length-1 ? 'Next question →' : 'Restart ↻';
    };
  });
  nextBtn.onclick=()=>{
    if(i<Q.length-1){i++;}
    else{i=0;correct=0;attempted=0;scoreEl.textContent='Score: 0 / 0';}
    load();
  };
  load();
})();

