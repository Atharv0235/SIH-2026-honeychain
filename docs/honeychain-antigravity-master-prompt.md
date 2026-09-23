# HoneyChain — Antigravity IDE Master Build Prompt

**Project:** HoneyChain — blockchain honey traceability & smart beekeeping
**Team:** Neural Nomads · Smart India Hackathon 2026
**Problem Statement:** 26021 (Ministry of MSME, Coordination Section) — *"Honey Chain: A block chain-based system for honey traceability and smart beekeeping management."*

This file is built to be copy-pasted straight into Google Antigravity. Part 0 sets up the repo's `.agent/` brain (rules + workflows) — do this once, first. Part 1 is the single master prompt you drop into the **Agent Manager** to generate the whole multi-page site in one run. Part 2 is the full page-by-page + content spec Part 1 refers back to, so the agent never has to invent facts you didn't give it.

---

## Part 0 — One-time Antigravity workspace setup

Before you open the Agent Manager, create these three files in your empty project folder. Antigravity reads `.agent/rules/*.md` automatically on every turn, and `.agent/workflows/*.md` as slash commands. Open the *folder itself* in Antigravity (File → Open Folder), not a parent of it.

### `.agent/rules/design-system.md`

```markdown
---
description: HoneyChain visual identity — always on
activation: always_on
---

- The background is a constant, fixed template across every page: a warm parchment/cream
  field (#F6F1E4) carrying a faint radial arrangement of thin concentric hexagon/circle
  contour lines (stroke color #E8DCC3, 1px, low opacity ~35%), centered slightly off from
  the hero copy. Build it as a repeatable inline SVG or CSS background layer — never a
  raster photo — position: fixed so it does not scroll with content, and reuse the exact
  same background component/class on every route.
- Accent color: amber/honey orange #E8A33D for primary buttons and active states, a deeper
  clay #C97A2B for hover/pressed states.
- Ink color: near-black warm charcoal #201C14 for headings and primary text, muted brown-grey
  #6B6455 for secondary text.
- Surface cards sit on off-white panels (#FBF8F0) with 1px hairline borders (#E7DFC9), soft
  4-8px radius, no heavy drop shadows — a barely-there ambient shadow at most.
- Typography: one serif display face (e.g. "Fraunces" or "Source Serif 4") for H1/H2
  headings, one humanist sans (e.g. "Inter" or "IBM Plex Sans") for UI text and body copy,
  one monospace face (e.g. "IBM Plex Mono" or "JetBrains Mono") reserved ONLY for data
  labels that are genuinely data: hive weights, batch hashes, transaction IDs, sensor
  readings, timestamps. Do not use monospace for generic UI labels.
- Pills/badges (like "Live Prototype · Smart India Hackathon 2026") use a hairline border,
  rounded-full shape, small mono or sans label — never solid-fill chips.
- Never use a tracked-out ALL-CAPS eyebrow label above headings. Never join meta text with
  middle dots as decoration unless it is genuinely a compact metadata string like the
  existing "Team Neural Nomads · SIH 2026" pill. Never append a "→" glyph to every link.
- Status colors (used for hive/pod health everywhere in the app): healthy = #E8A33D fill /
  amber, moderate = #D4901F with a "~" glyph, warning = #C9622E with a "▲" glyph, critical =
  #A6371F with a "!" glyph. These four states and their glyphs must be visually identical
  wherever hive or pod status appears (dashboard, hero stats, hardware diagram).
- Motion: one deliberate on-load reveal for the hero only. Everywhere else, motion responds
  to user action (hover, expand, tab switch) — no scroll-triggered fade-ins stacked on every
  section.
- Line length for body paragraphs stays under ~75 characters measured width.
```

### `.agent/rules/engineering.md`

```markdown
---
description: HoneyChain engineering standards — always on
activation: always_on
---

- Stack: React 18 + TypeScript + Vite, Tailwind CSS for styling, React Router for
  multi-page navigation, Framer Motion for the sparse motion the design rules allow,
  Recharts for the hive-weight and cost/yield charts. No backend framework — the
  "Live Dashboard" and "Verify a batch" pages run entirely on local mock JSON fixtures
  that simulate the hub/hive data described in the content spec, structured so a real
  API could be swapped in later behind a single `src/lib/data.ts` module.
- Component library: build small composable primitives in `src/components/ui/` (Button,
  Badge, Card, StatTile, Tabs, HexGrid) before building page sections, and reuse them —
  do not hand-roll one-off markup per page for the same visual pattern.
- Every page shares one `<AppShell>` layout: fixed background layer + sticky top nav +
  footer. Routes render inside it.
- Accessibility floor: semantic landmarks, visible focus rings using the accent color,
  color is never the only signal for hive status (always pair with the glyph), alt text
  on every meaningful graphic, prefers-reduced-motion respected by disabling non-essential
  animation.
- Responsive floor: build mobile-first, verify at 375px, 768px, 1280px. The hexagon pod
  diagram and cost tables must degrade to a stacked/scrollable layout on mobile rather
  than shrinking illegibly.
- Keep CSS specificity flat: prefer Tailwind utility composition over custom class
  cascades that can silently override each other, especially for spacing between page
  sections.
- Every number, table, and copy line that appears in the site must come from the content
  spec (Part 2) or be clearly marked "Sample data for illustration" exactly where the
  source PDF marks it that way. Do not invent new statistics.
```

### `.agent/workflows/build_page.md`

```markdown
---
description: Scaffold one HoneyChain route end to end — component, content, nav entry, responsive pass
---
1. Confirm which page (from the sitemap in the master prompt) is being built and reread
   its spec section before writing code.
2. Build the page's section components inside `src/components/sections/<page>/`, composed
   from existing `src/components/ui/` primitives; add new primitives only if truly reusable.
3. Wire the route into the router and the top nav.
// turbo
4. Run the dev server / typecheck to confirm no build errors.
5. Open the built-in browser, check the page at 375px, 768px, and 1280px, and note any
   overflow, contrast, or alignment issue as a follow-up task rather than shipping it.
6. Take a screenshot artifact of the finished page at desktop width for the plan review.
```

### `.agent/workflows/verify_all.md`

```markdown
---
description: Full-site pass — every route renders, background is consistent, nav links work
---
1. List every route defined in the router against the sitemap in the master prompt; flag
   any missing page.
// turbo
2. Run a production build to confirm zero type or build errors.
3. Walk every route in the built-in browser; confirm the fixed background pattern renders
   identically on each one and the nav's active-state highlighting is correct.
4. Confirm every internal link (nav, footer, in-page CTAs like "Open Live Dashboard") points
   to a real route, not a placeholder `#`.
5. Produce a short artifact summarizing pass/fail per route.
```

---

## Part 1 — Master prompt (paste this into the Antigravity Agent Manager)

Open **Manager view**, start a new task, paste everything in the block below as your first message. Let it produce a **Plan artifact** first — review that plan before approving execution, then let it run and check the screenshot artifacts it produces per page.

```
You are building HoneyChain, a multi-page marketing + product demo website for a Smart
India Hackathon 2026 project (Team Neural Nomads, Problem Statement 26021, Ministry of
MSME). Follow .agent/rules/design-system.md and .agent/rules/engineering.md exactly — they
are always-on constraints, not suggestions. Use the /build_page workflow once per route and
/verify_all once the full site is scaffolded.

GOAL
Ship a polished, investor/judge-facing static site (React + Vite + TypeScript + Tailwind)
with the pages listed below, sharing one constant cream honeycomb-pattern background
template, one design system, and real content drawn from the HoneyChain project brief
(reproduced in full below this instruction block — do not invent numbers or copy that
contradicts it).

SITE MAP (build every route, in this order)
1. / — Home (hero + live snapshot, mirrors the reference hero screenshot)
2. /problem — The Problem Statement (KVIC background, SIH framing)
3. /architecture — Five-layer system architecture + the apiary pod hardware
4. /dashboard — Live Dashboard (hive grid, pod hub, alerts) — the "Open Live Dashboard" CTA
   target
5. /traceability — Chain of custody, 11-stage journey, offline-first behavior
6. /verify — Consumer batch verification (QR scan simulation → sample verified listing)
7. /marketplace — Shop / marketplace connectors, the sample product listing, five ways the
   shop earns
8. /economics — Cost of a pod vs. yield, break-even, the build-it-in-four-steps roadmap
9. /team — Team Neural Nomads, SIH 2026, links back to the live dashboard and verify pages
Shared: sticky top nav (Home, Problem, Architecture, Dashboard, Traceability, Verify,
Marketplace, Economics, Team), footer with problem-statement ID, org, and theme.

HOME PAGE HERO — reproduce this reference layout exactly (from the attached screenshot),
restyled with the design-system tokens, not copied pixel-for-pixel:
- top-left: small orange dot + "HoneyChain" wordmark
- top-right: hairline pill "Team Neural Nomads · SIH 2026"
- below that: hairline pill "Live Prototype · Smart India Hackathon 2026"
- large serif H1: "Blockchain Honey Traceability"
- one-line subhead: "Live hive monitoring, batch registration, honey testing, blockchain
  verification and QR-based tracking in one connected system."
- primary button "Open Live Dashboard" → routes to /dashboard; a secondary ghost button
  next to it → routes to /verify
- a 2x2 stat tile grid below the fold of the hero: "Hives online 3 / 3", "Sensors streaming
  12", "Batches on chain 0", "Consumer scans 0" — these should be wired to the same mock
  data module the /dashboard page reads, not hardcoded twice
- the constant cream contour-line background sits behind all of this, per the design rules

Now build every other page using the detailed content spec below. Treat every table,
number, and quoted line in it as ground truth content to lay out, not to rewrite.

--- BEGIN CONTENT SPEC ---
[[ Paste everything from "Part 2 — Full content spec" below this line before sending. ]]
--- END CONTENT SPEC ---

When finished, run /verify_all and give me the artifact summary plus screenshots of the
home, dashboard, and verify pages at desktop width.
```

---

## Part 2 — Full content spec (paste in place of the marker above)

Use this verbatim as the factual source for every page. Where the source material says a number is a placeholder or estimate, keep that caveat visible in the UI (small muted footnote), don't present it as fact.

### 2.1 Problem statement (`/problem`)

- **Problem Statement ID:** 26021
- **Title:** Honey Chain: A block chain-based system for honey traceability and smart beekeeping management.
- **Organization:** Ministry of MSME · **Department:** Coordination Section · **Category:** Software · **Theme:** Agriculture, FoodTech & Rural Development
- **Background:** KVIC's Honey Mission supports rural beekeepers with bee boxes and extraction toolkits for livelihood promotion, but they still face counterfeit honey, low consumer trust, weak market linkages, and lack of traceability and advanced hive management support. Hence, there is a need for an integrated block chain, AI, and IoT-based digital ecosystem to improve honey authenticity, traceability, productivity, and market credibility.
- **Description:** Develop "Honey Chain," a block chain-based honey traceability and smart beekeeping system with QR-code consumer verification, secure batch tracking, and AI-IoT features for disease detection, environmental monitoring, and productivity prediction to enhance authenticity, transparency, and market access for rural beekeepers.
- **Expected solution (3 bullets):**
  1. Develop a prototype block chain-based honey traceability and smart beekeeping system with QR-code consumer authentication.
  2. Integrate IoT-enabled hive monitoring and AI analytics for disease detection, colony health tracking, and productivity optimization.
  3. Create a scalable deployment framework for implementation across rural beekeeping clusters under KVIC and related institutions.

Lay this out as a clean "problem statement card" echoing a government portal's field/value table (Problem Statement ID, Title, Background, Description, Expected Solution, Organization, Department, Category, Theme), then a short "why it matters" pull-quote styled section using the background paragraph.

### 2.2 What HoneyChain adds (framing block, usable on `/` or `/problem`)

Four short summary cards:
- **The pod** — One hub and ten hive nodes. Roughly ₹26,000–₹42,000 to build, or ₹13,000–₹22,000 in a lighter version that covers three hives.
- **Offline-first** — Hives log to an SD card, phones keep working without signal, and everything syncs and anchors on the chain later.
- **E-commerce** — Each sealed batch becomes a verified listing with a QR code, a harvest story and a lab report attached.
- **Cost and yield** — Ten hives give about 100–500 kg a year. The pod pays for itself only if the honey sells above commodity price.

### 2.3 What changed from the first blueprint (table, use on `/problem` or `/architecture`)

| Area | First blueprint | Extended blueprint |
|---|---|---|
| Hardware | One ESP32 prototype with temperature, humidity and weight sensing. | An apiary pod: one solar-powered hub plus ten hive nodes. A lighter "sentinel" version weighs three hives and probes the rest. |
| Connectivity | Assumes the network is there. | Offline-first: SD-card logging, local alarms, SMS alerts, a phone app that works without signal, and deferred sync and anchoring. |
| Trust | Batch hash stored on a blockchain. | Hash-chained logs, anchored chain heads, signed QR codes, lab reports and tamper-evident seals — plus a plain statement of what the chain can and cannot prove. |
| Market | Verified batch listings. | Auto-filled shop listings, pre-orders from the harvest forecast, reorder by hive, and connectors for marketplaces and bulk buyers. |
| Economics | Not covered. | Parts list, running costs, cost per kilogram of honey, and a break-even test. |

### 2.4 Five-layer architecture (`/architecture`)

1. **Smart hive layer** — Ten hive nodes report weight, in-hive temperature and humidity. One hub collects everything, keeps time, and talks to the outside world. *Hardware: ESP32-C3 nodes, HX711 load cell amplifiers, SHT31 probes, ESP-NOW radio to the hub, optional microphone, camera and GPS.*
2. **Edge and sync layer** *(new in this version)* — The hub writes every reading to an SD card as a hash-chained log, runs simple health rules on the spot, and raises alarms locally. It queues uploads until a connection appears. *Hardware: SD log, real-time clock, buzzer and LED, SMS through the 4G modem, Bluetooth and Wi-Fi-direct local dashboard, MQTT store-and-forward.*
3. **AI intelligence layer** — Cloud models score health, spot anomalies and forecast the harvest. Small rule sets and a tiny model run on the hub so alerts don't depend on the cloud. *Random Forest or XGBoost, Isolation Forest, image models for later, TensorFlow Lite Micro on the hub.*
4. **Trust and traceability layer** — Batches get device-generated IDs. Their hashes, and the head of each hive's log chain, are anchored on the blockchain. QR codes carry a signed summary. *Solidity contract on an Ethereum-compatible network, Web3.py, PostgreSQL off-chain, lab reports, tamper-evident seals.*
5. **Ecosystem and commerce layer** *(extended)* — Beekeeper, admin, consumer and buyer interfaces. A storefront and marketplace connectors publish listings straight from sealed batches and take orders back into the batch record. *React PWA, FastAPI, storefront widget, catalogue export for marketplaces and ONDC, subscriptions, recall by batch ID.*

Render as five stacked or accordion rows, each with the layer name, one-line description, and a small monospace "hardware/stack" caption line.

### 2.5 The apiary pod hardware (`/architecture`)

- A pod is one hub on a pole plus ten small hive nodes. Nodes wake every ten minutes, read their sensors, send one short radio packet to the hub, and go back to sleep. The hub is the only part that needs a big battery, a solar panel and a SIM.
- **Sample pod hex-grid dashboard** (recreate as an interactive hex/grid component, reused on `/dashboard` too):

| Node | Weight | Status |
|---|---|---|
| H-01 | 38.2 kg | Healthy |
| H-02 | 41.0 kg | Healthy |
| H-03 | 33.5 kg | Moderate (~) |
| H-04 | 44.7 kg | Healthy |
| H-05 | 39.9 kg | Healthy |
| H-06 | 36.1 kg | Healthy |
| H-07 | 30.8 kg | Warning (▲) |
| H-08 | 42.3 kg | Healthy |
| H-09 | 40.6 kg | Healthy |
| H-10 | 27.4 kg | Critical (!) |
- Center hex: "Pod hub — SD, 4G, solar"
- Legend: Healthy / ~ Moderate / ▲ Warning / ! Critical (use the exact status colors from the design rules)
- Caption: "The dashboard a beekeeper sees for one pod. Each cell is a hive; weights are sample data."

**Hive node exploded-diagram labels** (build as a simple labeled-diagram component, doesn't need to be literal art): Roof and inner cover (keeps rain off the stack) · Honey super (weight climbs as nectar is stored) · Brood box with probe (in-hive temperature and humidity) · Entrance add-on (optional microphone or camera) · Four load cells (one per corner, read as one scale) · Concrete pads (level, off damp soil). Node spec caption: "ESP32-C3, HX711, 18650 cell."

**Hub internals labels:** ESP32-S3 (brain + hive radio) · 4G modem (data + SMS) · microSD + RTC · Terminal block 12→5V · Solar controller · 12V 7Ah battery ("runs the pod through cloudy days") · 1-wire bus for lite probes · optional GPS add-on · OLED · 2.4GHz whip antenna (hive link) · 4G antenna.

**Two build options** (present as a two-column comparison):
- **Standard pod** — every hive gets a full node: scale, temperature and humidity. Best when the beekeeper sells premium honey and wants hive-level stories for every jar. Ten nodes (ESP32-C3, HX711, four load cells, SHT31 probe) plus the hub.
- **Lite pod, with sentinel hives** — three hives get full nodes; the other seven get a wired temperature probe on a cable to the hub. The three scales tell you when the whole apiary is in a nectar flow. Cheaper, but only three hives have their own weight curve — choose sentinels that represent weak, average and strong colonies.

Note: "Why nodes are wireless and the hub is not — long cables between ten hives collect noise and get chewed. A node that sleeps between readings runs on one 18650 cell for months, so only the hub needs solar. Battery life depends on radio range and sampling interval; measure it on your own hives before promising anything."

### 2.6 Offline-first behavior (`/traceability`)

Three-column responsibility split:
- **Hive and hub:** hash-chained log on SD card; clock from RTC, corrected by network or GPS time; rules for temperature, humidity, weight drops and silent nodes; buzzer, LED and SMS alerts; ESP-NOW radio, or a cable.
- **Beekeeper phone:** progressive web app or React Native app; local database with an outbox queue; reads live data from the hub over Bluetooth or Wi-Fi direct; registers hives, logs inspections, seals batches; 4G or Wi-Fi, whenever it appears.
- **Cloud:** PostgreSQL and the full AI models; accepts each record once, so retries are safe; anchoring service writes to the chain; public verification pages and shop connectors.

**Three record states** (build as a small horizontal stepper/progress component, reused wherever "anchored" status is shown):
1. **Saved on device** — recorded on the hub or phone, with a device ID, a counter and the hash of the previous record. Visible immediately to the beekeeper.
2. **Synced to cloud** — backed up and checked for gaps. Visible to admins and buyers with access. Safe, but not yet independently timestamped.
3. **Anchored on chain** — the batch hash and the log-chain head are on the blockchain. Anything earlier can no longer be quietly changed. This is the state consumers see as "verified."

**"What still works with no signal" table:**

| Task | With no network | When the network returns |
|---|---|---|
| Live hive readings | Hub display and the beekeeper's phone, over Bluetooth or Wi-Fi direct. | Backlog uploads in bulk, oldest first. |
| Alerts | Local buzzer and LED. SMS through the 4G modem, which needs far less signal than mobile data. | Alert history syncs to the dashboard. |
| Health score | Simple rules and a small model on the hub and phone. | Cloud models re-score the backlog. |
| Hive registration, inspections, harvest | Saved in the phone's database; IDs are made on the device. | Outbox is sent; the server accepts each record once. |
| Batch creation | Sealed on the phone. Batch ID is cluster code, device code and a counter, so two phones never collide. | Hash anchored on chain. |
| QR label | Generated locally. It carries a short signed summary of the batch. | Public page fills in chain status and full timeline. |
| Consumer scan | A cached web app can check the QR signature and show the saved summary, and says clearly that live status needs signal. | Full verification page loads. |

**Conflict and tamper rules** (short bulleted list): sensor readings are append-only so they cannot conflict · sealed batches never change — a correction creates a new version linked to the old one · a missing counter or broken hash link shows up as a gap, not a silent edit · retried uploads are harmless because the server keys every record by device ID and counter.

**Being honest about time:** an offline record can be back-dated until it is anchored, so the interface says "recorded" until anchoring, then "anchored." The hub's clock is the only witness in the field — use a real-time clock with a coin cell, corrected whenever network or GPS time is available. Anchor often: a daily chain-head anchor per pod limits how much can be disputed.

**Language and literacy callout** (style as a highlighted note): "Build the beekeeper app icon-first, in Hindi and regional languages, with voice prompts for the three actions used most: check hives, log harvest, seal batch. This moves from 'future scope' to a v1 requirement, because a rural beekeeper who cannot read the screen will not use the system."

### 2.7 The 11-stage chain of custody (`/traceability`, main visual — build as a vertical numbered timeline, tag each stage "Works offline" or "Can wait")

1. **Hive readings** *(Works offline)* — Nodes report to the hub every 10 minutes.
2. **Health and alerts** *(Works offline)* — Rules on the hub raise a light, a buzzer or an SMS.
3. **Harvest logged** *(Works offline)* — A steep, sustained weight drop confirms it; the beekeeper adds the quantity.
4. **Batch sealed** *(Works offline)* — The phone creates the batch ID and locks the record.
5. **Lab report attached** *(Works offline)* — Moisture, HMF, sugar profile and adulteration screens, linked by batch ID.
6. **Hash anchored** *(Can wait)* — Batch hash and log-chain head go on chain when signal returns.
7. **Jars packed** *(Works offline)* — QR label and tamper-evident seal applied; QR carries a signed summary.
8. **Listing published** — Origin, harvest date, hive curve and lab report fill the page automatically.
9. **Order and dispatch** — Each stage is logged against the batch.
10. **Consumer scan** — The verification page shows source, timeline and chain status.
11. **Feedback returns** — Reorders and ratings flow back to the beekeeper by batch and hive.

### 2.8 Live Dashboard page (`/dashboard`)

- Reuse the hex-grid pod component from 2.5 as the centerpiece, with the same H-01…H-10 sample data, status legend, and center "Pod hub" cell.
- Top strip repeats the four home-page stat tiles (Hives online 3/3, Sensors streaming 12, Batches on chain 0, Consumer scans 0), sourced from the same mock data module as the home page.
- Add a small side panel listing the three record states from 2.6 (Saved on device / Synced to cloud / Anchored on chain) as the current pipeline status for the latest batch.
- Add a simple line chart (Recharts) titled "Hive weight over the flow season" — sample series with a small dip labeled "rainy day," matching the description in 2.9's sample listing.

### 2.9 Verify a batch (`/verify`) and Marketplace (`/marketplace`)

Simulate a QR scan → show this **sample verified listing** exactly (label all figures "Sample data for illustration — names, dates, price and transaction ID are placeholders"):

- **Product:** Forest wildflower honey, 500 g — **₹649**
- **Badge:** Verified batch
- **Batch:** HC-MP04-A3F1-26-0007
- **Beekeeper:** Sample Apiary Cooperative
- **Hive:** HIVE-007, colony healthy 28 of 30 days
- **Harvested:** 18 Oct 2026
- **Lab report:** Attached, linked to batch hash
- **Anchored:** 19 Oct 2026, tx 0x9f3…c21
- Include the "Hive weight over the flow season" chart here too (or link to the dashboard's).

**"What the marketplace worries about" table (`/marketplace`):**

| What the marketplace worries about | What Honey Chain hands over |
|---|---|
| Is this honey adulterated? | A lab report linked to the batch hash, a sealed batch, and random retests of stock from the same batch. |
| Is the seller real and licensed? | A beekeeper registry with the seller's licence and food-safety registration on file. Identity checks happen off chain. |
| Will the stock be there? | A harvest forecast from hive weight and the production model, so listings can say "expected in three weeks" and take pre-orders. |
| Will customers return it or dispute it? | A verified-batch page that answers "is this real?" before the customer asks, and batch-level recall if a problem is found. |
| Can the product tell a story that converts? | A hive-level timeline: flow season curve, harvest date, declared region, and the beekeeper's name. |

**Five ways the shop earns for the apiary** (bulleted, `/marketplace`): Verified price premium — the batch page is the reason a buyer pays more than for anonymous honey · Pre-orders — the harvest forecast turns into "expected" stock; cash arrives before extraction and price risk drops · Adopt-a-hive subscriptions — a household reserves honey from one apiary each harvest and sees that hive's weight curve · Recall and re-test — if a lab flags a batch, only that batch is pulled, the brand survives · Bulk requests — food makers and exporters ask for traceability by batch; the pod's records answer that directly.

Footnote: "Premium micro-brands in India already list single-origin honey at ₹1,400–₹4,000 per kg; the cost model uses a more cautious figure."

**Where to sell table:**

| Channel | Good for | What it asks of the seller |
|---|---|---|
| Own storefront | Full control of the story, subscriptions, the highest margin. | Marketing and fulfilment. A Honey Chain widget on the product page carries the verification. |
| Large marketplaces | Reach and trust in the checkout. | Food-safety licence, brand registration, fees. Export the batch data into the catalogue and link the verification page. |
| ONDC and similar open networks | Smaller sellers reaching many buyer apps. | A catalogue in the network's standard format. Onboarding rules change, so check them first. |
| Bulk and institutional buyers | Volume, repeat orders, exporters who need traceability. | Lab records, residue and adulteration tests, batch-level paperwork. |

**Who benefits (three-column, `/marketplace` or `/`):**
- **Beekeeper:** sells verified honey above commodity price · gets cash earlier through pre-orders · builds a repeat customer base tied to their own hives.
- **Marketplace:** fewer authenticity complaints and returns · a trust badge backed by records, not by a claim · batch-level recall instead of delisting a whole seller.
- **Consumer:** sees origin, harvest date and lab evidence before buying · can re-check the same jar by scanning it at home · can reorder from the same hive.

### 2.10 Economics page (`/economics`)

**Pod cost cards:**
- **Standard pod** (ten full nodes + hub): ₹34,000 typical, range ₹25,900–₹42,500, ~₹3,400 per hive, running cost ₹5,000–₹10,000/yr, ~₹16,000/yr all-in (parts spread over 4 years).
- **Lite pod** (three full nodes, seven probes + hub): ₹17,400 typical, range ₹12,700–₹22,200, ~₹1,700 per hive, running cost ₹4,000–₹8,300/yr, ~₹10,500/yr all-in.

**What ten hives produce:**

| Scenario | Per hive/yr | Ten hives | Basis |
|---|---|---|---|
| Apis cerana, stationary | 10 kg | 100 kg | Published ranges run from about 6–18 kg. |
| Apis mellifera, stationary | 30 kg | 300 kg | Commonly quoted as 25–40 kg with good care. |
| Apis mellifera, migratory | 50 kg | 500 kg | Reported averages of 50–60 kg with 4–5 harvests. |

**What the pod adds per kilogram** (bar/line chart — yearly all-in pod cost ÷ honey harvested; mark a reference line near ₹100/kg as "roughly what a small beekeeper is paid at the farm gate"):
- Apis cerana, 100 kg/yr: Standard ₹160 · Lite ₹105
- Apis mellifera stationary, 300 kg/yr: Standard ₹53 · Lite ₹35
- Apis mellifera migratory, 500 kg/yr: Standard ₹32 · Lite ₹21

**Yearly honey income for ten hives, by how it's sold (table — show pod cost as a % of income in each cell):**

| Scenario | Commodity ₹100/kg | Cluster/bulk verified ₹200/kg | Direct online, net ₹450/kg |
|---|---|---|---|
| Apis cerana, 100 kg | ₹10,000 (pod is 160%) | ₹20,000 (pod is 80%) | ₹45,000 (pod is 36%) |
| Mellifera stationary, 300 kg | ₹30,000 (pod is 53%) | ₹60,000 (pod is 27%) | ₹1,35,000 (pod is 12%) |
| Mellifera migratory, 500 kg | ₹50,000 (pod is 32%) | ₹1,00,000 (pod is 16%) | ₹2,25,000 (pod is 7%) |

Footnote: "₹100 sits at the top of the farm-gate range small beekeepers report. The ₹200 column is a guess for what a cooperative or bulk buyer might pay for verified batches. The ₹450 column assumes a ₹700 shelf price minus about 35% for jars, labels, lab tests, courier and platform fees. Hive setup itself is separate; a ten-hive start-up is commonly put at ₹50,000–₹75,000."

**Honest reading callout** (highlight box): "At commodity prices the pod costs more than a small apiary can carry, and on 100 kg of cerana honey it costs more than the honey is worth. It starts to make sense in three cases: the honey sells verified and direct, the apiary is migratory with high volume, or the pod is shared through a cooperative."

**Break-even note:** "A standard pod on 300 kg of mellifera honey needs to lift the realised price by about ₹53/kg, or add about 36 kg at the direct-sale margin (about 12% more honey), or prevent the loss of about four colonies at roughly ₹4,000 each. The Lite pod needs about ₹35/kg. Treat the ₹4,000 colony price as an assumption and replace it with the real local figure."

**Sharing/cooperative note:** "A cooperative that owns the pods could recover cost with a lease of about ₹1,300/month per standard pod, or about ₹900/month per Lite pod, before any subsidy. Check current beekeeping mission and horticulture support schemes for equipment grants."

### 2.11 Build-it-in-four-steps roadmap (`/economics` or dedicated section, four-stage horizontal/vertical stepper)

| Step | What you build | Hardware spend | How you know it worked |
|---|---|---|---|
| Hackathon demo | One real node on one hive, nine simulated hives, a laptop or phone hotspot as the hub. Batch, QR, chain anchor and consumer page working end to end. | ~₹4,000 | A judge scans a QR and sees the hive's weight curve and a verified anchor. |
| Field pilot | One Lite pod in a real apiary for a full nectar season. Offline mode tested by switching the SIM off. | ₹13,000–₹22,000 | Sensor alerts match the beekeeper's inspection notes. No data lost across a week offline. |
| Cluster pilot | Five to ten pods across a cooperative, a lab partner for batch tests, and one live shop listing. | ₹65,000–₹4,25,000 | First paid orders at a verified price above commodity. |
| Scale | Image-based disease models, multilingual voice interface, buyer discovery, geographic analytics for institutions. | Funded by sales | Pods repay their cost from honey sales. |

### 2.12 "What this system cannot prove" (trust/limitations section — build as a quiet, plainly-styled callout, not hidden but not hyped)

- A blockchain proves a record was not changed after anchoring. It does not prove the honey is pure, or that the person entering the data told the truth. Purity comes from lab tests, sealed jars, sensor evidence and random audits, with the chain making those records hard to rewrite.
- Hive weight shows nectar flow, not floral source. A claim such as "acacia honey" needs pollen analysis or a declared and audited forage area.
- Health thresholds are prototype rules. Calibrate per species, region and season against beekeeper inspection notes before trusting alerts.
- Prices here are estimates. Component prices, SIM plans, honey prices and colony prices all move. Rebuild the tables with real quotes before presenting numbers to a funder.

### 2.13 Footer / attribution block (every page)

"Built on the Honey Chain blueprint for SIH problem statement 26021." List data sources in small type: Farmonaut (honey farming in India — cerana and mellifera yields, ten-hive start-up cost) · Krishi Jagran (beekeeping in India — per-colony yield by species) · Colony strength under stationary and migratory beekeeping, Himachal Pradesh (migratory yields) · The Tribune, Haryana (farm-gate price and cost of production) · Selina Wamucii (India natural honey price — wholesale benchmark) · The Locavore (retail prices of premium single-origin honey). Add: "Yield and price context drawn from the sources above; all pod costs and the ₹200/₹450 selling prices are estimates made for this project."

### 2.14 Team page (`/team`)

- Team name: **Neural Nomads**
- Event: **Smart India Hackathon 2026**
- Project: **HoneyChain**
- Status pill: **Live Prototype**
- CTAs: "Open Live Dashboard" (→ `/dashboard`) and "Verify a batch" (→ `/verify`)

*(No individual member names, photos, or contact details were provided — leave clearly marked placeholder slots, e.g. "Add teammate" cards, rather than inventing names.)*

---

## Part 3 — How to actually run this in Antigravity

1. Create the project folder, add the three `.agent/` files from Part 0, then open that folder in Antigravity.
2. Switch to **Manager view**, start a new task, and paste the **Part 1** master prompt with **Part 2** substituted in for the marker line.
3. Antigravity will produce a **Plan artifact** first (task breakdown across pages/components) — read it before approving; this is where you catch a misread requirement cheaply.
4. Let it execute. It will use `/build_page` per route and finish with `/verify_all`. Review the screenshot artifacts it attaches for each page at each breakpoint before merging.
5. For any one-line tweak afterward (copy fix, color nudge), use the **Editor view** with an inline edit instead of spinning up another Manager task — faster for small changes.
6. Once you're happy, this is a static Vite build: `npm run build` produces a deployable `dist/` folder for GitHub Pages, Netlify, or Vercel for the hackathon demo link.
