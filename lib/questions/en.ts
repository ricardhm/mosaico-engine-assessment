import type { Question } from './types'

const questions: Question[] = [
  // ── GROWTH ENGINE ────────────────────────────────────────────────────
  // G1 — Customer Data Infrastructure
  { id: 'g_1_1', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 1,
    text: 'How completely does your organization capture customer identity across all purchase and interaction touchpoints (online, in-store, app, service)?' },
  { id: 'g_1_2', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 2,
    text: 'Do you have a unified customer record that consolidates behavior, transactions, and demographics into one profile?' },
  { id: 'g_1_3', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 3,
    text: 'How mature are your data governance practices around customer data — consent management, data quality standards, and retention policies?' },
  { id: 'g_1_4', pillarId: 'g1', engine: 'growth', pillarIndex: 1, questionIndex: 4,
    text: 'To what extent can your marketing and commerce teams self-serve customer data for segmentation and analysis without engineering support?' },

  // G2 — Segmentation & Personalization
  { id: 'g_2_1', pillarId: 'g2', engine: 'growth', pillarIndex: 2, questionIndex: 1,
    text: 'How granular and dynamic are your customer segments — do they update in real time based on behavior, or are they manually refreshed periodically?' },
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
    text: 'To what extent do you manage organic channels (SEO, content, social) with a structured editorial calendar and measurable conversion goals?' },

  // G5 — Revenue Analytics & Forecasting
  { id: 'g_5_1', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 1,
    text: 'Can you report on revenue by channel, segment, category, and cohort on demand — without manual data assembly?' },
  { id: 'g_5_2', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 2,
    text: 'How accurately does your business forecast short-term (weekly/monthly) and medium-term (quarterly) revenue, and is that forecast used operationally?' },
  { id: 'g_5_3', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 3,
    text: 'Do you track and act on leading indicators of revenue (cart abandonment, browse-to-buy conversion, repeat purchase rate) beyond lagging sales figures?' },
  { id: 'g_5_4', pillarId: 'g5', engine: 'growth', pillarIndex: 5, questionIndex: 4,
    text: 'How mature is your experimentation culture — do you regularly run controlled tests on pricing, promotions, and site/app changes with statistical rigor?' },

  // ── EFFICIENCY ENGINE ────────────────────────────────────────────────
  // E1 — Inventory & Demand Planning
  { id: 'e_1_1', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 1,
    text: 'How accurately does your demand planning process forecast SKU-level demand across locations and channels, factoring in seasonality, promotions, and trends?' },
  { id: 'e_1_2', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 2,
    text: 'Do you have automated replenishment logic (reorder points, safety stock formulas) or do buyers manually decide when and how much to reorder?' },
  { id: 'e_1_3', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 3,
    text: 'How well do you measure and actively reduce inventory carrying costs, dead stock, and markdown rates across your assortment?' },
  { id: 'e_1_4', pillarId: 'e1', engine: 'efficiency', pillarIndex: 1, questionIndex: 4,
    text: 'To what extent is your inventory planning connected to your supplier lead times and purchase order process in a single workflow?' },

  // E2 — Supplier & Procurement Management
  { id: 'e_2_1', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 1,
    text: 'Do you have documented performance scorecards for key suppliers covering on-time delivery, fill rate, quality defect rate, and pricing compliance?' },
  { id: 'e_2_2', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 2,
    text: 'How systematically do you negotiate and review supplier contracts — do you benchmark pricing against market rates on a scheduled basis?' },
  { id: 'e_2_3', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 3,
    text: 'To what extent have you diversified your supplier base to reduce single-source dependency for high-volume or high-margin products?' },
  { id: 'e_2_4', pillarId: 'e2', engine: 'efficiency', pillarIndex: 2, questionIndex: 4,
    text: 'How well integrated are your purchase orders, receiving, and invoice reconciliation processes — and how much manual effort do they require?' },

  // E3 — Fulfillment & Logistics Efficiency
  { id: 'e_3_1', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 1,
    text: 'Do you have visibility into your fully loaded cost-to-fulfill per order (pick, pack, ship, last-mile) broken down by channel and carrier?' },
  { id: 'e_3_2', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 2,
    text: 'How systematically do you optimize carrier selection, zone skipping, and packaging to reduce per-unit shipping costs?' },
  { id: 'e_3_3', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 3,
    text: 'How mature is your returns management process — do you measure return rates by SKU and root cause, and systematically reduce preventable returns?' },
  { id: 'e_3_4', pillarId: 'e3', engine: 'efficiency', pillarIndex: 3, questionIndex: 4,
    text: 'If you operate warehouses or physical locations, how efficiently are they laid out and staffed relative to throughput benchmarks?' },

  // E4 — Product Margin & Assortment Discipline
  { id: 'e_4_1', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 1,
    text: 'Do you have real-time or near-real-time visibility into gross margin by SKU, category, and channel — inclusive of all variable costs?' },
  { id: 'e_4_2', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 2,
    text: 'How systematically do you rationalize your assortment — removing low-margin, low-velocity SKUs to reduce complexity costs?' },
  { id: 'e_4_3', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 3,
    text: 'Do you have a disciplined promotional strategy that models margin impact before approving discounts, or are promotions driven primarily by gut feel or competitive pressure?' },
  { id: 'e_4_4', pillarId: 'e4', engine: 'efficiency', pillarIndex: 4, questionIndex: 4,
    text: 'How well do you manage cost price increases from suppliers — do you have a formal process for evaluating impact and deciding whether to absorb, pass through, or renegotiate?' },

  // E5 — Operational Data & Cost Visibility
  { id: 'e_5_1', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 1,
    text: 'How accurately do you allocate indirect costs (warehouse overhead, customer service, tech platforms) to products or channels to understand true profitability?' },
  { id: 'e_5_2', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 2,
    text: 'Do you have a single source of truth for operational KPIs (fill rate, OTIF, shrinkage) that all relevant teams reference?' },
  { id: 'e_5_3', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 3,
    text: 'How well do your finance, merchandising, and operations teams share data and align on the same margin and cost definitions?' },
  { id: 'e_5_4', pillarId: 'e5', engine: 'efficiency', pillarIndex: 5, questionIndex: 4,
    text: 'How frequently and reliably do you produce management accounts, and are operational leaders reviewing margin data on a weekly cadence?' },

  // ── ADAPTABILITY ENGINE ──────────────────────────────────────────────
  // A1 — Technology Stack & Integration
  { id: 'a_1_1', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 1,
    text: 'How well integrated are your core commerce systems (e-commerce platform, OMS, ERP, WMS, CRM) — do they share data in near real time or are they manually reconciled?' },
  { id: 'a_1_2', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 2,
    text: 'How much technical debt or legacy system dependency slows your ability to launch new capabilities or change existing ones?' },
  { id: 'a_1_3', pillarId: 'a1', engine: 'adaptability', pillarIndex: 1, questionIndex: 3,
    text: 'Do you have documented system ownership, API contracts, and integration maps, or is your architecture understood only by a small number of individuals?' },
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
    text: 'How well does your organization identify and act on data quality issues before they cause downstream errors in reporting or operations?' },

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
