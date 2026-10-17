(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Fi=[25,50,100,200],Ha=1.5;function ln(n){return Fi.filter(e=>n>=e).length}function un(n){return Math.pow(Ha,ln(n))}function ku(n){return Fi.find(e=>n<e)??null}const G=[{id:"bot-workflows",name:"Bot Workflows",description:"Automatise les tâches répétitives via n8n",icon:"🤖",baseCost:10,baseProduction:.15,costMultiplier:1.13},{id:"agent-copy",name:"Agent Copy",description:"Génère du contenu marketing en continu",icon:"✍️",baseCost:75,baseProduction:.8,costMultiplier:1.13},{id:"agent-analytics",name:"Agent Analytics",description:"Analyse les données et optimise les performances",icon:"📊",baseCost:500,baseProduction:3.5,costMultiplier:1.13},{id:"agent-audit",name:"Agent Audit",description:"Audite les projets clients, débloque les grands comptes",icon:"🔍",baseCost:3e3,baseProduction:18,costMultiplier:1.13},{id:"agent-legal",name:"Agent Légal",description:"CGV, RGPD, conformité — ouvre les marchés publics",icon:"⚖️",baseCost:2e4,baseProduction:60,costMultiplier:1.13},{id:"agent-growth",name:"Agent Growth",description:"Cold outreach, partenariats, distribution à grande échelle",icon:"🚀",baseCost:15e4,baseProduction:200,costMultiplier:1.13},{id:"agent-supervisor",name:"Agent Supervisor",description:"Orchestre tous les agents à grande échelle",icon:"🎯",baseCost:1e6,baseProduction:800,costMultiplier:1.13},{id:"agent-rag",name:"Agent RAG",description:"Interroge la base de savoir des clients et cite ses sources",icon:"📚",baseCost:12e6,baseProduction:4e3,costMultiplier:1.13,minPrestige:1},{id:"agent-voice",name:"Agent Voix",description:"Décroche, prend les rendez-vous et résume chaque appel",icon:"📞",baseCost:15e7,baseProduction:3e4,costMultiplier:1.13,minPrestige:3}],ne=[{id:"restaurant-local",name:"Le Comptoir",sector:"Restauration",icon:"🍽️",bonusPerSecond:1.5,unlockRateRequired:1,unlockDialogue:`Le Comptoir signe ! "Un chatbot pour prendre les réservations du midi, c'est possible ?"`},{id:"cabinet-medical",name:"MédiaTech+",sector:"Santé numérique",icon:"🏥",bonusPerSecond:8,unlockRateRequired:12,unlockDialogue:`MédiaTech+ à bord ! "L'IA doit rester RGPD-compliant." On gère.`},{id:"pme-ecommerce",name:"BricoMax",sector:"E-commerce",icon:"🛍️",bonusPerSecond:30,unlockRateRequired:100,unlockDialogue:`BricoMax signe ! "Nos concurrents ont déjà l'IA. Rattrapez-nous."`},{id:"groupe-hotelier",name:"PalmHôtel Group",sector:"Hôtellerie & Luxe",icon:"🏨",bonusPerSecond:100,unlockRateRequired:600,unlockDialogue:'PalmHôtel Group confirme ! "Automatisation totale du concierge virtuel."'},{id:"grand-compte",name:"GigaSoft Corp.",sector:"Big Tech",icon:"🏢",bonusPerSecond:400,unlockRateRequired:3e3,unlockDialogue:"GigaSoft Corp. entre dans l'empire ! Budget illimité. Exécution parfaite attendue."},{id:"gouvernement",name:"MinisteIA",sector:"Secteur Public",icon:"🏛️",bonusPerSecond:2e3,unlockRateRequired:15e3,unlockDialogue:"MinisteIA valide le marché ! L'État fait confiance à ton agence. Historique."},{id:"banque-nova",name:"BanqueNova",sector:"Finance",icon:"🏦",bonusPerSecond:1e4,unlockRateRequired:6e4,unlockDialogue:'BanqueNova signe ! "Nos conseillers veulent un assistant qui cite chaque règle interne."',minPrestige:1},{id:"eurosante",name:"EuroSanté",sector:"Santé publique",icon:"⚕️",bonusPerSecond:5e4,unlockRateRequired:12e4,unlockDialogue:"EuroSanté signe ! 40 hôpitaux, des données sensibles, zéro droit à l'erreur.",minPrestige:2}],z=[{id:"api-rate-x2",name:"API Rate Limit ×2",description:"Double la cadence de vos bots de workflows",icon:"⚡",cost:150,effect:{type:"agent_multiplier",agentId:"bot-workflows",multiplier:2},effectLabel:"Bot Workflows ×2",requiresAgentId:"bot-workflows",requiresAgentCount:5},{id:"gpt5-integration",name:"GPT-5 Integration",description:"L'Agent Copy génère du contenu de qualité supérieure",icon:"🧠",cost:1e3,effect:{type:"agent_multiplier",agentId:"agent-copy",multiplier:3},effectLabel:"Agent Copy ×3",requiresAgentId:"agent-copy",requiresAgentCount:5},{id:"iso-certification",name:"Certification ISO 27001",description:"Vos audits sont deux fois plus valorisés",icon:"🛡️",cost:8e3,effect:{type:"agent_multiplier",agentId:"agent-audit",multiplier:2},effectLabel:"Agent Audit ×2",requiresAgentId:"agent-audit",requiresAgentCount:3},{id:"click-boost",name:"Automatisation du Clic",description:"Chaque tâche manuelle rapporte 5× plus",icon:"🖱️",cost:350,effect:{type:"click_multiplier",multiplier:5},effectLabel:"Clic ×5"},{id:"venture-round",name:"Levée de Fonds Série A",description:"L'ensemble de l'agence tourne à plein régime",icon:"💰",cost:3e4,effect:{type:"global_multiplier",multiplier:1.5},effectLabel:"Toute production ×1.5",requiresAgentId:"agent-legal",requiresAgentCount:1},{id:"ai-sovereignty",name:"IA Souveraine",description:"Votre agence devient une référence nationale de l'IA",icon:"👑",cost:25e4,effect:{type:"global_multiplier",multiplier:3},effectLabel:"Toute production ×3",requiresAgentId:"agent-growth",requiresAgentCount:5},{id:"n8n-enterprise",name:"n8n Enterprise License",description:"Les workflows tournent sans limits de vitesse",icon:"🔗",cost:3500,effect:{type:"agent_multiplier",agentId:"bot-workflows",multiplier:4},effectLabel:"Bot Workflows ×4",requiresAgentId:"bot-workflows",requiresAgentCount:15},{id:"mcp-protocol",name:"Protocole MCP Full Stack",description:"Tous vos agents communiquent en temps réel",icon:"🕸️",cost:1e5,effect:{type:"global_multiplier",multiplier:2},effectLabel:"Toute production ×2",requiresAgentId:"agent-supervisor",requiresAgentCount:1},{id:"copilote",name:"Copilote",description:"Le fondateur travaille avec ses agents : chaque tâche manuelle profite de leur production",icon:"🧭",cost:2e4,effect:{type:"click_share",share:.02},effectLabel:"Clic + 2 % de la production des agents",requiresAgentId:"agent-analytics",requiresAgentCount:10},{id:"clients-recurrents",name:"Clients récurrents",description:"Les contrats signés deviennent des abonnements",icon:"🔁",cost:5e6,effect:{type:"client_multiplier",multiplier:2},effectLabel:"Bonus des clients ×2",requiresAgentId:"agent-supervisor",requiresAgentCount:1,minPrestige:1},{id:"orchestration",name:"Orchestration",description:"Les Supervisors répartissent le travail entre tous les agents",icon:"🎼",cost:3e7,effect:{type:"synergy",sourceAgentId:"agent-supervisor",perUnit:.01},effectLabel:"+1 % par Supervisor pour les autres agents",requiresAgentId:"agent-supervisor",requiresAgentCount:10,minPrestige:1},{id:"memoire-partagee",name:"Mémoire partagée",description:"Tous les projets alimentent une seule base de savoir",icon:"🗄️",cost:3e8,effect:{type:"agent_multiplier",agentId:"agent-rag",multiplier:2},effectLabel:"Agent RAG ×2",requiresAgentId:"agent-rag",requiresAgentCount:10,minPrestige:1},{id:"standard-ia",name:"Standard IA",description:"Un standard téléphonique qui ne dort jamais",icon:"☎️",cost:3e9,effect:{type:"agent_multiplier",agentId:"agent-voice",multiplier:3},effectLabel:"Agent Voix ×3",requiresAgentId:"agent-voice",requiresAgentCount:10,minPrestige:3}],qe=[{id:"rep-start-bonus",name:"Capital de départ",icon:"💳",description:"Commencez chaque prestige avec 2 000 € en poche.",cost:2,effect:{type:"start_bonus",amount:2e3}},{id:"rep-click-x2",name:"Expert reconnu",icon:"⚡",description:"Vos tâches manuelles valent 2× plus.",cost:2,effect:{type:"click_multiplier",multiplier:2}},{id:"rep-contract-slot",name:"Réputation établie",icon:"📋",description:"4ème slot de contrat débloqué en permanence.",cost:3,effect:{type:"extra_contract_slot"}},{id:"rep-contract-bonus",name:"Marges premium",icon:"💎",description:"Récompenses de tous les contrats +25%.",cost:3,effect:{type:"contract_reward_bonus",multiplier:1.25}},{id:"rep-offline-rate",name:"Production continue",icon:"🌙",description:"Revenus offline passent de 50% à 75%.",cost:4,effect:{type:"offline_rate",rate:.75}},{id:"rep-agent-discount",name:"Réseau d'élite",icon:"🤝",description:"Coût de tous les agents réduit de 20%.",cost:5,effect:{type:"agent_cost_reduction",reduction:.2}},{id:"rep-echo-boost",name:"Rythme de croisière",icon:"↺",description:"Cooldown du mode ÉCHO divisé par 2.",cost:5,effect:{type:"echo_cooldown",reduction:.5}},{id:"rep-income-x125",name:"Expertise IA",icon:"🧠",description:"Revenus de tous vos agents ×1.25 en permanence.",cost:7,effect:{type:"income_multiplier",multiplier:1.25}}],Ru="rep-notoriete-",Wa=50,Va=.05,Pu=5,Mu=2,As=Array.from({length:Wa},(n,e)=>`${Ru}${e+1}`);function xu(n){return Math.ceil(Pu*Math.pow(Mu,n-1))}const Nu=3;function Lu(n,e){return n<=0||e<=0?0:Math.floor(Nu*Math.sqrt(n/e))}function oi(){const n={};G.forEach(s=>{n[s.id]={count:0}});const e={};ne.forEach(s=>{e[s.id]=!1});const t={};z.forEach(s=>{t[s.id]=!1});const i={};return qe.forEach(s=>{i[s.id]=!1}),As.forEach(s=>{i[s]=!1}),{currency:0,totalEarned:0,prestigeCount:0,agents:n,clientsUnlocked:e,upgradesPurchased:t,lastSave:Date.now(),reputationPoints:0,reputationPurchased:i}}const nr=1e300,_t=(n,e=0)=>typeof n=="number"&&!Number.isNaN(n)&&n>=0?Math.min(n,nr):e,On=n=>n!==null&&typeof n=="object"?n:{};function Ga(n){const e=On(n),t=oi(),i=On(e.agents);for(const r of Object.keys(t.agents))t.agents[r]={count:Math.floor(_t(On(i[r]).count))};const s=(r,o)=>{const a=On(o);for(const c of Object.keys(r))r[c]=a[c]===!0};return s(t.clientsUnlocked,e.clientsUnlocked),s(t.upgradesPurchased,e.upgradesPurchased),s(t.reputationPurchased,e.reputationPurchased),t.currency=_t(e.currency),t.totalEarned=_t(e.totalEarned),t.prestigeCount=Math.floor(_t(e.prestigeCount)),t.reputationPoints=Math.floor(_t(e.reputationPoints)),t.lastSave=_t(e.lastSave,t.lastSave),t}const Xr=1e7,Ou=1.5,Du=.15,Uu=1,Bu=8,Zr=1e3;function eo(n,e){const t=n+e;return Number.isNaN(t)?n:Math.min(t,nr)}class Fu{getPrestigeMultiplier(e){return 1+e.prestigeCount*Du}getGlobalUpgradeMultiplier(e){return z.filter(t=>e.upgradesPurchased[t.id]&&t.effect.type==="global_multiplier").reduce((t,i)=>t*(i.effect.type==="global_multiplier"?i.effect.multiplier:1),1)}getAgentMultiplier(e,t){return z.filter(i=>e.upgradesPurchased[i.id]&&i.effect.type==="agent_multiplier"&&i.effect.agentId===t).reduce((i,s)=>i*(s.effect.type==="agent_multiplier"?s.effect.multiplier:1),1)}getSynergyMultiplier(e,t){return z.reduce((i,s)=>{if(!e.upgradesPurchased[s.id]||s.effect.type!=="synergy"||s.effect.sourceAgentId===t)return i;const r=e.agents[s.effect.sourceAgentId]?.count??0;return i*(1+s.effect.perUnit*r)},1)}getAgentProduction(e,t){const i=e.agents[t.id]?.count??0;if(i===0)return 0;const s=this.getAgentMultiplier(e,t.id);return t.baseProduction*i*s*un(i)*this.getSynergyMultiplier(e,t.id)}getClientMultiplier(e){return z.reduce((t,i)=>e.upgradesPurchased[i.id]&&i.effect.type==="client_multiplier"?t*i.effect.multiplier:t,1)}getClientBonus(e){return ne.filter(t=>e.clientsUnlocked[t.id]).reduce((t,i)=>t+i.bonusPerSecond,0)*this.getClientMultiplier(e)}isAgentAvailable(e,t){const i=G.find(s=>s.id===t);return!!i&&e.prestigeCount>=(i.minPrestige??0)}isClientAvailable(e,t){const i=ne.find(s=>s.id===t);return!!i&&e.prestigeCount>=(i.minPrestige??0)}getTotalRate(e,t=1){const i=G.reduce((r,o)=>r+this.getAgentProduction(e,o),0),s=this.getClientBonus(e);return(i+s)*this.getIncomeMultiplier(e)*t}getAgentRate(e){return G.reduce((i,s)=>i+this.getAgentProduction(e,s),0)*this.getIncomeMultiplier(e)}getIncomeMultiplier(e){return this.getGlobalUpgradeMultiplier(e)*this.getPrestigeMultiplier(e)*this.getReputationIncomeMult(e)}getClickShare(e){return z.reduce((t,i)=>e.upgradesPurchased[i.id]&&i.effect.type==="click_share"?t+i.effect.share:t,0)}getClickValue(e,t=1){const i=z.filter(l=>e.upgradesPurchased[l.id]&&l.effect.type==="click_multiplier").reduce((l,u)=>l*(u.effect.type==="click_multiplier"?u.effect.multiplier:1),1),s=this.getPrestigeMultiplier(e),r=this.getReputationClickMult(e),o=Uu*i*s*r,a=this.getClickShare(e),c=a>0?a*this.getAgentRate(e):0;return(o+c)*t}click(e,t=1){return this.earn(e,this.getClickValue(e,t))}earn(e,t){return t>0?{...e,currency:eo(e.currency,t),totalEarned:eo(e.totalEarned,t)}:e}getAgentCost(e,t){const i=G.find(a=>a.id===t),s=e.agents[t]?.count??0,r=i.baseCost*Math.pow(i.costMultiplier,s),o=this.getReputationAgentDiscount(e);return r*(1-o)}canBuyAgent(e,t){return this.isAgentAvailable(e,t)&&e.currency>=this.getAgentCost(e,t)}buyAgent(e,t){if(!this.canBuyAgent(e,t))return e;const i=this.getAgentCost(e,t);return{...e,currency:e.currency-i,agents:{...e.agents,[t]:{count:(e.agents[t]?.count??0)+1}}}}getAgentBulkCost(e,t,i){if(i<=0)return 0;const s=G.find(a=>a.id===t),r=this.getAgentCost(e,t),o=s.costMultiplier;return o===1?r*i:r*(Math.pow(o,i)-1)/(o-1)}getAffordableAgentCount(e,t){if(!this.isAgentAvailable(e,t))return 0;const i=G.find(a=>a.id===t);let s=this.getAgentCost(e,t),r=e.currency,o=0;for(;o<Zr&&r>=s;)r-=s,s*=i.costMultiplier,o++;return o}buyAgents(e,t,i){let s=e;for(let r=0;r<Math.min(i,Zr);r++){const o=this.buyAgent(s,t);if(o===s)break;s=o}return s}isUpgradeVisible(e,t){const i=z.find(r=>r.id===t);return e.prestigeCount<(i.minPrestige??0)?!1:i.requiresAgentId?(e.agents[i.requiresAgentId]?.count??0)>=(i.requiresAgentCount??1):!0}canBuyUpgrade(e,t){if(e.upgradesPurchased[t])return!1;const i=z.find(s=>s.id===t);return e.currency>=i.cost&&this.isUpgradeVisible(e,t)}buyUpgrade(e,t){if(!this.canBuyUpgrade(e,t))return e;const i=z.find(s=>s.id===t);return{...e,currency:e.currency-i.cost,upgradesPurchased:{...e.upgradesPurchased,[t]:!0}}}tick(e,t,i=1){const r=this.getTotalRate(e,i)*t,o={...e.clientsUnlocked},a=this.getAgentRate(e),c={...e.clientsUnlocked};ne.forEach(d=>{!c[d.id]&&a>=d.unlockRateRequired&&e.prestigeCount>=(d.minPrestige??0)&&(c[d.id]=!0)});const l=ne.filter(d=>c[d.id]&&!o[d.id]).map(d=>d.id);return{state:{...this.earn(e,r),clientsUnlocked:c},result:{newClients:l}}}applyOfflineEarnings(e,t){const i=Math.min(t,Bu*3600),s=this.getTotalRate(e),r=this.getReputationOfflineRate(e),o=Math.min(s*i*r,nr);return o>0?{state:this.earn(e,o),earned:o}:{state:e,earned:0}}getPrestigeThreshold(e){return Math.round(Xr*Math.pow(Ou,e.prestigeCount))}canPrestige(e){return e.totalEarned>=this.getPrestigeThreshold(e)}getPrestigeProgress(e){return Math.min(e.totalEarned/this.getPrestigeThreshold(e),1)}getPrestigeRP(e){const t=Math.max(e.totalEarned,this.getPrestigeThreshold(e));return Lu(t,Xr)}prestige(e){if(!this.canPrestige(e))return e;const t=e.prestigeCount+1,i=this.getPrestigeRP(e),s=this.getReputationStartBonus(e),r=oi();return{currency:s,totalEarned:s,prestigeCount:t,agents:r.agents,clientsUnlocked:r.clientsUnlocked,upgradesPurchased:r.upgradesPurchased,lastSave:Date.now(),reputationPoints:(e.reputationPoints??0)+i,reputationPurchased:{...e.reputationPurchased??{}}}}hasRepPerk(e,t){return!!e.reputationPurchased?.[t]}canBuyRepPerk(e,t){const i=qe.find(s=>s.id===t);return!i||this.hasRepPerk(e,t)?!1:(e.reputationPoints??0)>=i.cost}buyRepPerk(e,t){if(!this.canBuyRepPerk(e,t))return e;const i=qe.find(s=>s.id===t);return{...e,reputationPoints:(e.reputationPoints??0)-i.cost,reputationPurchased:{...e.reputationPurchased??{},[t]:!0}}}getReputationIncomeMult(e){return(this.hasRepPerk(e,"rep-income-x125")?1.25:1)*(1+Va*this.getNotorieteLevel(e))}getNotorieteLevel(e){return As.filter(t=>e.reputationPurchased?.[t]).length}isNotorieteOpen(e){return qe.every(t=>this.hasRepPerk(e,t.id))}getNextNotorieteCost(e){const t=this.getNotorieteLevel(e);return t>=Wa?1/0:xu(t+1)}canBuyNotoriete(e){return this.isNotorieteOpen(e)&&(e.reputationPoints??0)>=this.getNextNotorieteCost(e)}buyNotoriete(e){if(!this.canBuyNotoriete(e))return e;const t=As.find(i=>!e.reputationPurchased?.[i]);return{...e,reputationPoints:(e.reputationPoints??0)-this.getNextNotorieteCost(e),reputationPurchased:{...e.reputationPurchased??{},[t]:!0}}}getReputationClickMult(e){return this.hasRepPerk(e,"rep-click-x2")?2:1}getReputationAgentDiscount(e){return this.hasRepPerk(e,"rep-agent-discount")?.2:0}getReputationOfflineRate(e){return this.hasRepPerk(e,"rep-offline-rate")?.75:.5}getReputationStartBonus(e){return this.hasRepPerk(e,"rep-start-bonus")?2e3:0}getReputationContractBonus(e){return this.hasRepPerk(e,"rep-contract-bonus")?1.25:1}getReputationExtraSlot(e){return this.hasRepPerk(e,"rep-contract-slot")}getReputationEchoCooldownMult(e){return this.hasRepPerk(e,"rep-echo-boost")?.5:1}getTotalAgentCount(e){return Object.values(e.agents).reduce((t,i)=>t+i.count,0)}getUnlockedClientCount(e){return Object.values(e.clientsUnlocked).filter(Boolean).length}getPurchasedUpgradeCount(e){return Object.values(e.upgradesPurchased).filter(Boolean).length}}const Dn="bot-empire-v1",to="bot-empire-purchases",$u=1e4;class qu{autosaveTimer=null;save(e){try{localStorage.setItem(Dn,JSON.stringify({...e,lastSave:Date.now()}))}catch{}}load(){try{const e=localStorage.getItem(Dn);return e?this.merge(JSON.parse(e)):oi()}catch{return oi()}}reset(){localStorage.removeItem(Dn)}startAutosave(e){this.autosaveTimer=setInterval(()=>this.save(e()),$u);const t=()=>this.save(e());document.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&t()}),window.addEventListener("pagehide",t),window.addEventListener("beforeunload",t)}stopAutosave(){this.autosaveTimer!==null&&(clearInterval(this.autosaveTimer),this.autosaveTimer=null)}getOfflineSeconds(e){return Math.min((Date.now()-e.lastSave)/1e3,8*3600)}isFirstTime(){try{return!localStorage.getItem(Dn)}catch{return!0}}isAvailable(){try{const e="bot-empire-probe";localStorage.setItem(e,"1");const t=localStorage.getItem(e)==="1";return localStorage.removeItem(e),t}catch{return!1}}getPurchases(){try{return JSON.parse(localStorage.getItem(to)??"{}")}catch{return{}}}setPurchase(e,t){const i=this.getPurchases();i[e]=t,localStorage.setItem(to,JSON.stringify(i))}hasNoAds(){return!!this.getPurchases().noAds}hasBooster(){return(this.getPurchases().boosterX2Until??0)>Date.now()}exportToFile(e){const t=JSON.stringify({...e,lastSave:Date.now()},null,2),i=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download=`bot-empire-save-${new Date().toISOString().slice(0,10)}.json`,r.click(),URL.revokeObjectURL(s)}importFromText(e){try{const t=JSON.parse(e);return typeof t.currency!="number"?null:this.merge(t)}catch{return null}}encodeForURL(e){const t=JSON.stringify({...e,lastSave:Date.now()}),i=new TextEncoder().encode(t),s=btoa(String.fromCharCode(...i));return`${window.location.origin}${window.location.pathname}#save=${encodeURIComponent(s)}`}decodeFromURL(){try{const e=window.location.hash;if(!e.startsWith("#save="))return null;const t=decodeURIComponent(e.slice(6)),i=atob(t),s=Uint8Array.from(i,a=>a.charCodeAt(0)),r=new TextDecoder().decode(s),o=JSON.parse(r);return typeof o.currency!="number"?null:this.merge(o)}catch{return null}}merge(e){return Ga(e)}}const Hu={"meta.title":"Bot Empire — Construis ton agence IA","meta.description":"Idle game d'agence IA. De freelancer solo à empire d'automatisation.","lang.switch":"EN","lang.switchAria":"Switch to English","sound.mute":"Couper le son","sound.unmute":"Activer le son","header.treasury":"TRÉSORERIE","header.rate":"PRODUCTION","header.total":"TOTAL GAGNÉ","header.prestiges":"PRESTIGES","header.nextClient":"Prochain client","header.allClients":"Tous les clients ont signé","header.pct":"{n} %","bureau.title":"BUREAU VIRTUEL","bureau.empty":"Recrutez votre premier agent","bureau.agents":"{n} agent","bureau.agentsPl":"{n} agents","bureau.founder":"Fondateur","bureau.founderHint":"Votre fauteuil, au centre","bureau.signed":"SIGNÉ","bureau.newSpace":"Nouvel espace","post.workflows":"N8N","post.copy":"COPY","post.analytics":"DATA","post.audit":"AUDIT","post.legal":"LÉGAL","post.growth":"GROWTH","post.supervisor":"SUPERVISOR","post.rag":"RAG","post.voice":"VOIX","click.label":"Exécuter une tâche","echo.label":"MODE ÉCHO","echo.activated":"↺ Mode ÉCHO activé — vos clics se rejouent pendant 60s !","echo.active":"Actif — {n}s restantes","echo.cooldown":"Recharge — {time}","echo.needClicks":"Cliquez {n}× de plus pour activer","echo.ready":"{n} clics mémorisés — prêt !","stats.title":"TABLEAU DE BORD","stats.agents":"Agents actifs","stats.clients":"Contrats signés","stats.upgrades":"Upgrades achetés","stats.multiplier":"Multiplicateur","stats.offline":"Production offline","save.share":"Partager","save.shareTitle":"Partager mon agence","save.export":"Exporter","save.exportTitle":"Exporter la sauvegarde","save.import":"Importer","save.importTitle":"Importer une sauvegarde","save.exported":"Sauvegarde exportée !","save.imported":"Sauvegarde importée !","save.importedUrl":"Sauvegarde importée avec succès !","save.invalid":"Fichier invalide.","save.linkCopied":"Lien copié !","save.cloudRestored":"Progression restaurée depuis le cloud !","prestige.cardTitle":"VENDRE L'AGENCE","prestige.target":"Objectif : {amount}","prestige.button":"Vendre l'Agence (+15% permanent)","prestige.modalTitle":"CESSION D'AGENCE","prestige.modalSub":"Vous êtes sur le point de vendre votre agence.","prestige.value":"Valeur de cession","prestige.gained":"Multiplicateur acquis","prestige.after":"Total après prestige","prestige.warning":"Tous vos agents et contrats seront réinitialisés.","prestige.confirm":"Confirmer la vente","prestige.cancel":"Annuler","prestige.gain":"+15 % de revenu et +{rp} pts de réputation","prestige.next":"×{mult} — prochain objectif : {amount}","prestige.done":"Agence vendue ! +{rp} pts de réputation acquis.","tab.agents":"Agents","tab.clients":"Clients","tab.upgrades":"Upgrades","tab.contracts":"Contrats","tab.reputation":"Réputation","tab.academy":"Academy","tab.agency":"Agence","panel.label":"Onglets de gestion","panel.expand":"Agrandir le panneau","panel.collapse":"Réduire le panneau","agent.perUnit":"{rate}/unité","agent.total":"{rate} total","agent.recruited":"Agent recruté !","agent.tierBonus":"Équipe {mult}","agent.tierNext":"Prochain palier : {n}/{target} ({mult})","agent.tierMax":"Tous les paliers atteints","tier.reached":"{name} : palier de {n} agents, production {mult} !","client.bonus":"{rate} bonus","client.unlockAt":"Déblocage à {rate} d'agents","client.missing":" — manque {rate}","client.active":"Actif","client.locked":"À signer","buy.label":"Recruter","buy.max":"max","reveal.hint":"Se dévoile à 25 % de son prix","locked.prestige1":"S'ouvre après la 1re vente de l'agence","locked.prestigeN":"S'ouvre après {n} ventes de l'agence","markets.kicker":"Nouveaux marchés ouverts","markets.list":"Nouveaux marchés ouverts : {list}","client.new":"Nouveau client : {name}","upgrade.empty":"Achetez des agents pour débloquer des upgrades.","upgrade.bought":"✓ Acheté","upgrade.activated":"Upgrade activé !","market.incomeUp":"+{n}% revenus","market.incomeDown":"−{n}% revenus","market.click":"×{mult} clics","market.end":"Fin d'événement : {name}","milestone.10":"Premiers €10 gagnés !","milestone.100":"€100 en poche !","milestone.1k":"€1 000 — l'agence décolle !","milestone.10k":"€10 000 — client premium débloqué !","milestone.100k":"€100K — vous êtes sérieux !","milestone.1m":"€1M — empire en construction !","milestone.10m":"€10M — légende du secteur !","milestone.100m":"€100M — vous avez tout scalé !","milestone.generic":"{amount} atteints !","contract.new":"Nouveau contrat : {title}","contract.done":"Contrat complété ! +{reward} de {client}","contract.accepted":"Contrat accepté ! Livraison dans {time}","contract.board":"BOARD DE CONTRATS — {available} disponible(s), {accepted} en cours","contract.emptySlot":"Slot {n} — En attente d'un nouveau contrat","contract.nextIn":"Prochain contrat dans 20-40 min","contract.epic":"ÉPIQUE","contract.rare":"✦ RARE","contract.common":"STANDARD","contract.accept":"Accepter","contract.required":"Requis ↑","contract.inProgress":"En cours...","rep.introTitle":"Réputation — Bonus permanents","rep.introText":"Vendez votre agence (Prestige) pour gagner des points de réputation. Dépensez-les ici pour débloquer des avantages permanents qui survivent à chaque reset.","rep.nextShort":"Prochain prestige : +{rp} pts","rep.next":"Prochain prestige","rep.points":"Points de réputation","rep.enabled":"✓ Activé","rep.owned":"Acquis","rep.buy":"Acheter","rep.missing":"Manque {n} pts","rep.activated":"{name} activé !","rep.notoriete":"Notoriété","rep.notorieteDesc":"+5 % de revenu par niveau, sans plafond. Le prix double à chaque niveau.","rep.notorieteLevel":"Niveau {n} · revenu +{pct} %","rep.notorieteLocked":"S'ouvre quand les {n} bonus ci-dessus sont acquis","rep.notorieteBought":"Notoriété niveau {n} !","share.title":"PARTAGER MON AGENCE","share.subtitle":"Ce lien contient ta progression complète. Envoie-le à toi-même pour changer d'appareil, migrer vers la PWA (écran d'accueil iPhone), ou partager tes stats !","share.tip":"Sur iPhone : copie ce lien avant d'ajouter à l'écran d'accueil. La PWA et Safari ont des sauvegardes séparées — le cloud Firebase synchronise automatiquement.","share.copy":"Copier","share.yes":"Partagé : progression, agents, €, prestiges","share.no":"Non partagé : contrats, Academy, marché","share.close":"Fermer","import.title":"SAUVEGARDE DÉTECTÉE","import.subtitle":"Ce lien contient une progression. Veux-tu la charger ?","import.warning":"Ta progression actuelle sera remplacée.","import.confirm":"Charger cette save","import.cancel":"Garder la mienne","import.treasury":"Trésorerie","import.total":"Total gagné","import.agents":"Agents","import.clients":"Clients","import.prestiges":"Prestiges","incident.notice":"Incident chez {client} — aider (+{reward})","incident.ignore":"Ignorer l'incident","incident.skip":"Ignorer cet incident","incident.continue":"Continuer","incident.won":"+{reward} encaissés ! {lesson}","incident.solved":"Incident résolu ! +{reward}","incident.wrong":"Mauvaise réponse — incident non résolu.","storage.unavailable":"Sauvegarde impossible dans ce navigateur : votre partie sera perdue en fermant la page. Exportez-la depuis l'onglet Agence.","offline.title":"BIENVENUE DE RETOUR","offline.subtitle":"Vos agents ont travaillé pendant votre absence.","offline.earned":"Revenus offline","offline.collect":"Encaisser","hint.firstClick":"Clique ici pour exécuter ta première tâche : chaque clic rapporte de l'argent.","hint.firstAgent":"Tu peux recruter ton premier agent ! Il travaille pour toi en continu, même hors ligne.","hint.firstClient":"Ton premier client a signé : il ajoute un bonus permanent. D'autres suivront si ta production grimpe.","hint.close":"Fermer l'aide","duration.days":"{n}j"},Wu={"meta.title":"Bot Empire — Build your AI agency","meta.description":"An AI agency idle game. From solo freelancer to automation empire.","lang.switch":"FR","lang.switchAria":"Passer en français","sound.mute":"Mute sound","sound.unmute":"Turn sound on","header.treasury":"CASH","header.rate":"INCOME","header.total":"TOTAL EARNED","header.prestiges":"PRESTIGES","header.nextClient":"Next client","header.allClients":"Every client has signed","header.pct":"{n}%","bureau.title":"VIRTUAL OFFICE","bureau.empty":"Hire your first agent","bureau.agents":"{n} agent","bureau.agentsPl":"{n} agents","bureau.founder":"Founder","bureau.founderHint":"Your chair, at the centre","bureau.signed":"SIGNED","bureau.newSpace":"New space","post.workflows":"N8N","post.copy":"COPY","post.analytics":"DATA","post.audit":"AUDIT","post.legal":"LEGAL","post.growth":"GROWTH","post.supervisor":"SUPERVISOR","post.rag":"RAG","post.voice":"VOICE","click.label":"Run a task","echo.label":"ECHO MODE","echo.activated":"↺ ECHO mode on — your clicks replay for 60s!","echo.active":"Active — {n}s left","echo.cooldown":"Recharging — {time}","echo.needClicks":"Click {n}× more to enable","echo.ready":"{n} clicks recorded — ready!","stats.title":"DASHBOARD","stats.agents":"Active agents","stats.clients":"Signed clients","stats.upgrades":"Upgrades bought","stats.multiplier":"Multiplier","stats.offline":"Offline income","save.share":"Share","save.shareTitle":"Share my agency","save.export":"Export","save.exportTitle":"Export save file","save.import":"Import","save.importTitle":"Import a save file","save.exported":"Save exported!","save.imported":"Save imported!","save.importedUrl":"Save imported successfully!","save.invalid":"Invalid file.","save.linkCopied":"Link copied!","save.cloudRestored":"Progress restored from the cloud!","prestige.cardTitle":"SELL THE AGENCY","prestige.target":"Goal: {amount}","prestige.button":"Sell the Agency (+15% permanent)","prestige.modalTitle":"AGENCY SALE","prestige.modalSub":"You are about to sell your agency.","prestige.value":"Sale value","prestige.gained":"Multiplier gained","prestige.after":"Total after prestige","prestige.warning":"All your agents and contracts will be reset.","prestige.confirm":"Confirm sale","prestige.cancel":"Cancel","prestige.gain":"+15% income and +{rp} reputation pts","prestige.next":"×{mult} — next goal: {amount}","prestige.done":"Agency sold! +{rp} reputation pts earned.","tab.agents":"Agents","tab.clients":"Clients","tab.upgrades":"Upgrades","tab.contracts":"Contracts","tab.reputation":"Reputation","tab.academy":"Academy","tab.agency":"Agency","panel.label":"Management tabs","panel.expand":"Expand the panel","panel.collapse":"Collapse the panel","agent.perUnit":"{rate}/unit","agent.total":"{rate} total","agent.recruited":"Agent hired!","agent.tierBonus":"Team {mult}","agent.tierNext":"Next tier: {n}/{target} ({mult})","agent.tierMax":"All tiers reached","tier.reached":"{name}: {n}-agent tier, output {mult}!","client.bonus":"{rate} bonus","client.unlockAt":"Unlocks at {rate} from agents","client.missing":" — {rate} to go","client.active":"Active","client.locked":"Not yet","buy.label":"Hire","buy.max":"max","reveal.hint":"Revealed at 25% of its price","locked.prestige1":"Opens after your first agency sale","locked.prestigeN":"Opens after {n} agency sales","markets.kicker":"New markets open","markets.list":"New markets open: {list}","client.new":"New client: {name}","upgrade.empty":"Hire agents to unlock upgrades.","upgrade.bought":"✓ Bought","upgrade.activated":"Upgrade enabled!","market.incomeUp":"+{n}% income","market.incomeDown":"−{n}% income","market.click":"×{mult} clicks","market.end":"Event over: {name}","milestone.10":"First €10 earned!","milestone.100":"€100 in the bank!","milestone.1k":"€1,000 — the agency takes off!","milestone.10k":"€10,000 — premium client unlocked!","milestone.100k":"€100K — you're serious!","milestone.1m":"€1M — an empire in the making!","milestone.10m":"€10M — industry legend!","milestone.100m":"€100M — you've scaled everything!","milestone.generic":"{amount} reached!","contract.new":"New contract: {title}","contract.done":"Contract complete! +{reward} from {client}","contract.accepted":"Contract accepted! Delivery in {time}","contract.board":"CONTRACT BOARD — {available} available, {accepted} in progress","contract.emptySlot":"Slot {n} — Waiting for a new contract","contract.nextIn":"Next contract in 20-40 min","contract.epic":"EPIC","contract.rare":"✦ RARE","contract.common":"STANDARD","contract.accept":"Accept","contract.required":"Required ↑","contract.inProgress":"In progress...","rep.introTitle":"Reputation — Permanent bonuses","rep.introText":"Sell your agency (Prestige) to earn reputation points. Spend them here on permanent perks that survive every reset.","rep.nextShort":"Next prestige: +{rp} pts","rep.next":"Next prestige","rep.points":"Reputation points","rep.enabled":"✓ Enabled","rep.owned":"Owned","rep.buy":"Buy","rep.missing":"{n} pts short","rep.activated":"{name} enabled!","rep.notoriete":"Renown","rep.notorieteDesc":"+5% income per level, no cap. The price doubles with each level.","rep.notorieteLevel":"Level {n} · income +{pct}%","rep.notorieteLocked":"Opens once the {n} perks above are owned","rep.notorieteBought":"Renown level {n}!","share.title":"SHARE MY AGENCY","share.subtitle":"This link holds your full progress. Send it to yourself to switch devices, move to the home-screen app, or show off your stats!","share.tip":"On iPhone: copy this link before adding to the home screen. The home-screen app and Safari keep separate saves — Firebase cloud sync handles it automatically.","share.copy":"Copy","share.yes":"Shared: progress, agents, €, prestiges","share.no":"Not shared: contracts, Academy, market","share.close":"Close","import.title":"SAVE DETECTED","import.subtitle":"This link contains a save. Load it?","import.warning":"Your current progress will be replaced.","import.confirm":"Load this save","import.cancel":"Keep mine","import.treasury":"Cash","import.total":"Total earned","import.agents":"Agents","import.clients":"Clients","import.prestiges":"Prestiges","incident.notice":"Incident at {client} — help out (+{reward})","incident.ignore":"Ignore the incident","incident.skip":"Ignore this incident","incident.continue":"Continue","incident.won":"+{reward} earned! {lesson}","incident.solved":"Incident solved! +{reward}","incident.wrong":"Wrong answer — incident not solved.","storage.unavailable":"This browser blocks saving: your game will be lost when you close the page. Export it from the Agency tab.","offline.title":"WELCOME BACK","offline.subtitle":"Your agents kept working while you were away.","offline.earned":"Offline income","offline.collect":"Collect","hint.firstClick":"Click here to run your first task: every click earns money.","hint.firstAgent":"You can hire your first agent! It works for you nonstop, even offline.","hint.firstClient":"Your first client signed: it adds a permanent bonus. More will follow as your income grows.","hint.close":"Close tip","duration.days":"{n}d"},no={fr:Hu,en:Wu},ja="bot-empire-lang",Vu=new Set(["Europe/Paris","Europe/Brussels","Europe/Luxembourg","Europe/Monaco","Europe/Zurich","America/Montreal","America/Cayenne","America/Guadeloupe","America/Martinique","America/Miquelon","America/St_Barthelemy","America/Marigot","America/Port-au-Prince","Indian/Reunion","Indian/Mayotte","Indian/Antananarivo","Indian/Comoro","Indian/Kerguelen","Pacific/Noumea","Pacific/Tahiti","Pacific/Marquesas","Pacific/Gambier","Pacific/Wallis","Pacific/Efate","Africa/Abidjan","Africa/Algiers","Africa/Bamako","Africa/Bangui","Africa/Brazzaville","Africa/Bujumbura","Africa/Casablanca","Africa/Conakry","Africa/Dakar","Africa/Djibouti","Africa/Douala","Africa/Kigali","Africa/Kinshasa","Africa/Libreville","Africa/Lome","Africa/Lubumbashi","Africa/Ndjamena","Africa/Niamey","Africa/Nouakchott","Africa/Ouagadougou","Africa/Porto-Novo","Africa/Tunis"]);function Gu(){const n=navigator.languages?.length?navigator.languages:[navigator.language];for(const e of n){const t=(e??"").toLowerCase();if(t.startsWith("fr"))return"fr";if(t.startsWith("en"))return"en"}try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone;if(Vu.has(e))return"fr"}catch{}return"en"}function ju(){try{const n=localStorage.getItem(ja);if(n==="fr"||n==="en")return n}catch{}return Gu()}const Ut=ju();function zu(n){try{localStorage.setItem(ja,n)}catch{}}function p(n,e){const t=no[Ut][n]??no.fr[n];return e?t.replace(/\{(\w+)\}/g,(i,s)=>s in e?String(e[s]):i):t}function Ku(n=document){n.querySelectorAll("[data-i18n]").forEach(e=>{e.textContent=p(e.dataset.i18n)}),n.querySelectorAll("[data-i18n-aria]").forEach(e=>{e.setAttribute("aria-label",p(e.dataset.i18nAria))}),n.querySelectorAll("[data-i18n-title]").forEach(e=>{e.title=p(e.dataset.i18nTitle)}),document.documentElement.lang=Ut,document.title=p("meta.title"),document.querySelector('meta[name="description"]')?.setAttribute("content",p("meta.description"))}const Yu=["","K","M","B","T","Qa","Qi","Sx","Sp","Oc"],Qu=["","k","M","Md","T","Qa","Qi","Sx","Sp","Oc"],tn=Ut==="fr",ks=" ";function io(n,e=2){if(!isFinite(n)||isNaN(n))return"0";const t=a=>tn?a.replace(".",","):a;if(n<1e3)return t(n.toFixed(e));const i=tn?Qu:Yu,s=Math.floor(Math.log10(Math.abs(n))/3);if(s>=i.length){const a=Math.floor(Math.log10(Math.abs(n)));return`${t((n/Math.pow(10,a)).toFixed(e))}e${a}`}const r=i[s],o=n/Math.pow(1e3,s);return tn?`${t(o.toFixed(e))}${ks}${r}`:`${o.toFixed(e)}${r}`}function B(n,e=2){if(!tn)return`€${io(n,e)}`;const t=io(n,e);return t.includes(ks)?`${t}€`:`${t}${ks}€`}function rt(n){const e=String(Math.round(n*100)/100);return`×${tn?e.replace(".",","):e}`}function Ne(n){return`+${B(n)}/s`}function Ju(n){return n<60?`${Math.floor(n)}s`:n<3600?`${Math.floor(n/60)}m`:n<86400?`${Math.floor(n/3600)}h`:p("duration.days",{n:Math.floor(n/86400)})}const ir={workflow:'<circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M7.2 6h9.6M6.2 7.9l4.6 8.2M17.8 7.9l-4.6 8.2"/>',pen:'<path d="M15.5 4.5l4 4L9 19H5v-4z"/><path d="M13.5 6.5l4 4"/><path d="M4 21h16"/>',chart:'<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6M20 16V6" />',search:'<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/><path d="M8 10.5h5"/>',scale:'<path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7l-2.5 6a3 3 0 0 0 5 0z"/><path d="M19 7l-2.5 6a3 3 0 0 0 5 0z"/>',megaphone:'<path d="M4 10v4h3l8 4V6l-8 4z"/><path d="M7 14l1.5 5h2.5l-1-4.4"/><path d="M18.5 9.5a3.5 3.5 0 0 1 0 5"/>',compass:'<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',database:'<path d="M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3z"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',phone:'<path d="M6.5 3.5h3l1.5 4.5-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4.5 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z"/>',cup:'<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M8.5 3.5c0 1.5 1.5 1.5 1.5 3M12.5 3.5c0 1.5 1.5 1.5 1.5 3"/>',pulse:'<path d="M3 12h4l2-5 4 10 2-5h6"/>',bag:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',bed:'<path d="M3 18V7M21 18v-5H3"/><path d="M3 13h18"/><path d="M7 13v-2.5a1.5 1.5 0 0 1 1.5-1.5H11v4"/>',tower:'<path d="M6 21V5l7-2v18M13 8l5 2v11M4 21h16"/><path d="M9 8h1M9 12h1M9 16h1M15.5 13h0.5M15.5 17h0.5"/>',columns:'<path d="M3 9l9-5 9 5z"/><path d="M5 9v9M9.7 9v9M14.3 9v9M19 9v9M3 21h18M4 18h16"/>',vault:'<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="12" cy="12" r="3.5"/><path d="M12 8.5V7M12 17v-1.5M15.5 12H17M7 12h1.5M6 19v1.5M18 19v1.5"/>',health:'<path d="M9.5 3.5h5v6h6v5h-6v6h-5v-6h-6v-5h6z"/>',agents:'<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 8V5"/><circle cx="12" cy="4" r="1"/><circle cx="9.5" cy="13" r="1"/><circle cx="14.5" cy="13" r="1"/><path d="M2.5 12v3M21.5 12v3"/>',handshake:'<path d="M2.5 11l3.5-4 4 1.5 3-1.5 4.5 1 4 3"/><path d="M6 7l-1 7 5 5 2-1"/><path d="M18 9l1 5-5 5-2-2"/><path d="M10 8.5l3.5 3.5M12 14l2 2M10 16l1.5 1.5"/>',sliders:'<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',document:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 16h6"/>',star:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',cap:'<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4"/><path d="M21.5 9.5v5"/>',building:'<path d="M4 21V8l8-5 8 5v13"/><path d="M9 21v-5h6v5M8 11h2M14 11h2"/>',bolt:'<path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z"/>',echo:'<path d="M4 4v5h5"/><path d="M4.6 15a8 8 0 1 0 1.6-8.4L4 9"/>',link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 6.8"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>',download:'<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5"/><path d="M4 17v3h16v-3"/>',upload:'<path d="M12 15V4M7.5 8.5L12 4l4.5 4.5"/><path d="M4 17v3h16v-3"/>',trophy:'<path d="M8 4h8v6a4 4 0 0 1-8 0z"/><path d="M8 6H4.5a3.5 3.5 0 0 0 3.6 4.5M16 6h3.5a3.5 3.5 0 0 1-3.6 4.5"/><path d="M12 14v4M8.5 20.5h7M10 18h4"/>',soundOn:'<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',soundOff:'<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',inbox:'<path d="M4 13l2.5-8h11L20 13v6H4z"/><path d="M4 13h4.5l1 2h5l1-2H20"/>',alert:'<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17h0.01"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',cross:'<path d="M6 6l12 12M18 6L6 18"/>',lock:'<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',play:'<path d="M8 5.5v13l10-6.5z"/>',back:'<path d="M10 6l-6 6 6 6M4 12h16"/>',send:'<path d="M4 12l16-8-6 16-2.5-6.5z"/><path d="M11.5 13.5L20 4"/>',chevron:'<path d="M6 9l6 6 6-6"/>',book:'<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/>',trendUp:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',trendDown:'<path d="M3 7l6 6 4-4 8 8"/><path d="M15 17h6v-6"/>',coin:'<circle cx="12" cy="12" r="8.5"/><path d="M15 8.5a4 4 0 1 0 0 7M7.5 11h6M7.5 13.5h6"/>',moon:'<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5 7.5 7.5 0 1 0 19 14.5z"/>',tag:'<path d="M3.5 12.5V4h8.5l8.5 8.5-8.5 8.5z"/><circle cx="8" cy="8.5" r="1.3"/>',plus:'<path d="M12 5v14M5 12h14"/>',percent:'<path d="M18 6L6 18"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',chip:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9.5 9.5h5v5h-5zM9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',cursor:'<path d="M5 3.5l13 6.5-5.5 1.8L10.5 17z"/><path d="M12.5 11.8l5 5"/>',sofa:'<path d="M4 12V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M2.5 13a1.5 1.5 0 0 1 3 0v1.5h13V13a1.5 1.5 0 0 1 3 0v5h-19z"/><path d="M5 18v2M19 18v2"/>',monitor:'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16v4"/>',rocket:'<path d="M12 3c3.5 2 5 5.5 5 9.5l-2 3.5H9l-2-3.5C7 8.5 8.5 5 12 3z"/><circle cx="12" cy="10" r="1.6"/><path d="M9 16l-2.5 3.5M15 16l2.5 3.5M12 16v4.5"/>',crown:'<path d="M3.5 8l4 4.5L12 5.5l4.5 7 4-4.5-1.5 10.5H5z"/><path d="M5 20.5h14"/>',logo:'<path d="M12 13.5l8.5 4.3L12 22l-8.5-4.2z"/><path d="M9 4.5h0.01M14 2.5h0.01M16.5 7h0.01M10.5 9h0.01M13 6.5h0.01M7 7.5h0.01"/>'},Xu=new Set(Object.keys(ir));function R(n,e="ico"){return`<svg class="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ir[n]}</svg>`}const sr={"bot-workflows":"workflow","agent-copy":"pen","agent-analytics":"chart","agent-audit":"search","agent-legal":"scale","agent-growth":"megaphone","agent-supervisor":"compass","agent-rag":"database","agent-voice":"phone"},Zu={"restaurant-local":"cup","cabinet-medical":"pulse","pme-ecommerce":"bag","groupe-hotelier":"bed","grand-compte":"tower",gouvernement:"columns","banque-nova":"vault",eurosante:"health"},ed={"rep-start-bonus":"coin","rep-click-x2":"cursor","rep-contract-slot":"plus","rep-contract-bonus":"percent","rep-offline-rate":"moon","rep-agent-discount":"tag","rep-echo-boost":"echo","rep-income-x125":"trendUp"};function td(n,e){return n==="click_multiplier"||n==="click_share"?"cursor":n==="global_multiplier"?"trendUp":n==="client_multiplier"?"handshake":n==="synergy"?"link":e&&sr[e]||"chip"}const so=new Map;function nd(n){const e=so.get(n);if(e)return e;const t=(r,o)=>Number(new RegExp(`\\b${o}="([^"]+)"`).exec(r)?.[1]??0),i=[];for(const r of ir[n].match(/<(path|circle|rect)\b[^>]*>/g)??[])if(r.startsWith("<path"))i.push(/\bd="([^"]+)"/.exec(r)?.[1]??"");else if(r.startsWith("<circle")){const o=t(r,"cx"),a=t(r,"cy"),c=t(r,"r");i.push(`M${o-c} ${a}a${c} ${c} 0 1 0 ${2*c} 0a${c} ${c} 0 1 0 ${-2*c} 0`)}else{const o=t(r,"x"),a=t(r,"y"),c=t(r,"width"),l=t(r,"height");i.push(`M${o} ${a}h${c}v${l}h${-c}z`)}const s=new Path2D(i.join(""));return so.set(n,s),s}function id(n=document){n.querySelectorAll("[data-icon]").forEach(e=>{const t=e.dataset.icon??"";Xu.has(t)&&(e.innerHTML=R(t))})}const sd=9,ss=.25,za="bot-empire-buy-mode",rd=["1","10","max"];function od(){try{const n=localStorage.getItem(za);if(n==="1"||n==="10"||n==="max")return n}catch{}return"1"}class ad{engine;agentsPanelDirty=!0;clientsPanelDirty=!0;upgradesPanelDirty=!0;elCurrency=document.getElementById("hd-currency");elRate=document.getElementById("hd-rate");elTotal=document.getElementById("hd-total");elPrestigeBadge=document.getElementById("prestige-badge");elPrestigeCount=document.getElementById("prestige-count");elClickValue=document.getElementById("click-value-display");elStatAgents=document.getElementById("stat-agents");elStatClients=document.getElementById("stat-clients");elStatUpgrades=document.getElementById("stat-upgrades");elStatMultiplier=document.getElementById("stat-multiplier");elStatOffline=document.getElementById("stat-offline");elPrestigeBar=document.getElementById("prestige-bar-fill");elPrestigePct=document.getElementById("prestige-pct");elPrestigeTarget=document.getElementById("prestige-target");elBtnPrestige=document.getElementById("btn-prestige");elTabCountAgents=document.getElementById("tab-count-agents");elTabCountClients=document.getElementById("tab-count-clients");elTabCountUpgrades=document.getElementById("tab-count-upgrades");elTabCountAgency=document.getElementById("tab-count-agency");elTabAgents=document.getElementById("tab-agents");elTabClients=document.getElementById("tab-clients");elTabUpgrades=document.getElementById("tab-upgrades");elNextClient=document.getElementById("next-client");elNextLabel=document.getElementById("next-client-label");elNextFill=document.getElementById("next-client-fill");elNextPct=document.getElementById("next-client-pct");buyMode=od();revealKey="";shownCurrency=-1;shownRate=-1;lastFrame=0;reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");constructor(e){this.engine=e}tween(e,t,i){if(e<0||t<e||this.reducedMotion.matches)return t;const s=e+(t-e)*(1-Math.exp(-i*sd));return t-s<Math.max(.005,t*1e-6)?t:s}getBuyMode(){return this.buyMode}setBuyMode(e){this.buyMode=e;try{localStorage.setItem(za,e)}catch{}this.agentsPanelDirty=!0}getBuyQuantity(e,t){return this.buyMode==="10"?10:this.buyMode==="max"?Math.max(1,this.engine.getAffordableAgentCount(e,t)):1}markDirty(){this.agentsPanelDirty=!0,this.clientsPanelDirty=!0,this.upgradesPanelDirty=!0}setOfflineStat(e){this.elStatOffline.textContent=e}update(e){const t=this.engine.getTotalRate(e),i=this.engine.getClickValue(e),s=this.engine.getPrestigeMultiplier(e),r=this.engine.getPrestigeProgress(e),o=this.engine.canPrestige(e),a=performance.now(),c=this.lastFrame?Math.min((a-this.lastFrame)/1e3,.25):0;this.lastFrame=a,this.shownCurrency=this.tween(this.shownCurrency,e.currency,c),this.shownRate=this.tween(this.shownRate,t,c),this.elCurrency.textContent=B(this.shownCurrency),this.elRate.textContent=Ne(this.shownRate),this.elTotal.textContent=B(e.totalEarned),e.prestigeCount>0&&(this.elPrestigeBadge.style.display="",this.elPrestigeCount.textContent=`×${e.prestigeCount}`),this.elClickValue.textContent=`+${B(i)}`,this.elStatAgents.textContent=String(this.engine.getTotalAgentCount(e)),this.elStatClients.textContent=String(this.engine.getUnlockedClientCount(e)),this.elStatUpgrades.textContent=String(this.engine.getPurchasedUpgradeCount(e)),this.elStatMultiplier.textContent=`×${s.toFixed(2)}`;const l=Math.floor(r*100),u=this.engine.getPrestigeThreshold(e);this.elPrestigeBar.style.width=`${l}%`,this.elPrestigePct.textContent=`${l}%`,this.elTabCountAgency.textContent=`${l}%`,this.elTabCountAgency.classList.toggle("ready",o),this.elPrestigeTarget.textContent=p("prestige.target",{amount:B(u)}),this.elBtnPrestige.disabled=!o,this.elTabCountAgents.textContent=String(this.engine.getTotalAgentCount(e)),this.elTabCountClients.textContent=String(this.engine.getUnlockedClientCount(e)),this.elTabCountUpgrades.textContent=String(this.engine.getPurchasedUpgradeCount(e)),this.updateNextClient(e);const d=this.computeRevealKey(e);d!==this.revealKey&&(this.revealKey=d,this.markDirty()),this.agentsPanelDirty?(this.renderAgents(e),this.agentsPanelDirty=!1):this.updateAgentButtons(e),this.clientsPanelDirty&&(this.renderClients(e),this.clientsPanelDirty=!1),this.upgradesPanelDirty?(this.renderUpgrades(e),this.upgradesPanelDirty=!1):this.updateUpgradeButtons(e)}prestigeLockText(e){const t=e??0;return t<=1?p("locked.prestige1"):p("locked.prestigeN",{n:t})}isAgentRevealed(e,t){return this.engine.isAgentAvailable(e,t)?(e.agents[t]?.count??0)>0||G[0]?.id===t?!0:e.totalEarned>=this.engine.getAgentCost(e,t)*ss:!1}isClientRevealed(e,t,i){if(e.clientsUnlocked[t])return!0;if(!this.engine.isClientAvailable(e,t))return!1;const s=ne.find(r=>r.id===t);return i>=s.unlockRateRequired*ss}isUpgradeRevealed(e,t){if(e.upgradesPurchased[t])return!0;const i=z.find(s=>s.id===t);return e.totalEarned>=i.cost*ss}computeRevealKey(e){const t=this.engine.getAgentRate(e);return[G.map(i=>this.isAgentRevealed(e,i.id)?1:0).join(""),ne.map(i=>this.isClientRevealed(e,i.id,t)?1:0).join(""),z.map(i=>this.engine.isUpgradeVisible(e,i.id)?this.isUpgradeRevealed(e,i.id)?2:1:0).join("")].join("|")}updateNextClient(e){const t=ne.find(s=>!e.clientsUnlocked[s.id]&&this.engine.isClientAvailable(e,s.id));if(!t){this.elNextLabel.textContent=p("header.allClients"),this.elNextFill.style.width="100%",this.elNextPct.textContent="",this.elNextClient.setAttribute("aria-valuenow","100");return}const i=Math.min(99,Math.floor(this.engine.getAgentRate(e)/t.unlockRateRequired*100));this.elNextLabel.textContent=p("header.nextClient"),this.elNextFill.style.width=`${i}%`,this.elNextPct.textContent=p("header.pct",{n:i}),this.elNextClient.setAttribute("aria-valuenow",String(i))}buyButton(e,t){const i=this.getBuyQuantity(e,t),s=this.engine.getAgentBulkCost(e,t,i),r=e.currency>=s,o=i>1?`×${i} · ${B(s)}`:B(s);return{qty:i,cost:s,canBuy:r,label:o}}tierLine(e){const t=ln(e),i=ku(e),s=t>0?Fi[t-1]:0,r=i===null?100:Math.floor((e-s)/(i-s)*100),o=[];return t>0&&o.push(`<span class="agent-tier-bonus">${p("agent.tierBonus",{mult:rt(un(e))})}</span>`),o.push(i===null?`<span>${p("agent.tierMax")}</span>`:`<span>${p("agent.tierNext",{n:e,target:i,mult:rt(Ha)})}</span>`),`
      <div class="agent-tier${t>0?" reached":""}">
        <span class="agent-tier-bar" aria-hidden="true"><span style="width:${r}%"></span></span>
        ${o.join("")}
      </div>`}renderAgents(e){const t=rd.map(s=>`
      <button type="button" class="buy-mode-btn${s===this.buyMode?" active":""}" data-buy-mode="${s}" aria-pressed="${s===this.buyMode}">
        ${s==="max"?p("buy.max"):`×${s}`}
      </button>`).join(""),i=G.map(s=>{const r=e.agents[s.id]?.count??0,o=this.engine.getAgentProduction(e,s),a=this.buyButton(e,s.id);if(!this.isAgentRevealed(e,s.id))return`
          <div class="agent-card silhouette" data-agent="${s.id}">
            <div class="agent-icon" aria-hidden="true">?</div>
            <div class="agent-info">
              <div class="agent-name">???</div>
              <div class="agent-desc agent-lock">${this.engine.isAgentAvailable(e,s.id)?p("reveal.hint"):this.prestigeLockText(s.minPrestige)}</div>
            </div>
            <div class="agent-right">
              <div class="agent-count">${r}</div>
              <button class="btn-buy" type="button" data-buy-agent="${s.id}" data-buy-qty="${a.qty}" disabled>${a.label}</button>
            </div>
          </div>
        `;const c=r>0?o/r:s.baseProduction*this.engine.getPrestigeMultiplier(e);return`
        <div class="agent-card ${a.canBuy?"affordable":""}" data-agent="${s.id}">
          <div class="agent-icon">${R(sr[s.id]??"agents")}</div>
          <div class="agent-info">
            <div class="agent-name">${s.name}</div>
            <div class="agent-desc">${s.description}</div>
            <div class="agent-prod-detail">
              <span class="agent-prod-unit">${p("agent.perUnit",{rate:Ne(c)})}</span>
              ${r>0?`<span class="agent-prod-total">${p("agent.total",{rate:Ne(o)})}</span>`:""}
            </div>
            ${r>0?this.tierLine(r):""}
          </div>
          <div class="agent-right">
            <div class="agent-count">${r}</div>
            <button class="btn-buy" type="button" data-buy-agent="${s.id}" data-buy-qty="${a.qty}" ${a.canBuy?"":"disabled"}>
              ${a.label}
            </button>
          </div>
        </div>
      `}).join("");this.elTabAgents.innerHTML=`
      <div class="buy-mode" role="group" aria-label="${p("buy.label")}">
        <span class="buy-mode-label">${p("buy.label")}</span>${t}
      </div>
      ${i}
    `}updateAgentButtons(e){G.forEach(t=>{const i=this.elTabAgents.querySelector(`[data-agent="${t.id}"]`);if(!i)return;const s=!i.classList.contains("silhouette"),r=this.buyButton(e,t.id),o=e.agents[t.id]?.count??0,a=i.querySelector("[data-buy-agent]");a&&(a.disabled=!s||!r.canBuy,a.textContent!==r.label&&(a.textContent=r.label),a.dataset.buyQty=String(r.qty));const c=i.querySelector(".agent-count");c&&(c.textContent=String(o)),i.classList.toggle("affordable",s&&r.canBuy)})}renderClients(e){const t=this.engine.getAgentRate(e);this.elTabClients.innerHTML=ne.map(i=>{const s=e.clientsUnlocked[i.id],r=i.unlockRateRequired-t;return this.isClientRevealed(e,i.id,t)?`
        <div class="client-card ${s?"active-contract":"locked"}">
          <div class="client-icon">${R(Zu[i.id]??"handshake")}</div>
          <div class="client-info">
            <div class="client-name">${i.name}</div>
            <div class="client-sector">${i.sector}</div>
            <div class="client-revenue">${p("client.bonus",{rate:Ne(i.bonusPerSecond)})}</div>
            ${s?"":`<div class="client-unlock">${p("client.unlockAt",{rate:Ne(i.unlockRateRequired)})}${r>0?p("client.missing",{rate:Ne(r)}):""}</div>`}
          </div>
          <span class="client-badge ${s?"active":"locked"}">
            ${s?`${R("check")}${p("client.active")}`:`${R("lock")}${p("client.locked")}`}
          </span>
        </div>
      `:`
          <div class="client-card locked silhouette">
            <div class="client-icon" aria-hidden="true">?</div>
            <div class="client-info">
              <div class="client-name">???</div>
              <div class="client-unlock">${this.engine.isClientAvailable(e,i.id)?p("client.unlockAt",{rate:Ne(i.unlockRateRequired)}):this.prestigeLockText(i.minPrestige)}</div>
            </div>
            <span class="client-badge locked">${R("lock")}${p("client.locked")}</span>
          </div>
        `}).join("")}renderUpgrades(e){const t=z.filter(i=>this.engine.isUpgradeVisible(e,i.id));if(t.length===0){this.elTabUpgrades.innerHTML=`<p class="tab-empty">${p("upgrade.empty")}</p>`;return}this.elTabUpgrades.innerHTML=t.map(i=>{const s=e.upgradesPurchased[i.id],r=this.engine.canBuyUpgrade(e,i.id);return this.isUpgradeRevealed(e,i.id)?`
        <div class="upgrade-card ${s?"purchased":r?"affordable":""}">
          <div class="upgrade-icon">${R(td(i.effect.type,i.effect.type==="agent_multiplier"?i.effect.agentId:void 0))}</div>
          <div class="upgrade-info">
            <div class="upgrade-name">${i.name}</div>
            <div class="upgrade-desc">${i.description}</div>
            <div class="upgrade-effect">${i.effectLabel}</div>
          </div>
          ${s?`<button class="btn-upgrade purchased-btn" type="button" disabled>${p("upgrade.bought")}</button>`:`<button class="btn-upgrade" type="button" data-buy-upgrade="${i.id}" ${r?"":"disabled"}>
                ${B(i.cost)}
              </button>`}
        </div>
      `:`
          <div class="upgrade-card silhouette">
            <div class="upgrade-icon" aria-hidden="true">?</div>
            <div class="upgrade-info">
              <div class="upgrade-name">???</div>
              <div class="upgrade-desc">${p("reveal.hint")}</div>
            </div>
            <button class="btn-upgrade" type="button" disabled>${B(i.cost)}</button>
          </div>
        `}).join("")}updateUpgradeButtons(e){z.forEach(t=>{const i=this.elTabUpgrades.querySelector(`[data-buy-upgrade="${t.id}"]`);if(!i)return;const s=this.engine.canBuyUpgrade(e,t.id);i.disabled=!s,i.closest(".upgrade-card")?.classList.toggle("affordable",s)})}}const Ka="(max-width: 899px) and (orientation: portrait), (max-width: 639px)",cd=8,ld=8,ud=6;class dd{panel=document.getElementById("panel");handle=document.getElementById("drawer-handle");stage=document.getElementById("stage");header=document.getElementById("header");phone=window.matchMedia(Ka);expanded=!1;dragStartY=0;dragStartTop=0;dragMoved=!1;dragging=!1;constructor(){this.handle.addEventListener("pointerdown",i=>this.onDown(i)),this.handle.addEventListener("pointermove",i=>this.onMove(i)),this.handle.addEventListener("pointerup",i=>this.onUp(i)),this.handle.addEventListener("pointercancel",()=>this.onCancel()),this.handle.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),this.setExpanded(!this.expanded))}),this.phone.addEventListener("change",()=>this.layout());const e=new ResizeObserver(()=>this.layout());e.observe(this.stage),e.observe(this.header);const t=document.getElementById("market-banner");t&&e.observe(t),window.addEventListener("resize",()=>this.layout()),this.layout()}collapse(){this.setExpanded(!1)}setExpanded(e){this.expanded=e,this.layout()}fullTop(){return this.header.getBoundingClientRect().bottom+cd}halfTop(){return this.stage.getBoundingClientRect().bottom+ld}layout(){const e=this.stage.getBoundingClientRect().top;if(document.documentElement.style.setProperty("--chrome-bottom",`${Math.round(e)}px`),!this.phone.matches){this.panel.style.top="",this.handle.setAttribute("aria-expanded","true");return}this.dragging||(this.panel.style.top=`${Math.round(this.expanded?this.fullTop():this.halfTop())}px`,this.handle.setAttribute("aria-expanded",String(this.expanded)),this.handle.setAttribute("aria-label",p(this.expanded?"panel.collapse":"panel.expand")))}onDown(e){this.phone.matches&&(this.dragging=!0,this.dragMoved=!1,this.dragStartY=e.clientY,this.dragStartTop=this.panel.getBoundingClientRect().top,this.handle.setPointerCapture(e.pointerId),this.panel.classList.add("dragging"))}onMove(e){if(!this.dragging)return;const t=e.clientY-this.dragStartY;Math.abs(t)>ud&&(this.dragMoved=!0);const i=Math.min(this.halfTop(),Math.max(this.fullTop(),this.dragStartTop+t));this.panel.style.top=`${Math.round(i)}px`}onUp(e){if(!this.dragging)return;if(this.dragging=!1,this.panel.classList.remove("dragging"),this.handle.hasPointerCapture(e.pointerId)&&this.handle.releasePointerCapture(e.pointerId),!this.dragMoved){this.setExpanded(!this.expanded);return}const t=this.panel.getBoundingClientRect().top;this.setExpanded(t<(this.fullTop()+this.halfTop())/2)}onCancel(){this.dragging=!1,this.panel.classList.remove("dragging"),this.layout()}}const ai=[{id:"chambre",minAgents:0,minPrestige:0,icon:"sofa",label:"Chambre d'ado",sublabel:"Le voyage commence ici"},{id:"home-office",minAgents:1,minPrestige:0,icon:"monitor",label:"Home Office",sublabel:"Les premiers projets arrivent"},{id:"coworking",minAgents:10,minPrestige:0,icon:"cup",label:"Espace Coworking",sublabel:"L'équipe prend forme"},{id:"startup",minAgents:25,minPrestige:0,icon:"rocket",label:"Locaux Startup",sublabel:"On scale !"},{id:"scale-up",minAgents:60,minPrestige:0,icon:"building",label:"Scale-up",sublabel:"L'empire se construit"},{id:"unicorn",minAgents:120,minPrestige:0,icon:"crown",label:"Siège Social",sublabel:"Niveau licorne !"}];function hd(n,e){const t=Math.pow(.8,e);let i=0;return ai.forEach((s,r)=>{n>=Math.floor(s.minAgents*t)&&(i=r)}),i}const Ya={"bot-workflows":["workflow n8n relancé","webhook reçu","HTTP 200 OK","retry n°3 réussi","42 tâches/min","cron de 6 h lancé"],"agent-copy":["brouillon v2 prêt","titre H1 réécrit","newsletter envoyée","post LinkedIn calé","fiche produit livrée","accroche testée"],"agent-analytics":["tableau de bord à jour","anomalie détectée","test A/B lancé","rapport hebdo prêt","cohorte analysée","KPI en hausse"],"agent-audit":["audit RGPD terminé","faille corrigée","score : 94/100","dette tech : 4 j","tests au vert","journaux vérifiés"],"agent-legal":["CGV mises à jour","clause validée","DPA rédigé","devis envoyé","contrat relu","registre RGPD tenu"],"agent-growth":["+500 prospects","relance n°2 partie","partenaire signé","pipeline plein","démo réservée","campagne lancée"],"agent-supervisor":["priorités du jour","revue d'équipe","livraison validée","charge rééquilibrée","objectif atteint","agents synchronisés"],"agent-rag":["index vectoriel à jour","1 200 docs ingérés","source citée","passage n°48 trouvé","base de savoir enrichie","réponse sourcée"],"agent-voice":["appel décroché","rendez-vous pris","transcription prête","standard ouvert 24 h/24","rappel programmé","appel résumé"]},Qa={"bot-workflows":{shape:"octagon",height:16,swarm:"ring",chars:"{}[]<>/01",short:"post.workflows",spin:2.4,rise:0},"agent-copy":{shape:"inkwell",height:22,swarm:"ribbon",chars:"aerstn",short:"post.copy",spin:0,rise:1.3},"agent-analytics":{shape:"stairs",height:34,swarm:"columns",chars:"0123456789%",short:"post.analytics",spin:0,rise:.8},"agent-audit":{shape:"lens",height:24,swarm:"sweep",chars:"vx#?",short:"post.audit",spin:0,rise:0},"agent-legal":{shape:"pillars",height:30,swarm:"balance",chars:"§¶©«»",short:"post.legal",spin:1.1,rise:0},"agent-growth":{shape:"obelisk",height:44,swarm:"spiral",chars:"+↑@>",short:"post.growth",spin:.4,rise:.9},"agent-supervisor":{shape:"tiered",height:50,swarm:"halo",chars:"·o*",short:"post.supervisor",spin:.35,rise:0},"agent-rag":{shape:"disks",height:31,swarm:"inflow",chars:"#:=~^",short:"post.rag",spin:.5,rise:.7},"agent-voice":{shape:"mic",height:40,swarm:"waves",chars:"~()-.",short:"post.voice",spin:0,rise:.55}},pd=Qa["bot-workflows"],Zt=[.5,.58,.66,.74,.8],fd=[1,1.15,1.3,1.45,1.6],ro=[1,1,1.2,1.2,1.2],oo=6,md=.04,gd=3,_d=.35,Un=30,yd=1.45,vd=2,bd=1.6,wd=300,Id=.35,Cd=2,Bn=[1.7,2.6,3.2,3.6,4.1,4.6],ao=2.2,co=[[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1],[2,0]],lo=Zt[0],Ed=.5,Td=.66,Fn=3,Sd=.85,uo=.78,$n=30,Ad=12,kd=15,Rd=80,ho=92,Pd=1.6,Md=16,xd=2.4,po=.6,fo=2.2,Nd=4.8,Ld=2600,Od=.05,mo=9,go=.45,qn=.22,_o=1.3,yo=.8,Dd=2800,tt=1.3,vo=1.7,Ud=.6;function Bd(n){const e=n.replace("#","").trim(),t=parseInt(e.length===3?e.split("").map(i=>i+i).join(""):e,16);return[t>>16,t>>8&255,t&255]}function w(n,e){return`rgba(${n[0]},${n[1]},${n[2]},${Math.max(0,Math.min(1,e))})`}function te(n,e,t){return[Math.round(n[0]+(e[0]-n[0])*t),Math.round(n[1]+(e[1]-n[1])*t),Math.round(n[2]+(e[2]-n[2])*t)]}function Fd(){const n=getComputedStyle(document.documentElement),e=t=>n.getPropertyValue(t).trim();return{encre:e("--encre"),pale:e("--encre-pale"),outremer:e("--outremer"),ambre:e("--ambre"),brume:e("--brume"),socle:e("--socle"),fond:e("--porcelaine"),fond2:e("--porcelaine-2")}}const zt=n=>1-Math.pow(1-n,3);function ae(n,e,t=0){return Array.from({length:n},(i,s)=>{const r=t+s/n*Math.PI*2;return[Math.cos(r)*e,Math.sin(r)*e]})}function Ja(n,e){return[[-n,-e],[n,-e],[n,e],[-n,e]]}const nt=n=>Ja(n,n);class $d{bureauEl=document.getElementById("bureau");emptyEl=document.getElementById("bureau-empty");countEl=document.getElementById("bureau-count");stageBadge=document.getElementById("bureau-stage-badge");canvas=document.createElement("canvas");ctx=this.canvas.getContext("2d");tooltip=document.createElement("div");reduced=window.matchMedia("(prefers-reduced-motion: reduce)");phone=window.matchMedia(Ka);W=0;H=0;S=40;CX=0;CY=0;ext=Bn[0];extTarget=Bn[0];time=0;sheetTimer=1.5;posts;founderMult=1;prestigeCount=0;totalAgents=0;hovered=null;touchTimer=null;dpr=1;clients=[];freshClient="";freshTimer=0;stampState=null;ink=-1;banner=document.createElement("div");bannerTimer=null;C;faceL;faceR;slabTop;slabL;slabR;goldTop;goldL;goldR;mono;display;currentStageId="";synced=!1;onStageChange;constructor(){const e=Fd();this.C=Object.fromEntries(Object.entries(e).map(([i,s])=>[i,Bd(s)])),this.slabTop=te(this.C.socle,this.C.fond,.35),this.slabL=te(this.C.fond2,this.C.brume,.18),this.slabR=te(this.C.fond2,this.C.brume,.34),this.faceL=te(this.C.fond2,this.C.brume,.22),this.faceR=te(this.C.fond2,this.C.brume,.4),this.goldTop=te(this.C.socle,this.C.ambre,.22),this.goldL=te(this.C.ambre,this.C.socle,.45),this.goldR=te(this.C.ambre,this.C.encre,.12);const t=getComputedStyle(document.documentElement);this.mono=t.getPropertyValue("--mono").trim()||"monospace",this.display=t.getPropertyValue("--display").trim()||"sans-serif",this.posts=G.map((i,s)=>{const[r,o]=co[s%co.length],a=Qa[i.id]??pd;return{id:i.id,name:i.name,style:a,glyph:sr[i.id]??"agents",short:p(a.short),tier:0,flash:0,gx:r*ao,gy:o*ao,count:0,letters:[],source:a.chars,sheet:null,sx:0,sy:0,top:0,bursts:[],bounce:0}}),this.canvas.className="bureau-canvas",this.canvas.setAttribute("role","img"),this.tooltip.className="bureau-tooltip hidden",this.tooltip.setAttribute("aria-hidden","true"),this.bureauEl.prepend(this.canvas),this.bureauEl.appendChild(this.tooltip),this.banner.className="bureau-banner hidden",this.banner.setAttribute("role","status"),this.bureauEl.appendChild(this.banner),new ResizeObserver(()=>this.resize()).observe(this.bureauEl),this.resize(),this.canvas.addEventListener("pointermove",i=>{i.pointerType==="mouse"&&this.pick(i,!1)}),this.canvas.addEventListener("pointerleave",i=>{i.pointerType==="mouse"&&this.setHover(null)}),this.canvas.addEventListener("pointerdown",i=>{i.pointerType!=="mouse"&&this.pick(i,!0)})}update(e,t){if(this.sync(t),document.hidden||this.W===0)return;const i=Math.min(e,Od);this.time+=i,this.animate(i),this.draw()}celebratePurchase(e){const t=this.posts.find(i=>i.id===e);if(!(!t||this.reduced.matches)){t.bounce=go;for(let i=0;i<mo;i++){const s=i/mo*Math.PI*2+Math.random()*.5;t.bursts.push({ch:t.source[Math.floor(Math.random()*t.source.length)]??"·",t:-Math.random()*.25,dx:Math.cos(s)*(1.4+Math.random()*.8),dy:Math.sin(s)*(.9+Math.random()*.6)-.6})}}}stamp(e){this.freshClient=e,this.freshTimer=6,this.stampState={label:p("bureau.signed"),t:this.reduced.matches?qn:0}}playPrestige(){this.reduced.matches||(this.ink=0)}showBanner(e){this.announce(p("bureau.newSpace"),e.label,e.sublabel)}announce(e,t,i){this.banner.innerHTML='<span class="bureau-banner-kicker"></span><strong></strong><span class="bureau-banner-sub"></span>',this.banner.querySelector(".bureau-banner-kicker").textContent=e,this.banner.querySelector("strong").textContent=t,this.banner.querySelector(".bureau-banner-sub").textContent=i,this.banner.classList.remove("hidden","leaving"),this.bannerTimer&&clearTimeout(this.bannerTimer),this.bannerTimer=setTimeout(()=>{this.banner.classList.add("leaving"),this.bannerTimer=setTimeout(()=>this.banner.classList.add("hidden"),400)},Dd)}sync(e){if(this.ink>=0&&this.ink<tt)return;const t=ne.filter(s=>e.clientsUnlocked[s.id]).map(s=>s.name);t.length!==this.clients.length&&(this.clients=t);let i=0;for(const s of this.posts){const r=e.agents[s.id]?.count??0;if(i+=r,r!==s.count){s.count=r;const o=ln(r);o>s.tier&&this.synced&&!this.reduced.matches&&(s.flash=gd),s.tier=o,this.resizeCloud(s)}}this.synced=!0,this.prestigeCount=e.prestigeCount,this.founderMult=1+e.prestigeCount*.15,(i!==this.totalAgents||!this.currentStageId)&&(this.totalAgents=i,this.countEl.textContent=p(i>1?"bureau.agentsPl":"bureau.agents",{n:i}),this.emptyEl.style.display=i===0?"":"none",this.canvas.setAttribute("aria-label",this.describe())),this.syncStage(i,e.prestigeCount)}syncStage(e,t){const i=hd(e,t),s=ai[i],r=this.posts.reduce((a,c)=>c.count>0?Math.max(a,Math.max(Math.abs(c.gx),Math.abs(c.gy))+Zt[c.tier]+Ed):a,0);if(this.extTarget=Math.max(Bn[i]??Bn[0],r),s.id===this.currentStageId)return;const o=this.currentStageId;if(o&&this.bureauEl.classList.remove(`stage-${o}`),this.bureauEl.classList.add(`stage-${s.id}`),this.currentStageId=s.id,this.stageBadge.innerHTML=`<span class="stage-icon">${R(s.icon)}</span><span class="stage-label"></span><span class="stage-sublabel"></span>`,this.stageBadge.querySelector(".stage-label").textContent=s.label,this.stageBadge.querySelector(".stage-sublabel").textContent=s.sublabel,!o){this.ext=this.extTarget;return}i>ai.findIndex(a=>a.id===o)&&this.showBanner(s),this.onStageChange&&this.onStageChange(s)}describe(){const e=this.posts.filter(t=>t.count>0).map(t=>t.tier>0?`${t.name} ×${t.count} (${p("agent.tierBonus",{mult:rt(un(t.count))})})`:`${t.name} ×${t.count}`);return e.length?`${p("bureau.title")} — ${e.join(", ")}`:p("bureau.empty")}cloudSize(e){return e<=0?0:Math.min(Rd,Math.round(Ad+kd*Math.log2(1+e)))}resizeCloud(e){const t=this.cloudSize(e.count);for(;e.letters.length>t;)e.letters.pop();let i=e.letters.length;for(;e.letters.length<t;)e.letters.push({ch:e.source[i*7%e.source.length]??"·",a:Math.random()*Math.PI*2,r:.25+Math.random()*.75,h:Math.random(),v:.5+Math.random()*.9,ph:Math.random()*Math.PI*2}),i++;e.count===0&&(e.sheet=null)}animate(e){const t=this.reduced.matches;if(this.ext=t?this.extTarget:this.ext+(this.extTarget-this.ext)*(1-Math.exp(-e*Pd)),!t)for(const r of this.posts){const o=ro[r.tier],{spin:a,rise:c}=r.style;for(const l of r.letters)l.a+=l.v*e*.6*a*o,l.h+=l.v*e*.2*c*o,l.h>1&&(l.h-=1)}for(const r of this.posts)if(r.flash>0&&(r.flash=Math.max(0,r.flash-e)),r.bounce>0&&(r.bounce=Math.max(0,r.bounce-e)),r.bursts.length){for(const o of r.bursts)o.t+=e*1.6;r.bursts=r.bursts.filter(o=>o.t<1)}if(this.stampState&&(this.stampState.t+=e,this.stampState.t>qn+_o+yo&&(this.stampState=null)),this.freshTimer>0&&(this.freshTimer-=e),this.ink>=0){const r=this.ink;this.ink+=e,r<tt&&this.ink>=tt&&(this.ext=Ud),this.ink>tt+vo&&(this.ink=-1)}this.sheetTimer-=e;const i=this.posts.filter(r=>r.sheet).length,s=this.phone.matches?1:2;if(this.sheetTimer<=0){this.sheetTimer=fo+Math.random()*(Nd-fo);const r=this.posts.filter(o=>o.count>0&&!o.sheet);if(i<s&&r.length){const o=r[Math.floor(Math.random()*r.length)],a=Ya[o.id]??[o.name],c=a[Math.floor(Math.random()*a.length)];o.sheet={text:c,typed:t?c.length:0,acc:0,hold:xd+(t?1.5:0),flights:[]}}}for(const r of this.posts){const o=r.sheet;if(o){if(o.typed<o.text.length)for(o.acc+=e*Md;o.acc>=1&&o.typed<o.text.length;){o.acc-=1;const a=o.text[o.typed];a.trim()&&o.flights.push({ch:a,t:0,x0:r.sx,y0:r.top-this.S*.6,idx:o.typed}),o.typed++}else o.hold-=e,o.hold<=-po&&(r.sheet=null);for(const a of o.flights)a.t+=e*2.4;o.flights=o.flights.filter(a=>a.t<1)}}}resize(){const e=this.bureauEl.getBoundingClientRect(),t=Math.min(window.devicePixelRatio||1,2);this.dpr=t,this.W=Math.round(e.width),this.H=Math.round(e.height),this.canvas.width=Math.max(1,Math.round(this.W*t)),this.canvas.height=Math.max(1,Math.round(this.H*t)),this.canvas.style.width=`${this.W}px`,this.canvas.style.height=`${this.H}px`,this.ctx.setTransform(t,0,0,t,0,0),(this.reduced.matches||document.hidden)&&this.draw()}frame(){const i=this.phone.matches?78:46,s=2.6,r=.5,o=this.ext,a=(this.W-36)/(3.464*o),c=(this.H-34-i)/(2*o+s+r);this.S=Math.max(8,Math.min(ho,a,c)),this.CX=this.W/2;const l=(2*o+s+r)*this.S,u=34+Math.max(0,(this.H-34-i-l)/2);if(this.CY=u+(s+o)*this.S,this.S<Un){const d=this.H<wd;this.frameContent(18,d?24:34,d?34:i,r,d?bd:vd)}}frameContent(e,t,i,s,r){const o=this.posts.filter(g=>g.count>0);if(!o.length)return;let a=1/0,c=-1/0,l=1/0,u=-1/0;const d=(g,m,I)=>{for(const[k,x]of[[g-I,m-I],[g+I,m-I],[g+I,m+I],[g-I,m+I]]){const D=(k-x)*.866,F=(k+x)*.5;a=Math.min(a,D),c=Math.max(c,D),l=Math.min(l,F),u=Math.max(u,F)}};d(0,0,uo);for(const g of o)d(g.gx,g.gy,Zt[g.tier]+Id);const h=Math.min(ho,this.S*Cd,(this.W-e*2)/(c-a),(this.H-t-i)/(u-l+r+s));if(h<=this.S)return;this.S=h,this.CX=this.W/2-(a+c)/2*h;const f=(u-l+r+s)*h,_=t+Math.max(0,(this.H-t-i-f)/2);this.CY=_+(r-l)*h}iso(e,t,i=0){return[this.CX+(e-t)*this.S*.866,this.CY+(e+t)*this.S*.5-i*this.S/60]}draw(){if(this.ctx.clearRect(0,0,this.W,this.H),this.W===0)return;this.frame(),this.drawSlab(),this.drawClientLabels();const t=[...this.posts].sort((r,o)=>r.gx+r.gy-(o.gx+o.gy)),i=0;let s=!1;for(const r of t)!s&&r.gx+r.gy>i&&(this.drawFounder(),s=!0),this.drawPost(r);s||this.drawFounder(),this.drawThreads();for(const r of t)this.drawCloud(r);for(const r of t)this.drawPlaque(r);for(const r of t)this.drawBursts(r);for(const r of t)this.drawSheet(r);this.drawInk(),this.drawStamp()}drawClientLabels(){if(!this.clients.length)return;const e=this.ctx,t=this.ext,i=Math.max(8,Math.min(13,this.S*.19)),s=this.S;let r=-t+.35,o=t-.3;e.save(),e.font=`500 ${i}px ${this.mono}`;for(const a of this.clients){const c=a.toUpperCase(),l=(e.measureText(c).width+i*1.6)/s;r+l>t-.2&&(r=-t+.35,o-=.42);const[u,d]=this.iso(r,o);e.setTransform(this.dpr*.866,this.dpr*.5,this.dpr*-.866,this.dpr*.5,u*this.dpr,d*this.dpr);const h=a===this.freshClient&&this.freshTimer>0;e.fillStyle=h?w(this.C.ambre,1):w(this.C.encre,.42),e.fillText(c,0,0),r+=l}e.restore(),e.setTransform(this.dpr,0,0,this.dpr,0,0)}drawBursts(e){if(!e.bursts.length)return;const t=this.ctx,i=this.S;t.textAlign="center",t.font=`500 ${Math.max(8,i*.2)}px ${this.mono}`;for(const s of e.bursts){if(s.t<0)continue;const r=zt(s.t),o=e.sx+s.dx*i*(1-r),a=e.top-i*.1+s.dy*i*(1-r);t.fillStyle=w(this.C.outremer,.35+.65*(1-s.t)),t.fillText(s.ch,o,a)}t.textAlign="left"}drawStamp(){const e=this.stampState;if(!e)return;const t=this.ctx,i=Math.min(1,e.t/qn),s=1+(1-zt(i))*1.4,r=e.t-qn-_o,o=(r>0?1-r/yo:1)*Math.min(1,i*1.5),a=Math.max(24,Math.min(64,this.W*.07));t.save(),t.translate(this.W/2,this.H*.42),t.rotate(-.14),t.scale(s,s),t.globalAlpha=Math.max(0,o)*.92,t.font=`800 ${a}px ${this.display}`;const c=t.measureText(e.label).width+a*.9,l=a*1.35;t.strokeStyle=w(this.C.ambre,1),t.lineWidth=Math.max(3,a*.08),this.round(-c/2,-l/2,c,l,a*.18),t.stroke(),t.lineWidth=Math.max(1,a*.03),this.round(-c/2+a*.12,-l/2+a*.12,c-a*.24,l-a*.24,a*.12),t.stroke(),t.fillStyle=w(this.C.ambre,1),t.textAlign="center",t.textBaseline="middle",t.fillText(e.label,0,a*.04),t.restore()}drawInk(){if(this.ink<0)return;const e=this.ctx,[t,i]=this.iso(0,0),s=Math.hypot(this.W,this.H);let r,o;if(this.ink<tt){const c=zt(this.ink/tt);r=s*c,o=.88*c}else{const c=(this.ink-tt)/vo;r=s,o=.88*(1-zt(c))}const a=e.createRadialGradient(t,i,0,t,i,Math.max(1,r));a.addColorStop(0,w(this.C.encre,o)),a.addColorStop(.75,w(this.C.encre,o*.85)),a.addColorStop(1,w(this.C.encre,0)),e.fillStyle=a,e.fillRect(0,0,this.W,this.H)}poly(e){const t=this.ctx;t.beginPath(),e.forEach(([i,s],r)=>r?t.lineTo(i,s):t.moveTo(i,s)),t.closePath()}drawSlab(){const e=this.ctx,t=this.ext,i=[this.iso(-t,-t),this.iso(t,-t),this.iso(t,t),this.iso(-t,t)];e.save(),e.shadowColor=w(this.C.encre,.16),e.shadowBlur=50,e.shadowOffsetY=22,e.fillStyle=w(this.slabTop,1),this.poly(i),e.fill(),e.restore();const s=this.S*.18,[r,o,a,c]=i;e.fillStyle=w(this.slabL,1),this.poly([c,a,[a[0],a[1]+s],[c[0],c[1]+s]]),e.fill(),e.fillStyle=w(this.slabR,1),this.poly([a,o,[o[0],o[1]+s],[a[0],a[1]+s]]),e.fill(),e.strokeStyle=w(this.C.encre,.05),e.lineWidth=1,e.beginPath();for(let l=-Math.floor(t*2)/2;l<=t;l+=.5)e.moveTo(...this.iso(l,-t)),e.lineTo(...this.iso(l,t));for(let l=-Math.floor(t*2)/2;l<=t;l+=.5)e.moveTo(...this.iso(-t,l)),e.lineTo(...this.iso(t,l));e.stroke(),e.strokeStyle=w(this.C.brume,.35),e.setLineDash([3,4]);for(const l of this.posts){if(l.count>0||Math.max(Math.abs(l.gx),Math.abs(l.gy))+lo>t)continue;const u=lo;this.poly([this.iso(l.gx-u,l.gy-u),this.iso(l.gx+u,l.gy-u),this.iso(l.gx+u,l.gy+u),this.iso(l.gx-u,l.gy+u)]),e.stroke()}e.setLineDash([])}block(e,t,i,s,r,o,a,c){const l=this.ctx,u=(x,D,F)=>this.iso(e+x,t+D,F),d=u(-i,i,0),h=u(i,i,0),f=u(i,-i,0),_=u(-i,i,s),g=u(i,i,s),m=u(i,-i,s),I=u(-i,-i,s);l.fillStyle=w(o,1),this.poly([d,h,g,_]),l.fill(),l.fillStyle=w(a,1),this.poly([h,f,m,g]),l.fill();const k=l.createLinearGradient(I[0],I[1],g[0],g[1]);return k.addColorStop(0,w(te(r,this.C.socle,.6),1)),k.addColorStop(1,w(r,1)),l.fillStyle=k,this.poly([I,m,g,_]),l.fill(),c&&(l.strokeStyle=c,l.lineWidth=1.4,this.poly([I,m,g,_]),l.stroke()),u(0,0,s)}prism(e,t,i,s,r,o,a){const c=this.ctx,l=(g,m,I)=>this.iso(e+g,t+m,I),u=i.length;for(let g=0;g<u;g++){const[m,I]=i[g],[k,x]=i[(g+1)%u];let D=x-I,F=m-k;D*(m+k)+F*(I+x)<0&&(D=-D,F=-F);const M=Math.hypot(D,F)||1;D/=M,F/=M,!(D+F<=.001)&&(c.fillStyle=w(te(this.faceL,this.faceR,(D-F+1)/2),1),this.poly([l(m,I,s),l(k,x,s),l(k,x,s+r),l(m,I,s+r)]),c.fill())}const d=i.map(([g,m])=>l(g,m,s+r)),h=l(-.7,-.7,s+r),f=l(.7,.7,s+r),_=c.createLinearGradient(h[0],h[1],f[0],f[1]);return _.addColorStop(0,w(te(o,this.C.socle,.6),1)),_.addColorStop(1,w(o,1)),c.fillStyle=_,this.poly(d),c.fill(),a&&(c.strokeStyle=a,c.lineWidth=1.4,this.poly(d),c.stroke()),l(0,0,s+r)}pyramid(e,t,i,s,r){const o=this.ctx,a=(u,d,h)=>this.iso(e+u,t+d,h),c=a(0,0,s+r),l=i.length;for(let u=0;u<l;u++){const[d,h]=i[u],[f,_]=i[(u+1)%l];let g=_-h,m=d-f;g*(d+f)+m*(h+_)<0&&(g=-g,m=-m);const I=Math.hypot(g,m)||1;g/=I,m/=I,!(g+m<=.001)&&(o.fillStyle=w(te(this.faceL,this.faceR,(g-m+1)/2),1),this.poly([a(d,h,s),a(f,_,s),c]),o.fill())}}drawPost(e){if(e.count<=0)return;const t=this.hovered===e.id,i=e.bounce>0?Math.sin((1-e.bounce/go)*Math.PI)*8:0,s=e.flash>0?w(this.C.ambre,.35+.65*Math.min(1,e.flash/1.2)):t?w(this.C.outremer,.95):e.tier>0?w(this.C.ambre,_d):w(this.C.outremer,.5);let r=Zt[e.tier],o=0;for(let c=0;c<e.tier;c++)this.prism(e.gx,e.gy,nt(r),o,oo,this.C.socle,w(this.C.encre,.14)),o+=oo,r-=md;const a=this.drawShape(e,r,o+i,s);e.sx=a[0],e.sy=a[1],e.top=a[1]}drawShape(e,t,i,s){const{gx:r,gy:o}=e,a=e.style.height,c=this.C.socle,l=te(this.faceR,this.C.encre,.08);switch(e.style.shape){case"octagon":return this.prism(r,o,ae(8,t*1.05,Math.PI/8),i,a,c,s);case"inkwell":return this.prism(r,o,ae(12,t*.95),i,a-6,c,s),this.prism(r,o,ae(12,t*.38),i+a-6,6,c,s);case"stairs":{const u=2*t/3,d=[a,a*.76,a*.53];let h=this.iso(r,o,i+a);return d.forEach((f,_)=>{const g=-t+u*(_+.5),m=this.prism(r+g,o,Ja(u/2,t),i,f,c,s);_===0&&(h=m)}),[this.iso(r,o,i+a)[0],h[1]]}case"lens":{const u=this.prism(r,o,ae(8,t*1.05,Math.PI/8),i,a,c,s);return this.ctx.fillStyle=w(l,1),this.poly(ae(8,t*.62,Math.PI/8).map(([d,h])=>this.iso(r+d,o+h,i+a))),this.ctx.fill(),u}case"pillars":{const u=a-8;return this.prism(r-t*.5,o+t*.5,nt(t*.24),i,u,c,null),this.prism(r+t*.5,o-t*.5,nt(t*.24),i,u,c,null),this.prism(r,o,nt(t*.95),i+u,8,c,s)}case"obelisk":{const u=nt(t*.36);return this.prism(r,o,u,i,a-12,c,s),this.pyramid(r,o,u,i+a-12,12),this.iso(r,o,i+a)}case"tiered":return this.prism(r,o,nt(t),i,a*.56,c,s),this.prism(r,o,nt(t*.6),i+a*.56,a*.44,c,s);case"disks":{const u=ae(12,t*.95),d=ae(12,t*.55),h=7,f=(a-3*h)/2;let _=i,g=this.iso(r,o,i);for(let m=0;m<3;m++)g=this.prism(r,o,u,_,h,c,s),_+=h,m<2&&(this.prism(r,o,d,_,f,c,null),_+=f);return g}case"mic":{this.prism(r,o,ae(12,t*.8),i,5,c,s),this.prism(r,o,ae(8,t*.14),i+5,a*.38,c,null);const u=i+5+a*.38;return this.prism(r,o,ae(12,t*.42),u,a-5-a*.38-4,c,s),this.prism(r,o,ae(12,t*.28),i+a-4,4,c,s)}}}drawPlaque(e){if(e.count<=0)return;const t=this.ctx,i=this.S,s=Zt[e.tier],r=nd(e.glyph),o=w(this.C.encre,.7),a=w(this.slabTop,Sd);if(i<Un){const m=Math.max(12,i*.5),[I,k]=this.iso(e.gx+s*.15,e.gy+s+.15),x=m/24;t.save(),t.setTransform(this.dpr*x,0,0,this.dpr*x,(I-m*.9)*this.dpr,(k-m*.25)*this.dpr),t.lineCap="round",t.lineJoin="round",t.strokeStyle=a,t.lineWidth=(1.6+Fn)/x,t.stroke(r),t.strokeStyle=o,t.lineWidth=1.6/x,t.stroke(r),t.restore(),t.setTransform(this.dpr,0,0,this.dpr,0,0),t.font=`500 10px ${this.mono}`,t.textBaseline="middle",t.lineJoin="round",t.strokeStyle=a,t.lineWidth=Fn,t.strokeText(`×${e.count}`,I+m*.2,k+m*.25),t.fillStyle=w(this.C.encre,.8),t.fillText(`×${e.count}`,I+m*.2,k+m*.25),t.textBaseline="alphabetic";return}const c=Math.max(9,Math.min(13,i*.21)),l=c*1.5,[u,d]=this.iso(e.gx-s,e.gy+s+.2);t.save(),t.setTransform(this.dpr*.866,this.dpr*.5,this.dpr*-.866,this.dpr*.5,u*this.dpr,d*this.dpr),t.save();const h=l/24;t.translate(0,-l*.78),t.scale(h,h),t.lineCap="round",t.lineJoin="round",t.strokeStyle=a,t.lineWidth=(1.5+Fn)/h,t.stroke(r),t.strokeStyle=o,t.lineWidth=1.5/h,t.stroke(r),t.restore(),t.font=`500 ${c}px ${this.mono}`;const f=l*1.15,_=`×${e.count}`,g=f+t.measureText(e.short).width+c*.6;t.lineJoin="round",t.strokeStyle=a,t.lineWidth=Fn,t.strokeText(e.short,f,0),t.strokeText(_,g,0),t.fillStyle=w(this.C.encre,Td),t.fillText(e.short,f,0),t.fillStyle=w(e.flash>0?this.C.ambre:this.C.encre,e.flash>0?1:.78),t.fillText(_,g,0),t.restore(),t.setTransform(this.dpr,0,0,this.dpr,0,0)}drawThreads(){if(this.S<Un)return;const e=this.posts.find(s=>s.style.swarm==="halo"&&s.count>0);if(!e)return;const t=this.ctx,i=e.top-this.S*.8;t.save(),t.strokeStyle=w(this.C.outremer,.16),t.lineWidth=1,t.setLineDash([2,6]),t.beginPath();for(const s of this.posts)s===e||s.count<=0||(t.moveTo(e.sx,i),t.lineTo(s.sx,s.top-this.S*.2));t.stroke(),t.restore()}drawFounder(){const e=this.ctx,t=this.hovered==="founder",[i,s]=this.block(0,0,uo,$n,this.goldTop,this.goldL,this.goldR,w(this.C.ambre,t?1:.7)),r=this.S,o=$n,a=(u,d,h)=>this.iso(u,d,o+h),c=w(this.C.encre,.85);e.lineWidth=Math.max(1,r*.03),e.lineJoin="round",e.strokeStyle=c,e.beginPath(),e.moveTo(...a(0,0,2)),e.lineTo(...a(0,0,13)),e.stroke();const l=.38;if(e.fillStyle=w(this.C.socle,1),this.poly([a(-l,-l,13),a(l,-l,13),a(l,l,13),a(-l,l,13)]),e.fill(),e.stroke(),e.fillStyle=w(te(this.C.socle,this.C.ambre,.12),1),this.poly([a(-l,-l,13),a(l,-l,13),a(l,-l,46),a(-l,-l,46)]),e.fill(),e.stroke(),this.prestigeCount>0){const[u,d]=a(0,-l,31);e.save(),e.translate(u,d),e.rotate(-.12),e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.max(10,r*.22)}px ${this.display}`,e.fillStyle=w(this.C.ambre,1),e.fillText(rt(this.founderMult),0,0),e.restore()}}drawCloud(e){if(!e.letters.length)return;const t=this.ctx,i=this.S,s=e.sx,r=e.top,o=fd[e.tier],a=i*1.5,c=this.C.outremer,u=this.reduced.matches?0:this.time,d=i<Un,h=r-a*.5,f=t.createRadialGradient(s,h,0,s,h,i*.95*o);f.addColorStop(0,w(c,.13)),f.addColorStop(1,w(c,0)),t.fillStyle=f,t.fillRect(s-i*o,h-i*o,i*2*o,i*2*o),t.textAlign="center",t.font=`500 ${Math.max(7,i*.17)}px ${this.mono}`;const _=i*.6*o,g=ro[e.tier];e.letters.forEach((m,I)=>{if(d&&I%2)return;const k=e.tier>=3&&I%3===2?yd:1;let x,D,F;switch(e.style.swarm){case"ring":{const M=_*(.85+.25*m.r)*k;x=s+Math.cos(m.a)*M,D=r-a*(I%2?.62:.42)+Math.sin(m.a)*M*.3+Math.sin(u*1.3+m.ph)*1.5,F=.3+.62*(Math.sin(m.a)+1)/2;break}case"ribbon":{const M=(m.r-.62)*i*.32*o*k;x=s+M+Math.sin(u*1.5+m.ph)*i*.03,D=r-i*.15-(1-m.h)*a*1.05,F=.92*Math.sin(Math.PI*m.h);break}case"columns":{const M=I%3,J=a*[.55,.95,.75][M]*(.85+.15*Math.sin(u*1.2+M*1.7));x=s+[-.38,0,.38][M]*i*o*k+(m.r-.6)*i*.07,D=r-i*.1-m.h*J,F=.88*Math.sin(Math.PI*Math.min(1,m.h*1.05+.02));break}case"sweep":{const M=m.ph/(Math.PI*2)*1.7,J=u*1.4*g-M,jt=_*(.25+.85*m.r)*k;x=s+Math.cos(J)*jt,D=r-i*.55+Math.sin(J)*jt*.38,F=.08+.85*(1-M/1.7);break}case"balance":{const M=I%2?1:-1,J=i*.24*(.6+.6*m.r)*o;x=s+M*i*.42*o*k+Math.cos(m.a)*J,D=r-i*.75+Math.sin(u*1.1)*i*.14*M+Math.sin(m.a)*J*.6,F=.3+.62*(Math.sin(m.a)+1)/2;break}case"spiral":{const M=m.a+m.h*9,J=i*(.08+.62*m.h)*o*k;x=s+Math.cos(M)*J,D=r-i*.1-m.h*a*1.1+Math.sin(M)*J*.35,F=Math.sin(Math.PI*m.h)*(.35+.6*(Math.sin(M)+1)/2);break}case"halo":{const M=_*.85*(.9+.2*m.r)*k;x=s+Math.cos(m.a)*M,D=r-a*.55+Math.sin(m.a)*M*.3+Math.sin(u+m.ph)*2,F=.3+.62*(Math.sin(m.a)+1)/2;break}case"inflow":{const M=m.a+m.h*5,J=_*(1.05-m.h)*k;x=s+Math.cos(M)*J,D=r-i*.55+Math.sin(M)*J*.36,F=.9*Math.sin(Math.PI*m.h);break}case"waves":{const M=(m.h+I%3/3)%1,J=m.r*Math.PI*2,jt=i*(.15+.85*M)*o*k;x=s+Math.cos(J)*jt,D=r-i*.4+Math.sin(J)*jt*.7,F=.85*(1-M);break}}F<=.02||(t.fillStyle=w(c,F),t.fillText(m.ch,x,D))}),t.textAlign="left"}drawSheet(e){const t=e.sheet;if(!t)return;const i=this.ctx,s=this.S,r=Math.max(10,Math.min(14,s*.2));i.font=`500 ${r}px ${this.mono}`;const o=i.measureText("M").width,a=o*t.text.length+26,c=r*2.1;let l=e.sx-a/2,u=e.top-s*1.85-c;l=Math.max(8,Math.min(this.W-a-8,l)),u=Math.max(30,u);const d=t.hold<0?Math.max(0,1+t.hold/po):1;i.save(),i.globalAlpha=d,i.shadowColor=w(this.C.encre,.14),i.shadowBlur=18,i.shadowOffsetY=8,i.fillStyle=w(this.C.socle,.97),this.round(l,u,a,c,7),i.fill(),i.restore(),i.save(),i.globalAlpha=d,i.fillStyle=w(this.C.outremer,.9),i.fillRect(l,u+6,2.5,c-12);const h=l+14,f=u+c/2+r*.36,_=new Set(t.flights.map(g=>g.idx));i.fillStyle=w(this.C.encre,1);for(let g=0;g<t.typed;g++)_.has(g)||i.fillText(t.text[g],h+g*o,f);(t.typed<t.text.length||!this.reduced.matches&&Math.sin(this.time*6)>0)&&(i.fillStyle=w(this.C.outremer,1),i.fillRect(h+t.typed*o+1,f-r*.85,2,r));for(const g of t.flights){const m=zt(g.t),I=g.x0+(h+g.idx*o-g.x0)*m,k=g.y0+(f-g.y0)*m-Math.sin(m*Math.PI)*s*.4;i.fillStyle=w(this.C.outremer,1-g.t*.5),i.fillText(g.ch,I,k)}i.restore()}round(e,t,i,s,r){const o=this.ctx;o.beginPath(),o.moveTo(e+r,t),o.arcTo(e+i,t,e+i,t+s,r),o.arcTo(e+i,t+s,e,t+s,r),o.arcTo(e,t+s,e,t,r),o.arcTo(e,t,e+i,t,r),o.closePath()}pick(e,t){const i=this.canvas.getBoundingClientRect(),s=e.clientX-i.left,r=e.clientY-i.top,o=this.S;let a=null,c=1/0;const l=this.posts.filter(h=>h.count>0).map(h=>({id:h.id,sx:h.sx,top:h.top})),[u,d]=this.iso(0,0,$n);l.push({id:"founder",sx:u,top:d});for(const h of l){const f=Math.abs(s-h.sx),_=r-h.top;if(f>o*.75||_<-o*1.7||_>o*.8)continue;const g=f+Math.abs(_+o*.4)*.5;g<c&&(c=g,a=h.id)}this.setHover(a),t&&(this.touchTimer&&clearTimeout(this.touchTimer),this.touchTimer=setTimeout(()=>this.setHover(null),Ld))}setHover(e){if(e===this.hovered)return;if(this.hovered=e,this.canvas.style.cursor=e?"help":"",!e){this.tooltip.classList.add("hidden");return}let t,i,s,r;if(e==="founder")t=p("bureau.founder"),i=this.prestigeCount>0?rt(this.founderMult):p("bureau.founderHint"),[s,r]=this.iso(0,0,$n);else{const c=this.posts.find(l=>l.id===e);t=c.name,i=p(c.count>1?"bureau.agentsPl":"bureau.agents",{n:c.count}),c.tier>0&&(i+=` · ${p("agent.tierBonus",{mult:rt(un(c.count))})}`),s=c.sx,r=c.top}this.tooltip.innerHTML="<strong></strong><span></span>",this.tooltip.querySelector("strong").textContent=t,this.tooltip.querySelector("span").textContent=i,this.tooltip.classList.remove("hidden");const o=this.tooltip.offsetWidth,a=Math.max(6,Math.min(this.W-o-6,s-o/2));this.tooltip.style.left=`${a}px`,this.tooltip.style.top=`${Math.max(6,r+this.S*.55)}px`}}const Xa="bot-empire-sound",Za=.32;let be=null,It=null,Kt=null,ec=!1,rr=qd();function qd(){try{return localStorage.getItem(Xa)!=="off"}catch{return!0}}function ci(){ec=!0,window.removeEventListener("pointerdown",ci,!0),window.removeEventListener("keydown",ci,!0)}window.addEventListener("pointerdown",ci,!0);window.addEventListener("keydown",ci,!0);function tc(){return rr}function Hd(n){rr=n;try{localStorage.setItem(Xa,n?"on":"off")}catch{}It&&be&&It.gain.setTargetAtTime(n?Za:0,be.currentTime,.02)}function Cn(){if(!rr||!ec)return null;try{return be||(be=new AudioContext,It=be.createGain(),It.gain.value=Za,It.connect(be.destination)),be.state==="suspended"&&be.resume(),be}catch{return null}}function nc(){return It}function kt(n,e,t,i,s=.12,r="sine"){const o=n.createOscillator(),a=n.createGain();o.connect(a),a.connect(nc()),o.type=r,o.frequency.value=e,a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(s,t+.008),a.gain.exponentialRampToValueAtTime(1e-4,t+i),o.start(t),o.stop(t+i+.02)}function Wd(n){if(Kt)return Kt;const e=Math.floor(n.sampleRate*.06);Kt=n.createBuffer(1,e,n.sampleRate);const t=Kt.getChannelData(0);for(let i=0;i<e;i++)t[i]=Math.random()*2-1;return Kt}function Vd(){const n=Cn();if(!n)return;const e=n.currentTime,t=n.createBufferSource();t.buffer=Wd(n);const i=n.createBiquadFilter();i.type="bandpass",i.frequency.value=2200+Math.random()*1400,i.Q.value=3.5;const s=n.createGain();s.gain.setValueAtTime(.5,e),s.gain.exponentialRampToValueAtTime(1e-4,e+.035),t.connect(i),i.connect(s),s.connect(nc()),t.start(e),t.stop(e+.05),kt(n,150+Math.random()*40,e,.04,.12,"triangle")}function Rt(){const n=Cn();n&&(kt(n,659.25,n.currentTime,.18,.08,"triangle"),kt(n,987.77,n.currentTime+.07,.22,.07,"triangle"))}function Gd(){const n=Cn();if(!n)return;const e=784,t=n.currentTime;[[1,.16,2.2],[2.76,.06,1.4],[5.4,.035,.9],[8.93,.02,.6]].forEach(([i,s,r])=>{kt(n,e*i,t,r,s,"sine")})}function $i(){const n=Cn();n&&[523.25,659.25,783.99,1046.5].forEach((e,t)=>{kt(n,e,n.currentTime+t*.018,.7,.06,"triangle")})}function jd(){const n=Cn();n&&[1046.5,880,659.25,523.25,392].forEach((e,t)=>{kt(n,e,n.currentTime+t*.13,.6,.08,"sine")})}const zd=3e4,Kd=3,Yd=60,Qd=120;class Jd{clickTimestamps=[];intervals=[];active=!1;replayTimer=0;cooldownTimer=0;replayIdx=0;nextClickIn=0;cooldownMultiplier=1;setCooldownMultiplier(e){this.cooldownMultiplier=e}recordClick(){const e=Date.now();this.clickTimestamps.push(e),this.clickTimestamps=this.clickTimestamps.filter(t=>e-t<=zd),this.intervals=[];for(let t=1;t<this.clickTimestamps.length;t++)this.intervals.push((this.clickTimestamps[t]-this.clickTimestamps[t-1])/1e3)}canActivate(){return!this.active&&this.cooldownTimer<=0&&this.clickTimestamps.length>=Kd}activate(){if(!this.canActivate())return;this.active=!0,this.replayTimer=Yd,this.replayIdx=0;const e=this.intervals.length>0?[...this.intervals].sort((t,i)=>t-i)[Math.floor(this.intervals.length/2)]:.5;this.nextClickIn=e}tick(e){if(!this.active)return this.cooldownTimer>0&&(this.cooldownTimer=Math.max(0,this.cooldownTimer-e)),0;if(this.replayTimer-=e,this.replayTimer<=0)return this.active=!1,this.cooldownTimer=Qd*this.cooldownMultiplier,0;let t=0;for(this.nextClickIn-=e;this.nextClickIn<=0&&this.intervals.length>0;)t++,this.replayIdx=(this.replayIdx+1)%this.intervals.length,this.nextClickIn+=this.intervals[this.replayIdx]??.5;return t}getState(){return{canActivate:this.canActivate(),isActive:this.active,isOnCooldown:this.cooldownTimer>0,replayRemaining:Math.ceil(this.replayTimer),cooldownRemaining:Math.ceil(this.cooldownTimer),clicksRecorded:this.clickTimestamps.length}}}const Jn=[{client:"MégaRetail",urgency:"CRITIQUE",problem:"Le chatbot répond avec des infos de 2022 et invente des promos inexistantes.",question:"Quelle est la meilleure solution à court terme ?",answers:["Augmenter la température du modèle à 1.5","Implémenter du RAG avec le catalogue produits à jour","Passer à un modèle plus récent"],correct:1,lesson:"Le RAG (Retrieval Augmented Generation) ancre les réponses dans des données réelles actualisées — le modèle ne peut répondre que ce qui est dans la base.",reward:800},{client:"PharmaPlus",urgency:"URGENT",problem:"L'agent invente des posologies de médicaments — données potentiellement dangereuses.",question:"Comment sécuriser le système en priorité ?",answers:["Ajouter un disclaimer légal dans les réponses","Contraindre les réponses à la base de données médicale validée uniquement","Passer en mode conversationnel libre pour plus de souplesse"],correct:1,lesson:"Pour les domaines critiques, le modèle doit être ancré dans une base validée. Les hallucinations sont réduites de 80%+ quand on gronde le modèle avec des sources fiables.",reward:1200},{client:"SpeedLogistix",urgency:"IMPORTANT",problem:"Les appels API coûtent 3× le budget prévu. Le client menace de résilier.",question:"Quelle est la cause la plus probable ?",answers:["Le modèle utilise trop de puissance de calcul","Les prompts sont trop longs et il n'y a pas de cache sémantique","Le serveur retente les appels trop souvent"],correct:1,lesson:"Le cache sémantique stocke les réponses à des requêtes similaires. Combiné à la compression de prompts, il réduit les coûts de 60 à 80%.",reward:600},{client:"LexGroup",urgency:"CRITIQUE",problem:"Un utilisateur a réussi à faire ignorer les instructions du système au chatbot juridique.",question:"Ce type d'attaque s'appelle ?",answers:["SQL Injection","Prompt Injection","Cross-Site Scripting (XSS)"],correct:1,lesson:"Le Prompt Injection insère des instructions malveillantes dans l'input pour détourner le comportement du modèle. La validation des entrées et les garde-fous système sont essentiels.",reward:900},{client:"FluentAI",urgency:"IMPORTANT",problem:"Les traductions automatiques sont inconsistantes — même texte, résultats différents à chaque session.",question:"Quel paramètre est probablement mal configuré ?",answers:["La température est trop haute (0.9+)","Le modèle manque de mémoire RAM","Le prompt système est trop court"],correct:0,lesson:"La température contrôle la créativité du modèle. Pour les tâches de précision (traduction, extraction de données), une température basse (0.0-0.2) garantit des résultats cohérents.",reward:500},{client:"DataNova",urgency:"MOYEN",problem:"L'agent dépasse systématiquement la fenêtre de contexte quand les rapports sont longs.",question:"Quelle technique résout ce problème sans changer de modèle ?",answers:["Ignorer les parties trop longues du document","Découper le document en chunks et traiter par parties","Augmenter le budget pour un modèle 128k tokens"],correct:1,lesson:"Le chunking divise les longs documents en segments traités séquentiellement avec résumés intermédiaires. C'est la base de tout pipeline RAG robuste — avant d'augmenter les coûts.",reward:600},{client:"ViralBoost",urgency:"IMPORTANT",problem:"L'agent de génération de contenu tourne en boucle infinie sans jamais livrer de résultat.",question:"Qu'est-ce qui manque dans l'architecture de l'agent ?",answers:["Un modèle de langage plus performant","Une condition d'arrêt et un compteur maximum d'itérations","Plus de mémoire sur le serveur"],correct:1,lesson:"Tout agent doit avoir une condition d'arrêt explicite (max_iterations, stop_condition). Sans garde-fou, les agents LLM peuvent boucler indéfiniment et exploser la facture.",reward:700},{client:"GreenBank",urgency:"CRITIQUE",problem:"Des données clients PII sont envoyées à l'API OpenAI. Le DPO est en train d'appeler les avocats.",question:"Solution RGPD-compatible en urgence ?",answers:["Anonymiser les données avant envoi ou héberger le modèle en interne","Ajouter un bandeau de consentement cookie sur le site","Envoyer les données en HTTPS — c'est suffisant pour la conformité"],correct:0,lesson:"Les APIs cloud de LLM ne sont pas RGPD-safe par défaut. L'anonymisation (masquage PII) ou le self-hosting (Ollama, vLLM) sont les seules solutions réellement conformes.",reward:1500},{client:"QuickSort",urgency:"MOYEN",problem:"Le classifieur de tickets support a 65% de précision. Le client attendait 90%+.",question:"Comment améliorer rapidement les performances sans réentraîner ?",answers:["Passer directement à GPT-4 Turbo","Ajouter 3 à 5 exemples concrets dans le prompt (few-shot learning)","Entraîner un nouveau modèle from scratch sur les données internes"],correct:1,lesson:"Le few-shot learning (exemples dans le prompt) améliore souvent la précision de 15 à 30% sans coût d'entraînement. C'est toujours le premier levier à tester — avant de changer de modèle.",reward:700},{client:"PrimeCare",urgency:"IMPORTANT",problem:"Le modèle prend 8+ secondes pour répondre. Les utilisateurs abandonnent avant la fin.",question:"Quelle technique améliore la perception de vitesse sans changer de modèle ?",answers:["Réduire la longueur maximale des réponses à 50 tokens","Implémenter le streaming — afficher les tokens au fur et à mesure","Mettre toutes les réponses en cache côté serveur"],correct:1,lesson:"Le streaming affiche les tokens dès leur génération. L'utilisateur lit pendant que le modèle génère — la perception de vitesse est transformée même si le temps total ne change pas.",reward:500},{client:"AutoFleet",urgency:"MOYEN",problem:"Le workflow d'automatisation plante sans se relancer en cas d'erreur API intermittente.",question:"Quelle stratégie de résilience implémenter ?",answers:["Try/catch avec log d'erreur et arrêt du workflow","Exponential backoff avec retry automatique (3 tentatives espacées)","Envoyer une alerte Slack et attendre l'intervention manuelle"],correct:1,lesson:"L'exponential backoff (attendre 1s, puis 2s, puis 4s avant retry) est le standard pour les APIs instables. Elle évite de surcharger un service déjà en difficulté.",reward:600},{client:"MindScope",urgency:"CRITIQUE",problem:"L'agent d'analyse confond deux pathologies similaires dans 35% des cas.",question:"Quel est le premier levier d'amélioration à tester ?",answers:["Changer immédiatement de fournisseur d'API","Affiner le prompt avec des critères de différenciation précis et des contre-exemples","Augmenter la résolution des images envoyées au modèle"],correct:1,lesson:"Avant de changer de modèle, optimisez le prompt. Des critères de différenciation explicites et des contre-exemples concrets améliorent souvent la précision de 20 à 40%.",reward:1e3}],Xd=210,Zd=90,eh=180,th=120;class nh{nextIn;active=!1;usedIndices=new Set;constructor(){this.nextIn=Xd+Math.random()*Zd}tick(e,t){return!t||this.active?null:(this.nextIn-=e,this.nextIn<=0?(this.active=!0,this.pickQuestion()):null)}resolve(){this.active=!1,this.nextIn=eh+Math.random()*th}pickQuestion(){this.usedIndices.size>=Jn.length&&this.usedIndices.clear();let e;do e=Math.floor(Math.random()*Jn.length);while(this.usedIndices.has(e));return this.usedIndices.add(e),Jn[e]}}const rs={"first-click":{text:"hint.firstClick",targets:["#btn-click"]},"first-agent":{text:"hint.firstAgent",targets:['[data-agent="bot-workflows"] .btn-buy','.tab[data-tab="agents"]']},"first-client":{text:"hint.firstClient",targets:['.tab[data-tab="clients"]']}},bo="bot-empire-hints",ih="tuto-done",sh=260,Me=12;class rh{seen;activeId=null;bubble=null;autoHide=null;constructor(){this.seen=this.load()}show(e,t){if(this.seen.has(e)||this.activeId===e)return;this.activeId&&this.dismiss(this.activeId);const i=document.createElement("div");i.className="hint-bubble",i.setAttribute("role","status"),i.setAttribute("aria-live","polite"),i.innerHTML='<span class="hint-text"></span><button class="hint-close" type="button">×</button>',i.querySelector(".hint-text").textContent=p(rs[e].text),i.querySelector(".hint-close").setAttribute("aria-label",p("hint.close")),i.querySelector(".hint-close").addEventListener("click",()=>this.dismiss(e)),document.body.appendChild(i),this.bubble=i,this.activeId=e,this.reposition(),t&&(this.autoHide=setTimeout(()=>this.dismiss(e),t))}dismiss(e){this.seen.has(e)||(this.seen.add(e),this.save()),this.activeId===e&&(this.autoHide&&(clearTimeout(this.autoHide),this.autoHide=null),this.bubble?.remove(),this.bubble=null,this.activeId=null)}isSeen(e){return this.seen.has(e)}reposition(){if(!this.bubble||!this.activeId)return;const e=this.findTarget(rs[this.activeId].targets);if(!e){this.bubble.style.visibility="hidden";return}const t=e.getBoundingClientRect(),i=window.innerWidth,s=window.innerHeight,r=this.bubble.offsetHeight,o=Math.min(sh,i-Me*2),a=t.top-r-Me>=Me,c=a?t.top-r-Me:Math.min(t.bottom+Me,s-r-Me);let l=t.left+t.width/2-o/2;l=Math.max(Me,Math.min(l,i-o-Me)),this.bubble.style.width=`${o}px`,this.bubble.style.top=`${c}px`,this.bubble.style.left=`${l}px`,this.bubble.style.visibility="",this.bubble.style.setProperty("--arrow-x",`${Math.max(14,Math.min(t.left+t.width/2-l,o-14))}px`),this.bubble.classList.toggle("below",!a)}findTarget(e){for(const t of e){const i=document.querySelector(t);if(i&&i.getClientRects().length>0)return i}return null}load(){try{const e=localStorage.getItem(bo);if(e)return new Set(JSON.parse(e));if(localStorage.getItem(ih))return new Set(Object.keys(rs))}catch{}return new Set}save(){try{localStorage.setItem(bo,JSON.stringify([...this.seen]))}catch{}}}const oh=()=>{};var wo={};/**
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
 */const ic={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const v=function(n,e){if(!n)throw Bt(e)},Bt=function(n){return new Error("Firebase Database ("+ic.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const sc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ah=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],c=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},or={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,c=s+2<n.length,l=c?n[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|l>>6,f=l&63;c||(f=64,o||(h=64)),i.push(t[u],t[d],t[h],t[f])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(sc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):ah(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const l=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||l==null||d==null)throw new ch;const h=r<<2|a>>4;if(i.push(h),l!==64){const f=a<<4&240|l>>2;if(i.push(f),d!==64){const _=l<<6&192|d;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ch extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const rc=function(n){const e=sc(n);return or.encodeByteArray(e,!0)},li=function(n){return rc(n).replace(/\./g,"")},ui=function(n){try{return or.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function lh(n){return oc(void 0,n)}function oc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!uh(t)||(n[t]=oc(n[t],e[t]));return n}function uh(n){return n!=="__proto__"}/**
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
 */function dh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const hh=()=>dh().__FIREBASE_DEFAULTS__,ph=()=>{if(typeof process>"u"||typeof wo>"u")return;const n=wo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},fh=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ui(n[1]);return e&&JSON.parse(e)},ar=()=>{try{return oh()||hh()||ph()||fh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},ac=n=>ar()?.emulatorHosts?.[n],mh=n=>{const e=ac(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},cc=()=>ar()?.config,lc=n=>ar()?.[`_${n}`];/**
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
 */class qi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function gh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}},...n};return[li(JSON.stringify(t)),li(JSON.stringify(o)),""].join(".")}/**
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
 */function ee(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function cr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ee())}function _h(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function yh(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function uc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function vh(){const n=ee();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function bh(){return ic.NODE_ADMIN===!0}function wh(){try{return typeof indexedDB=="object"}catch{return!1}}function Ih(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
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
 */const Ch="FirebaseError";class et extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Ch,Object.setPrototypeOf(this,et.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,En.prototype.create)}}class En{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Eh(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new et(s,a,i)}}function Eh(n,e){return n.replace(Th,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Th=/\{\$([^}]+)}/g;/**
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
 */function dn(n){return JSON.parse(n)}function q(n){return JSON.stringify(n)}/**
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
 */const dc=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=dn(ui(r[0])||""),t=dn(ui(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},Sh=function(n){const e=dc(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Ah=function(n){const e=dc(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function Re(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Pt(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Rs(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function di(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function ut(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(Io(r)&&Io(o)){if(!ut(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function Io(n){return n!==null&&typeof n=="object"}/**
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
 */function Ft(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
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
 */class kh{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],c=this.chain_[4],l,u;for(let d=0;d<80;d++){d<40?d<20?(l=a^r&(o^a),u=1518500249):(l=r^o^a,u=1859775393):d<60?(l=r&o|a&(r|o),u=2400959708):(l=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+l+c+u+i[d]&4294967295;c=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Rh(n,e){const t=new Ph(n,e);return t.subscribe.bind(t)}class Ph{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Mh(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=os),s.error===void 0&&(s.error=os),s.complete===void 0&&(s.complete=os);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Mh(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function os(){}function lr(n,e){return`${n} failed: ${e} argument `}/**
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
 */const xh=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,v(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Hi=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function oe(n){return n&&n._delegate?n._delegate:n}/**
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
 */function Tn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function hc(n){return(await fetch(n,{credentials:"include"})).ok}class dt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const it="[DEFAULT]";/**
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
 */class Nh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new qi;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),i=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Oh(e))try{this.getOrInitializeService({instanceIdentifier:it})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=it){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=it){return this.instances.has(e)}getOptions(e=it){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const r=this.instances.get(i);return r&&e(r,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Lh(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=it){return this.component?this.component.multipleInstances?e:it:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Lh(n){return n===it?void 0:n}function Oh(n){return n.instantiationMode==="EAGER"}/**
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
 */class Dh{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Nh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var N;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(N||(N={}));const Uh={debug:N.DEBUG,verbose:N.VERBOSE,info:N.INFO,warn:N.WARN,error:N.ERROR,silent:N.SILENT},Bh=N.INFO,Fh={[N.DEBUG]:"log",[N.VERBOSE]:"log",[N.INFO]:"info",[N.WARN]:"warn",[N.ERROR]:"error"},$h=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Fh[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ur{constructor(e){this.name=e,this._logLevel=Bh,this._logHandler=$h,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in N))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Uh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,N.DEBUG,...e),this._logHandler(this,N.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,N.VERBOSE,...e),this._logHandler(this,N.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,N.INFO,...e),this._logHandler(this,N.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,N.WARN,...e),this._logHandler(this,N.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,N.ERROR,...e),this._logHandler(this,N.ERROR,...e)}}const qh=(n,e)=>e.some(t=>n instanceof t);let Co,Eo;function Hh(){return Co||(Co=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Wh(){return Eo||(Eo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const pc=new WeakMap,Ps=new WeakMap,fc=new WeakMap,as=new WeakMap,dr=new WeakMap;function Vh(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(He(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&pc.set(t,n)}).catch(()=>{}),dr.set(e,n),e}function Gh(n){if(Ps.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Ps.set(n,e)}let Ms={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ps.get(n);if(e==="objectStoreNames")return n.objectStoreNames||fc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return He(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function jh(n){Ms=n(Ms)}function zh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(cs(this),e,...t);return fc.set(i,e.sort?e.sort():[e]),He(i)}:Wh().includes(n)?function(...e){return n.apply(cs(this),e),He(pc.get(this))}:function(...e){return He(n.apply(cs(this),e))}}function Kh(n){return typeof n=="function"?zh(n):(n instanceof IDBTransaction&&Gh(n),qh(n,Hh())?new Proxy(n,Ms):n)}function He(n){if(n instanceof IDBRequest)return Vh(n);if(as.has(n))return as.get(n);const e=Kh(n);return e!==n&&(as.set(n,e),dr.set(e,n)),e}const cs=n=>dr.get(n);function Yh(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=He(o);return i&&o.addEventListener("upgradeneeded",c=>{i(He(o.result),c.oldVersion,c.newVersion,He(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{r&&c.addEventListener("close",()=>r()),s&&c.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Qh=["get","getKey","getAll","getAllKeys","count"],Jh=["put","add","delete","clear"],ls=new Map;function To(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ls.get(e))return ls.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Jh.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Qh.includes(t)))return;const r=async function(o,...a){const c=this.transaction(o,s?"readwrite":"readonly");let l=c.store;return i&&(l=l.index(a.shift())),(await Promise.all([l[t](...a),s&&c.done]))[0]};return ls.set(e,r),r}jh(n=>({...n,get:(e,t,i)=>To(e,t)||n.get(e,t,i),has:(e,t)=>!!To(e,t)||n.has(e,t)}));/**
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
 */class Xh{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Zh(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Zh(n){return n.getComponent()?.type==="VERSION"}const xs="@firebase/app",So="0.14.11";/**
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
 */const Te=new ur("@firebase/app"),ep="@firebase/app-compat",tp="@firebase/analytics-compat",np="@firebase/analytics",ip="@firebase/app-check-compat",sp="@firebase/app-check",rp="@firebase/auth",op="@firebase/auth-compat",ap="@firebase/database",cp="@firebase/data-connect",lp="@firebase/database-compat",up="@firebase/functions",dp="@firebase/functions-compat",hp="@firebase/installations",pp="@firebase/installations-compat",fp="@firebase/messaging",mp="@firebase/messaging-compat",gp="@firebase/performance",_p="@firebase/performance-compat",yp="@firebase/remote-config",vp="@firebase/remote-config-compat",bp="@firebase/storage",wp="@firebase/storage-compat",Ip="@firebase/firestore",Cp="@firebase/ai",Ep="@firebase/firestore-compat",Tp="firebase",Sp="12.12.0";/**
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
 */const Ns="[DEFAULT]",Ap={[xs]:"fire-core",[ep]:"fire-core-compat",[np]:"fire-analytics",[tp]:"fire-analytics-compat",[sp]:"fire-app-check",[ip]:"fire-app-check-compat",[rp]:"fire-auth",[op]:"fire-auth-compat",[ap]:"fire-rtdb",[cp]:"fire-data-connect",[lp]:"fire-rtdb-compat",[up]:"fire-fn",[dp]:"fire-fn-compat",[hp]:"fire-iid",[pp]:"fire-iid-compat",[fp]:"fire-fcm",[mp]:"fire-fcm-compat",[gp]:"fire-perf",[_p]:"fire-perf-compat",[yp]:"fire-rc",[vp]:"fire-rc-compat",[bp]:"fire-gcs",[wp]:"fire-gcs-compat",[Ip]:"fire-fst",[Ep]:"fire-fst-compat",[Cp]:"fire-vertex","fire-js":"fire-js",[Tp]:"fire-js-all"};/**
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
 */const hi=new Map,kp=new Map,Ls=new Map;function Ao(n,e){try{n.container.addComponent(e)}catch(t){Te.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Mt(n){const e=n.name;if(Ls.has(e))return Te.debug(`There were multiple attempts to register component ${e}.`),!1;Ls.set(e,n);for(const t of hi.values())Ao(t,n);for(const t of kp.values())Ao(t,n);return!0}function hr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ce(n){return n==null?!1:n.settings!==void 0}/**
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
 */const Rp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},We=new En("app","Firebase",Rp);/**
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
 */class Pp{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new dt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw We.create("app-deleted",{appName:this._name})}}/**
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
 */const $t=Sp;function mc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:Ns,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw We.create("bad-app-name",{appName:String(s)});if(t||(t=cc()),!t)throw We.create("no-options");const r=hi.get(s);if(r){if(ut(t,r.options)&&ut(i,r.config))return r;throw We.create("duplicate-app",{appName:s})}const o=new Dh(s);for(const c of Ls.values())o.addComponent(c);const a=new Pp(t,i,o);return hi.set(s,a),a}function gc(n=Ns){const e=hi.get(n);if(!e&&n===Ns&&cc())return mc();if(!e)throw We.create("no-app",{appName:n});return e}function Ve(n,e,t){let i=Ap[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),r=e.match(/\s|\//);if(s||r){const o=[`Unable to register library "${i}" with version "${e}":`];s&&o.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&r&&o.push("and"),r&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Te.warn(o.join(" "));return}Mt(new dt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const Mp="firebase-heartbeat-database",xp=1,hn="firebase-heartbeat-store";let us=null;function _c(){return us||(us=Yh(Mp,xp,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(hn)}catch(t){console.warn(t)}}}}).catch(n=>{throw We.create("idb-open",{originalErrorMessage:n.message})})),us}async function Np(n){try{const t=(await _c()).transaction(hn),i=await t.objectStore(hn).get(yc(n));return await t.done,i}catch(e){if(e instanceof et)Te.warn(e.message);else{const t=We.create("idb-get",{originalErrorMessage:e?.message});Te.warn(t.message)}}}async function ko(n,e){try{const i=(await _c()).transaction(hn,"readwrite");await i.objectStore(hn).put(e,yc(n)),await i.done}catch(t){if(t instanceof et)Te.warn(t.message);else{const i=We.create("idb-set",{originalErrorMessage:t?.message});Te.warn(i.message)}}}function yc(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Lp=1024,Op=30;class Dp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Bp(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ro();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(s=>s.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:t}),this._heartbeatsCache.heartbeats.length>Op){const s=Fp(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Te.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ro(),{heartbeatsToSend:t,unsentEntries:i}=Up(this._heartbeatsCache.heartbeats),s=li(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Te.warn(e),""}}}function Ro(){return new Date().toISOString().substring(0,10)}function Up(n,e=Lp){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Po(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Po(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Bp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wh()?Ih().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Np(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return ko(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return ko(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Po(n){return li(JSON.stringify({version:2,heartbeats:n})).length}function Fp(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function $p(n){Mt(new dt("platform-logger",e=>new Xh(e),"PRIVATE")),Mt(new dt("heartbeat",e=>new Dp(e),"PRIVATE")),Ve(xs,So,n),Ve(xs,So,"esm2020"),Ve("fire-js","")}$p("");var qp="firebase",Hp="12.12.0";/**
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
 */Ve(qp,Hp,"app");function vc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Wp=vc,bc=new En("auth","Firebase",vc());/**
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
 */const pi=new ur("@firebase/auth");function Vp(n,...e){pi.logLevel<=N.WARN&&pi.warn(`Auth (${$t}): ${n}`,...e)}function Xn(n,...e){pi.logLevel<=N.ERROR&&pi.error(`Auth (${$t}): ${n}`,...e)}/**
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
 */function Se(n,...e){throw pr(n,...e)}function ge(n,...e){return pr(n,...e)}function wc(n,e,t){const i={...Wp(),[e]:t};return new En("auth","Firebase",i).create(e,{appName:n.name})}function Ge(n){return wc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function pr(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return bc.create(n,...e)}function C(n,e,...t){if(!n)throw pr(e,...t)}function we(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Xn(e),new Error(e)}function Ae(n,e){n||we(e)}/**
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
 */function Os(){return typeof self<"u"&&self.location?.href||""}function Gp(){return Mo()==="http:"||Mo()==="https:"}function Mo(){return typeof self<"u"&&self.location?.protocol||null}/**
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
 */function jp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Gp()||yh()||"connection"in navigator)?navigator.onLine:!0}function zp(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Sn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ae(t>e,"Short delay should be less than long delay!"),this.isMobile=cr()||uc()}get(){return jp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function fr(n,e){Ae(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Ic{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;we("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;we("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;we("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Kp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Yp=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Qp=new Sn(3e4,6e4);function Wi(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function qt(n,e,t,i,s={}){return Cc(n,s,async()=>{let r={},o={};i&&(e==="GET"?o=i:r={body:JSON.stringify(i)});const a=Ft({key:n.config.apiKey,...o}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const l={method:e,headers:c,...r};return _h()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&Tn(n.emulatorConfig.host)&&(l.credentials="include"),Ic.fetch()(await Tc(n,n.config.apiHost,t,a),l)})}async function Cc(n,e,t){n._canInitEmulator=!1;const i={...Kp,...e};try{const s=new Jp(n),r=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw Hn(n,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[c,l]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Hn(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Hn(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Hn(n,"user-disabled",o);const u=i[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw wc(n,u,l);Se(n,u)}}catch(s){if(s instanceof et)throw s;Se(n,"network-request-failed",{message:String(s)})}}async function Ec(n,e,t,i,s={}){const r=await qt(n,e,t,i,s);return"mfaPendingCredential"in r&&Se(n,"multi-factor-auth-required",{_serverResponse:r}),r}async function Tc(n,e,t,i){const s=`${e}${t}?${i}`,r=n,o=r.config.emulator?fr(n.config,s):`${n.config.apiScheme}://${s}`;return Yp.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(o).toString():o}class Jp{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(ge(this.auth,"network-request-failed")),Qp.get())})}}function Hn(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=ge(n,e,i);return s.customData._tokenResponse=t,s}/**
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
 */async function Xp(n,e){return qt(n,"POST","/v1/accounts:delete",e)}async function fi(n,e){return qt(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function nn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Zp(n,e=!1){const t=oe(n),i=await t.getIdToken(e),s=mr(i);C(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r?.sign_in_provider;return{claims:s,token:i,authTime:nn(ds(s.auth_time)),issuedAtTime:nn(ds(s.iat)),expirationTime:nn(ds(s.exp)),signInProvider:o||null,signInSecondFactor:r?.sign_in_second_factor||null}}function ds(n){return Number(n)*1e3}function mr(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return Xn("JWT malformed, contained fewer than 3 sections"),null;try{const s=ui(t);return s?JSON.parse(s):(Xn("Failed to decode base64 JWT payload"),null)}catch(s){return Xn("Caught error parsing JWT payload as JSON",s?.toString()),null}}function xo(n){const e=mr(n);return C(e,"internal-error"),C(typeof e.exp<"u","internal-error"),C(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function pn(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof et&&ef(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function ef({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class tf{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Ds{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=nn(this.lastLoginAt),this.creationTime=nn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function mi(n){const e=n.auth,t=await n.getIdToken(),i=await pn(n,fi(e,{idToken:t}));C(i?.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const r=s.providerUserInfo?.length?Sc(s.providerUserInfo):[],o=sf(n.providerData,r),a=n.isAnonymous,c=!(n.email&&s.passwordHash)&&!o?.length,l=a?c:!1,u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Ds(s.createdAt,s.lastLoginAt),isAnonymous:l};Object.assign(n,u)}async function nf(n){const e=oe(n);await mi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function sf(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function Sc(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function rf(n,e){const t=await Cc(n,{},async()=>{const i=Ft({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=n.config,o=await Tc(n,s,"/v1/token",`key=${r}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:i};return n.emulatorConfig&&Tn(n.emulatorConfig.host)&&(c.credentials="include"),Ic.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function of(n,e){return qt(n,"POST","/v2/accounts:revokeToken",Wi(n,e))}/**
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
 */class Ct{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){C(e.idToken,"internal-error"),C(typeof e.idToken<"u","internal-error"),C(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):xo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){C(e.length!==0,"internal-error");const t=xo(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(C(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:r}=await rf(e,t);this.updateTokensAndExpiration(i,s,Number(r))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:r}=t,o=new Ct;return i&&(C(typeof i=="string","internal-error",{appName:e}),o.refreshToken=i),s&&(C(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(C(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ct,this.toJSON())}_performRefresh(){return we("not implemented")}}/**
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
 */function xe(n,e){C(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ue{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new tf(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ds(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await pn(this,this.stsTokenManager.getToken(this.auth,e));return C(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Zp(this,e)}reload(){return nf(this)}_assign(e){this!==e&&(C(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ue({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){C(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await mi(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ce(this.auth.app))return Promise.reject(Ge(this.auth));const e=await this.getIdToken();return await pn(this,Xp(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,r=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,l=t.createdAt??void 0,u=t.lastLoginAt??void 0,{uid:d,emailVerified:h,isAnonymous:f,providerData:_,stsTokenManager:g}=t;C(d&&g,e,"internal-error");const m=Ct.fromJSON(this.name,g);C(typeof d=="string",e,"internal-error"),xe(i,e.name),xe(s,e.name),C(typeof h=="boolean",e,"internal-error"),C(typeof f=="boolean",e,"internal-error"),xe(r,e.name),xe(o,e.name),xe(a,e.name),xe(c,e.name),xe(l,e.name),xe(u,e.name);const I=new ue({uid:d,auth:e,email:s,emailVerified:h,displayName:i,isAnonymous:f,photoURL:o,phoneNumber:r,tenantId:a,stsTokenManager:m,createdAt:l,lastLoginAt:u});return _&&Array.isArray(_)&&(I.providerData=_.map(k=>({...k}))),c&&(I._redirectEventId=c),I}static async _fromIdTokenResponse(e,t,i=!1){const s=new Ct;s.updateFromServerResponse(t);const r=new ue({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await mi(r),r}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];C(s.localId!==void 0,"internal-error");const r=s.providerUserInfo!==void 0?Sc(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!r?.length,a=new Ct;a.updateFromIdToken(i);const c=new ue({uid:s.localId,auth:e,stsTokenManager:a,isAnonymous:o}),l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:r,metadata:new Ds(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!r?.length};return Object.assign(c,l),c}}/**
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
 */const No=new Map;function Ie(n){Ae(n instanceof Function,"Expected a class definition");let e=No.get(n);return e?(Ae(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,No.set(n,e),e)}/**
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
 */class Ac{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ac.type="NONE";const Lo=Ac;/**
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
 */function Zn(n,e,t){return`firebase:${n}:${e}:${t}`}class Et{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:r}=this.auth;this.fullUserKey=Zn(this.userKey,s.apiKey,r),this.fullPersistenceKey=Zn("persistence",s.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await fi(this.auth,{idToken:e}).catch(()=>{});return t?ue._fromGetAccountInfoResponse(this.auth,t,e):null}return ue._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Et(Ie(Lo),e,i);const s=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l);let r=s[0]||Ie(Lo);const o=Zn(i,e.config.apiKey,e.name);let a=null;for(const l of t)try{const u=await l._get(o);if(u){let d;if(typeof u=="string"){const h=await fi(e,{idToken:u}).catch(()=>{});if(!h)break;d=await ue._fromGetAccountInfoResponse(e,h,u)}else d=ue._fromJSON(e,u);l!==r&&(a=d),r=l;break}}catch{}const c=s.filter(l=>l._shouldAllowMigration);return!r._shouldAllowMigration||!c.length?new Et(r,e,i):(r=c[0],a&&await r._set(o,a.toJSON()),await Promise.all(t.map(async l=>{if(l!==r)try{await l._remove(o)}catch{}})),new Et(r,e,i))}}/**
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
 */function Oo(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Mc(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(kc(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Nc(e))return"Blackberry";if(Lc(e))return"Webos";if(Rc(e))return"Safari";if((e.includes("chrome/")||Pc(e))&&!e.includes("edge/"))return"Chrome";if(xc(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function kc(n=ee()){return/firefox\//i.test(n)}function Rc(n=ee()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Pc(n=ee()){return/crios\//i.test(n)}function Mc(n=ee()){return/iemobile/i.test(n)}function xc(n=ee()){return/android/i.test(n)}function Nc(n=ee()){return/blackberry/i.test(n)}function Lc(n=ee()){return/webos/i.test(n)}function gr(n=ee()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function af(n=ee()){return gr(n)&&!!window.navigator?.standalone}function cf(){return vh()&&document.documentMode===10}function Oc(n=ee()){return gr(n)||xc(n)||Lc(n)||Nc(n)||/windows phone/i.test(n)||Mc(n)}/**
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
 */function Dc(n,e=[]){let t;switch(n){case"Browser":t=Oo(ee());break;case"Worker":t=`${Oo(ee())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${$t}/${i}`}/**
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
 */class lf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=r=>new Promise((o,a)=>{try{const c=e(r);o(c)}catch(c){a(c)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function uf(n,e={}){return qt(n,"GET","/v2/passwordPolicy",Wi(n,e))}/**
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
 */const df=6;class hf{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??df,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
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
 */class pf{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Do(this),this.idTokenSubscription=new Do(this),this.beforeStateQueue=new lf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=bc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ie(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Et.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await fi(this,{idToken:e}),i=await ue._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(ce(this.app)){const r=this.app.settings.authIdToken;return r?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(r).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const r=this.redirectUser?._redirectEventId,o=i?._redirectEventId,a=await this.tryRedirectSignIn(e);(!r||r===o)&&a?.user&&(i=a.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(r){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(r))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return C(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await mi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=zp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ce(this.app))return Promise.reject(Ge(this));const t=e?oe(e):null;return t&&C(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&C(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ce(this.app)?Promise.reject(Ge(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ce(this.app)?Promise.reject(Ge(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ie(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await uf(this),t=new hf(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new En("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await of(this,i)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ie(e)||this._popupRedirectResolver;C(t,this,"argument-error"),this.redirectPersistenceManager=await Et.create(this,[Ie(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(C(a,this,"internal-error"),a.then(()=>{o||r(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,i,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return C(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Dc(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){if(ce(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Vp(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Vi(n){return oe(n)}class Do{constructor(e){this.auth=e,this.observer=null,this.addObserver=Rh(t=>this.observer=t)}get next(){return C(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let _r={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ff(n){_r=n}function mf(n){return _r.loadJS(n)}function gf(){return _r.gapiScript}function _f(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */function yf(n,e){const t=hr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),r=t.getOptions();if(ut(r,e??{}))return s;Se(s,"already-initialized")}return t.initialize({options:e})}function vf(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(Ie);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function bf(n,e,t){const i=Vi(n);C(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,r=Uc(e),{host:o,port:a}=wf(e),c=a===null?"":`:${a}`,l={url:`${r}//${o}${c}/`},u=Object.freeze({host:o,port:a,protocol:r.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){C(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),C(ut(l,i.config.emulator)&&ut(u,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=l,i.emulatorConfig=u,i.settings.appVerificationDisabledForTesting=!0,Tn(o)?hc(`${r}//${o}${c}`):If()}function Uc(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function wf(n){const e=Uc(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const r=s[1];return{host:r,port:Uo(i.substr(r.length+1))}}else{const[r,o]=i.split(":");return{host:r,port:Uo(o)}}}function Uo(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function If(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Bc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return we("not implemented")}_getIdTokenResponse(e){return we("not implemented")}_linkToIdToken(e,t){return we("not implemented")}_getReauthenticationResolver(e){return we("not implemented")}}/**
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
 */async function Tt(n,e){return Ec(n,"POST","/v1/accounts:signInWithIdp",Wi(n,e))}/**
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
 */const Cf="http://localhost";class ht extends Bc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ht(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Se("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...r}=t;if(!i||!s)return null;const o=new ht(i,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Tt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Tt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Tt(e,t)}buildRequest(){const e={requestUri:Cf,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ft(t)}return e}}/**
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
 */class Fc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class An extends Fc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Oe extends An{constructor(){super("facebook.com")}static credential(e){return ht._fromParams({providerId:Oe.PROVIDER_ID,signInMethod:Oe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Oe.credentialFromTaggedObject(e)}static credentialFromError(e){return Oe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Oe.credential(e.oauthAccessToken)}catch{return null}}}Oe.FACEBOOK_SIGN_IN_METHOD="facebook.com";Oe.PROVIDER_ID="facebook.com";/**
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
 */class De extends An{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ht._fromParams({providerId:De.PROVIDER_ID,signInMethod:De.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return De.credentialFromTaggedObject(e)}static credentialFromError(e){return De.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return De.credential(t,i)}catch{return null}}}De.GOOGLE_SIGN_IN_METHOD="google.com";De.PROVIDER_ID="google.com";/**
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
 */class Ue extends An{constructor(){super("github.com")}static credential(e){return ht._fromParams({providerId:Ue.PROVIDER_ID,signInMethod:Ue.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ue.credentialFromTaggedObject(e)}static credentialFromError(e){return Ue.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ue.credential(e.oauthAccessToken)}catch{return null}}}Ue.GITHUB_SIGN_IN_METHOD="github.com";Ue.PROVIDER_ID="github.com";/**
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
 */class Be extends An{constructor(){super("twitter.com")}static credential(e,t){return ht._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Be.credentialFromTaggedObject(e)}static credentialFromError(e){return Be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Be.credential(t,i)}catch{return null}}}Be.TWITTER_SIGN_IN_METHOD="twitter.com";Be.PROVIDER_ID="twitter.com";/**
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
 */async function Ef(n,e){return Ec(n,"POST","/v1/accounts:signUp",Wi(n,e))}/**
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
 */class Ke{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const r=await ue._fromIdTokenResponse(e,i,s),o=Bo(i);return new Ke({user:r,providerId:o,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Bo(i);return new Ke({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Bo(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function Tf(n){if(ce(n.app))return Promise.reject(Ge(n));const e=Vi(n);if(await e._initializationPromise,e.currentUser?.isAnonymous)return new Ke({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await Ef(e,{returnSecureToken:!0}),i=await Ke._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(i.user),i}/**
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
 */class gi extends et{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,gi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new gi(e,t,i,s)}}function $c(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?gi._fromErrorAndOperation(n,r,e,i):r})}async function Sf(n,e,t=!1){const i=await pn(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Ke._forOperation(n,"link",i)}/**
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
 */async function Af(n,e,t=!1){const{auth:i}=n;if(ce(i.app))return Promise.reject(Ge(i));const s="reauthenticate";try{const r=await pn(n,$c(i,s,e,n),t);C(r.idToken,i,"internal-error");const o=mr(r.idToken);C(o,i,"internal-error");const{sub:a}=o;return C(n.uid===a,i,"user-mismatch"),Ke._forOperation(n,s,r)}catch(r){throw r?.code==="auth/user-not-found"&&Se(i,"user-mismatch"),r}}/**
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
 */async function kf(n,e,t=!1){if(ce(n.app))return Promise.reject(Ge(n));const i="signIn",s=await $c(n,i,e),r=await Ke._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(r.user),r}function Rf(n,e,t,i){return oe(n).onIdTokenChanged(e,t,i)}function Pf(n,e,t){return oe(n).beforeAuthStateChanged(e,t)}const _i="__sak";/**
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
 */class qc{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(_i,"1"),this.storage.removeItem(_i),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Mf=1e3,xf=10;class Hc extends qc{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Oc(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(i);!t&&this.localCache[i]===o||this.notifyListeners(i,o)},r=this.storage.getItem(i);cf()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,xf):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Mf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Hc.type="LOCAL";const Nf=Hc;/**
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
 */class Wc extends qc{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Wc.type="SESSION";const Vc=Wc;/**
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
 */function Lf(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Gi{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new Gi(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:r}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const a=Array.from(o).map(async l=>l(t.origin,r)),c=await Lf(a);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Gi.receivers=[];/**
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
 */function yr(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Of{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,c)=>{const l=yr("",20);s.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},i);o={messageChannel:s,onMessage(d){const h=d;if(h.data.eventId===l)switch(h.data.status){case"ack":clearTimeout(u),r=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(h.data.response);break;default:clearTimeout(u),clearTimeout(r),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function _e(){return window}function Df(n){_e().location.href=n}/**
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
 */function Gc(){return typeof _e().WorkerGlobalScope<"u"&&typeof _e().importScripts=="function"}async function Uf(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Bf(){return navigator?.serviceWorker?.controller||null}function Ff(){return Gc()?self:null}/**
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
 */const jc="firebaseLocalStorageDb",$f=1,yi="firebaseLocalStorage",zc="fbase_key";class kn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ji(n,e){return n.transaction([yi],e?"readwrite":"readonly").objectStore(yi)}function qf(){const n=indexedDB.deleteDatabase(jc);return new kn(n).toPromise()}function Us(){const n=indexedDB.open(jc,$f);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(yi,{keyPath:zc})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(yi)?e(i):(i.close(),await qf(),e(await Us()))})})}async function Fo(n,e,t){const i=ji(n,!0).put({[zc]:e,value:t});return new kn(i).toPromise()}async function Hf(n,e){const t=ji(n,!1).get(e),i=await new kn(t).toPromise();return i===void 0?null:i.value}function $o(n,e){const t=ji(n,!0).delete(e);return new kn(t).toPromise()}const Wf=800,Vf=3;class Kc{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Us(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>Vf)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Gc()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Gi._getInstance(Ff()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Uf(),!this.activeServiceWorker)return;this.sender=new Of(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Bf()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Us();return await Fo(e,_i,"1"),await $o(e,_i),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Fo(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>Hf(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>$o(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=ji(s,!1).getAll();return new kn(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:r}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Wf)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Kc.type="LOCAL";const Gf=Kc;new Sn(3e4,6e4);/**
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
 */function jf(n,e){return e?Ie(e):(C(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class vr extends Bc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Tt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Tt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Tt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function zf(n){return kf(n.auth,new vr(n),n.bypassAuthState)}function Kf(n){const{auth:e,user:t}=n;return C(t,e,"internal-error"),Af(t,new vr(n),n.bypassAuthState)}async function Yf(n){const{auth:e,user:t}=n;return C(t,e,"internal-error"),Sf(t,new vr(n),n.bypassAuthState)}/**
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
 */class Yc{constructor(e,t,i,s,r=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:i,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zf;case"linkViaPopup":case"linkViaRedirect":return Yf;case"reauthViaPopup":case"reauthViaRedirect":return Kf;default:Se(this.auth,"internal-error")}}resolve(e){Ae(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ae(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Qf=new Sn(2e3,1e4);class vt extends Yc{constructor(e,t,i,s,r){super(e,t,s,r),this.provider=i,this.authWindow=null,this.pollId=null,vt.currentPopupAction&&vt.currentPopupAction.cancel(),vt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return C(e,this.auth,"internal-error"),e}async onExecution(){Ae(this.filter.length===1,"Popup operations only handle one event");const e=yr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ge(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ge(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,vt.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ge(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Qf.get())};e()}}vt.currentPopupAction=null;/**
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
 */const Jf="pendingRedirect",ei=new Map;class Xf extends Yc{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=ei.get(this.auth._key());if(!e){try{const i=await Zf(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}ei.set(this.auth._key(),e)}return this.bypassAuthState||ei.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Zf(n,e){const t=nm(e),i=tm(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}function em(n,e){ei.set(n._key(),e)}function tm(n){return Ie(n._redirectPersistence)}function nm(n){return Zn(Jf,n.config.apiKey,n.name)}async function im(n,e,t=!1){if(ce(n.app))return Promise.reject(Ge(n));const i=Vi(n),s=jf(i,e),o=await new Xf(i,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await i._persistUserIfCurrent(o.user),await i._setRedirectUser(null,e)),o}/**
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
 */const sm=600*1e3;class rm{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!om(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Qc(e)){const i=e.error.code?.split("auth/")[1]||"internal-error";t.onError(ge(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=sm&&this.cachedEventUids.clear(),this.cachedEventUids.has(qo(e))}saveEventToCache(e){this.cachedEventUids.add(qo(e)),this.lastProcessedEventTime=Date.now()}}function qo(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Qc({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function om(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Qc(n);default:return!1}}/**
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
 */async function am(n,e={}){return qt(n,"GET","/v1/projects",e)}/**
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
 */const cm=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,lm=/^https?/;async function um(n){if(n.config.emulator)return;const{authorizedDomains:e}=await am(n);for(const t of e)try{if(dm(t))return}catch{}Se(n,"unauthorized-domain")}function dm(n){const e=Os(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===i}if(!lm.test(t))return!1;if(cm.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const hm=new Sn(3e4,6e4);function Ho(){const n=_e().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function pm(n){return new Promise((e,t)=>{function i(){Ho(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ho(),t(ge(n,"network-request-failed"))},timeout:hm.get()})}if(_e().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(_e().gapi?.load)i();else{const s=_f("iframefcb");return _e()[s]=()=>{gapi.load?i():t(ge(n,"network-request-failed"))},mf(`${gf()}?onload=${s}`).catch(r=>t(r))}}).catch(e=>{throw ti=null,e})}let ti=null;function fm(n){return ti=ti||pm(n),ti}/**
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
 */const mm=new Sn(5e3,15e3),gm="__/auth/iframe",_m="emulator/auth/iframe",ym={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},vm=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function bm(n){const e=n.config;C(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?fr(e,_m):`https://${n.config.authDomain}/${gm}`,i={apiKey:e.apiKey,appName:n.name,v:$t},s=vm.get(n.config.apiHost);s&&(i.eid=s);const r=n._getFrameworks();return r.length&&(i.fw=r.join(",")),`${t}?${Ft(i).slice(1)}`}async function wm(n){const e=await fm(n),t=_e().gapi;return C(t,n,"internal-error"),e.open({where:document.body,url:bm(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ym,dontclear:!0},i=>new Promise(async(s,r)=>{await i.restyle({setHideOnLeave:!1});const o=ge(n,"network-request-failed"),a=_e().setTimeout(()=>{r(o)},mm.get());function c(){_e().clearTimeout(a),s(i)}i.ping(c).then(c,()=>{r(o)})}))}/**
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
 */const Im={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Cm=500,Em=600,Tm="_blank",Sm="http://localhost";class Wo{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Am(n,e,t,i=Cm,s=Em){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-i)/2,0).toString();let a="";const c={...Im,width:i.toString(),height:s.toString(),top:r,left:o},l=ee().toLowerCase();t&&(a=Pc(l)?Tm:t),kc(l)&&(e=e||Sm,c.scrollbars="yes");const u=Object.entries(c).reduce((h,[f,_])=>`${h}${f}=${_},`,"");if(af(l)&&a!=="_self")return km(e||"",a),new Wo(null);const d=window.open(e||"",a,u);C(d,n,"popup-blocked");try{d.focus()}catch{}return new Wo(d)}function km(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const Rm="__/auth/handler",Pm="emulator/auth/handler",Mm=encodeURIComponent("fac");async function Vo(n,e,t,i,s,r){C(n.config.authDomain,n,"auth-domain-config-required"),C(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:$t,eventId:s};if(e instanceof Fc){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",Rs(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,d]of Object.entries({}))o[u]=d}if(e instanceof An){const u=e.getScopes().filter(d=>d!=="");u.length>0&&(o.scopes=u.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const c=await n._getAppCheckToken(),l=c?`#${Mm}=${encodeURIComponent(c)}`:"";return`${xm(n)}?${Ft(a).slice(1)}${l}`}function xm({config:n}){return n.emulator?fr(n,Pm):`https://${n.authDomain}/${Rm}`}/**
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
 */const hs="webStorageSupport";class Nm{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Vc,this._completeRedirectFn=im,this._overrideRedirectResult=em}async _openPopup(e,t,i,s){Ae(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const r=await Vo(e,t,i,Os(),s);return Am(e,r,yr())}async _openRedirect(e,t,i,s){await this._originValidation(e);const r=await Vo(e,t,i,Os(),s);return Df(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:r}=this.eventManagers[t];return s?Promise.resolve(s):(Ae(r,"If manager is not set, promise should be"),r)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await wm(e),i=new rm(e);return t.register("authEvent",s=>(C(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(hs,{type:hs},s=>{const r=s?.[0]?.[hs];r!==void 0&&t(!!r),Se(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=um(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Oc()||Rc()||gr()}}const Lm=Nm;var Go="@firebase/auth",jo="1.13.0";/**
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
 */class Om{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){C(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Dm(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Um(n){Mt(new dt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=i.options;C(o&&!o.includes(":"),"invalid-api-key",{appName:i.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Dc(n)},l=new pf(i,s,r,c);return vf(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Mt(new dt("auth-internal",e=>{const t=Vi(e.getProvider("auth").getImmediate());return(i=>new Om(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ve(Go,jo,Dm(n)),Ve(Go,jo,"esm2020")}/**
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
 */const Bm=300,Fm=lc("authIdTokenMaxAge")||Bm;let zo=null;const $m=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>Fm)return;const s=t?.token;zo!==s&&(zo=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function qm(n=gc()){const e=hr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=yf(n,{popupRedirectResolver:Lm,persistence:[Gf,Nf,Vc]}),i=lc("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const r=new URL(i,location.origin);if(location.origin===r.origin){const o=$m(r.toString());Pf(t,o,()=>o(t.currentUser)),Rf(t,a=>o(a))}}const s=ac("auth");return s&&bf(t,`http://${s}`),t}function Hm(){return document.getElementsByTagName("head")?.[0]??document}ff({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const r=ge("internal-error");r.customData=s,t(r)},i.type="text/javascript",i.charset="UTF-8",Hm().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Um("Browser");var Ko={};const Yo="@firebase/database",Qo="1.1.2";/**
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
 */let Jc="";function Wm(n){Jc=n}/**
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
 */class Vm{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),q(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:dn(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class Gm{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Re(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const Xc=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Vm(e)}}catch{}return new Gm},ot=Xc("localStorage"),jm=Xc("sessionStorage");/**
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
 */const St=new ur("@firebase/database"),zm=(function(){let n=1;return function(){return n++}})(),Zc=function(n){const e=xh(n),t=new kh;t.update(e);const i=t.digest();return or.encodeByteArray(i)},Rn=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Rn.apply(null,i):typeof i=="object"?e+=q(i):e+=i,e+=" "}return e};let sn=null,Jo=!0;const Km=function(n,e){v(!0,"Can't turn on custom loggers persistently."),St.logLevel=N.VERBOSE,sn=St.log.bind(St)},X=function(...n){if(Jo===!0&&(Jo=!1,sn===null&&jm.get("logging_enabled")===!0&&Km()),sn){const e=Rn.apply(null,n);sn(e)}},Pn=function(n){return function(...e){X(n,...e)}},Bs=function(...n){const e="FIREBASE INTERNAL ERROR: "+Rn(...n);St.error(e)},ke=function(...n){const e=`FIREBASE FATAL ERROR: ${Rn(...n)}`;throw St.error(e),new Error(e)},se=function(...n){const e="FIREBASE WARNING: "+Rn(...n);St.warn(e)},Ym=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&se("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},el=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Qm=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},xt="[MIN_NAME]",pt="[MAX_NAME]",Ht=function(n,e){if(n===e)return 0;if(n===xt||e===pt)return-1;if(e===xt||n===pt)return 1;{const t=Xo(n),i=Xo(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Jm=function(n,e){return n===e?0:n<e?-1:1},Yt=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+q(e))},br=function(n){if(typeof n!="object"||n===null)return q(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=q(e[i]),t+=":",t+=br(n[e[i]]);return t+="}",t},tl=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function re(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const nl=function(n){v(!el(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,c;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const l=[];for(c=t;c;c-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(c=e;c;c-=1)l.push(r%2?1:0),r=Math.floor(r/2);l.push(s?1:0),l.reverse();const u=l.join("");let d="";for(c=0;c<64;c+=8){let h=parseInt(u.substr(c,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},Xm=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Zm=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function eg(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const tg=new RegExp("^-?(0*)\\d{1,10}$"),ng=-2147483648,ig=2147483647,Xo=function(n){if(tg.test(n)){const e=Number(n);if(e>=ng&&e<=ig)return e}return null},Wt=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw se("Exception was thrown by user callback.",t),e},Math.floor(0))}},sg=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},rn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class rg{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,ce(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.appCheckProvider?.get().then(t=>t.addTokenListener(e))}notifyForInvalidToken(){se(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class og{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(X("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',se(e)}}class ni{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}ni.OWNER="owner";/**
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
 */const wr="5",il="v",sl="s",rl="r",ol="f",al=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,cl="ls",ll="p",Fs="ac",ul="websocket",dl="long_polling";/**
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
 */class hl{constructor(e,t,i,s,r=!1,o="",a=!1,c=!1,l=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=c,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=ot.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&ot.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function ag(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function pl(n,e,t){v(typeof e=="string","typeof type must == string"),v(typeof t=="object","typeof params must == object");let i;if(e===ul)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===dl)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);ag(n)&&(t.ns=n.namespace);const s=[];return re(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
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
 */class cg{constructor(){this.counters_={}}incrementCounter(e,t=1){Re(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return lh(this.counters_)}}/**
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
 */const ps={},fs={};function Ir(n){const e=n.toString();return ps[e]||(ps[e]=new cg),ps[e]}function lg(n,e){const t=n.toString();return fs[t]||(fs[t]=e()),fs[t]}/**
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
 */class ug{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Wt(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Zo="start",dg="close",hg="pLPCommand",pg="pRTLPCB",fl="id",ml="pw",gl="ser",fg="cb",mg="seg",gg="ts",_g="d",yg="dframe",_l=1870,yl=30,vg=_l-yl,bg=25e3,wg=3e4;class bt{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Pn(e),this.stats_=Ir(t),this.urlFn=c=>(this.appCheckToken&&(c[Fs]=this.appCheckToken),pl(t,dl,c))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new ug(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(wg)),Qm(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Cr((...r)=>{const[o,a,c,l,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Zo)this.id=a,this.password=c;else if(o===dg)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[Zo]="t",i[gl]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[fg]=this.scriptTagHolder.uniqueCallbackIdentifier),i[il]=wr,this.transportSessionId&&(i[sl]=this.transportSessionId),this.lastSessionId&&(i[cl]=this.lastSessionId),this.applicationId&&(i[ll]=this.applicationId),this.appCheckToken&&(i[Fs]=this.appCheckToken),typeof location<"u"&&location.hostname&&al.test(location.hostname)&&(i[rl]=ol);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){bt.forceAllow_=!0}static forceDisallow(){bt.forceDisallow_=!0}static isAvailable(){return bt.forceAllow_?!0:!bt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Xm()&&!Zm()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=q(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=rc(t),s=tl(i,vg);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[yg]="t",i[fl]=e,i[ml]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=q(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Cr{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=zm(),window[hg+this.uniqueCallbackIdentifier]=e,window[pg+this.uniqueCallbackIdentifier]=t,this.myIFrame=Cr.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){X("frame writing exception"),a.stack&&X(a.stack),X(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||X("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[fl]=this.myID,e[ml]=this.myPW,e[gl]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+yl+i.length<=_l;){const o=this.pendingSegs.shift();i=i+"&"+mg+s+"="+o.seg+"&"+gg+s+"="+o.ts+"&"+_g+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(bg)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{X("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
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
 */const Ig=16384,Cg=45e3;let vi=null;typeof MozWebSocket<"u"?vi=MozWebSocket:typeof WebSocket<"u"&&(vi=WebSocket);class le{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Pn(this.connId),this.stats_=Ir(t),this.connURL=le.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[il]=wr,typeof location<"u"&&location.hostname&&al.test(location.hostname)&&(o[rl]=ol),t&&(o[sl]=t),i&&(o[cl]=i),s&&(o[Fs]=s),r&&(o[ll]=r),pl(e,ul,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,ot.set("previous_websocket_failure",!0);try{let i;bh(),this.mySock=new vi(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){le.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&vi!==null&&!le.forceDisallow_}static previouslyFailed(){return ot.isInMemoryStorage||ot.get("previous_websocket_failure")===!0}markConnectionHealthy(){ot.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=dn(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(v(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=q(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=tl(t,Ig);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Cg))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}le.responsesRequiredToBeHealthy=2;le.healthyTimeout=3e4;/**
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
 */class fn{static get ALL_TRANSPORTS(){return[bt,le]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=le&&le.isAvailable();let i=t&&!le.previouslyFailed();if(e.webSocketOnly&&(t||se("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[le];else{const s=this.transports_=[];for(const r of fn.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);fn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}fn.globalTransportInitialized_=!1;/**
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
 */const Eg=6e4,Tg=5e3,Sg=10*1024,Ag=100*1024,ms="t",ea="d",kg="s",ta="r",Rg="e",na="o",ia="a",sa="n",ra="p",Pg="h";class Mg{constructor(e,t,i,s,r,o,a,c,l,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=c,this.onKill_=l,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Pn("c:"+this.id+":"),this.transportManager_=new fn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=rn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Ag?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Sg?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ms in e){const t=e[ms];t===ia?this.upgradeIfSecondaryHealthy_():t===ta?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===na&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Yt("t",e),i=Yt("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:ra,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:ia,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:sa,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Yt("t",e),i=Yt("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Yt(ms,e);if(ea in e){const i=e[ea];if(t===Pg){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===sa){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===kg?this.onConnectionShutdown_(i):t===ta?this.onReset_(i):t===Rg?Bs("Server Error: "+i):t===na?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Bs("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),wr!==i&&se("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),rn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Eg))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):rn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Tg))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:ra,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(ot.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class vl{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class bl{constructor(e){this.allowedEvents_=e,this.listeners_={},v(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){v(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class bi extends bl{static getInstance(){return new bi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!cr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return v(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const oa=32,aa=768;class L{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function P(){return new L("")}function A(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Ye(n){return n.pieces_.length-n.pieceNum_}function O(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new L(n.pieces_,e)}function wl(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function xg(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Il(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Cl(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new L(e,0)}function H(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof L)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new L(t,0)}function S(n){return n.pieceNum_>=n.pieces_.length}function Z(n,e){const t=A(n),i=A(e);if(t===null)return e;if(t===i)return Z(O(n),O(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function El(n,e){if(Ye(n)!==Ye(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function de(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(Ye(n)>Ye(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class Ng{constructor(e,t){this.errorPrefix_=t,this.parts_=Il(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Hi(this.parts_[i]);Tl(this)}}function Lg(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Hi(e),Tl(n)}function Og(n){const e=n.parts_.pop();n.byteLength_-=Hi(e),n.parts_.length>0&&(n.byteLength_-=1)}function Tl(n){if(n.byteLength_>aa)throw new Error(n.errorPrefix_+"has a key path longer than "+aa+" bytes ("+n.byteLength_+").");if(n.parts_.length>oa)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+oa+") or object contains a cycle "+st(n))}function st(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class Er extends bl{static getInstance(){return new Er}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return v(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Qt=1e3,Dg=300*1e3,ca=30*1e3,Ug=1.3,Bg=3e4,Fg="server_kill",la=3;class Ee extends vl{constructor(e,t,i,s,r,o,a,c){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=c,this.id=Ee.nextPersistentConnectionId_++,this.log_=Pn("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Qt,this.maxReconnectDelay_=Dg,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,c)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Er.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&bi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(q(r)),v(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new qi,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),v(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),v(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const c=a.d,l=a.s;Ee.warnOnListenWarnings_(c,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),l!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(l,c))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Re(e,"w")){const i=Pt(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();se(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Ah(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=ca)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Sh(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),v(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+q(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Bs("Unrecognized action received from server: "+q(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){v(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Qt,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Qt,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Bg&&(this.reconnectDelay_=Qt),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Ug)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Ee.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const c=function(){a?a.close():(o=!0,i())},l=function(d){v(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:c,sendRequest:l};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?X("getToken() completed but was canceled"):(X("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new Mg(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,f=>{se(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(Fg)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&se(d),c())}}}interrupt(e){X("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){X("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Rs(this.interruptReasons_)&&(this.reconnectDelay_=Qt,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>br(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new L(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){X("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=la&&(this.reconnectDelay_=ca,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){X("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=la&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Jc.replace(/\./g,"-")]=1,cr()?e["framework.cordova"]=1:uc()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=bi.getInstance().currentlyOnline();return Rs(this.interruptReasons_)&&e}}Ee.nextPersistentConnectionId_=0;Ee.nextConnectionId_=0;/**
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
 */class T{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new T(e,t)}}/**
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
 */class zi{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new T(xt,e),s=new T(xt,t);return this.compare(i,s)!==0}minPost(){return T.MIN}}/**
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
 */let Wn;class Sl extends zi{static get __EMPTY_NODE(){return Wn}static set __EMPTY_NODE(e){Wn=e}compare(e,t){return Ht(e.name,t.name)}isDefinedOn(e){throw Bt("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return T.MIN}maxPost(){return new T(pt,Wn)}makePost(e,t){return v(typeof e=="string","KeyIndex indexValue must always be a string."),new T(e,Wn)}toString(){return".key"}}const At=new Sl;/**
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
 */class Vn{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class V{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??V.RED,this.left=s??ie.EMPTY_NODE,this.right=r??ie.EMPTY_NODE}copy(e,t,i,s,r){return new V(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return ie.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return ie.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,V.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,V.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}V.RED=!0;V.BLACK=!1;class $g{copy(e,t,i,s,r){return this}insert(e,t,i){return new V(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class ie{constructor(e,t=ie.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new ie(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,V.BLACK,null,null))}remove(e){return new ie(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,V.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Vn(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Vn(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Vn(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Vn(this.root_,null,this.comparator_,!0,e)}}ie.EMPTY_NODE=new $g;/**
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
 */function qg(n,e){return Ht(n.name,e.name)}function Tr(n,e){return Ht(n,e)}/**
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
 */let $s;function Hg(n){$s=n}const Al=function(n){return typeof n=="number"?"number:"+nl(n):"string:"+n},kl=function(n){if(n.isLeafNode()){const e=n.val();v(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Re(e,".sv"),"Priority must be a string or number.")}else v(n===$s||n.isEmpty(),"priority of unexpected type.");v(n===$s||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let ua;class W{static set __childrenNodeConstructor(e){ua=e}static get __childrenNodeConstructor(){return ua}constructor(e,t=W.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,v(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),kl(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new W(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:W.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return S(e)?this:A(e)===".priority"?this.priorityNode_:W.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:W.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=A(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(v(i!==".priority"||Ye(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,W.__childrenNodeConstructor.EMPTY_NODE.updateChild(O(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Al(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=nl(this.value_):e+=this.value_,this.lazyHash_=Zc(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===W.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof W.__childrenNodeConstructor?-1:(v(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=W.VALUE_TYPE_ORDER.indexOf(t),r=W.VALUE_TYPE_ORDER.indexOf(i);return v(s>=0,"Unknown leaf type: "+t),v(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}W.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Rl,Pl;function Wg(n){Rl=n}function Vg(n){Pl=n}class Gg extends zi{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Ht(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return T.MIN}maxPost(){return new T(pt,new W("[PRIORITY-POST]",Pl))}makePost(e,t){const i=Rl(e);return new T(t,new W("[PRIORITY-POST]",i))}toString(){return".priority"}}const $=new Gg;/**
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
 */const jg=Math.log(2);class zg{constructor(e){const t=r=>parseInt(Math.log(r)/jg,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const wi=function(n,e,t,i){n.sort(e);const s=function(c,l){const u=l-c;let d,h;if(u===0)return null;if(u===1)return d=n[c],h=t?t(d):d,new V(h,d.node,V.BLACK,null,null);{const f=parseInt(u/2,10)+c,_=s(c,f),g=s(f+1,l);return d=n[f],h=t?t(d):d,new V(h,d.node,V.BLACK,_,g)}},r=function(c){let l=null,u=null,d=n.length;const h=function(_,g){const m=d-_,I=d;d-=_;const k=s(m+1,I),x=n[m],D=t?t(x):x;f(new V(D,x.node,g,null,k))},f=function(_){l?(l.left=_,l=_):(u=_,l=_)};for(let _=0;_<c.count;++_){const g=c.nextBitIsOne(),m=Math.pow(2,c.count-(_+1));g?h(m,V.BLACK):(h(m,V.BLACK),h(m,V.RED))}return u},o=new zg(n.length),a=r(o);return new ie(i||e,a)};/**
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
 */let gs;const yt={};class Ce{static get Default(){return v(yt&&$,"ChildrenNode.ts has not been loaded"),gs=gs||new Ce({".priority":yt},{".priority":$}),gs}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=Pt(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof ie?t:null}hasIndex(e){return Re(this.indexSet_,e.toString())}addIndex(e,t){v(e!==At,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(T.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=wi(i,e.getCompare()):a=yt;const c=e.toString(),l={...this.indexSet_};l[c]=e;const u={...this.indexes_};return u[c]=a,new Ce(u,l)}addToIndexes(e,t){const i=di(this.indexes_,(s,r)=>{const o=Pt(this.indexSet_,r);if(v(o,"Missing index implementation for "+r),s===yt)if(o.isDefinedOn(e.node)){const a=[],c=t.getIterator(T.Wrap);let l=c.getNext();for(;l;)l.name!==e.name&&a.push(l),l=c.getNext();return a.push(e),wi(a,o.getCompare())}else return yt;else{const a=t.get(e.name);let c=s;return a&&(c=c.remove(new T(e.name,a))),c.insert(e,e.node)}});return new Ce(i,this.indexSet_)}removeFromIndexes(e,t){const i=di(this.indexes_,s=>{if(s===yt)return s;{const r=t.get(e.name);return r?s.remove(new T(e.name,r)):s}});return new Ce(i,this.indexSet_)}}/**
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
 */let Jt;class b{static get EMPTY_NODE(){return Jt||(Jt=new b(new ie(Tr),null,Ce.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&kl(this.priorityNode_),this.children_.isEmpty()&&v(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Jt}updatePriority(e){return this.children_.isEmpty()?this:new b(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Jt:t}}getChild(e){const t=A(e);return t===null?this:this.getImmediateChild(t).getChild(O(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(v(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new T(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Jt:this.priorityNode_;return new b(s,o,r)}}updateChild(e,t){const i=A(e);if(i===null)return t;{v(A(e)!==".priority"||Ye(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(O(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild($,(o,a)=>{t[o]=a.val(e),i++,r&&b.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Al(this.getPriority().val())+":"),this.forEachChild($,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":Zc(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new T(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new T(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new T(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,T.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,T.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Mn?-1:0}withIndex(e){if(e===At||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new b(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===At||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator($),s=t.getIterator($);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===At?null:this.indexMap_.get(e.toString())}}b.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Kg extends b{constructor(){super(new ie(Tr),b.EMPTY_NODE,Ce.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return b.EMPTY_NODE}isEmpty(){return!1}}const Mn=new Kg;Object.defineProperties(T,{MIN:{value:new T(xt,b.EMPTY_NODE)},MAX:{value:new T(pt,Mn)}});Sl.__EMPTY_NODE=b.EMPTY_NODE;W.__childrenNodeConstructor=b;Hg(Mn);Vg(Mn);/**
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
 */const Yg=!0;function j(n,e=null){if(n===null)return b.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),v(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new W(t,j(e))}if(!(n instanceof Array)&&Yg){const t=[];let i=!1;if(re(n,(o,a)=>{if(o.substring(0,1)!=="."){const c=j(a);c.isEmpty()||(i=i||!c.getPriority().isEmpty(),t.push(new T(o,c)))}}),t.length===0)return b.EMPTY_NODE;const r=wi(t,qg,o=>o.name,Tr);if(i){const o=wi(t,$.getCompare());return new b(r,j(e),new Ce({".priority":o},{".priority":$}))}else return new b(r,j(e),Ce.Default)}else{let t=b.EMPTY_NODE;return re(n,(i,s)=>{if(Re(n,i)&&i.substring(0,1)!=="."){const r=j(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(j(e))}}Wg(j);/**
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
 */class Qg extends zi{constructor(e){super(),this.indexPath_=e,v(!S(e)&&A(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Ht(e.name,t.name):r}makePost(e,t){const i=j(e),s=b.EMPTY_NODE.updateChild(this.indexPath_,i);return new T(t,s)}maxPost(){const e=b.EMPTY_NODE.updateChild(this.indexPath_,Mn);return new T(pt,e)}toString(){return Il(this.indexPath_,0).join("/")}}/**
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
 */class Jg extends zi{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Ht(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return T.MIN}maxPost(){return T.MAX}makePost(e,t){const i=j(e);return new T(t,i)}toString(){return".value"}}const Xg=new Jg;/**
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
 */function Ml(n){return{type:"value",snapshotNode:n}}function Nt(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function mn(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function gn(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Zg(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class Sr{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){v(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(mn(t,a)):v(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Nt(t,i)):o.trackChildChange(gn(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild($,(s,r)=>{t.hasChild(s)||i.trackChildChange(mn(s,r))}),t.isLeafNode()||t.forEachChild($,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(gn(s,r,o))}else i.trackChildChange(Nt(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?b.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class _n{constructor(e){this.indexedFilter_=new Sr(e.getIndex()),this.index_=e.getIndex(),this.startPost_=_n.getStartPost_(e),this.endPost_=_n.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new T(t,i))||(i=b.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=b.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(b.EMPTY_NODE);const r=this;return t.forEachChild($,(o,a)=>{r.matches(new T(o,a))||(s=s.updateImmediateChild(o,b.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class e_{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new _n(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new T(t,i))||(i=b.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=b.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=b.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(b.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,b.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,f)=>d(f,h)}else o=this.index_.getCompare();const a=e;v(a.numChildren()===this.limit_,"");const c=new T(t,i),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(c);if(a.hasChild(t)){const d=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,l,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const f=h==null?1:o(h,c);if(u&&!i.isEmpty()&&f>=0)return r?.trackChildChange(gn(t,i,d)),a.updateImmediateChild(t,i);{r?.trackChildChange(mn(t,d));const g=a.updateImmediateChild(t,b.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r?.trackChildChange(Nt(h.name,h.node)),g.updateImmediateChild(h.name,h.node)):g}}else return i.isEmpty()?e:u&&o(l,c)>=0?(r!=null&&(r.trackChildChange(mn(l.name,l.node)),r.trackChildChange(Nt(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(l.name,b.EMPTY_NODE)):e}}/**
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
 */class Ar{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=$}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return v(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return v(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:xt}hasEnd(){return this.endSet_}getIndexEndValue(){return v(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return v(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:pt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return v(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===$}copy(){const e=new Ar;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function t_(n){return n.loadsAllData()?new Sr(n.getIndex()):n.hasLimit()?new e_(n):new _n(n)}function da(n){const e={};if(n.isDefault())return e;let t;if(n.index_===$?t="$priority":n.index_===Xg?t="$value":n.index_===At?t="$key":(v(n.index_ instanceof Qg,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=q(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=q(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+q(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=q(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+q(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function ha(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==$&&(e.i=n.index_.toString()),e}/**
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
 */class Ii extends vl{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(v(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Pn("p:rest:"),this.listens_={}}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Ii.getListenId_(e,i),a={};this.listens_[o]=a;const c=da(e._queryParams);this.restRequest_(r+".json",c,(l,u)=>{let d=u;if(l===404&&(d=null,l=null),l===null&&this.onDataUpdate_(r,d,!1,i),Pt(this.listens_,o)===a){let h;l?l===401?h="permission_denied":h="rest_error:"+l:h="ok",s(h,null)}})}unlisten(e,t){const i=Ii.getListenId_(e,t);delete this.listens_[i]}get(e){const t=da(e._queryParams),i=e._path.toString(),s=new qi;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ft(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let c=null;if(a.status>=200&&a.status<300){try{c=dn(a.responseText)}catch{se("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,c)}else a.status!==401&&a.status!==404&&se("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class n_{constructor(){this.rootNode_=b.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function Ci(){return{value:null,children:new Map}}function xl(n,e,t){if(S(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=A(e);n.children.has(i)||n.children.set(i,Ci());const s=n.children.get(i);e=O(e),xl(s,e,t)}}function qs(n,e,t){n.value!==null?t(e,n.value):i_(n,(i,s)=>{const r=new L(e.toString()+"/"+i);qs(s,r,t)})}function i_(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
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
 */class s_{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&re(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
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
 */const pa=10*1e3,r_=30*1e3,o_=300*1e3;class a_{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new s_(e);const i=pa+(r_-pa)*Math.random();rn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;re(e,(s,r)=>{r>0&&Re(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),rn(this.reportStats_.bind(this),Math.floor(Math.random()*2*o_))}}/**
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
 */var he;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(he||(he={}));function Nl(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function kr(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Rr(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class Ei{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=he.ACK_USER_WRITE,this.source=Nl()}operationForChild(e){if(S(this.path)){if(this.affectedTree.value!=null)return v(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new L(e));return new Ei(P(),t,this.revert)}}else return v(A(this.path)===e,"operationForChild called for unrelated child."),new Ei(O(this.path),this.affectedTree,this.revert)}}/**
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
 */class yn{constructor(e,t){this.source=e,this.path=t,this.type=he.LISTEN_COMPLETE}operationForChild(e){return S(this.path)?new yn(this.source,P()):new yn(this.source,O(this.path))}}/**
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
 */class ft{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=he.OVERWRITE}operationForChild(e){return S(this.path)?new ft(this.source,P(),this.snap.getImmediateChild(e)):new ft(this.source,O(this.path),this.snap)}}/**
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
 */class vn{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=he.MERGE}operationForChild(e){if(S(this.path)){const t=this.children.subtree(new L(e));return t.isEmpty()?null:t.value?new ft(this.source,P(),t.value):new vn(this.source,P(),t)}else return v(A(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new vn(this.source,O(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Qe{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(S(e))return this.isFullyInitialized()&&!this.filtered_;const t=A(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class c_{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function l_(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Zg(o.childName,o.snapshotNode))}),Xt(n,s,"child_removed",e,i,t),Xt(n,s,"child_added",e,i,t),Xt(n,s,"child_moved",r,i,t),Xt(n,s,"child_changed",e,i,t),Xt(n,s,"value",e,i,t),s}function Xt(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,c)=>d_(n,a,c)),o.forEach(a=>{const c=u_(n,a,r);s.forEach(l=>{l.respondsTo(a.type)&&e.push(l.createEvent(c,n.query_))})})}function u_(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function d_(n,e,t){if(e.childName==null||t.childName==null)throw Bt("Should only compare child_ events.");const i=new T(e.childName,e.snapshotNode),s=new T(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
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
 */function Ki(n,e){return{eventCache:n,serverCache:e}}function on(n,e,t,i){return Ki(new Qe(e,t,i),n.serverCache)}function Ll(n,e,t,i){return Ki(n.eventCache,new Qe(e,t,i))}function Ti(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function mt(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let _s;const h_=()=>(_s||(_s=new ie(Jm)),_s);class U{static fromObject(e){let t=new U(null);return re(e,(i,s)=>{t=t.set(new L(i),s)}),t}constructor(e,t=h_()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:P(),value:this.value};if(S(e))return null;{const i=A(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(O(e),t);return r!=null?{path:H(new L(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(S(e))return this;{const t=A(e),i=this.children.get(t);return i!==null?i.subtree(O(e)):new U(null)}}set(e,t){if(S(e))return new U(t,this.children);{const i=A(e),r=(this.children.get(i)||new U(null)).set(O(e),t),o=this.children.insert(i,r);return new U(this.value,o)}}remove(e){if(S(e))return this.children.isEmpty()?new U(null):new U(null,this.children);{const t=A(e),i=this.children.get(t);if(i){const s=i.remove(O(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new U(null):new U(this.value,r)}else return this}}get(e){if(S(e))return this.value;{const t=A(e),i=this.children.get(t);return i?i.get(O(e)):null}}setTree(e,t){if(S(e))return t;{const i=A(e),r=(this.children.get(i)||new U(null)).setTree(O(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new U(this.value,o)}}fold(e){return this.fold_(P(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(H(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,P(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(S(e))return null;{const r=A(e),o=this.children.get(r);return o?o.findOnPath_(O(e),H(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,P(),t)}foreachOnPath_(e,t,i){if(S(e))return this;{this.value&&i(t,this.value);const s=A(e),r=this.children.get(s);return r?r.foreachOnPath_(O(e),H(t,s),i):new U(null)}}foreach(e){this.foreach_(P(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(H(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
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
 */class fe{constructor(e){this.writeTree_=e}static empty(){return new fe(new U(null))}}function an(n,e,t){if(S(e))return new fe(new U(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=Z(s,e);return r=r.updateChild(o,t),new fe(n.writeTree_.set(s,r))}else{const s=new U(t),r=n.writeTree_.setTree(e,s);return new fe(r)}}}function fa(n,e,t){let i=n;return re(t,(s,r)=>{i=an(i,H(e,s),r)}),i}function ma(n,e){if(S(e))return fe.empty();{const t=n.writeTree_.setTree(e,new U(null));return new fe(t)}}function Hs(n,e){return gt(n,e)!=null}function gt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(Z(t.path,e)):null}function ga(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild($,(i,s)=>{e.push(new T(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new T(i,s.value))}),e}function je(n,e){if(S(e))return n;{const t=gt(n,e);return t!=null?new fe(new U(t)):new fe(n.writeTree_.subtree(e))}}function Ws(n){return n.writeTree_.isEmpty()}function Lt(n,e){return Ol(P(),n.writeTree_,e)}function Ol(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(v(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=Ol(H(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(H(n,".priority"),i)),t}}/**
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
 */function Yi(n,e){return Fl(e,n)}function p_(n,e,t,i,s){v(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=an(n.visibleWrites,e,t)),n.lastWriteId=i}function f_(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function m_(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);v(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&g_(a,i.path)?s=!1:de(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return __(n),!0;if(i.snap)n.visibleWrites=ma(n.visibleWrites,i.path);else{const a=i.children;re(a,c=>{n.visibleWrites=ma(n.visibleWrites,H(i.path,c))})}return!0}else return!1}function g_(n,e){if(n.snap)return de(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&de(H(n.path,t),e))return!0;return!1}function __(n){n.visibleWrites=Dl(n.allWrites,y_,P()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function y_(n){return n.visible}function Dl(n,e,t){let i=fe.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)de(t,o)?(a=Z(t,o),i=an(i,a,r.snap)):de(o,t)&&(a=Z(o,t),i=an(i,P(),r.snap.getChild(a)));else if(r.children){if(de(t,o))a=Z(t,o),i=fa(i,a,r.children);else if(de(o,t))if(a=Z(o,t),S(a))i=fa(i,P(),r.children);else{const c=Pt(r.children,A(a));if(c){const l=c.getChild(O(a));i=an(i,P(),l)}}}else throw Bt("WriteRecord should have .snap or .children")}}return i}function Ul(n,e,t,i,s){if(!i&&!s){const r=gt(n.visibleWrites,e);if(r!=null)return r;{const o=je(n.visibleWrites,e);if(Ws(o))return t;if(t==null&&!Hs(o,P()))return null;{const a=t||b.EMPTY_NODE;return Lt(o,a)}}}else{const r=je(n.visibleWrites,e);if(!s&&Ws(r))return t;if(!s&&t==null&&!Hs(r,P()))return null;{const o=function(l){return(l.visible||s)&&(!i||!~i.indexOf(l.writeId))&&(de(l.path,e)||de(e,l.path))},a=Dl(n.allWrites,o,e),c=t||b.EMPTY_NODE;return Lt(a,c)}}}function v_(n,e,t){let i=b.EMPTY_NODE;const s=gt(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild($,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=je(n.visibleWrites,e);return t.forEachChild($,(o,a)=>{const c=Lt(je(r,new L(o)),a);i=i.updateImmediateChild(o,c)}),ga(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=je(n.visibleWrites,e);return ga(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function b_(n,e,t,i,s){v(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=H(e,t);if(Hs(n.visibleWrites,r))return null;{const o=je(n.visibleWrites,r);return Ws(o)?s.getChild(t):Lt(o,s.getChild(t))}}function w_(n,e,t,i){const s=H(e,t),r=gt(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=je(n.visibleWrites,s);return Lt(o,i.getNode().getImmediateChild(t))}else return null}function I_(n,e){return gt(n.visibleWrites,e)}function C_(n,e,t,i,s,r,o){let a;const c=je(n.visibleWrites,e),l=gt(c,P());if(l!=null)a=l;else if(t!=null)a=Lt(c,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let f=h.getNext();for(;f&&u.length<s;)d(f,i)!==0&&u.push(f),f=h.getNext();return u}else return[]}function E_(){return{visibleWrites:fe.empty(),allWrites:[],lastWriteId:-1}}function Si(n,e,t,i){return Ul(n.writeTree,n.treePath,e,t,i)}function Pr(n,e){return v_(n.writeTree,n.treePath,e)}function _a(n,e,t,i){return b_(n.writeTree,n.treePath,e,t,i)}function Ai(n,e){return I_(n.writeTree,H(n.treePath,e))}function T_(n,e,t,i,s,r){return C_(n.writeTree,n.treePath,e,t,i,s,r)}function Mr(n,e,t){return w_(n.writeTree,n.treePath,e,t)}function Bl(n,e){return Fl(H(n.treePath,e),n.writeTree)}function Fl(n,e){return{treePath:n,writeTree:e}}/**
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
 */class S_{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;v(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),v(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,gn(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,mn(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Nt(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,gn(i,e.snapshotNode,s.oldSnap));else throw Bt("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class A_{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const $l=new A_;class xr{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new Qe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Mr(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:mt(this.viewCache_),r=T_(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
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
 */function k_(n){return{filter:n}}function R_(n,e){v(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),v(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function P_(n,e,t,i,s){const r=new S_;let o,a;if(t.type===he.OVERWRITE){const l=t;l.source.fromUser?o=Vs(n,e,l.path,l.snap,i,s,r):(v(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered()&&!S(l.path),o=ki(n,e,l.path,l.snap,i,s,a,r))}else if(t.type===he.MERGE){const l=t;l.source.fromUser?o=x_(n,e,l.path,l.children,i,s,r):(v(l.source.fromServer,"Unknown source."),a=l.source.tagged||e.serverCache.isFiltered(),o=Gs(n,e,l.path,l.children,i,s,a,r))}else if(t.type===he.ACK_USER_WRITE){const l=t;l.revert?o=O_(n,e,l.path,i,s,r):o=N_(n,e,l.path,l.affectedTree,i,s,r)}else if(t.type===he.LISTEN_COMPLETE)o=L_(n,e,t.path,i,r);else throw Bt("Unknown operation type: "+t.type);const c=r.getChanges();return M_(e,o,c),{viewCache:o,changes:c}}function M_(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Ti(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Ml(Ti(e)))}}function ql(n,e,t,i,s,r){const o=e.eventCache;if(Ai(i,t)!=null)return e;{let a,c;if(S(t))if(v(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const l=mt(e),u=l instanceof b?l:b.EMPTY_NODE,d=Pr(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const l=Si(i,mt(e));a=n.filter.updateFullNode(e.eventCache.getNode(),l,r)}else{const l=A(t);if(l===".priority"){v(Ye(t)===1,"Can't have a priority with additional path components");const u=o.getNode();c=e.serverCache.getNode();const d=_a(i,t,u,c);d!=null?a=n.filter.updatePriority(u,d):a=o.getNode()}else{const u=O(t);let d;if(o.isCompleteForChild(l)){c=e.serverCache.getNode();const h=_a(i,t,o.getNode(),c);h!=null?d=o.getNode().getImmediateChild(l).updateChild(u,h):d=o.getNode().getImmediateChild(l)}else d=Mr(i,l,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),l,d,u,s,r):a=o.getNode()}}return on(e,a,o.isFullyInitialized()||S(t),n.filter.filtersNodes())}}function ki(n,e,t,i,s,r,o,a){const c=e.serverCache;let l;const u=o?n.filter:n.filter.getIndexedFilter();if(S(t))l=u.updateFullNode(c.getNode(),i,null);else if(u.filtersNodes()&&!c.isFiltered()){const f=c.getNode().updateChild(t,i);l=u.updateFullNode(c.getNode(),f,null)}else{const f=A(t);if(!c.isCompleteForPath(t)&&Ye(t)>1)return e;const _=O(t),m=c.getNode().getImmediateChild(f).updateChild(_,i);f===".priority"?l=u.updatePriority(c.getNode(),m):l=u.updateChild(c.getNode(),f,m,_,$l,null)}const d=Ll(e,l,c.isFullyInitialized()||S(t),u.filtersNodes()),h=new xr(s,d,r);return ql(n,d,t,s,h,a)}function Vs(n,e,t,i,s,r,o){const a=e.eventCache;let c,l;const u=new xr(s,e,r);if(S(t))l=n.filter.updateFullNode(e.eventCache.getNode(),i,o),c=on(e,l,!0,n.filter.filtersNodes());else{const d=A(t);if(d===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),i),c=on(e,l,a.isFullyInitialized(),a.isFiltered());else{const h=O(t),f=a.getNode().getImmediateChild(d);let _;if(S(h))_=i;else{const g=u.getCompleteChild(d);g!=null?wl(h)===".priority"&&g.getChild(Cl(h)).isEmpty()?_=g:_=g.updateChild(h,i):_=b.EMPTY_NODE}if(f.equals(_))c=e;else{const g=n.filter.updateChild(a.getNode(),d,_,h,u,o);c=on(e,g,a.isFullyInitialized(),n.filter.filtersNodes())}}}return c}function ya(n,e){return n.eventCache.isCompleteForChild(e)}function x_(n,e,t,i,s,r,o){let a=e;return i.foreach((c,l)=>{const u=H(t,c);ya(e,A(u))&&(a=Vs(n,a,u,l,s,r,o))}),i.foreach((c,l)=>{const u=H(t,c);ya(e,A(u))||(a=Vs(n,a,u,l,s,r,o))}),a}function va(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Gs(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let c=e,l;S(t)?l=i:l=new U(null).setTree(t,i);const u=e.serverCache.getNode();return l.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const f=e.serverCache.getNode().getImmediateChild(d),_=va(n,f,h);c=ki(n,c,new L(d),_,s,r,o,a)}}),l.children.inorderTraversal((d,h)=>{const f=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!f){const _=e.serverCache.getNode().getImmediateChild(d),g=va(n,_,h);c=ki(n,c,new L(d),g,s,r,o,a)}}),c}function N_(n,e,t,i,s,r,o){if(Ai(s,t)!=null)return e;const a=e.serverCache.isFiltered(),c=e.serverCache;if(i.value!=null){if(S(t)&&c.isFullyInitialized()||c.isCompleteForPath(t))return ki(n,e,t,c.getNode().getChild(t),s,r,a,o);if(S(t)){let l=new U(null);return c.getNode().forEachChild(At,(u,d)=>{l=l.set(new L(u),d)}),Gs(n,e,t,l,s,r,a,o)}else return e}else{let l=new U(null);return i.foreach((u,d)=>{const h=H(t,u);c.isCompleteForPath(h)&&(l=l.set(u,c.getNode().getChild(h)))}),Gs(n,e,t,l,s,r,a,o)}}function L_(n,e,t,i,s){const r=e.serverCache,o=Ll(e,r.getNode(),r.isFullyInitialized()||S(t),r.isFiltered());return ql(n,o,t,i,$l,s)}function O_(n,e,t,i,s,r){let o;if(Ai(i,t)!=null)return e;{const a=new xr(i,e,s),c=e.eventCache.getNode();let l;if(S(t)||A(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Si(i,mt(e));else{const d=e.serverCache.getNode();v(d instanceof b,"serverChildren would be complete if leaf node"),u=Pr(i,d)}u=u,l=n.filter.updateFullNode(c,u,r)}else{const u=A(t);let d=Mr(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=c.getImmediateChild(u)),d!=null?l=n.filter.updateChild(c,u,d,O(t),a,r):e.eventCache.getNode().hasChild(u)?l=n.filter.updateChild(c,u,b.EMPTY_NODE,O(t),a,r):l=c,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Si(i,mt(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,r)))}return o=e.serverCache.isFullyInitialized()||Ai(i,P())!=null,on(e,l,o,n.filter.filtersNodes())}}/**
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
 */class D_{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Sr(i.getIndex()),r=t_(i);this.processor_=k_(r);const o=t.serverCache,a=t.eventCache,c=s.updateFullNode(b.EMPTY_NODE,o.getNode(),null),l=r.updateFullNode(b.EMPTY_NODE,a.getNode(),null),u=new Qe(c,o.isFullyInitialized(),s.filtersNodes()),d=new Qe(l,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Ki(d,u),this.eventGenerator_=new c_(this.query_)}get query(){return this.query_}}function U_(n){return n.viewCache_.serverCache.getNode()}function B_(n){return Ti(n.viewCache_)}function F_(n,e){const t=mt(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!S(e)&&!t.getImmediateChild(A(e)).isEmpty())?t.getChild(e):null}function ba(n){return n.eventRegistrations_.length===0}function $_(n,e){n.eventRegistrations_.push(e)}function wa(n,e,t){const i=[];if(t){v(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Ia(n,e,t,i){e.type===he.MERGE&&e.source.queryId!==null&&(v(mt(n.viewCache_),"We should always have a full cache before handling merges"),v(Ti(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=P_(n.processor_,s,e,t,i);return R_(n.processor_,r.viewCache),v(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Hl(n,r.changes,r.viewCache.eventCache.getNode(),null)}function q_(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild($,(r,o)=>{i.push(Nt(r,o))}),t.isFullyInitialized()&&i.push(Ml(t.getNode())),Hl(n,i,t.getNode(),e)}function Hl(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return l_(n.eventGenerator_,e,t,s)}/**
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
 */let Ri;class Wl{constructor(){this.views=new Map}}function H_(n){v(!Ri,"__referenceConstructor has already been defined"),Ri=n}function W_(){return v(Ri,"Reference.ts has not been loaded"),Ri}function V_(n){return n.views.size===0}function Nr(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return v(r!=null,"SyncTree gave us an op for an invalid query."),Ia(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Ia(o,e,t,i));return r}}function Vl(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Si(t,s?i:null),c=!1;a?c=!0:i instanceof b?(a=Pr(t,i),c=!1):(a=b.EMPTY_NODE,c=!1);const l=Ki(new Qe(a,c,!1),new Qe(i,s,!1));return new D_(e,l)}return o}function G_(n,e,t,i,s,r){const o=Vl(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),$_(o,t),q_(o,t)}function j_(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=Je(n);if(s==="default")for(const[c,l]of n.views.entries())o=o.concat(wa(l,t,i)),ba(l)&&(n.views.delete(c),l.query._queryParams.loadsAllData()||r.push(l.query));else{const c=n.views.get(s);c&&(o=o.concat(wa(c,t,i)),ba(c)&&(n.views.delete(s),c.query._queryParams.loadsAllData()||r.push(c.query)))}return a&&!Je(n)&&r.push(new(W_())(e._repo,e._path)),{removed:r,events:o}}function Gl(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ze(n,e){let t=null;for(const i of n.views.values())t=t||F_(i,e);return t}function jl(n,e){if(e._queryParams.loadsAllData())return Qi(n);{const i=e._queryIdentifier;return n.views.get(i)}}function zl(n,e){return jl(n,e)!=null}function Je(n){return Qi(n)!=null}function Qi(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Pi;function z_(n){v(!Pi,"__referenceConstructor has already been defined"),Pi=n}function K_(){return v(Pi,"Reference.ts has not been loaded"),Pi}let Y_=1;class Ca{constructor(e){this.listenProvider_=e,this.syncPointTree_=new U(null),this.pendingWriteTree_=E_(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Kl(n,e,t,i,s){return p_(n.pendingWriteTree_,e,t,i,s),s?Nn(n,new ft(Nl(),e,t)):[]}function at(n,e,t=!1){const i=f_(n.pendingWriteTree_,e);if(m_(n.pendingWriteTree_,e)){let r=new U(null);return i.snap!=null?r=r.set(P(),!0):re(i.children,o=>{r=r.set(new L(o),!0)}),Nn(n,new Ei(i.path,r,t))}else return[]}function xn(n,e,t){return Nn(n,new ft(kr(),e,t))}function Q_(n,e,t){const i=U.fromObject(t);return Nn(n,new vn(kr(),e,i))}function J_(n,e){return Nn(n,new yn(kr(),e))}function X_(n,e,t){const i=Or(n,t);if(i){const s=Dr(i),r=s.path,o=s.queryId,a=Z(r,e),c=new yn(Rr(o),a);return Ur(n,r,c)}else return[]}function Yl(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||zl(o,e))){const c=j_(o,e,t,i);V_(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const l=c.removed;if(a=c.events,!s){const u=l.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(h,f)=>Je(f));if(u&&!d){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const f=ny(h);for(let _=0;_<f.length;++_){const g=f[_],m=g.query,I=Zl(n,g);n.listenProvider_.startListening(cn(m),bn(n,m),I.hashFn,I.onComplete)}}}!d&&l.length>0&&!i&&(u?n.listenProvider_.stopListening(cn(e),null):l.forEach(h=>{const f=n.queryToTagMap.get(Ji(h));n.listenProvider_.stopListening(cn(h),f)}))}iy(n,l)}return a}function Ql(n,e,t,i){const s=Or(n,i);if(s!=null){const r=Dr(s),o=r.path,a=r.queryId,c=Z(o,e),l=new ft(Rr(a),c,t);return Ur(n,o,l)}else return[]}function Z_(n,e,t,i){const s=Or(n,i);if(s){const r=Dr(s),o=r.path,a=r.queryId,c=Z(o,e),l=U.fromObject(t),u=new vn(Rr(a),c,l);return Ur(n,o,u)}else return[]}function ey(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,f)=>{const _=Z(h,s);r=r||ze(f,_),o=o||Je(f)});let a=n.syncPointTree_.get(s);a?(o=o||Je(a),r=r||ze(a,P())):(a=new Wl,n.syncPointTree_=n.syncPointTree_.set(s,a));let c;r!=null?c=!0:(c=!1,r=b.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((f,_)=>{const g=ze(_,P());g&&(r=r.updateImmediateChild(f,g))}));const l=zl(a,e);if(!l&&!e._queryParams.loadsAllData()){const h=Ji(e);v(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const f=sy();n.queryToTagMap.set(h,f),n.tagToQueryMap.set(f,h)}const u=Yi(n.pendingWriteTree_,s);let d=G_(a,e,t,u,r,c);if(!l&&!o&&!i){const h=jl(a,e);d=d.concat(ry(n,e,h))}return d}function Lr(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const c=Z(o,e),l=ze(a,c);if(l)return l});return Ul(s,e,r,t,!0)}function ty(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(l,u)=>{const d=Z(l,t);i=i||ze(u,d)});let s=n.syncPointTree_.get(t);s?i=i||ze(s,P()):(s=new Wl,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new Qe(i,!0,!1):null,a=Yi(n.pendingWriteTree_,e._path),c=Vl(s,e,a,r?o.getNode():b.EMPTY_NODE,r);return B_(c)}function Nn(n,e){return Jl(e,n.syncPointTree_,null,Yi(n.pendingWriteTree_,P()))}function Jl(n,e,t,i){if(S(n.path))return Xl(n,e,t,i);{const s=e.get(P());t==null&&s!=null&&(t=ze(s,P()));let r=[];const o=A(n.path),a=n.operationForChild(o),c=e.children.get(o);if(c&&a){const l=t?t.getImmediateChild(o):null,u=Bl(i,o);r=r.concat(Jl(a,c,l,u))}return s&&(r=r.concat(Nr(s,n,i,t))),r}}function Xl(n,e,t,i){const s=e.get(P());t==null&&s!=null&&(t=ze(s,P()));let r=[];return e.children.inorderTraversal((o,a)=>{const c=t?t.getImmediateChild(o):null,l=Bl(i,o),u=n.operationForChild(o);u&&(r=r.concat(Xl(u,a,c,l)))}),s&&(r=r.concat(Nr(s,n,i,t))),r}function Zl(n,e){const t=e.query,i=bn(n,t);return{hashFn:()=>(U_(e)||b.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?X_(n,t._path,i):J_(n,t._path);{const r=eg(s,t);return Yl(n,t,null,r)}}}}function bn(n,e){const t=Ji(e);return n.queryToTagMap.get(t)}function Ji(n){return n._path.toString()+"$"+n._queryIdentifier}function Or(n,e){return n.tagToQueryMap.get(e)}function Dr(n){const e=n.indexOf("$");return v(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new L(n.substr(0,e))}}function Ur(n,e,t){const i=n.syncPointTree_.get(e);v(i,"Missing sync point for query tag that we're tracking");const s=Yi(n.pendingWriteTree_,e);return Nr(i,t,s,null)}function ny(n){return n.fold((e,t,i)=>{if(t&&Je(t))return[Qi(t)];{let s=[];return t&&(s=Gl(t)),re(i,(r,o)=>{s=s.concat(o)}),s}})}function cn(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(K_())(n._repo,n._path):n}function iy(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Ji(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function sy(){return Y_++}function ry(n,e,t){const i=e._path,s=bn(n,e),r=Zl(n,t),o=n.listenProvider_.startListening(cn(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)v(!Je(a.value),"If we're adding a query, it shouldn't be shadowed");else{const c=a.fold((l,u,d)=>{if(!S(l)&&u&&Je(u))return[Qi(u).query];{let h=[];return u&&(h=h.concat(Gl(u).map(f=>f.query))),re(d,(f,_)=>{h=h.concat(_)}),h}});for(let l=0;l<c.length;++l){const u=c[l];n.listenProvider_.stopListening(cn(u),bn(n,u))}}return o}/**
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
 */class Br{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Br(t)}node(){return this.node_}}class Fr{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=H(this.path_,e);return new Fr(this.syncTree_,t)}node(){return Lr(this.syncTree_,this.path_)}}const oy=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Ea=function(n,e,t){if(!n||typeof n!="object")return n;if(v(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return ay(n[".sv"],e,t);if(typeof n[".sv"]=="object")return cy(n[".sv"],e);v(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},ay=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:v(!1,"Unexpected server value: "+n)}},cy=function(n,e,t){n.hasOwnProperty("increment")||v(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&v(!1,"Unexpected increment value: "+i);const s=e.node();if(v(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},ly=function(n,e,t,i){return $r(e,new Fr(t,n),i)},eu=function(n,e,t){return $r(n,new Br(e),t)};function $r(n,e,t){const i=n.getPriority().val(),s=Ea(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Ea(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new W(a,j(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new W(s))),o.forEachChild($,(a,c)=>{const l=$r(c,e.getImmediateChild(a),t);l!==c&&(r=r.updateImmediateChild(a,l))}),r}}/**
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
 */class qr{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Hr(n,e){let t=e instanceof L?e:new L(e),i=n,s=A(t);for(;s!==null;){const r=Pt(i.node.children,s)||{children:{},childCount:0};i=new qr(s,i,r),t=O(t),s=A(t)}return i}function Vt(n){return n.node.value}function tu(n,e){n.node.value=e,js(n)}function nu(n){return n.node.childCount>0}function uy(n){return Vt(n)===void 0&&!nu(n)}function Xi(n,e){re(n.node.children,(t,i)=>{e(new qr(t,n,i))})}function iu(n,e,t,i){t&&e(n),Xi(n,s=>{iu(s,e,!0)})}function dy(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Ln(n){return new L(n.parent===null?n.name:Ln(n.parent)+"/"+n.name)}function js(n){n.parent!==null&&hy(n.parent,n.name,n)}function hy(n,e,t){const i=uy(t),s=Re(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,js(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,js(n))}/**
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
 */const py=/[\[\].#$\/\u0000-\u001F\u007F]/,fy=/[\[\].#$\u0000-\u001F\u007F]/,ys=10*1024*1024,su=function(n){return typeof n=="string"&&n.length!==0&&!py.test(n)},ru=function(n){return typeof n=="string"&&n.length!==0&&!fy.test(n)},my=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ru(n)},gy=function(n,e,t,i){Wr(lr(n,"value"),e,t)},Wr=function(n,e,t){const i=t instanceof L?new Ng(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+st(i));if(typeof e=="function")throw new Error(n+"contains a function "+st(i)+" with contents = "+e.toString());if(el(e))throw new Error(n+"contains "+e.toString()+" "+st(i));if(typeof e=="string"&&e.length>ys/3&&Hi(e)>ys)throw new Error(n+"contains a string greater than "+ys+" utf8 bytes "+st(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(re(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!su(o)))throw new Error(n+" contains an invalid key ("+o+") "+st(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Lg(i,o),Wr(n,a,i),Og(i)}),s&&r)throw new Error(n+' contains ".value" child '+st(i)+" in addition to actual children.")}},ou=function(n,e,t,i){if(!ru(t))throw new Error(lr(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},_y=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),ou(n,e,t)},yy=function(n,e){if(A(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},vy=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!su(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!my(t))throw new Error(lr(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class by{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function au(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!El(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function ye(n,e,t){au(n,t),wy(n,i=>de(i,e)||de(e,i))}function wy(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(Iy(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function Iy(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();sn&&X("event: "+t.toString()),Wt(i)}}}/**
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
 */const Cy="repo_interrupt",Ey=25;class Ty{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new by,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ci(),this.transactionQueueTree_=new qr,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Sy(n,e,t){if(n.stats_=Ir(n.repoInfo_),n.forceRestClient_||sg())n.server_=new Ii(n.repoInfo_,(i,s,r,o)=>{Ta(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Sa(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{q(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Ee(n.repoInfo_,e,(i,s,r,o)=>{Ta(n,i,s,r,o)},i=>{Sa(n,i)},i=>{ky(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=lg(n.repoInfo_,()=>new a_(n.stats_,n.server_)),n.infoData_=new n_,n.infoSyncTree_=new Ca({startListening:(i,s,r,o)=>{let a=[];const c=n.infoData_.getNode(i._path);return c.isEmpty()||(a=xn(n.infoSyncTree_,i._path,c),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Gr(n,"connected",!1),n.serverSyncTree_=new Ca({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,c)=>{const l=o(a,c);ye(n.eventQueue_,i._path,l)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function Ay(n){const t=n.infoData_.getNode(new L(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Vr(n){return oy({timestamp:Ay(n)})}function Ta(n,e,t,i,s){n.dataUpdateCount++;const r=new L(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const c=di(t,l=>j(l));o=Z_(n.serverSyncTree_,r,c,s)}else{const c=j(t);o=Ql(n.serverSyncTree_,r,c,s)}else if(i){const c=di(t,l=>j(l));o=Q_(n.serverSyncTree_,r,c)}else{const c=j(t);o=xn(n.serverSyncTree_,r,c)}let a=r;o.length>0&&(a=es(n,r)),ye(n.eventQueue_,a,o)}function Sa(n,e){Gr(n,"connected",e),e===!1&&My(n)}function ky(n,e){re(e,(t,i)=>{Gr(n,t,i)})}function Gr(n,e,t){const i=new L("/.info/"+e),s=j(t);n.infoData_.updateSnapshot(i,s);const r=xn(n.infoSyncTree_,i,s);ye(n.eventQueue_,i,r)}function cu(n){return n.nextWriteId_++}function Ry(n,e,t){const i=ty(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=j(s).withIndex(e._queryParams.getIndex());ey(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=xn(n.serverSyncTree_,e._path,r);else{const a=bn(n.serverSyncTree_,e);o=Ql(n.serverSyncTree_,e._path,r,a)}return ye(n.eventQueue_,e._path,o),Yl(n.serverSyncTree_,e,t,null,!0),r},s=>(Zi(n,"get for query "+q(e)+" failed: "+s),Promise.reject(new Error(s))))}function Py(n,e,t,i,s){Zi(n,"set",{path:e.toString(),value:t,priority:i});const r=Vr(n),o=j(t,i),a=Lr(n.serverSyncTree_,e),c=eu(o,a,r),l=cu(n),u=Kl(n.serverSyncTree_,e,c,l,!0);au(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(h,f)=>{const _=h==="ok";_||se("set at "+e+" failed: "+h);const g=at(n.serverSyncTree_,l,!_);ye(n.eventQueue_,e,g),Ny(n,s,h,f)});const d=pu(n,e);es(n,d),ye(n.eventQueue_,d,[])}function My(n){Zi(n,"onDisconnectEvents");const e=Vr(n),t=Ci();qs(n.onDisconnect_,P(),(s,r)=>{const o=ly(s,r,n.serverSyncTree_,e);xl(t,s,o)});let i=[];qs(t,P(),(s,r)=>{i=i.concat(xn(n.serverSyncTree_,s,r));const o=pu(n,s);es(n,o)}),n.onDisconnect_=Ci(),ye(n.eventQueue_,P(),i)}function xy(n){n.persistentConnection_&&n.persistentConnection_.interrupt(Cy)}function Zi(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),X(t,...e)}function Ny(n,e,t,i){e&&Wt(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function lu(n,e,t){return Lr(n.serverSyncTree_,e,t)||b.EMPTY_NODE}function jr(n,e=n.transactionQueueTree_){if(e||ts(n,e),Vt(e)){const t=du(n,e);v(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&Ly(n,Ln(e),t)}else nu(e)&&Xi(e,t=>{jr(n,t)})}function Ly(n,e,t){const i=t.map(l=>l.currentWriteId),s=lu(n,e,i);let r=s;const o=s.hash();for(let l=0;l<t.length;l++){const u=t[l];v(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=Z(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),c=e;n.server_.put(c.toString(),a,l=>{Zi(n,"transaction put response",{path:c.toString(),status:l});let u=[];if(l==="ok"){const d=[];for(let h=0;h<t.length;h++)t[h].status=2,u=u.concat(at(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&d.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();ts(n,Hr(n.transactionQueueTree_,e)),jr(n,n.transactionQueueTree_),ye(n.eventQueue_,e,u);for(let h=0;h<d.length;h++)Wt(d[h])}else{if(l==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{se("transaction at "+c.toString()+" failed: "+l);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=l}es(n,e)}},o)}function es(n,e){const t=uu(n,e),i=Ln(t),s=du(n,t);return Oy(n,s,i),i}function Oy(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const c=e[a],l=Z(t,c.path);let u=!1,d;if(v(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),c.status===4)u=!0,d=c.abortReason,s=s.concat(at(n.serverSyncTree_,c.currentWriteId,!0));else if(c.status===0)if(c.retryCount>=Ey)u=!0,d="maxretry",s=s.concat(at(n.serverSyncTree_,c.currentWriteId,!0));else{const h=lu(n,c.path,o);c.currentInputSnapshot=h;const f=e[a].update(h.val());if(f!==void 0){Wr("transaction failed: Data returned ",f,c.path);let _=j(f);typeof f=="object"&&f!=null&&Re(f,".priority")||(_=_.updatePriority(h.getPriority()));const m=c.currentWriteId,I=Vr(n),k=eu(_,h,I);c.currentOutputSnapshotRaw=_,c.currentOutputSnapshotResolved=k,c.currentWriteId=cu(n),o.splice(o.indexOf(m),1),s=s.concat(Kl(n.serverSyncTree_,c.path,k,c.currentWriteId,c.applyLocally)),s=s.concat(at(n.serverSyncTree_,m,!0))}else u=!0,d="nodata",s=s.concat(at(n.serverSyncTree_,c.currentWriteId,!0))}ye(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,(function(h){setTimeout(h,Math.floor(0))})(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}ts(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Wt(i[a]);jr(n,n.transactionQueueTree_)}function uu(n,e){let t,i=n.transactionQueueTree_;for(t=A(e);t!==null&&Vt(i)===void 0;)i=Hr(i,t),e=O(e),t=A(e);return i}function du(n,e){const t=[];return hu(n,e,t),t.sort((i,s)=>i.order-s.order),t}function hu(n,e,t){const i=Vt(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Xi(e,s=>{hu(n,s,t)})}function ts(n,e){const t=Vt(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,tu(e,t.length>0?t:void 0)}Xi(e,i=>{ts(n,i)})}function pu(n,e){const t=Ln(uu(n,e)),i=Hr(n.transactionQueueTree_,e);return dy(i,s=>{vs(n,s)}),vs(n,i),iu(i,s=>{vs(n,s)}),t}function vs(n,e){const t=Vt(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(v(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(v(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(at(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?tu(e,void 0):t.length=r+1,ye(n.eventQueue_,Ln(e),s);for(let o=0;o<i.length;o++)Wt(i[o])}}/**
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
 */function Dy(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Uy(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):se(`Invalid query segment '${t}' in query '${n}'`)}return e}const Aa=function(n,e){const t=By(n),i=t.namespace;t.domain==="firebase.com"&&ke(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&ke("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Ym();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new hl(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new L(t.pathString)}},By=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",c=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(a=n.substring(0,l-1),n=n.substring(l+2));let u=n.indexOf("/");u===-1&&(u=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(u,d)),u<d&&(s=Dy(n.substring(u,d)));const h=Uy(n.substring(Math.min(n.length,d)));l=e.indexOf(":"),l>=0?(o=a==="https"||a==="wss",c=parseInt(e.substring(l+1),10)):l=e.length;const f=e.slice(0,l);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:c,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
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
 */class Fy{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+q(this.snapshot.exportVal())}}class $y{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class qy{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return v(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class zr{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return S(this._path)?null:wl(this._path)}get ref(){return new Pe(this._repo,this._path)}get _queryIdentifier(){const e=ha(this._queryParams),t=br(e);return t==="{}"?"default":t}get _queryObject(){return ha(this._queryParams)}isEqual(e){if(e=oe(e),!(e instanceof zr))return!1;const t=this._repo===e._repo,i=El(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+xg(this._path)}}class Pe extends zr{constructor(e,t){super(e,t,new Ar,!1)}get parent(){const e=Cl(this._path);return e===null?null:new Pe(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class wn{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new L(e),i=zs(this.ref,e);return new wn(this._node.getChild(t),i,$)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new wn(s,zs(this.ref,i),$)))}hasChild(e){const t=new L(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ka(n,e){return n=oe(n),n._checkNotDeleted("ref"),e!==void 0?zs(n._root,e):n._root}function zs(n,e){return n=oe(n),A(n._path)===null?_y("child","path",e):ou("child","path",e),new Pe(n._repo,H(n._path,e))}function Hy(n,e){n=oe(n),yy("set",n._path),gy("set",e,n._path);const t=new qi;return Py(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function Wy(n){n=oe(n);const e=new qy(()=>{}),t=new Kr(e);return Ry(n._repo,n,t).then(i=>new wn(i,new Pe(n._repo,n._path),n._queryParams.getIndex()))}class Kr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new Fy("value",this,new wn(e.snapshotNode,new Pe(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new $y(this,e,t):null}matches(e){return e instanceof Kr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}H_(Pe);z_(Pe);/**
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
 */const Vy="FIREBASE_DATABASE_EMULATOR_HOST",Ks={};let Gy=!1;function jy(n,e,t,i){const s=e.lastIndexOf(":"),r=e.substring(0,s),o=Tn(r);n.repoInfo_=new hl(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function zy(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||ke("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),X("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=Aa(r,s),a=o.repoInfo,c;typeof process<"u"&&Ko&&(c=Ko[Vy]),c?(r=`http://${c}?ns=${a.namespace}`,o=Aa(r,s),a=o.repoInfo):o.repoInfo.secure;const l=new og(n.name,n.options,e);vy("Invalid Firebase Database URL",o),S(o.path)||ke("Database URL must point to the root of a Firebase Database (not including a child path).");const u=Yy(a,n,l,new rg(n,t));return new Qy(u,n)}function Ky(n,e){const t=Ks[e];(!t||t[n.key]!==n)&&ke(`Database ${e}(${n.repoInfo_}) has already been deleted.`),xy(n),delete t[n.key]}function Yy(n,e,t,i){let s=Ks[e.name];s||(s={},Ks[e.name]=s);let r=s[n.toURLString()];return r&&ke("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Ty(n,Gy,t,i),s[n.toURLString()]=r,r}class Qy{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Sy(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Pe(this._repo,P())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Ky(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ke("Cannot call "+e+" on a deleted database.")}}function Jy(n=gc(),e){const t=hr(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=mh("database");i&&Xy(t,...i)}return t}function Xy(n,e,t,i={}){n=oe(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,r=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&ut(i,r.repoInfo_.emulatorOptions))return;ke("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)i.mockUserToken&&ke('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new ni(ni.OWNER);else if(i.mockUserToken){const a=typeof i.mockUserToken=="string"?i.mockUserToken:gh(i.mockUserToken,n.app.options.projectId);o=new ni(a)}Tn(e)&&hc(e),jy(r,s,i,o)}/**
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
 */function Zy(n){Wm($t),Mt(new dt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return zy(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),Ve(Yo,Qo,n),Ve(Yo,Qo,"esm2020")}Ee.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Ee.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Zy();const Ra="saves",Pa="v1",ev=300*1e3;class tv{app=null;auth=null;db=null;user=null;timer=null;ready=!1;async init(e){try{this.app=mc(e,"bot-empire"),this.auth=qm(this.app),this.db=Jy(this.app);const t=await Tf(this.auth);return this.user=t.user,this.ready=!0,console.info(`[CloudSave] connecté — uid: ${this.user.uid}`),!0}catch(t){return console.warn("[CloudSave] init échoué (mode offline)",t),!1}}isReady(){return this.ready&&!!this.user&&!!this.db}getUserId(){return this.user?.uid??null}async push(e){if(this.isReady())try{await Hy(ka(this.db,`${Ra}/${this.user.uid}/${Pa}`),{...e,lastCloudSync:Date.now()})}catch(t){console.warn("[CloudSave] push échoué",t)}}async pull(){if(!this.isReady())return null;try{const e=await Wy(ka(this.db,`${Ra}/${this.user.uid}/${Pa}`));return e.exists()?this.merge(e.val()):null}catch(e){return console.warn("[CloudSave] pull échoué",e),null}}async getIfNewer(e){const t=await this.pull();return t&&t.lastSave>e.lastSave+6e4?t:null}startAutoSync(e){this.timer=setInterval(()=>{this.push(e())},ev),window.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&this.push(e())}),window.addEventListener("pagehide",()=>{this.push(e())})}stopAutoSync(){this.timer&&(clearInterval(this.timer),this.timer=null)}merge(e){return Ga(e)}}const nv={apiKey:"AIzaSyBpJ1FCslNMQy4ZP9OKJy8mdBQM3k-o-E8",authDomain:"bot-empire-3d951.firebaseapp.com",databaseURL:"https://bot-empire-3d951-default-rtdb.europe-west1.firebasedatabase.app",projectId:"bot-empire-3d951",storageBucket:"bot-empire-3d951.firebasestorage.app",messagingSenderId:"216470924880",appId:"1:216470924880:web:a17363c8143fb0ba426b55"},ii=[{id:"audit-flash-retail",client:"QuickRetail",clientIcon:"🛒",title:"Audit Flash Chatbot",description:"Leur chatbot répond en 8s. Ils veulent du sub-2s. Audit express demandé.",reward:1200,duration:3*3600,workTime:120,rarity:"common",requiresRate:.5},{id:"content-rush-startup",client:"LaunchPad",clientIcon:"🚀",title:"20 posts LinkedIn urgents",description:"Levée de fonds dans 48h. Ils ont besoin de contenu maintenant.",reward:800,duration:2*3600,workTime:90,rarity:"common",requiresRate:.3},{id:"workflow-bug-fix",client:"AutoBiz",clientIcon:"⚙️",title:"Workflow planté en prod",description:"3 000 emails non envoyés depuis ce matin. Fix immédiat.",reward:1500,duration:1.5*3600,workTime:60,rarity:"common",requiresAgent:{id:"bot-workflows",count:1}},{id:"data-extract-simple",client:"DataFirst",clientIcon:"📊",title:"Extraction CSV → insights",description:"10 000 lignes à analyser. Rapport en 2h pour la réunion board.",reward:900,duration:2*3600,workTime:100,rarity:"common",requiresRate:.8},{id:"rgpd-quick-check",client:"E-Shop Pro",clientIcon:"🔒",title:"Vérification RGPD express",description:"Audit CNIL demandé pour demain. Formulaires et cookies à vérifier.",reward:1100,duration:4*3600,workTime:150,rarity:"common"},{id:"social-media-crisis",client:"BrandUp",clientIcon:"📱",title:"Gestion crise réseaux",description:"Post viral négatif. Besoin de 10 réponses calibrées dans l'heure.",reward:700,duration:1*3600,workTime:45,rarity:"common",requiresAgent:{id:"agent-copy",count:1}},{id:"api-integration-express",client:"ConnectApp",clientIcon:"🔗",title:"Intégration API express",description:"Connecter Stripe + n8n avant le lancement de demain.",reward:1300,duration:3*3600,workTime:110,rarity:"common",requiresAgent:{id:"bot-workflows",count:3}},{id:"newsletter-automation",client:"MailBlast",clientIcon:"📧",title:"Automation newsletter",description:"5 séquences d'onboarding à configurer. Client pressé.",reward:950,duration:5*3600,workTime:130,rarity:"common"},{id:"bank-audit-full",client:"FinanceCore",clientIcon:"🏦",title:"Audit IA complet — banque",description:"Conformité BCEAO + RGPD pour leur nouveau système de scoring crédit.",reward:15e3,duration:6*3600,workTime:300,rarity:"rare",requiresAgent:{id:"agent-audit",count:2}},{id:"hospital-chatbot",client:"CliniqIA",clientIcon:"🏥",title:"Déploiement chatbot médical",description:"Assistant triage urgences. Validation médicale requise. Contrat récurrent.",reward:22e3,duration:8*3600,workTime:400,rarity:"rare",requiresRate:5},{id:"media-scraping",client:"PressBot",clientIcon:"📰",title:"Pipeline médias temps réel",description:"500 sources RSS → résumés → newsletter. Architecture complète.",reward:12e3,duration:5*3600,workTime:250,rarity:"rare",requiresAgent:{id:"bot-workflows",count:10}},{id:"legal-contract-review",client:"LexCorp",clientIcon:"⚖️",title:"Revue 200 contrats IA",description:"Fusion en cours. 200 contrats fournisseurs à analyser en 24h.",reward:18e3,duration:7*3600,workTime:350,rarity:"rare",requiresAgent:{id:"agent-legal",count:1}},{id:"growth-series-a",client:"ScaleUp Corp",clientIcon:"📈",title:"Stratégie go-to-market Série A",description:"Pitch deck + 90j de content plan + outreach séquences. Urgence investisseurs.",reward:25e3,duration:8*3600,workTime:420,rarity:"rare",requiresAgent:{id:"agent-growth",count:2}},{id:"ecommerce-optimization",client:"MegaShop",clientIcon:"🛍️",title:"Optimisation conversion e-commerce",description:"A/B tests IA sur 40 landing pages. Deadline : Black Friday dans 3j.",reward:14e3,duration:6*3600,workTime:280,rarity:"rare",requiresRate:8},{id:"analytics-dashboard",client:"DataVision",clientIcon:"🔭",title:"Dashboard analytics C-level",description:"12 KPIs, 3 marchés, temps réel. Présentation board lundi.",reward:11e3,duration:5*3600,workTime:240,rarity:"rare",requiresAgent:{id:"agent-analytics",count:3}},{id:"ai-security-audit",client:"SecureIA",clientIcon:"🛡️",title:"Pentest IA + rapport",description:"Prompt injection, data leakage, model inversion. Rapport certifié.",reward:19e3,duration:7*3600,workTime:380,rarity:"rare",requiresAgent:{id:"agent-audit",count:5}},{id:"ministere-ia-project",client:"MinistèreIA",clientIcon:"🏛️",title:"Appel d'offre — IA d'État",description:"Système de traitement de 2M de dossiers/an. Contrat pluriannuel. C'est maintenant ou jamais.",reward:18e4,duration:12*3600,workTime:900,rarity:"epic",requiresAgent:{id:"agent-supervisor",count:1}},{id:"ipo-ai-audit",client:"TechGiant FR",clientIcon:"🦅",title:"Audit IA pré-IPO",description:"IPO dans 30j. Due diligence complète de tous les systèmes IA. Confidentiel.",reward:25e4,duration:10*3600,workTime:800,rarity:"epic",requiresAgent:{id:"agent-legal",count:3}},{id:"unicorn-partnership",client:"Unicorn Labs",clientIcon:"🦄",title:"Partenariat stratégique annuel",description:"Externalisation complète de la stack IA. 12 mois, équipe dédiée.",reward:5e5,duration:8*3600,workTime:600,rarity:"epic",requiresRate:50},{id:"media-empire",client:"Groupe Média",clientIcon:"📺",title:"IA éditoriale — 10 médias",description:"Automatisation complète : veille, rédaction, SEO, distribution. Groupe national.",reward:32e4,duration:10*3600,workTime:750,rarity:"epic",requiresAgent:{id:"agent-growth",count:5}},{id:"defense-contract",client:"Défense IA",clientIcon:"🎖️",title:"Contrat ministère défense",description:"Analyse de renseignement open-source. Top secret. Fenêtre de 8h.",reward:4e5,duration:8*3600,workTime:700,rarity:"epic",requiresAgent:{id:"agent-supervisor",count:2}},{id:"global-rollout",client:"GlobalCorp",clientIcon:"🌍",title:"Déploiement mondial 40 pays",description:"Stack IA full — 40 langues, conformités locales, 24/7 support. Il faut tout.",reward:8e5,duration:12*3600,workTime:1200,rarity:"epic",requiresRate:100},{id:"acquisition-ia",client:"VentureCapital",clientIcon:"💼",title:"Acquisition — valorisation IA",description:"Un VC veut racheter ta technologie. Négo express, window de 6h.",reward:1e6,duration:6*3600,workTime:500,rarity:"epic",requiresAgent:{id:"agent-supervisor",count:3}}],bs=3,Ma=1200,iv=2400,xa="bot-empire-contracts";class sv{slots=[null,null,null];nextRefill=[0,0,0];usedIds=new Set;onNewContract;onComplete;boardSize=bs;rewardBonus=1;init(e,t){this.onNewContract=e,this.onComplete=t,this.load();for(let i=0;i<this.boardSize;i++)this.slots[i]||this.scheduleRefill(i,5)}setReputation(e,t){const i=e?bs+1:bs;if(this.rewardBonus=t,i>this.boardSize){for(let s=this.boardSize;s<i;s++)this.slots.push(null),this.nextRefill.push(0),this.scheduleRefill(s,5);this.boardSize=i}}tick(e){const t=Date.now();for(let i=0;i<this.boardSize;i++){const s=this.slots[i];if(!s){t>=this.nextRefill[i]&&this.fillSlot(i,e);continue}if(s.status==="available"&&t>=s.expiresAt){s.status="expired",this.slots[i]=null,this.scheduleRefill(i),this.save();continue}if(s.status==="accepted"&&s.completesAt&&t>=s.completesAt){s.status="completed",this.rewardBonus!==1&&(s.reward=Math.round(s.reward*this.rewardBonus)),this.onComplete?.(s),this.slots[i]=null,this.scheduleRefill(i),this.save();continue}}}canAccept(e,t,i){return!(e.status!=="available"||e.requiresRate&&(i??=this.getTotalRate(t),i<e.requiresRate)||e.requiresAgent&&(t.agents[e.requiresAgent.id]?.count??0)<e.requiresAgent.count)}accept(e){const t=Date.now();e.acceptedAt=t,e.completesAt=t+e.workTime*1e3,e.status="accepted",this.save()}getSlots(){return[...this.slots]}getProgress(e){if(e.status!=="accepted"||!e.acceptedAt||!e.completesAt)return 0;const t=Date.now()-e.acceptedAt,i=e.completesAt-e.acceptedAt;return Math.min(t/i,1)}fillSlot(e,t){const i=this.pickContract(t);if(!i)return;const s=Date.now(),r={...i,slotId:e,expiresAt:s+i.duration*1e3,status:"available"};this.slots[e]=r,this.usedIds.add(i.id),this.onNewContract?.(r),this.save()}pickContract(e){this.usedIds.size>=ii.length&&this.usedIds.clear();const t=ii.filter(l=>!this.usedIds.has(l.id));if(t.length===0)return null;const i=this.getTotalRate(e),s=t.filter(l=>!(l.requiresRate&&i<l.requiresRate*.1||l.requiresAgent&&(e.agents[l.requiresAgent.id]?.count??0)===0));if(s.length===0)return null;const r=s,o=r.map(l=>l.rarity==="common"?55:l.rarity==="rare"?35:10),a=o.reduce((l,u)=>l+u,0);let c=Math.random()*a;for(let l=0;l<r.length;l++)if(c-=o[l],c<=0)return r[l];return r[r.length-1]}scheduleRefill(e,t){const i=t?t*1e3:(Ma+Math.random()*(iv-Ma))*1e3;this.nextRefill[e]=Date.now()+i}rateOf=null;setRateProvider(e){this.rateOf=e}getTotalRate(e){return this.rateOf?this.rateOf(e):Object.values(e.agents).reduce((t,i)=>t+i.count*.1,0)}withCurrentTexts(e){if(!e)return null;const t=ii.find(i=>i.id===e.id);return t?{...e,client:t.client,title:t.title,description:t.description}:e}save(){try{localStorage.setItem(xa,JSON.stringify({slots:this.slots,nextRefill:this.nextRefill,usedIds:[...this.usedIds]}))}catch{}}load(){try{const e=localStorage.getItem(xa);if(!e)return;const t=JSON.parse(e);t.slots&&(this.slots=t.slots.map(i=>this.withCurrentTexts(i))),t.nextRefill&&(this.nextRefill=t.nextRefill),t.usedIds&&(this.usedIds=new Set(t.usedIds))}catch{}}}const si=[{id:"chatgpt-outage",name:"ChatGPT en panne",icon:"🔥",description:"Les clients fuient vers votre agence — revenus doublés !",effect:{type:"income",multiplier:2},durationMin:5},{id:"new-model-launch",name:"Lancement GPT-Next",icon:"🚀",description:"L'engouement IA mondial booste vos contrats.",effect:{type:"income",multiplier:1.5},durationMin:8},{id:"eu-regulation",name:"Régulation IA UE",icon:"⚖️",description:"Les nouvelles règles européennes ralentissent le marché.",effect:{type:"income",multiplier:.6},durationMin:6},{id:"linkedin-viral",name:"Post LinkedIn viral",icon:"📱",description:"Votre agence buzze — la valeur de chaque clic est triplée !",effect:{type:"click",multiplier:3},durationMin:5},{id:"vc-interest",name:"Intérêt des investisseurs",icon:"💰",description:"Les VCs regardent votre secteur. Revenus +80%.",effect:{type:"income",multiplier:1.8},durationMin:7},{id:"competitor-down",name:"Concurrent en faillite",icon:"📉",description:"Leurs clients cherchent une alternative — c'est vous !",effect:{type:"income",multiplier:1.7},durationMin:8},{id:"ai-winter",name:"Hiver IA médiatique",icon:"❄️",description:"La presse se retourne contre l'IA. Revenus en baisse.",effect:{type:"income",multiplier:.5},durationMin:5},{id:"tech-conference",name:"VivaTech Paris",icon:"🎪",description:"Vous êtes speaker — leads entrants en hausse.",effect:{type:"income",multiplier:1.6},durationMin:6},{id:"data-scandal",name:"Scandale données IA",icon:"😱",description:"La méfiance envers l'IA touche votre agence aussi.",effect:{type:"income",multiplier:.7},durationMin:6},{id:"automation-wave",name:"Vague Automation",icon:"🌊",description:"Toutes les PME veulent s'automatiser maintenant !",effect:{type:"income",multiplier:2},durationMin:8},{id:"claude-launch",name:"Nouveau modèle Claude",icon:"⬡",description:"La puissance du modèle décuple vos performances.",effect:{type:"click",multiplier:2},durationMin:7},{id:"budget-cut",name:"Compressions budgétaires",icon:"✂️",description:"Vos clients coupent leurs budgets IT. Revenus réduits.",effect:{type:"income",multiplier:.65},durationMin:5},{id:"startup-boom",name:"Boom des startups",icon:"🦄",description:"L'écosystème startup explose — vos prospects aussi.",effect:{type:"income",multiplier:1.5},durationMin:7},{id:"harvard-study",name:"Étude Harvard : +40% productivité",icon:"📊",description:"Une étude valide votre ROI. Les contrats arrivent vite.",effect:{type:"income",multiplier:1.4},durationMin:8},{id:"gpu-costs",name:"Explosion des coûts GPU",icon:"💸",description:"Les marges fondent avec la hausse des coûts d'inférence.",effect:{type:"income",multiplier:.75},durationMin:6}],Na="bot-empire-market",La=900*1e3,rv=1800*1e3;class ov{current=null;nextEventAt=0;recentIds=[];onEvent;onEnd;constructor(){this.load(),this.nextEventAt===0&&this.scheduleNext(120*1e3)}setCallbacks(e,t){this.onEvent=e,this.onEnd=t}tick(){const e=Date.now();if(this.current&&e>=this.current.endsAt){const t=this.current;this.current=null,this.scheduleNext(),this.save(),this.onEnd?.(t)}return!this.current&&e>=this.nextEventAt&&this.startRandom(),this.current}getCurrent(){return this.current}getIncomeMultiplier(){return this.current&&this.current.event.effect.type==="income"?this.current.event.effect.multiplier:1}getClickMultiplier(){return this.current&&this.current.event.effect.type==="click"?this.current.event.effect.multiplier:1}startRandom(){const e=si.filter(s=>!this.recentIds.includes(s.id)),t=e.length>0?e:si,i=t[Math.floor(Math.random()*t.length)];this.current={event:i,endsAt:Date.now()+i.durationMin*60*1e3},this.recentIds.push(i.id),this.recentIds.length>4&&this.recentIds.shift(),this.save(),this.onEvent?.(this.current)}scheduleNext(e){const t=e??La+Math.random()*(rv-La);this.nextEventAt=Date.now()+t}save(){try{localStorage.setItem(Na,JSON.stringify({current:this.current,nextEventAt:this.nextEventAt,recentIds:this.recentIds}))}catch{}}load(){try{const e=localStorage.getItem(Na);if(!e)return;const t=JSON.parse(e);if(t.current&&t.current.endsAt>Date.now()){const i=si.find(s=>s.id===t.current.event?.id)??t.current.event;this.current={...t.current,event:i}}t.nextEventAt&&(this.nextEventAt=t.nextEventAt),t.recentIds&&(this.recentIds=t.recentIds)}catch{}}}const Oa="bot-empire-academy";class av{state={completedIds:[],totalXP:0};constructor(){this.load()}isCompleted(e){return this.state.completedIds.includes(e)}isUnlocked(e){return e.unlockAfter?this.isCompleted(e.unlockAfter):!0}complete(e,t){this.isCompleted(e)||(this.state.completedIds.push(e),this.state.totalXP+=t,this.save())}getState(){return{...this.state}}getTotalCompleted(){return this.state.completedIds.length}scorePrompt(e,t){if(e.type==="discovery"){const l=t.trim().length>=3,u=[e.responses.decent,e.responses.good,e.responses.excellent],d=l?u[Math.floor(Math.random()*u.length)]:e.responses.poor;return{score:l?100:0,maxScore:100,met:[],missed:[],tier:l?"excellent":"poor",response:d}}let i=0;const s=[],r=[],o=e.criteria.reduce((l,u)=>l+u.points,0);for(const l of e.criteria)l.pattern.test(t)?(i+=l.points,s.push({label:l.label,points:l.points})):r.push({label:l.label,points:l.points});const a=o>0?i/o:0,c=a>=.81?"excellent":a>=.61?"good":a>=.36?"decent":"poor";return{score:i,maxScore:o,met:s,missed:r,tier:c,response:e.responses[c]}}save(){try{localStorage.setItem(Oa,JSON.stringify(this.state))}catch{}}load(){try{const e=localStorage.getItem(Oa);e&&(this.state=JSON.parse(e))}catch{}}}const cv=[{id:"ch1",number:1,title:"La Première Rencontre",subtitle:"Découvre ce qu'est vraiment l'IA",icon:"🤖",unlockCondition:"always"},{id:"ch2",number:2,title:"L'Art du Prompt",subtitle:"Apprends à parler à l'IA comme un pro",icon:"⚡",unlockCondition:"always"}],In=[{id:"discovery-1",chapterId:"ch1",title:"Dis Bonjour à GPTurbo",subtitle:"Ta toute première conversation avec une IA",context:"GPTurbo vient d'être installé dans ton agence. C'est une intelligence artificielle — elle comprend ce que tu écris et te répond. Tape n'importe quoi pour commencer. Un bonjour, une question, une blague... Elle répondra !",tips:["Essaie de lui dire bonjour","Pose-lui une question que tu te poses vraiment","Demande-lui de te raconter une blague"],type:"discovery",criteria:[],responses:{poor:"Bonjour ! Je suis GPTurbo — l'IA de ton agence. Je suis prêt à t'aider ! Pose-moi une vraie question pour voir ce que je sais faire.",decent:`Bonjour ! Je suis GPTurbo

Je suis une intelligence artificielle. Concrètement, ça veut dire que j'ai été entraîné sur des milliards de textes — livres, articles, sites web — et que j'ai appris à comprendre et générer du langage humain.

Je peux écrire, expliquer, traduire, résumer, coder... Qu'est-ce que tu voudrais faire ?`,good:`Salut ! GPTurbo ici

Je suis une IA — une intelligence artificielle. Imagine que j'ai lu des millions de livres, d'articles et de sites web. Tout ça m'a appris à comprendre et à répondre en langage humain.

Je peux t'aider à :
• Écrire des textes, emails, descriptions
• Répondre à tes questions
• Analyser et résumer des infos
• Générer des idées créatives

Dis-moi ce dont tu as besoin !`,excellent:`Salut ! GPTurbo ici

Je suis une IA — une intelligence artificielle. Imagine que j'ai lu des millions de livres, d'articles et de sites web. Tout ça m'a appris à comprendre et à répondre en langage humain.

Je peux t'aider à :
• Écrire des textes, emails, descriptions
• Répondre à tes questions
• Analyser et résumer des infos
• Générer des idées créatives

Dis-moi ce dont tu as besoin !`},lesson:"Tu viens de parler à une IA pour la première fois ! Ce que tu as tapé s'appelle un **prompt** — c'est ta demande à l'IA. La qualité de ta réponse dépend de la qualité de ta demande. On va apprendre ça ensemble.",xpReward:50,euroReward:500},{id:"gpturbo-1",chapterId:"ch2",title:"Ta Première Mission",subtitle:"Demande quelque chose de précis",context:`La Boulangerie Martin est ton premier client. Ils veulent une description pour leur nouveau croissant au beurre — à afficher en vitrine.

Utilise GPTurbo pour l'écrire. Dis-lui ce que tu veux !`,tips:['Dis à GPTurbo QUOI faire (ex: "écris une description...")',"Parle du produit : c'est quoi ? C'est pour qui ?","Plus tu es précis, meilleure sera la réponse !"],type:"gpturbo",criteria:[{pattern:/\b(écri|rédige|créé|fais|génère|propose)/i,label:"Tu as demandé quelque chose de précis",points:20},{pattern:/\b(croissant|boulangerie|martin|viennoiserie)/i,label:"Tu as mentionné le produit",points:25},{pattern:/\b(beurr|croustillant|doré|saveur|goût|délicieu|appétissant|frais)/i,label:"Tu décris la qualité",points:25},{pattern:/[\s\S]{35,}/,label:"Ta demande est suffisamment détaillée",points:15},{pattern:/\b(vitrine|client|passant|acheteur|consommateur)/i,label:"Tu penses à l'audience",points:15}],responses:{poor:"Un croissant au beurre. Il est bon et frais.",decent:"Découvrez notre croissant au beurre, une viennoiserie préparée chaque matin avec soin. Croustillant à l'extérieur et moelleux à l'intérieur, il sera parfait pour bien commencer votre journée.",good:`Croissant Pur Beurre — Boulangerie Martin

Croustillant à souhait, doré à la perfection, notre croissant au beurre est façonné chaque matin avec un beurre AOP sélectionné. Sa mie alvéolée fond en bouche, libérant des arômes de beurre frais et de pâte feuilletée. Une gourmandise incontournable pour bien démarrer la journée.`,excellent:`Le Croissant Signature — Boulangerie Martin

Né à l'aube, façonné à la main, notre croissant au beurre incarne l'art de la viennoiserie française. Ses couches feuilletées, croustillantes au toucher, révèlent une mie dorée et aérienne imprégnée d'un beurre AOP Charentes-Poitou.

Chaque bouchée est une invitation — celle d'un matin parisien, d'une terrasse ensoleillée. Une gourmandise artisanale, disponible dès 7h. Jusqu'à épuisement du stock.`},lesson:"Tu viens de découvrir la règle n°1 du prompt : dire **QUOI** faire et **SUR QUOI**. Plus ta demande est claire, meilleure est la réponse. Regarde la différence entre le score faible et le score excellent !",xpReward:100,euroReward:1500,unlockAfter:"discovery-1"},{id:"gpturbo-2",chapterId:"ch2",title:"Connais ton Public",subtitle:"Le contexte change tout",context:`Même boulangerie, même croissant — mais le client veut maintenant attirer les écoliers qui passent après l'école.

La description doit être fun, accessible, parler aux enfants de 10 ans. Adapte ta demande à GPTurbo !`,tips:["Précise à qui s'adresse le texte (des enfants ? des ados ?)","Pense au ton : joyeux, simple, amusant","Un texte court et percutant pour un enfant"],type:"gpturbo",criteria:[{pattern:/\b(enfant|gamin|écolier|jeune|ado|école|gosse|kid|10 ans|petit)/i,label:"Tu as précisé l'audience",points:30},{pattern:/\b(amusant|fun|rigolo|cool|super|waouh|joyeux|sympa|marrant)/i,label:"Tu as pensé au ton",points:20},{pattern:/\b(croissant|boulangerie|viennoiserie|gâteau|pâtisserie)/i,label:"Tu as gardé le sujet principal",points:15},{pattern:/\b(court|simple|facile|accessible|rapide|petit texte)/i,label:"Tu penses à la lisibilité",points:20},{pattern:/[\s\S]{40,}/,label:"Ta demande est complète",points:15}],responses:{poor:"Un croissant pour les enfants. Il est bon.",decent:"Hé les ados ! Vous voulez un super goûter après l'école ? Notre croissant au beurre est mega bon ! Croustillant et moelleux, c'est le meilleur du quartier. Venez vite !",good:`Hé toi ! Oui, toi !

Tu rentres de l'école et t'as trop faim ?

Le croissant au beurre de la Boulangerie Martin, c'est :
Croustillant comme tu aimes
Tout chaud sorti du four
Au goût de beurre trop bon

Viens vite — y'en a pas pour tout le monde !`,excellent:`Hé ! Toi qui rentres de l'école !

T'as la dalle ? Le croissant au beurre de la Boulangerie Martin est FAIT POUR TOI.

Croustillant à l'extérieur
Tout moelleux à l'intérieur
Avec du vrai bon beurre

C'est le snack préféré de tous les écoliers du quartier. Et il est chaud sorti du four !

Juste en face de l'école. Cours !`},lesson:"Règle n°2 : toujours préciser **pour qui** tu écris. L'IA adapte automatiquement le ton, le vocabulaire et le format. Un texte pour un enfant de 10 ans ≠ un texte pour un adulte. Le contexte, c'est ton super-pouvoir.",xpReward:150,euroReward:2500,unlockAfter:"gpturbo-1"},{id:"gpturbo-3",chapterId:"ch2",title:"Donne un Rôle à l'IA",subtitle:"Transforme GPTurbo en expert",context:`Un chef étoilé Michelin ouvre une pâtisserie de luxe à Paris. Il veut une description ultra-raffinée pour sa carte gastronomique.

Ton astuce secrète : donne un rôle précis à GPTurbo. Dis-lui QUI il est avant de lui dire QUOI faire.`,tips:['Commence par "Tu es..." ou "Agis comme..."',"Donne un rôle précis : chef étoilé, critique gastronomique...","Combine le rôle + le contexte + la demande"],type:"gpturbo",criteria:[{pattern:/\b(tu es|agis comme|joue le rôle|en tant que|imagine que tu es|incarne|tu joues)/i,label:"Tu as donné un rôle à l'IA !",points:35},{pattern:/\b(chef|cuisinier|gastronomique|Michelin|étoilé|culinaire|critique|sommelier)/i,label:"Le rôle est précis et adapté",points:25},{pattern:/\b(luxe|gastronomique|raffiné|élégant|carte|menu|prestige|haute cuisine)/i,label:"Tu as le contexte de prestige",points:20},{pattern:/[\s\S]{50,}/,label:"Ta demande est complète et structurée",points:20}],responses:{poor:"Le croissant est très bon. Il est au beurre et très raffiné.",decent:"Notre croissant au beurre est une création d'exception, façonnée avec les meilleurs ingrédients pour une expérience gustative mémorable. Une pure viennoiserie d'art.",good:`**Croissant Feuilleté — Beurre de Baratte AOP**

Une architecture en spirale de 27 couches, dorée à 185°C pour révéler une caramélisation parfaite. La mie, d'une légèreté soyeuse, libère en bouche les notes lactées d'un beurre de baratte sélectionné en Normandie.

Une œuvre éphémère. Disponible chaque matin dès l'ouverture.`,excellent:`**Le Croissant Origine — Création du Chef**
_Pâtisserie Maison, Paris 8e_

Façonné à la main à 4h du matin, ce croissant est l'aboutissement d'un savoir-faire transmis sur trois générations. Vingt-sept couches de feuilletage beurré alternent croustillant ambré et mie alvéolée, libérant au premier mordant les arômes complexes d'un beurre de baratte AOP Isigny, à 84% de matières grasses.

La caramélisation, obtenue à 185°C précis, confère une robe dorée irisée d'une rare régularité. Une création éphémère — 30 pièces par jour, servies chaudes à partir de 8h.

_«La simplicité est la sophistication suprême.»_`},lesson:`Règle n°3 — et c'est la plus puissante : donne un **rôle** à l'IA. "Tu es un chef étoilé" active tout le vocabulaire gastronomique appris pendant l'entraînement. C'est comme passer l'IA en mode expert instantanément. Cette technique s'appelle le **role prompting** — les pros l'utilisent tous.`,xpReward:200,euroReward:4e3,unlockAfter:"gpturbo-2"}];function lv(n){return In.filter(e=>e.chapterId===n)}function uv(n,e){const t=e.getBoundingClientRect(),i=document.createElement("div");i.className="floating-number",i.textContent=`+${B(n)}`;const s=(Math.random()-.5)*50;i.style.left=`${t.left+t.width/2+s}px`,i.style.top=`${t.top+t.height/2}px`,document.body.appendChild(i),setTimeout(()=>i.remove(),1100)}const Da="abcdefghijklmnopqrstuvwxyz€",dv=40;let ws=0;function hv(n,e,t=4){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const i=n.getBoundingClientRect(),s=e.getBoundingClientRect();if(s.width!==0)for(let r=0;r<t&&ws<dv;r++){const o=document.createElement("span");o.className="ink-letter",o.textContent=Da[Math.floor(Math.random()*Da.length)];const a=i.left+i.width*(.3+Math.random()*.4),c=i.top+i.height*.4,l=s.left+s.width*(.2+Math.random()*.6),u=s.top+s.height*.5,d=(a+l)/2+(Math.random()-.5)*160,h=Math.min(c,u)-40-Math.random()*80;o.style.left="0px",o.style.top="0px",document.body.appendChild(o),ws++;const f=o.animate([{transform:`translate(${a}px, ${c}px) scale(1)`,opacity:0},{transform:`translate(${d}px, ${h}px) scale(1.25)`,opacity:1,offset:.45},{transform:`translate(${l}px, ${u}px) scale(.6)`,opacity:.2}],{duration:620+Math.random()*260,delay:r*45,easing:"cubic-bezier(.3,.1,.3,1)",fill:"both"});f.onfinish=()=>{o.remove(),ws--}}}function Yr(n="outremer",e=8){const t=document.createElement("div");t.style.cssText=`
    position:fixed;inset:0;background:color-mix(in srgb, var(--${n}) ${e}%, transparent);
    pointer-events:none;z-index:9998;
    animation:screen-flash 0.4s ease forwards;
  `,document.body.appendChild(t),setTimeout(()=>t.remove(),400)}function pv(n,e,t=12,i){n.textContent="";let s=0;const r=setInterval(()=>{n.textContent+=e[s],s++,s>=e.length&&(clearInterval(r),i?.())},t)}const fv={"bot-workflows":{name:"Workflow Bot",description:"Automates repetitive tasks with n8n"},"agent-copy":{name:"Copy Agent",description:"Writes marketing content around the clock"},"agent-analytics":{name:"Analytics Agent",description:"Crunches data and tunes performance"},"agent-audit":{name:"Audit Agent",description:"Audits client projects, opens up key accounts"},"agent-legal":{name:"Legal Agent",description:"Terms, GDPR, compliance — opens public tenders"},"agent-growth":{name:"Growth Agent",description:"Cold outreach, partnerships, large-scale distribution"},"agent-supervisor":{name:"Supervisor Agent",description:"Orchestrates every agent at scale"},"agent-rag":{name:"RAG Agent",description:"Searches client knowledge bases and cites its sources"},"agent-voice":{name:"Voice Agent",description:"Answers calls, books appointments and sums up every call"}},mv={"restaurant-local":{name:"Le Comptoir",sector:"Restaurant",unlockDialogue:'Le Comptoir signs! "A chatbot to take lunch bookings, can you do that?"'},"cabinet-medical":{name:"MédiaTech+",sector:"Digital health",unlockDialogue:`MédiaTech+ is on board! "The AI must stay GDPR-compliant." We've got it.`},"pme-ecommerce":{name:"BricoMax",sector:"E-commerce",unlockDialogue:'BricoMax signs! "Our competitors already have AI. Help us catch up."'},"groupe-hotelier":{name:"PalmHôtel Group",sector:"Hospitality & Luxury",unlockDialogue:'PalmHôtel Group confirms! "Fully automate the virtual concierge."'},"grand-compte":{name:"GigaSoft Corp.",sector:"Big Tech",unlockDialogue:"GigaSoft Corp. joins the empire! Unlimited budget. Flawless execution expected."},gouvernement:{name:"GovAI",sector:"Public sector",unlockDialogue:"GovAI awards the contract! The State trusts your agency. Historic."},"banque-nova":{name:"BanqueNova",sector:"Finance",unlockDialogue:'BanqueNova signs! "Our advisers want an assistant that cites every internal rule."'},eurosante:{name:"EuroSanté",sector:"Public health",unlockDialogue:"EuroSanté signs! 40 hospitals, sensitive data, zero room for error."}},gv={"api-rate-x2":{name:"API Rate Limit ×2",description:"Doubles the pace of your workflow bots",effectLabel:"Workflow Bot ×2"},"gpt5-integration":{name:"GPT-5 Integration",description:"The Copy Agent writes higher-quality content",effectLabel:"Copy Agent ×3"},"iso-certification":{name:"ISO 27001 Certification",description:"Your audits are worth twice as much",effectLabel:"Audit Agent ×2"},"click-boost":{name:"Click Automation",description:"Every manual task earns 5× more",effectLabel:"Click ×5"},"venture-round":{name:"Series A Funding",description:"The whole agency runs at full throttle",effectLabel:"All income ×1.5"},"ai-sovereignty":{name:"Sovereign AI",description:"Your agency becomes a national AI reference",effectLabel:"All income ×3"},"n8n-enterprise":{name:"n8n Enterprise License",description:"Workflows run with no speed limits",effectLabel:"Workflow Bot ×4"},"mcp-protocol":{name:"Full-Stack MCP Protocol",description:"All your agents talk to each other in real time",effectLabel:"All income ×2"},copilote:{name:"Copilot",description:"The founder works alongside the agents: every manual task taps into their output",effectLabel:"Click + 2% of agent income"},"clients-recurrents":{name:"Recurring clients",description:"Signed deals turn into subscriptions",effectLabel:"Client bonuses ×2"},orchestration:{name:"Orchestration",description:"Supervisors spread the work across every agent",effectLabel:"+1% per Supervisor for other agents"},"memoire-partagee":{name:"Shared memory",description:"Every project feeds a single knowledge base",effectLabel:"RAG Agent ×2"},"standard-ia":{name:"AI switchboard",description:"A phone switchboard that never sleeps",effectLabel:"Voice Agent ×3"}},_v={"rep-start-bonus":{name:"Seed capital",description:"Start every prestige with €2,000 in your pocket."},"rep-click-x2":{name:"Renowned expert",description:"Your manual tasks are worth 2× more."},"rep-contract-slot":{name:"Established name",description:"A 4th contract slot, unlocked for good."},"rep-contract-bonus":{name:"Premium margins",description:"All contract rewards +25%."},"rep-offline-rate":{name:"Always on",description:"Offline income goes from 50% to 75%."},"rep-agent-discount":{name:"Elite network",description:"All agents cost 20% less."},"rep-echo-boost":{name:"Cruising speed",description:"ECHO mode cooldown halved."},"rep-income-x125":{name:"AI expertise",description:"All agent income ×1.25, permanently."}},yv={"audit-flash-retail":{title:"Flash chatbot audit",description:"Their chatbot answers in 8s. They want under 2s. Express audit needed."},"content-rush-startup":{title:"20 urgent LinkedIn posts",description:"Fundraising in 48h. They need content now."},"workflow-bug-fix":{title:"Workflow down in prod",description:"3,000 emails stuck since this morning. Fix it now."},"data-extract-simple":{title:"CSV → insights",description:"10,000 rows to analyse. Report due in 2h for the board meeting."},"rgpd-quick-check":{title:"Express GDPR check",description:"Regulator audit tomorrow. Forms and cookies to review."},"social-media-crisis":{title:"Social media crisis",description:"Negative post gone viral. 10 calibrated replies needed within the hour."},"api-integration-express":{title:"Express API integration",description:"Connect Stripe + n8n before tomorrow's launch."},"newsletter-automation":{title:"Newsletter automation",description:"5 onboarding sequences to set up. Client in a hurry."},"bank-audit-full":{title:"Full AI audit — bank",description:"Regulatory + GDPR compliance for their new credit scoring system."},"hospital-chatbot":{title:"Medical chatbot rollout",description:"ER triage assistant. Medical sign-off required. Recurring contract."},"media-scraping":{title:"Real-time media pipeline",description:"500 RSS sources → summaries → newsletter. Full architecture."},"legal-contract-review":{title:"Review 200 AI contracts",description:"Merger in progress. 200 supplier contracts to analyse in 24h."},"growth-series-a":{title:"Series A go-to-market plan",description:"Pitch deck + 90-day content plan + outreach sequences. Investors waiting."},"ecommerce-optimization":{title:"E-commerce conversion boost",description:"AI A/B tests on 40 landing pages. Deadline: Black Friday in 3 days."},"analytics-dashboard":{title:"C-level analytics dashboard",description:"12 KPIs, 3 markets, real time. Board presentation on Monday."},"ai-security-audit":{title:"AI pentest + report",description:"Prompt injection, data leakage, model inversion. Certified report."},"ministere-ia-project":{client:"MinistryAI",title:"Tender — State AI",description:"A system processing 2M files a year. Multi-year contract. Now or never."},"ipo-ai-audit":{title:"Pre-IPO AI audit",description:"IPO in 30 days. Full due diligence of every AI system. Confidential."},"unicorn-partnership":{title:"Annual strategic partnership",description:"Outsource the whole AI stack. 12 months, dedicated team."},"media-empire":{client:"Media Group",title:"Editorial AI — 10 outlets",description:"End-to-end automation: monitoring, writing, SEO, distribution. National group."},"defense-contract":{client:"Defense AI",title:"Defense ministry contract",description:"Open-source intelligence analysis. Top secret. 8-hour window."},"global-rollout":{title:"Global rollout, 40 countries",description:"Full AI stack — 40 languages, local compliance, 24/7 support. Everything."},"acquisition-ia":{title:"Acquisition — AI valuation",description:"A VC wants to buy your tech. Fast negotiation, 6-hour window."}},vv={"chatgpt-outage":{name:"ChatGPT outage",description:"Clients flock to your agency — income doubled!"},"new-model-launch":{name:"GPT-Next launch",description:"Global AI hype boosts your deals."},"eu-regulation":{name:"EU AI regulation",description:"New European rules slow the market down."},"linkedin-viral":{name:"Viral LinkedIn post",description:"Your agency is buzzing — every click is worth triple!"},"vc-interest":{name:"Investor interest",description:"VCs are eyeing your sector. Income +80%."},"competitor-down":{name:"Competitor goes bust",description:"Their clients need an alternative — that's you!"},"ai-winter":{name:"AI media winter",description:"The press turns against AI. Income drops."},"tech-conference":{name:"VivaTech Paris",description:"You're a speaker — inbound leads are up."},"data-scandal":{name:"AI data scandal",description:"Distrust of AI hits your agency too."},"automation-wave":{name:"Automation wave",description:"Every small business wants to automate now!"},"claude-launch":{name:"New Claude model",description:"The model's power multiplies your output."},"budget-cut":{name:"Budget cuts",description:"Your clients slash IT budgets. Income reduced."},"startup-boom":{name:"Startup boom",description:"The startup scene explodes — and so do your leads."},"harvard-study":{name:"Harvard study: +40% productivity",description:"A study proves your ROI. Deals come in fast."},"gpu-costs":{name:"GPU costs skyrocket",description:"Margins melt as inference costs climb."}},bv={MégaRetail:{urgency:"CRITICAL",problem:"The chatbot answers with 2022 data and makes up promotions that don't exist.",question:"What is the best short-term fix?",answers:["Raise the model temperature to 1.5","Add RAG over the up-to-date product catalog","Switch to a newer model"],lesson:"RAG (Retrieval Augmented Generation) grounds answers in real, current data — the model can only answer from what is in the knowledge base."},PharmaPlus:{urgency:"URGENT",problem:"The agent invents drug dosages — potentially dangerous output.",question:"How do you secure the system first?",answers:["Add a legal disclaimer to the answers","Restrict answers to the validated medical database only","Switch to free conversation mode for flexibility"],lesson:"In critical domains the model must be grounded in a validated source. Hallucinations drop by 80%+ when the model is anchored to reliable references."},SpeedLogistix:{urgency:"IMPORTANT",problem:"API calls cost 3× the planned budget. The client threatens to cancel.",question:"What is the most likely cause?",answers:["The model uses too much compute","Prompts are too long and there is no semantic cache","The server retries calls too often"],lesson:"A semantic cache stores answers to similar queries. Combined with prompt compression, it cuts costs by 60 to 80%."},LexGroup:{urgency:"CRITICAL",problem:"A user got the legal chatbot to ignore its system instructions.",question:"This kind of attack is called…",answers:["SQL Injection","Prompt Injection","Cross-Site Scripting (XSS)"],lesson:"Prompt injection slips malicious instructions into the input to hijack the model's behavior. Input validation and system guardrails are essential."},FluentAI:{urgency:"IMPORTANT",problem:"Machine translations are inconsistent — same text, different results every session.",question:"Which setting is probably misconfigured?",answers:["The temperature is too high (0.9+)","The model is short on RAM","The system prompt is too short"],lesson:"Temperature controls how creative the model is. For precision tasks (translation, data extraction), a low temperature (0.0-0.2) keeps results consistent."},DataNova:{urgency:"MEDIUM",problem:"The agent keeps overflowing the context window on long reports.",question:"Which technique fixes this without changing models?",answers:["Skip the overly long parts of the document","Split the document into chunks and process them in parts","Pay for a 128k-token model"],lesson:"Chunking splits long documents into segments processed in sequence with intermediate summaries. It is the backbone of any solid RAG pipeline — before raising costs."},ViralBoost:{urgency:"IMPORTANT",problem:"The content-generation agent loops forever and never delivers.",question:"What is missing from the agent's architecture?",answers:["A more powerful language model","A stop condition and a maximum iteration count","More memory on the server"],lesson:"Every agent needs an explicit stop condition (max_iterations, stop_condition). Without guardrails, LLM agents can loop endlessly and blow up the bill."},GreenBank:{urgency:"CRITICAL",problem:"Customer PII is being sent to a third-party LLM API. The DPO is calling the lawyers.",question:"GDPR-safe emergency fix?",answers:["Anonymize data before sending it, or host the model in-house","Add a cookie consent banner to the site","Send the data over HTTPS — that's enough for compliance"],lesson:"Cloud LLM APIs are not GDPR-safe by default. Anonymization (PII masking) or self-hosting (Ollama, vLLM) are the only truly compliant options."},QuickSort:{urgency:"MEDIUM",problem:"The support ticket classifier is 65% accurate. The client expected 90%+.",question:"How do you improve it fast without retraining?",answers:["Jump straight to a bigger model","Add 3 to 5 concrete examples to the prompt (few-shot learning)","Train a new model from scratch on internal data"],lesson:"Few-shot learning (examples in the prompt) often lifts accuracy by 15 to 30% at no training cost. Always try it first — before changing models."},PrimeCare:{urgency:"IMPORTANT",problem:"The model takes 8+ seconds to answer. Users give up before the end.",question:"Which technique makes it feel faster without changing models?",answers:["Cap answers at 50 tokens","Stream the output — show tokens as they arrive","Cache every answer server-side"],lesson:"Streaming shows tokens as soon as they are generated. Users read while the model writes — perceived speed changes completely even if total time doesn't."},AutoFleet:{urgency:"MEDIUM",problem:"The automation workflow crashes and never restarts on intermittent API errors.",question:"Which resilience strategy should you implement?",answers:["Try/catch with an error log and stop the workflow","Exponential backoff with automatic retry (3 spaced attempts)","Send a Slack alert and wait for a human"],lesson:"Exponential backoff (wait 1s, then 2s, then 4s before retrying) is the standard for flaky APIs. It avoids hammering a service that is already struggling."},MindScope:{urgency:"CRITICAL",problem:"The analysis agent mixes up two similar conditions in 35% of cases.",question:"What is the first lever to try?",answers:["Switch API providers right away","Refine the prompt with precise distinguishing criteria and counter-examples","Send higher-resolution images to the model"],lesson:"Before changing models, optimize the prompt. Explicit distinguishing criteria and concrete counter-examples often improve accuracy by 20 to 40%."}},wv={chambre:{label:"Teen bedroom",sublabel:"The journey starts here"},"home-office":{label:"Home office",sublabel:"The first projects roll in"},coworking:{label:"Coworking space",sublabel:"The team takes shape"},startup:{label:"Startup offices",sublabel:"Time to scale!"},"scale-up":{label:"Scale-up",sublabel:"The empire is rising"},unicorn:{label:"Headquarters",sublabel:"Unicorn status!"}},Iv={"bot-workflows":["n8n workflow restarted","webhook received","HTTP 200 OK","retry #3 succeeded","42 tasks/min","6 am cron started"],"agent-copy":["draft v2 ready","H1 title rewritten","newsletter sent","LinkedIn post queued","product page shipped","hook A/B tested"],"agent-analytics":["dashboard updated","anomaly spotted","A/B test live","weekly report ready","cohort analysed","KPIs trending up"],"agent-audit":["GDPR audit done","vulnerability fixed","score: 94/100","tech debt: 4 days","tests all green","logs reviewed"],"agent-legal":["terms updated","clause approved","DPA drafted","quote sent","contract reviewed","GDPR register kept"],"agent-growth":["+500 leads","follow-up #2 sent","partner signed","pipeline full","demo booked","campaign live"],"agent-supervisor":["today's priorities","team review","delivery approved","workload balanced","target reached","agents in sync"],"agent-rag":["vector index updated","1,200 docs ingested","source cited","chunk #48 found","knowledge base grown","grounded answer"],"agent-voice":["call answered","appointment booked","transcript ready","switchboard open 24/7","callback scheduled","call summarised"]};function Cv(){Ut==="en"&&(G.forEach(n=>Object.assign(n,fv[n.id])),ne.forEach(n=>Object.assign(n,mv[n.id])),z.forEach(n=>Object.assign(n,gv[n.id])),qe.forEach(n=>Object.assign(n,_v[n.id])),ii.forEach(n=>Object.assign(n,yv[n.id])),si.forEach(n=>Object.assign(n,vv[n.id])),Jn.forEach(n=>Object.assign(n,bv[n.client])),ai.forEach(n=>Object.assign(n,wv[n.id])),Object.entries(Iv).forEach(([n,e])=>{Ya[n]=e}))}Cv();Ku();id();Ut==="en"&&(document.querySelector('.tab[data-tab="academy"]')?.classList.add("hidden"),document.getElementById("tab-academy")?.classList.add("hidden"));const Y=new qu,E=new Fu,K=new ad(E),Xe=new $d,Ot=new Jd,fu=new nh,$e=new rh;new dd;const Gn=new tv,me=new sv;me.setRateProvider(n=>E.getTotalRate(n));const ct=new ov,pe=new av,Ys=document.getElementById("market-banner"),mu=document.getElementById("market-banner-icon"),gu=document.getElementById("market-banner-name"),_u=document.getElementById("market-banner-desc"),Mi=document.getElementById("market-banner-effect"),Ua=document.getElementById("market-banner-timer");function yu(n,e){return n==="click"?p("market.click",{mult:e}):e>=1?p("market.incomeUp",{n:Math.round((e-1)*100)}):p("market.incomeDown",{n:Math.round((1-e)*100)})}ct.setCallbacks(n=>{const e=n.event.effect.multiplier,t=e>=1,i=yu(n.event.effect.type,e);mu.innerHTML=R(t?"trendUp":"trendDown"),gu.textContent=n.event.name,_u.textContent=n.event.description,Mi.textContent=i,Mi.className=`market-banner-effect${t?"":" malus"}`,Ys.classList.remove("hidden"),Ze(`${n.event.name} — ${n.event.description}`),$i()},n=>{Ys.classList.add("hidden"),Q(p("market.end",{name:n.event.name}),"orange")});const jn=document.getElementById("tab-reputation"),Ev=document.getElementById("tab-count-reputation"),ri=document.getElementById("tab-academy"),Tv=document.getElementById("tab-count-academy");let lt=null;const Sv=document.getElementById("incident-urgency"),Av=document.getElementById("incident-client"),kv=document.getElementById("incident-problem"),Rv=document.getElementById("incident-question"),Qs=document.getElementById("incident-answers"),Qr=document.getElementById("btn-incident-skip"),vu=document.getElementById("incident-result"),zn=document.getElementById("incident-result-icon"),Ba=document.getElementById("incident-lesson");let Js=!1,Xs=0,xi=null;const Pv=90,bu=3200,Zs=document.getElementById("btn-echo"),Kn=document.getElementById("echo-sub"),Is=document.getElementById("echo-bar-wrap"),Yn=document.getElementById("echo-bar-fill"),Fa=document.getElementById("echo-timer-label"),er=document.getElementById("btn-click"),Mv=document.getElementById("hd-currency"),xv=3;let y=Y.load();Y.startAutosave(()=>y);Ui();{const n=ct.getCurrent();if(n){const e=n.event.effect.multiplier,t=e>=1,i=yu(n.event.effect.type,e);mu.innerHTML=R(t?"trendUp":"trendDown"),gu.textContent=n.event.name,_u.textContent=n.event.description,Mi.textContent=i,Mi.className=`market-banner-effect${t?"":" malus"}`,Ys.classList.remove("hidden")}}const Ni=document.getElementById("tab-contracts"),Jr=document.getElementById("tab-count-contracts");me.init(n=>{Q(p("contract.new",{title:n.title}),"orange"),Jr.classList.add("has-new"),Di()},n=>{y=E.earn(y,n.reward),Y.save(y),K.markDirty(),Ze(p("contract.done",{reward:B(n.reward),client:n.client})),Rt(),Di()});const Nv=["offline-overlay","import-url-overlay","incident-overlay","prestige-overlay","share-overlay"],wu=[];let Li=null;function Lv(){return Nv.some(n=>!document.getElementById(n).classList.contains("hidden"))}function Gt(n,e){if(Li){wu.push(()=>Gt(n,e));return}e?.(),document.getElementById(n).classList.remove("hidden"),Li=n}function ve(n){document.getElementById(n).classList.add("hidden"),Li===n&&(Li=null);const e=wu.shift();e&&setTimeout(e,200)}Xe.onStageChange=()=>{$i()};const Cs=Y.getOfflineSeconds(y);if(Cs>10){const{state:n,earned:e}=E.applyOfflineEarnings(y,Cs);y=n,e>0&&Gt("offline-overlay",()=>{K.setOfflineStat(Ju(Cs)),document.getElementById("offline-earned-amount").textContent=B(e)})}const Le=Y.decodeFromURL();if(Le){const n=Object.values(Le.agents).reduce((t,i)=>t+i.count,0),e=Object.values(Le.clientsUnlocked).filter(Boolean).length;Gt("import-url-overlay",()=>{document.getElementById("import-stats").innerHTML=`
      <div class="import-stat-row"><span>${p("import.treasury")}</span><span>${B(Le.currency)}</span></div>
      <div class="import-stat-row"><span>${p("import.total")}</span><span>${B(Le.totalEarned)}</span></div>
      <div class="import-stat-row"><span>${p("import.agents")}</span><span>${n}</span></div>
      <div class="import-stat-row"><span>${p("import.clients")}</span><span>${e}</span></div>
      <div class="import-stat-row"><span>${p("import.prestiges")}</span><span>${Le.prestigeCount}</span></div>
    `})}y.totalEarned===0&&y.prestigeCount===0&&$e.show("first-click");const $a="bot-empire-seen-v1.1";try{localStorage.getItem($a)||(localStorage.setItem($a,"1"),y.prestigeCount>=1&&Ov(y.prestigeCount))}catch{}function Ov(n){const e=i=>i.filter(s=>(s.minPrestige??0)>=1&&(s.minPrestige??0)<=n).map(s=>s.name),t=[...e(G),...e(ne),...e(z)];t.length&&setTimeout(()=>{Ze(p("markets.list",{list:t.join(", ")})),Xe.announce(p("markets.kicker"),t.slice(0,2).join(" · "),t.slice(2).join(" · "))},bu)}const Iu=Y.isAvailable();if(!Iu){const n=document.createElement("div");n.className="notif orange incident-notice storage-notice",n.setAttribute("role","alert"),n.textContent=p("storage.unavailable"),document.getElementById("notifications").prepend(n)}Iu&&Gn.init(nv).then(async n=>{if(!n)return;const e=await Gn.getIfNewer(y);e?(y=e,Y.save(y),K.markDirty(),Xe.update(0,y),Ze(p("save.cloudRestored"))):Gn.push(y),Gn.startAutoSync(()=>y)});const wt=[10,100,1e3,1e4,1e5,1e6,1e7,1e8],Dv={10:p("milestone.10"),100:p("milestone.100"),1e3:p("milestone.1k"),1e4:p("milestone.10k"),1e5:p("milestone.100k"),1e6:p("milestone.1m"),1e7:p("milestone.10m"),1e8:p("milestone.100m")};let Fe=wt.findIndex(n=>n>y.totalEarned);Fe===-1&&(Fe=wt.length);const Es=100,Uv=12e3;let Ts=0,Qn=0;function Cu(n){Qn===0&&(Qn=n);const e=Math.min(n-Qn,1e3);for(Qn=n,Ts+=e;Ts>=Es;){const t=Es/1e3;ct.tick(),Qv();const i=Ot.tick(t),s=ct.getClickMultiplier();for(let u=0;u<i;u++)y=E.click(y,s),Hv();const r=ct.getIncomeMultiplier(),{state:o,result:a}=E.tick(y,t,r);for(y=o,Ts-=Es,a.newClients.forEach(u=>{K.markDirty();const d=ne.find(f=>f.id===u),h=d?.unlockDialogue??p("client.new",{name:u});Ze(h),Xe.stamp(d?.name??u),Gd(),$e.show("first-client",Uv)}),!$e.isSeen("first-agent")&&E.getTotalAgentCount(y)===0&&E.canBuyAgent(y,G[0].id)&&$e.show("first-agent");Fe<wt.length&&y.totalEarned>=wt[Fe];){const u=Dv[wt[Fe]]??p("milestone.generic",{amount:B(wt[Fe])});Ze(u),$i(),Yr("outremer",7),Fe++}const c=Object.values(y.agents).some(u=>u.count>0),l=fu.tick(t,c);l&&Gv(l),me.tick(y),xi&&(Xs-=t,Xs<=0&&ns())}Xe.update(e/1e3,y),K.update(y),qv(),eb(),$e.reposition(),requestAnimationFrame(Cu)}requestAnimationFrame(Cu);function Bv(n){y=E.click(y,ct.getClickMultiplier()),Ot.recordClick(),K.markDirty(),hv(n.currentTarget,Mv,xv+Math.floor(Math.random()*3)),Vd(),$e.dismiss("first-click")}er.addEventListener("click",n=>{Vv(n),Bv(n)});Zs.addEventListener("click",()=>{Ot.canActivate()&&(Ot.activate(),Q(p("echo.activated"),"orange"))});document.getElementById("tab-agents").addEventListener("click",n=>{const e=n.target.closest("[data-buy-mode]");if(e){K.setBuyMode(e.dataset.buyMode);return}const t=n.target,i=t.closest("[data-buy-agent]")??t.closest(".agent-card:not(.silhouette)")?.querySelector("[data-buy-agent]");if(!i||i.disabled)return;const s=i.dataset.buyAgent,r=y.agents[s]?.count??0,o=K.getBuyQuantity(y,s);if(y.currency<E.getAgentBulkCost(y,s,o))return;y=E.buyAgents(y,s,o);const a=y.agents[s]?.count??0;if(a>r){K.markDirty(),Rt(),Xe.celebratePurchase(s);const c=ln(a);if(c>ln(r)){const u=G.find(d=>d.id===s);Ze(p("tier.reached",{name:u?.name??s,n:Fi[c-1],mult:rt(un(a))})),$i()}$e.dismiss("first-agent");const l=i.closest(".agent-card");l&&(l.classList.add("just-bought"),setTimeout(()=>l.classList.remove("just-bought"),600))}});document.getElementById("tab-upgrades").addEventListener("click",n=>{const e=n.target.closest("[data-buy-upgrade]");if(!e)return;const t=e.dataset.buyUpgrade,i=y.upgradesPurchased[t];if(y=E.buyUpgrade(y,t),!i&&y.upgradesPurchased[t]){K.markDirty(),Q(p("upgrade.activated"),"purple"),Rt();const s=e.closest(".upgrade-card");s&&(s.classList.add("just-bought"),setTimeout(()=>s.classList.remove("just-bought"),600))}});document.querySelectorAll(".tab").forEach(n=>{n.addEventListener("click",()=>{const e=n.dataset.tab;document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active")),document.querySelectorAll(".tab-content").forEach(t=>t.classList.remove("active")),n.classList.add("active"),document.getElementById(`tab-${e}`).classList.add("active"),K.markDirty(),e==="contracts"&&(Jr.classList.remove("has-new"),Di()),e==="clients"&&$e.dismiss("first-client"),e==="reputation"&&Bi(),e==="academy"&&(lt=null,is())})});document.getElementById("btn-prestige").addEventListener("click",()=>{if(!E.canPrestige(y)||Lv())return;const n=1+(y.prestigeCount+1)*.15,e=E.getPrestigeRP(y),t=E.getPrestigeThreshold({...y,prestigeCount:y.prestigeCount+1});Gt("prestige-overlay",()=>{document.getElementById("modal-value").textContent=B(y.totalEarned),document.getElementById("modal-multiplier").textContent=p("prestige.gain",{rp:e}),document.getElementById("modal-total-multi").textContent=p("prestige.next",{mult:n.toFixed(2),amount:B(t)})})});document.getElementById("btn-prestige-confirm").addEventListener("click",()=>{const n=E.getPrestigeRP(y);y=E.prestige(y),Fe=0,Ui(),Y.save(y),K.markDirty(),ve("prestige-overlay"),jd(),Xe.playPrestige(),Yr("ambre",12),Q(p("prestige.done",{rp:n}),"purple"),Bi(),Fv(y.prestigeCount)});function Fv(n){const e=[...G.filter(t=>(t.minPrestige??0)===n).map(t=>t.name),...ne.filter(t=>(t.minPrestige??0)===n).map(t=>t.name),...z.filter(t=>(t.minPrestige??0)===n).map(t=>t.name)];n===0||!e.length||(Ze(p("markets.list",{list:e.join(", ")})),setTimeout(()=>Xe.announce(p("markets.kicker"),e.slice(0,2).join(" · "),e.slice(2).join(" · ")),bu))}document.getElementById("btn-prestige-cancel").addEventListener("click",()=>{ve("prestige-overlay")});document.getElementById("btn-offline-close").addEventListener("click",()=>{ve("offline-overlay")});document.getElementById("btn-import-url-confirm").addEventListener("click",()=>{Le&&(y=Le,Y.save(y),K.markDirty(),ve("import-url-overlay"),history.replaceState(null,"",window.location.pathname),Q(p("save.importedUrl"),"green"))});document.getElementById("btn-import-url-cancel").addEventListener("click",()=>{ve("import-url-overlay"),history.replaceState(null,"",window.location.pathname)});document.getElementById("btn-lang").addEventListener("click",()=>{Y.save(y),zu(Ut==="fr"?"en":"fr"),window.location.reload()});const en=document.getElementById("btn-sound");function Eu(){const n=tc();en.innerHTML=R(n?"soundOn":"soundOff"),en.setAttribute("aria-pressed",String(n)),en.setAttribute("aria-label",p(n?"sound.mute":"sound.unmute")),en.title=p(n?"sound.mute":"sound.unmute")}en.addEventListener("click",()=>{Hd(!tc()),Eu()});Eu();document.getElementById("btn-export").addEventListener("click",()=>{Y.exportToFile(y),Q(p("save.exported"),"green")});document.getElementById("btn-import").addEventListener("change",n=>{const e=n.target.files?.[0];if(!e)return;const t=new FileReader;t.onload=i=>{const s=i.target?.result,r=Y.importFromText(s);r?(y=r,Y.save(y),K.markDirty(),Q(p("save.imported"),"green")):Q(p("save.invalid"),"orange"),n.target.value=""},t.readAsText(e)});const tr=document.getElementById("share-url-input");document.getElementById("btn-share").addEventListener("click",()=>{Gt("share-overlay",()=>{tr.value=Y.encodeForURL(y)})});document.getElementById("btn-share-close").addEventListener("click",()=>{ve("share-overlay")});document.getElementById("btn-copy-url").addEventListener("click",()=>{navigator.clipboard.writeText(tr.value).then(()=>{Q(p("save.linkCopied"),"green"),ve("share-overlay")}).catch(()=>{tr.select(),document.execCommand("copy"),Q(p("save.linkCopied"),"green"),ve("share-overlay")})});const $v=".github.io";"serviceWorker"in navigator&&window.location.hostname.endsWith($v)&&window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})});function qv(){const n=Ot.getState();if(Zs.disabled=!n.canActivate&&!n.isActive,Zs.classList.toggle("active-echo",n.isActive),n.isActive)Kn.textContent=p("echo.active",{n:n.replayRemaining}),Is.style.display="",Yn.style.width=`${n.replayRemaining/60*100}%`,Fa.textContent=`${n.replayRemaining}s`;else if(n.isOnCooldown){const e=Math.floor(n.cooldownRemaining/60),t=n.cooldownRemaining%60;Kn.textContent=p("echo.cooldown",{time:`${e}:${String(t).padStart(2,"0")}`}),Is.style.display="",Yn.style.width=`${(120-n.cooldownRemaining)/120*100}%`,Fa.textContent=`${e}:${String(t).padStart(2,"0")}`,Yn.classList.add("cooldown")}else Yn.classList.remove("cooldown"),Is.style.display="none",n.clicksRecorded<3?Kn.textContent=p("echo.needClicks",{n:3-n.clicksRecorded}):Kn.textContent=p("echo.ready",{n:n.clicksRecorded})}let Ss=null;function Hv(){er.classList.add("ghost-clicking"),Ss&&clearTimeout(Ss),Ss=setTimeout(()=>{er.classList.remove("ghost-clicking")},300)}const Wv=3;function Tu(n){const e=document.getElementById("notifications");e.appendChild(n);const t=e.querySelectorAll(".notif:not(.incident-notice)");for(let i=0;i<t.length-Wv;i++)t[i].remove()}function Ze(n){const e=document.createElement("div");e.className="notif milestone",e.textContent=n,Tu(e),setTimeout(()=>{e.style.animation="fadeOut 0.3s ease forwards",setTimeout(()=>e.remove(),300)},5e3)}function Q(n,e="green"){const t=document.createElement("div");t.className=`notif ${e==="purple"?"purple":e==="orange"?"orange":""}`,t.textContent=n,Tu(t),setTimeout(()=>{t.style.animation="fadeOut 0.3s ease forwards",setTimeout(()=>t.remove(),300)},3e3)}function Vv(n){const e=n.currentTarget,t=document.createElement("div");t.className="ripple-dot";const i=e.getBoundingClientRect();t.style.left=`${n.clientX-i.left}px`,t.style.top=`${n.clientY-i.top}px`,e.appendChild(t),setTimeout(()=>t.remove(),500)}let Dt=null;function Gv(n){Dt=n,Xs=Pv;const e=document.createElement("div");e.className="notif orange incident-notice",e.innerHTML=`
    <button class="incident-notice-open" type="button"></button>
    <button class="incident-notice-close" type="button">×</button>
  `,e.querySelector(".incident-notice-close").setAttribute("aria-label",p("incident.ignore")),e.querySelector(".incident-notice-open").textContent=p("incident.notice",{client:n.client,reward:B(n.reward)}),e.querySelector(".incident-notice-open").addEventListener("click",()=>{Su(),jv(n)}),e.querySelector(".incident-notice-close").addEventListener("click",()=>ns()),document.getElementById("notifications").prepend(e),xi=e}function Su(){xi?.remove(),xi=null}function ns(){Su(),Dt=null,fu.resolve()}function jv(n){Dt=n,Js=!1,Sv.textContent=n.urgency,Av.textContent=n.client,kv.textContent=n.problem,Rv.textContent=n.question;const t=[...[0,1,2]].sort(()=>Math.random()-.5),i=t.map(r=>n.answers[r]),s=t.indexOf(n.correct);Dt._shuffledCorrect=s,Qs.innerHTML="",i.forEach((r,o)=>{const a=document.createElement("button");a.className="incident-answer-btn",a.textContent=r,a.addEventListener("click",()=>zv(o)),Qs.appendChild(a)}),vu.classList.add("hidden"),Qr.classList.remove("hidden"),Gt("incident-overlay")}function zv(n){if(Js||!Dt)return;Js=!0;const e=Dt,t=e._shuffledCorrect??e.correct,i=n===t;Qs.querySelectorAll(".incident-answer-btn").forEach((r,o)=>{r.disabled=!0,o===t?r.classList.add("correct"):o===n&&r.classList.add("wrong")}),i?(y=E.earn(y,e.reward),zn.innerHTML=R("check"),zn.className="incident-result-icon ok",Ba.textContent=p("incident.won",{reward:B(e.reward),lesson:e.lesson}),Q(p("incident.solved",{reward:B(e.reward)}),"green"),Rt()):(zn.innerHTML=R("cross"),zn.className="incident-result-icon ko",Ba.textContent=e.lesson,Q(p("incident.wrong"),"orange")),Qr.classList.add("hidden"),vu.classList.remove("hidden")}document.getElementById("btn-incident-close").addEventListener("click",()=>{ve("incident-overlay"),ns()});Qr.addEventListener("click",()=>{ve("incident-overlay"),ns()});function Oi(n){const e=Math.max(0,Math.floor(n/1e3));if(e<60)return{label:`${e}s`,urgent:!0};const t=Math.floor(e/60);if(t<60)return{label:`${t}min`,urgent:t<10};const i=Math.floor(t/60),s=t%60;return{label:`${i}h${s>0?s+"min":""}`,urgent:!1}}function Kv(n,e){const t=[];if(n.requiresRate){const i=E.getTotalRate(e);t.push({label:`≥ ${Ne(n.requiresRate)}`,met:i>=n.requiresRate})}if(n.requiresAgent){const i=e.agents[n.requiresAgent.id]?.count??0,s=G.find(r=>r.id===n.requiresAgent.id);t.push({label:`${s?.name??n.requiresAgent.id} ×${n.requiresAgent.count}`,met:i>=n.requiresAgent.count})}return t}function Di(){const n=me.getSlots(),e=n.filter(i=>i&&i.status==="available").length,t=n.filter(i=>i&&i.status==="accepted").length;Jr.textContent=String(e+t),Ni.innerHTML=`
    <div class="contracts-board">
      <div class="contracts-header">${p("contract.board",{available:e,accepted:t})}</div>
      ${n.map((i,s)=>Yv(i,s)).join("")}
    </div>
  `,n.forEach(i=>{if(!i||i.status!=="available")return;const s=Ni.querySelector(`[data-accept="${i.id}"]`);s&&s.addEventListener("click",()=>{me.canAccept(i,y,E.getTotalRate(y))&&(me.accept(i),Q(p("contract.accepted",{time:Oi(i.workTime*1e3).label}),"green"),Di())})})}function Yv(n,e){if(!n)return`
      <div class="contract-empty-slot">
        <div>${p("contract.emptySlot",{n:e+1})}</div>
        <div class="slot-timer">${p("contract.nextIn")}</div>
      </div>
    `;const t=p(n.rarity==="epic"?"contract.epic":n.rarity==="rare"?"contract.rare":"contract.common"),i=Kv(n,y),s=me.canAccept(n,y,E.getTotalRate(y)),r=me.getProgress(n);if(n.status==="available"){const o=Oi(n.expiresAt-Date.now());return`
      <div class="contract-card rarity-${n.rarity}">
        <div class="contract-top">
          <div class="contract-icon">${R("document")}</div>
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
          <span class="contract-reward">+${B(n.reward)}</span>
          <span class="contract-timer ${o.urgent?"urgent":""}">${R("clock")}${o.label}</span>
          <button class="btn-contract" data-accept="${n.id}" ${s?"":"disabled"}>
            ${p(s?"contract.accept":"contract.required")}
          </button>
        </div>
      </div>
    `}if(n.status==="accepted"){const o=Oi((n.completesAt??0)-Date.now());return`
      <div class="contract-card rarity-${n.rarity} status-accepted" data-contract-id="${n.id}">
        <div class="contract-top">
          <div class="contract-icon">${R("document")}</div>
          <div class="contract-meta">
            <div class="contract-client">${n.client} <span class="contract-rarity-badge">${t}</span></div>
            <div class="contract-title">${n.title}</div>
          </div>
        </div>
        <div class="contract-progress-wrap">
          <div class="contract-progress-track">
            <div class="contract-progress-fill" style="width:${Math.round(r*100)}%" data-progress-id="${n.id}"></div>
          </div>
          <span class="contract-timer">${R("clock")}<span class="contract-timer-text">${o.label}</span></span>
        </div>
        <div class="contract-bottom">
          <span class="contract-reward">+${B(n.reward)}</span>
          <button class="btn-contract in-progress" disabled>${p("contract.inProgress")}</button>
        </div>
      </div>
    `}return""}function Ui(){Ot.setCooldownMultiplier(E.getReputationEchoCooldownMult(y)),me.setReputation(E.getReputationExtraSlot(y),E.getReputationContractBonus(y)),Ev.textContent=String(y.reputationPoints??0)}function Bi(){const n=y.reputationPoints??0,e=E.getPrestigeRP(y);if(n===0&&Object.values(y.reputationPurchased??{}).every(c=>!c)){jn.innerHTML=`
      <div class="rep-intro">
        <span class="rep-intro-icon">${R("star")}</span>
        <div class="rep-intro-title">${p("rep.introTitle")}</div>
        <p class="rep-intro-text">
          ${p("rep.introText")}
          <br><br>
          <strong>${p("rep.nextShort",{rp:e})}</strong>
        </p>
      </div>
    `;return}const t=qe.map(c=>{const l=E.hasRepPerk(y,c.id),u=E.canBuyRepPerk(y,c.id);return`
      <div class="${["rep-perk-card",l?"owned":"",u?"affordable":""].filter(Boolean).join(" ")}">
        <div class="rep-perk-top">
          <span class="rep-perk-icon">${R(ed[c.id]??"star")}</span>
          <div class="rep-perk-meta">
            <div class="rep-perk-name">${c.name}</div>
            <div class="rep-perk-desc">${c.description}</div>
          </div>
        </div>
        <div class="rep-perk-footer">
          ${l?`<span class="rep-perk-cost owned-label">${p("rep.enabled")}</span>
               <button class="btn-rep-buy owned" disabled>${p("rep.owned")}</button>`:`<span class="rep-perk-cost">${R("star")}${c.cost}</span>
               <button class="btn-rep-buy" data-buy-rep="${c.id}" ${u?"":"disabled"}>
                 ${u?p("rep.buy"):p("rep.missing",{n:c.cost-n})}
               </button>`}
        </div>
      </div>
    `}).join(""),i=E.getNotorieteLevel(y),s=E.isNotorieteOpen(y),r=E.getNextNotorieteCost(y),o=E.canBuyNotoriete(y),a=`
    <div class="rep-perk-card rep-perk-wide${s?"":" locked"}${o?" affordable":""}${i>0?" owned":""}">
      <div class="rep-perk-top">
        <span class="rep-perk-icon">${R("crown")}</span>
        <div class="rep-perk-meta">
          <div class="rep-perk-name">${p("rep.notoriete")}</div>
          <div class="rep-perk-desc">${s?p("rep.notorieteDesc"):p("rep.notorieteLocked",{n:qe.length})}</div>
          ${i>0?`<div class="rep-perk-level">${p("rep.notorieteLevel",{n:i,pct:Math.round(i*Va*100)})}</div>`:""}
        </div>
      </div>
      ${Number.isFinite(r)?`
      <div class="rep-perk-footer">
        <span class="rep-perk-cost">${R("star")}${r}</span>
        <button class="btn-rep-buy" data-buy-noto ${o?"":"disabled"}>
          ${o?p("rep.buy"):s?p("rep.missing",{n:r-n}):R("lock")}
        </button>
      </div>`:""}
    </div>`;jn.innerHTML=`
    <div class="reputation-header">
      <div class="reputation-balance">
        <span class="rep-value">${R("star")}${n}</span>
        <span class="rep-label">${p("rep.points")}</span>
      </div>
      <div class="reputation-next">
        ${p("rep.next")}<br><strong>+${e} pts</strong>
      </div>
    </div>
    <div class="rep-perk-grid">${s?a+t:t+a}</div>
  `,jn.querySelector("[data-buy-noto]")?.addEventListener("click",()=>{const c=E.getNotorieteLevel(y);y=E.buyNotoriete(y);const l=E.getNotorieteLevel(y);l>c&&(Q(p("rep.notorieteBought",{n:l}),"purple"),Rt(),Ui(),Y.save(y),K.markDirty(),Bi())}),jn.querySelectorAll("[data-buy-rep]").forEach(c=>{c.addEventListener("click",()=>{const l=c.dataset.buyRep,u=E.hasRepPerk(y,l);if(y=E.buyRepPerk(y,l),!u&&E.hasRepPerk(y,l)){const d=qe.find(h=>h.id===l);Q(p("rep.activated",{name:d.name}),"purple"),Rt(),Ui(),Y.save(y),K.markDirty(),Bi()}})})}function Qv(){const n=ct.getCurrent();if(!n)return;const e=Math.max(0,Math.ceil((n.endsAt-Date.now())/1e3));if(e<60)Ua.textContent=`${e}s`;else{const t=Math.floor(e/60),i=e%60;Ua.textContent=`${t}:${String(i).padStart(2,"0")}`}}function Au(){const n=In.length,e=pe.getTotalCompleted();Tv.textContent=`${e}/${n}`}function is(){if(Au(),lt){const s=In.find(r=>r.id===lt);if(s){Xv(s);return}}const n=pe.getState().totalXP,e=In.reduce((s,r)=>s+r.xpReward,0),t=e>0?Math.round(n/e*100):0;let i=`
    <div class="academy-intro">
      <div class="academy-intro-title">${R("cap")}IA ACADEMY</div>
      <div class="academy-intro-sub">Deviens expert IA sans quitter le jeu</div>
    </div>
    <div class="academy-xp-bar-wrap">
      <span class="academy-xp-label">Progression</span>
      <div class="academy-xp-track">
        <div class="academy-xp-fill" style="width:${t}%"></div>
      </div>
      <span class="academy-xp-value">${n} XP</span>
    </div>
  `;for(const s of cv){const r=lv(s.id),o=r.filter(c=>pe.isCompleted(c.id)).length,a=o>0||s.id==="ch1";i+=`
      <div class="chapter-card${a?" open":""}" data-chapter="${s.id}">
        <div class="chapter-header">
          <div class="chapter-icon">${R("book")}</div>
          <div class="chapter-meta">
            <div class="chapter-title">Chapitre ${s.number} — ${s.title}</div>
            <div class="chapter-subtitle">${s.subtitle}</div>
          </div>
          <span class="chapter-progress">${o}/${r.length}</span>
          <span class="chapter-chevron">${R("chevron")}</span>
        </div>
        <div class="chapter-challenges">
          ${r.map(c=>Jv(c)).join("")}
        </div>
      </div>
    `}ri.innerHTML=i,ri.querySelectorAll(".chapter-header").forEach(s=>{s.addEventListener("click",()=>{s.closest(".chapter-card").classList.toggle("open")})}),ri.querySelectorAll(".challenge-item:not(.locked)").forEach(s=>{s.addEventListener("click",()=>{lt=s.dataset.challenge,is()})})}function Jv(n){const e=pe.isCompleted(n.id),t=pe.isUnlocked(n),i=["challenge-item",e?"completed":"",t?"":"locked"].filter(Boolean).join(" "),s=R(e?"check":t?"play":"lock");return`
    <div class="${i}" data-challenge="${n.id}">
      <div class="challenge-status">${s}</div>
      <div class="challenge-info">
        <div class="challenge-name">${n.title}</div>
        <div class="challenge-sub">${n.subtitle}</div>
      </div>
      <span class="challenge-reward">${e?"✓":`+${B(n.euroReward)}`}</span>
    </div>
  `}function Xv(n){const e=pe.isCompleted(n.id);if(ri.innerHTML=`
    <div class="gpturbo-view">
      <button class="gpturbo-back" id="academy-back" type="button">${R("back")}Retour à l'Academy</button>

      <div class="gpturbo-context">
        <div class="gpturbo-context-title">${R("document")}Ta mission</div>
        <div class="gpturbo-context-body">${n.context}</div>
        <div class="gpturbo-tips">
          ${n.tips.map(t=>`<span class="gpturbo-tip">${t}</span>`).join("")}
        </div>
      </div>

      <div class="gpturbo-chat" id="gpturbo-chat">
        <div class="gpturbo-chat-header">
          <div class="gpturbo-avatar">${R("bolt")}</div>
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
            Envoyer ${R("send")}
          </button>
        </div>
      </div>

      <div id="gpturbo-score-zone"></div>
    </div>
  `,document.getElementById("academy-back").addEventListener("click",()=>{lt=null,is()}),e){const t=document.getElementById("gpturbo-score-zone");t.innerHTML=`<div class="gpturbo-score"><div class="score-title">${R("check")}Défi complété !</div><p class="score-lesson">${n.lesson}</p></div>`;return}document.getElementById("gpturbo-send").addEventListener("click",()=>{qa(n)}),document.getElementById("gpturbo-input").addEventListener("keydown",t=>{t.key==="Enter"&&t.ctrlKey&&qa(n)})}function qa(n){const e=document.getElementById("gpturbo-input"),t=e.value.trim();if(t.length<3)return;const i=document.getElementById("gpturbo-messages"),s=document.getElementById("gpturbo-send");e.disabled=!0,s.disabled=!0;const r=document.createElement("div");r.className="gpturbo-msg-user",r.textContent=t,i.appendChild(r);const o=document.createElement("div");o.className="gpturbo-msg-typing",o.innerHTML='<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>',i.appendChild(o),i.scrollTop=i.scrollHeight;const a=pe.scorePrompt(n,t),c=900+Math.random()*800;setTimeout(()=>{o.remove();const l=document.createElement("div");l.className="gpturbo-msg-ai",i.appendChild(l),i.scrollTop=i.scrollHeight,pv(l,a.response,10,()=>{i.scrollTop=i.scrollHeight,Zv(n,a)})},c)}function Zv(n,e){const t=document.getElementById("gpturbo-score-zone"),i=e.maxScore>0?Math.round(e.score/e.maxScore*100):100,s=e.tier==="excellent"?"Excellent !":e.tier==="good"?"Bien joué":e.tier==="decent"?"Pas mal":"À améliorer",r=n.type==="discovery"?"":`
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
  `,o=n.lesson.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>"),a=In.find(c=>c.unlockAfter===n.id);t.innerHTML=`
    <div class="gpturbo-score">
      <div class="score-header">
        <span class="score-title">${s}</span>
        <span class="score-value ${e.tier}">${n.type==="discovery"?R("star"):`${i}/100`}</span>
      </div>
      ${r}
      <div class="score-lesson">${o}</div>
      <div class="score-reward">
        <span class="score-reward-item score-reward-euro">+${B(n.euroReward)}</span>
        <span class="score-reward-item score-reward-xp">+${n.xpReward} XP</span>
      </div>
      <button class="btn-next-challenge" id="btn-next-challenge">
        ${a&&!pe.isCompleted(a.id)?`Prochain défi : ${a.title} →`:"← Retour à l'Academy"}
      </button>
    </div>
  `,t.scrollIntoView({behavior:"smooth",block:"nearest"}),pe.isCompleted(n.id)||(pe.complete(n.id,n.xpReward),y=E.earn(y,n.euroReward),Y.save(y),K.markDirty(),Au(),uv(n.euroReward,t),Yr("outremer",8),Q(`Défi complété ! +${B(n.euroReward)} +${n.xpReward} XP`,"green")),document.getElementById("btn-next-challenge").addEventListener("click",()=>{a&&!pe.isCompleted(a.id)?lt=a.id:lt=null,is()})}function eb(){const n=me.getSlots();for(const e of n){if(!e||e.status!=="accepted")continue;const t=Ni.querySelector(`[data-progress-id="${e.id}"]`);t&&(t.style.width=`${Math.round(me.getProgress(e)*100)}%`);const i=Ni.querySelector(`[data-contract-id="${e.id}"] .contract-timer`);if(i){const s=Oi((e.completesAt??0)-Date.now()),r=i.querySelector(".contract-timer-text");r&&(r.textContent=s.label),i.className=`contract-timer${s.urgent?" urgent":""}`}}}
