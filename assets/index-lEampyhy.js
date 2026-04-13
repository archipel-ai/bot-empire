(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const ct=[{id:"bot-workflows",name:"Bot Workflows",description:"Automatise les tâches répétitives via n8n",icon:"🤖",baseCost:10,baseProduction:.15,costMultiplier:1.13},{id:"agent-copy",name:"Agent Copy",description:"Génère du contenu marketing en continu",icon:"✍️",baseCost:75,baseProduction:.8,costMultiplier:1.13},{id:"agent-analytics",name:"Agent Analytics",description:"Analyse les données et optimise les performances",icon:"📊",baseCost:500,baseProduction:3.5,costMultiplier:1.13},{id:"agent-audit",name:"Agent Audit",description:"Audite les projets clients, débloque les grands comptes",icon:"🔍",baseCost:3e3,baseProduction:18,costMultiplier:1.13},{id:"agent-legal",name:"Agent Légal",description:"CGV, RGPD, conformité — ouvre les marchés publics",icon:"⚖️",baseCost:2e4,baseProduction:60,costMultiplier:1.13},{id:"agent-growth",name:"Agent Growth",description:"Cold outreach, partenariats, distribution à grande échelle",icon:"🚀",baseCost:15e4,baseProduction:200,costMultiplier:1.13},{id:"agent-supervisor",name:"Agent Supervisor",description:"Orchestre tous les agents — multiplicateur global ×2",icon:"🎯",baseCost:1e6,baseProduction:800,costMultiplier:1.13}],nt=[{id:"restaurant-local",name:"La Taverne",sector:"Restauration 🍺",icon:"🍽️",bonusPerSecond:1.5,unlockRateRequired:.2,unlockDialogue:'🍺 La Taverne signe ! "On veut un chatbot pour les réservations."'},{id:"cabinet-medical",name:"MédiaTech+",sector:"Santé numérique",icon:"🏥",bonusPerSecond:8,unlockRateRequired:1.5,unlockDialogue:`💊 MédiaTech+ à bord ! "L'IA doit rester RGPD-compliant." On gère.`},{id:"pme-ecommerce",name:"BricoMax",sector:"E-commerce",icon:"🛍️",bonusPerSecond:30,unlockRateRequired:8,unlockDialogue:`🛒 BricoMax signe ! "Nos concurrents ont déjà l'IA. Rattrapez-nous."`},{id:"groupe-hotelier",name:"PalmHôtel Group",sector:"Hôtellerie & Luxe",icon:"🏨",bonusPerSecond:100,unlockRateRequired:40,unlockDialogue:'🌴 PalmHôtel Group confirme ! "Automatisation totale du concierge virtuel."'},{id:"grand-compte",name:"GigaSoft Corp.",sector:"Big Tech",icon:"🏢",bonusPerSecond:400,unlockRateRequired:150,unlockDialogue:"🔥 GigaSoft Corp. entre dans l'empire ! Budget illimité. Exécution parfaite attendue."},{id:"gouvernement",name:"MinisteIA",sector:"Secteur Public",icon:"🏛️",bonusPerSecond:2e3,unlockRateRequired:600,unlockDialogue:"🏛️ MinisteIA valide le marché ! L'État fait confiance à ton agence. Historique."}],re=[{id:"api-rate-x2",name:"API Rate Limit ×2",description:"Double la cadence de vos bots de workflows",icon:"⚡",cost:150,effect:{type:"agent_multiplier",agentId:"bot-workflows",multiplier:2},effectLabel:"Bot Workflows ×2",requiresAgentId:"bot-workflows",requiresAgentCount:5},{id:"gpt5-integration",name:"GPT-5 Integration",description:"L'Agent Copy génère du contenu de qualité supérieure",icon:"🧠",cost:1e3,effect:{type:"agent_multiplier",agentId:"agent-copy",multiplier:3},effectLabel:"Agent Copy ×3",requiresAgentId:"agent-copy",requiresAgentCount:5},{id:"iso-certification",name:"Certification ISO 27001",description:"Vos audits sont deux fois plus valorisés",icon:"🛡️",cost:8e3,effect:{type:"agent_multiplier",agentId:"agent-audit",multiplier:2},effectLabel:"Agent Audit ×2",requiresAgentId:"agent-audit",requiresAgentCount:3},{id:"click-boost",name:"Automatisation du Clic",description:"Chaque tâche manuelle rapporte 5× plus",icon:"🖱️",cost:350,effect:{type:"click_multiplier",multiplier:5},effectLabel:"Clic ×5"},{id:"venture-round",name:"Levée de Fonds Série A",description:"L'ensemble de l'agence tourne à plein régime",icon:"💰",cost:3e4,effect:{type:"global_multiplier",multiplier:1.5},effectLabel:"Toute production ×1.5",requiresAgentId:"agent-legal",requiresAgentCount:1},{id:"ai-sovereignty",name:"IA Souveraine",description:"Votre agence devient une référence nationale de l'IA",icon:"👑",cost:25e4,effect:{type:"global_multiplier",multiplier:3},effectLabel:"Toute production ×3",requiresAgentId:"agent-growth",requiresAgentCount:5},{id:"n8n-enterprise",name:"n8n Enterprise License",description:"Les workflows tournent sans limits de vitesse",icon:"🔗",cost:3500,effect:{type:"agent_multiplier",agentId:"bot-workflows",multiplier:4},effectLabel:"Bot Workflows ×4",requiresAgentId:"bot-workflows",requiresAgentCount:15},{id:"mcp-protocol",name:"Protocole MCP Full Stack",description:"Tous vos agents communiquent en temps réel",icon:"🕸️",cost:1e5,effect:{type:"global_multiplier",multiplier:2},effectLabel:"Toute production ×2",requiresAgentId:"agent-supervisor",requiresAgentCount:1}],Ot=[{id:"rep-start-bonus",name:"Capital de départ",icon:"💳",description:"Commencez chaque prestige avec 2 000 € en poche.",cost:2,effect:{type:"start_bonus",amount:2e3}},{id:"rep-click-x2",name:"Expert reconnu",icon:"⚡",description:"Vos tâches manuelles valent 2× plus.",cost:2,effect:{type:"click_multiplier",multiplier:2}},{id:"rep-contract-slot",name:"Réputation établie",icon:"📋",description:"4ème slot de contrat débloqué en permanence.",cost:3,effect:{type:"extra_contract_slot"}},{id:"rep-contract-bonus",name:"Marges premium",icon:"💎",description:"Récompenses de tous les contrats +25%.",cost:3,effect:{type:"contract_reward_bonus",multiplier:1.25}},{id:"rep-offline-rate",name:"Production continue",icon:"🌙",description:"Revenus offline passent de 50% à 75%.",cost:4,effect:{type:"offline_rate",rate:.75}},{id:"rep-agent-discount",name:"Réseau d'élite",icon:"🤝",description:"Coût de tous les agents réduit de 20%.",cost:5,effect:{type:"agent_cost_reduction",reduction:.2}},{id:"rep-echo-boost",name:"Rythme de croisière",icon:"↺",description:"Cooldown du mode ÉCHO divisé par 2.",cost:5,effect:{type:"echo_cooldown",reduction:.5}},{id:"rep-income-x125",name:"Expertise IA",icon:"🧠",description:"Revenus de tous vos agents ×1.25 en permanence.",cost:7,effect:{type:"income_multiplier",multiplier:1.25}}];function ul(n){return 3}const dl=75e4,hl=2,fl=.15,pl=.1,ml=8;class gl{getPrestigeMultiplier(e){return 1+e.prestigeCount*fl}getGlobalUpgradeMultiplier(e){return re.filter(t=>e.upgradesPurchased[t.id]&&t.effect.type==="global_multiplier").reduce((t,i)=>t*(i.effect.type==="global_multiplier"?i.effect.multiplier:1),1)}getAgentMultiplier(e,t){return re.filter(i=>e.upgradesPurchased[i.id]&&i.effect.type==="agent_multiplier"&&i.effect.agentId===t).reduce((i,s)=>i*(s.effect.type==="agent_multiplier"?s.effect.multiplier:1),1)}getAgentProduction(e,t){const i=e.agents[t.id]?.count??0;if(i===0)return 0;const s=this.getAgentMultiplier(e,t.id);return t.baseProduction*i*s}getClientBonus(e){return nt.filter(t=>e.clientsUnlocked[t.id]).reduce((t,i)=>t+i.bonusPerSecond,0)}getTotalRate(e,t=1){const i=ct.reduce((c,l)=>c+this.getAgentProduction(e,l),0),s=this.getClientBonus(e),r=this.getGlobalUpgradeMultiplier(e),o=this.getPrestigeMultiplier(e),a=this.getReputationIncomeMult(e);return(i+s)*r*o*a*t}getClickValue(e,t=1){const i=re.filter(o=>e.upgradesPurchased[o.id]&&o.effect.type==="click_multiplier").reduce((o,a)=>o*(a.effect.type==="click_multiplier"?a.effect.multiplier:1),1),s=this.getPrestigeMultiplier(e),r=this.getReputationClickMult(e);return pl*i*s*r*t}click(e,t=1){const i=this.getClickValue(e,t);return{...e,currency:e.currency+i,totalEarned:e.totalEarned+i}}getAgentCost(e,t){const i=ct.find(a=>a.id===t),s=e.agents[t]?.count??0,r=i.baseCost*Math.pow(i.costMultiplier,s),o=this.getReputationAgentDiscount(e);return r*(1-o)}canBuyAgent(e,t){return e.currency>=this.getAgentCost(e,t)}buyAgent(e,t){if(!this.canBuyAgent(e,t))return e;const i=this.getAgentCost(e,t);return{...e,currency:e.currency-i,agents:{...e.agents,[t]:{count:(e.agents[t]?.count??0)+1}}}}isUpgradeVisible(e,t){const i=re.find(r=>r.id===t);return i.requiresAgentId?(e.agents[i.requiresAgentId]?.count??0)>=(i.requiresAgentCount??1):!0}canBuyUpgrade(e,t){if(e.upgradesPurchased[t])return!1;const i=re.find(s=>s.id===t);return e.currency>=i.cost&&this.isUpgradeVisible(e,t)}buyUpgrade(e,t){if(!this.canBuyUpgrade(e,t))return e;const i=re.find(s=>s.id===t);return{...e,currency:e.currency-i.cost,upgradesPurchased:{...e.upgradesPurchased,[t]:!0}}}tick(e,t,i=1){const s=this.getTotalRate(e,i),r=s*t,o={...e.clientsUnlocked},a={...e.clientsUnlocked};nt.forEach(u=>{!a[u.id]&&s>=u.unlockRateRequired&&(a[u.id]=!0)});const c=nt.filter(u=>a[u.id]&&!o[u.id]).map(u=>u.id);return{state:{...e,currency:e.currency+r,totalEarned:e.totalEarned+r,clientsUnlocked:a},result:{newClients:c}}}applyOfflineEarnings(e,t){const i=Math.min(t,ml*3600),s=this.getTotalRate(e),r=this.getReputationOfflineRate(e),o=s*i*r;return o<=0?{state:e,earned:0}:{state:{...e,currency:e.currency+o,totalEarned:e.totalEarned+o},earned:o}}getPrestigeThreshold(e){return Math.round(dl*Math.pow(hl,e.prestigeCount))}canPrestige(e){return e.totalEarned>=this.getPrestigeThreshold(e)}getPrestigeProgress(e){return Math.min(e.totalEarned/this.getPrestigeThreshold(e),1)}getPrestigeRP(e){return ul(e.prestigeCount)}prestige(e){if(!this.canPrestige(e))return e;const t=e.prestigeCount+1,i=this.getPrestigeRP(e),s=this.getReputationStartBonus(e);return{currency:s,totalEarned:s,prestigeCount:t,agents:Object.fromEntries(Object.keys(e.agents).map(o=>[o,{count:0}])),clientsUnlocked:Object.fromEntries(Object.keys(e.clientsUnlocked).map(o=>[o,!1])),upgradesPurchased:Object.fromEntries(Object.keys(e.upgradesPurchased).map(o=>[o,!1])),lastSave:Date.now(),reputationPoints:(e.reputationPoints??0)+i,reputationPurchased:{...e.reputationPurchased??{}}}}hasRepPerk(e,t){return!!e.reputationPurchased?.[t]}canBuyRepPerk(e,t){const i=Ot.find(s=>s.id===t);return!i||this.hasRepPerk(e,t)?!1:(e.reputationPoints??0)>=i.cost}buyRepPerk(e,t){if(!this.canBuyRepPerk(e,t))return e;const i=Ot.find(s=>s.id===t);return{...e,reputationPoints:(e.reputationPoints??0)-i.cost,reputationPurchased:{...e.reputationPurchased??{},[t]:!0}}}getReputationIncomeMult(e){return this.hasRepPerk(e,"rep-income-x125")?1.25:1}getReputationClickMult(e){return this.hasRepPerk(e,"rep-click-x2")?2:1}getReputationAgentDiscount(e){return this.hasRepPerk(e,"rep-agent-discount")?.2:0}getReputationOfflineRate(e){return this.hasRepPerk(e,"rep-offline-rate")?.75:.5}getReputationStartBonus(e){return this.hasRepPerk(e,"rep-start-bonus")?2e3:0}getReputationContractBonus(e){return this.hasRepPerk(e,"rep-contract-bonus")?1.25:1}getReputationExtraSlot(e){return this.hasRepPerk(e,"rep-contract-slot")}getReputationEchoCooldownMult(e){return this.hasRepPerk(e,"rep-echo-boost")?.5:1}getTotalAgentCount(e){return Object.values(e.agents).reduce((t,i)=>t+i.count,0)}getUnlockedClientCount(e){return Object.values(e.clientsUnlocked).filter(Boolean).length}getPurchasedUpgradeCount(e){return Object.values(e.upgradesPurchased).filter(Boolean).length}}function yn(){const n={};ct.forEach(s=>{n[s.id]={count:0}});const e={};nt.forEach(s=>{e[s.id]=!1});const t={};re.forEach(s=>{t[s.id]=!1});const i={};return Ot.forEach(s=>{i[s.id]=!1}),{currency:0,totalEarned:0,prestigeCount:0,agents:n,clientsUnlocked:e,upgradesPurchased:t,lastSave:Date.now(),reputationPoints:0,reputationPurchased:i}}const ln="bot-empire-v1",dr="bot-empire-purchases",_l=1e4;class vl{autosaveTimer=null;save(e){try{localStorage.setItem(ln,JSON.stringify({...e,lastSave:Date.now()}))}catch{}}load(){try{const e=localStorage.getItem(ln);return e?this.merge(JSON.parse(e)):yn()}catch{return yn()}}reset(){localStorage.removeItem(ln)}startAutosave(e){this.autosaveTimer=setInterval(()=>this.save(e()),_l);const t=()=>this.save(e());document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&t()}),window.addEventListener("pagehide",t),window.addEventListener("beforeunload",t)}stopAutosave(){this.autosaveTimer!==null&&(clearInterval(this.autosaveTimer),this.autosaveTimer=null)}getOfflineSeconds(e){return Math.min((Date.now()-e.lastSave)/1e3,8*3600)}isFirstTime(){return!localStorage.getItem(ln)}getPurchases(){try{return JSON.parse(localStorage.getItem(dr)??"{}")}catch{return{}}}setPurchase(e,t){const i=this.getPurchases();i[e]=t,localStorage.setItem(dr,JSON.stringify(i))}hasNoAds(){return!!this.getPurchases().noAds}hasBooster(){return(this.getPurchases().boosterX2Until??0)>Date.now()}exportToFile(e){const t=JSON.stringify({...e,lastSave:Date.now()},null,2),i=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=`bot-empire-save-${new Date().toISOString().slice(0,10)}.json`,r.click(),URL.revokeObjectURL(s)}importFromText(e){try{const t=JSON.parse(e);return typeof t.currency!="number"?null:this.merge(t)}catch{return null}}encodeForURL(e){const t=JSON.stringify({...e,lastSave:Date.now()}),i=new TextEncoder().encode(t),s=btoa(String.fromCharCode(...i));return`${window.location.origin}${window.location.pathname}#save=${encodeURIComponent(s)}`}decodeFromURL(){try{const e=window.location.hash;if(!e.startsWith("#save="))return null;const t=decodeURIComponent(e.slice(6)),i=atob(t),s=Uint8Array.from(i,a=>a.charCodeAt(0)),r=new TextDecoder().decode(s),o=JSON.parse(r);return typeof o.currency!="number"?null:this.merge(o)}catch{return null}}merge(e){const t=yn();return{...t,...e,agents:{...t.agents,...e.agents??{}},clientsUnlocked:{...t.clientsUnlocked,...e.clientsUnlocked??{}},upgradesPurchased:{...t.upgradesPurchased,...e.upgradesPurchased??{}},reputationPurchased:{...t.reputationPurchased,...e.reputationPurchased??{}},reputationPoints:e.reputationPoints??0}}}const hr=["","K","M","B","T","Qa","Qi","Sx","Sp","Oc"];function yl(n,e=2){if(!isFinite(n)||isNaN(n))return"0";if(n<1e3)return n.toFixed(e);const t=Math.floor(Math.log10(Math.abs(n))/3),i=hr[Math.min(t,hr.length-1)];return`${(n/Math.pow(1e3,t)).toFixed(e)}${i}`}function A(n,e=2){return`€${yl(n,e)}`}function Ue(n){return`+${A(n)}/s`}function bl(n){return n<60?`${Math.floor(n)}s`:n<3600?`${Math.floor(n/60)}m`:n<86400?`${Math.floor(n/3600)}h`:`${Math.floor(n/86400)}j`}class Il{engine;agentsPanelDirty=!0;clientsPanelDirty=!0;upgradesPanelDirty=!0;elCurrency=document.getElementById("hd-currency");elRate=document.getElementById("hd-rate");elTotal=document.getElementById("hd-total");elPrestigeBadge=document.getElementById("prestige-badge");elPrestigeCount=document.getElementById("prestige-count");elClickValue=document.getElementById("click-value-display");elStatAgents=document.getElementById("stat-agents");elStatClients=document.getElementById("stat-clients");elStatUpgrades=document.getElementById("stat-upgrades");elStatMultiplier=document.getElementById("stat-multiplier");elStatOffline=document.getElementById("stat-offline");elPrestigeBar=document.getElementById("prestige-bar-fill");elPrestigePct=document.getElementById("prestige-pct");elPrestigeTarget=document.getElementById("prestige-target");elBtnPrestige=document.getElementById("btn-prestige");elTabCountAgents=document.getElementById("tab-count-agents");elTabCountClients=document.getElementById("tab-count-clients");elTabCountUpgrades=document.getElementById("tab-count-upgrades");elTabAgents=document.getElementById("tab-agents");elTabClients=document.getElementById("tab-clients");elTabUpgrades=document.getElementById("tab-upgrades");constructor(e){this.engine=e}markDirty(){this.agentsPanelDirty=!0,this.clientsPanelDirty=!0,this.upgradesPanelDirty=!0}setOfflineStat(e){this.elStatOffline.textContent=e}update(e){const t=this.engine.getTotalRate(e),i=this.engine.getClickValue(e),s=this.engine.getPrestigeMultiplier(e),r=this.engine.getPrestigeProgress(e),o=this.engine.canPrestige(e);this.elCurrency.textContent=A(e.currency),this.elRate.textContent=Ue(t),this.elTotal.textContent=A(e.totalEarned),e.prestigeCount>0&&(this.elPrestigeBadge.style.display="",this.elPrestigeCount.textContent=`×${e.prestigeCount}`),this.elClickValue.textContent=`+${A(i)}`,this.elStatAgents.textContent=String(this.engine.getTotalAgentCount(e)),this.elStatClients.textContent=String(this.engine.getUnlockedClientCount(e)),this.elStatUpgrades.textContent=String(this.engine.getPurchasedUpgradeCount(e)),this.elStatMultiplier.textContent=`×${s.toFixed(2)}`;const a=Math.floor(r*100),c=this.engine.getPrestigeThreshold(e);this.elPrestigeBar.style.width=`${a}%`,this.elPrestigePct.textContent=`${a}%`,this.elPrestigeTarget.textContent=`Objectif : ${A(c)}`,this.elBtnPrestige.disabled=!o,this.elTabCountAgents.textContent=String(this.engine.getTotalAgentCount(e)),this.elTabCountClients.textContent=String(this.engine.getUnlockedClientCount(e)),this.elTabCountUpgrades.textContent=String(this.engine.getPurchasedUpgradeCount(e)),this.agentsPanelDirty?(this.renderAgents(e),this.agentsPanelDirty=!1):this.updateAgentButtons(e),this.clientsPanelDirty&&(this.renderClients(e),this.clientsPanelDirty=!1),this.upgradesPanelDirty?(this.renderUpgrades(e),this.upgradesPanelDirty=!1):this.updateUpgradeButtons(e)}renderAgents(e){this.elTabAgents.innerHTML=ct.map(t=>{const i=e.agents[t.id]?.count??0,s=this.engine.getAgentCost(e,t.id),r=this.engine.canBuyAgent(e,t.id),o=this.engine.getAgentProduction(e,t),a=i>0?o/i:t.baseProduction*this.engine.getPrestigeMultiplier(e);return`
        <div class="agent-card ${r?"affordable":""}" data-agent="${t.id}">
          <div class="agent-icon">${t.icon}</div>
          <div class="agent-info">
            <div class="agent-name">${t.name}</div>
            <div class="agent-desc">${t.description}</div>
            <div class="agent-prod-detail">
              <span class="agent-prod-unit">${Ue(a)}/unité</span>
              ${i>0?`<span class="agent-prod-total">${Ue(o)} total</span>`:""}
            </div>
          </div>
          <div class="agent-right">
            <div class="agent-count">${i}</div>
            <button class="btn-buy" data-buy-agent="${t.id}" ${r?"":"disabled"}>
              ${A(s)}
            </button>
          </div>
        </div>
      `}).join("")}updateAgentButtons(e){ct.forEach(t=>{const i=this.engine.getAgentCost(e,t.id),s=this.engine.canBuyAgent(e,t.id),r=e.agents[t.id]?.count??0,o=this.elTabAgents.querySelector(`[data-agent="${t.id}"]`);if(!o)return;const a=o.querySelector("[data-buy-agent]");a&&(a.disabled=!s,a.textContent=A(i));const c=o.querySelector(".agent-count");c&&(c.textContent=String(r)),o.classList.toggle("affordable",s)})}renderClients(e){const t=this.engine.getTotalRate(e);this.elTabClients.innerHTML=nt.map(i=>{const s=e.clientsUnlocked[i.id],r=i.unlockRateRequired-t;return`
        <div class="client-card ${s?"active-contract":"locked"}">
          <div class="client-icon">${i.icon}</div>
          <div class="client-info">
            <div class="client-name">${i.name}</div>
            <div class="client-sector">${i.sector}</div>
            <div class="client-revenue">+${Ue(i.bonusPerSecond)} bonus</div>
            ${s?"":`<div class="client-unlock">Déblocage à ${Ue(i.unlockRateRequired)}${r>0?` — manque ${Ue(r)}`:""}</div>`}
          </div>
          <span class="client-badge ${s?"active":"locked"}">
            ${s?"Actif":"🔒"}
          </span>
        </div>
      `}).join("")}renderUpgrades(e){const t=re.filter(i=>this.engine.isUpgradeVisible(e,i.id));if(t.length===0){this.elTabUpgrades.innerHTML='<p style="color:var(--text-muted);text-align:center;padding:40px 20px;">Achetez des agents pour débloquer des upgrades.</p>';return}this.elTabUpgrades.innerHTML=t.map(i=>{const s=e.upgradesPurchased[i.id],r=this.engine.canBuyUpgrade(e,i.id);return`
        <div class="upgrade-card ${s?"purchased":r?"affordable":""}">
          <div class="upgrade-icon">${i.icon}</div>
          <div class="upgrade-info">
            <div class="upgrade-name">${i.name}</div>
            <div class="upgrade-desc">${i.description}</div>
            <div class="upgrade-effect">${i.effectLabel}</div>
          </div>
          ${s?'<button class="btn-upgrade purchased-btn" disabled>✓ Acheté</button>':`<button class="btn-upgrade" data-buy-upgrade="${i.id}" ${r?"":"disabled"}>
                ${A(i.cost)}
              </button>`}
        </div>
      `}).join("")}updateUpgradeButtons(e){re.forEach(t=>{const i=this.elTabUpgrades.querySelector(`[data-buy-upgrade="${t.id}"]`);if(!i)return;const s=this.engine.canBuyUpgrade(e,t.id);i.disabled=!s})}}const fr=[{id:"chambre",minAgents:0,minPrestige:0,icon:"🛋️",label:"Chambre d'ado",sublabel:"Le voyage commence ici"},{id:"home-office",minAgents:1,minPrestige:0,icon:"🖥️",label:"Home Office",sublabel:"Les premiers projets arrivent"},{id:"coworking",minAgents:10,minPrestige:0,icon:"☕",label:"Espace Coworking",sublabel:"L'équipe prend forme"},{id:"startup",minAgents:25,minPrestige:0,icon:"🚀",label:"Locaux Startup",sublabel:"On scale !"},{id:"scale-up",minAgents:60,minPrestige:0,icon:"🏢",label:"Scale-up",sublabel:"L'empire se construit"},{id:"unicorn",minAgents:120,minPrestige:0,icon:"🦄",label:"Siège Social",sublabel:"Niveau licorne !"}];function El(n,e){const t=Math.pow(.8,e);let i=fr[0];for(const s of fr){const r=Math.floor(s.minAgents*t);n>=r&&(i=s)}return i}const un={"bot-workflows":{color:"#00d4ff",badge:"🤖",speedFactor:1.8,squareHead:!0,scale:1,names:["BOT-001","NEXUS-7","UNIT-42","ALPHA-X","BOT-099","CIPHER","FLUX-2","NODE-5"],dialogues:["workflow lancé ⚙️","HTTP 200 OK ✓","npm install...","trigger actif !","retry #3...","42 tâches/min","loop en cours"]},"agent-copy":{color:"#ff6b9d",badge:"✍️",speedFactor:.85,squareHead:!1,scale:1,names:["Sophie","Lucas","Emma","Théo","Jade","Hugo","Léa","Maxime"],dialogues:['"Votre marque..."',"SEO ×3 ✓","thread viral ?","H1 optimisé !",'"CTA parfait"',"engagement +40%","landing en cours"]},"agent-analytics":{color:"#4ecdc4",badge:"📊",speedFactor:.65,squareHead:!1,scale:1,names:["Iris","Sigma","Marco","Pixel","Atlas","Vector","Data-One"],dialogues:["p-value: 0.03","dashboard ouvert","R² = 0.97 🎯","anomalie détectée","rapport prêt ✓","KPI en hausse !","AB test lancé"]},"agent-audit":{color:"#ffd93d",badge:"🔍",speedFactor:.75,squareHead:!1,scale:1,names:["Jules","Scout","Rex","Aurélie","Inspecteur","Sherlock"],dialogues:["bug trouvé 🔍","dette tech: 4j","RGPD conforme ✓","audit complet !","vuln. patchée","score: 94/100","tests passés ✓"]},"agent-legal":{color:"#a29bfe",badge:"⚖️",speedFactor:.45,squareHead:!1,scale:1,names:["Me. Martin","Lex","Justice","Maître B.","Conseil","Me. Dubois"],dialogues:["CGV à jour ✓","CNIL notifiée","contrat signé !","clause validée","RGPD OK 📋","marché public !","DPA rédigé"]},"agent-growth":{color:"#00b894",badge:"🚀",speedFactor:1.25,squareHead:!1,scale:1,names:["Rocket","Boost","Viral","Surge","Nova","Max","Flash"],dialogues:["+500 leads !","viral sur LI !","partner signé","CTR: 12% 🔥","pipeline plein","ARR: +40% 📈","funnel lancé"]},"agent-supervisor":{color:"#fdcb6e",badge:"🎯",speedFactor:.4,squareHead:!1,scale:1.5,names:["Le Boss","Director","Chief","Le Grand","CEO"],dialogues:["bien joué équipe","objectif atteint ✓","réunion à 14h","performance max","⭐ excellent !","on scale ! 🚀","livraison top"]}},vi=20;let wl=0;const Cl=["On scale ! 🚀","C'est bon ça...","Excellent travail !","Encore un client !","Le plan se déroule","💰 KPI au vert !","On build ! ⚡","Série A en vue 👀","Pipeline plein 🔥","Claude, continue...","Vision claire 🎯","L'empire grandit."];class Tl{container=document.getElementById("bureau-chars");emptyEl=document.getElementById("bureau-empty");countEl=document.getElementById("bureau-count");bureauEl=document.getElementById("bureau");stageBadge=document.getElementById("bureau-stage-badge");chars=[];lastCounts={};founder=null;lastPrestigeCount=-1;currentStageId="";onStageChange;update(e,t){this.syncFounder(t.prestigeCount),this.syncStage(t),this.sync(t),this.tick(e)}syncStage(e){const t=Object.values(e.agents).reduce((r,o)=>r+o.count,0),i=El(t,e.prestigeCount);if(i.id===this.currentStageId)return;const s=this.currentStageId;if(this.currentStageId=i.id,s&&this.bureauEl.classList.remove(`stage-${s}`),this.bureauEl.classList.add(`stage-${i.id}`),this.stageBadge.innerHTML=`<span class="stage-icon">${i.icon}</span><span class="stage-label">${i.label}</span><span class="stage-sublabel">${i.sublabel}</span>`,s){const r=document.createElement("div");r.className="bureau-stage-flash",this.bureauEl.appendChild(r),setTimeout(()=>r.remove(),1500),this.onStageChange&&this.onStageChange(i)}}syncFounder(e){if(this.founder&&e===this.lastPrestigeCount)return;if(this.founder){const o=Math.min(1.35+e*.12,2.4);this.founder.el.style.setProperty("--char-scale",String(o));const a=this.founder.el.querySelector(".char-badge");a&&(a.textContent=e>0?"⭐".repeat(Math.min(e,5)):"🧑‍💻"),this.founder.el.classList.add("prestige-flash"),setTimeout(()=>this.founder?.el.classList.remove("prestige-flash"),1200),this.lastPrestigeCount=e;return}const t=44+(Math.random()-.5)*8,i=52,s=Math.min(1.35+e*.12,2.4),r=document.createElement("div");r.className="bureau-char bureau-founder spawning",r.id="bureau-founder",r.style.cssText=[`left:${t}%`,`top:${i}%`,"--char-color:#e2e8f0",`--char-scale:${s}`,"--bounce-ms:2200ms","--leg-ms:950ms"].join(";"),r.innerHTML=`
      <div class="char-badge">${e>0?"⭐".repeat(Math.min(e,5)):"🧑‍💻"}</div>
      <div class="char-inner">
        <div class="char-head founder-head">
          <div class="char-eyes"><span></span><span></span></div>
          <div class="founder-smile"></div>
        </div>
        <div class="char-body founder-body"></div>
        <div class="char-legs founder-legs"><span></span><span></span></div>
      </div>
      <div class="char-name founder-label">Fondateur</div>
    `,this.container.appendChild(r),setTimeout(()=>r.classList.remove("spawning"),600),this.founder={agentId:"founder",name:"Fondateur",el:r,x:t,y:i,prevX:t,wanderTimer:5+Math.random()*4,workTimer:4+Math.random()*5,bubbleTimer:7+Math.random()*6,particleTimer:99,isWorking:!1},this.lastPrestigeCount=e}sync(e){let t=!1;for(const[a,{count:c}]of Object.entries(e.agents))if((this.lastCounts[a]??0)!==c){t=!0;break}if(!t)return;for(const[a,{count:c}]of Object.entries(e.agents))this.lastCounts[a]=c;const i=Object.values(e.agents).reduce((a,c)=>a+c.count,0),s=this.computeTargets(e.agents,i),r={};for(const a of this.chars)r[a.agentId]=(r[a.agentId]??0)+1;for(const[a,c]of Object.entries(s))for(let l=r[a]??0;l<c;l++)this.spawn(a);for(const[a,c]of Object.entries(r)){let l=c-(s[a]??0);for(;l-- >0;){const u=[...this.chars.entries()].filter(([,d])=>d.agentId===a).pop();u&&this.remove(u[0])}}const o=this.chars.length;this.emptyEl.style.display=o===0?"":"none",this.countEl.textContent=`${i} agent${i>1?"s":""}`}computeTargets(e,t){const i={};if(t===0)return i;if(t<=vi){for(const[o,{count:a}]of Object.entries(e))a>0&&(i[o]=a);return i}const s=vi/t;let r=0;for(const[o,{count:a}]of Object.entries(e)){if(a===0)continue;const c=Math.max(1,Math.round(a*s));i[o]=c,r+=c}for(;r>vi;){const o=Object.entries(i).sort((a,c)=>c[1]-a[1])[0];if(!o||o[1]<=1)break;i[o[0]]--,r--}return i}spawn(e){const t=un[e];if(!t)return;const i=6+Math.random()*82,s=32+Math.random()*44,r=(1.5/t.speedFactor*1e3).toFixed(0),o=(.7/t.speedFactor*1e3).toFixed(0),a=t.names[Math.floor(Math.random()*t.names.length)],c=document.createElement("div");c.className="bureau-char spawning",c.id=`char-${wl++}`,c.dataset.type=e,c.title=a,c.style.cssText=[`left:${i}%`,`top:${s}%`,`--char-color:${t.color}`,`--char-scale:${t.scale}`,`--bounce-ms:${r}ms`,`--leg-ms:${o}ms`].join(";"),c.innerHTML=`
      <div class="char-badge">${t.badge}</div>
      <div class="char-inner">
        <div class="char-head${t.squareHead?" square":""}">
          <div class="char-eyes"><span></span><span></span></div>
        </div>
        <div class="char-body"></div>
        <div class="char-legs"><span></span><span></span></div>
      </div>
      <div class="char-name">${a}</div>
    `,this.container.appendChild(c),setTimeout(()=>c.classList.remove("spawning"),600),this.chars.push({agentId:e,name:a,el:c,x:i,y:s,prevX:i,wanderTimer:Math.random()*3+1,workTimer:Math.random()*5+2,bubbleTimer:Math.random()*8+5,particleTimer:Math.random()*3+1,isWorking:!1})}remove(e){const t=this.chars[e];t.el.classList.add("despawning"),setTimeout(()=>t.el.remove(),380),this.chars.splice(e,1)}tick(e){this.founder&&this.tickChar(this.founder,e,.35,Cl);for(const t of this.chars){const i=un[t.agentId]?.speedFactor??1,s=un[t.agentId]?.dialogues??[];this.tickChar(t,e,i,s)}}tickChar(e,t,i,s){e.workTimer-=t,e.workTimer<=0&&(e.isWorking=!e.isWorking,e.el.classList.toggle("working",e.isWorking),e.workTimer=2.5+Math.random()*5),e.wanderTimer-=t,e.wanderTimer<=0&&(e.prevX=e.x,e.x=pr(e.x+(Math.random()-.5)*28*i,4,88),e.y=pr(e.y+(Math.random()-.5)*18*i,32,80),e.el.style.left=`${e.x}%`,e.el.style.top=`${e.y}%`,e.el.classList.toggle("facing-left",e.x<e.prevX),e.wanderTimer=(1.5+Math.random()*3.5)/Math.max(i,.1)),e.bubbleTimer-=t,e.bubbleTimer<=0&&s.length>0&&(this.spawnBubble(e,s),e.bubbleTimer=8+Math.random()*10),e.isWorking&&e.agentId!=="founder"&&(e.particleTimer-=t,e.particleTimer<=0&&(this.spawnParticle(e),e.particleTimer=2+Math.random()*3))}spawnBubble(e,t){if(t.length===0)return;e.el.querySelector(".char-bubble")?.remove();const i=t[Math.floor(Math.random()*t.length)],s=document.createElement("div");s.className="char-bubble",s.textContent=i,e.el.appendChild(s),setTimeout(()=>s.remove(),3200)}spawnParticle(e){const t=un[e.agentId],i=document.createElement("div");i.className="char-particle",i.textContent="€",i.style.cssText=`left:${e.x+2}%;top:${e.y-2}%;color:${t?.color??"#00ff88"}`,this.container.appendChild(i),setTimeout(()=>i.remove(),1400)}}function pr(n,e,t){return Math.max(e,Math.min(t,n))}let Et=null;function Yt(){try{return Et||(Et=new AudioContext),Et.state==="suspended"&&Et.resume(),Et}catch{return null}}function Ce(n,e,t,i,s=.12,r="sine"){const o=n.createOscillator(),a=n.createGain();o.connect(a),a.connect(n.destination),o.type=r,o.frequency.value=e,a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(s,t+.01),a.gain.exponentialRampToValueAtTime(.001,t+i),o.start(t),o.stop(t+i)}function Sl(){const n=Yt();n&&(Ce(n,900,n.currentTime,.06,.08,"square"),Ce(n,600,n.currentTime+.02,.05,.05))}function Qt(){const n=Yt();n&&[523.25,659.25,783.99].forEach((e,t)=>{Ce(n,e,n.currentTime+t*.09,.28,.1)})}function kl(){const n=Yt();n&&[523.25,659.25,783.99,1046.5].forEach((e,t)=>{Ce(n,e,n.currentTime+t*.07,.35,.12)})}function ms(){const n=Yt();n&&(Ce(n,180,n.currentTime,1.8,.18),Ce(n,360,n.currentTime+.02,.6,.08),[1046.5,1318.5,1567.98].forEach((e,t)=>{Ce(n,e,n.currentTime+.05+t*.06,.25,.07)}))}function Al(){const n=Yt();n&&[1046.5,880,659.25,523.25,392].forEach((e,t)=>{Ce(n,e,n.currentTime+t*.12,.5,.13)})}const Rl=3e4,Pl=3,Nl=60,xl=120;class Ml{clickTimestamps=[];intervals=[];active=!1;replayTimer=0;cooldownTimer=0;replayIdx=0;nextClickIn=0;cooldownMultiplier=1;setCooldownMultiplier(e){this.cooldownMultiplier=e}recordClick(){const e=Date.now();this.clickTimestamps.push(e),this.clickTimestamps=this.clickTimestamps.filter(t=>e-t<=Rl),this.intervals=[];for(let t=1;t<this.clickTimestamps.length;t++)this.intervals.push((this.clickTimestamps[t]-this.clickTimestamps[t-1])/1e3)}canActivate(){return!this.active&&this.cooldownTimer<=0&&this.clickTimestamps.length>=Pl}activate(){if(!this.canActivate())return;this.active=!0,this.replayTimer=Nl,this.replayIdx=0;const e=this.intervals.length>0?[...this.intervals].sort((t,i)=>t-i)[Math.floor(this.intervals.length/2)]:.5;this.nextClickIn=e}tick(e){if(!this.active)return this.cooldownTimer>0&&(this.cooldownTimer=Math.max(0,this.cooldownTimer-e)),0;if(this.replayTimer-=e,this.replayTimer<=0)return this.active=!1,this.cooldownTimer=xl*this.cooldownMultiplier,0;let t=0;for(this.nextClickIn-=e;this.nextClickIn<=0&&this.intervals.length>0;)t++,this.replayIdx=(this.replayIdx+1)%this.intervals.length,this.nextClickIn+=this.intervals[this.replayIdx]??.5;return t}getState(){return{canActivate:this.canActivate(),isActive:this.active,isOnCooldown:this.cooldownTimer>0,replayRemaining:Math.ceil(this.replayTimer),cooldownRemaining:Math.ceil(this.cooldownTimer),clicksRecorded:this.clickTimestamps.length}}}const yi=[{client:"MégaRetail",urgency:"🔴 CRITIQUE",problem:"Le chatbot répond avec des infos de 2022 et invente des promos inexistantes.",question:"Quelle est la meilleure solution à court terme ?",answers:["Augmenter la température du modèle à 1.5","Implémenter du RAG avec le catalogue produits à jour","Passer à un modèle plus récent"],correct:1,lesson:"Le RAG (Retrieval Augmented Generation) ancre les réponses dans des données réelles actualisées — le modèle ne peut répondre que ce qui est dans la base.",reward:800},{client:"PharmaPlus",urgency:"🔴 URGENT",problem:"L'agent invente des posologies de médicaments — données potentiellement dangereuses.",question:"Comment sécuriser le système en priorité ?",answers:["Ajouter un disclaimer légal dans les réponses","Contraindre les réponses à la base de données médicale validée uniquement","Passer en mode conversationnel libre pour plus de souplesse"],correct:1,lesson:"Pour les domaines critiques, le modèle doit être ancré dans une base validée. Les hallucinations sont réduites de 80%+ quand on gronde le modèle avec des sources fiables.",reward:1200},{client:"SpeedLogistix",urgency:"🟠 IMPORTANT",problem:"Les appels API coûtent 3× le budget prévu. Le client menace de résilier.",question:"Quelle est la cause la plus probable ?",answers:["Le modèle utilise trop de puissance de calcul","Les prompts sont trop longs et il n'y a pas de cache sémantique","Le serveur retente les appels trop souvent"],correct:1,lesson:"Le cache sémantique stocke les réponses à des requêtes similaires. Combiné à la compression de prompts, il réduit les coûts de 60 à 80%.",reward:600},{client:"LexGroup",urgency:"🔴 CRITIQUE",problem:"Un utilisateur a réussi à faire ignorer les instructions du système au chatbot juridique.",question:"Ce type d'attaque s'appelle ?",answers:["SQL Injection","Prompt Injection","Cross-Site Scripting (XSS)"],correct:1,lesson:"Le Prompt Injection insère des instructions malveillantes dans l'input pour détourner le comportement du modèle. La validation des entrées et les garde-fous système sont essentiels.",reward:900},{client:"FluentAI",urgency:"🟠 IMPORTANT",problem:"Les traductions automatiques sont inconsistantes — même texte, résultats différents à chaque session.",question:"Quel paramètre est probablement mal configuré ?",answers:["La température est trop haute (0.9+)","Le modèle manque de mémoire RAM","Le prompt système est trop court"],correct:0,lesson:"La température contrôle la créativité du modèle. Pour les tâches de précision (traduction, extraction de données), une température basse (0.0-0.2) garantit des résultats cohérents.",reward:500},{client:"DataNova",urgency:"🟡 MOYEN",problem:"L'agent dépasse systématiquement la fenêtre de contexte quand les rapports sont longs.",question:"Quelle technique résout ce problème sans changer de modèle ?",answers:["Ignorer les parties trop longues du document","Découper le document en chunks et traiter par parties","Augmenter le budget pour un modèle 128k tokens"],correct:1,lesson:"Le chunking divise les longs documents en segments traités séquentiellement avec résumés intermédiaires. C'est la base de tout pipeline RAG robuste — avant d'augmenter les coûts.",reward:600},{client:"ViralBoost",urgency:"🟠 IMPORTANT",problem:"L'agent de génération de contenu tourne en boucle infinie sans jamais livrer de résultat.",question:"Qu'est-ce qui manque dans l'architecture de l'agent ?",answers:["Un modèle de langage plus performant","Une condition d'arrêt et un compteur maximum d'itérations","Plus de mémoire sur le serveur"],correct:1,lesson:"Tout agent doit avoir une condition d'arrêt explicite (max_iterations, stop_condition). Sans garde-fou, les agents LLM peuvent boucler indéfiniment et exploser la facture.",reward:700},{client:"GreenBank",urgency:"🔴 CRITIQUE",problem:"Des données clients PII sont envoyées à l'API OpenAI. Le DPO est en train d'appeler les avocats.",question:"Solution RGPD-compatible en urgence ?",answers:["Anonymiser les données avant envoi ou héberger le modèle en interne","Ajouter un bandeau de consentement cookie sur le site","Envoyer les données en HTTPS — c'est suffisant pour la conformité"],correct:0,lesson:"Les APIs cloud de LLM ne sont pas RGPD-safe par défaut. L'anonymisation (masquage PII) ou le self-hosting (Ollama, vLLM) sont les seules solutions réellement conformes.",reward:1500},{client:"QuickSort",urgency:"🟡 MOYEN",problem:"Le classifieur de tickets support a 65% de précision. Le client attendait 90%+.",question:"Comment améliorer rapidement les performances sans réentraîner ?",answers:["Passer directement à GPT-4 Turbo","Ajouter 3 à 5 exemples concrets dans le prompt (few-shot learning)","Entraîner un nouveau modèle from scratch sur les données internes"],correct:1,lesson:"Le few-shot learning (exemples dans le prompt) améliore souvent la précision de 15 à 30% sans coût d'entraînement. C'est toujours le premier levier à tester — avant de changer de modèle.",reward:700},{client:"PrimeCare",urgency:"🟠 IMPORTANT",problem:"Le modèle prend 8+ secondes pour répondre. Les utilisateurs abandonnent avant la fin.",question:"Quelle technique améliore la perception de vitesse sans changer de modèle ?",answers:["Réduire la longueur maximale des réponses à 50 tokens","Implémenter le streaming — afficher les tokens au fur et à mesure","Mettre toutes les réponses en cache côté serveur"],correct:1,lesson:"Le streaming affiche les tokens dès leur génération. L'utilisateur lit pendant que le modèle génère — la perception de vitesse est transformée même si le temps total ne change pas.",reward:500},{client:"AutoFleet",urgency:"🟡 MOYEN",problem:"Le workflow d'automatisation plante sans se relancer en cas d'erreur API intermittente.",question:"Quelle stratégie de résilience implémenter ?",answers:["Try/catch avec log d'erreur et arrêt du workflow","Exponential backoff avec retry automatique (3 tentatives espacées)","Envoyer une alerte Slack et attendre l'intervention manuelle"],correct:1,lesson:"L'exponential backoff (attendre 1s, puis 2s, puis 4s avant retry) est le standard pour les APIs instables. Elle évite de surcharger un service déjà en difficulté.",reward:600},{client:"MindScope",urgency:"🔴 CRITIQUE",problem:"L'agent d'analyse confond deux pathologies similaires dans 35% des cas.",question:"Quel est le premier levier d'amélioration à tester ?",answers:["Changer immédiatement de fournisseur d'API","Affiner le prompt avec des critères de différenciation précis et des contre-exemples","Augmenter la résolution des images envoyées au modèle"],correct:1,lesson:"Avant de changer de modèle, optimisez le prompt. Des critères de différenciation explicites et des contre-exemples concrets améliorent souvent la précision de 20 à 40%.",reward:1e3}];class Ol{nextIn;active=!1;usedIndices=new Set;constructor(){this.nextIn=210+Math.random()*90}tick(e,t){return!t||this.active?null:(this.nextIn-=e,this.nextIn<=0?(this.active=!0,this.pickQuestion()):null)}resolve(){this.active=!1,this.nextIn=180+Math.random()*120}pickQuestion(){this.usedIndices.size>=yi.length&&this.usedIndices.clear();let e;do e=Math.floor(Math.random()*yi.length);while(this.usedIndices.has(e));return this.usedIndices.add(e),yi[e]}}const bi=[{title:"👋 Bienvenue dans Bot Empire !",text:"Tu viens de fonder ton agence IA. Commence seul dans ta chambre d'ado — et scale jusqu'au siège social d'unicorn.",target:null,next:"Allons-y !"},{title:"⚡ Exécute ta première tâche",text:"Clique ici pour gagner tes premières €. Chaque clic = mission livrée = argent.",target:"btn-click",next:"Compris →"},{title:"🤖 Recrute tes premiers agents",text:"Les agents travaillent 24h/24, même quand tu dors. Commence par un Bot Workflows — il automatise tout.",target:"panel-right",next:"Voir les agents →"},{title:"🏢 Ton bureau évolue avec toi",text:"Regarde ici ! Chaque agent recruté apparaît dans ton bureau. Chambre → Home Office → Startup → Unicorn.",target:"bureau",next:"Let's go ! 🚀"}],mr="tuto-done",dn=300;class Ll{step=0;overlay;card;titleEl;textEl;nextBtn;skipBtn;stepLbl;active=!1;constructor(){this.overlay=document.getElementById("tutorial-overlay"),this.card=document.getElementById("tuto-card"),this.titleEl=document.getElementById("tuto-title"),this.textEl=document.getElementById("tuto-text"),this.nextBtn=document.getElementById("tuto-next"),this.skipBtn=document.getElementById("tuto-skip"),this.stepLbl=document.getElementById("tuto-step"),this.nextBtn.addEventListener("click",()=>this.next()),this.skipBtn.addEventListener("click",()=>this.complete())}shouldStart(){return!localStorage.getItem(mr)}start(){this.shouldStart()&&(this.active=!0,this.step=0,this.overlay.classList.remove("hidden"),this.render())}isActive(){return this.active}render(){const e=bi[this.step];if(!e){this.complete();return}this.titleEl.textContent=e.title,this.textEl.textContent=e.text,this.nextBtn.textContent=e.next,this.stepLbl.textContent=`${this.step+1} / ${bi.length}`,document.querySelectorAll(".tuto-hl").forEach(t=>t.classList.remove("tuto-hl")),e.target&&document.getElementById(e.target)?.classList.add("tuto-hl"),this.positionCard(e.target)}positionCard(e){if(!e){this.card.style.cssText=`position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:${dn}px`;return}const t=document.getElementById(e);if(!t){this.positionCard(null);return}const i=t.getBoundingClientRect(),s=window.innerWidth,r=window.innerHeight,o=14,a=200;let c;i.bottom+a+o<r?c=i.bottom+o:c=Math.max(o,i.top-a-o);let l=i.left+i.width/2-dn/2;l=Math.max(o,Math.min(l,s-dn-o)),this.card.style.cssText=`position:fixed;top:${c}px;left:${l}px;width:${dn}px`}next(){this.step++,this.step>=bi.length?this.complete():this.render()}complete(){this.active=!1,this.overlay.classList.add("hidden"),document.querySelectorAll(".tuto-hl").forEach(e=>e.classList.remove("tuto-hl")),localStorage.setItem(mr,"1")}}const Dl=()=>{};var gr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw mt(e)},mt=function(n){return new Error("Firebase Database ("+Bo.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $o=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Ul=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},gs={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,m=l&63;c||(m=64,o||(h=64)),i.push(t[u],t[d],t[h],t[m])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray($o(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Ul(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new Fl;const h=r<<2|a>>4;if(i.push(h),l!==64){const m=a<<4&240|l>>2;if(i.push(m),d!==64){const g=l<<6&192|d;i.push(g)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Fl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const qo=function(n){const e=$o(n);return gs.encodeByteArray(e,!0)},Sn=function(n){return qo(n).replace(/\./g,"")},kn=function(n){try{return gs.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(n){return Wo(void 0,n)}function Wo(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!$l(t)||(n[t]=Wo(n[t],e[t]));return n}function $l(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ql(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wl=()=>ql().__FIREBASE_DEFAULTS__,Hl=()=>{if(typeof process>"u"||typeof gr>"u")return;const n=gr.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Vl=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&kn(n[1]);return e&&JSON.parse(e)},_s=()=>{try{return Dl()||Wl()||Hl()||Vl()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ho=n=>_s()?.emulatorHosts?.[n],jl=n=>{const e=Ho(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Vo=()=>_s()?.config,jo=n=>_s()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gl(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Sn(JSON.stringify(t)),Sn(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function vs(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test($())}function zl(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Kl(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Go(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Yl(){const n=$();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ql(){return Bo.NODE_ADMIN===!0}function Jl(){try{return typeof indexedDB=="object"}catch{return!1}}function Xl(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl="FirebaseError";class De extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Zl,Object.setPrototypeOf(this,De.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Jt.prototype.create)}}class Jt{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?eu(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new De(s,a,i)}}function eu(n,e){return n.replace(tu,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const tu=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(n){return JSON.parse(n)}function x(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zo=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=Lt(kn(r[0])||""),t=Lt(kn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},nu=function(n){const e=zo(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},iu=function(n){const e=zo(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function lt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Vi(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function An(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function He(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(_r(r)&&_r(o)){if(!He(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function _r(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function ru(n,e){const t=new ou(n,e);return t.subscribe.bind(t)}class ou{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");au(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Ii),s.error===void 0&&(s.error=Ii),s.complete===void 0&&(s.complete=Ii);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function au(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ii(){}function ys(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,f(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ni=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ko(n){return(await fetch(n,{credentials:"include"})).ok}class Ve{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new ti;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(du(e))try{this.getOrInitializeService({instanceIdentifier:Fe})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=Fe){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Fe){return this.instances.has(e)}getOptions(e=Fe){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:uu(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=Fe){return this.component?this.component.multipleInstances?e:Fe:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function uu(n){return n===Fe?void 0:n}function du(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new lu(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var C;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(C||(C={}));const fu={debug:C.DEBUG,verbose:C.VERBOSE,info:C.INFO,warn:C.WARN,error:C.ERROR,silent:C.SILENT},pu=C.INFO,mu={[C.DEBUG]:"log",[C.VERBOSE]:"log",[C.INFO]:"info",[C.WARN]:"warn",[C.ERROR]:"error"},gu=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=mu[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class bs{constructor(e){this.name=e,this._logLevel=pu,this._logHandler=gu,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in C))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?fu[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,C.DEBUG,...e),this._logHandler(this,C.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,C.VERBOSE,...e),this._logHandler(this,C.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,C.INFO,...e),this._logHandler(this,C.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,C.WARN,...e),this._logHandler(this,C.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,C.ERROR,...e),this._logHandler(this,C.ERROR,...e)}}const _u=(n,e)=>e.some(t=>n instanceof t);let vr,yr;function vu(){return vr||(vr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function yu(){return yr||(yr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Yo=new WeakMap,ji=new WeakMap,Qo=new WeakMap,Ei=new WeakMap,Is=new WeakMap;function bu(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(Te(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Yo.set(t,n)}).catch(()=>{}),Is.set(e,n),e}function Iu(n){if(ji.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});ji.set(n,e)}let Gi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ji.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Qo.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Te(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Eu(n){Gi=n(Gi)}function wu(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(wi(this),e,...t);return Qo.set(i,e.sort?e.sort():[e]),Te(i)}:yu().includes(n)?function(...e){return n.apply(wi(this),e),Te(Yo.get(this))}:function(...e){return Te(n.apply(wi(this),e))}}function Cu(n){return typeof n=="function"?wu(n):(n instanceof IDBTransaction&&Iu(n),_u(n,vu())?new Proxy(n,Gi):n)}function Te(n){if(n instanceof IDBRequest)return bu(n);if(Ei.has(n))return Ei.get(n);const e=Cu(n);return e!==n&&(Ei.set(n,e),Is.set(e,n)),e}const wi=n=>Is.get(n);function Tu(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=Te(o);return i&&o.addEventListener("upgradeneeded",c=>{i(Te(o.result),c.oldVersion,c.newVersion,Te(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Su=["get","getKey","getAll","getAllKeys","count"],ku=["put","add","delete","clear"],Ci=new Map;function br(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ci.get(e))return Ci.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=ku.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Su.includes(t)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return Ci.set(e,r),r}Eu(n=>({...n,get:(e,t,i)=>br(e,t)||n.get(e,t,i),has:(e,t)=>!!br(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ru(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Ru(n){return n.getComponent()?.type==="VERSION"}const zi="@firebase/app",Ir="0.14.11";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue=new bs("@firebase/app"),Pu="@firebase/app-compat",Nu="@firebase/analytics-compat",xu="@firebase/analytics",Mu="@firebase/app-check-compat",Ou="@firebase/app-check",Lu="@firebase/auth",Du="@firebase/auth-compat",Uu="@firebase/database",Fu="@firebase/data-connect",Bu="@firebase/database-compat",$u="@firebase/functions",qu="@firebase/functions-compat",Wu="@firebase/installations",Hu="@firebase/installations-compat",Vu="@firebase/messaging",ju="@firebase/messaging-compat",Gu="@firebase/performance",zu="@firebase/performance-compat",Ku="@firebase/remote-config",Yu="@firebase/remote-config-compat",Qu="@firebase/storage",Ju="@firebase/storage-compat",Xu="@firebase/firestore",Zu="@firebase/ai",ed="@firebase/firestore-compat",td="firebase",nd="12.12.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ki="[DEFAULT]",id={[zi]:"fire-core",[Pu]:"fire-core-compat",[xu]:"fire-analytics",[Nu]:"fire-analytics-compat",[Ou]:"fire-app-check",[Mu]:"fire-app-check-compat",[Lu]:"fire-auth",[Du]:"fire-auth-compat",[Uu]:"fire-rtdb",[Fu]:"fire-data-connect",[Bu]:"fire-rtdb-compat",[$u]:"fire-fn",[qu]:"fire-fn-compat",[Wu]:"fire-iid",[Hu]:"fire-iid-compat",[Vu]:"fire-fcm",[ju]:"fire-fcm-compat",[Gu]:"fire-perf",[zu]:"fire-perf-compat",[Ku]:"fire-rc",[Yu]:"fire-rc-compat",[Qu]:"fire-gcs",[Ju]:"fire-gcs-compat",[Xu]:"fire-fst",[ed]:"fire-fst-compat",[Zu]:"fire-vertex","fire-js":"fire-js",[td]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rn=new Map,sd=new Map,Yi=new Map;function Er(n,e){try{n.container.addComponent(e)}catch(t){ue.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ut(n){const e=n.name;if(Yi.has(e))return ue.debug(`There were multiple attempts to register component ${e}.`),!1;Yi.set(e,n);for(const t of Rn.values())Er(t,n);for(const t of sd.values())Er(t,n);return!0}function Es(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function z(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Se=new Jt("app","Firebase",rd);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Ve("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Se.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _t=nd;function Jo(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Ki,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw Se.create("bad-app-name",{appName:String(s)});if(t||(t=Vo()),!t)throw Se.create("no-options");const r=Rn.get(s);if(r){if(He(t,r.options)&&He(i,r.config))return r;throw Se.create("duplicate-app",{appName:s})}const o=new hu(s);for(const c of Yi.values())o.addComponent(c);const a=new od(t,i,o);return Rn.set(s,a),a}function Xo(n=Ki){const e=Rn.get(n);if(!e&&n===Ki&&Vo())return Jo();if(!e)throw Se.create("no-app",{appName:n});return e}function ke(n,e,t){let i=id[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ue.warn(o.join(" "));return}ut(new Ve(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="firebase-heartbeat-database",cd=1,Dt="firebase-heartbeat-store";let Ti=null;function Zo(){return Ti||(Ti=Tu(ad,cd,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Dt)}catch(t){console.warn(t)}}}}).catch(n=>{throw Se.create("idb-open",{originalErrorMessage:n.message})})),Ti}async function ld(n){try{const t=(await Zo()).transaction(Dt),i=await t.objectStore(Dt).get(ea(n));return await t.done,i}catch(e){if(e instanceof De)ue.warn(e.message);else{const t=Se.create("idb-get",{originalErrorMessage:e?.message});ue.warn(t.message)}}}async function wr(n,e){try{const i=(await Zo()).transaction(Dt,"readwrite");await i.objectStore(Dt).put(e,ea(n)),await i.done}catch(t){if(t instanceof De)ue.warn(t.message);else{const i=Se.create("idb-set",{originalErrorMessage:t?.message});ue.warn(i.message)}}}function ea(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ud=1024,dd=30;class hd{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new pd(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Cr();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>dd){const s=md(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ue.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Cr(),{heartbeatsToSend:t,unsentEntries:i}=fd(this._heartbeatsCache.heartbeats),s=Sn(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return ue.warn(e),""}}}function Cr(){return new Date().toISOString().substring(0,10)}function fd(n,e=ud){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Tr(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Tr(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class pd{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Jl()?Xl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ld(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return wr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return wr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Tr(n){return Sn(JSON.stringify({version:2,heartbeats:n})).length}function md(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(n){ut(new Ve("platform-logger",e=>new Au(e),"PRIVATE")),ut(new Ve("heartbeat",e=>new hd(e),"PRIVATE")),ke(zi,Ir,n),ke(zi,Ir,"esm2020"),ke("fire-js","")}gd("");var _d="firebase",vd="12.12.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ke(_d,vd,"app");function ta(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const yd=ta,na=new Jt("auth","Firebase",ta());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn=new bs("@firebase/auth");function bd(n,...e){Pn.logLevel<=C.WARN&&Pn.warn(`Auth (${_t}): ${n}`,...e)}function bn(n,...e){Pn.logLevel<=C.ERROR&&Pn.error(`Auth (${_t}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(n,...e){throw ws(n,...e)}function te(n,...e){return ws(n,...e)}function ia(n,e,t){const i={...yd(),[e]:t};return new Jt("auth","Firebase",i).create(e,{appName:n.name})}function Ae(n){return ia(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ws(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return na.create(n,...e)}function v(n,e,...t){if(!n)throw ws(e,...t)}function oe(n){const e="INTERNAL ASSERTION FAILED: "+n;throw bn(e),new Error(e)}function he(n,e){n||oe(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qi(){return typeof self<"u"&&self.location?.href||""}function Id(){return Sr()==="http:"||Sr()==="https:"}function Sr(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Id()||Kl()||"connection"in navigator)?navigator.onLine:!0}function wd(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(e,t){this.shortDelay=e,this.longDelay=t,he(t>e,"Short delay should be less than long delay!"),this.isMobile=vs()||Go()}get(){return Ed()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(n,e){he(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;oe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;oe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;oe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Sd=new Zt(3e4,6e4);function ii(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function vt(n,e,t,i,s={}){return ra(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=gt({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:c,...r};return zl()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&Xt(n.emulatorConfig.host)&&(l.credentials="include"),sa.fetch()(await aa(n,n.config.apiHost,t,a),l)})}async function ra(n,e,t){n._canInitEmulator=!1;const i={...Cd,...e};try{const s=new kd(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw hn(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw hn(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw hn(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw hn(n,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw ia(n,u,l);de(n,u)}}catch(s){if(s instanceof De)throw s;de(n,"network-request-failed",{message:String(s)})}}async function oa(n,e,t,i,s={}){const r=await vt(n,e,t,i,s);return"mfaPendingCredential"in r&&de(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function aa(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?Cs(n.config,s):`${n.config.apiScheme}://${s}`;return Td.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class kd{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(te(this.auth,"network-request-failed")),Sd.get())})}}function hn(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=te(n,e,i);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ad(n,e){return vt(n,"POST","/v1/accounts:delete",e)}async function Nn(n,e){return vt(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Rd(n,e=!1){const t=G(n),i=await t.getIdToken(e),s=Ts(i);v(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:At(Si(s.auth_time)),issuedAtTime:At(Si(s.iat)),expirationTime:At(Si(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function Si(n){return Number(n)*1e3}function Ts(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return bn("JWT malformed, contained fewer than 3 sections"),null;try{const s=kn(t);return s?JSON.parse(s):(bn("Failed to decode base64 JWT payload"),null)}catch(s){return bn("Caught error parsing JWT payload as JSON",s?.toString()),null}}function kr(n){const e=Ts(n);return v(e,"internal-error"),v(typeof e.exp<"u","internal-error"),v(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ut(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof De&&Pd(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Pd({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nd{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=At(this.lastLoginAt),this.creationTime=At(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xn(n){const e=n.auth,t=await n.getIdToken(),i=await Ut(n,Nn(e,{idToken:t}));v(i?.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=s.providerUserInfo?.length?ca(s.providerUserInfo):[],o=Md(n.providerData,r),a=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Ji(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,u)}async function xd(n){const e=G(n);await xn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Md(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function ca(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Od(n,e){const t=await ra(n,{},async()=>{const i=gt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await aa(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return n.emulatorConfig&&Xt(n.emulatorConfig.host)&&(c.credentials="include"),sa.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ld(n,e){return vt(n,"POST","/v2/accounts:revokeToken",ii(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){v(e.idToken,"internal-error"),v(typeof e.idToken<"u","internal-error"),v(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):kr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){v(e.length!==0,"internal-error");const t=kr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(v(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await Od(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new it;return i&&(v(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(v(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(v(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new it,this.toJSON())}_performRefresh(){return oe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(n,e){v(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Y{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new Nd(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ji(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Ut(this,this.stsTokenManager.getToken(this.auth,e));return v(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Rd(this,e)}reload(){return xd(this)}_assign(e){this!==e&&(v(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Y({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){v(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await xn(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(z(this.auth.app))return Promise.reject(Ae(this.auth));const e=await this.getIdToken();return await Ut(this,Ad(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:m,providerData:g,stsTokenManager:w}=t;v(d&&w,e,"internal-error");const O=it.fromJSON(this.name,w);v(typeof d=="string",e,"internal-error"),_e(i,e.name),_e(s,e.name),v(typeof h=="boolean",e,"internal-error"),v(typeof m=="boolean",e,"internal-error"),_e(r,e.name),_e(o,e.name),_e(a,e.name),_e(c,e.name),_e(l,e.name),_e(u,e.name);const ee=new Y({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:m,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:O,createdAt:l,lastLoginAt:u});return g&&Array.isArray(g)&&(ee.providerData=g.map(Je=>({...Je}))),c&&(ee._redirectEventId=c),ee}static async _fromIdTokenResponse(e,t,i=!1){const s=new it;s.updateFromServerResponse(t);const r=new Y({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await xn(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];v(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?ca(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new it;a.updateFromIdToken(i);const c=new Y({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Ji(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ar=new Map;function ae(n){he(n instanceof Function,"Expected a class definition");let e=Ar.get(n);return e?(he(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ar.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}la.type="NONE";const Rr=la;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function In(n,e,t){return`firebase:${n}:${e}:${t}`}class st{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=In(this.userKey,s.apiKey,r),this.fullPersistenceKey=In("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Nn(this.auth,{idToken:e}).catch(()=>{});return t?Y._fromGetAccountInfoResponse(this.auth,t,e):null}return Y._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new st(ae(Rr),e,i);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||ae(Rr);const o=In(i,e.config.apiKey,e.name);let a=null;for(const l of t)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await Nn(e,{idToken:u}).catch(()=>{});if(!h)break;d=await Y._fromGetAccountInfoResponse(e,h,u)}else d=Y._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new st(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new st(r,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pr(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(fa(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ua(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ma(e))return"Blackberry";if(ga(e))return"Webos";if(da(e))return"Safari";if((e.includes("chrome/")||ha(e))&&!e.includes("edge/"))return"Chrome";if(pa(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function ua(n=$()){return/firefox\//i.test(n)}function da(n=$()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ha(n=$()){return/crios\//i.test(n)}function fa(n=$()){return/iemobile/i.test(n)}function pa(n=$()){return/android/i.test(n)}function ma(n=$()){return/blackberry/i.test(n)}function ga(n=$()){return/webos/i.test(n)}function Ss(n=$()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Dd(n=$()){return Ss(n)&&!!window.navigator?.standalone}function Ud(){return Yl()&&document.documentMode===10}function _a(n=$()){return Ss(n)||pa(n)||ga(n)||ma(n)||/windows phone/i.test(n)||fa(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function va(n,e=[]){let t;switch(n){case"Browser":t=Pr($());break;case"Worker":t=`${Pr($())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${_t}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fd{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bd(n,e={}){return vt(n,"GET","/v2/passwordPolicy",ii(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $d=6;class qd{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??$d,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Nr(this),this.idTokenSubscription=new Nr(this),this.beforeStateQueue=new Fd(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=na,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ae(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await st.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Nn(this,{idToken:e}),i=await Y._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(z(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return v(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await xn(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=wd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(z(this.app))return Promise.reject(Ae(this));const t=e?G(e):null;return t&&v(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&v(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return z(this.app)?Promise.reject(Ae(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return z(this.app)?Promise.reject(Ae(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ae(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Bd(this),t=new qd(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Jt("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await Ld(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ae(e)||this._popupRedirectResolver;v(t,this,"argument-error"),this.redirectPersistenceManager=await st.create(this,[ae(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(v(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return v(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=va(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(z(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&bd(`Error while retrieving App Check token: ${e.error}`),e?.token}}function si(n){return G(n)}class Nr{constructor(e){this.auth=e,this.observer=null,this.addObserver=ru(t=>this.observer=t)}get next(){return v(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ks={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Hd(n){ks=n}function Vd(n){return ks.loadJS(n)}function jd(){return ks.gapiScript}function Gd(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(n,e){const t=Es(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(He(r,e??{}))return s;de(s,"already-initialized")}return t.initialize({options:e})}function Kd(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(ae);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Yd(n,e,t){const i=si(n);v(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=ya(e),{host:o,port:a}=Qd(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){v(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),v(He(l,i.config.emulator)&&He(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,Xt(o)?Ko(`${r}//${o}${c}`):Jd()}function ya(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Qd(n){const e=ya(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:xr(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:xr(o)}}}function xr(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Jd(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return oe("not implemented")}_getIdTokenResponse(e){return oe("not implemented")}_linkToIdToken(e,t){return oe("not implemented")}_getReauthenticationResolver(e){return oe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rt(n,e){return oa(n,"POST","/v1/accounts:signInWithIdp",ii(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd="http://localhost";class je extends ba{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new je(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):de("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=t;if(!i||!s)return null;const o=new je(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return rt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,rt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,rt(e,t)}buildRequest(){const e={requestUri:Xd,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=gt(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en extends Ia{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye extends en{constructor(){super("facebook.com")}static credential(e){return je._fromParams({providerId:ye.PROVIDER_ID,signInMethod:ye.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ye.credentialFromTaggedObject(e)}static credentialFromError(e){return ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ye.credential(e.oauthAccessToken)}catch{return null}}}ye.FACEBOOK_SIGN_IN_METHOD="facebook.com";ye.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be extends en{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return je._fromParams({providerId:be.PROVIDER_ID,signInMethod:be.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return be.credentialFromTaggedObject(e)}static credentialFromError(e){return be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return be.credential(t,i)}catch{return null}}}be.GOOGLE_SIGN_IN_METHOD="google.com";be.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie extends en{constructor(){super("github.com")}static credential(e){return je._fromParams({providerId:Ie.PROVIDER_ID,signInMethod:Ie.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ie.credentialFromTaggedObject(e)}static credentialFromError(e){return Ie.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ie.credential(e.oauthAccessToken)}catch{return null}}}Ie.GITHUB_SIGN_IN_METHOD="github.com";Ie.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee extends en{constructor(){super("twitter.com")}static credential(e,t){return je._fromParams({providerId:Ee.PROVIDER_ID,signInMethod:Ee.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ee.credentialFromTaggedObject(e)}static credentialFromError(e){return Ee.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Ee.credential(t,i)}catch{return null}}}Ee.TWITTER_SIGN_IN_METHOD="twitter.com";Ee.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zd(n,e){return oa(n,"POST","/v1/accounts:signUp",ii(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await Y._fromIdTokenResponse(e,i,s),o=Mr(i);return new xe({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Mr(i);return new xe({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Mr(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eh(n){if(z(n.app))return Promise.reject(Ae(n));const e=si(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new xe({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await Zd(e,{returnSecureToken:!0}),i=await xe._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn extends De{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,Mn.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new Mn(e,t,i,s)}}function Ea(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Mn._fromErrorAndOperation(n,r,e,i):r})}async function th(n,e,t=!1){const i=await Ut(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return xe._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nh(n,e,t=!1){const{auth:i}=n;if(z(i.app))return Promise.reject(Ae(i));const s="reauthenticate";try{const r=await Ut(n,Ea(i,s,e,n),t);v(r.idToken,i,"internal-error");const o=Ts(r.idToken);v(o,i,"internal-error");const{sub:a}=o;return v(n.uid===a,i,"user-mismatch"),xe._forOperation(n,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&de(i,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ih(n,e,t=!1){if(z(n.app))return Promise.reject(Ae(n));const i="signIn",s=await Ea(n,i,e),r=await xe._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function sh(n,e,t,i){return G(n).onIdTokenChanged(e,t,i)}function rh(n,e,t){return G(n).beforeAuthStateChanged(e,t)}const On="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(On,"1"),this.storage.removeItem(On),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oh=1e3,ah=10;class Ca extends wa{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=_a(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);Ud()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ah):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},oh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ca.type="LOCAL";const ch=Ca;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta extends wa{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Ta.type="SESSION";const Sa=Ta;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lh(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new ri(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,r)),c=await lh(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ri.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=As("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(){return window}function dh(n){ne().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ka(){return typeof ne().WorkerGlobalScope<"u"&&typeof ne().importScripts=="function"}async function hh(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function fh(){return navigator?.serviceWorker?.controller||null}function ph(){return ka()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Aa="firebaseLocalStorageDb",mh=1,Ln="firebaseLocalStorage",Ra="fbase_key";class tn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function oi(n,e){return n.transaction([Ln],e?"readwrite":"readonly").objectStore(Ln)}function gh(){const n=indexedDB.deleteDatabase(Aa);return new tn(n).toPromise()}function Xi(){const n=indexedDB.open(Aa,mh);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Ln,{keyPath:Ra})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Ln)?e(i):(i.close(),await gh(),e(await Xi()))})})}async function Or(n,e,t){const i=oi(n,!0).put({[Ra]:e,value:t});return new tn(i).toPromise()}async function _h(n,e){const t=oi(n,!1).get(e),i=await new tn(t).toPromise();return i===void 0?null:i.value}function Lr(n,e){const t=oi(n,!0).delete(e);return new tn(t).toPromise()}const vh=800,yh=3;class Pa{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Xi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>yh)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ka()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ri._getInstance(ph()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await hh(),!this.activeServiceWorker)return;this.sender=new uh(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||fh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Xi();return await Or(e,On,"1"),await Lr(e,On),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Or(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>_h(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Lr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=oi(s,!1).getAll();return new tn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),vh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Pa.type="LOCAL";const bh=Pa;new Zt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ih(n,e){return e?ae(e):(v(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs extends ba{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return rt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return rt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return rt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Eh(n){return ih(n.auth,new Rs(n),n.bypassAuthState)}function wh(n){const{auth:e,user:t}=n;return v(t,e,"internal-error"),nh(t,new Rs(n),n.bypassAuthState)}async function Ch(n){const{auth:e,user:t}=n;return v(t,e,"internal-error"),th(t,new Rs(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Eh;case"linkViaPopup":case"linkViaRedirect":return Ch;case"reauthViaPopup":case"reauthViaRedirect":return wh;default:de(this.auth,"internal-error")}}resolve(e){he(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){he(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Th=new Zt(2e3,1e4);class Ze extends Na{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,Ze.currentPopupAction&&Ze.currentPopupAction.cancel(),Ze.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return v(e,this.auth,"internal-error"),e}async onExecution(){he(this.filter.length===1,"Popup operations only handle one event");const e=As();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(te(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(te(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ze.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(te(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Th.get())};e()}}Ze.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="pendingRedirect",En=new Map;class kh extends Na{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=En.get(this.auth._key());if(!e){try{const i=await Ah(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}En.set(this.auth._key(),e)}return this.bypassAuthState||En.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ah(n,e){const t=Nh(e),i=Ph(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function Rh(n,e){En.set(n._key(),e)}function Ph(n){return ae(n._redirectPersistence)}function Nh(n){return In(Sh,n.config.apiKey,n.name)}async function xh(n,e,t=!1){if(z(n.app))return Promise.reject(Ae(n));const i=si(n),s=Ih(i,e),o=await new kh(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mh=600*1e3;class Oh{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Lh(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!xa(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";t.onError(te(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Mh&&this.cachedEventUids.clear(),this.cachedEventUids.has(Dr(e))}saveEventToCache(e){this.cachedEventUids.add(Dr(e)),this.lastProcessedEventTime=Date.now()}}function Dr(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function xa({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Lh(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return xa(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Dh(n,e={}){return vt(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Fh=/^https?/;async function Bh(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Dh(n);for(const t of e)try{if($h(t))return}catch{}de(n,"unauthorized-domain")}function $h(n){const e=Qi(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!Fh.test(t))return!1;if(Uh.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qh=new Zt(3e4,6e4);function Ur(){const n=ne().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Wh(n){return new Promise((e,t)=>{function i(){Ur(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ur(),t(te(n,"network-request-failed"))},timeout:qh.get()})}if(ne().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ne().gapi?.load)i();else{const s=Gd("iframefcb");return ne()[s]=()=>{gapi.load?i():t(te(n,"network-request-failed"))},Vd(`${jd()}?onload=${s}`).catch(r=>t(r))}}).catch(e=>{throw wn=null,e})}let wn=null;function Hh(n){return wn=wn||Wh(n),wn}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh=new Zt(5e3,15e3),jh="__/auth/iframe",Gh="emulator/auth/iframe",zh={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Kh=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Yh(n){const e=n.config;v(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Cs(e,Gh):`https://${n.config.authDomain}/${jh}`,i={apiKey:e.apiKey,appName:n.name,v:_t},s=Kh.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${gt(i).slice(1)}`}async function Qh(n){const e=await Hh(n),t=ne().gapi;return v(t,n,"internal-error"),e.open({where:document.body,url:Yh(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:zh,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=te(n,"network-request-failed"),a=ne().setTimeout(()=>{r(o)},Vh.get());function c(){ne().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Xh=500,Zh=600,ef="_blank",tf="http://localhost";class Fr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function nf(n,e,t,i=Xh,s=Zh){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...Jh,width:i.toString(),height:s.toString(),top:r,left:o},l=$().toLowerCase();t&&(a=ha(l)?ef:t),ua(l)&&(e=e||tf,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[m,g])=>`${h}${m}=${g},`,"");if(Dd(l)&&a!=="_self")return sf(e||"",a),new Fr(null);const d=window.open(e||"",a,u);v(d,n,"popup-blocked");try{d.focus()}catch{}return new Fr(d)}function sf(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf="__/auth/handler",of="emulator/auth/handler",af=encodeURIComponent("fac");async function Br(n,e,t,i,s,r){v(n.config.authDomain,n,"auth-domain-config-required"),v(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:_t,eventId:s};if(e instanceof Ia){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Vi(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof en){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await n._getAppCheckToken(),l=c?`#${af}=${encodeURIComponent(c)}`:"";return`${cf(n)}?${gt(a).slice(1)}${l}`}function cf({config:n}){return n.emulator?Cs(n,of):`https://${n.authDomain}/${rf}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ki="webStorageSupport";class lf{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Sa,this._completeRedirectFn=xh,this._overrideRedirectResult=Rh}async _openPopup(e,t,i,s){he(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await Br(e,t,i,Qi(),s);return nf(e,r,As())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Br(e,t,i,Qi(),s);return dh(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(he(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Qh(e),i=new Oh(e);return t.register("authEvent",s=>(v(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ki,{type:ki},s=>{const r=s?.[0]?.[ki];r!==void 0&&t(!!r),de(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Bh(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return _a()||da()||Ss()}}const uf=lf;var $r="@firebase/auth",qr="1.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){v(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hf(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ff(n){ut(new Ve("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;v(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:va(n)},l=new Wd(i,s,r,c);return Kd(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),ut(new Ve("auth-internal",e=>{const t=si(e.getProvider("auth").getImmediate());return(i=>new df(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ke($r,qr,hf(n)),ke($r,qr,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pf=300,mf=jo("authIdTokenMaxAge")||pf;let Wr=null;const gf=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>mf)return;const s=t?.token;Wr!==s&&(Wr=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function _f(n=Xo()){const e=Es(n,"auth");if(e.isInitialized())return e.getImmediate();const t=zd(n,{popupRedirectResolver:uf,persistence:[bh,ch,Sa]}),i=jo("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=gf(r.toString());rh(t,o,()=>o(t.currentUser)),sh(t,a=>o(a))}}const s=Ho("auth");return s&&Yd(t,`http://${s}`),t}function vf(){return document.getElementsByTagName("head")?.[0]??document}Hd({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=te("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",vf().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ff("Browser");var Hr={};const Vr="@firebase/database",jr="1.1.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ma="";function yf(n){Ma=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),x(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Lt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class If{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return me(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oa=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new bf(e)}}catch{}return new If},$e=Oa("localStorage"),Ef=Oa("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot=new bs("@firebase/database"),wf=(function(){let n=1;return function(){return n++}})(),La=function(n){const e=cu(n),t=new su;t.update(e);const i=t.digest();return gs.encodeByteArray(i)},nn=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=nn.apply(null,i):typeof i=="object"?e+=x(i):e+=i,e+=" "}return e};let Rt=null,Gr=!0;const Cf=function(n,e){f(!0,"Can't turn on custom loggers persistently."),ot.logLevel=C.VERBOSE,Rt=ot.log.bind(ot)},F=function(...n){if(Gr===!0&&(Gr=!1,Rt===null&&Ef.get("logging_enabled")===!0&&Cf()),Rt){const e=nn.apply(null,n);Rt(e)}},sn=function(n){return function(...e){F(n,...e)}},Zi=function(...n){const e="FIREBASE INTERNAL ERROR: "+nn(...n);ot.error(e)},fe=function(...n){const e=`FIREBASE FATAL ERROR: ${nn(...n)}`;throw ot.error(e),new Error(e)},W=function(...n){const e="FIREBASE WARNING: "+nn(...n);ot.warn(e)},Tf=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&W("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Da=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Sf=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},dt="[MIN_NAME]",Ge="[MAX_NAME]",yt=function(n,e){if(n===e)return 0;if(n===dt||e===Ge)return-1;if(e===dt||n===Ge)return 1;{const t=zr(n),i=zr(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},kf=function(n,e){return n===e?0:n<e?-1:1},wt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+x(e))},Ps=function(n){if(typeof n!="object"||n===null)return x(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=x(e[i]),t+=":",t+=Ps(n[e[i]]);return t+="}",t},Ua=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function H(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const Fa=function(n){f(!Da(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},Af=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Rf=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Pf(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Nf=new RegExp("^-?(0*)\\d{1,10}$"),xf=-2147483648,Mf=2147483647,zr=function(n){if(Nf.test(n)){const e=Number(n);if(e>=xf&&e<=Mf)return e}return null},bt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw W("Exception was thrown by user callback.",t),e},Math.floor(0))}},Of=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Pt=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,z(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){W(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(F("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',W(e)}}class Cn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Cn.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns="5",Ba="v",$a="s",qa="r",Wa="f",Ha=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Va="ls",ja="p",es="ac",Ga="websocket",za="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ka{constructor(e,t,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=$e.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&$e.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Uf(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Ya(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===Ga)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===za)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Uf(n)&&(t.ns=n.namespace);const s=[];return H(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff{constructor(){this.counters_={}}incrementCounter(e,t=1){me(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Bl(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ai={},Ri={};function xs(n){const e=n.toString();return Ai[e]||(Ai[e]=new Ff),Ai[e]}function Bf(n,e){const t=n.toString();return Ri[t]||(Ri[t]=e()),Ri[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&bt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kr="start",qf="close",Wf="pLPCommand",Hf="pRTLPCB",Qa="id",Ja="pw",Xa="ser",Vf="cb",jf="seg",Gf="ts",zf="d",Kf="dframe",Za=1870,ec=30,Yf=Za-ec,Qf=25e3,Jf=3e4;class et{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=sn(e),this.stats_=xs(t),this.urlFn=c=>(this.appCheckToken&&(c[es]=this.appCheckToken),Ya(t,za,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new $f(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Jf)),Sf(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Ms((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Kr)this.id=a,this.password=c;else if(o===qf)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Kr]="t",i[Xa]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Vf]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Ba]=Ns,this.transportSessionId&&(i[$a]=this.transportSessionId),this.lastSessionId&&(i[Va]=this.lastSessionId),this.applicationId&&(i[ja]=this.applicationId),this.appCheckToken&&(i[es]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ha.test(location.hostname)&&(i[qa]=Wa);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){et.forceAllow_=!0}static forceDisallow(){et.forceDisallow_=!0}static isAvailable(){return et.forceAllow_?!0:!et.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Af()&&!Rf()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=qo(t),s=Ua(i,Yf);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Kf]="t",i[Qa]=e,i[Ja]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=x(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Ms{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=wf(),window[Wf+this.uniqueCallbackIdentifier]=e,window[Hf+this.uniqueCallbackIdentifier]=t,this.myIFrame=Ms.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){F("frame writing exception"),a.stack&&F(a.stack),F(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||F("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Qa]=this.myID,e[Ja]=this.myPW,e[Xa]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+ec+i.length<=Za;){const o=this.pendingSegs.shift();i=i+"&"+jf+s+"="+o.seg+"&"+Gf+s+"="+o.ts+"&"+zf+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(Qf)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{F("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xf=16384,Zf=45e3;let Dn=null;typeof MozWebSocket<"u"?Dn=MozWebSocket:typeof WebSocket<"u"&&(Dn=WebSocket);class K{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=sn(this.connId),this.stats_=xs(t),this.connURL=K.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[Ba]=Ns,typeof location<"u"&&location.hostname&&Ha.test(location.hostname)&&(o[qa]=Wa),t&&(o[$a]=t),i&&(o[Va]=i),s&&(o[es]=s),r&&(o[ja]=r),Ya(e,Ga,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,$e.set("previous_websocket_failure",!0);try{let i;Ql(),this.mySock=new Dn(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){K.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Dn!==null&&!K.forceDisallow_}static previouslyFailed(){return $e.isInMemoryStorage||$e.get("previous_websocket_failure")===!0}markConnectionHealthy(){$e.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Lt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Ua(t,Xf);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Zf))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}K.responsesRequiredToBeHealthy=2;K.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{static get ALL_TRANSPORTS(){return[et,K]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=K&&K.isAvailable();let i=t&&!K.previouslyFailed();if(e.webSocketOnly&&(t||W("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[K];else{const s=this.transports_=[];for(const r of Ft.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Ft.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ft.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ep=6e4,tp=5e3,np=10*1024,ip=100*1024,Pi="t",Yr="d",sp="s",Qr="r",rp="e",Jr="o",Xr="a",Zr="n",eo="p",op="h";class ap{constructor(e,t,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=sn("c:"+this.id+":"),this.transportManager_=new Ft(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Pt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>ip?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>np?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Pi in e){const t=e[Pi];t===Xr?this.upgradeIfSecondaryHealthy_():t===Qr?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Jr&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=wt("t",e),i=wt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:eo,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Xr,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Zr,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=wt("t",e),i=wt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=wt(Pi,e);if(Yr in e){const i=e[Yr];if(t===op){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Zr){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===sp?this.onConnectionShutdown_(i):t===Qr?this.onReset_(i):t===rp?Zi("Server Error: "+i):t===Jr?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Zi("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Ns!==i&&W("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Pt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ep))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Pt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(tp))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:eo,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&($e.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tc{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un extends nc{static getInstance(){return new Un}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!vs()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to=32,no=768;class T{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function E(){return new T("")}function I(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Me(n){return n.pieces_.length-n.pieceNum_}function S(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new T(n.pieces_,e)}function ic(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function cp(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function sc(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function rc(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new T(e,0)}function M(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof T)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new T(t,0)}function b(n){return n.pieceNum_>=n.pieces_.length}function B(n,e){const t=I(n),i=I(e);if(t===null)return e;if(t===i)return B(S(n),S(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function oc(n,e){if(Me(n)!==Me(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Q(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Me(n)>Me(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class lp{constructor(e,t){this.errorPrefix_=t,this.parts_=sc(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=ni(this.parts_[i]);ac(this)}}function up(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=ni(e),ac(n)}function dp(n){const e=n.parts_.pop();n.byteLength_-=ni(e),n.parts_.length>0&&(n.byteLength_-=1)}function ac(n){if(n.byteLength_>no)throw new Error(n.errorPrefix_+"has a key path longer than "+no+" bytes ("+n.byteLength_+").");if(n.parts_.length>to)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+to+") or object contains a cycle "+Be(n))}function Be(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os extends nc{static getInstance(){return new Os}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct=1e3,hp=300*1e3,io=30*1e3,fp=1.3,pp=3e4,mp="server_kill",so=3;class le extends tc{constructor(e,t,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=le.nextPersistentConnectionId_++,this.log_=sn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ct,this.maxReconnectDelay_=hp,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Os.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Un.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(x(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new ti,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;le.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&me(e,"w")){const i=lt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();W(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||iu(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=io)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=nu(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+x(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Zi("Unrecognized action received from server: "+x(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ct,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ct,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>pp&&(this.reconnectDelay_=Ct),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*fp)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+le.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?F("getToken() completed but was canceled"):(F("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new ap(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,m=>{W(m+" ("+this.repoInfo_.toString()+")"),this.interrupt(mp)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&W(d),c())}}}interrupt(e){F("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){F("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Vi(this.interruptReasons_)&&(this.reconnectDelay_=Ct,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Ps(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new T(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){F("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=so&&(this.reconnectDelay_=io,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){F("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=so&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Ma.replace(/\./g,"-")]=1,vs()?e["framework.cordova"]=1:Go()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Un.getInstance().currentlyOnline();return Vi(this.interruptReasons_)&&e}}le.nextPersistentConnectionId_=0;le.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new y(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new y(dt,e),s=new y(dt,t);return this.compare(i,s)!==0}minPost(){return y.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fn;class cc extends ai{static get __EMPTY_NODE(){return fn}static set __EMPTY_NODE(e){fn=e}compare(e,t){return yt(e.name,t.name)}isDefinedOn(e){throw mt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return y.MIN}maxPost(){return new y(Ge,fn)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new y(e,fn)}toString(){return".key"}}const at=new cc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class D{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??D.RED,this.left=s??q.EMPTY_NODE,this.right=r??q.EMPTY_NODE}copy(e,t,i,s,r){return new D(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return q.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return q.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,D.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,D.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}D.RED=!0;D.BLACK=!1;class gp{copy(e,t,i,s,r){return this}insert(e,t,i){return new D(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class q{constructor(e,t=q.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new q(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,D.BLACK,null,null))}remove(e){return new q(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,D.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new pn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new pn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new pn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new pn(this.root_,null,this.comparator_,!0,e)}}q.EMPTY_NODE=new gp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _p(n,e){return yt(n.name,e.name)}function Ls(n,e){return yt(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ts;function vp(n){ts=n}const lc=function(n){return typeof n=="number"?"number:"+Fa(n):"string:"+n},uc=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&me(e,".sv"),"Priority must be a string or number.")}else f(n===ts||n.isEmpty(),"priority of unexpected type.");f(n===ts||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ro;class L{static set __childrenNodeConstructor(e){ro=e}static get __childrenNodeConstructor(){return ro}constructor(e,t=L.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),uc(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new L(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return b(e)?this:I(e)===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:L.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=I(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||Me(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,L.__childrenNodeConstructor.EMPTY_NODE.updateChild(S(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+lc(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=Fa(this.value_):e+=this.value_,this.lazyHash_=La(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===L.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof L.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=L.VALUE_TYPE_ORDER.indexOf(t),r=L.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}L.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let dc,hc;function yp(n){dc=n}function bp(n){hc=n}class Ip extends ai{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?yt(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return y.MIN}maxPost(){return new y(Ge,new L("[PRIORITY-POST]",hc))}makePost(e,t){const i=dc(e);return new y(t,new L("[PRIORITY-POST]",i))}toString(){return".priority"}}const P=new Ip;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep=Math.log(2);class wp{constructor(e){const t=r=>parseInt(Math.log(r)/Ep,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Fn=function(n,e,t,i){n.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=n[c],h=t?t(d):d,new D(h,d.node,D.BLACK,null,null);{const m=parseInt(u/2,10)+c,g=s(c,m),w=s(m+1,l);return d=n[m],h=t?t(d):d,new D(h,d.node,D.BLACK,g,w)}},r=function(c){let l=null,u=null,d=n.length;const h=function(g,w){const O=d-g,ee=d;d-=g;const Je=s(O+1,ee),_i=n[O],ll=t?t(_i):_i;m(new D(ll,_i.node,w,null,Je))},m=function(g){l?(l.left=g,l=g):(u=g,l=g)};for(let g=0;g<c.count;++g){const w=c.nextBitIsOne(),O=Math.pow(2,c.count-(g+1));w?h(O,D.BLACK):(h(O,D.BLACK),h(O,D.RED))}return u},o=new wp(n.length),a=r(o);return new q(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ni;const Xe={};class ce{static get Default(){return f(Xe&&P,"ChildrenNode.ts has not been loaded"),Ni=Ni||new ce({".priority":Xe},{".priority":P}),Ni}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=lt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof q?t:null}hasIndex(e){return me(this.indexSet_,e.toString())}addIndex(e,t){f(e!==at,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(y.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Fn(i,e.getCompare()):a=Xe;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new ce(u,l)}addToIndexes(e,t){const i=An(this.indexes_,(s,r)=>{const o=lt(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===Xe)if(o.isDefinedOn(e.node)){const a=[],c=t.getIterator(y.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),Fn(a,o.getCompare())}else return Xe;else{const a=t.get(e.name);let c=s;return a&&(c=c.remove(new y(e.name,a))),c.insert(e,e.node)}});return new ce(i,this.indexSet_)}removeFromIndexes(e,t){const i=An(this.indexes_,s=>{if(s===Xe)return s;{const r=t.get(e.name);return r?s.remove(new y(e.name,r)):s}});return new ce(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Tt;class _{static get EMPTY_NODE(){return Tt||(Tt=new _(new q(Ls),null,ce.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&uc(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Tt}updatePriority(e){return this.children_.isEmpty()?this:new _(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Tt:t}}getChild(e){const t=I(e);return t===null?this:this.getImmediateChild(t).getChild(S(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new y(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Tt:this.priorityNode_;return new _(s,o,r)}}updateChild(e,t){const i=I(e);if(i===null)return t;{f(I(e)!==".priority"||Me(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(S(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(P,(o,a)=>{t[o]=a.val(e),i++,r&&_.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+lc(this.getPriority().val())+":"),this.forEachChild(P,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":La(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new y(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new y(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new y(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,y.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,y.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===rn?-1:0}withIndex(e){if(e===at||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new _(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===at||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(P),s=t.getIterator(P);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===at?null:this.indexMap_.get(e.toString())}}_.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Cp extends _{constructor(){super(new q(Ls),_.EMPTY_NODE,ce.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return _.EMPTY_NODE}isEmpty(){return!1}}const rn=new Cp;Object.defineProperties(y,{MIN:{value:new y(dt,_.EMPTY_NODE)},MAX:{value:new y(Ge,rn)}});cc.__EMPTY_NODE=_.EMPTY_NODE;L.__childrenNodeConstructor=_;vp(rn);bp(rn);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tp=!0;function U(n,e=null){if(n===null)return _.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new L(t,U(e))}if(!(n instanceof Array)&&Tp){const t=[];let i=!1;if(H(n,(o,a)=>{if(o.substring(0,1)!=="."){const c=U(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new y(o,c)))}}),t.length===0)return _.EMPTY_NODE;const r=Fn(t,_p,o=>o.name,Ls);if(i){const o=Fn(t,P.getCompare());return new _(r,U(e),new ce({".priority":o},{".priority":P}))}else return new _(r,U(e),ce.Default)}else{let t=_.EMPTY_NODE;return H(n,(i,s)=>{if(me(n,i)&&i.substring(0,1)!=="."){const r=U(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(U(e))}}yp(U);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp extends ai{constructor(e){super(),this.indexPath_=e,f(!b(e)&&I(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?yt(e.name,t.name):r}makePost(e,t){const i=U(e),s=_.EMPTY_NODE.updateChild(this.indexPath_,i);return new y(t,s)}maxPost(){const e=_.EMPTY_NODE.updateChild(this.indexPath_,rn);return new y(Ge,e)}toString(){return sc(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp extends ai{compare(e,t){const i=e.node.compareTo(t.node);return i===0?yt(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return y.MIN}maxPost(){return y.MAX}makePost(e,t){const i=U(e);return new y(t,i)}toString(){return".value"}}const Ap=new kp;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fc(n){return{type:"value",snapshotNode:n}}function ht(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Bt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function $t(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Rp(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(Bt(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(ht(t,i)):o.trackChildChange($t(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(P,(s,r)=>{t.hasChild(s)||i.trackChildChange(Bt(s,r))}),t.isLeafNode()||t.forEachChild(P,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange($t(s,r,o))}else i.trackChildChange(ht(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?_.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this.indexedFilter_=new Ds(e.getIndex()),this.index_=e.getIndex(),this.startPost_=qt.getStartPost_(e),this.endPost_=qt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new y(t,i))||(i=_.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=_.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(_.EMPTY_NODE);const r=this;return t.forEachChild(P,(o,a)=>{r.matches(new y(o,a))||(s=s.updateImmediateChild(o,_.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new qt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new y(t,i))||(i=_.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=_.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=_.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(_.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,_.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,m)=>d(m,h)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const c=new y(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(t)){const d=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const m=h==null?1:o(h,c);if(u&&!i.isEmpty()&&m>=0)return r?.trackChildChange($t(t,i,d)),a.updateImmediateChild(t,i);{r?.trackChildChange(Bt(t,d));const w=a.updateImmediateChild(t,_.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(ht(h.name,h.node)),w.updateImmediateChild(h.name,h.node)):w}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(Bt(l.name,l.node)),r.trackChildChange(ht(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,_.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=P}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:dt}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ge}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===P}copy(){const e=new Us;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Np(n){return n.loadsAllData()?new Ds(n.getIndex()):n.hasLimit()?new Pp(n):new qt(n)}function oo(n){const e={};if(n.isDefault())return e;let t;if(n.index_===P?t="$priority":n.index_===Ap?t="$value":n.index_===at?t="$key":(f(n.index_ instanceof Sp,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=x(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=x(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+x(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=x(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+x(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function ao(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==P&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn extends tc{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=sn("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Bn.getListenId_(e,i),a={};this.listens_[o]=a;const c=oo(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),lt(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,t){const i=Bn.getListenId_(e,t);delete this.listens_[i]}get(e){const t=oo(e._queryParams),i=e._path.toString(),s=new ti;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+gt(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=Lt(a.responseText)}catch{W("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&W("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(){this.rootNode_=_.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(){return{value:null,children:new Map}}function pc(n,e,t){if(b(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=I(e);n.children.has(i)||n.children.set(i,$n());const s=n.children.get(i);e=S(e),pc(s,e,t)}}function ns(n,e,t){n.value!==null?t(e,n.value):Mp(n,(i,s)=>{const r=new T(e.toString()+"/"+i);ns(s,r,t)})}function Mp(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&H(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const co=10*1e3,Lp=30*1e3,Dp=300*1e3;class Up{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Op(e);const i=co+(Lp-co)*Math.random();Pt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;H(e,(s,r)=>{r>0&&me(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Pt(this.reportStats_.bind(this),Math.floor(Math.random()*2*Dp))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(J||(J={}));function mc(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Fs(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Bs(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=J.ACK_USER_WRITE,this.source=mc()}operationForChild(e){if(b(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new T(e));return new qn(E(),t,this.revert)}}else return f(I(this.path)===e,"operationForChild called for unrelated child."),new qn(S(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(e,t){this.source=e,this.path=t,this.type=J.LISTEN_COMPLETE}operationForChild(e){return b(this.path)?new Wt(this.source,E()):new Wt(this.source,S(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=J.OVERWRITE}operationForChild(e){return b(this.path)?new ze(this.source,E(),this.snap.getImmediateChild(e)):new ze(this.source,S(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ht{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=J.MERGE}operationForChild(e){if(b(this.path)){const t=this.children.subtree(new T(e));return t.isEmpty()?null:t.value?new ze(this.source,E(),t.value):new Ht(this.source,E(),t)}else return f(I(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ht(this.source,S(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(b(e))return this.isFullyInitialized()&&!this.filtered_;const t=I(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Bp(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Rp(o.childName,o.snapshotNode))}),St(n,s,"child_removed",e,i,t),St(n,s,"child_added",e,i,t),St(n,s,"child_moved",r,i,t),St(n,s,"child_changed",e,i,t),St(n,s,"value",e,i,t),s}function St(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,c)=>qp(n,a,c)),o.forEach(a=>{const c=$p(n,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function $p(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function qp(n,e,t){if(e.childName==null||t.childName==null)throw mt("Should only compare child_ events.");const i=new y(e.childName,e.snapshotNode),s=new y(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ci(n,e){return{eventCache:n,serverCache:e}}function Nt(n,e,t,i){return ci(new Oe(e,t,i),n.serverCache)}function gc(n,e,t,i){return ci(n.eventCache,new Oe(e,t,i))}function Wn(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ke(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xi;const Wp=()=>(xi||(xi=new q(kf)),xi);class k{static fromObject(e){let t=new k(null);return H(e,(i,s)=>{t=t.set(new T(i),s)}),t}constructor(e,t=Wp()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(b(e))return null;{const i=I(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(S(e),t);return r!=null?{path:M(new T(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(b(e))return this;{const t=I(e),i=this.children.get(t);return i!==null?i.subtree(S(e)):new k(null)}}set(e,t){if(b(e))return new k(t,this.children);{const i=I(e),r=(this.children.get(i)||new k(null)).set(S(e),t),o=this.children.insert(i,r);return new k(this.value,o)}}remove(e){if(b(e))return this.children.isEmpty()?new k(null):new k(null,this.children);{const t=I(e),i=this.children.get(t);if(i){const s=i.remove(S(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new k(null):new k(this.value,r)}else return this}}get(e){if(b(e))return this.value;{const t=I(e),i=this.children.get(t);return i?i.get(S(e)):null}}setTree(e,t){if(b(e))return t;{const i=I(e),r=(this.children.get(i)||new k(null)).setTree(S(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new k(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(M(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(b(e))return null;{const r=I(e),o=this.children.get(r);return o?o.findOnPath_(S(e),M(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,i){if(b(e))return this;{this.value&&i(t,this.value);const s=I(e),r=this.children.get(s);return r?r.foreachOnPath_(S(e),M(t,s),i):new k(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(M(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.writeTree_=e}static empty(){return new Z(new k(null))}}function xt(n,e,t){if(b(e))return new Z(new k(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=B(s,e);return r=r.updateChild(o,t),new Z(n.writeTree_.set(s,r))}else{const s=new k(t),r=n.writeTree_.setTree(e,s);return new Z(r)}}}function lo(n,e,t){let i=n;return H(t,(s,r)=>{i=xt(i,M(e,s),r)}),i}function uo(n,e){if(b(e))return Z.empty();{const t=n.writeTree_.setTree(e,new k(null));return new Z(t)}}function is(n,e){return Qe(n,e)!=null}function Qe(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(B(t.path,e)):null}function ho(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(P,(i,s)=>{e.push(new y(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new y(i,s.value))}),e}function Re(n,e){if(b(e))return n;{const t=Qe(n,e);return t!=null?new Z(new k(t)):new Z(n.writeTree_.subtree(e))}}function ss(n){return n.writeTree_.isEmpty()}function ft(n,e){return _c(E(),n.writeTree_,e)}function _c(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=_c(M(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(M(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(n,e){return Ic(e,n)}function Hp(n,e,t,i,s){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=xt(n.visibleWrites,e,t)),n.lastWriteId=i}function Vp(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function jp(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&Gp(a,i.path)?s=!1:Q(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return zp(n),!0;if(i.snap)n.visibleWrites=uo(n.visibleWrites,i.path);else{const a=i.children;H(a,c=>{n.visibleWrites=uo(n.visibleWrites,M(i.path,c))})}return!0}else return!1}function Gp(n,e){if(n.snap)return Q(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Q(M(n.path,t),e))return!0;return!1}function zp(n){n.visibleWrites=vc(n.allWrites,Kp,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function Kp(n){return n.visible}function vc(n,e,t){let i=Z.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)Q(t,o)?(a=B(t,o),i=xt(i,a,r.snap)):Q(o,t)&&(a=B(o,t),i=xt(i,E(),r.snap.getChild(a)));else if(r.children){if(Q(t,o))a=B(t,o),i=lo(i,a,r.children);else if(Q(o,t))if(a=B(o,t),b(a))i=lo(i,E(),r.children);else{const c=lt(r.children,I(a));if(c){const l=c.getChild(S(a));i=xt(i,E(),l)}}}else throw mt("WriteRecord should have .snap or .children")}}return i}function yc(n,e,t,i,s){if(!i&&!s){const r=Qe(n.visibleWrites,e);if(r!=null)return r;{const o=Re(n.visibleWrites,e);if(ss(o))return t;if(t==null&&!is(o,E()))return null;{const a=t||_.EMPTY_NODE;return ft(o,a)}}}else{const r=Re(n.visibleWrites,e);if(!s&&ss(r))return t;if(!s&&t==null&&!is(r,E()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(Q(l.path,e)||Q(e,l.path))},a=vc(n.allWrites,o,e),c=t||_.EMPTY_NODE;return ft(a,c)}}}function Yp(n,e,t){let i=_.EMPTY_NODE;const s=Qe(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(P,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=Re(n.visibleWrites,e);return t.forEachChild(P,(o,a)=>{const c=ft(Re(r,new T(o)),a);i=i.updateImmediateChild(o,c)}),ho(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=Re(n.visibleWrites,e);return ho(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Qp(n,e,t,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=M(e,t);if(is(n.visibleWrites,r))return null;{const o=Re(n.visibleWrites,r);return ss(o)?s.getChild(t):ft(o,s.getChild(t))}}function Jp(n,e,t,i){const s=M(e,t),r=Qe(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=Re(n.visibleWrites,s);return ft(o,i.getNode().getImmediateChild(t))}else return null}function Xp(n,e){return Qe(n.visibleWrites,e)}function Zp(n,e,t,i,s,r,o){let a;const c=Re(n.visibleWrites,e),l=Qe(c,E());if(l!=null)a=l;else if(t!=null)a=ft(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let m=h.getNext();for(;m&&u.length<s;)d(m,i)!==0&&u.push(m),m=h.getNext();return u}else return[]}function em(){return{visibleWrites:Z.empty(),allWrites:[],lastWriteId:-1}}function Hn(n,e,t,i){return yc(n.writeTree,n.treePath,e,t,i)}function $s(n,e){return Yp(n.writeTree,n.treePath,e)}function fo(n,e,t,i){return Qp(n.writeTree,n.treePath,e,t,i)}function Vn(n,e){return Xp(n.writeTree,M(n.treePath,e))}function tm(n,e,t,i,s,r){return Zp(n.writeTree,n.treePath,e,t,i,s,r)}function qs(n,e,t){return Jp(n.writeTree,n.treePath,e,t)}function bc(n,e){return Ic(M(n.treePath,e),n.writeTree)}function Ic(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,$t(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,Bt(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,ht(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,$t(i,e.snapshotNode,s.oldSnap));else throw mt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Ec=new im;class Ws{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Oe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return qs(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ke(this.viewCache_),r=tm(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sm(n){return{filter:n}}function rm(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function om(n,e,t,i,s){const r=new nm;let o,a;if(t.type===J.OVERWRITE){const l=t;l.source.fromUser?o=rs(n,e,l.path,l.snap,i,s,r):(f(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!b(l.path),o=jn(n,e,l.path,l.snap,i,s,a,r))}else if(t.type===J.MERGE){const l=t;l.source.fromUser?o=cm(n,e,l.path,l.children,i,s,r):(f(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=os(n,e,l.path,l.children,i,s,a,r))}else if(t.type===J.ACK_USER_WRITE){const l=t;l.revert?o=dm(n,e,l.path,i,s,r):o=lm(n,e,l.path,l.affectedTree,i,s,r)}else if(t.type===J.LISTEN_COMPLETE)o=um(n,e,t.path,i,r);else throw mt("Unknown operation type: "+t.type);const c=r.getChanges();return am(e,o,c),{viewCache:o,changes:c}}function am(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Wn(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(fc(Wn(e)))}}function wc(n,e,t,i,s,r){const o=e.eventCache;if(Vn(i,t)!=null)return e;{let a,c;if(b(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=Ke(e),u=l instanceof _?l:_.EMPTY_NODE,d=$s(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=Hn(i,Ke(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=I(t);if(l===".priority"){f(Me(t)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=fo(i,t,u,c);d!=null?a=n.filter.updatePriority(u,d):a=o.getNode()}else{const u=S(t);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=fo(i,t,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=qs(i,l,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return Nt(e,a,o.isFullyInitialized()||b(t),n.filter.filtersNodes())}}function jn(n,e,t,i,s,r,o,a){const c=e.serverCache;let l;const u=o?n.filter:n.filter.getIndexedFilter();if(b(t))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const m=c.getNode().updateChild(t,i);l=u.updateFullNode(c.getNode(),m,null)}else{const m=I(t);if(!c.isCompleteForPath(t)&&Me(t)>1)return e;const g=S(t),O=c.getNode().getImmediateChild(m).updateChild(g,i);m===".priority"?l=u.updatePriority(c.getNode(),O):l=u.updateChild(c.getNode(),m,O,g,Ec,null)}const d=gc(e,l,c.isFullyInitialized()||b(t),u.filtersNodes()),h=new Ws(s,d,r);return wc(n,d,t,s,h,a)}function rs(n,e,t,i,s,r,o){const a=e.eventCache;let c,l;const u=new Ws(s,e,r);if(b(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=Nt(e,l,!0,n.filter.filtersNodes());else{const d=I(t);if(d===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=Nt(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=S(t),m=a.getNode().getImmediateChild(d);let g;if(b(h))g=i;else{const w=u.getCompleteChild(d);w!=null?ic(h)===".priority"&&w.getChild(rc(h)).isEmpty()?g=w:g=w.updateChild(h,i):g=_.EMPTY_NODE}if(m.equals(g))c=e;else{const w=n.filter.updateChild(a.getNode(),d,g,h,u,o);c=Nt(e,w,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function po(n,e){return n.eventCache.isCompleteForChild(e)}function cm(n,e,t,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=M(t,c);po(e,I(u))&&(a=rs(n,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=M(t,c);po(e,I(u))||(a=rs(n,a,u,l,s,r,o))}),a}function mo(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function os(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;b(t)?l=i:l=new k(null).setTree(t,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const m=e.serverCache.getNode().getImmediateChild(d),g=mo(n,m,h);c=jn(n,c,new T(d),g,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const m=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!m){const g=e.serverCache.getNode().getImmediateChild(d),w=mo(n,g,h);c=jn(n,c,new T(d),w,s,r,o,a)}}),c}function lm(n,e,t,i,s,r,o){if(Vn(s,t)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(b(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return jn(n,e,t,c.getNode().getChild(t),s,r,a,o);if(b(t)){let l=new k(null);return c.getNode().forEachChild(at,(u,d)=>{l=l.set(new T(u),d)}),os(n,e,t,l,s,r,a,o)}else return e}else{let l=new k(null);return i.foreach((u,d)=>{const h=M(t,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),os(n,e,t,l,s,r,a,o)}}function um(n,e,t,i,s){const r=e.serverCache,o=gc(e,r.getNode(),r.isFullyInitialized()||b(t),r.isFiltered());return wc(n,o,t,i,Ec,s)}function dm(n,e,t,i,s,r){let o;if(Vn(i,t)!=null)return e;{const a=new Ws(i,e,s),c=e.eventCache.getNode();let l;if(b(t)||I(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Hn(i,Ke(e));else{const d=e.serverCache.getNode();f(d instanceof _,"serverChildren would be complete if leaf node"),u=$s(i,d)}u=u,l=n.filter.updateFullNode(c,u,r)}else{const u=I(t);let d=qs(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=n.filter.updateChild(c,u,d,S(t),a,r):e.eventCache.getNode().hasChild(u)?l=n.filter.updateChild(c,u,_.EMPTY_NODE,S(t),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Hn(i,Ke(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Vn(i,E())!=null,Nt(e,l,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Ds(i.getIndex()),r=Np(i);this.processor_=sm(r);const o=t.serverCache,a=t.eventCache,c=s.updateFullNode(_.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(_.EMPTY_NODE,a.getNode(),null),u=new Oe(c,o.isFullyInitialized(),s.filtersNodes()),d=new Oe(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=ci(d,u),this.eventGenerator_=new Fp(this.query_)}get query(){return this.query_}}function fm(n){return n.viewCache_.serverCache.getNode()}function pm(n){return Wn(n.viewCache_)}function mm(n,e){const t=Ke(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!b(e)&&!t.getImmediateChild(I(e)).isEmpty())?t.getChild(e):null}function go(n){return n.eventRegistrations_.length===0}function gm(n,e){n.eventRegistrations_.push(e)}function _o(n,e,t){const i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function vo(n,e,t,i){e.type===J.MERGE&&e.source.queryId!==null&&(f(Ke(n.viewCache_),"We should always have a full cache before handling merges"),f(Wn(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=om(n.processor_,s,e,t,i);return rm(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Cc(n,r.changes,r.viewCache.eventCache.getNode(),null)}function _m(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(P,(r,o)=>{i.push(ht(r,o))}),t.isFullyInitialized()&&i.push(fc(t.getNode())),Cc(n,i,t.getNode(),e)}function Cc(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Bp(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gn;class Tc{constructor(){this.views=new Map}}function vm(n){f(!Gn,"__referenceConstructor has already been defined"),Gn=n}function ym(){return f(Gn,"Reference.ts has not been loaded"),Gn}function bm(n){return n.views.size===0}function Hs(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),vo(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(vo(o,e,t,i));return r}}function Sc(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Hn(t,s?i:null),c=!1;a?c=!0:i instanceof _?(a=$s(t,i),c=!1):(a=_.EMPTY_NODE,c=!1);const l=ci(new Oe(a,c,!1),new Oe(i,s,!1));return new hm(e,l)}return o}function Im(n,e,t,i,s,r){const o=Sc(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),gm(o,t),_m(o,t)}function Em(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=Le(n);if(s==="default")for(const[c,l]of n.views.entries())o=o.concat(_o(l,t,i)),go(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=n.views.get(s);c&&(o=o.concat(_o(c,t,i)),go(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!Le(n)&&r.push(new(ym())(e._repo,e._path)),{removed:r,events:o}}function kc(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function Pe(n,e){let t=null;for(const i of n.views.values())t=t||mm(i,e);return t}function Ac(n,e){if(e._queryParams.loadsAllData())return ui(n);{const i=e._queryIdentifier;return n.views.get(i)}}function Rc(n,e){return Ac(n,e)!=null}function Le(n){return ui(n)!=null}function ui(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zn;function wm(n){f(!zn,"__referenceConstructor has already been defined"),zn=n}function Cm(){return f(zn,"Reference.ts has not been loaded"),zn}let Tm=1;class yo{constructor(e){this.listenProvider_=e,this.syncPointTree_=new k(null),this.pendingWriteTree_=em(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Pc(n,e,t,i,s){return Hp(n.pendingWriteTree_,e,t,i,s),s?an(n,new ze(mc(),e,t)):[]}function qe(n,e,t=!1){const i=Vp(n.pendingWriteTree_,e);if(jp(n.pendingWriteTree_,e)){let r=new k(null);return i.snap!=null?r=r.set(E(),!0):H(i.children,o=>{r=r.set(new T(o),!0)}),an(n,new qn(i.path,r,t))}else return[]}function on(n,e,t){return an(n,new ze(Fs(),e,t))}function Sm(n,e,t){const i=k.fromObject(t);return an(n,new Ht(Fs(),e,i))}function km(n,e){return an(n,new Wt(Fs(),e))}function Am(n,e,t){const i=js(n,t);if(i){const s=Gs(i),r=s.path,o=s.queryId,a=B(r,e),c=new Wt(Bs(o),a);return zs(n,r,c)}else return[]}function Nc(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Rc(o,e))){const c=Em(o,e,t,i);bm(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(h,m)=>Le(m));if(u&&!d){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const m=xm(h);for(let g=0;g<m.length;++g){const w=m[g],O=w.query,ee=Lc(n,w);n.listenProvider_.startListening(Mt(O),Vt(n,O),ee.hashFn,ee.onComplete)}}}!d&&l.length>0&&!i&&(u?n.listenProvider_.stopListening(Mt(e),null):l.forEach(h=>{const m=n.queryToTagMap.get(di(h));n.listenProvider_.stopListening(Mt(h),m)}))}Mm(n,l)}return a}function xc(n,e,t,i){const s=js(n,i);if(s!=null){const r=Gs(s),o=r.path,a=r.queryId,c=B(o,e),l=new ze(Bs(a),c,t);return zs(n,o,l)}else return[]}function Rm(n,e,t,i){const s=js(n,i);if(s){const r=Gs(s),o=r.path,a=r.queryId,c=B(o,e),l=k.fromObject(t),u=new Ht(Bs(a),c,l);return zs(n,o,u)}else return[]}function Pm(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,m)=>{const g=B(h,s);r=r||Pe(m,g),o=o||Le(m)});let a=n.syncPointTree_.get(s);a?(o=o||Le(a),r=r||Pe(a,E())):(a=new Tc,n.syncPointTree_=n.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=_.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((m,g)=>{const w=Pe(g,E());w&&(r=r.updateImmediateChild(m,w))}));const l=Rc(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=di(e);f(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const m=Om();n.queryToTagMap.set(h,m),n.tagToQueryMap.set(m,h)}const u=li(n.pendingWriteTree_,s);let d=Im(a,e,t,u,r,c);if(!l&&!o&&!i){const h=Ac(a,e);d=d.concat(Lm(n,e,h))}return d}function Vs(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const c=B(o,e),l=Pe(a,c);if(l)return l});return yc(s,e,r,t,!0)}function Nm(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(l,u)=>{const d=B(l,t);i=i||Pe(u,d)});let s=n.syncPointTree_.get(t);s?i=i||Pe(s,E()):(s=new Tc,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new Oe(i,!0,!1):null,a=li(n.pendingWriteTree_,e._path),c=Sc(s,e,a,r?o.getNode():_.EMPTY_NODE,r);return pm(c)}function an(n,e){return Mc(e,n.syncPointTree_,null,li(n.pendingWriteTree_,E()))}function Mc(n,e,t,i){if(b(n.path))return Oc(n,e,t,i);{const s=e.get(E());t==null&&s!=null&&(t=Pe(s,E()));let r=[];const o=I(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){const l=t?t.getImmediateChild(o):null,u=bc(i,o);r=r.concat(Mc(a,c,l,u))}return s&&(r=r.concat(Hs(s,n,i,t))),r}}function Oc(n,e,t,i){const s=e.get(E());t==null&&s!=null&&(t=Pe(s,E()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=t?t.getImmediateChild(o):null,l=bc(i,o),u=n.operationForChild(o);u&&(r=r.concat(Oc(u,a,c,l)))}),s&&(r=r.concat(Hs(s,n,i,t))),r}function Lc(n,e){const t=e.query,i=Vt(n,t);return{hashFn:()=>(fm(e)||_.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Am(n,t._path,i):km(n,t._path);{const r=Pf(s,t);return Nc(n,t,null,r)}}}}function Vt(n,e){const t=di(e);return n.queryToTagMap.get(t)}function di(n){return n._path.toString()+"$"+n._queryIdentifier}function js(n,e){return n.tagToQueryMap.get(e)}function Gs(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new T(n.substr(0,e))}}function zs(n,e,t){const i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=li(n.pendingWriteTree_,e);return Hs(i,t,s,null)}function xm(n){return n.fold((e,t,i)=>{if(t&&Le(t))return[ui(t)];{let s=[];return t&&(s=kc(t)),H(i,(r,o)=>{s=s.concat(o)}),s}})}function Mt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Cm())(n._repo,n._path):n}function Mm(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=di(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function Om(){return Tm++}function Lm(n,e,t){const i=e._path,s=Vt(n,e),r=Lc(n,t),o=n.listenProvider_.startListening(Mt(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)f(!Le(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!b(l)&&u&&Le(u))return[ui(u).query];{let h=[];return u&&(h=h.concat(kc(u).map(m=>m.query))),H(d,(m,g)=>{h=h.concat(g)}),h}});for(let l=0;l<c.length;++l){const u=c[l];n.listenProvider_.stopListening(Mt(u),Vt(n,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Ks(t)}node(){return this.node_}}class Ys{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=M(this.path_,e);return new Ys(this.syncTree_,t)}node(){return Vs(this.syncTree_,this.path_)}}const Dm=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},bo=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return Um(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Fm(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},Um=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},Fm=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Bm=function(n,e,t,i){return Qs(e,new Ys(t,n),i)},Dc=function(n,e,t){return Qs(n,new Ks(e),t)};function Qs(n,e,t){const i=n.getPriority().val(),s=bo(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=bo(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new L(a,U(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new L(s))),o.forEachChild(P,(a,c)=>{const l=Qs(c,e.getImmediateChild(a),t);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Xs(n,e){let t=e instanceof T?e:new T(e),i=n,s=I(t);for(;s!==null;){const r=lt(i.node.children,s)||{children:{},childCount:0};i=new Js(s,i,r),t=S(t),s=I(t)}return i}function It(n){return n.node.value}function Uc(n,e){n.node.value=e,as(n)}function Fc(n){return n.node.childCount>0}function $m(n){return It(n)===void 0&&!Fc(n)}function hi(n,e){H(n.node.children,(t,i)=>{e(new Js(t,n,i))})}function Bc(n,e,t,i){t&&e(n),hi(n,s=>{Bc(s,e,!0)})}function qm(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function cn(n){return new T(n.parent===null?n.name:cn(n.parent)+"/"+n.name)}function as(n){n.parent!==null&&Wm(n.parent,n.name,n)}function Wm(n,e,t){const i=$m(t),s=me(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,as(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,as(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hm=/[\[\].#$\/\u0000-\u001F\u007F]/,Vm=/[\[\].#$\u0000-\u001F\u007F]/,Mi=10*1024*1024,$c=function(n){return typeof n=="string"&&n.length!==0&&!Hm.test(n)},qc=function(n){return typeof n=="string"&&n.length!==0&&!Vm.test(n)},jm=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),qc(n)},Gm=function(n,e,t,i){Zs(ys(n,"value"),e,t)},Zs=function(n,e,t){const i=t instanceof T?new lp(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Be(i));if(typeof e=="function")throw new Error(n+"contains a function "+Be(i)+" with contents = "+e.toString());if(Da(e))throw new Error(n+"contains "+e.toString()+" "+Be(i));if(typeof e=="string"&&e.length>Mi/3&&ni(e)>Mi)throw new Error(n+"contains a string greater than "+Mi+" utf8 bytes "+Be(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(H(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!$c(o)))throw new Error(n+" contains an invalid key ("+o+") "+Be(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);up(i,o),Zs(n,a,i),dp(i)}),s&&r)throw new Error(n+' contains ".value" child '+Be(i)+" in addition to actual children.")}},Wc=function(n,e,t,i){if(!qc(t))throw new Error(ys(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},zm=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),Wc(n,e,t)},Km=function(n,e){if(I(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},Ym=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!$c(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!jm(t))throw new Error(ys(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qm{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Hc(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!oc(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function se(n,e,t){Hc(n,t),Jm(n,i=>Q(i,e)||Q(e,i))}function Jm(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Xm(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Xm(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Rt&&F("event: "+t.toString()),bt(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zm="repo_interrupt",eg=25;class tg{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Qm,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=$n(),this.transactionQueueTree_=new Js,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ng(n,e,t){if(n.stats_=xs(n.repoInfo_),n.forceRestClient_||Of())n.server_=new Bn(n.repoInfo_,(i,s,r,o)=>{Io(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Eo(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{x(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new le(n.repoInfo_,e,(i,s,r,o)=>{Io(n,i,s,r,o)},i=>{Eo(n,i)},i=>{sg(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Bf(n.repoInfo_,()=>new Up(n.stats_,n.server_)),n.infoData_=new xp,n.infoSyncTree_=new yo({startListening:(i,s,r,o)=>{let a=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=on(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),tr(n,"connected",!1),n.serverSyncTree_=new yo({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);se(n.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function ig(n){const t=n.infoData_.getNode(new T(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function er(n){return Dm({timestamp:ig(n)})}function Io(n,e,t,i,s){n.dataUpdateCount++;const r=new T(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=An(t,l=>U(l));o=Rm(n.serverSyncTree_,r,c,s)}else{const c=U(t);o=xc(n.serverSyncTree_,r,c,s)}else if(i){const c=An(t,l=>U(l));o=Sm(n.serverSyncTree_,r,c)}else{const c=U(t);o=on(n.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=pi(n,r)),se(n.eventQueue_,a,o)}function Eo(n,e){tr(n,"connected",e),e===!1&&ag(n)}function sg(n,e){H(e,(t,i)=>{tr(n,t,i)})}function tr(n,e,t){const i=new T("/.info/"+e),s=U(t);n.infoData_.updateSnapshot(i,s);const r=on(n.infoSyncTree_,i,s);se(n.eventQueue_,i,r)}function Vc(n){return n.nextWriteId_++}function rg(n,e,t){const i=Nm(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=U(s).withIndex(e._queryParams.getIndex());Pm(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=on(n.serverSyncTree_,e._path,r);else{const a=Vt(n.serverSyncTree_,e);o=xc(n.serverSyncTree_,e._path,r,a)}return se(n.eventQueue_,e._path,o),Nc(n.serverSyncTree_,e,t,null,!0),r},s=>(fi(n,"get for query "+x(e)+" failed: "+s),Promise.reject(new Error(s))))}function og(n,e,t,i,s){fi(n,"set",{path:e.toString(),value:t,priority:i});const r=er(n),o=U(t,i),a=Vs(n.serverSyncTree_,e),c=Dc(o,a,r),l=Vc(n),u=Pc(n.serverSyncTree_,e,c,l,!0);Hc(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(h,m)=>{const g=h==="ok";g||W("set at "+e+" failed: "+h);const w=qe(n.serverSyncTree_,l,!g);se(n.eventQueue_,e,w),lg(n,s,h,m)});const d=Yc(n,e);pi(n,d),se(n.eventQueue_,d,[])}function ag(n){fi(n,"onDisconnectEvents");const e=er(n),t=$n();ns(n.onDisconnect_,E(),(s,r)=>{const o=Bm(s,r,n.serverSyncTree_,e);pc(t,s,o)});let i=[];ns(t,E(),(s,r)=>{i=i.concat(on(n.serverSyncTree_,s,r));const o=Yc(n,s);pi(n,o)}),n.onDisconnect_=$n(),se(n.eventQueue_,E(),i)}function cg(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Zm)}function fi(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),F(t,...e)}function lg(n,e,t,i){e&&bt(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function jc(n,e,t){return Vs(n.serverSyncTree_,e,t)||_.EMPTY_NODE}function nr(n,e=n.transactionQueueTree_){if(e||mi(n,e),It(e)){const t=zc(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&ug(n,cn(e),t)}else Fc(e)&&hi(e,t=>{nr(n,t)})}function ug(n,e,t){const i=t.map(l=>l.currentWriteId),s=jc(n,e,i);let r=s;const o=s.hash();for(let l=0;l<t.length;l++){const u=t[l];f(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=B(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;n.server_.put(c.toString(),a,l=>{fi(n,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<t.length;h++)t[h].status=2,u=u.concat(qe(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&d.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();mi(n,Xs(n.transactionQueueTree_,e)),nr(n,n.transactionQueueTree_),se(n.eventQueue_,e,u);for(let h=0;h<d.length;h++)bt(d[h])}else{if(l==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{W("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=l}pi(n,e)}},o)}function pi(n,e){const t=Gc(n,e),i=cn(t),s=zc(n,t);return dg(n,s,i),i}function dg(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=B(t,c.path);let u=!1,d;if(f(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(qe(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=eg)u=!0,d="maxretry",s=s.concat(qe(n.serverSyncTree_,c.currentWriteId,!0));else{const h=jc(n,c.path,o);c.currentInputSnapshot=h;const m=e[a].update(h.val());if(m!==void 0){Zs("transaction failed: Data returned ",m,c.path);let g=U(m);typeof m=="object"&&m!=null&&me(m,".priority")||(g=g.updatePriority(h.getPriority()));const O=c.currentWriteId,ee=er(n),Je=Dc(g,h,ee);c.currentOutputSnapshotRaw=g,c.currentOutputSnapshotResolved=Je,c.currentWriteId=Vc(n),o.splice(o.indexOf(O),1),s=s.concat(Pc(n.serverSyncTree_,c.path,Je,c.currentWriteId,c.applyLocally)),s=s.concat(qe(n.serverSyncTree_,O,!0))}else u=!0,d="nodata",s=s.concat(qe(n.serverSyncTree_,c.currentWriteId,!0))}se(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}mi(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)bt(i[a]);nr(n,n.transactionQueueTree_)}function Gc(n,e){let t,i=n.transactionQueueTree_;for(t=I(e);t!==null&&It(i)===void 0;)i=Xs(i,t),e=S(e),t=I(e);return i}function zc(n,e){const t=[];return Kc(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Kc(n,e,t){const i=It(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);hi(e,s=>{Kc(n,s,t)})}function mi(n,e){const t=It(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Uc(e,t.length>0?t:void 0)}hi(e,i=>{mi(n,i)})}function Yc(n,e){const t=cn(Gc(n,e)),i=Xs(n.transactionQueueTree_,e);return qm(i,s=>{Oi(n,s)}),Oi(n,i),Bc(i,s=>{Oi(n,s)}),t}function Oi(n,e){const t=It(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(qe(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Uc(e,void 0):t.length=r+1,se(n.eventQueue_,cn(e),s);for(let o=0;o<i.length;o++)bt(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hg(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function fg(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):W(`Invalid query segment '${t}' in query '${n}'`)}return e}const wo=function(n,e){const t=pg(n),i=t.namespace;t.domain==="firebase.com"&&fe(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&fe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Tf();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Ka(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new T(t.pathString)}},pg=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let u=n.indexOf("/");u===-1&&(u=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(u,d)),u<d&&(s=hg(n.substring(u,d)));const h=fg(n.substring(Math.min(n.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const m=e.slice(0,l);if(m.toLowerCase()==="localhost")t="localhost";else if(m.split(".").length<=2)t=m;else{const g=e.indexOf(".");i=e.substring(0,g).toLowerCase(),t=e.substring(g+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+x(this.snapshot.exportVal())}}class gg{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return b(this._path)?null:ic(this._path)}get ref(){return new ge(this._repo,this._path)}get _queryIdentifier(){const e=ao(this._queryParams),t=Ps(e);return t==="{}"?"default":t}get _queryObject(){return ao(this._queryParams)}isEqual(e){if(e=G(e),!(e instanceof ir))return!1;const t=this._repo===e._repo,i=oc(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+cp(this._path)}}class ge extends ir{constructor(e,t){super(e,t,new Us,!1)}get parent(){const e=rc(this._path);return e===null?null:new ge(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class jt{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new T(e),i=cs(this.ref,e);return new jt(this._node.getChild(t),i,P)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new jt(s,cs(this.ref,i),P)))}hasChild(e){const t=new T(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Co(n,e){return n=G(n),n._checkNotDeleted("ref"),e!==void 0?cs(n._root,e):n._root}function cs(n,e){return n=G(n),I(n._path)===null?zm("child","path",e):Wc("child","path",e),new ge(n._repo,M(n._path,e))}function vg(n,e){n=G(n),Km("set",n._path),Gm("set",e,n._path);const t=new ti;return og(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function yg(n){n=G(n);const e=new _g(()=>{}),t=new sr(e);return rg(n._repo,n,t).then(i=>new jt(i,new ge(n._repo,n._path),n._queryParams.getIndex()))}class sr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new mg("value",this,new jt(e.snapshotNode,new ge(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new gg(this,e,t):null}matches(e){return e instanceof sr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}vm(ge);wm(ge);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bg="FIREBASE_DATABASE_EMULATOR_HOST",ls={};let Ig=!1;function Eg(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Xt(r);n.repoInfo_=new Ka(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function wg(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||fe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),F("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=wo(r,s),a=o.repoInfo,c;typeof process<"u"&&Hr&&(c=Hr[bg]),c?(r=`http://${c}?ns=${a.namespace}`,o=wo(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new Df(n.name,n.options,e);Ym("Invalid Firebase Database URL",o),b(o.path)||fe("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Tg(a,n,l,new Lf(n,t));return new Sg(u,n)}function Cg(n,e){const t=ls[e];(!t||t[n.key]!==n)&&fe(`Database ${e}(${n.repoInfo_}) has already been deleted.`),cg(n),delete t[n.key]}function Tg(n,e,t,i){let s=ls[e.name];s||(s={},ls[e.name]=s);let r=s[n.toURLString()];return r&&fe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new tg(n,Ig,t,i),s[n.toURLString()]=r,r}class Sg{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(ng(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new ge(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Cg(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&fe("Cannot call "+e+" on a deleted database.")}}function kg(n=Xo(),e){const t=Es(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=jl("database");i&&Ag(t,...i)}return t}function Ag(n,e,t,i={}){n=G(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&He(i,r.repoInfo_.emulatorOptions))return;fe("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&fe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Cn(Cn.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:Gl(i.mockUserToken,n.app.options.projectId);o=new Cn(a)}Xt(e)&&Ko(e),Eg(r,s,i,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rg(n){yf(_t),ut(new Ve("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return wg(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),ke(Vr,jr,n),ke(Vr,jr,"esm2020")}le.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};le.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Rg();const To="saves",So="v1",Pg=300*1e3;class Ng{app=null;auth=null;db=null;user=null;timer=null;ready=!1;async init(e){try{this.app=Jo(e,"bot-empire"),this.auth=_f(this.app),this.db=kg(this.app);const t=await eh(this.auth);return this.user=t.user,this.ready=!0,console.info(`[CloudSave] connecté — uid: ${this.user.uid}`),!0}catch(t){return console.warn("[CloudSave] init échoué (mode offline)",t),!1}}isReady(){return this.ready&&!!this.user&&!!this.db}getUserId(){return this.user?.uid??null}async push(e){if(this.isReady())try{await vg(Co(this.db,`${To}/${this.user.uid}/${So}`),{...e,lastCloudSync:Date.now()})}catch(t){console.warn("[CloudSave] push échoué",t)}}async pull(){if(!this.isReady())return null;try{const e=await yg(Co(this.db,`${To}/${this.user.uid}/${So}`));return e.exists()?this.merge(e.val()):null}catch(e){return console.warn("[CloudSave] pull échoué",e),null}}async getIfNewer(e){const t=await this.pull();return t&&t.lastSave>e.lastSave+6e4?t:null}startAutoSync(e){this.timer=setInterval(()=>{this.push(e())},Pg),window.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&this.push(e())}),window.addEventListener("pagehide",()=>{this.push(e())})}stopAutoSync(){this.timer&&(clearInterval(this.timer),this.timer=null)}merge(e){const t=yn();return{...t,...e,agents:{...t.agents,...e.agents??{}},clientsUnlocked:{...t.clientsUnlocked,...e.clientsUnlocked??{}},upgradesPurchased:{...t.upgradesPurchased,...e.upgradesPurchased??{}}}}}const xg={apiKey:"AIzaSyBpJ1FCslNMQy4ZP9OKJy8mdBQM3k-o-E8",authDomain:"bot-empire-3d951.firebaseapp.com",databaseURL:"https://bot-empire-3d951-default-rtdb.europe-west1.firebasedatabase.app",projectId:"bot-empire-3d951",storageBucket:"bot-empire-3d951.firebasestorage.app",messagingSenderId:"216470924880",appId:"1:216470924880:web:a17363c8143fb0ba426b55"},ko=[{id:"audit-flash-retail",client:"QuickRetail",clientIcon:"🛒",title:"Audit Flash Chatbot",description:"Leur chatbot répond en 8s. Ils veulent du sub-2s. Audit express demandé.",reward:1200,duration:3*3600,workTime:120,rarity:"common",requiresRate:.5},{id:"content-rush-startup",client:"LaunchPad",clientIcon:"🚀",title:"20 posts LinkedIn urgents",description:"Levée de fonds dans 48h. Ils ont besoin de contenu maintenant.",reward:800,duration:2*3600,workTime:90,rarity:"common",requiresRate:.3},{id:"workflow-bug-fix",client:"AutoBiz",clientIcon:"⚙️",title:"Workflow planté en prod",description:"3 000 emails non envoyés depuis ce matin. Fix immédiat.",reward:1500,duration:1.5*3600,workTime:60,rarity:"common",requiresAgent:{id:"bot-workflows",count:1}},{id:"data-extract-simple",client:"DataFirst",clientIcon:"📊",title:"Extraction CSV → insights",description:"10 000 lignes à analyser. Rapport en 2h pour la réunion board.",reward:900,duration:2*3600,workTime:100,rarity:"common",requiresRate:.8},{id:"rgpd-quick-check",client:"E-Shop Pro",clientIcon:"🔒",title:"Vérification RGPD express",description:"Audit CNIL demandé pour demain. Formulaires et cookies à vérifier.",reward:1100,duration:4*3600,workTime:150,rarity:"common"},{id:"social-media-crisis",client:"BrandUp",clientIcon:"📱",title:"Gestion crise réseaux",description:"Post viral négatif. Besoin de 10 réponses calibrées dans l'heure.",reward:700,duration:1*3600,workTime:45,rarity:"common",requiresAgent:{id:"agent-copy",count:1}},{id:"api-integration-express",client:"ConnectApp",clientIcon:"🔗",title:"Intégration API express",description:"Connecter Stripe + n8n avant le lancement de demain.",reward:1300,duration:3*3600,workTime:110,rarity:"common",requiresAgent:{id:"bot-workflows",count:3}},{id:"newsletter-automation",client:"MailBlast",clientIcon:"📧",title:"Automation newsletter",description:"5 séquences d'onboarding à configurer. Client pressé.",reward:950,duration:5*3600,workTime:130,rarity:"common"},{id:"bank-audit-full",client:"FinanceCore",clientIcon:"🏦",title:"Audit IA complet — banque",description:"Conformité BCEAO + RGPD pour leur nouveau système de scoring crédit.",reward:15e3,duration:6*3600,workTime:300,rarity:"rare",requiresAgent:{id:"agent-audit",count:2}},{id:"hospital-chatbot",client:"CliniqIA",clientIcon:"🏥",title:"Déploiement chatbot médical",description:"Assistant triage urgences. Validation médicale requise. Contrat récurrent.",reward:22e3,duration:8*3600,workTime:400,rarity:"rare",requiresRate:5},{id:"media-scraping",client:"PressBot",clientIcon:"📰",title:"Pipeline médias temps réel",description:"500 sources RSS → résumés → newsletter. Architecture complète.",reward:12e3,duration:5*3600,workTime:250,rarity:"rare",requiresAgent:{id:"bot-workflows",count:10}},{id:"legal-contract-review",client:"LexCorp",clientIcon:"⚖️",title:"Revue 200 contrats IA",description:"Fusion en cours. 200 contrats fournisseurs à analyser en 24h.",reward:18e3,duration:7*3600,workTime:350,rarity:"rare",requiresAgent:{id:"agent-legal",count:1}},{id:"growth-series-a",client:"ScaleUp Corp",clientIcon:"📈",title:"Stratégie go-to-market Série A",description:"Pitch deck + 90j de content plan + outreach séquences. Urgence investisseurs.",reward:25e3,duration:8*3600,workTime:420,rarity:"rare",requiresAgent:{id:"agent-growth",count:2}},{id:"ecommerce-optimization",client:"MegaShop",clientIcon:"🛍️",title:"Optimisation conversion e-commerce",description:"A/B tests IA sur 40 landing pages. Deadline : Black Friday dans 3j.",reward:14e3,duration:6*3600,workTime:280,rarity:"rare",requiresRate:8},{id:"analytics-dashboard",client:"DataVision",clientIcon:"🔭",title:"Dashboard analytics C-level",description:"12 KPIs, 3 marchés, temps réel. Présentation board lundi.",reward:11e3,duration:5*3600,workTime:240,rarity:"rare",requiresAgent:{id:"agent-analytics",count:3}},{id:"ai-security-audit",client:"SecureIA",clientIcon:"🛡️",title:"Pentest IA + rapport",description:"Prompt injection, data leakage, model inversion. Rapport certifié.",reward:19e3,duration:7*3600,workTime:380,rarity:"rare",requiresAgent:{id:"agent-audit",count:5}},{id:"ministere-ia-project",client:"MinistèreIA",clientIcon:"🏛️",title:"Appel d'offre — IA d'État",description:"Système de traitement de 2M de dossiers/an. Contrat pluriannuel. C'est maintenant ou jamais.",reward:18e4,duration:12*3600,workTime:900,rarity:"epic",requiresAgent:{id:"agent-supervisor",count:1}},{id:"ipo-ai-audit",client:"TechGiant FR",clientIcon:"🦅",title:"Audit IA pré-IPO",description:"IPO dans 30j. Due diligence complète de tous les systèmes IA. Confidentiel.",reward:25e4,duration:10*3600,workTime:800,rarity:"epic",requiresAgent:{id:"agent-legal",count:3}},{id:"unicorn-partnership",client:"Unicorn Labs",clientIcon:"🦄",title:"Partenariat stratégique annuel",description:"Externalisation complète de la stack IA. 12 mois, équipe dédiée.",reward:5e5,duration:8*3600,workTime:600,rarity:"epic",requiresRate:50},{id:"media-empire",client:"Groupe Média",clientIcon:"📺",title:"IA éditoriale — 10 médias",description:"Automatisation complète : veille, rédaction, SEO, distribution. Groupe national.",reward:32e4,duration:10*3600,workTime:750,rarity:"epic",requiresAgent:{id:"agent-growth",count:5}},{id:"defense-contract",client:"Défense IA",clientIcon:"🎖️",title:"Contrat ministère défense",description:"Analyse de renseignement open-source. Top secret. Fenêtre de 8h.",reward:4e5,duration:8*3600,workTime:700,rarity:"epic",requiresAgent:{id:"agent-supervisor",count:2}},{id:"global-rollout",client:"GlobalCorp",clientIcon:"🌍",title:"Déploiement mondial 40 pays",description:"Stack IA full — 40 langues, conformités locales, 24/7 support. Il faut tout.",reward:8e5,duration:12*3600,workTime:1200,rarity:"epic",requiresRate:100},{id:"acquisition-ia",client:"VentureCapital",clientIcon:"💼",title:"Acquisition — valorisation IA",description:"Un VC veut racheter ta technologie. Négo express, window de 6h.",reward:1e6,duration:6*3600,workTime:500,rarity:"epic",requiresAgent:{id:"agent-supervisor",count:3}}],Li=3,Ao=1200,Mg=2400,Ro="bot-empire-contracts";class Og{slots=[null,null,null];nextRefill=[0,0,0];usedIds=new Set;onNewContract;onComplete;boardSize=Li;rewardBonus=1;init(e,t){this.onNewContract=e,this.onComplete=t,this.load();for(let i=0;i<this.boardSize;i++)this.slots[i]||this.scheduleRefill(i,5)}setReputation(e,t){const i=e?Li+1:Li;if(this.rewardBonus=t,i>this.boardSize){for(let s=this.boardSize;s<i;s++)this.slots.push(null),this.nextRefill.push(0),this.scheduleRefill(s,5);this.boardSize=i}}tick(e){const t=Date.now();for(let i=0;i<this.boardSize;i++){const s=this.slots[i];if(!s){t>=this.nextRefill[i]&&this.fillSlot(i,e);continue}if(s.status==="available"&&t>=s.expiresAt){s.status="expired",this.slots[i]=null,this.scheduleRefill(i),this.save();continue}if(s.status==="accepted"&&s.completesAt&&t>=s.completesAt){s.status="completed",this.rewardBonus!==1&&(s.reward=Math.round(s.reward*this.rewardBonus)),this.onComplete?.(s),this.slots[i]=null,this.scheduleRefill(i),this.save();continue}}}canAccept(e,t){return!(e.status!=="available"||e.requiresRate&&this.getTotalRate(t)<e.requiresRate||e.requiresAgent&&(t.agents[e.requiresAgent.id]?.count??0)<e.requiresAgent.count)}accept(e){const t=Date.now();e.acceptedAt=t,e.completesAt=t+e.workTime*1e3,e.status="accepted",this.save()}getSlots(){return[...this.slots]}getProgress(e){if(e.status!=="accepted"||!e.acceptedAt||!e.completesAt)return 0;const t=Date.now()-e.acceptedAt,i=e.completesAt-e.acceptedAt;return Math.min(t/i,1)}fillSlot(e,t){const i=this.pickContract(t);if(!i)return;const s=Date.now(),r={...i,slotId:e,expiresAt:s+i.duration*1e3,status:"available"};this.slots[e]=r,this.usedIds.add(i.id),this.onNewContract?.(r),this.save()}pickContract(e){this.usedIds.size>=ko.length&&this.usedIds.clear();const t=ko.filter(l=>!this.usedIds.has(l.id));if(t.length===0)return null;const i=this.getTotalRate(e),s=t.filter(l=>!(l.requiresRate&&i<l.requiresRate*.1)),r=s.length>0?s:t,o=r.map(l=>l.rarity==="common"?55:l.rarity==="rare"?35:10),a=o.reduce((l,u)=>l+u,0);let c=Math.random()*a;for(let l=0;l<r.length;l++)if(c-=o[l],c<=0)return r[l];return r[r.length-1]}scheduleRefill(e,t){const i=t?t*1e3:(Ao+Math.random()*(Mg-Ao))*1e3;this.nextRefill[e]=Date.now()+i}getTotalRate(e){return Object.values(e.agents).reduce((t,i)=>t+i.count*.1,0)}save(){try{localStorage.setItem(Ro,JSON.stringify({slots:this.slots,nextRefill:this.nextRefill,usedIds:[...this.usedIds]}))}catch{}}load(){try{const e=localStorage.getItem(Ro);if(!e)return;const t=JSON.parse(e);t.slots&&(this.slots=t.slots),t.nextRefill&&(this.nextRefill=t.nextRefill),t.usedIds&&(this.usedIds=new Set(t.usedIds))}catch{}}}const Po=[{id:"chatgpt-outage",name:"ChatGPT en panne",icon:"🔥",description:"Les clients fuient vers votre agence — revenus doublés !",effect:{type:"income",multiplier:2},durationMin:5},{id:"new-model-launch",name:"Lancement GPT-Next",icon:"🚀",description:"L'engouement IA mondial booste vos contrats.",effect:{type:"income",multiplier:1.5},durationMin:8},{id:"eu-regulation",name:"Régulation IA UE",icon:"⚖️",description:"Les nouvelles règles européennes ralentissent le marché.",effect:{type:"income",multiplier:.6},durationMin:6},{id:"linkedin-viral",name:"Post LinkedIn viral",icon:"📱",description:"Votre agence buzze — la valeur de chaque clic est triplée !",effect:{type:"click",multiplier:3},durationMin:5},{id:"vc-interest",name:"Intérêt des investisseurs",icon:"💰",description:"Les VCs regardent votre secteur. Revenus +80%.",effect:{type:"income",multiplier:1.8},durationMin:7},{id:"competitor-down",name:"Concurrent en faillite",icon:"📉",description:"Leurs clients cherchent une alternative — c'est vous !",effect:{type:"income",multiplier:1.7},durationMin:8},{id:"ai-winter",name:"Hiver IA médiatique",icon:"❄️",description:"La presse se retourne contre l'IA. Revenus en baisse.",effect:{type:"income",multiplier:.5},durationMin:5},{id:"tech-conference",name:"VivaTech Paris",icon:"🎪",description:"Vous êtes speaker — leads entrants en hausse.",effect:{type:"income",multiplier:1.6},durationMin:6},{id:"data-scandal",name:"Scandale données IA",icon:"😱",description:"La méfiance envers l'IA touche votre agence aussi.",effect:{type:"income",multiplier:.7},durationMin:6},{id:"automation-wave",name:"Vague Automation",icon:"🌊",description:"Toutes les PME veulent s'automatiser maintenant !",effect:{type:"income",multiplier:2},durationMin:8},{id:"claude-launch",name:"Nouveau modèle Claude",icon:"⬡",description:"La puissance du modèle décuple vos performances.",effect:{type:"click",multiplier:2},durationMin:7},{id:"budget-cut",name:"Compressions budgétaires",icon:"✂️",description:"Vos clients coupent leurs budgets IT. Revenus réduits.",effect:{type:"income",multiplier:.65},durationMin:5},{id:"startup-boom",name:"Boom des startups",icon:"🦄",description:"L'écosystème startup explose — vos prospects aussi.",effect:{type:"income",multiplier:1.5},durationMin:7},{id:"harvard-study",name:"Étude Harvard : +40% productivité",icon:"📊",description:"Une étude valide votre ROI. Les contrats arrivent vite.",effect:{type:"income",multiplier:1.4},durationMin:8},{id:"gpu-costs",name:"Explosion des coûts GPU",icon:"💸",description:"Les marges fondent avec la hausse des coûts d'inférence.",effect:{type:"income",multiplier:.75},durationMin:6}],No="bot-empire-market",xo=900*1e3,Lg=1800*1e3;class Dg{current=null;nextEventAt=0;recentIds=[];onEvent;onEnd;constructor(){this.load(),this.nextEventAt===0&&this.scheduleNext(120*1e3)}setCallbacks(e,t){this.onEvent=e,this.onEnd=t}tick(){const e=Date.now();if(this.current&&e>=this.current.endsAt){const t=this.current;this.current=null,this.scheduleNext(),this.save(),this.onEnd?.(t)}return!this.current&&e>=this.nextEventAt&&this.startRandom(),this.current}getCurrent(){return this.current}getIncomeMultiplier(){return this.current&&this.current.event.effect.type==="income"?this.current.event.effect.multiplier:1}getClickMultiplier(){return this.current&&this.current.event.effect.type==="click"?this.current.event.effect.multiplier:1}startRandom(){const e=Po.filter(s=>!this.recentIds.includes(s.id)),t=e.length>0?e:Po,i=t[Math.floor(Math.random()*t.length)];this.current={event:i,endsAt:Date.now()+i.durationMin*60*1e3},this.recentIds.push(i.id),this.recentIds.length>4&&this.recentIds.shift(),this.save(),this.onEvent?.(this.current)}scheduleNext(e){const t=e??xo+Math.random()*(Lg-xo);this.nextEventAt=Date.now()+t}save(){try{localStorage.setItem(No,JSON.stringify({current:this.current,nextEventAt:this.nextEventAt,recentIds:this.recentIds}))}catch{}}load(){try{const e=localStorage.getItem(No);if(!e)return;const t=JSON.parse(e);t.current&&t.current.endsAt>Date.now()&&(this.current=t.current),t.nextEventAt&&(this.nextEventAt=t.nextEventAt),t.recentIds&&(this.recentIds=t.recentIds)}catch{}}}const Mo="bot-empire-academy";class Ug{state={completedIds:[],totalXP:0};constructor(){this.load()}isCompleted(e){return this.state.completedIds.includes(e)}isUnlocked(e){return e.unlockAfter?this.isCompleted(e.unlockAfter):!0}complete(e,t){this.isCompleted(e)||(this.state.completedIds.push(e),this.state.totalXP+=t,this.save())}getState(){return{...this.state}}getTotalCompleted(){return this.state.completedIds.length}scorePrompt(e,t){if(e.type==="discovery"){const l=t.trim().length>=3,u=[e.responses.decent,e.responses.good,e.responses.excellent],d=l?u[Math.floor(Math.random()*u.length)]:e.responses.poor;return{score:l?100:0,maxScore:100,met:[],missed:[],tier:l?"excellent":"poor",response:d}}let i=0;const s=[],r=[],o=e.criteria.reduce((l,u)=>l+u.points,0);for(const l of e.criteria)l.pattern.test(t)?(i+=l.points,s.push({label:l.label,points:l.points})):r.push({label:l.label,points:l.points});const a=o>0?i/o:0,c=a>=.81?"excellent":a>=.61?"good":a>=.36?"decent":"poor";return{score:i,maxScore:o,met:s,missed:r,tier:c,response:e.responses[c]}}save(){try{localStorage.setItem(Mo,JSON.stringify(this.state))}catch{}}load(){try{const e=localStorage.getItem(Mo);e&&(this.state=JSON.parse(e))}catch{}}}const Fg=[{id:"ch1",number:1,title:"La Première Rencontre",subtitle:"Découvre ce qu'est vraiment l'IA",icon:"🤖",color:"#00ff88",unlockCondition:"always"},{id:"ch2",number:2,title:"L'Art du Prompt",subtitle:"Apprends à parler à l'IA comme un pro",icon:"⚡",color:"#38bdf8",unlockCondition:"always"}],Gt=[{id:"discovery-1",chapterId:"ch1",title:"Dis Bonjour à GPTurbo",subtitle:"Ta toute première conversation avec une IA",context:"GPTurbo vient d'être installé dans ton agence. C'est une intelligence artificielle — elle comprend ce que tu écris et te répond. Tape n'importe quoi pour commencer. Un bonjour, une question, une blague... Elle répondra !",tips:["💡 Essaie de lui dire bonjour","🎯 Pose-lui une question que tu te poses vraiment","😄 Demande-lui de te raconter une blague"],type:"discovery",criteria:[],responses:{poor:"Bonjour ! Je suis GPTurbo ⚡ — l'IA de ton agence. Je suis prêt à t'aider ! Pose-moi une vraie question pour voir ce que je sais faire.",decent:`Bonjour ! Je suis GPTurbo ⚡

Je suis une intelligence artificielle. Concrètement, ça veut dire que j'ai été entraîné sur des milliards de textes — livres, articles, sites web — et que j'ai appris à comprendre et générer du langage humain.

Je peux écrire, expliquer, traduire, résumer, coder... Qu'est-ce que tu voudrais faire ?`,good:`Salut ! GPTurbo ici ⚡🚀

Je suis une IA — une intelligence artificielle. Imagine que j'ai lu des millions de livres, d'articles et de sites web. Tout ça m'a appris à comprendre et à répondre en langage humain.

Je peux t'aider à :
• Écrire des textes, emails, descriptions
• Répondre à tes questions
• Analyser et résumer des infos
• Générer des idées créatives

Dis-moi ce dont tu as besoin ! 🎯`,excellent:`Salut ! GPTurbo ici ⚡🚀

Je suis une IA — une intelligence artificielle. Imagine que j'ai lu des millions de livres, d'articles et de sites web. Tout ça m'a appris à comprendre et à répondre en langage humain.

Je peux t'aider à :
• Écrire des textes, emails, descriptions
• Répondre à tes questions
• Analyser et résumer des infos
• Générer des idées créatives

Dis-moi ce dont tu as besoin ! 🎯`},lesson:"🎉 Tu viens de parler à une IA pour la première fois ! Ce que tu as tapé s'appelle un **prompt** — c'est ta demande à l'IA. La qualité de ta réponse dépend de la qualité de ta demande. On va apprendre ça ensemble.",xpReward:50,euroReward:500},{id:"gpturbo-1",chapterId:"ch2",title:"Ta Première Mission",subtitle:"Demande quelque chose de précis",context:`🥐 La Boulangerie Martin est ton premier client. Ils veulent une description pour leur nouveau croissant au beurre — à afficher en vitrine.

Utilise GPTurbo pour l'écrire. Dis-lui ce que tu veux !`,tips:['💡 Dis à GPTurbo QUOI faire (ex: "écris une description...")',"🎯 Parle du produit : c'est quoi ? C'est pour qui ?","✨ Plus tu es précis, meilleure sera la réponse !"],type:"gpturbo",criteria:[{pattern:/\b(écri|rédige|créé|fais|génère|propose)/i,label:"Tu as demandé quelque chose de précis",points:20},{pattern:/\b(croissant|boulangerie|martin|viennoiserie)/i,label:"Tu as mentionné le produit",points:25},{pattern:/\b(beurr|croustillant|doré|saveur|goût|délicieu|appétissant|frais)/i,label:"Tu décris la qualité",points:25},{pattern:/[\s\S]{35,}/,label:"Ta demande est suffisamment détaillée",points:15},{pattern:/\b(vitrine|client|passant|acheteur|consommateur)/i,label:"Tu penses à l'audience",points:15}],responses:{poor:"Un croissant au beurre. Il est bon et frais.",decent:"Découvrez notre croissant au beurre, une viennoiserie préparée chaque matin avec soin. Croustillant à l'extérieur et moelleux à l'intérieur, il sera parfait pour bien commencer votre journée.",good:`🥐 Croissant Pur Beurre — Boulangerie Martin

Croustillant à souhait, doré à la perfection, notre croissant au beurre est façonné chaque matin avec un beurre AOP sélectionné. Sa mie alvéolée fond en bouche, libérant des arômes de beurre frais et de pâte feuilletée. Une gourmandise incontournable pour bien démarrer la journée.`,excellent:`🥐 Le Croissant Signature — Boulangerie Martin

Né à l'aube, façonné à la main, notre croissant au beurre incarne l'art de la viennoiserie française. Ses couches feuilletées, croustillantes au toucher, révèlent une mie dorée et aérienne imprégnée d'un beurre AOP Charentes-Poitou.

Chaque bouchée est une invitation — celle d'un matin parisien, d'une terrasse ensoleillée. Une gourmandise artisanale, disponible dès 7h. Jusqu'à épuisement du stock.`},lesson:"💡 Tu viens de découvrir la règle n°1 du prompt : dire **QUOI** faire et **SUR QUOI**. Plus ta demande est claire, meilleure est la réponse. Regarde la différence entre le score faible et le score excellent !",xpReward:100,euroReward:1500,unlockAfter:"discovery-1"},{id:"gpturbo-2",chapterId:"ch2",title:"Connais ton Public",subtitle:"Le contexte change tout",context:`🎒 Même boulangerie, même croissant — mais le client veut maintenant attirer les écoliers qui passent après l'école.

La description doit être fun, accessible, parler aux enfants de 10 ans. Adapte ta demande à GPTurbo !`,tips:["👦 Précise à qui s'adresse le texte (des enfants ? des ados ?)","🎨 Pense au ton : joyeux, simple, amusant","📏 Un texte court et percutant pour un enfant"],type:"gpturbo",criteria:[{pattern:/\b(enfant|gamin|écolier|jeune|ado|école|gosse|kid|10 ans|petit)/i,label:"Tu as précisé l'audience",points:30},{pattern:/\b(amusant|fun|rigolo|cool|super|waouh|joyeux|sympa|marrant)/i,label:"Tu as pensé au ton",points:20},{pattern:/\b(croissant|boulangerie|viennoiserie|gâteau|pâtisserie)/i,label:"Tu as gardé le sujet principal",points:15},{pattern:/\b(court|simple|facile|accessible|rapide|petit texte)/i,label:"Tu penses à la lisibilité",points:20},{pattern:/[\s\S]{40,}/,label:"Ta demande est complète",points:15}],responses:{poor:"Un croissant pour les enfants. Il est bon.",decent:"Hé les ados ! Vous voulez un super goûter après l'école ? Notre croissant au beurre est mega bon ! Croustillant et moelleux, c'est le meilleur du quartier. Venez vite !",good:`🥐 Hé toi ! Oui, toi ! 👋

Tu rentres de l'école et t'as trop faim ?

Le croissant au beurre de la Boulangerie Martin, c'est :
✅ Croustillant comme tu aimes
✅ Tout chaud sorti du four
✅ Au goût de beurre trop bon

Viens vite — y'en a pas pour tout le monde ! 😄`,excellent:`🥐 Hé ! Toi qui rentres de l'école ! 👋

T'as la dalle ? Le croissant au beurre de la Boulangerie Martin est FAIT POUR TOI.

🔥 Croustillant à l'extérieur
🧁 Tout moelleux à l'intérieur
🧈 Avec du vrai bon beurre

C'est le snack préféré de tous les écoliers du quartier. Et il est chaud sorti du four !

📍 Juste en face de l'école. Cours ! 😄`},lesson:"💡 Règle n°2 : toujours préciser **pour qui** tu écris. L'IA adapte automatiquement le ton, le vocabulaire et le format. Un texte pour un enfant de 10 ans ≠ un texte pour un adulte. Le contexte, c'est ton super-pouvoir.",xpReward:150,euroReward:2500,unlockAfter:"gpturbo-1"},{id:"gpturbo-3",chapterId:"ch2",title:"Donne un Rôle à l'IA",subtitle:"Transforme GPTurbo en expert",context:`⭐ Un chef étoilé Michelin ouvre une pâtisserie de luxe à Paris. Il veut une description ultra-raffinée pour sa carte gastronomique.

Ton astuce secrète : donne un rôle précis à GPTurbo. Dis-lui QUI il est avant de lui dire QUOI faire.`,tips:['🎭 Commence par "Tu es..." ou "Agis comme..."',"👨‍🍳 Donne un rôle précis : chef étoilé, critique gastronomique...","✨ Combine le rôle + le contexte + la demande"],type:"gpturbo",criteria:[{pattern:/\b(tu es|agis comme|joue le rôle|en tant que|imagine que tu es|incarne|tu joues)/i,label:"Tu as donné un rôle à l'IA !",points:35},{pattern:/\b(chef|cuisinier|gastronomique|Michelin|étoilé|culinaire|critique|sommelier)/i,label:"Le rôle est précis et adapté",points:25},{pattern:/\b(luxe|gastronomique|raffiné|élégant|carte|menu|prestige|haute cuisine)/i,label:"Tu as le contexte de prestige",points:20},{pattern:/[\s\S]{50,}/,label:"Ta demande est complète et structurée",points:20}],responses:{poor:"Le croissant est très bon. Il est au beurre et très raffiné.",decent:"Notre croissant au beurre est une création d'exception, façonnée avec les meilleurs ingrédients pour une expérience gustative mémorable. Une pure viennoiserie d'art.",good:`**Croissant Feuilleté — Beurre de Baratte AOP**

Une architecture en spirale de 27 couches, dorée à 185°C pour révéler une caramélisation parfaite. La mie, d'une légèreté soyeuse, libère en bouche les notes lactées d'un beurre de baratte sélectionné en Normandie.

Une œuvre éphémère. Disponible chaque matin dès l'ouverture.`,excellent:`**Le Croissant Origine — Création du Chef**
_Pâtisserie Maison, Paris 8e_

Façonné à la main à 4h du matin, ce croissant est l'aboutissement d'un savoir-faire transmis sur trois générations. Vingt-sept couches de feuilletage beurré alternent croustillant ambré et mie alvéolée, libérant au premier mordant les arômes complexes d'un beurre de baratte AOP Isigny, à 84% de matières grasses.

La caramélisation, obtenue à 185°C précis, confère une robe dorée irisée d'une rare régularité. Une création éphémère — 30 pièces par jour, servies chaudes à partir de 8h.

_«La simplicité est la sophistication suprême.»_`},lesson:`💡 Règle n°3 — et c'est la plus puissante : donne un **rôle** à l'IA. "Tu es un chef étoilé" active tout le vocabulaire gastronomique appris pendant l'entraînement. C'est comme passer l'IA en mode expert instantanément. Cette technique s'appelle le **role prompting** — les pros l'utilisent tous.`,xpReward:200,euroReward:4e3,unlockAfter:"gpturbo-2"}];function Bg(n){return Gt.filter(e=>e.chapterId===n)}function Qc(n,e){const t=e.getBoundingClientRect(),i=document.createElement("div");i.className="floating-number",i.textContent=`+${A(n)}`;const s=(Math.random()-.5)*50;i.style.left=`${t.left+t.width/2+s}px`,i.style.top=`${t.top+t.height/2}px`,document.body.appendChild(i),setTimeout(()=>i.remove(),1100)}const Oo=["#00ff88","#7c3aed","#38bdf8","#f97316","#fbbf24","#ec4899"];function $g(){for(let n=0;n<80;n++)setTimeout(()=>{const e=document.createElement("div");e.className="confetti-particle",e.style.left=`${Math.random()*100}vw`,e.style.background=Oo[Math.floor(Math.random()*Oo.length)],e.style.animationDuration=`${.9+Math.random()*1.4}s`,e.style.animationDelay="0s",e.style.width=`${6+Math.random()*8}px`,e.style.height=`${6+Math.random()*8}px`,e.style.borderRadius=Math.random()>.5?"50%":"2px",document.body.appendChild(e),setTimeout(()=>e.remove(),2500)},n*25)}function rr(n="rgba(0,255,136,0.08)"){const e=document.createElement("div");e.style.cssText=`
    position:fixed;inset:0;background:${n};
    pointer-events:none;z-index:9998;
    animation:screen-flash 0.4s ease forwards;
  `,document.body.appendChild(e),setTimeout(()=>e.remove(),400)}function qg(n,e,t=12,i){n.textContent="";let s=0;const r=setInterval(()=>{n.textContent+=e[s],s++,s>=e.length&&(clearInterval(r),i?.())},t)}const V=new vl,R=new gl,j=new Il(R),or=new Tl,pt=new Ml,Jc=new Ol,Lo=new Ll,mn=new Ng,ie=new Og,Ne=new Dg,X=new Ug,us=document.getElementById("market-banner"),Xc=document.getElementById("market-banner-icon"),Zc=document.getElementById("market-banner-name"),el=document.getElementById("market-banner-desc"),Kn=document.getElementById("market-banner-effect"),Do=document.getElementById("market-banner-timer");Ne.setCallbacks(n=>{const e=n.event.effect.multiplier,t=e>=1,i=n.event.effect.type==="income"?t?`+${Math.round((e-1)*100)}% revenus`:`−${Math.round((1-e)*100)}% revenus`:`×${e} clics`;Xc.textContent=n.event.icon,Zc.textContent=n.event.name,el.textContent=n.event.description,Kn.textContent=i,Kn.className=`market-banner-effect${t?"":" malus"}`,us.classList.remove("hidden"),zt(`${n.event.icon} ${n.event.name} — ${n.event.description}`),ms()},n=>{us.classList.add("hidden"),N(`📊 Fin d'événement : ${n.event.name}`,"orange")});const Di=document.getElementById("tab-reputation"),Wg=document.getElementById("tab-count-reputation"),Tn=document.getElementById("tab-academy"),Hg=document.getElementById("tab-count-academy");let We=null;const Vg=document.getElementById("incident-urgency"),jg=document.getElementById("incident-client"),Gg=document.getElementById("incident-problem"),zg=document.getElementById("incident-question"),ds=document.getElementById("incident-answers"),tl=document.getElementById("incident-timer-fill"),nl=document.getElementById("incident-timer-lbl"),il=document.getElementById("incident-result"),Ui=document.getElementById("incident-result-icon"),Fi=document.getElementById("incident-lesson");let kt=0,ar=!1,Yn=!1;const hs=45,fs=document.getElementById("btn-echo"),gn=document.getElementById("echo-sub"),Bi=document.getElementById("echo-bar-wrap"),_n=document.getElementById("echo-bar-fill"),Uo=document.getElementById("echo-timer-label"),Qn=document.getElementById("btn-click");let p=V.load();V.startAutosave(()=>p);lr();{const n=Ne.getCurrent();if(n){const e=n.event.effect.multiplier,t=e>=1,i=n.event.effect.type==="income"?t?`+${Math.round((e-1)*100)}% revenus`:`−${Math.round((1-e)*100)}% revenus`:`×${e} clics`;Xc.textContent=n.event.icon,Zc.textContent=n.event.name,el.textContent=n.event.description,Kn.textContent=i,Kn.className=`market-banner-effect${t?"":" malus"}`,us.classList.remove("hidden")}}const Jn=document.getElementById("tab-contracts"),cr=document.getElementById("tab-count-contracts");ie.init(n=>{N(`📋 Nouveau contrat : ${n.title}`,"orange"),cr.classList.add("has-new"),ei()},n=>{p={...p,currency:p.currency+n.reward,totalEarned:p.totalEarned+n.reward},V.save(p),j.markDirty(),zt(`✅ Contrat complété ! +${A(n.reward)} de ${n.client}`),Qt(),ei()});const Kg=["offline-overlay","import-url-overlay","tutorial-overlay","incident-overlay","prestige-overlay","share-overlay"],sl=[];let Xn=null;function rl(){return Kg.some(n=>!document.getElementById(n).classList.contains("hidden"))}function Ye(n,e){if(Xn){sl.push(()=>Ye(n,e));return}e?.(),document.getElementById(n).classList.remove("hidden"),Xn=n}function pe(n){document.getElementById(n).classList.add("hidden"),Xn===n&&(Xn=null);const e=sl.shift();e&&setTimeout(e,200)}or.onStageChange=n=>{N(`${n.icon} Nouveau bureau : ${n.label} — ${n.sublabel}`,"orange"),ms()};const $i=V.getOfflineSeconds(p);if($i>10){const{state:n,earned:e}=R.applyOfflineEarnings(p,$i);p=n,e>0&&Ye("offline-overlay",()=>{j.setOfflineStat(bl($i)),document.getElementById("offline-earned-amount").textContent=A(e)})}const ve=V.decodeFromURL();if(ve){const n=Object.values(ve.agents).reduce((t,i)=>t+i.count,0),e=Object.values(ve.clientsUnlocked).filter(Boolean).length;Ye("import-url-overlay",()=>{document.getElementById("import-stats").innerHTML=`
      <div class="import-stat-row"><span>Trésorerie</span><span>${A(ve.currency)}</span></div>
      <div class="import-stat-row"><span>Total gagné</span><span>${A(ve.totalEarned)}</span></div>
      <div class="import-stat-row"><span>Agents</span><span>${n}</span></div>
      <div class="import-stat-row"><span>Clients</span><span>${e}</span></div>
      <div class="import-stat-row"><span>Prestiges</span><span>${ve.prestigeCount}</span></div>
    `})}else Lo.shouldStart()&&Ye("tutorial-overlay",()=>Lo.start());mn.init(xg).then(async n=>{if(!n)return;const e=await mn.getIfNewer(p);e?(p=e,V.save(p),j.markDirty(),or.update(0,p),zt("☁️ Progression restaurée depuis le cloud !")):mn.push(p),mn.startAutoSync(()=>p)});const tt=[10,100,1e3,1e4,1e5,1e6,1e7,1e8],Yg={10:"🎉 Premiers €10 gagnés !",100:"💰 €100 en poche !",1e3:"🚀 €1 000 — l'agence décolle !",1e4:"⭐ €10 000 — client premium débloqué !",1e5:"🔥 €100K — vous êtes sérieux !",1e6:"👑 €1M — empire en construction !",1e7:"💎 €10M — légende du secteur !",1e8:"🌍 €100M — vous avez tout scalé !"};let we=tt.findIndex(n=>n>p.totalEarned);we===-1&&(we=tt.length);const qi=100;let Wi=0,vn=0;function ol(n){vn===0&&(vn=n);const e=Math.min(n-vn,1e3);for(vn=n,Wi+=e;Wi>=qi;){const t=qi/1e3;Ne.tick(),n_();const i=pt.tick(t),s=Ne.getClickMultiplier();for(let u=0;u<i;u++)p=R.click(p,s),Jg();const r=Ne.getIncomeMultiplier(),{state:o,result:a}=R.tick(p,t,r);for(p=o,Wi-=qi,a.newClients.forEach(u=>{j.markDirty();const h=nt.find(m=>m.id===u)?.unlockDialogue??`🤝 Nouveau client : ${u}`;zt(h),kl()});we<tt.length&&p.totalEarned>=tt[we];){const u=Yg[tt[we]]??`🏆 ${A(tt[we])} atteints !`;zt(u),ms(),rr("rgba(0,255,136,0.07)"),we++}const c=Object.values(p.agents).some(u=>u.count>0),l=Jc.tick(t,c);if(l&&!rl()&&Zg(l),ie.tick(p),ar&&!Yn){kt-=t;const u=Math.max(0,kt/hs)*100;tl.style.width=`${u}%`,nl.textContent=`${Math.ceil(Math.max(0,kt))}s`,kt<=0&&al(null)}}or.update(e/1e3,p),j.update(p),Qg(),o_(),requestAnimationFrame(ol)}requestAnimationFrame(ol);Qn.addEventListener("click",n=>{const e=R.getClickValue(p,Ne.getClickMultiplier());p=R.click(p,Ne.getClickMultiplier()),pt.recordClick(),j.markDirty(),Xg(n),Qc(e,Qn),Sl()});fs.addEventListener("click",()=>{pt.canActivate()&&(pt.activate(),N("↺ Mode ÉCHO activé — vos clics se rejouent pendant 60s !","orange"))});document.getElementById("tab-agents").addEventListener("click",n=>{const e=n.target.closest("[data-buy-agent]");if(!e)return;const t=e.dataset.buyAgent,i=p.agents[t]?.count??0;if(p=R.buyAgent(p,t),(p.agents[t]?.count??0)>i){j.markDirty(),N("🤖 Agent recruté !","green"),Qt();const s=e.closest(".agent-card");s&&(s.classList.add("just-bought"),setTimeout(()=>s.classList.remove("just-bought"),600))}});document.getElementById("tab-upgrades").addEventListener("click",n=>{const e=n.target.closest("[data-buy-upgrade]");if(!e)return;const t=e.dataset.buyUpgrade,i=p.upgradesPurchased[t];if(p=R.buyUpgrade(p,t),!i&&p.upgradesPurchased[t]){j.markDirty(),N("⚙️ Upgrade activé !","purple"),Qt();const s=e.closest(".upgrade-card");s&&(s.classList.add("just-bought"),setTimeout(()=>s.classList.remove("just-bought"),600))}});document.querySelectorAll(".tab").forEach(n=>{n.addEventListener("click",()=>{const e=n.dataset.tab;document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),n.classList.add("active"),document.getElementById(`tab-${e}`).classList.add("active"),j.markDirty(),e==="contracts"&&(cr.classList.remove("has-new"),ei()),e==="reputation"&&ur(),e==="academy"&&(We=null,gi())})});document.getElementById("btn-prestige").addEventListener("click",()=>{if(!R.canPrestige(p)||rl())return;const n=1+(p.prestigeCount+1)*.15,e=R.getPrestigeRP(p),t=R.getPrestigeThreshold({...p,prestigeCount:p.prestigeCount+1});Ye("prestige-overlay",()=>{document.getElementById("modal-value").textContent=A(p.totalEarned),document.getElementById("modal-multiplier").textContent=`+15% revenu & +${e} ⭐ Réputation`,document.getElementById("modal-total-multi").textContent=`×${n.toFixed(2)} — prochain objectif : ${A(t)}`})});document.getElementById("btn-prestige-confirm").addEventListener("click",()=>{const n=R.getPrestigeRP(p);p=R.prestige(p),we=0,lr(),V.save(p),j.markDirty(),pe("prestige-overlay"),Al(),$g(),rr("rgba(124,58,237,0.12)"),N(`🏆 Agence vendue ! +${n} ⭐ Réputation acquis.`,"purple"),ur()});document.getElementById("btn-prestige-cancel").addEventListener("click",()=>{pe("prestige-overlay")});document.getElementById("btn-offline-close").addEventListener("click",()=>{pe("offline-overlay")});document.getElementById("btn-import-url-confirm").addEventListener("click",()=>{ve&&(p=ve,V.save(p),j.markDirty(),pe("import-url-overlay"),history.replaceState(null,"",window.location.pathname),N("📥 Sauvegarde importée avec succès !","green"))});document.getElementById("btn-import-url-cancel").addEventListener("click",()=>{pe("import-url-overlay"),history.replaceState(null,"",window.location.pathname)});document.getElementById("btn-export").addEventListener("click",()=>{V.exportToFile(p),N("💾 Sauvegarde exportée !","green")});document.getElementById("btn-import").addEventListener("change",n=>{const e=n.target.files?.[0];if(!e)return;const t=new FileReader;t.onload=i=>{const s=i.target?.result,r=V.importFromText(s);r?(p=r,V.save(p),j.markDirty(),N("📂 Sauvegarde importée !","green")):N("❌ Fichier invalide.","orange"),n.target.value=""},t.readAsText(e)});const ps=document.getElementById("share-url-input");document.getElementById("btn-share").addEventListener("click",()=>{Ye("share-overlay",()=>{ps.value=V.encodeForURL(p)})});document.getElementById("btn-share-close").addEventListener("click",()=>{pe("share-overlay")});document.getElementById("btn-copy-url").addEventListener("click",()=>{navigator.clipboard.writeText(ps.value).then(()=>{N("🔗 Lien copié !","green"),pe("share-overlay")}).catch(()=>{ps.select(),document.execCommand("copy"),N("🔗 Lien copié !","green"),pe("share-overlay")})});"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/bot-empire/sw.js").catch(()=>{})});function Qg(){const n=pt.getState();if(fs.disabled=!n.canActivate&&!n.isActive,fs.classList.toggle("active-echo",n.isActive),n.isActive)gn.textContent=`Actif — ${n.replayRemaining}s restantes`,Bi.style.display="",_n.style.width=`${n.replayRemaining/60*100}%`,Uo.textContent=`${n.replayRemaining}s`;else if(n.isOnCooldown){const e=Math.floor(n.cooldownRemaining/60),t=n.cooldownRemaining%60;gn.textContent=`Recharge — ${e}:${String(t).padStart(2,"0")}`,Bi.style.display="",_n.style.width=`${(120-n.cooldownRemaining)/120*100}%`,Uo.textContent=`${e}:${String(t).padStart(2,"0")}`,_n.style.background="var(--text-muted)"}else _n.style.background="var(--accent-blue)",Bi.style.display="none",n.clicksRecorded<3?gn.textContent=`Cliquez ${3-n.clicksRecorded}× de plus pour activer`:gn.textContent=`${n.clicksRecorded} clics mémorisés — prêt !`}let Hi=null;function Jg(){Qn.classList.add("ghost-clicking"),Hi&&clearTimeout(Hi),Hi=setTimeout(()=>Qn.classList.remove("ghost-clicking"),300)}function zt(n){const e=document.getElementById("notifications"),t=document.createElement("div");t.className="notif milestone",t.textContent=n,e.appendChild(t),setTimeout(()=>{t.style.animation="fadeOut 0.3s ease forwards",setTimeout(()=>t.remove(),300)},5e3)}function N(n,e="green"){const t=document.getElementById("notifications"),i=document.createElement("div");i.className=`notif ${e==="purple"?"purple":e==="orange"?"orange":""}`,i.textContent=n,t.appendChild(i),setTimeout(()=>{i.style.animation="fadeOut 0.3s ease forwards",setTimeout(()=>i.remove(),300)},3e3)}function Xg(n){const e=n.currentTarget,t=document.createElement("div");t.className="ripple-dot";const i=e.getBoundingClientRect();t.style.left=`${n.clientX-i.left}px`,t.style.top=`${n.clientY-i.top}px`,e.appendChild(t),setTimeout(()=>t.remove(),500)}let Kt=null;function Zg(n){Kt=n,ar=!0,Yn=!1,kt=hs,Vg.textContent=n.urgency,jg.textContent=n.client,Gg.textContent=n.problem,zg.textContent=n.question,tl.style.width="100%",nl.textContent=`${hs}s`;const t=[...[0,1,2]].sort(()=>Math.random()-.5),i=t.map(r=>n.answers[r]),s=t.indexOf(n.correct);Kt._shuffledCorrect=s,ds.innerHTML="",i.forEach((r,o)=>{const a=document.createElement("button");a.className="incident-answer-btn",a.textContent=r,a.addEventListener("click",()=>al(o)),ds.appendChild(a)}),il.classList.add("hidden"),Ye("incident-overlay"),N("⚠️ Incident client — répondez vite !","orange")}function al(n){if(Yn||!Kt)return;Yn=!0;const e=Kt,t=e._shuffledCorrect??e.correct,i=n===t;ds.querySelectorAll(".incident-answer-btn").forEach((r,o)=>{r.disabled=!0,o===t?r.classList.add("correct"):o===n&&r.classList.add("wrong")}),i?(p={...p,currency:p.currency+e.reward,totalEarned:p.totalEarned+e.reward},Ui.textContent="✅",Fi.textContent=`+${A(e.reward)} encaissés ! ${e.lesson}`,N(`✅ Incident résolu ! +${A(e.reward)}`,"green"),Qt()):n===null?(Ui.textContent="⏱️",Fi.textContent=`Temps écoulé. ${e.lesson}`,N("⏱️ Trop lent — le client est mécontent !","orange")):(Ui.textContent="❌",Fi.textContent=e.lesson,N("❌ Mauvaise réponse — incident non résolu.","orange")),il.classList.remove("hidden")}document.getElementById("btn-incident-close").addEventListener("click",()=>{pe("incident-overlay"),ar=!1,Jc.resolve(),Kt=null});function Zn(n){const e=Math.max(0,Math.floor(n/1e3));if(e<60)return{label:`${e}s`,urgent:!0};const t=Math.floor(e/60);if(t<60)return{label:`${t}min`,urgent:t<10};const i=Math.floor(t/60),s=t%60;return{label:`${i}h${s>0?s+"min":""}`,urgent:!1}}function e_(n,e){const t=[];if(n.requiresRate){const i=R.getTotalRate(e);t.push({label:`≥ ${Ue(n.requiresRate)}`,met:i>=n.requiresRate})}if(n.requiresAgent){const i=e.agents[n.requiresAgent.id]?.count??0,s=ct.find(r=>r.id===n.requiresAgent.id);t.push({label:`${s?.name??n.requiresAgent.id} ×${n.requiresAgent.count}`,met:i>=n.requiresAgent.count})}return t}function ei(){const n=ie.getSlots(),e=n.filter(i=>i&&i.status==="available").length,t=n.filter(i=>i&&i.status==="accepted").length;cr.textContent=String(e+t),Jn.innerHTML=`
    <div class="contracts-board">
      <div class="contracts-header">BOARD DE CONTRATS — ${e} disponible${e>1?"s":""}, ${t} en cours</div>
      ${n.map((i,s)=>t_(i,s)).join("")}
    </div>
  `,n.forEach(i=>{if(!i||i.status!=="available")return;const s=Jn.querySelector(`[data-accept="${i.id}"]`);s&&s.addEventListener("click",()=>{ie.canAccept(i,p)&&(ie.accept(i),N(`✅ Contrat accepté ! Livraison dans ${Zn(i.workTime*1e3).label}`,"green"),ei())})})}function t_(n,e){if(!n)return`
      <div class="contract-empty-slot">
        <div>⏳ Slot ${e+1} — En attente d'un nouveau contrat</div>
        <div class="slot-timer">Prochain contrat dans 20-40 min</div>
      </div>
    `;const t=n.rarity==="epic"?"⭐ ÉPIQUE":n.rarity==="rare"?"✦ RARE":"STANDARD",i=e_(n,p),s=ie.canAccept(n,p),r=ie.getProgress(n);if(n.status==="available"){const o=Zn(n.expiresAt-Date.now());return`
      <div class="contract-card rarity-${n.rarity}">
        <div class="contract-top">
          <div class="contract-icon">${n.clientIcon}</div>
          <div class="contract-meta">
            <div class="contract-client">
              ${n.client}
              <span class="contract-rarity-badge">${t}</span>
            </div>
            <div class="contract-title">${n.title}</div>
            <div class="contract-desc">${n.description}</div>
            ${i.length>0?`
              <div class="contract-requirements" style="margin-top:6px">
                ${i.map(a=>`<span class="contract-req ${a.met?"met":"unmet"}">${a.met?"✓":"✗"} ${a.label}</span>`).join("")}
              </div>`:""}
          </div>
        </div>
        <div class="contract-bottom">
          <span class="contract-reward">+${A(n.reward)}</span>
          <span class="contract-timer ${o.urgent?"urgent":""}">⏱ ${o.label}</span>
          <button class="btn-contract" data-accept="${n.id}" ${s?"":"disabled"}>
            ${s?"Accepter":"Requis ↑"}
          </button>
        </div>
      </div>
    `}if(n.status==="accepted"){const o=Zn((n.completesAt??0)-Date.now());return`
      <div class="contract-card rarity-${n.rarity} status-accepted" data-contract-id="${n.id}">
        <div class="contract-top">
          <div class="contract-icon">${n.clientIcon}</div>
          <div class="contract-meta">
            <div class="contract-client">${n.client} <span class="contract-rarity-badge">${t}</span></div>
            <div class="contract-title">${n.title}</div>
          </div>
        </div>
        <div class="contract-progress-wrap">
          <div class="contract-progress-track">
            <div class="contract-progress-fill" style="width:${Math.round(r*100)}%" data-progress-id="${n.id}"></div>
          </div>
          <span class="contract-timer">⏱ ${o.label}</span>
        </div>
        <div class="contract-bottom">
          <span class="contract-reward">+${A(n.reward)}</span>
          <button class="btn-contract in-progress" disabled>En cours...</button>
        </div>
      </div>
    `}return""}function lr(){pt.setCooldownMultiplier(R.getReputationEchoCooldownMult(p)),ie.setReputation(R.getReputationExtraSlot(p),R.getReputationContractBonus(p)),Wg.textContent=String(p.reputationPoints??0)}function ur(){const n=p.reputationPoints??0,e=R.getPrestigeRP(p);if(n===0&&Object.values(p.reputationPurchased??{}).every(i=>!i)){Di.innerHTML=`
      <div class="rep-intro">
        <span class="rep-intro-icon">⭐</span>
        <div class="rep-intro-title">Réputation — Bonus permanents</div>
        <p class="rep-intro-text">
          Vendez votre agence (Prestige) pour gagner des points de réputation.<br>
          Dépensez-les ici pour débloquer des avantages permanents qui survivent à chaque reset.
          <br><br>
          <strong>Prochain prestige : +${e} ⭐</strong>
        </p>
      </div>
    `;return}const t=Ot.map(i=>{const s=R.hasRepPerk(p,i.id),r=R.canBuyRepPerk(p,i.id);return`
      <div class="${["rep-perk-card",s?"owned":"",r?"affordable":""].filter(Boolean).join(" ")}">
        <div class="rep-perk-top">
          <span class="rep-perk-icon">${i.icon}</span>
          <div class="rep-perk-meta">
            <div class="rep-perk-name">${i.name}</div>
            <div class="rep-perk-desc">${i.description}</div>
          </div>
        </div>
        <div class="rep-perk-footer">
          ${s?`<span class="rep-perk-cost owned-label">✓ Activé</span>
               <button class="btn-rep-buy owned" disabled>Acquis</button>`:`<span class="rep-perk-cost">⭐ ${i.cost}</span>
               <button class="btn-rep-buy" data-buy-rep="${i.id}" ${r?"":"disabled"}>
                 ${r?"Acheter":`Manque ${i.cost-n} ⭐`}
               </button>`}
        </div>
      </div>
    `}).join("");Di.innerHTML=`
    <div class="reputation-header">
      <div class="reputation-balance">
        <span class="rep-value">⭐ ${n}</span>
        <span class="rep-label">Points de réputation</span>
      </div>
      <div class="reputation-next">
        Prochain prestige<br><strong>+${e} ⭐</strong>
      </div>
    </div>
    <div class="rep-perk-grid">${t}</div>
  `,Di.querySelectorAll("[data-buy-rep]").forEach(i=>{i.addEventListener("click",()=>{const s=i.dataset.buyRep,r=R.hasRepPerk(p,s);if(p=R.buyRepPerk(p,s),!r&&R.hasRepPerk(p,s)){const o=Ot.find(a=>a.id===s);N(`${o.icon} ${o.name} activé !`,"purple"),Qt(),lr(),V.save(p),j.markDirty(),ur()}})})}function n_(){const n=Ne.getCurrent();if(!n)return;const e=Math.max(0,Math.ceil((n.endsAt-Date.now())/1e3));if(e<60)Do.textContent=`${e}s`;else{const t=Math.floor(e/60),i=e%60;Do.textContent=`${t}:${String(i).padStart(2,"0")}`}}function cl(){const n=Gt.length,e=X.getTotalCompleted();Hg.textContent=`${e}/${n}`}function gi(){if(cl(),We){const s=Gt.find(r=>r.id===We);if(s){s_(s);return}}const n=X.getState().totalXP,e=Gt.reduce((s,r)=>s+r.xpReward,0);let i=`
    <div class="academy-intro">
      <div class="academy-intro-title">🎓 IA ACADEMY</div>
      <div class="academy-intro-sub">Deviens expert IA sans quitter le jeu</div>
    </div>
    <div class="academy-xp-bar-wrap">
      <span class="academy-xp-label">Progression</span>
      <div class="academy-xp-track">
        <div class="academy-xp-fill" style="width:${e>0?Math.round(n/e*100):0}%"></div>
      </div>
      <span class="academy-xp-value">${n} XP</span>
    </div>
  `;for(const s of Fg){const r=Bg(s.id),o=r.filter(c=>X.isCompleted(c.id)).length,a=o>0||s.id==="ch1";i+=`
      <div class="chapter-card${a?" open":""}" data-chapter="${s.id}">
        <div class="chapter-header">
          <div class="chapter-icon" style="background:${s.color}20;color:${s.color}">${s.icon}</div>
          <div class="chapter-meta">
            <div class="chapter-title">Chapitre ${s.number} — ${s.title}</div>
            <div class="chapter-subtitle">${s.subtitle}</div>
          </div>
          <span class="chapter-progress">${o}/${r.length}</span>
          <span class="chapter-chevron">▾</span>
        </div>
        <div class="chapter-challenges">
          ${r.map(c=>i_(c)).join("")}
        </div>
      </div>
    `}Tn.innerHTML=i,Tn.querySelectorAll(".chapter-header").forEach(s=>{s.addEventListener("click",()=>{s.closest(".chapter-card").classList.toggle("open")})}),Tn.querySelectorAll(".challenge-item:not(.locked)").forEach(s=>{s.addEventListener("click",()=>{We=s.dataset.challenge,gi()})})}function i_(n){const e=X.isCompleted(n.id),t=X.isUnlocked(n),i=["challenge-item",e?"completed":"",t?"":"locked"].filter(Boolean).join(" "),s=e?"✓":t?"▶":"🔒";return`
    <div class="${i}" data-challenge="${n.id}">
      <div class="challenge-status">${s}</div>
      <div class="challenge-info">
        <div class="challenge-name">${n.title}</div>
        <div class="challenge-sub">${n.subtitle}</div>
      </div>
      <span class="challenge-reward">${e?"✓":`+${A(n.euroReward)}`}</span>
    </div>
  `}function s_(n){const e=X.isCompleted(n.id);if(Tn.innerHTML=`
    <div class="gpturbo-view">
      <button class="gpturbo-back" id="academy-back">← Retour à l'Academy</button>

      <div class="gpturbo-context">
        <div class="gpturbo-context-title">📋 Ta mission</div>
        <div class="gpturbo-context-body">${n.context}</div>
        <div class="gpturbo-tips">
          ${n.tips.map(t=>`<span class="gpturbo-tip">${t}</span>`).join("")}
        </div>
      </div>

      <div class="gpturbo-chat" id="gpturbo-chat">
        <div class="gpturbo-chat-header">
          <div class="gpturbo-avatar">⚡</div>
          <div>
            <div class="gpturbo-name">GPTurbo</div>
            <div class="gpturbo-status">En ligne</div>
          </div>
        </div>
        <div class="gpturbo-messages" id="gpturbo-messages">
          <div class="gpturbo-msg-system">GPTurbo est prêt. Tape ta demande ci-dessous.</div>
        </div>
        <div class="gpturbo-input-zone">
          <textarea
            class="gpturbo-input"
            id="gpturbo-input"
            placeholder="Écris ta demande à GPTurbo..."
            rows="3"
            ${e?"disabled":""}
          ></textarea>
          <button class="btn-gpturbo-send" id="gpturbo-send" ${e?"disabled":""}>
            Envoyer ⚡
          </button>
        </div>
      </div>

      <div id="gpturbo-score-zone"></div>
    </div>
  `,document.getElementById("academy-back").addEventListener("click",()=>{We=null,gi()}),e){const t=document.getElementById("gpturbo-score-zone");t.innerHTML=`<div class="gpturbo-score"><div class="score-title">✅ Défi complété !</div><p style="font-size:12px;color:var(--text-secondary);margin-top:8px">${n.lesson}</p></div>`;return}document.getElementById("gpturbo-send").addEventListener("click",()=>{Fo(n)}),document.getElementById("gpturbo-input").addEventListener("keydown",t=>{t.key==="Enter"&&t.ctrlKey&&Fo(n)})}function Fo(n){const e=document.getElementById("gpturbo-input"),t=e.value.trim();if(t.length<3)return;const i=document.getElementById("gpturbo-messages"),s=document.getElementById("gpturbo-send");e.disabled=!0,s.disabled=!0;const r=document.createElement("div");r.className="gpturbo-msg-user",r.textContent=t,i.appendChild(r);const o=document.createElement("div");o.className="gpturbo-msg-typing",o.innerHTML='<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>',i.appendChild(o),i.scrollTop=i.scrollHeight;const a=X.scorePrompt(n,t),c=900+Math.random()*800;setTimeout(()=>{o.remove();const l=document.createElement("div");l.className="gpturbo-msg-ai",i.appendChild(l),i.scrollTop=i.scrollHeight,qg(l,a.response,10,()=>{i.scrollTop=i.scrollHeight,r_(n,a)})},c)}function r_(n,e){const t=document.getElementById("gpturbo-score-zone"),i=e.maxScore>0?Math.round(e.score/e.maxScore*100):100,s=e.tier==="excellent"?"🌟 Excellent !":e.tier==="good"?"✅ Bien joué":e.tier==="decent"?"👍 Pas mal":"💡 À améliorer",r=n.type==="discovery"?"":`
    <div class="score-criteria">
      ${e.met.map(c=>`
        <div class="score-row met">
          <span class="score-row-icon">✓</span>
          <span>${c.label}</span>
          <span class="score-row-pts">+${c.points}pts</span>
        </div>`).join("")}
      ${e.missed.map(c=>`
        <div class="score-row missed">
          <span class="score-row-icon">○</span>
          <span>${c.label}</span>
          <span class="score-row-pts">+${c.points}pts</span>
        </div>`).join("")}
    </div>
  `,o=n.lesson.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),a=Gt.find(c=>c.unlockAfter===n.id);t.innerHTML=`
    <div class="gpturbo-score">
      <div class="score-header">
        <span class="score-title">${s}</span>
        <span class="score-value ${e.tier}">${n.type==="discovery"?"🎉":`${i}/100`}</span>
      </div>
      ${r}
      <div class="score-lesson">${o}</div>
      <div class="score-reward">
        <span class="score-reward-item score-reward-euro">+${A(n.euroReward)}</span>
        <span class="score-reward-item score-reward-xp">+${n.xpReward} XP</span>
      </div>
      <button class="btn-next-challenge" id="btn-next-challenge">
        ${a&&!X.isCompleted(a.id)?`Prochain défi : ${a.title} →`:"← Retour à l'Academy"}
      </button>
    </div>
  `,t.scrollIntoView({behavior:"smooth",block:"nearest"}),X.isCompleted(n.id)||(X.complete(n.id,n.xpReward),p={...p,currency:p.currency+n.euroReward,totalEarned:p.totalEarned+n.euroReward},V.save(p),j.markDirty(),cl(),Qc(n.euroReward,t),rr("rgba(56,189,248,0.08)"),N(`🎓 Défi complété ! +${A(n.euroReward)} +${n.xpReward} XP`,"green")),document.getElementById("btn-next-challenge").addEventListener("click",()=>{a&&!X.isCompleted(a.id)?We=a.id:We=null,gi()})}function o_(){const n=ie.getSlots();for(const e of n){if(!e||e.status!=="accepted")continue;const t=Jn.querySelector(`[data-progress-id="${e.id}"]`);t&&(t.style.width=`${Math.round(ie.getProgress(e)*100)}%`);const i=Jn.querySelector(`[data-contract-id="${e.id}"] .contract-timer`);if(i){const s=Zn((e.completesAt??0)-Date.now());i.textContent=`⏱ ${s.label}`,i.className=`contract-timer${s.urgent?" urgent":""}`}}}
