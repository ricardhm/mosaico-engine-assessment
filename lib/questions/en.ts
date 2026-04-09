import type { Question } from './types'

const questions: Question[] = [
  // ── GROWTH ENGINE ────────────────────────────────────────────────────
  // G1 — Customer Data Infrastructure
  { id: 'g_1_1', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 1,
    text: 'How completely does your organization capture customer identity across all purchase and interaction touchpoints (online, in-store, app, service)?' },
  { id: 'g_1_2', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 2,
    text: 'Do you have a unified customer record that consolidates behavior, transactions, and demographics into one profile?' },
  { id: 'g_1_3', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 3,
    text: 'How mature are your data governance policies around customer data — consent management, regulatory compliance, data retention rules, and access controls?' },
  { id: 'g_1_4', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 4,
    text: 'To what extent can your marketing and commerce teams access customer data — profiles, purchase history, and behavioral signals — for segmentation and campaign execution without engineering support, from no self-serve access at all to fully autonomous?' },

  // G2 — Segmentation & Personalization
  { id: 'g_2_1', pillarId: 'g2', engine: 'growth', pillarIndex: 2, questionIndex: 1,
    text: 'How mature is your customer segmentation practice — from no defined segments at all, to fully dynamic micro-segments that update automatically based on real-time behavior?' },
  { id: 'g_2_2', pillarId: 'g2', engine: 'growth', pillarIndex: 2, questionIndex: 2,
    text: 'To what degree does your website, app, or storefront serve personalized content, product recommendations, or pricing to different customer segments?' },
  { id: 'g_2_3', pillarId: 'g2', engine: 'growth', pillarIndex: 2, questionIndex: 3,
    text: 'How systematically do you test personalization variants (A/B or multivariate) and measure their revenue impact?' },
  { id: 'g_2_4', pillarId: 'g2', engine: 'growth', pillarIndex: 2, questionIndex: 4,
    text: 'Can you execute a new personalized campaign for a specific segment within one business day without significant technical work?' },

  // G3 — Lifecycle & Retention Marketing
  { id: 'g_3_1', pillarId: 'g3', engine: 'growth', pillarIndex: 3, questionIndex: 1,
    text: 'Do you have defined, automated customer lifecycle stages (new, active, at-risk, lapsed) with triggered communications for each transition?' },
  { id: 'g_3_2', pillarId: 'g3', engine: 'growth', pillarIndex: 3, questionIndex: 2,
    text: 'How sophisticated is your churn prediction — do you use predictive models to flag at-risk customers before they lapse, or do you react after the fact?' },
  { id: 'g_3_3', pillarId: 'g3', engine: 'growth', pillarIndex: 3, questionIndex: 3,
    text: 'How well do you measure and actively manage customer lifetime value (LTV) as a primary business metric across channels and cohorts?' },
  { id: 'g_3_4', pillarId: 'g3', engine: 'growth', pillarIndex: 3, questionIndex: 4,
    text: 'How consistently do you execute win-back programs for lapsed customers, and can you measure their incremental revenue contribution?' },

  // G4 — Paid & Owned Channel Optimization
  { id: 'g_4_1', pillarId: 'g4', engine: 'growth', pillarIndex: 4, questionIndex: 1,
    text: 'How tightly connected is your paid media spend (Google, Meta, etc.) to first-party customer data for audience targeting, suppression, and lookalike modeling?' },
  { id: 'g_4_2', pillarId: 'g4', engine: 'growth', pillarIndex: 4, questionIndex: 2,
    text: 'Do you have a documented attribution model that your teams agree on and use to make channel budget decisions — beyond last-click?' },
  { id: 'g_4_3', pillarId: 'g4', engine: 'growth', pillarIndex: 4, questionIndex: 3,
    text: 'How systematically do you optimize email and SMS send cadence, deliverability, and content based on engagement and revenue metrics?' },
  { id: 'g_4_4', pillarId: 'g4', engine: 'growth', pillarIndex: 4, questionIndex: 4,
    text: 'To what extent do you manage your presence and performance on marketplace channels (Amazon, MercadoLibre, etc.) with structured analytics, pricing strategies, and listing optimization?' },

  // G5 — Revenue Analytics & Forecasting
  { id: 'g_5_1', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 1,
    text: 'Can you report on revenue by channel, segment, category, and cohort on demand — without manual data assembly?' },
  { id: 'g_5_2', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 2,
    text: 'How accurately does your business forecast short-term (weekly/monthly) and medium-term (quarterly) revenue, and is that forecast used operationally?' },
  { id: 'g_5_3', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 3,
    text: 'Do you track and act on leading indicators of revenue (cart abandonment, browse-to-buy conversion, repeat purchase rate) beyond lagging sales figures?' },
  { id: 'g_5_4', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 4,
    text: 'How mature is your pricing intelligence — do you actively model price elasticity, monitor competitive pricing, and use data to make systematic pricing decisions across your product catalog?' },

  // ── EFFICIENCY ENGINE ────────────────────────────────────────────────
  // E1 — Data Governance & Single Source of Truth
  { id: 'e_1_1', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 1,
    text: 'How well does your organization maintain a single, agreed-upon source of truth for key business metrics — do all teams (finance, marketing, operations) work from the same data, or do siloed spreadsheets create contradictions?' },
  { id: 'e_1_2', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 2,
    text: 'Do you have documented data ownership — is it clear who is responsible for the accuracy and governance of each critical data domain in your business?' },
  { id: 'e_1_3', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 3,
    text: 'To what extent can your commercial and operational teams access business metrics and reports — sales performance, inventory, margins, and fulfillment KPIs — self-serve, without relying on IT or a data engineering team?' },
  { id: 'e_1_4', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 4,
    text: 'How mature is your data architecture — do you have a structured, scalable data infrastructure (data warehouse, data lake, or equivalent) that can support your growing analytical needs?' },

  // E2 — Data Trust & Quality
  { id: 'e_2_1', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 1,
    text: 'How confident are your teams in the accuracy of the data they use daily — do decisions get delayed or second-guessed because of doubts about data reliability?' },
  { id: 'e_2_2', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 2,
    text: 'Do you have automated monitoring in place to detect data errors, pipeline failures, or anomalies before they reach reports and cause operational or financial mistakes?' },
  { id: 'e_2_3', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 3,
    text: 'How systematically do you measure and track data quality metrics (completeness, accuracy, timeliness, consistency) across your critical data sources?' },
  { id: 'e_2_4', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 4,
    text: 'When data quality issues are discovered, how quickly and reliably does your organization identify the root cause and prevent the same error from recurring?' },

  // E3 — AI & Automation Readiness
  { id: 'e_3_1', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 1,
    text: 'To what extent has your organization adopted AI tools — generative AI, predictive models, or intelligent agents — in day-to-day commercial or operational workflows?' },
  { id: 'e_3_2', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 2,
    text: 'How securely and systematically do your teams apply AI to internal company data — do you have clear policies governing AI usage, data access controls, and output validation?' },
  { id: 'e_3_3', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 3,
    text: 'How many of your high-volume, repetitive processes (reporting, data entry, approvals, customer communications) have been automated or formally identified as automation candidates?' },
  { id: 'e_3_4', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 4,
    text: 'How capable is your organization of evaluating, piloting, and scaling new AI or automation tools — do you have the technical readiness and change management capability to move quickly?' },

  // E4 — Process Efficiency & Profitability
  { id: 'e_4_1', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 1,
    text: 'How systematically do you identify, quantify, and eliminate operational waste — are bottlenecks in your key processes measured and actively being reduced?' },
  { id: 'e_4_2', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 2,
    text: 'Do you have documented, measurable efficiency targets (cycle times, error rates, cost per transaction) for your core commercial and operational processes?' },
  { id: 'e_4_3', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 3,
    text: 'How well do your operational efficiency improvements translate into measurable profitability gains — do you track the financial impact of process changes?' },
  { id: 'e_4_4', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 4,
    text: 'How structured is your approach to prioritizing which processes to improve — do you use data and ROI modeling to select improvement projects, or are decisions driven by urgency and intuition?' },

  // E5 — Operational Scalability
  { id: 'e_5_1', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 1,
    text: 'How well does your operational capacity scale with demand — can you handle significant volume increases (seasonal spikes, growth phases) without proportional increases in headcount or cost?' },
  { id: 'e_5_2', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 2,
    text: 'To what extent are your core operational processes standardized and executable by a new team member without depending on knowledge held by only a few people?' },
  { id: 'e_5_3', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 3,
    text: 'How resilient is your operation to disruptions — do you have documented backup processes, redundant systems, and clear escalation paths when critical workflows fail?' },
  { id: 'e_5_4', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 4,
    text: 'How deliberately does your organization plan for operational capacity — do you have a forward-looking roadmap for scaling your infrastructure, systems, and people ahead of demand?' },

  // ── ADAPTABILITY ENGINE ──────────────────────────────────────────────
  // A1 — Technology Stack & Integration
  { id: 'a_1_1', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 1,
    text: 'How well integrated are your core commerce systems — e-commerce platform, OMS (Order Management System), ERP (Enterprise Resource Planning), WMS (Warehouse Management System), and CRM (Customer Relationship Management) — do they share data in near real time or are they manually reconciled?' },
  { id: 'a_1_2', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 2,
    text: 'How much do your current systems limit your ability to launch new features or make changes? Does every modification require significant technical effort, time, or cost?' },
  { id: 'a_1_3', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 3,
    text: 'Is your systems architecture documented clearly enough that someone outside the technical team could understand how your core systems are connected and how data flows between them?' },
  { id: 'a_1_4', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 4,
    text: 'How capable is your team of evaluating, onboarding, and replacing technology vendors within a reasonable timeframe (e.g., a new platform in under 12 months)?' },

  // A2 — Process Documentation & Standardization
  { id: 'a_2_1', pillarId: 'a2', engine: 'adaptability', pillarIndex: 2, questionIndex: 1,
    text: 'What proportion of your critical operational processes (merchandising, fulfillment, marketing execution, customer service) are documented well enough for a new hire to follow?' },
  { id: 'a_2_2', pillarId: 'a2', engine: 'adaptability', pillarIndex: 2, questionIndex: 2,
    text: 'Do you have a structured process review cadence with a clear owner responsible for identifying and eliminating bottlenecks?' },
  { id: 'a_2_3', pillarId: 'a2', engine: 'adaptability', pillarIndex: 2, questionIndex: 3,
    text: 'How consistently do your teams follow documented processes versus improvising — and is process compliance measured or enforced?' },
  { id: 'a_2_4', pillarId: 'a2', engine: 'adaptability', pillarIndex: 2, questionIndex: 4,
    text: 'When a process fails or produces an error, how mature is your root-cause analysis and corrective action practice?' },

  // A3 — Organizational Alignment & Decision Velocity
  { id: 'a_3_1', pillarId: 'a3', engine: 'adaptability', pillarIndex: 3, questionIndex: 1,
    text: 'Do you have clear decision-making frameworks (e.g., RACI) for key cross-functional decisions in merchandising, marketing, and operations?' },
  { id: 'a_3_2', pillarId: 'a3', engine: 'adaptability', pillarIndex: 3, questionIndex: 2,
    text: 'How long does it typically take from identifying a commercial opportunity to having a test or initiative live in market?' },
  { id: 'a_3_3', pillarId: 'a3', engine: 'adaptability', pillarIndex: 3, questionIndex: 3,
    text: 'How aligned are your commercial, marketing, tech, and operations functions around shared goals — and how often do conflicting priorities create execution delays?' },
  { id: 'a_3_4', pillarId: 'a3', engine: 'adaptability', pillarIndex: 3, questionIndex: 4,
    text: 'How effectively does leadership communicate strategic priorities, and do teams below the leadership layer understand how their work connects to company goals?' },

  // A4 — Data Literacy & Tooling Adoption
  { id: 'a_4_1', pillarId: 'a4', engine: 'adaptability', pillarIndex: 4, questionIndex: 1,
    text: 'What proportion of your operational decisions are made by reviewing relevant data versus relying on intuition or anecdote?' },
  { id: 'a_4_2', pillarId: 'a4', engine: 'adaptability', pillarIndex: 4, questionIndex: 2,
    text: 'Do your frontline commercial teams (buyers, marketers, store managers) have self-serve access to dashboards and reports without relying on data or analytics teams?' },
  { id: 'a_4_3', pillarId: 'a4', engine: 'adaptability', pillarIndex: 4, questionIndex: 3,
    text: 'How consistently are new tools and platforms adopted across teams — do you have a structured change management process for technology rollouts?' },
  { id: 'a_4_4', pillarId: 'a4', engine: 'adaptability', pillarIndex: 4, questionIndex: 4,
    text: 'How well do your teams recognize and flag data quality issues in the tools and dashboards they use daily — rather than relying solely on a central data team to catch errors?' },

  // A5 — Change Management & Continuous Improvement
  { id: 'a_5_1', pillarId: 'a5', engine: 'adaptability', pillarIndex: 5, questionIndex: 1,
    text: 'Does your organization have a structured approach to managing change — with stakeholder communication, training, and adoption tracking built into project plans?' },
  { id: 'a_5_2', pillarId: 'a5', engine: 'adaptability', pillarIndex: 5, questionIndex: 2,
    text: 'How consistently do teams conduct retrospectives or post-mortems on initiatives and apply learnings to future work?' },
  { id: 'a_5_3', pillarId: 'a5', engine: 'adaptability', pillarIndex: 5, questionIndex: 3,
    text: 'How psychologically safe do employees feel raising operational problems or proposing changes — and how quickly are good ideas evaluated and either tested or rejected?' },
  { id: 'a_5_4', pillarId: 'a5', engine: 'adaptability', pillarIndex: 5, questionIndex: 4,
    text: 'How well does your organization balance executing current operations reliably while simultaneously testing and adopting new capabilities?' },
]

export default questions
