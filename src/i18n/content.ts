/**
 * Contenu de jeu traduit. Le français reste la source dans `src/config/*` ;
 * ce fichier porte la version anglaise, indexée par identifiant.
 * `applyContentLanguage()` remplace les textes en place au démarrage quand la langue est l'anglais.
 */

import { LANG } from './i18n.ts';
import { AGENTS } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { UPGRADES } from '../config/upgrades.ts';
import { REPUTATION_PERKS } from '../config/reputationPerks.ts';
import { CONTRACTS } from '../config/contracts.ts';
import { MARKET_EVENTS } from '../config/marketEvents.ts';
import { INCIDENTS, type IncidentQuestion } from '../systems/IncidentSystem.ts';
import { STAGES, AGENT_LINES } from '../ui/Bureau.ts';

const EN_AGENTS: Record<string, { name: string; description: string }> = {
  'bot-workflows':    { name: 'Workflow Bot',     description: 'Automates repetitive tasks with n8n' },
  'agent-copy':       { name: 'Copy Agent',       description: 'Writes marketing content around the clock' },
  'agent-analytics':  { name: 'Analytics Agent',  description: 'Crunches data and tunes performance' },
  'agent-audit':      { name: 'Audit Agent',      description: 'Audits client projects, opens up key accounts' },
  'agent-legal':      { name: 'Legal Agent',      description: 'Terms, GDPR, compliance — opens public tenders' },
  'agent-growth':     { name: 'Growth Agent',     description: 'Cold outreach, partnerships, large-scale distribution' },
  'agent-supervisor': { name: 'Supervisor Agent', description: 'Orchestrates every agent at scale' },
};

const EN_CLIENTS: Record<string, { name: string; sector: string; unlockDialogue: string }> = {
  'restaurant-local': { name: 'Le Comptoir',      sector: 'Restaurant 🍺',        unlockDialogue: '☕ Le Comptoir signs! "A chatbot to take lunch bookings, can you do that?"' },
  'cabinet-medical':  { name: 'MédiaTech+',       sector: 'Digital health',       unlockDialogue: '💊 MédiaTech+ is on board! "The AI must stay GDPR-compliant." We\'ve got it.' },
  'pme-ecommerce':    { name: 'BricoMax',         sector: 'E-commerce',           unlockDialogue: '🛒 BricoMax signs! "Our competitors already have AI. Help us catch up."' },
  'groupe-hotelier':  { name: 'PalmHôtel Group',  sector: 'Hospitality & Luxury', unlockDialogue: '🌴 PalmHôtel Group confirms! "Fully automate the virtual concierge."' },
  'grand-compte':     { name: 'GigaSoft Corp.',   sector: 'Big Tech',             unlockDialogue: '🔥 GigaSoft Corp. joins the empire! Unlimited budget. Flawless execution expected.' },
  'gouvernement':     { name: 'GovAI',            sector: 'Public sector',        unlockDialogue: '🏛️ GovAI awards the contract! The State trusts your agency. Historic.' },
};

const EN_UPGRADES: Record<string, { name: string; description: string; effectLabel: string }> = {
  'api-rate-x2':      { name: 'API Rate Limit ×2',          description: 'Doubles the pace of your workflow bots',           effectLabel: 'Workflow Bot ×2' },
  'gpt5-integration': { name: 'GPT-5 Integration',          description: 'The Copy Agent writes higher-quality content',     effectLabel: 'Copy Agent ×3' },
  'iso-certification':{ name: 'ISO 27001 Certification',    description: 'Your audits are worth twice as much',              effectLabel: 'Audit Agent ×2' },
  'click-boost':      { name: 'Click Automation',           description: 'Every manual task earns 5× more',                  effectLabel: 'Click ×5' },
  'venture-round':    { name: 'Series A Funding',           description: 'The whole agency runs at full throttle',           effectLabel: 'All income ×1.5' },
  'ai-sovereignty':   { name: 'Sovereign AI',               description: 'Your agency becomes a national AI reference',      effectLabel: 'All income ×3' },
  'n8n-enterprise':   { name: 'n8n Enterprise License',     description: 'Workflows run with no speed limits',               effectLabel: 'Workflow Bot ×4' },
  'mcp-protocol':     { name: 'Full-Stack MCP Protocol',    description: 'All your agents talk to each other in real time',  effectLabel: 'All income ×2' },
};

const EN_PERKS: Record<string, { name: string; description: string }> = {
  'rep-start-bonus':    { name: 'Seed capital',      description: 'Start every prestige with €2,000 in your pocket.' },
  'rep-click-x2':       { name: 'Renowned expert',   description: 'Your manual tasks are worth 2× more.' },
  'rep-contract-slot':  { name: 'Established name',  description: 'A 4th contract slot, unlocked for good.' },
  'rep-contract-bonus': { name: 'Premium margins',   description: 'All contract rewards +25%.' },
  'rep-offline-rate':   { name: 'Always on',         description: 'Offline income goes from 50% to 75%.' },
  'rep-agent-discount': { name: 'Elite network',     description: 'All agents cost 20% less.' },
  'rep-echo-boost':     { name: 'Cruising speed',    description: 'ECHO mode cooldown halved.' },
  'rep-income-x125':    { name: 'AI expertise',      description: 'All agent income ×1.25, permanently.' },
};

const EN_CONTRACTS: Record<string, { client?: string; title: string; description: string }> = {
  'audit-flash-retail':     { title: 'Flash chatbot audit',        description: 'Their chatbot answers in 8s. They want under 2s. Express audit needed.' },
  'content-rush-startup':   { title: '20 urgent LinkedIn posts',   description: 'Fundraising in 48h. They need content now.' },
  'workflow-bug-fix':       { title: 'Workflow down in prod',      description: '3,000 emails stuck since this morning. Fix it now.' },
  'data-extract-simple':    { title: 'CSV → insights',             description: '10,000 rows to analyse. Report due in 2h for the board meeting.' },
  'rgpd-quick-check':       { title: 'Express GDPR check',         description: 'Regulator audit tomorrow. Forms and cookies to review.' },
  'social-media-crisis':    { title: 'Social media crisis',        description: 'Negative post gone viral. 10 calibrated replies needed within the hour.' },
  'api-integration-express':{ title: 'Express API integration',    description: 'Connect Stripe + n8n before tomorrow\'s launch.' },
  'newsletter-automation':  { title: 'Newsletter automation',      description: '5 onboarding sequences to set up. Client in a hurry.' },
  'bank-audit-full':        { title: 'Full AI audit — bank',       description: 'Regulatory + GDPR compliance for their new credit scoring system.' },
  'hospital-chatbot':       { title: 'Medical chatbot rollout',    description: 'ER triage assistant. Medical sign-off required. Recurring contract.' },
  'media-scraping':         { title: 'Real-time media pipeline',   description: '500 RSS sources → summaries → newsletter. Full architecture.' },
  'legal-contract-review':  { title: 'Review 200 AI contracts',    description: 'Merger in progress. 200 supplier contracts to analyse in 24h.' },
  'growth-series-a':        { title: 'Series A go-to-market plan', description: 'Pitch deck + 90-day content plan + outreach sequences. Investors waiting.' },
  'ecommerce-optimization': { title: 'E-commerce conversion boost', description: 'AI A/B tests on 40 landing pages. Deadline: Black Friday in 3 days.' },
  'analytics-dashboard':    { title: 'C-level analytics dashboard', description: '12 KPIs, 3 markets, real time. Board presentation on Monday.' },
  'ai-security-audit':      { title: 'AI pentest + report',        description: 'Prompt injection, data leakage, model inversion. Certified report.' },
  'ministere-ia-project':   { client: 'MinistryAI',  title: 'Tender — State AI',           description: 'A system processing 2M files a year. Multi-year contract. Now or never.' },
  'ipo-ai-audit':           { title: 'Pre-IPO AI audit',           description: 'IPO in 30 days. Full due diligence of every AI system. Confidential.' },
  'unicorn-partnership':    { title: 'Annual strategic partnership', description: 'Outsource the whole AI stack. 12 months, dedicated team.' },
  'media-empire':           { client: 'Media Group', title: 'Editorial AI — 10 outlets',   description: 'End-to-end automation: monitoring, writing, SEO, distribution. National group.' },
  'defense-contract':       { client: 'Defense AI',  title: 'Defense ministry contract',   description: 'Open-source intelligence analysis. Top secret. 8-hour window.' },
  'global-rollout':         { title: 'Global rollout, 40 countries', description: 'Full AI stack — 40 languages, local compliance, 24/7 support. Everything.' },
  'acquisition-ia':         { title: 'Acquisition — AI valuation', description: 'A VC wants to buy your tech. Fast negotiation, 6-hour window.' },
};

const EN_MARKET: Record<string, { name: string; description: string }> = {
  'chatgpt-outage':   { name: 'ChatGPT outage',              description: 'Clients flock to your agency — income doubled!' },
  'new-model-launch': { name: 'GPT-Next launch',             description: 'Global AI hype boosts your deals.' },
  'eu-regulation':    { name: 'EU AI regulation',            description: 'New European rules slow the market down.' },
  'linkedin-viral':   { name: 'Viral LinkedIn post',         description: 'Your agency is buzzing — every click is worth triple!' },
  'vc-interest':      { name: 'Investor interest',           description: 'VCs are eyeing your sector. Income +80%.' },
  'competitor-down':  { name: 'Competitor goes bust',        description: 'Their clients need an alternative — that\'s you!' },
  'ai-winter':        { name: 'AI media winter',             description: 'The press turns against AI. Income drops.' },
  'tech-conference':  { name: 'VivaTech Paris',              description: 'You\'re a speaker — inbound leads are up.' },
  'data-scandal':     { name: 'AI data scandal',             description: 'Distrust of AI hits your agency too.' },
  'automation-wave':  { name: 'Automation wave',             description: 'Every small business wants to automate now!' },
  'claude-launch':    { name: 'New Claude model',            description: 'The model\'s power multiplies your output.' },
  'budget-cut':       { name: 'Budget cuts',                 description: 'Your clients slash IT budgets. Income reduced.' },
  'startup-boom':     { name: 'Startup boom',                description: 'The startup scene explodes — and so do your leads.' },
  'harvard-study':    { name: 'Harvard study: +40% productivity', description: 'A study proves your ROI. Deals come in fast.' },
  'gpu-costs':        { name: 'GPU costs skyrocket',         description: 'Margins melt as inference costs climb.' },
};

type IncidentText = Pick<IncidentQuestion, 'urgency' | 'problem' | 'question' | 'answers' | 'lesson'>;

/** Incidents indexés par nom de client (unique dans la liste). */
const EN_INCIDENTS: Record<string, IncidentText> = {
  'MégaRetail': {
    urgency: '🔴 CRITICAL',
    problem: 'The chatbot answers with 2022 data and makes up promotions that don\'t exist.',
    question: 'What is the best short-term fix?',
    answers: ['Raise the model temperature to 1.5', 'Add RAG over the up-to-date product catalog', 'Switch to a newer model'],
    lesson: 'RAG (Retrieval Augmented Generation) grounds answers in real, current data — the model can only answer from what is in the knowledge base.',
  },
  'PharmaPlus': {
    urgency: '🔴 URGENT',
    problem: 'The agent invents drug dosages — potentially dangerous output.',
    question: 'How do you secure the system first?',
    answers: ['Add a legal disclaimer to the answers', 'Restrict answers to the validated medical database only', 'Switch to free conversation mode for flexibility'],
    lesson: 'In critical domains the model must be grounded in a validated source. Hallucinations drop by 80%+ when the model is anchored to reliable references.',
  },
  'SpeedLogistix': {
    urgency: '🟠 IMPORTANT',
    problem: 'API calls cost 3× the planned budget. The client threatens to cancel.',
    question: 'What is the most likely cause?',
    answers: ['The model uses too much compute', 'Prompts are too long and there is no semantic cache', 'The server retries calls too often'],
    lesson: 'A semantic cache stores answers to similar queries. Combined with prompt compression, it cuts costs by 60 to 80%.',
  },
  'LexGroup': {
    urgency: '🔴 CRITICAL',
    problem: 'A user got the legal chatbot to ignore its system instructions.',
    question: 'This kind of attack is called…',
    answers: ['SQL Injection', 'Prompt Injection', 'Cross-Site Scripting (XSS)'],
    lesson: 'Prompt injection slips malicious instructions into the input to hijack the model\'s behavior. Input validation and system guardrails are essential.',
  },
  'FluentAI': {
    urgency: '🟠 IMPORTANT',
    problem: 'Machine translations are inconsistent — same text, different results every session.',
    question: 'Which setting is probably misconfigured?',
    answers: ['The temperature is too high (0.9+)', 'The model is short on RAM', 'The system prompt is too short'],
    lesson: 'Temperature controls how creative the model is. For precision tasks (translation, data extraction), a low temperature (0.0-0.2) keeps results consistent.',
  },
  'DataNova': {
    urgency: '🟡 MEDIUM',
    problem: 'The agent keeps overflowing the context window on long reports.',
    question: 'Which technique fixes this without changing models?',
    answers: ['Skip the overly long parts of the document', 'Split the document into chunks and process them in parts', 'Pay for a 128k-token model'],
    lesson: 'Chunking splits long documents into segments processed in sequence with intermediate summaries. It is the backbone of any solid RAG pipeline — before raising costs.',
  },
  'ViralBoost': {
    urgency: '🟠 IMPORTANT',
    problem: 'The content-generation agent loops forever and never delivers.',
    question: 'What is missing from the agent\'s architecture?',
    answers: ['A more powerful language model', 'A stop condition and a maximum iteration count', 'More memory on the server'],
    lesson: 'Every agent needs an explicit stop condition (max_iterations, stop_condition). Without guardrails, LLM agents can loop endlessly and blow up the bill.',
  },
  'GreenBank': {
    urgency: '🔴 CRITICAL',
    problem: 'Customer PII is being sent to a third-party LLM API. The DPO is calling the lawyers.',
    question: 'GDPR-safe emergency fix?',
    answers: ['Anonymize data before sending it, or host the model in-house', 'Add a cookie consent banner to the site', 'Send the data over HTTPS — that\'s enough for compliance'],
    lesson: 'Cloud LLM APIs are not GDPR-safe by default. Anonymization (PII masking) or self-hosting (Ollama, vLLM) are the only truly compliant options.',
  },
  'QuickSort': {
    urgency: '🟡 MEDIUM',
    problem: 'The support ticket classifier is 65% accurate. The client expected 90%+.',
    question: 'How do you improve it fast without retraining?',
    answers: ['Jump straight to a bigger model', 'Add 3 to 5 concrete examples to the prompt (few-shot learning)', 'Train a new model from scratch on internal data'],
    lesson: 'Few-shot learning (examples in the prompt) often lifts accuracy by 15 to 30% at no training cost. Always try it first — before changing models.',
  },
  'PrimeCare': {
    urgency: '🟠 IMPORTANT',
    problem: 'The model takes 8+ seconds to answer. Users give up before the end.',
    question: 'Which technique makes it feel faster without changing models?',
    answers: ['Cap answers at 50 tokens', 'Stream the output — show tokens as they arrive', 'Cache every answer server-side'],
    lesson: 'Streaming shows tokens as soon as they are generated. Users read while the model writes — perceived speed changes completely even if total time doesn\'t.',
  },
  'AutoFleet': {
    urgency: '🟡 MEDIUM',
    problem: 'The automation workflow crashes and never restarts on intermittent API errors.',
    question: 'Which resilience strategy should you implement?',
    answers: ['Try/catch with an error log and stop the workflow', 'Exponential backoff with automatic retry (3 spaced attempts)', 'Send a Slack alert and wait for a human'],
    lesson: 'Exponential backoff (wait 1s, then 2s, then 4s before retrying) is the standard for flaky APIs. It avoids hammering a service that is already struggling.',
  },
  'MindScope': {
    urgency: '🔴 CRITICAL',
    problem: 'The analysis agent mixes up two similar conditions in 35% of cases.',
    question: 'What is the first lever to try?',
    answers: ['Switch API providers right away', 'Refine the prompt with precise distinguishing criteria and counter-examples', 'Send higher-resolution images to the model'],
    lesson: 'Before changing models, optimize the prompt. Explicit distinguishing criteria and concrete counter-examples often improve accuracy by 20 to 40%.',
  },
};

const EN_STAGES: Record<string, { label: string; sublabel: string }> = {
  'chambre':     { label: 'Teen bedroom',      sublabel: 'The journey starts here' },
  'home-office': { label: 'Home office',       sublabel: 'The first projects roll in' },
  'coworking':   { label: 'Coworking space',   sublabel: 'The team takes shape' },
  'startup':     { label: 'Startup offices',   sublabel: 'Time to scale!' },
  'scale-up':    { label: 'Scale-up',          sublabel: 'The empire is rising' },
  'unicorn':     { label: 'Headquarters',      sublabel: 'Unicorn status!' },
};

const EN_AGENT_LINES: Record<string, string[]> = {
  'bot-workflows':    ['n8n workflow restarted', 'webhook received', 'HTTP 200 OK', 'retry #3 succeeded', '42 tasks/min', '6 am cron started'],
  'agent-copy':       ['draft v2 ready', 'H1 title rewritten', 'newsletter sent', 'LinkedIn post queued', 'product page shipped', 'hook A/B tested'],
  'agent-analytics':  ['dashboard updated', 'anomaly spotted', 'A/B test live', 'weekly report ready', 'cohort analysed', 'KPIs trending up'],
  'agent-audit':      ['GDPR audit done', 'vulnerability fixed', 'score: 94/100', 'tech debt: 4 days', 'tests all green', 'logs reviewed'],
  'agent-legal':      ['terms updated', 'clause approved', 'DPA drafted', 'quote sent', 'contract reviewed', 'GDPR register kept'],
  'agent-growth':     ['+500 leads', 'follow-up #2 sent', 'partner signed', 'pipeline full', 'demo booked', 'campaign live'],
  'agent-supervisor': ["today's priorities", 'team review', 'delivery approved', 'workload balanced', 'target reached', 'agents in sync'],
};

/** Remplace en place les textes de contenu par leur version anglaise (sans effet en français). */
export function applyContentLanguage(): void {
  if (LANG !== 'en') return;

  AGENTS.forEach(a => Object.assign(a, EN_AGENTS[a.id]));
  CLIENTS.forEach(c => Object.assign(c, EN_CLIENTS[c.id]));
  UPGRADES.forEach(u => Object.assign(u, EN_UPGRADES[u.id]));
  REPUTATION_PERKS.forEach(p => Object.assign(p, EN_PERKS[p.id]));
  CONTRACTS.forEach(c => Object.assign(c, EN_CONTRACTS[c.id]));
  MARKET_EVENTS.forEach(e => Object.assign(e, EN_MARKET[e.id]));
  INCIDENTS.forEach(q => Object.assign(q, EN_INCIDENTS[q.client]));
  STAGES.forEach(s => Object.assign(s, EN_STAGES[s.id]));
  Object.entries(EN_AGENT_LINES).forEach(([id, lines]) => { AGENT_LINES[id] = lines; });
}
