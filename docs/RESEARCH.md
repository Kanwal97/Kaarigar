# RESEARCH — "Kaarigar" Multilingual Woodworking Training Platform

**Phase 1 deliverable.** Prepared 2026-07-24. This document answers the Phase 1 brief with evidence and links. It is organised as **Findings** (§1.1–§1.5), a consolidated **Open Questions** list (things I could not verify or need your decision on), and **Recommendations** to carry into Phase 2. Nothing here is application code, a plan, or a scaffold.

**Sourcing discipline used throughout:**
- Every non-obvious claim carries a source URL inline.
- **No YouTube video IDs, channel subscriber counts, or view counts are asserted as fact.** Channel *existence* was confirmed against live URLs; all audience metrics are marked *unverified*.
- Font byte sizes in §1.4 were **measured live** (`curl -I` against `fonts.gstatic.com` and the Fontsource CDN on 2026-07-24), not estimated.
- Items that could not be verified are collected in **§Open Questions** and also flagged inline.

---

## 1.1 The learner

### How carpentry is actually learned today

- India's trade workforce is trained **overwhelmingly informally**. Per NSSO/PLFS-derived analysis, only ~2–4% of the 15–59 workforce has *formal* vocational training; ~30% received non-formal training; the majority received none, and hereditary/on-the-job training rose sharply 2017–2023. ([dataforindia](https://www.dataforindia.com/vocational-training/), [IDR](https://idronline.org/article/livelihoods/skill-development-in-india-the-facts-behind-the-figures/))
- The dominant traditional route is the **ustad–shagird** (master–apprentice) system: the *shagird* starts as basic labour under a senior *mistri* and advances through hands-on mentorship, not classroom teaching. Academic work frames this as a living, adapting system, not a relic. ([term background](https://grokipedia.com/page/mistri_term), [apprenticeship study](https://www.academia.edu/43414533/Apprenticeship_and_Labour_amongst_Indian_Muslim_Artisans_Chapter_Five_))
- **Video self-teaching is now a primary channel.** YouTube credits vernacular content for its India growth (~265M+ monthly users, ~37% rural); Hindi dominates video-language preference (~54% prefer Hindi vs ~16% English). ([Inc42](https://inc42.com/buzz/youtube-achieves-265-mn-users-per-month-credits-vernacular-content-for-growth-in-india/), [Sunday Guardian](https://sundayguardianlive.com/news/platforms-youtube-skilling-rural-sector), [KPMG–Google summary](https://jbilocalization.com/what-the-kpmg-google-india-study-means-for-multimedia-localization/))
- **Implication:** the audience learns by *watching + doing under a mentor*, in Hindi, on a phone. The product should feel like **"structured YouTube shop-class in Hindi,"** not a textbook.

### Official ITI Carpenter syllabus (NCVT / DGT — CTS)

Source: *Carpenter, Competency Based Curriculum, CTS, NSQF Level-4, DGT/MSDE (Revised 2017)* — [PDF on bharatskills.gov.in](https://bharatskills.gov.in/pdf/Qp_Curriculum/Carpenter_CTS_NSQF-4.pdf)

- **NSQF Level 4, Construction sector; 1 year = 2 semesters of 6 months.** Graduate receives the National Trade Certificate (NTC) from NCVT.
- **Notional hours (total 2080):** Professional Skill (Trade Practical) 1050; Professional Knowledge (Trade Theory) 252; Workshop Calc & Science 84; Engineering Drawing 126; Employability Skills 110; plus library/project/exam.
- **Semester 1 coverage:** first aid / fire safety / PPE / housekeeping; timber & wood identification (soft vs hard, grain, defects — knots, shakes, checks); measuring/marking/testing tools and work-holding; sawing (rip, cross, oblique, curve) incl. portable power saw; planing & surface finishing; chiselling/paring; joints (identify, classify, prepare); small jobs to drawing incl. FRP/MDF/foam; carving; finishing (paint, polish, varnish).
- **Semester 2 coverage:** band-saw/circular-saw ops & blade setting; planing machine; pedestal grinder; drilling; wood-turning lathe; mortise & tenon machine; sanding machine; pattern/core-box; fitting & sheet-metal basics; roof trusses; door/window frames & shutters (wood/aluminium/PVC) assembly & fixing; painting; wooden floors & partitions; inspection & repair. Each semester ends with a 2-week project.
- **Assessment:** Practical pass 60%, Theory 40%; final All-India Trade Test by NCVT.

### FFSC qualification framework (NSDC — Furniture & Fittings Skill Council)

Source: *QP "Carpenter," FFS/Q2203 v2.0, NSQF Level 4* — [PDF on ffsc.in](https://ffsc.in/new-pdf/Version%202%20Qualifications/L4_Carpenter/FFS_Q2203_v2.0.pdf); NOS listing — [nsdcindia.org](https://nsdcindia.org/nos-listing/18)

- **Carpenter (FFS/Q2203):** NSQF Level 4, 44 credits. Covers site survey, reading drawings, measuring, cutting, shaping, assembly, joining, installing wood and wood-substitute products.
- **Structure = compulsory NOS + ≥1 elective.** Compulsory: client coordination/quality (N2210); material management & site prep (N2211); set-out/mark/fabricate (N2212); assembly/finishing/installation (N2213); health, safety & greening (N8203); working effectively incl. gender/PwD-sensitive practice (N8204); entrepreneurship (N8206); Employability Skills (DGT/VSQ/N0102, 60 hrs). Electives: Doors & Windows (N2214), Cladding & Panelling (N2215), Wooden Flooring (N2216), **Kitchen/Cabinets/Beds (N2217)**, House Structure (N2218), Repairs & Maintenance (N2219).
- Related roles exist at other NSQF levels (Level-3 Assistant Carpenter; archived "Carpenter – Wooden Furniture" FFS/Q0102). The exact *current* QP code for "Wooden Furniture Finisher" could not be pinned to a live PDF — see Open Questions.

> **Topic-map takeaway:** ITI and FFSC converge on the same spine — **timber → tools → sawing/planing/chiselling → joinery → machines → finishing → product assembly (doors/windows/cabinets/flooring).** This is a defensible, official, citable backbone for the platform's curriculum, and our L0–L10 spine maps onto it well (§1.3).

### Literacy & script reality

- **Literacy (Census 2011):** Punjab 75.84% (M 80.44 / F 70.73); Haryana 75.6%. Note this is *basic* reading ability, not comfortable sustained reading. ([Punjab](https://unacademy.com/content/bank-exam/study-material/general-awareness/literacy-rate-as-per-census-2011-in-punjab/), [Haryana](https://www.ceicdata.com/en/india/literacy-rate/literacy-rate-haryana))
- **Script split:**
  - **Haryana + Delhi-NCR + Hindi-belt → Devanagari/Hindi is the safe default.** Haryana schooling is Hindi-first (English + Hindi mandatory; Punjabi/Sanskrit/Urdu optional third language); Haryana bilingualism ~22%. ([three-language formula](https://www.drishtiias.com/state-pcs-current-affairs/haryana-adopts-three-language-formula-in-schools), [IGIDR WP](http://www.igidr.ac.in/pdf/publication/WP-2020-015.pdf))
  - **Punjab → Gurmukhi-first**, but with high bilingualism (~47%); Hindi compulsory from Class 4, so most schooled Punjabis read *both* Gurmukhi and Devanagari, with Gurmukhi the script of comfort/identity. ([Punjab language policy](https://www.tribuneindia.com/news/punjab/punjabi-to-be-3rd-language-in-govt-schools-27761), [IGIDR WP](http://www.igidr.ac.in/pdf/publication/WP-2020-015.pdf))
- **Implication:** even at ~75% literacy, comfortable reading of *technical* instructions is far lower, and the trade audience skews to lower-schooling informal workers. **Treat text as support, not the primary channel:** lead with audio narration + demonstration video + icons; keep on-screen text short; render Devanagari and Gurmukhi properly where labels appear. This aligns with the low-literacy UI evidence in §1.5.

---

## 1.2 Content landscape

**Honesty note:** channel *existence* below was confirmed against live URLs or real search results. **No subscriber/view/video counts were verifiable** through the fetch tooling (YouTube stat pages render only truncated navigation), so per the anti-fabrication rule every audience figure is *unverified* and deferred to a build-time YouTube Data API pull.

### English instructional channels (structure to emulate)

| Channel | Verified | Teaches | Beginner-sequenced? |
|---|---|---|---|
| **Paul Sellers** (`@Paul.Sellers`) + Woodworking Masterclasses + Common Woodworking | Bio + oEmbed author link | Hand-tool furniture "with a minimum of tools"; explicit beginner on-ramp (Common Woodworking) → project subscription (Masterclasses) | **Yes** — three-tier ladder + Foundation Course |
| **Steve Ramsey — Woodworking for Mere Mortals** (`@SteveRamsey`) | Channel URL + course site | Beginner, budget/space-limited, power-tool oriented | **Yes** — "Weekend Woodworker" is sequenced |
| **Rag 'n' Bone Brown** (Keith Brown) | Channel URL + site + Patreon | Restoration/upcycling, reclaimed wood — relevant low-cost ethos | Partly — project-led, not a formal curriculum |

Sources: [Paul Sellers bio](https://paulsellers.com/paul-sellers-biography/), [Common Woodworking](https://commonwoodworking.com/about/), [Wikipedia](https://en.wikipedia.org/wiki/Paul_Sellers), [Steve Ramsey channel](https://www.youtube.com/channel/UCBB7sYb14uBtk8UqSQYc9-w), [The Weekend Woodworker](https://theweekendwoodworker.com/signup/), [Rag 'n' Bone Brown](https://www.youtube.com/channel/UCVyE_6jEtVZGmYGXtUOL5FQ). *Leads not individually verified: Rob Cosman, Norm Abram.*

### Hindi channels (exist; character = single-project demos, not curricula)

Confirmed to exist via live channel URLs (content from search snippets; audio language/quality **needs a human to watch 2–3 videos each**):
- **HK Carpenter** — `youtube.com/channel/UCJgUK8wUl8i65IAhlqqgnxw`
- **Woodworking India** — `youtube.com/@woodworkingindia5782`
- **Harish carpenter** — `youtube.com/channel/UCZhXRtHcnc2Ammg0VCa83sA`
- Directory to mine manually (page body truncated): [Modash "Top Indian Woodworking YouTubers"](https://www.modash.io/find-influencers/youtube/india/woodworking)

**Character:** overwhelmingly single-project "how I built this" demos and shop-vlogs, plywood/MDF/modular-kitchen heavy. **No Hindi channel presents a numbered beginner→advanced skills ladder.**

### Punjabi & Haryanvi

- **Punjabi:** project/vlog channels exist (e.g. `@pkpunjabicarpanter4841`, `@punjabicarpenter7021`, "Punjab wood works Tatlay Aali"), none sequenced-instructional.
- **Haryanvi:** **no dedicated Haryanvi-language woodworking instructional channel found.** This near-absence is a genuine finding, not a search failure — Haryanvi is effectively **greenfield** and is arguably our single strongest differentiator.

### Gap analysis — hypothesis largely CONFIRMED

> *"No one offers a sequenced, structured curriculum in these languages, with local timber, local tool names, and local pricing reality."*

- **Structured local-language video curriculum — CONFIRMED GAP.** Structured ladders that exist are English and paywalled (Paul Sellers, Steve Ramsey). Hindi/Punjabi YouTube is demo/vlog. Corroborated by the [Indian Woodworker blog](https://indianwoodworker.wordpress.com/2014/07/15/where-to-learn-woodworking-in-india/), whose own learning recommendations are *all English channels* — direct testimony that a local-language structured path doesn't exist.
- **Nuance — the partial exception:** government structured programs *do* have Hindi/Punjabi materials — Bharat Skills "Wood Work Technician" study material ([portal](https://bharatskills.gov.in/Home/StudyMaterial?var=AzLv1odBjstKXkfVvHx0JQ%3D%3D&Default=YES)), NCTA carpentry ([course](https://nctaindia.in/courses?course_id=26)) — **but these are institutional PDF/in-person programs, not free, mobile, sequenced video.** The gap for *free + mobile + video + sequenced + local-language + local vocabulary/pricing* stands.
- **Local timber/tool/pricing — CONFIRMED GAP in structured offerings.** English curricula assume Western timber (oak, walnut) and tool vocabulary. Nothing structured teaches in sheesham/babool/ply-MDF-HDHMR terms, desi tool names, or Indian mandi pricing.

**Net wedge:** free + mobile + Hindi/Punjabi/**Haryanvi** + sequenced curriculum + local timber/tool vocabulary + local pricing. No existing source combines these.

### Embeddability is per-video and must be checked (verified live)

Two independent mechanisms — see §1.4 for the pipeline detail:
- **oEmbed pre-check** `https://www.youtube.com/oembed?url=<URL>&format=json` → **200 + JSON** = public & embeddable (verified live on a real ID); **non-200** (401 embedding-disabled/private, 4xx missing — a bogus ID returned 400 live) = do not rely on embedding.
- **IFrame Player API `onError`** at runtime → **101 / 150** = owner disallows embedded playback; fall back to "Watch on YouTube."

---

## 1.3 Subject-matter scope

*Sourcing: timber facts, plywood grades, and hardware brands are citable and cited. Most **local tool-name ↔ tool** mappings are oral trade knowledge — cited where a source exists, otherwise flagged for a human translator (esp. Punjabi/Haryanvi).*

### Timbers (North Indian workshop reality)

| Timber | Local name(s) | Botanical | Typical uses | Workability | Price tier |
|---|---|---|---|---|---|
| Sheesham / Shisham | *sheesham, tali* | *Dalbergia sissoo* | Default hardwood — beds, almirah frames, doors, sofa frames, carving | Excellent; interlocked grain can tear | Mid–high (regional benchmark) |
| Teak | *sagwan* | *Tectona grandis* | Premium beds, wardrobes, doors, humid-climate longevity | Very good, stable | High (~2× sheesham) |
| Mango | *aam* | *Mangifera indica* | Tabletops, shelving, budget/export furniture; fruiting byproduct | Good; softer than sheesham | Low–mid (~20–35% under sheesham) |
| Babool / Kikar | *babool, kikar* | *Acacia nilotica* | Very hard, termite-resistant; frames, handles, implements | Hard (Janka ~2300 lbf), warps if poorly seasoned | Low (informal supply) |
| Pine | *chir, cheed* | *Pinus roxburghii* | Cheap frames, crates, rustic furniture | Easy; soft, knotty | Low (cheapest solid) |
| Rubberwood | — | *Hevea brasiliensis* | Budget beds/tables, export/flat-pack; plantation byproduct | Good; stains uniformly; needs anti-borer | Low–mid |

Hardness anchors: sheesham ~1660, rubberwood ~960, babool ~2300 lbf (Janka). Sources: [Urbanwood](https://blog.urbanwood.in/sheesham-wood-best-for-furniture), [bareNest](https://www.barenest.in/blog/sheesham-vs-teak-vs-mango-wood-comparison), [Furnishack — babool](https://furnishack.com/how-good-is-babool-wood-for-furniture/), [Wood Database — rubberwood](https://www.wood-database.com/rubberwood/), [metroplastic — cheapest wood](https://metroplastic.in/cheapest-wood-in-india-which-types-cut-furniture-costs).

### Sheet goods & surfacing (these dominate real paid jobs)

| Material | IS standard / grade | What it is | Where used |
|---|---|---|---|
| Commercial ply (MR) | **IS:303**, MR | Urea-formaldehyde, moisture-*resistant* | Interior wardrobes/carcass — the workhorse |
| BWR ply | **IS:303**, BWR | Melamine/BWR resin, ~8 hr boil | Kitchens, semi-wet zones |
| Marine / BWP ply | **IS:710** | Phenolic, 72-hr boil, waterproof | Kitchens (top), bathrooms, exterior |
| MDF | (IS 12406) | Fine fibre + resin, smooth, no grain | Shutters, TV units, routed/lacquer panels |
| HDF / HDHMR | — | Denser/harder; HDHMR tougher step above | Flooring, high-stress panels |
| Particle board | IS 3087/3097 | Coarse chips + resin, cheap, moisture-weak | RTA/OEM furniture, false ceilings (dry only) |
| WPC | — | Wood + plastic + resin | Wet zones, vanities, louvers |
| Laminate ("Sunmica") | HPL, ~1 mm / 0.8 mm liner | Decorative resin+paper sheet over ply/MDF | Almost every visible cabinet surface |
| Veneer | — | Thin real-wood slice over ply/MDF | Premium natural-wood look |
| Acrylic | PMMA / acrylic-HPL | High-gloss plastic over MDF | High-gloss modular kitchens/wardrobes |

Board quality ladder: particle board < MDF < HDF < HDHMR. Sources: [Greenply — grades](https://www.greenply.com/blogs/types-of-plywood-in-india-explained-mr-bwr-bwp-marine-commercial-grades), [McCoyMart — 303 vs 710](https://mccoymart.com/post/difference-between-303-and-710-grade-plywood/), [Asher Spaces — board types](https://asherspaces.com/difference-between-plywood-block-board-particle-board-mdf-hdf-hdhmr-and-wpc/), [Royale Touche — Sunmica/laminate](https://royaletouche.com/blog/difference-between-sunmica-and-laminate-sheets/).

> **Curriculum flag:** **blockboard** (very common for shutters/doors/tabletops) is missing from the brief's L1 and should be added.

### Tool glossary (multilingual — Punjabi/Haryanvi left `[TBD]` for a human translator)

Legend: ✅ cited · 🪵 trade knowledge (confirm). **Never ship 🪵/[TBD] rows as fact.**

| English | Hindi (Devanagari / roman) | pa / bgc | Function | Status |
|---|---|---|---|---|
| Handsaw | आरी / *aari* | [TBD] | Cutting stock | ✅ [sutharsamaj](https://sutharsamaj.net/vishwakarma-dharma/carpenter-tools-names-in-english-hindi-urdu-and-sindhi-languages/) |
| Hand plane | रंदा / *randa* | [TBD] | Flattening/smoothing | ✅ [factdunia](https://factdunia.com/carpenter-tools-name-in-hindi/) |
| Chisel (firmer) | रूखनी / *rukhani* (नेहानी *nehani*) | [TBD] | Paring, mortising | ✅ [HinKhoj](https://dict.hinkhoj.com/%E0%A4%B0%E0%A5%82%E0%A4%96%E0%A4%A8%E0%A5%80-meaning-in-english.words) |
| Adze | बसूला / *basula* | [TBD] | Hewing/shaping | 🪵 name attested; adze gloss unconfirmed |
| Hammer | हथौड़ा / *hathoda* (*hathodi* = small) | [TBD] | Driving nails | ✅ factdunia |
| Mallet | लकड़ी का हथौड़ा | [TBD] | Striking chisels | ✅ |
| Spanner / wrench | पाना / *pana* | [TBD] | Bolts/nuts | ✅ sutharsamaj |
| Twine / string | सुतली / *sutli* | [TBD] | Layout lines | 🪵 |
| Try square | गुनिया / *gunia* | [TBD] | Marking/checking 90° | ✅ |
| Marking gauge | मार्किंग गेज (रवा?) | [TBD] | Scribing parallel lines | 🪵 |
| File / rasp | रेती / *reti* | [TBD] | Smoothing/shaping | ✅ factdunia |
| Hand drill | बरमा / *burma* | [TBD] | Boring holes | ✅ factdunia |
| Measuring tape | इंची टेप / फीता | [TBD] | Measuring | ✅ |
| Screwdriver | पेचकस / *pechkas* | [TBD] | Driving screws | ✅ |
| Pincer | पिनसर | [TBD] | Pulling nails | ✅ |
| Vice / clamp | शिकंजा / *shikanja* | [TBD] | Work-holding | ✅ |

### Finishing (as practised in India)

| Finish | What | Where |
|---|---|---|
| **French polish** | Hand-rubbed shellac (lac resin) in alcohol; India = world's largest shellac producer | Heritage/carved sheesham & teak; still the default "polish" in many shops; repairable, low durability |
| **Melamine** | Melamine spray/wipe, matte–gloss | Affordable mid-tier standard; scratches/fades faster than PU |
| **PU (polyurethane)** | 2-pack spray, clear or colour, high durability | Current premium — modular kitchens, wardrobes, doors |
| **Duco (NC)** | Nitrocellulose opaque paint | Painted furniture, MDF; peels in sun/heat, being displaced by PU |
| **Wax** | Beeswax rub, low sheen | Rustic/solid-wood, low-traffic |
| **Deco / enamel** | Enamel paint | Budget, kids', village/utility furniture |

Sources: [Wikipedia — French polish](https://en.wikipedia.org/wiki/French_polish), [MIPL — polish types](https://themiplgroup.com/understanding-different-polish/), [PaintingDrive — melamine vs PU](https://paintingdrive.com/blog/melamine-polish-vs-p-u-polish-whats-the-difference/). **Spray finishing (PU/Duco) needs its own safety sub-unit (respirators, ventilation, isocyanates in PU).**

### The business layer

- **Estimating per sq.ft — the #1 dispute source is *measurement method*:** *face/front area* (H×W of the front) vs *developed/unfolded area* (counts every shelf, partition, internal surface — always larger). **Always state which method a quote uses.** Teach this as a headline commercial skill in L2 *and* L10.
- **Indicative 2026 rate bands** (vary sharply by city/skill/timber market — localize before publishing): labour-only ~₹150–500/sq.ft; labour+material wardrobe ~₹1,300–2,500/sq.ft; basic hinged wardrobe in commercial ply+laminate ≈ ₹1,800/sq.ft. ([solve24](https://solve24.in/blog/carpenter-labour-rate-per-square-feet-india-2026), [Asian Paints — wardrobe cost](https://www.beautifulhomes.asianpaints.com/blogs/wooden-wardrobe-making-cost.html))
- **Hardware — the three names every carpenter knows:** **Hettich** (German, premium hinges/runners/tandem boxes), **Ebco** (India's largest furniture-hardware maker, broad mid-range), **Godrej** (locks, hinges, modular fittings). Anchor the hardware unit on real SKUs (soft-close hinges, telescopic/tandem channels, cam-lock/minifix). ([Building & Interiors](https://buildingandinteriors.com/best-kitchen-hardware-brands-top-fittings-accessories-companies-in-india/), [Mordor — market](https://www.mordorintelligence.com/industry-reports/india-furniture-hardware-market))
- **Tool-investment order (starting carpenter):** tape + gunia + pencil/gauge → aari + randa → rukhani chisels + mallet → hathoda + pechkas + pana + pincer → reti + clamps → corded drill/driver → circular saw/jigsaw → router → bench planer/table saw. ([Kreg — essential tools](https://learn.kregtool.com/learn/top-carpentry-tools/), [Ajay Tools — Indian hand tools](https://www.ajaytools.com/different-woodworking-hand-tools-in-india/))

### Critique of the proposed L0–L10 spine

The spine is sound as a maker's ladder. Adjustments for **Indian workshop reality**:

- **Sheet goods + hardware are underweighted and come too late.** The bulk of paid Punjab/Haryana work is ply/MDF carcass + laminate + Hettich/Ebco hardware, not solid-wood joinery. Pull a **board-cutting / edge-banding / laminate-pasting** module earlier (right after L4), and give **hardware** (hinges, channels, locks, minifix/cam-lock/dowel joinery) its own strong module — it's bread-and-butter income.
- **Dovetail is largely aspirational** in commercial Indian shops. Keep it but mark it **"heritage/premium" and do not gate progress on it.** Add the joints that actually get used: butt+screw/dowel, minifix/cam-lock, biscuit/dowel, edge-banded panel joints.
- **Add early:** blockboard (L1); **timber seasoning / moisture / termite-borer treatment** (critical in Indian climate, L1); **Indian machine-safety** (guardless belt-driven machines, hand-fed "patti" saws, electrical, dust, spray-booth fumes — L0).
- **Business realism:** face-vs-developed-area measurement literacy (L2 + L10); **site vs shop work** and on-site scribing (walls are never square — L9/L10); GST/invoicing/UPI advances, mandi sourcing, dealer credit (L10).
- **Project ladder (L9), India-appropriate:** patra/patta stool → chowki/pidhi → cot/palang → almirah/wardrobe → **laminated ply wall-unit** → modular kitchen. Add the wall-unit as the commercial stepping-stone.

---

## 1.4 Technical research

### GitHub Pages specifics

- **Project-site base path:** served from `https://<owner>.github.io/<repo>/`, so absolute asset paths like `/assets/app.js` 404. Set the bundler base (`base: '/<repo>/'` in Vite) and the matching client-router basename; use relative asset URLs. ([GitHub Pages basics](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages), [Vite static deploy](https://vite.dev/guide/static-deploy.html))
- **SPA deep-link 404:** GitHub Pages has *no server rewrite*, so hard-loading/refreshing a client route 404s. Two fixes: **(a) 404.html redirect trick** ([spa-github-pages](https://github.com/rafgraph/spa-github-pages)) — clean History-API URLs, but an extra redirect hop and (per the repo) Google no longer follows the 404 redirect since ~2019, hurting deep-link SEO unless you supply a sitemap; **(b) hash routing** (`/#/route`) — the fragment never reaches the server, so refresh/deep-links always work with zero tricks, at the cost of ugly URLs and weaker SEO.
- **`.nojekyll`:** Jekyll ignores files/folders starting with `_` (many bundlers emit these). An empty `.nojekyll` at the publish root disables Jekyll. Not run under the Actions artifact deploy path, but harmless to include. ([canonical blog](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/), [community discussion](https://github.com/orgs/community/discussions/23166))
- **Deploy method — recommend GitHub Actions** (`actions/upload-pages-artifact` + `actions/deploy-pages`) over classic branch: fits a Vite build, keeps compiled output out of git, skips Jekyll, and hosts the build-time video-verification step. GitHub itself recommends Actions for non-Jekyll builds. ([publishing source docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site))
- **Custom domain / HTTPS:** configure domain in settings (with a custom Actions workflow, no CNAME file is needed); apex uses A/AAAA, subdomain uses a CNAME DNS record; enable **Enforce HTTPS** after DNS propagates. ([custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site))
- **Limits (exact):** source repo recommended ≤ **1 GB**; published site ≤ **1 GB**; bandwidth **soft 100 GB/month**; builds **soft 10/hour**. ([limits docs](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits))

### YouTube embedding

- **`youtube-nocookie.com` (privacy-enhanced):** prevents embedded views from influencing the viewer's YouTube experience and serves non-personalized ads; reduces tracking (not a zero-cookie guarantee). ([Google support](https://support.google.com/youtube/answer/171780))
- **Facade / lite-embed:** render only a thumbnail + play button; inject the heavy iframe on click. web.dev measures **~500 KB saved on initial load** (the defensible figure) and recommends **lite-youtube-embed** (which defaults to `youtube-nocookie.com` and can expose the JS API). ([web.dev embed best practices](https://web.dev/articles/embed-best-practices), [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed), [Lighthouse facades](https://developer.chrome.com/docs/lighthouse/performance/third-party-facades)) *The oft-repeated "224× faster" claim is a tongue-in-cheek README benchmark — cite the ~500 KB instead.*
- **IFrame Player API (`enablejsapi=1`) — keyless, client-side:** gives `onReady`, `onStateChange` (states -1/0/1/2/3/5), `getCurrentTime()`/`getDuration()`, and `onAutoplayBlocked` for progress tracking on a static site. Mobile autoplay: **muted autoplay only**; sound requires a user gesture. ([IFrame API reference](https://developers.google.com/youtube/iframe_api_reference), [Chrome autoplay policy](https://developer.chrome.com/blog/autoplay/))

### Verifying video IDs without a paid key — **recommend oEmbed primary**

- **Public oEmbed** `…/oembed?url=<URL>&format=json` — **no key**. 200 + JSON = exists & embeddable (verified live); **404** = missing; **401** = private/embedding-disabled. In one request it confirms the *two* failure modes that break a static embed. Exact error codes/rate limits aren't in an official spec (treat any non-200 as "do not embed"; batch politely).
- **YouTube Data API v3 at build time** (repo secret, never shipped to client): `videos.list` costs **1 unit**; default quota **10,000 units/day** — thousands of checks/build. Adds authoritative `status.embeddable` / `status.privacyStatus`. ([quota cost docs](https://developers.google.com/youtube/v3/determine_quota_cost))
- **Recommendation:** **oEmbed as the required CI gate** (keyless, existence + embeddability); add Data API *only* if you need authoritative status distinctions. Never ship any key to the client — a static site can't hide it; client-side progress is fully covered keyless by the IFrame API.

### i18n for static sites — **recommend per-locale static builds**

- **(a) runtime JSON dictionaries** (one URL, JS swaps strings): simplest, but **weak SEO** (Google wants a distinct URL per language; one runtime-switched URL can't carry `hreflang`), and puts i18n JS on the critical path before correct text renders. ([Google — managing multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites))
- **(b) per-locale static builds** at `/en/ /hi/ /pa/ /bgc/`: **strong SEO** (indexable URLs, valid `hreflang`, per-locale meta rendered at build time with zero JS), **smallest bytes/user** (each visitor gets only their language, no i18n runtime on the critical path — critical on Indian mobile data), and modern tooling (Astro / Paraglide / i18next-static) keeps translations as per-locale JSON **compiled into** each build, preserving the simple translator workflow. ([Google — localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [Astro i18n](https://intlpull.com/blog/astro-i18n-localization-guide-2026), [Paraglide SSG](https://paraglidejs.com/static-site-generation))
- **Recommendation → (b).** Add a self-referencing `hreflang` + `x-default` on every page. ⚠️ **Haryanvi caveat:** `/bgc/` URL prefixes are fine, but `bgc` is ISO 639-3; some `hreflang` validators only accept ISO 639-1, and Google Search's honouring of `bgc` is uncertain — use `x-default` and monitor Search Console (Open Question).

### Indic typography (font sizes measured live 2026-07-24)

| Font | Variant | ≈ size |
|---|---|---|
| Noto Sans Devanagari | Devanagari-subset woff2, static wght-400 | **~49 KB** |
| Noto Sans Devanagari | Devanagari-subset woff2, variable wght axis | **~118 KB** |
| Noto Sans Gurmukhi | Gurmukhi-subset woff2, static wght-400 | **~11 KB** |
| Noto Sans Gurmukhi | Gurmukhi-subset woff2, variable wght axis | **~33 KB** |

- **Devanagari is the cost driver; Gurmukhi is cheap.** Use static wght-400 subsets if one weight suffices; a single variable subset beats multiple static weights when you need 3+ weights. Both have variable fonts (weight axis). ([Fontsource Devanagari](https://fontsource.org/fonts/noto-sans-devanagari), [notofonts Gurmukhi](https://notofonts.github.io/noto-docs/specimen/NotoSansGurmukhi/))
- **Subset by *script block*, not observed characters.** Devanagari rendering depends on conjuncts, matras, reph, and dotted-circle `U+25CC` produced by OpenType GSUB — dropping glyphs the shaper needs breaks conjuncts. Subset to the whole Devanagari block + marks (incl. `U+25CC`, ZWJ/ZWNJ `U+200C/200D`), keep OpenType tables, then declare a matching `unicode-range`; serve WOFF2. ([web.dev — reduce font size](https://web.dev/articles/reduce-webfont-size), [MS — Devanagari OpenType](https://learn.microsoft.com/en-us/typography/script-development/devanagari), [W3C — Devanagari layout](https://www.w3.org/International/ilreq/devanagari/))
- **Line-height:** Devanagari matras (above/below) and Gurmukhi laga-matra extend beyond the Latin band; Google Fonts guidance says metric sums may need to exceed 130% to avoid interline collisions, and WCAG C21 wants ≥1.5. **Use `line-height: 1.6` for Indic body text**; never clip with fixed line-box heights. ([Google Fonts metrics](https://googlefonts.github.io/gf-guide/metrics.html), [WCAG C21](https://w3c.github.io/wcag/techniques/css/C21))
- **CLS:** use `font-display: swap` + `size-adjust`/`ascent-override`/`descent-override` on a `local()` fallback. ⚠️ Auto-tuners (Fontaine, next/font, Capsize) are Latin-calibrated and there's no metric-compatible *system* fallback for Devanagari/Gurmukhi — expect *reduced* but maybe not *zero* CLS; reserve vertical space and test on-device. ([Chrome — font fallbacks](https://developer.chrome.com/blog/font-fallbacks))

### Offline / service worker — be blunt

- **CAN cache:** app shell + per-locale HTML/CSS/JS/JSON + images + fonts (precache or Workbox runtime strategies) and **self-hosted audio** — but audio only via **precache/`cache.add()`/`warmStrategyCache`** (media uses Range requests → partial 206s), with the `crossorigin` attribute and `workbox-range-requests`. ([Chrome — runtime caching](https://developer.chrome.com/docs/workbox/caching-resources-during-runtime), [Chrome — cached audio/video](https://developer.chrome.com/docs/workbox/serving-cached-audio-and-video))
- **CANNOT cache: YouTube video.** Two blockers — **technical** (a service worker can't intercept the internal streaming requests of a cross-origin YouTube iframe; responses are opaque/partial) and **legal** (YouTube ToS/Developer Policies prohibit downloading/offline playback and modifying the embedded player). Offline mode serves the full app, text, images, fonts, and self-hosted audio; **YouTube video degrades to a "connect to watch" placeholder.** ([MDN — Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), [YouTube Developer Policies](https://developers.google.com/youtube/terms/developer-policies-guide))
- **Quota/eviction:** an origin may use ~60% of disk; default storage is best-effort, evicted LRU under pressure — call `navigator.storage.persist()` and check `navigator.storage.estimate()`. Keep the offline bundle to **tens of MB** (Devanagari fonts + audio add up). ([MDN — storage quotas](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria))

### Progress persistence — **recommend localStorage**

- **localStorage** (~5 MiB/origin, synchronous, strings) vs **IndexedDB** (large quota, async, structured/binary). Progress is a tiny JSON blob → **`localStorage` with one `JSON.stringify`'d object**, every call wrapped in `try/catch` (private/incognito can throw or wipe on session end); request `navigator.storage.persist()`. Migrate to IndexedDB only if data grows or goes binary. ([MDN — localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [MDN — IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API))
- **Device migration without accounts:** JSON **export** (serialize → `Blob` → `URL.createObjectURL` → `<a download>`) and **import** (`<input type=file>` → `File.text()` → `JSON.parse` → validate → write back), with a `version` field + schema check so old files don't corrupt. ([MDN — Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob), [MDN — File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API))

---

## 1.5 Accessibility & inclusion

### WCAG 2.2 AA targets (relevant subset)

Source: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WebAIM overview](https://webaim.org/blog/wcag-2-2-overview-and-feedback/)

- **1.4.3 Contrast (min), AA:** text ≥ **4.5:1**; large text (≥18pt / ≥14pt bold) ≥ **3:1**.
- **1.4.11 Non-text Contrast, AA:** UI components / meaningful icons ≥ **3:1** vs adjacent colours.
- **2.5.8 Target Size (min), AA (new):** interactive targets ≥ **24×24 CSS px** (unless spacing/inline/equivalent exceptions).
- **2.4.11 Focus Not Obscured (min), AA (new):** focused element not fully hidden by sticky headers/footers.
- **2.4.7 Focus Visible, AA.** (2.4.13 Focus Appearance — thickness/contrast of the indicator — is **AAA**, treat as good practice.)

### Touch targets — reconciled

WCAG 2.5.8 floor **24px**; Material **48dp**; Apple HIG **44pt**. **Recommendation for one-handed, gloves/dust, low-end phones:** **primary tap targets ≥ 48px with ≥ 8px spacing** (clears all three), and **primary "play/next/learn" controls 56–64px** in the lower-center thumb zone. 24px is a legal minimum, not a usability target for this audience. ([target size foundations](https://tetralogical.com/blog/2022/12/20/foundations-target-size/), [Material touch targets](https://m2.material.io/develop/web/supporting/touch-target), [HIG summary](https://blog.logrocket.com/ux-design/all-accessible-touch-target-sizes/))

### Environment, motion, screen readers

- **Sun/dust readability — the levers we control:** exceed contrast minimums (**aim ~7:1 body text**, AAA-level), large non-thin type, dark text on solid light backgrounds, never colour-only meaning. We can't control device brightness. ([contrast & mobile](https://phase2.io/blog/how-color-contrast-accessibility-helps-mobile-experience))
- **`prefers-reduced-motion`:** honour via `@media (prefers-reduced-motion: reduce)`; no auto-playing parallax/motion; animations essential-only (WCAG 2.3.3). ([W3C C39](https://www.w3.org/WAI/WCAG21/Techniques/css/C39))
- **Indic screen readers:** NVDA is localized into Hindi/Punjabi and the Hear2Read add-on provides Indic neural TTS; Android **TalkBack** is the realistic mobile target. **But default-synth Indic TTS quality is uneven/install-dependent** — **ship our own recorded human audio** for content, while still exposing correct semantics and `lang` attributes for screen-reader users. ([Hear2Read](https://hear2read.org/NVDA_Addon), [NVDA](https://assistivlabs.com/assistive-tech/screen-readers/nvda))

### What "low-literacy friendly" concretely means

Evidence: ACM/HCI reviews + SARAL synthesis. ([ACM review](https://dl.acm.org/doi/fullHtml/10.1145/3578837.3578842), [low-literacy mobile UI](https://www.researchgate.net/publication/254004140_Mobile_interface_design_for_low-literacy_populations))

- Minimize text; lead with **graphics + local-language audio** (audio is essential, not optional).
- **Icons:** concrete, locally recognizable objects, **always paired with a label + tap-to-hear audio**; simple representations beat detailed photos or abstract symbols (arrows).
- **Simple linear navigation** beats deep hierarchies for low-literacy users — fewer errors.
- Synthesis for us: **icon + short label + tap-to-hear audio; one primary action per screen; numbered visual steps; progressive disclosure; demonstration video as the core teaching unit.**

---

## Open Questions (for your decision / could-not-verify)

**Need your decision:**
1. **Repo name / custom domain?** Determines base path (`/<repo>/`) and whether we configure a CNAME. If you have a domain (e.g. `kaarigar.in`), the base-path handling simplifies.
2. **Routing choice — hash vs 404.html trick.** I lean hash routing for maximum robustness on a free static host (refresh-proof, no redirect penalty); the 404.html trick buys clean URLs + better deep-link SEO at the cost of a redirect hop. Which matters more to you — bulletproof deep links, or clean/indexable URLs? (This interacts with the per-locale `/hi/…` SEO goal — worth deciding together in Phase 2.)
3. **Language priority for launch content.** Evidence says **Hindi is the pragmatic source-of-truth for the audience** (Haryana/NCR default; most Punjab readers also read Devanagari), while English is the natural authoring/source pair. Do you want L0 authored English+Hindi first, with `pa`/`bgc` as human-translated fast-follows (badged "Punjabi coming — showing Hindi")? The brief implies yes; confirming.
4. **Haryanvi content strategy.** Haryanvi is *greenfield* — there is essentially no existing Haryanvi carpentry video or written corpus, and no standardized orthography. Realistically we must **produce** Haryanvi (audio especially), not curate it. Is commissioning a Haryanvi translator/narrator in scope, or does `bgc` stay schema-ready-but-empty in v1?
5. **Audio narration in v1?** It is the single highest-leverage feature for this audience but the most expensive to produce (human recording per lesson per language). Schema + player will exist regardless; do we budget recording for L0 at launch, or ship the slot empty?

**Could not verify (flagged; need a human/API pass before publishing):**
6. **All YouTube audience metrics** (subscribers/views) and the actual spoken language/teaching quality of the Hindi/Punjabi channels — require a build-time YouTube Data API pull + a human watching 2–3 videos each. No channel should be cited to learners until then.
7. **Per-video embeddability** of any specific candidate video — must be run through the oEmbed check individually; no `videoId` enters a lesson without it (all start as `"TODO"`).
8. **Exact script-level reading-comfort split** (Gurmukhi vs Devanagari) — Census gives literacy + bilingualism, not reading-comfort; our split is inferred from language-in-education policy.
9. **Current FFSC "Wooden Furniture Finisher" QP code** — only "Carpenter FFS/Q2203 v2.0" confirmed live; finisher role exists but its live QP PDF wasn't pinned.
10. **Local tool terms** — the entire Punjabi/Haryanvi glossary column is `[TBD]`, plus several Hindi mappings are trade knowledge (basula→adze, marking-gauge→rava, sutli). Needs a local tradesperson/translator; do not ship as fact.
11. **Indian price bands & IS standard revision numbers** — indicative from vendor blogs; localize to Jalandhar/Ludhiana/Karnal markets and confirm BIS revisions before publishing.
12. **Google Search honouring `hreflang="bgc"`** (ISO 639-3) — unconfirmed; mitigate with `x-default` + Search Console monitoring.
13. **Mobile Cache API "~50 MB" cap** — secondary sources only; MDN documents a %-of-disk model. Treat 50 MB as a conservative planning ceiling.
14. **Indic fallback-font CLS** — no metric-compatible system fallback exists for Devanagari/Gurmukhi; overrides reduce but may not eliminate shift. Verify on a real low-end device.

---

## Recommendations (to carry into Phase 2)

**Product / content**
1. **Content backbone = the shared ITI + FFSC skill spine** (timber → tools → sawing/planing/chiselling → joinery → machines → finishing → assembly) — official, citable, and a good match to L0–L10.
2. **Re-weight toward sheet goods + hardware + laminate/spray finishing** (where Indian carpenters actually earn). Frame solid-wood joinery/dovetails as heritage/premium, **not** a progress gate.
3. **Add early modules:** blockboard; timber seasoning + termite/borer treatment; **Indian machine-safety** (guardless belt machines, patti saws, spray fumes).
4. **Teach face-vs-developed-area estimating as a headline commercial skill**, with worked wardrobe/almirah examples; anchor hardware on Hettich/Ebco/Godrej SKUs.
5. **Audio-and-video first, text as support.** Human Hindi narration; Punjabi fast-follow; short on-screen labels/step-numbers. Icon + label + tap-to-hear; one primary action per screen; linear lesson navigation; progressive disclosure.

**Engineering**
6. **Deploy via GitHub Actions** (`deploy-pages`); `base:'/<repo>/'` + matching router basename; include `.nojekyll`.
7. **i18n = per-locale static builds** `/en/ /hi/ /pa/ /bgc/`, translations authored as per-locale JSON compiled into each build; self-referencing `hreflang` + `x-default`; `bgc` mitigated as above.
8. **Fonts:** self-host WOFF2 **script-block subsets** (Deva + Gurmukhi + Latin) with `unicode-range`; keep OpenType tables (conjunct shaping); `font-display: swap` + metric overrides; **`line-height: 1.6`** for Indic; **load Gurmukhi only when `pa` is active.**
9. **YouTube:** lite-youtube **facade** → `youtube-nocookie.com` (~500 KB saved); keyless **IFrame API** for progress; muted-only autoplay. **oEmbed as the required CI verification gate**; Data API optional at build time via repo secret; **no key ever shipped to client; every `videoId` starts `"TODO"`** and enters `content/_needs-sourcing.md`.
10. **Storage = localStorage** (JSON blob, `try/catch`, `persist()`); **JSON export/import** with `version` + validation for device migration.
11. **Offline (be honest):** precache app shell + per-locale content + fonts + images + **self-hosted audio** (range-requests); **YouTube video is online-only** and degrades to a "connect to watch" placeholder. Keep the offline bundle to tens of MB.
12. **Accessibility:** tap targets ≥ 48px (primary 56–64px) in the thumb zone; **~7:1 body contrast** for sun/dust; `prefers-reduced-motion` respected; correct `lang`/semantics for TalkBack/NVDA but **ship our own audio** rather than trusting device Indic TTS.

---

*End of Phase 1 deliverable. Per the operating protocol, I now **stop and await your approval** before beginning Phase 2 (Plan). Nothing beyond this research document has been produced — no plan, no schemas, no scaffold, no code.*
