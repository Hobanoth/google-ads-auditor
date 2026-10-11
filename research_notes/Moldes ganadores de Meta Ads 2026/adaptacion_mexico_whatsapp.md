# Adapting US Meta-ads templates to Mexico: WhatsApp-first funnels, benchmarks, copy, calendar and regulation (research notes, as of 2026-10-11)

Method note for the report writer: every finding below comes from web-search result summaries, not full-page reads. WebFetch failed with DNS errors, the session's egress policy blocked direct downloads (datareportal.com, developers.facebook.com, gob.mx, dof.gob.mx), and the shared web-search budget for this turn ran out before the planned searches on Meta ad policies, creator rates, before/after rules and the December 2025 consumer-law reform. Where the search tool did not make clear which surfaced page carried a figure, I say so. Items marked "background" come from general knowledge, not from a source retrieved in this session, and must be verified before publication.

## 1. Click-to-WhatsApp (CTWA) and messaging ads in Mexico: usage, Meta's 2025-2026 changes, setup, best practices and case studies

### Takeaway
WhatsApp is the default commercial channel in Mexico: instant messaging is the top mobile-internet activity, at 90.6% in INEGI's ENDUTIH 2025. Meta's 2025-2026 pricing changes make CTWA the cheapest way to open a lead conversation. Chats that start from an ad carry no Meta messaging fees for 72 hours, and vendors report that this window was extended to up to 7 days on 28 September 2026. Since 1 October 2026, though, ordinary service replies beyond 1,000 a month per phone number are charged, and Mexican marketing templates cost about US$0.0397 each, up from about US$0.0305. US "form, then call" templates should be rebuilt as CTWA, then qualification inside the chat, then Conversions API for Business Messaging events (qualified lead or purchase) sent back to Meta. Meta's Business AI, now called Meta Business Agent, has been live in Mexico since late 2025 and can handle the first response.

### Cited Findings

#### WhatsApp penetration and usage in Mexico (2025-2026)
- INEGI's ENDUTIH 2025 survey (fieldwork 25 August to 17 October 2025, published 16 June 2026) found:
  - 104.9 million internet users, or 86.1% of people aged 6 and over, up from 57.4% in 2015.
  - Among things people do online on their phones, instant messaging ranks first at 90.6%, ahead of social networks (80.4%) and audio/video (77.8%).
  - Urban users 88.9% vs rural 75.2%; women 85.6% vs men 86.6%.
  - Households with internet 78.3% (39.1% in 2015); people aged 65-74 online 57.8% (11.2% a decade earlier).
  - The bulletin does not break WhatsApp out by name.
  - Sources: [INEGI ENDUTIH 2025 bulletin (16 Jun 2026)](https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2026/endutih/ENDUTIH_25_RR.pdf); [DPL News (2026)](https://dplnews.com/endutih-2025-mexico-mas-conectado-pero-todavia-desigual/); [Diario de Yucatán (16 Jun 2026)](https://www.yucatan.com.mx/mexico/2026/06/16/mexico-alcanza-86-1-de-usuarios-de-internet-suma-43-millones-en-una-decada-inegi.html)
- DataReportal's Digital 2026 Mexico report: 145 million cellular mobile connections in late 2025 (110% of population) and 110 million internet users at end-2025 (83.5% penetration). The retrieved text did not show a WhatsApp figure. — [DataReportal, Digital 2026: Mexico (2026; data to late 2025)](https://datareportal.com/reports/digital-2026-mexico)
- A secondary summary of the same DataReportal data reported:
  - 99.0 million adult social media "user identities" (105.7% of adults, inflated by duplicate and business accounts).
  - Instagram at 53.6 million (late 2025), with ad reach up 13.7% year on year.
  - YouTube ad reach of 85.0 million (77.0% of internet users).
  - TikTok at "99.0 million users 18+", with ad reach up 22.0%. This equals the social-identities total, so it may be a mix-up; verify.
  - DataReportal's ad-reach numbers come from each platform's own self-serve ad tools.
  - Source: [Mexico Business News (2026)](https://mexicobusiness.news/ecommerce/news/mexico-advances-digital-integration-users-hit-110-million)
- WhatsApp user counts come only from unofficial or vendor sources, and they differ:
  - About 77 million users, and more than 90% of smartphone users on the app. — [ChatDaddy, vendor blog (Apr 2026)](https://chatdaddy.tech/blog/whatsapp-marketing-mexico)
  - 78 million users, about 87% of internet users. Attributed to Asociación de Internet MX and described as unofficial; undated, likely older. — [DPL News](https://dplnews.com/?p=153178)
  - About 75% of the population. — [Infobip (2026)](https://www.infobip.com/blog/whatsapp-statistics-2025-global-usage-market-overview)
- Background history:
  - The WhatsApp Business app launched in Mexico in January 2018, free for SMEs. — [Expansión (18 Jan 2018)](https://expansion.mx/tecnologia/2018/01/18/whatsapp-lanza-su-version-para-pymes-en-mexico)
  - Product catalogs reached Mexican small businesses in 2019. — [LatAm List (1 Dec 2019)](https://latamlist.com/2019/12/01/whatsapp-business-launches-product-catalog-for-small-businesses-in-mexico)

#### WhatsApp Business Platform (API) pricing: what changed in 2025-2026
- **Per-message pricing (1 July 2025).** Meta replaced conversation-based pricing with per-message pricing. The conversation-based pricing page is now marked "Deprecated". — [Meta for Developers, Conversation-based pricing (Deprecated)](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/conversation-based-pricing); [YCloud (2025)](https://www.ycloud.com/blog/whatsapp-api-pricing-update); [Hello Charles (2025)](https://www.hello-charles.com/blog/whatsapp-pricing-updates)
- **Free entry point window.** How it works:
  - It opens when a user messages the business from a Click-to-WhatsApp ad or a Facebook Page CTA button and the business replies within 24 hours.
  - It lasts 72 hours from delivery of the business's reply.
  - Every message inside it is free of Meta fees, templates included.
  - Your WhatsApp provider (BSP) can still charge its own per-message fees.
  - Sources: [Hello Charles (2025)](https://www.hello-charles.com/blog/whatsapp-pricing-updates); [CM.com (2025-26)](https://www.cm.com/blog/whatsapp-business-platform-pricing/); [Sinch Community](https://community.sinch.com/t5/WhatsApp/What-are-Free-Entry-Point-windows/ta-p/19955)
- **Reported 7-day extension (28 September 2026; not verified on Meta's page).** Several vendor sources say the free window for CTWA conversations went from 72 hours to "up to 7 days" for conversations that start on or after 28 September 2026. It is rolling out gradually, so some conversations still get 72 hours. One roundup cites a Meta changelog entry dated 28 September. The pages surfaced in the same search included [respond.io](https://respond.io/blog/whatsapp-pricing-change-2026), [SleekFlow](https://sleekflow.io/blog/whatsapp-business-price) and [Keaz](https://keaz.app/blog/whatsapp-service-messages-october-2026), but the search tool did not show which of them carries each statement. — [AdsUploader, "Meta Ads Updates (September 2026)"](https://adsuploader.com/blog/meta-ads-updates)
- **Service replies no longer free (1 October 2026; vendor-reported, consistent across many providers).** The terms:
  - Free-form replies inside the 24-hour customer service window are now charged.
  - Each business phone number gets 1,000 free service messages per calendar month. The allowance is per number, not per WhatsApp Business Account; it resets monthly, does not roll over, and counts messages, not conversations.
  - From the 1,001st message, each delivered service message costs the recipient country's utility rate.
  - Messages from customers stay free, and chats that start from an ad keep their free window.
  - Sources: [Bot.space help (Sep/Oct 2026)](https://help.bot.space/en/articles/17152846-meta-s-whatsapp-pricing-changes-from-october-1-2026-service-messages-are-now-charged); [YCloud (2026)](https://www.ycloud.com/blog/whatsapp-api-message-pricing-update-effective-october-1-2026); [Gupshup (2026)](https://support.gupshup.io/hc/en-us/articles/62362400519705-WhatsApp-Service-Messages-Pricing-w-e-f-01-Oct-2026); [ChatMaxima (2026)](https://chatmaxima.com/blog/whatsapp-service-message-pricing-october-2026/); [DragApp (2026)](https://www.dragapp.com/blog/whatsapp-business-api-pricing/)
- **Conflict on utility templates.**
  - Several sources say utility templates sent inside the 24-hour window also became chargeable on 1 October 2026.
  - ChatMaxima says these have been free since July 2025 and labels the October charge "reported, not yet confirmed by Meta". — [ChatMaxima (2026)](https://chatmaxima.com/blog/whatsapp-service-message-pricing-october-2026/)
  - One single source adds that accounts with no payment method stop delivering service messages once the 1,000 free messages are used up, and that Meta asked businesses to add one by 30 September. Unconfirmed elsewhere.
- A public GitHub issue notes that Meta's own pricing page still "reads as free" to AI assistants despite the 1 October 2026 charge. Treat third-party summaries of the official page with care. — [GitHub, robhunter/agentdeals issue #2671 (2026)](https://github.com/robhunter/agentdeals/issues/2671)

#### Mexico rates
- **Meta's pricing page.** As surfaced by search, it reads: "Effective October 1, 2025 ... Colombia – Higher utility and authentication rates. Mexico – Lower marketing rates." The same page mentions local-currency billing for eligible customers in India (January 2026) and Brazil (second half of 2026), but not Mexico. A second search summary of the page said it lists "Marketing: 2 markets, with 1 increase and 1 decrease" without naming them. — [Meta for Developers, Pricing on the WhatsApp Business Platform](https://developers.facebook.com/docs/whatsapp/pricing); [mirror URL](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing)
- **Vendor rate tables.**
  - Mexico's marketing rate rose from US$0.0305 to US$0.0397 per delivered message on 1 October 2026. The markets with marketing increases are reported as Kuwait, Mexico, Morocco, Saudi Arabia and the UAE.
  - Mexico's utility/authentication rate is consistently about US$0.0085, which now also applies to service messages.
  - Older guides show US$0.0436, apparently the rate before October 2025.
  - Stray figures (US$0.0378 and US$0.043 for marketing, US$0.0040 for utility) look stale or wrong.
  - One guide says US$0.0305 was "verified in August 2026 against Meta's official rate card".
  - Sources: [FlowCall (Oct 2026)](https://www.flowcall.co/blog/whatsapp-business-api-pricing); [Kanal (2026)](https://getkanal.com/blog/whatsapp-business-pricing-guide); [iTechDev México (2026)](https://itechdev.com.mx/en/blog/precio-whatsapp-business-api-mexico-2026); [Aurora Inbox (26 May 2026)](https://www.aurorainbox.com/2026/05/26/precio-whatsapp-business-api-mexico-2026/); [Leadsales (2026)](https://leadsales.io/blog/whatsapp-business-api-cuanto-cuesta/)
- **Peso figures.** One Mexican site lists, from 1 October 2026, MXN 0.7298 per marketing message and MXN 0.1565 per utility/authentication/service message, plus IVA. The search tool did not show which of these two pages published it: [BDCAI calculator (2026)](https://bdcai.com/herramientas/calculadora-costo-whatsapp), [Whato](https://whato.app/precio-api-whatsapp-business-mexico/).

#### Ads in WhatsApp's Updates tab ("Novedades" in Mexico)
- **Announced 16 June 2025:** ads in Status, promoted channels in the channel directory, and paid channel subscriptions, all in the Updates tab, which is called "Novedades" in Mexico. Personal chats are not affected. Ads are chosen from limited signals: country, language, channels followed and interaction with promoted content. — [Expansión (16 Jun 2025)](https://expansion.mx/tecnologia/2025/06/16/whatsapp-mostrara-anuncios); [Xataka México (Jun 2025)](https://www.xataka.com.mx/aplicaciones/whatsapp-cambia-para-siempre-mayor-app-mensajeria-mexico-ahora-tiene-anuncios); [El Imparcial (16 Jun 2025)](https://www.elimparcial.com/tecnologia/2025/06/16/anuncios-en-whatsapp-como-y-donde-se-mostraran-sin-afectar-tus-chats/)
- WABetaInfo, via Portafolio, reported an optional ad-free subscription for Status and Channels in development. Unconfirmed. — [Portafolio](https://www.portafolio.co/tecnologia/whatsapp-volvera-a-ser-pago-estas-son-las-principales-novedades-que-traeria-la-aplicacion-de-mensajeria-486999)

#### Business AI, now Meta Business Agent (Mexico was an early market)
- **Mexico launch.** Meta announced AI assistants inside the WhatsApp Business app for Mexico, available from 3 November 2025, and framed Mexico as the first country to launch them. To qualify, a business needs the WhatsApp Business app set to Spanish and at least one product in its catalog. — [Xataka México (late 2025)](https://www.xataka.com.mx/aplicaciones/asistentes-ia-llegan-a-whatsapp-business-mexico-asi-nueva-herramienta-pymes-automaticen-sus-ventas); [ITSitio México](https://www.itsitio.com/mx/inteligencia-artificial/whatsapp-business-activa-ia-en-mexico-asi-pueden-usarla-los-negocios/)
- **Global rollout (June 2026).** The product was renamed Meta Business Agent and made available worldwide to businesses of all sizes, with Instagram to follow. Coverage says the preliminary "Business AI" version launched "in October" in selected markets such as Mexico and India, which slightly conflicts with the 3 November date. Large companies pay by consumption; the basic agent is free. — [El Informador (17 Jun 2026)](https://www.informador.mx/tecnologia/whatsapp-business-meta-lanza-nuevos-agentes-de-ia-20260617-0211.html); [Ámbito](https://www.ambito.com/tecnologia/meta-lanza-su-agente-ia-empresas-whatsapp-messenger-e-instagram-n6284650); [Milenio](https://www.milenio.com/tecnologia/que-es-meta-business-agent-whatsapp-ia-atiende-clientes-24-horas)
- **Meta's Conversations 2026 conference (3 June 2026, London):**
  - Meta Business Agent answers questions, recommends products, books appointments and qualifies leads.
  - "WhatsApp Business Discovery" lets users search for businesses by name inside WhatsApp.
  - More than 1 million businesses were using the agent at announcement.
  - A "Meta Business Agent Platform" lets larger companies build and customize agents.
  - Sources: [WhatsApp Business blog (Jun 2026)](https://whatsappbusiness.com/blog/introducing-meta-business-agent-ai/); [ALM Corp (2026)](https://almcorp.com/blog/meta-conversations-2026-date-june-3-london/); [WABetaInfo (2026)](https://wabetainfo.com/meta-introduces-ai-business-agent-for-whatsapp-worldwide/)
- Unverified: one source says Meta starts charging per token for Business Agent on 1 August 2026. The search tool surfaced it next to [IntelliConcierge (2026)](https://www.intelliconcierge.com/blog/meta-business-agent-pricing-what-whatsapp-businesses-need-to-know-in-2026), but did not confirm that page as the source.
- **15 September 2026:** businesses can let an AI agent of their choice set up and manage WhatsApp Business messaging, and a "WhatsApp Business Tools MCP server" handles onboarding and message templates. — [TechCrunch (15 Sep 2026)](https://techcrunch.com/2026/09/15/meta-now-lets-ai-agents-handle-the-boring-parts-of-whatsapp-business-setup/)

#### Campaign setup, optimization and lead tracking
- Meta (official): lead ads that use Instant Forms plus Messenger as conversion locations saw about 8% lower cost per lead and 48% more reach than Instant Forms alone. This comes from a meta-analysis of 38 A/B tests run May 2022 to August 2023, a study Forrester Consulting did for Meta, at 97% confidence. — [Meta for Business, "Generate Leads with Lead Ads that Click to Message"](https://www.facebook.com/business/ads/ad-objectives/lead-generation/lead-ads-with-messaging)
- Secondhand: there are no independent public CTWA benchmarks. Meta's own published tests reportedly show 12%-79% lower cost per result when moving from conversation or message optimization to lead or purchase optimization. I did not check the original Meta material. — [Spur (2026)](https://www.spurnow.com/en/blogs/click-to-whatsapp-ads-benchmarks)
- Optimizing for conversations can lower cost per message while raising cost per qualified lead. In one agency case, cost per chat went up while cost per qualified lead fell by about a third. — [LeadEnforce](https://leadenforce.com/blog/why-more-messages-do-not-always-mean-better-click-to-message-ads)
- **Conversions API for Business Messaging** (vendor documentation; Meta's own docs were not retrieved):
  - It sends Lead and Purchase events from WhatsApp conversations back to Meta for optimization and measurement. — [Netcore docs](https://emaildocs.netcorecloud.com/reference/conversion-tracking)
  - Sales campaigns should not be judged on chats started; connect downstream events. — [YCloud](https://www.ycloud.com/blog/how-to-improve-click-to-whatsapp-ads-performance.md)
  - CTWA ads can run without the Business API, but CRM and automation usually need it. Capture Meta's click identifier when the conversation starts and store it on the contact record. — [Qiscus](https://www.qiscus.com/en/blog/whatsapp-lead-generation/)
  - Sending CTWA conversion data through CAPI shows which campaigns produce qualified leads and purchases. — [Wati](https://www.wati.io/blog/whatsapp-for-healthcare-how-medical-institutions-can-use-it)
- A Mexico-focused vendor guide notes that inside the free window, the only cost of a CTWA lead is the ad spend. — [iTechDev México (2026)](https://itechdev.com.mx/en/blog/click-to-whatsapp-ads-mexico)

#### Case studies (Mexico and LatAm)
- **Movistar México:** CTWA ads connected customers directly with the sales team, giving a "3x increase in average monthly sales from customers reached via Meta apps". This is a Meta-attributed claim surfaced through a secondary guide; I did not retrieve the original Meta page, and it reports no cost per lead. — [ActiveCampaign CTWA guide](https://www.activecampaign.com/blog/click-to-whatsapp-ads-guide)
- **Betterware de México** (Meta developer success story, pandemic era): 93% of distributor inquiries handled on WhatsApp, and 6x ROI compared with a traditional call center. These are company-reported figures. — [Meta for Developers, Betterware](https://developers.facebook.com/success-stories/betterware-mexico/)
- **Panetteria** (bakery in Guadalajara, on WhatsApp Business since March 2019): restaurant orders up about 30%, and café walk-in sales doubled, by the owner's estimate. — [WhatsApp Business story](https://www.whatsapp.com/stories/business/Mexico/panetteria?lang=en)
- **Colombian agency case** (2024 blog, not audited): 228,382 WhatsApp conversations from Facebook and Instagram ads at an average of COP 454 (about US$0.12) per conversation. — [Felipe Vergara (2024)](https://felipevergara.co/como-crear-anuncios-de-clic-a-whatsapp-2024/)
- **Mexican agency anecdote** (undated): cost per click to WhatsApp of MXN 14 vs MXN 8 to Messenger, with a better close rate on WhatsApp. The search tool surfaced it next to [Chavja (2025)](https://chavja.com/aumenta-ventas-whatsapp-meta-ads/), but did not confirm the page.

### Inferences
- **Cost history reconstructed from vendor tables (verify on Meta's rate card):** Mexico's marketing template rate went from about US$0.0436 (to September 2025), to about US$0.0305 (1 October 2025 to 30 September 2026), to about US$0.0397 (from 1 October 2026). Utility, authentication and service messages cost about US$0.0085. The peso figures (MXN 0.7298 and 0.1565) match these dollar rates at about 18.4 MXN/USD. That suggests they are conversions or an MXN rate card derived from USD, not separate peso pricing. Local billing in pesos for Mexico is not confirmed.
- **Worked cost examples with the reported rates:**
  - A client who re-engages 2,000 old leads a month with marketing templates outside the free window pays about 2,000 × US$0.0397 = US$79, plus IVA and BSP fees.
  - A client that sends 3,000 service replies a month on one number pays for 2,000 of them: about US$17.
  - For most SMB clients, messaging is a rounding error next to ad spend. The real cost lever is the ad, as in cost per conversation and cost per qualified lead.
- **Template rewrite rules for US to Mexico CTWA:**
  1. Swap "Book a call / Calendly / long form" CTAs for "Envíanos un WhatsApp" (CTWA). Keep an Instant Form, or a form plus messaging cell, as a controlled test, given Meta's own result of about 8% lower CPL for mixed destinations.
  2. Reply instantly. The free window technically only needs a reply within 24 hours, but Mexican buyers compare several providers by chat. Use Business AI or Meta Business Agent, or a BSP bot, for night and weekend coverage.
  3. Put all follow-ups inside the free window. Within 72 hours (possibly up to 7 days) even template reminders, such as an appointment confirmation or a "¿Le reservo su valoración?" nudge, carry no Meta fee.
  4. Qualify inside the chat with 3-5 questions: service of interest, colonia or municipality, timeframe, budget or financing need, and a preferred time to be contacted. Tag the result in the CRM.
  5. Capture the CTWA click identifier and send Lead, QualifiedLead (custom) and Purchase events through the Conversions API for Business Messaging. Once volume allows, move optimization from "conversations" to "leads/purchases", given the 12%-79% lower cost per result reported from Meta's tests and the LeadEnforce warning.
  6. Business AI eligibility needs a catalog. Service businesses should list services as catalog items, such as "Valoración", "Consulta inicial" or "Cotización", so the AI can activate and recommend them.
- **Test WhatsApp Status ("Novedades") ads** as an extra placement once they are available in the client's account. Rollout in Mexico was not confirmed in this research.
- **Business app vs API:** small clients on the free WhatsApp Business app avoid platform message fees and can use Business AI, but lose CAPI and CRM integration. Clients spending enough to need qualified-lead optimization should move to the Cloud API through a BSP.

### Gaps
- DataReportal's WhatsApp usage share for Mexico in 2026 was not visible; only vendor estimates of 75%-90% and 77-78 million users are available.
- I could not read Meta's official pricing page, changelog or Mexico rate card directly. The 7-day window, the 1 October 2026 service charge and the Mexico rates are vendor-reported and need checking at developers.facebook.com/docs/whatsapp/pricing.
- I did not retrieve Meta Business Help Center documentation on CTWA setup: objective (Engagement, Leads or Sales), conversion location "Messaging apps", performance goals, and requirements for optimizing for leads or purchases from WhatsApp.
- I found no sourced best-practice data on welcome messages, ice breakers or FAQs, response-time effects, or qualification-flow conversion rates for Mexico.
- I did not confirm whether Status ads can start a WhatsApp chat or whether they are generally available in Mexico.
- I found no 2025-2026 Meta case study from Mexico with cost per lead or cost per conversation. Movistar, Betterware and Panetteria are older or lack cost metrics.
- Business Agent pricing (per token from 1 August 2026?) and the volume tiers for utility and authentication messages are not verified.

## 2. Mexico benchmarks: CPM, CPC, CTR, cost per lead and cost per conversation (2025-2026)

### Takeaway
I found no Meta-published Mexico benchmarks. Every figure comes from a vendor or aggregator, often modeled from US data. They agree on a Meta CPM in Mexico of roughly US$2-5.5, centered around US$3.9-4.5, which is about a quarter of US levels (around US$16-20). CPC is around US$0.35-0.80. Cost per lead spans from about US$1-4 per WhatsApp "lead" or chat in low-ticket verticals to MXN 300-1,500 per lead in real estate. Use these numbers only as planning ranges, and re-base any US template's cost-per-lead targets on the client's own Ads Manager history and cost per qualified lead.

### Cited Findings
| Metric (Mexico unless noted) | Figure | Source and date | Reliability notes |
|---|---|---|---|
| Meta CPM | US$3.92 average, about 4.1x cheaper than the US (about US$16) | [Fuelads, "Benchmarks de CPL en Meta Ads — LatAm Q2 2026"](https://fuelads.tech/benchmarks-latam-2026) | An aggregation of public sources adjusted to each country's media costs, not primary campaign data. Its base cost-per-lead figures come from WordStream 2025. Covers MX, CO, AR, CL, PE and ES across 12 industries. |
| Meta CPM | US$3.92 (matches Fuelads) | [Paceads (2026)](https://paceads.com/research/meta-ads-statistics-2026) | Probably not independent of Fuelads. |
| Facebook CPM | US$2.20-4.80, rising about 8% year on year (faster than US or Canada) | [Stackmatix (2026)](https://www.stackmatix.com/blog/facebook-ads-cpm-by-country-2026) | Vendor estimate. |
| Facebook / Instagram CPM | Facebook US$2.00-3.50; Instagram US$3.00-5.00 | [Adligator (2026)](https://adligator.com/es/blog/cpm-facebook-por-pais-2026) | Vendor estimate. |
| CPM / CPC | CPM US$4.50 (range 3.70-5.50); CPC US$0.45 | [AdAmigo (2026)](https://www.adamigo.ai/blog/meta-ads-cpm-cpc-benchmarks-by-country-2026) | Labeled "projections for 2026 based on industry benchmarks and late-2025 data". The scraped column order was unclear. |
| Ecommerce CPM | US$5.54 (US: US$20.48) | [Lebesgue, "Data from 2025"](https://lebesgue.io/facebook-ads/facebook-cpm-by-country) | Sample skews to ecommerce and Shopify. |
| CPM | About US$0.96 | [ADCostly](https://adcostly.com/facebook-ads-cost-in-mexico) | An outlier, probably outdated. Do not use. |
| CPC | Ecommerce US$0.35; financial services US$0.80. LatAm overall: CPC US$0.20-1.50, CPM US$3-12 | Surfaced next to [NovoAds](https://novoads.ai/es/blog/cuanto-cuesta-publicidad-en-meta) (page attribution not confirmed) | Vendor guide; no stated method. |
| CTR by vertical | 2025 median CTR: health and wellness 2.70%, food and beverage 1.85% (lowest). CTR rose in every sector in 2025. | [Influee México (2026)](https://influee.co/mx/blog/facebook-ads-benchmarks) | Unclear whether the sample is Mexico-only. |
| Cost per WhatsApp conversation | Reference average below US$0.50 (LatAm), "not guaranteed" | Surfaced next to [Felipe Vergara](https://felipevergara.co/blogs/whatsapp/campanas-de-mensajes-a-whatsapp-en-facebook-ads/) | Agency guide; no method. |
| CTWA cost per "lead" | LatAm: health and aesthetics US$1-4; ecommerce US$0.50-2 | [Cliengo WhatsApp guide (2026)](https://guiawabusiness.cliengo.com/costo-lead-click-to-whatsapp) | Vendor. "Lead" probably means a chat started, not a qualified lead. |
| Cost per lead, real estate (pesos) | Mid-range housing MXN 80-300; premium developments higher. Suggested budget MXN 6,000-15,000 a month, excluding agency fee. | Surfaced next to [Azterion](https://azterion.com/facebook-ads-para-inmobiliarias/) | Agency blog. |
| Cost per action by sector (pesos) | Real estate MXN 300-1,500; education 100-400; health and wellness 150-500. Another source: clinics MXN 300-900 per lead. Suggested minimum spend MXN 15,000-30,000 a month for the algorithm to learn. | Mexican agency blogs surfaced together: [Holográfico](https://holografico.mx/cuanto-cuesta-publicidad-facebook-mexico-2026), [Clayton](https://clayton.agency/es/blog/cuanto-cuesta-meta-ads-mexico/), [Shortway](https://shortway.com.mx/cuanto-cuesta/publicidad-en-facebook) | The search tool did not show which figure came from which page. These are cost per action, not always cost per lead. |
| Cost per lead, general (pesos) | MXN 150-1,200 depending on industry | [Focus Media, "¿Qué es un buen CPL en México?" (2026)](https://www.focusmedia-agency.com/post/qu%C3%A9-es-un-buen-costo-por-lead-cpl-en-m%C3%A9xico-benchmarks-por-industria-2026) | Agency blog. |
| Cost per lead by industry (USD) | Real estate US$20.8; dental US$17.5; education/courses US$15.3; beauty/aesthetics US$12.0 | A "LatAm 2026 CPL benchmark", most likely [Fuelads](https://fuelads.tech/benchmarks-latam-2026) | Modeled. It was not confirmed whether these are the Mexico rows. |

- Fuelads finds the highest cost per lead in high-value industries (legal, financial, B2B, home services) and the lowest in restaurants, ecommerce and beauty. — [Fuelads (2026)](https://fuelads.tech/benchmarks-latam-2026)
- WordStream 2025, via Paceads: dentists had the highest median cost per lead and restaurants the lowest, a 24x gap. — [Paceads (2026)](https://paceads.com/research/meta-ads-statistics-2026)
- Global context:
  - 2026 median CPM about US$14 and cost per acquisition about US$38. CPC about US$0.78 for traffic campaigns and US$1.70 blended. CTR about 1.5%-2.2%. "Reach got more expensive... costs climbed faster than results." — [ContentStudio (2026)](https://contentstudio.io/blog/meta-ads-benchmarks)
  - Median CPC US$0.71 across 80 accounts, with the 10th-90th percentile spanning US$0.13-3.48. — [Syntér Media, H1 2026](https://syntermedia.ai/benchmarks/2026-h1/meta-ads/cpc)
  - CPM US$15.06 for August 2025 to July 2026. — [Triple Whale (2026)](https://www.triplewhale.com/blog/facebook-ads-benchmarks)
- Seasonality (not Mexico): one benchmark page shows CPM peaking in November 2025 at US$25.22, against US$17.73 in January 2025. The search tool did not say which of the surfaced pages ([Triple Whale](https://www.triplewhale.com/blog/facebook-ads-benchmarks), [Madgicx](https://madgicx.com/blog/meta-ads-benchmarking)) published it.

### Inferences
- **Re-base US targets.** With CPMs about 4x lower, US cost-per-lead targets will look "cheap" in Mexico, but conversion rates, ticket sizes and lead quality differ. Compare per-vertical cost per qualified lead against the client's own unit economics rather than converting US benchmarks.
- **Illustrative peso conversion** at about MXN 18.4/USD (the rate implied by the vendor WhatsApp peso figures; check the current Banxico FIX): a US$3.92 CPM is about MXN 72; a US$0.45 CPC is about MXN 8.3. This sits close to the Mexican agency anecdote of MXN 8 per click to Messenger and MXN 14 per click to WhatsApp.
- **Cost per conversation is a vanity metric** for lead generation. Report three tiers: cost per conversation, cost per qualified lead (tagged in CRM or sent through CAPI) and cost per sale or appointment.
- **Plan for Q4 cost inflation.** The global data shows a November CPM peak. In Mexico this will likely be concentrated around Buen Fin (13-17 November 2026) and December. This is an inference; no Mexico-specific seasonal CPM data was found.

### Gaps
- I found no Meta-published or audited Mexico benchmarks, and nothing from IAB México or Statista with Meta CPM, CPC or CPL for Mexico.
- I found no Mexico-specific CTR figures and no month-by-month CPM seasonality for Mexico.
- The cost-per-conversation and cost-per-lead figures by vertical come from LatAm vendor estimates with no stated sample sizes.

## 3. Cultural and copy adaptation: tú vs usted, Mexican Spanish, trust signals, financing, creators, and which US formats translate

### Takeaway
I found no Mexico-specific study on tú vs usted in ads. The strongest local evidence is about trust and payment:
- 47% of Mexican consumers distrust online advertising (Statista, via Merca2.0).
- Debit cards are the most used online payment (69%), with credit cards rising to 54% (AMVO 2026, via Marketing4eCommerce).
- High shipping cost is the top reason for abandoning a cart.
- During Buen Fin 2025, 48% of buyers paid by credit card, and 27% were buying online for the first time.

Localizing a US template is therefore mostly about trust signals and clear payment and financing terms, not literal translation. I found no published Mexican creator rates and no evidence on which formats carry over.

### Cited Findings
- **Tú vs usted.**
  - An academic analysis of 245 ads (Spain, Universidad de Salamanca author) found usted in barely more than a third of ads. The author treats the choice mainly as a style device to project an image that matches audience expectations. — [Aijón Oliva, *Tonos Digitales* no. 18](https://www.um.es/tonosdigital/znum18/secciones/estudio-1-tu_y_usted.htm)
  - A content-strategy blog observes that in Latin America, using tú with an older person or a stranger can come across as presumptuous, while usted is losing ground in Spain. A related article warns that mixing tú and usted in one text is incoherent; pick one form and keep it across channels. These are opinion pieces, not studies, and the search tool did not show which page carried each statement: [Necesitas Contenido](https://www.necesitascontenido.com/blog/tutear-o-no-tutear-al-cliente/), [Maider Tomasena](https://maidertomasena.com/como-decidir-si-escribir-de-tu-o-de-usted-en-la-web-de-tu-negocio/).
- **Distrust of ads.** 47% of Mexican consumers distrust online advertising, per Statista's "Consumers in Mexico" as cited by Merca2.0. — [Merca2.0](https://www.merca20.com/la-desconexion-entre-marcas-y-consumidores-por-que-hay-desconfianza-publicitaria/)
- **AMVO's 2026 online-shopping study** (released around March 2026):
  - Debit card is the favorite online payment (69%), and credit card use is rising (54%).
  - High shipping cost remains the number one reason for cart abandonment.
  - Mexico entered the world top 10 in ecommerce.
  - Sources: [Marketing4eCommerce México (2026)](https://marketing4ecommerce.mx/estudio-de-venta-online-2026-amvo-mexico/); [AMVO press PDF (Mar 2026)](https://images.produ.com/wp-content/uploads/2026/03/12132700/AMVO_Estudio-de-Venta-Online-2026-Prensa-1_compressed.pdf); [AMVO download page](https://amvo.org.mx/descarga-evo-2026)
  - Users value security, clear processes and a choice of payment methods, and adoption of alternative payment methods is growing. — [ID4YOU (2026)](https://www.id4you.com/blog/business-intelligence/estudio-venta-online-amvo-2026-analisis/)
  - AMVO's Hot Sale material calls flexible payments, such as digital wallets and buy-now-pay-later, important for conversion. — [AMVO blog](https://blog.amvo.org.mx/blog/hot-sale-2026-gu%C3%ADa-estrat%C3%A9gica-para-empresas-de-ecommerce-en-m%C3%A9xico)
- **Buen Fin 2025 payments:** 48% of consumers used a credit card and 43% a debit card, and 27% said it was their first online purchase. Reported in press, apparently from AMVO data. — [Milenio (Nov 2025)](https://www.milenio.com/negocios/buen-fin-2025-compras-digitales-encabezaron-la-lista); [Forbes México](https://forbes.com.mx/?p=1361098)
- **Hot Sale 2026 expectations:** strong growth in sales and in credit placement despite the economic slowdown, with 8 in 10 users expected to take part. — [El Universal (May 2026)](https://www.eluniversal.com.mx/cartera/hot-sale-2026-pese-a-desaceleracion-preven-buen-crecimiento-de-ventas-y-colocacion-de-credito-participaran-8-de-cada-10-usuarios/)
- **Average ticket:** Hot Sale 2025 averaged about MXN 1,100 per order. — [AMVO blog (2026)](https://blog.amvo.org.mx/blog/42725-millones-fueron-el-est%C3%A1ndar-de-2025-el-cierre-operativo-de-hot-sale-y-la-cuenta-regresiva-para-los-resultados-del-2026)

### Inferences
- **Tú vs usted by industry.** This is an inference from the LatAm courtesy norm above, not a study; validate with A/B tests.
  - **Usted:** health and medical clinics, aesthetic medicine with patients over 35, legal, accounting and B2B decision-makers, financial services and credit, premium real estate and investors, and home services aimed at older homeowners.
  - **Tú:** ecommerce, beauty, fitness, high-school and university admissions aimed at 17-25-year-olds, events, and rentals for young renters.
  - In every case, use one form per asset, and make the WhatsApp script, Instant Form and landing page match the ad's form.
- **Mexican Spanish over "neutral" Spanish** (background linguistic knowledge, not sourced):
  - Use Mexican terms: celular, computadora, departamento/depa, renta, colonia, alberca, lentes, cotizar, agendar, enganche, mensualidades, "a meses sin intereses (MSI)", factura/CFDI, "pago en OXXO", transferencia/SPEI.
  - Avoid Spain-isms (vosotros, móvil, ordenador, piso) and words that are vulgar in Mexico ("coger").
  - Use slang (chido, neta, güey) only for youth brands. It is regional and generational, and it reads as forced in translated templates.
  - Avoid double meanings (albures) in hooks.
- **Trust signals to add to US templates.** These follow from the 47% distrust figure and AMVO's security, clarity and payment-choice findings:
  - A real WhatsApp number, with named human or AI availability hours.
  - A physical address and Google Maps pin for local services.
  - "Facturamos" (CFDI invoices) for B2B and professional services.
  - Payment options shown up front: debit and credit cards, MSI, OXXO or SPEI.
  - "Envío gratis" or a shipping threshold, since shipping cost is the top abandonment reason.
  - Real customer testimonials and UGC, except where COFEPRIS rules restrict them (see section 5).
  - Licenses: cédula profesional, COFEPRIS permit or notice number, RVOE for schools.
  - Price in MXN with IVA included.
- **Financing.** Credit-card use is rising (54% online, 48% at Buen Fin 2025), so "hasta X MSI", or monthly payments for high-ticket services such as aesthetics, dental, education and real estate down payments, is a lever that should be tested in the offer layer of every template. The terms must comply with PROFECO total-price rules.
- **US formats that likely translate:**
  - Testimonial and UGC video (it addresses distrust).
  - "Problem, then demo" product videos.
  - Lead magnets delivered by WhatsApp: price list, catalog or quote sent in chat.
  - Short-form vertical video.
- **US formats likely to need rework:**
  - "Book a call" or VSL-to-Calendly funnels: replace with WhatsApp.
  - Aggressive pain-point hooks that imply personal attributes: Meta policy risk (see section 5).
  - Before/after images in health and aesthetics: COFEPRIS and Meta risk.
  - Fake countdowns or scarcity: PROFECO misleading-advertising risk.
  - Prices in USD or excluding taxes: LFPC article 7 Bis total-price duty.

### Gaps
- I found no Mexico-specific research (Kantar, AMAP, IAB México, academic) on tú vs usted or Mexican vs neutral Spanish in ads. An academic study of emotional advertising among millennials in Baja California, Mexico City and Jalisco ([RIICO](https://riico.net/index.php/riico/article/view/1802)) surfaced, but I could not review its findings.
- I found no 2025-2026 data on how many people use MSI, pay cash at OXXO, use SPEI transfers, or demand invoices (factura).
- I found no published rates for Mexican creators or UGC producers. The search budget ran out before this query.
- I found no evidence on which US ad formats over- or under-perform in Mexico; the format notes above are inferences only.

## 4. Mexico's commercial calendar, late 2026 through 2027, with AMVO data on online sales events

### Takeaway
Confirmed dates for the next 12 months:
- Buen Fin 2026: Friday 13 to Tuesday 17 November 2026, with Monday 16 November a public holiday.
- SEP school calendar 2026-27: winter break 21 December 2026 to 5 January 2027, spring break 22 March to about 2-3 April 2027, and the end of the school year on 9 July 2027.

Hot Sale 2027 and Buen Fin 2027 are not announced. Hot Sale 2026 ran 25 May to 2 June 2026. AMVO data shows these events are growing fast online:
- Buen Fin 2025 online sales were MXN 45.9 billion, up 31% and 21% of the total.
- Hot Sale 2025 reached MXN 42.7 billion, up 23.7%.

### Cited Findings
- **El Buen Fin 2026 (16th edition)** runs five days, Friday 13 to Tuesday 17 November 2026, according to the official portal as cited by the press. Monday 16 November keeps the discounts and is a public holiday for the 20 November Revolution commemoration. Free merchant registration runs 8 September to 12 November 2026 at 23:59:59. Sources disagree on whether the 2025 edition ran Thursday-Monday or 13-17 November. — [N+ (2026)](https://www.nmas.com.mx/economia/el-buen-fin-2026-cambia-de-dias-cuando-es-fecha-inicio-detalles-temporada-ofertas/); [ADN40 (1 Sep 2026)](https://www.adn40.mx/mexico/2026-09-01/buen-fin-2026-fechas-duracion-y-como-participar-en-el-sorteo/); [Excélsior (2026)](https://www.excelsior.com.mx/finanzas/buen-fin-2026-fechas-y-detalles-temporada-ofertas-mexico); [Crónica (30 Aug 2026)](https://www.cronica.com.mx/tendencias/2026/08/30/buen-fin-2026-cuando-empieza-y-que-cambios-habra-este-ano/); [Fox Sports MX (8 Sep 2026)](https://www.foxsports.com.mx/2026/09/08/fecha-ofertas-promociones-buen-fin-2026-profeco-denuncia-enganosa-uti/)
- Retailers run their own events alongside Buen Fin, such as Walmart's "Fin Irresistible" (from a headline only). — [Emprendedor.com (2026)](https://emprendedor.com/buen-fin-2026-fechas-walmart-fin-irresistible-sams-bodega-aurrera/)
- **Buen Fin 2025 results:**
  - The business chamber Concanaco projected more than MXN 200 billion, up 15.7% on 2024's roughly MXN 172.9 billion.
  - AMVO and Economy Ministry figures later put the result at MXN 219 billion, MXN 46 billion more than 2024.
  - More than 216,000 establishments took part (up 13%), with more than 59 million transactions.
  - Online sales (AMVO) reached MXN 45.9 billion, up 31%, or 21% of the total.
  - Sources: [Récord (Nov 2025)](https://www.record.com.mx/contra/el-buen-fin-2025-cierra-con-exito-y-deja-fuerte-derrama-economica-en-todo-el-pais); [El CEO (2025)](https://elceo.com/negocios/buen-fin-2025-alcanzara-ventas-por-200000-mdp-cuantos-negocios-participan/); [Milenio (Nov 2025)](https://www.milenio.com/negocios/buen-fin-2025-compras-digitales-encabezaron-la-lista)
  - Caveats: the 2024 base varies by source (MXN 172.9 billion vs 157 billion), and one Milenio piece contains inconsistent figures.
- **Hot Sale 2026** ran 25 May to 2 June 2026 (9 days), per the official announcement. One Merca2.0 piece gives 26 May as the start. — [N+ (2026)](https://www.nmas.com.mx/nacional/anuncian-fechas-hot-sale-2026-cuando-empieza-temporada-descuentos-en-linea-mexico/); [Expansión (14 Apr 2026)](https://expansion.mx/empresas/2026/04/14/hot-sale-2026-cuando-es-y-que-empresas-participan); [Xataka México (2026)](https://www.xataka.com.mx/seleccion/hot-sale-2026-tiene-fecha-mexico-9-dias-promociones-internet-tiendas-fisicas); [AMVO blog](https://blog.amvo.org.mx/blog/confirmado-fechas-oficiales-y-datos-clave-del-hot-sale-2026)
- **Hot Sale 2025 close (AMVO):** MXN 42.725 billion in sales (up 23.7% on 2024), 19.2 million orders, 38.8 million units, an average ticket of about MXN 1,100, and 94% of buyers saying it met or beat expectations. — [AMVO blog (2026)](https://blog.amvo.org.mx/blog/42725-millones-fueron-el-est%C3%A1ndar-de-2025-el-cierre-operativo-de-hot-sale-y-la-cuenta-regresiva-para-los-resultados-del-2026)
- **Hot Sale 2026, partial figures only.** In the first days, sales were up 55% and orders up 49% on 2025, with a flat average ticket. AMVO's projection was MXN 47-52 billion. I found no official AMVO close in search. — [Marketing4eCommerce México (Jun 2026)](https://marketing4ecommerce.mx/mas-carritos-misma-canasta-lo-que-los-numeros-del-hot-sale-2026-realmente-dicen/); [Infobae (30 May 2026)](https://www.infobae.com/mexico/2026/05/30/ultimos-dias-del-hot-sale-2026-cuando-termina-y-como-aprovechar-mejor-las-ofertas/)
- **SEP school calendar 2026-2027** (published in the official gazette, DOF, on 15 July 2026):
  - Classes started Monday 31 August 2026, after a teacher-training week on 24-28 August.
  - Basic education ends 9 July 2027; teacher-training colleges (normales) end 13 July 2027.
  - Winter break runs 21 December 2026 to 5 January 2027, with classes resuming 7 January 2027 (sources disagree slightly on suspension days).
  - Spring break runs 22 March to 3 April 2027 in one source and to 2 April in another.
  - The year has 185 class days.
  - Sources: [UnoTV (2026)](https://www.unotv.com/nacional/a-preparar-mochilas-sep-confirma-fecha-de-regreso-a-clases-y-dias-clave-del-ciclo-escolar-2026-2027/); [Chilango (2026)](https://www.chilango.com/noticias/sep-calendario-escolar-2026-2027-cuando-inician-clases-vacaciones-puentes/); [ADN40 (10 Jul 2026)](https://www.adn40.mx/mexico/2026-07-10/calendario-escolar-2026-a-2027-de-la-sep-fechas-clave-del-proximo-ciclo-para-alumnos-de-educacion-basica/)

### Inferences
Planning calendar. **Sourced** means retrieved in this research; **background** means a fixed civic or cultural date or a weekday computed by me, to be verified.

| Date | Event | Status | Lead-gen / ecommerce angle (inference) |
|---|---|---|---|
| 31 Oct-2 Nov 2026 | Día de Muertos (1-2 Nov) | Background, fixed | Cultural creative, ofrendas, local tourism; avoid trivializing it in health or funeral-adjacent services. |
| 13-17 Nov 2026 | El Buen Fin 2026 | Sourced | Ecommerce peak; expect auction pressure. Lead-gen clients can run "precio Buen Fin" or MSI offers on services such as aesthetics, education enrollment and real estate down payments, but must honor them (PROFECO). |
| 16 Nov 2026 (Mon) | Revolution Day long weekend | Sourced (holiday mentioned in Buen Fin coverage) | Long weekend inside Buen Fin. |
| 27 and 30 Nov 2026 | Black Friday / Cyber Monday (US dates; US Thanksgiving is 26 Nov 2026) | Background, computed | Cross-border shoppers and US-linked brands; lands right after Buen Fin. |
| By 20 Dec 2026 | Aguinaldo (year-end bonus) payment deadline under Federal Labor Law article 87 | Background legal; verify | Cash injection: high-ticket services, real estate down payments, aesthetics before the holidays, January enrollments. |
| 12 Dec 2026-6 Jan 2027 | "Guadalupe-Reyes" holiday season; Navidad 24-25 Dec; Reyes 6 Jan | Background, fixed | Gift and retail peak; B2B and professional services slow. |
| 21 Dec 2026-5/6 Jan 2027 | SEP winter break | Sourced | Family travel; low B2B response, so staff WhatsApp or switch on the AI agent. |
| January 2027 | "Cuesta de enero" (January cash squeeze) and New Year's resolutions | Background | Financing and payment-plan offers, low-entry offers, fitness, health, education and courses. |
| 1 Feb 2027 (Mon) | Constitution Day holiday (first Monday of February) | Background, computed | Long weekend. |
| 14 Feb 2027 | Día del Amor y la Amistad | Background, fixed | Restaurants, beauty, gifts. |
| 15 Mar 2027 (Mon) | Benito Juárez holiday (third Monday of March) | Background, computed | Long weekend. |
| 22 Mar-2/3 Apr 2027 | SEP spring break; Semana Santa (Easter Sunday 28 Mar 2027) | Break sourced; Easter background | Travel and vacation real estate up, B2B down. |
| 30 Apr 2027 | Día del Niño | Background, fixed | Toys, family entertainment. |
| 10 May 2027 (Mon) | Día de las Madres | Background, fixed (weekday computed) | Aesthetics and beauty gift cards, restaurants, retail. Front-load spend 1-2 weeks before. |
| Late May/early Jun 2027 | Hot Sale 2027 | Not announced; 2026 ran 25 May-2 Jun | Ecommerce peak; expect AMVO to announce the dates in spring 2027. |
| 20 Jun 2027 | Día del Padre (third Sunday of June) | Background, computed | Retail, services. |
| 9 Jul 2027 | End of the SEP 2026-27 basic-education year | Sourced | Summer courses; enrollment campaigns for the next school year. |
| Aug 2027 | Back to school 2027-28 (2026-27 started 31 Aug 2026) | 2027-28 calendar not yet published | School supplies, private-school and university enrollment; run education leads from June to August. |
| 15-16 Sep 2027 | Fiestas Patrias | Background, fixed | Patriotic creative; long weekend. |

- **Buen Fin first-timers.** 27% of Buen Fin 2025 buyers were first-time online buyers, and online sales grew 31% against roughly 15.7%-27% for the event overall. Buen Fin is therefore an acquisition event for ecommerce clients. Lead-gen clients should expect higher CPMs that week; note the November CPM peak in the global data in section 2.

### Gaps
- Hot Sale 2027 and Buen Fin 2027 dates are not announced; I found no source.
- I could not find AMVO's official Hot Sale 2026 results.
- The SEP 2027-28 calendar is not yet published.
- The aguinaldo deadline, the federal holidays and the fixed cultural dates were not re-checked against official sources in this session, which was out of search budget. Verify them against the Federal Labor Law (LFT) text at diputados.gob.mx and the official holiday calendar.
- I found no Mexico-specific data on how CPMs or lead costs move around these dates.

## 5. Regulation and policy: Meta special ad categories, COFEPRIS, PROFECO/LFPC, the 2025 LFPDPPP, and Meta's lead-gen policies

### Takeaway
Meta's documentation describes its special ad category restrictions (housing, employment, credit and the newer "Financial products and services" category) as obligations for advertisers based in, or targeting, the US, Canada and parts of Europe. I found no evidence of a 2025 global extension, so they do not automatically apply to Mexico-only campaigns. They do apply when a Mexican client targets US audiences.

The binding constraints in Mexico are local law:
- **COFEPRIS (health regulator)** requires an advertising permit or notice before health or aesthetic ads run, and holds the clinic responsible for influencer content promoting it.
- **PROFECO and the consumer-protection law (LFPC)** require a clear total price and truthful promotions. Fines for misleading ads reach about MXN 2.3 million, or 10% of revenue for repeat offenders.
- **The new data-protection law (LFPDPPP)**, in force since 21 March 2025 and overseen by the Secretaría Anticorrupción y Buen Gobierno (SABG), requires privacy notices that list the data collected and separate necessary from voluntary purposes. Its implementing regulation was reportedly still pending in 2026.

I could not retrieve Meta's own personal-attributes and health policies in this session.

### Cited Findings

#### Meta special ad categories
- **Financial products and services.**
  - Meta introduced the "Financial products and services" category in October 2024 as the replacement for "Credit".
  - From 14 January 2025 it is required for advertisers based in the US or showing ads to US audiences.
  - The older credit policy still applies to advertisers based in, or showing ads in, the US, Canada or certain parts of Europe.
  - The audience restrictions for the HOUSING and EMPLOYMENT categories also apply to FINANCIAL_PRODUCTS_SERVICES.
  - Sources: [Meta Marketing API, Special Ad Category](https://developers.facebook.com/documentation/ads-commerce/marketing-api/audiences/special-ad-category); [Elevar](https://getelevar.com/news/meta-financial-products-services-ads-category/)
- **Restrictions:**
  - Age fixed at 18-65+, and all genders must be included.
  - A minimum location radius of 15 miles (25 km).
  - No lookalike audiences, no saved audiences, and no detailed targeting related to protected classes.
  - The category reportedly covers insurance, bank accounts, investment services and payment services.
  - Sources: [Data Axle](https://www.data-axle.com/resources/blog/meta-special-ad-categories-rules/); [ZAG Interactive (Jan 2025)](https://www.zaginteractive.com/insights/january-2025/2025-changes-for-meta-ads)
- Unverified: a third-party blog claims that in 2026 Meta added buy-now-pay-later services and student loans to the category, with the same fixed age range. It was not confirmed against Meta's documentation; a possible source is [AdAmigo](https://www.adamigo.ai/blog/meta-ads-age-compliance-faqs).
- I found no source showing that Meta extended the housing, employment or financial categories to all countries in 2025. The search summary explicitly called the rollout US-focused.

#### COFEPRIS (health, medical and aesthetic advertising)
Most of this comes from consultancy blogs and press, not official COFEPRIS text.
- **Permit vs notice.**
  - Consultancy blogs agree that aesthetic clinics need an advertising permit (*permiso de publicidad*), not just a notice (*aviso*), to promote aesthetic procedures.
  - One blog says the notice applies when a service is offered by an individual and the permit when it is offered by a company (clinic, hospital, medical group).
  - Another says what decides it is *what* is advertised: aesthetic procedures need a permit.
  - Sources: [Hillflare (permit)](https://hillflare.com/blog/permiso-de-publicidad-cofepris); [Hillflare (notice, DIGIPRiS)](https://hillflare.com/blog/aviso-de-publicidad-cofepris); [Maguey Studio](https://www.magueystudio.mx/blog/publicidad-cofepris-consultorios); [360Medik](https://360medik.com/permisos-cofepris-publicidad-medica/)
- **Social media counts as advertising.** COFEPRIS treats social networks as mass-advertising media under the same rules as TV and radio; ads on social media, search engines and websites fall within its definition of a dissemination medium. — [Puro](https://www.puro.com.mx/cofepris/); [Aviso Publicidad COFEPRIS (2025)](https://avisopublicidadcofepris.com/post/guiacompletacofepris)
- **Influencers.** When an influencer post promotes a specific clinic's services, the clinic is responsible, even if the post sits on the influencer's own profile. Including the permit or notice number in posts is recommended. — [ADN40 (2 May 2026)](https://www.adn40.mx/mexico/2026-05-02/cofepris-multara-a-todos-los-mexicanos-que-suban-este-tipo-de-contenido-a-las-redes-sociales/)
- **Process (blogs):**
  - The permit is requested before publishing, and a fee is paid.
  - COFEPRIS has 7 business days to respond; if it does not, the permit is deemed granted.
  - Applications go through the DIGIPRiS platform, with form FF-COFEPRIS-13 according to a 2026 blog.
  - Typical requirements: details of the responsible party, the professional licence (*cédula profesional*), a copy of the operating notice (*aviso de funcionamiento*), the exact ad wording, the medium, the tax ID (RFC) and proof of fee payment.
  - Risks: content suspension, administrative proceedings, and fines that one guide puts as high as 16,000 UMA (Mexico's indexed unit for fines); that figure is unverified.
  - Sources: [Metge Marketing (2026)](https://metgemarketing.com/blog-aviso-de-publicidad-cofepris/); [Hillflare](https://hillflare.com/blog/permiso-de-publicidad-cofepris); [Aviso Publicidad COFEPRIS (2025)](https://avisopublicidadcofepris.com/post/guiacompletacofepris)

#### PROFECO and the Federal Consumer Protection Law (LFPC)
- The latest LFPC reform listed in the Cámara de Diputados compilation was published in the DOF on 12 December 2025. Its content was not retrieved. — [Justia México, LFPC](https://mexico.justia.com/federales/leyes/ley-federal-de-proteccion-al-consumidor/)
- **Article 7 Bis:** the supplier "deberá informar de forma notoria y visible el monto total a pagar" (must show the total amount payable clearly and visibly). For services with several plans, it must disclose the characteristics, conditions and total cost of each. — [Justia México, LFPC](https://mexico.justia.com/federales/leyes/ley-federal-de-proteccion-al-consumidor/)
- **Misleading advertising** means information that can mislead consumers because it is inexact, exaggerated, partial or tendentious, whether or not it is true. — [PROFECO, "Publicidad engañosa" (PDF)](https://www.profeco.gob.mx/juridico/Documentos/SSC/Normatividad_TomoIV/Publicidad%20enga%C3%B1osa.pdf); [Justia México, LFPC chapter II](https://mexico.justia.com/federales/leyes/ley-federal-de-proteccion-al-consumidor/capitulo-ii)
- **Fines:**
  - Misleading advertising is among the more serious infractions, fined from MXN 596.63 to MXN 2,333,490.80, with repeat offenses up to 10% of the company's gross annual income. — [UNAM law review](https://revistas-colaboracion.juridicas.unam.mx/index.php/decoin/article/download/33244/30208)
  - A 2025 article gives a maximum of MXN 2,345,728 or 10% of gross income. — [Yahoo Finanzas (2025)](https://es-us.finanzas.yahoo.com/noticias/multas-profeco-2025-sanciones-severas-160000494.html)
  - Amounts are updated every year; the 2026 amounts took effect on 1 January 2026. — [Milenio](https://www.milenio.com/negocios/profeco-eleva-multas-violar-ley-federal-proteccion-consumidor); [KPMG (Jan 2025)](https://kpmg.com/mx/es/tendencias/2025/01/flash-monto-de-multas-de-profeco-en-2025.html)
- Unverified: press reports that PROFECO can fine more than MXN 8,000 a day for not honoring promotions or for misstating prices. — [El Cronista México](https://www.cronista.com/mexico/actualidad-mx/oficial-y-confirmado-profeco-multara-con-mas-de-8000-pesos-a-los-negocios-que-enganen-con-precios-o-promociones-falsas/)

#### New personal data protection law (LFPDPPP, 2025)
- **New law and authority.** The new LFPDPPP was published in the DOF on 20 March 2025. From 21 March 2025, supervision of private-sector data protection moved from INAI to the Secretaría Anticorrupción y Buen Gobierno. Any privacy notice that still sends people to INAI to complain is out of date. — [AMDA analysis (Apr 2025)](https://www.amda.mx/wp-content/uploads/2025/04/anexo%201%20de%20circular%2023%20de%202025.pdf); [Greenberg Traurig alert (Mar 2025)](https://www.gtlaw.com/-/media/files/insights/alerts/2025/3/alerta-gt_nueva-ley-federal-de-proteccion-de-datos-personales-en-posesion-de-los-particulares.pdf?rev=d38b3e556aac464cb7a5068e937122ad); [Legiscope (2026)](https://www.legiscope.com/blog/aviso-privacidad-mexico-lfpdppp.html)
- **Privacy notice (aviso de privacidad) content:**
  - It must now state which personal data will be processed, and distinguish necessary from voluntary purposes.
  - The explicit duty to list data transfers was removed.
  - A full notice identifies the responsible party and its address, the categories of data (flagging sensitive data) and the purposes, separating those that need consent.
  - Sources: [AMDA analysis (Apr 2025)](https://www.amda.mx/wp-content/uploads/2025/04/anexo%201%20de%20circular%2023%20de%202025.pdf); [Legiscope (2026)](https://www.legiscope.com/blog/aviso-privacidad-mexico-lfpdppp.html)
- **Three formats** exist: full (*integral*), simplified (*simplificado*) and short (*corto*). Failing to provide a notice is a sanctionable infraction. — [Legiscope (2026)](https://www.legiscope.com/blog/aviso-privacidad-mexico-lfpdppp.html)
- **Regulation pending.** The law's implementing regulation (*Reglamento*) was still unpublished more than a year after the law, leaving some details open. — [SharkIT (2026)](https://sharkit.mx/nueva-lfpdppp-reglamento-pendiente/)

### Inferences
Compliance matrix by vertical. These are inferences from the findings above, not legal advice; confirm each with counsel or the official text.

| Vertical | Meta-side | Mexican law side | Template changes |
|---|---|---|---|
| Health, medical, aesthetics | Special ad categories do not apply to Mexico-only targeting. Meta's health and personal-attributes policies need checking (see gaps). | Get the COFEPRIS permit or notice before launch and show its number. The clinic is liable for influencer and UGC posts promoting it. | Drop US before/after carousels and outcome claims until cleared. Have the WhatsApp agent or bot give no medical claims and no diagnoses. Collect only minimal sensitive data in forms and chats. |
| Real estate | If a Mexican developer targets US or Canadian buyers, the housing category applies (fixed ages, all genders, 15-mile/25-km radius, no lookalikes). | LFPC article 7 Bis total price; plan costs disclosed; no misleading renders or "últimas unidades" (last units) claims unless true. | Split campaigns: Mexico targeting with full options, and US targeting under the housing category. Show the total price in MXN or USD, plus down payment and monthly-payment terms. |
| Financial, credit, buy-now-pay-later, insurance | Financial products and services category if US audiences are targeted. | LFPC truthfulness; financial-advertising rules from CONDUSEF and Banxico not researched (see gaps). | Avoid US-style "Approved in 5 minutes, no credit check" claims unless substantiated. |
| Education | Not a special ad category. | LFPC on prices, scholarships and "inscripción gratis" (free enrollment) promotions. | Show tuition and fee terms clearly; honor Buen Fin or early-enrollment offers. |
| Employment and recruiting | Employment category if US audiences are targeted. | Not researched. | Mexico-only recruiting can use normal targeting per the documentation above; verify in Ads Manager. |
| Ecommerce | Not a special ad category. | Total price with IVA; promotion terms and validity; Buen Fin and Hot Sale offers must be honored; fines updated yearly. | No fake countdowns; show "envío gratis" thresholds and MSI terms clearly. |
| All lead gen (forms and WhatsApp) | Lead forms need a privacy-policy link (background: Meta requirement, not re-verified). | LFPDPPP privacy notice listing the data collected and separating necessary from voluntary purposes; references to INAI must change to SABG. | Link a simplified or short privacy notice in the Instant Form and in the first WhatsApp welcome message. Make marketing and remarketing an optional purpose with its own opt-in. |

### Gaps
- **Meta policies, not retrieved; check the Advertising Standards at https://transparency.meta.com/policies/ad-standards/:**
  - Personal attributes. Background: ads must not assert or imply attributes such as health, financial status or age.
  - Health and wellness rules, including before/after images, weight loss, cosmetic procedures and 18+ targeting.
  - Lead-ads privacy-policy requirements.
  - Whether Meta's 2025 restrictions on health and wellness advertisers optimizing for lower-funnel conversion events (background: introduced for the US) apply to Mexico.
  - Authorization requirements for social-issue, election and political ads in Mexico.
- **COFEPRIS official text, not retrieved:**
  - Rules on before/after images, testimonials and therapeutic or aesthetic claims.
  - Supplements. Background: a notice plus the mandatory legend "Este producto no es un medicamento…".
  - Over-the-counter medicines (background: permit) vs prescription medicines (background: advertising to health professionals only).
  - Whether a 2025-2026 reform of the General Health Law on cosmetic surgery or influencer advertising exists. That search was blocked by the search limit.
  - Official sources: Ley General de Salud and the Reglamento de la Ley General de Salud en Materia de Publicidad (Cámara de Diputados LeyesBiblio), gob.mx/cofepris and DIGIPRiS.
- What the 12 December 2025 LFPC reform changed, and the exact text of LFPC articles 32 and 46-49 on misleading advertising and promotions, were not retrieved.
- **Sector rules not researched:**
  - CONDUSEF and Banxico rules requiring disclosure of CAT (total annual cost) in credit advertising.
  - Real estate advertising standard NOM-247-SE-2021.
  - Private schools' duty to state their RVOE (official recognition) in advertising.
  - All of these are background knowledge and need verification.
- **LFPDPPP, not researched:** current status of the regulation as of October 2026; consent rules for sensitive data such as health, which matter for clinic lead forms; and how SABG enforces.

## 6. (Lower priority) Mexican and LatAm experts or agencies who publicly adapt US frameworks

### Takeaway
The search budget ran out before this question could be researched. The only incidental finding is that Spanish-language CTWA know-how in LatAm is mostly published by WhatsApp CRM and provider vendors and by a few agency educators, so the report should not name "experts" from this research.

### Cited Findings
- Felipe Vergara, a Colombian Facebook and WhatsApp ads educator, publishes Spanish CTWA how-to guides and an agency case of 228,382 conversations at about US$0.12 each. — [felipevergara.co (2024)](https://felipevergara.co/como-crear-anuncios-de-clic-a-whatsapp-2024/)
- Vendors publishing Spanish or Mexico-focused CTWA and WhatsApp pricing guidance include [Leadsales (2026)](https://leadsales.io/blog/whatsapp-business-api-cuanto-cuesta/), [Auronix](https://www.auronix.com/blog/click-to-whatsapp-anuncios-para-mejorar-la-interaccion-con-tus-clientes), [iTechDev México (2026)](https://itechdev.com.mx/en/blog/click-to-whatsapp-ads-mexico), [Aurora Inbox (2026)](https://www.aurorainbox.com/2026/05/26/precio-whatsapp-business-api-mexico-2026/) and [Cliengo (2026)](https://guiawabusiness.cliengo.com/costo-lead-click-to-whatsapp). All of them have commercial interests.

### Inferences
- Treat vendor guides as useful for mechanics (pricing, setup) and as biased on benchmarks, since they sell WhatsApp tools.

### Gaps
- I found no named Mexican or LatAm experts or agencies who explicitly adapt US frameworks (for example, translating offer or hook frameworks into Mexican Spanish), and nothing on what they teach. A follow-up search session would be needed.
