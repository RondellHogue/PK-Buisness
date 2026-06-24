// Structured, research-informed review content for each provider.
// Content summarizes recurring themes from official policy documents and public
// review sources (Trustpilot, Consumer Affairs, BBB). It is intentionally
// balanced: every provider has both advantages and drawbacks. Nothing here
// fabricates individual customer stories or quotes.
//
// Keyed by the provider name lowercased (matching insurance_providers.name).

export interface ProviderFaq {
  q: string
  a: string
}

export interface ProviderReview {
  overview: string
  pros: string[]
  cons: string[]
  coverageDetails: string
  claimsExperience: string
  pricingConsiderations: string
  customerExperience: string
  bestFor: string
  notIdealFor: string
  alternatives: string[]
  faqs: ProviderFaq[]
}

export const providerReviews: Record<string, ProviderReview> = {
  spot: {
    overview:
      'Spot offers accident-and-illness and accident-only plans with an unusually wide range of customization. Deductibles, reimbursement rates, and annual limits can each be adjusted, and exam fees for covered conditions are included. There are no upper age limits for enrollment, which makes it worth a look for older pets.',
    pros: [
      'Highly customizable deductibles, reimbursement levels, and annual limits',
      'Covers the exam fees tied to a covered accident or illness',
      'No upper age limit for enrolling a pet',
      'Optional preventive care add-on for routine costs',
    ],
    cons: [
      'Premiums commonly rise as a pet ages, as with most insurers',
      'No direct-to-vet payment; you pay first and are reimbursed',
      'The number of plan options can feel overwhelming when first quoting',
    ],
    coverageDetails:
      'Plans cover accidents, illnesses, hereditary and congenital conditions, behavioral issues, and exam fees for covered visits. A separate preventive care package can be added for wellness costs. Pre-existing conditions are excluded, consistent with the industry.',
    claimsExperience:
      'Claims are submitted after you pay your vet, through the app or member portal. Reviewers generally describe the process as straightforward, with the usual caveat that complete medical records speed up approval.',
    pricingConsiderations:
      'Mid-range pricing that varies widely with the deductible, reimbursement rate, and limit you choose. The flexibility helps you fit a budget, but the lowest premiums come with higher deductibles or lower reimbursement.',
    customerExperience:
      'Public reviews tend to be positive on plan flexibility and coverage of exam fees. As with the category, the most common frustration is premium increases at renewal.',
    bestFor: 'Owners who want to fine-tune a plan to a budget, and those insuring older pets.',
    notIdealFor: 'People who want their vet paid directly at checkout.',
    alternatives: ['Embrace', 'Pumpkin', 'Figo'],
    faqs: [
      { q: 'Does Spot cover exam fees?', a: 'Yes, exam fees for covered accidents and illnesses are included, which not every insurer does.' },
      { q: 'Is there an age limit to enroll?', a: 'No. Spot does not impose an upper age limit, though premiums for older pets are higher.' },
      { q: 'Are pre-existing conditions covered?', a: 'No. Like other insurers, Spot excludes pre-existing conditions.' },
    ],
  },
  'healthy paws': {
    overview:
      'Healthy Paws is a long-running accident-and-illness plan known for a single, simple policy with unlimited annual and lifetime payouts. There are no per-incident or per-condition caps, which can matter for serious, ongoing conditions. The trade-off is a lack of plan tiers and no wellness coverage.',
    pros: [
      'No annual or lifetime payout limits',
      'One straightforward plan, so less to compare',
      'Reputation for fast claim turnaround',
      'Covers hereditary and congenital conditions',
    ],
    cons: [
      'No routine/wellness coverage option',
      'No direct-to-vet payment; reimbursement only',
      'A one-time enrollment fee applies',
      'Older pets can face age-based pricing and limited customization',
    ],
    coverageDetails:
      'Covers accidents, illnesses, hereditary conditions, and diagnostics with no payout caps. Exam fees and wellness/routine care are not covered. A 12-month waiting period applies to hip dysplasia for pets enrolled after a certain age.',
    claimsExperience:
      'Claims are filed through the mobile app by photographing the invoice. Reviewers frequently cite quick processing, often within a couple of days, as a standout.',
    pricingConsiderations:
      'Competitive for younger pets, with premiums that rise as pets age. Because there is only one plan, you cannot lower the premium by reducing the annual limit, only by adjusting deductible and reimbursement.',
    customerExperience:
      'Generally well regarded for claims speed and simplicity. The most common complaints involve premium increases over time and the absence of a wellness option.',
    bestFor: 'Owners who want simple, uncapped coverage and fast reimbursement.',
    notIdealFor: 'People who want wellness coverage or extensive plan customization.',
    alternatives: ['Trupanion', 'Embrace', 'Pets Best'],
    faqs: [
      { q: 'Does Healthy Paws have payout limits?', a: 'No. There are no annual or lifetime caps on covered claims.' },
      { q: 'Is wellness care covered?', a: 'No. Healthy Paws does not offer a routine or wellness add-on.' },
      { q: 'How fast are claims paid?', a: 'Many reviewers report reimbursement within a few days of filing through the app.' },
    ],
  },
  trupanion: {
    overview:
      'Trupanion takes a distinctive approach: one comprehensive plan, a per-condition lifetime deductible rather than an annual one, and the ability to pay participating veterinarians directly at checkout. It tends to be one of the more expensive options, but the structure can suit pets with a single chronic condition.',
    pros: [
      'Can pay participating vets directly, avoiding large upfront bills',
      'Per-condition deductible that does not reset every year',
      'No payout limits',
      '90% reimbursement with no benefit caps per condition',
    ],
    cons: [
      'Among the highest premiums in the category',
      'Exam fees are not covered in many cases',
      'Direct pay only works at participating clinics',
      'Rates can still rise with regional vet cost inflation',
    ],
    coverageDetails:
      'Covers accidents, illnesses, hereditary and congenital conditions, and diagnostics with no payout caps. The per-condition deductible means you pay it once per condition for the pet\'s life. Wellness and exam fees generally require add-ons or are excluded.',
    claimsExperience:
      'When a clinic supports Trupanion\'s software, approved claims can be paid to the vet within minutes, so you only cover your portion. At non-participating clinics you pay first and submit for reimbursement.',
    pricingConsiderations:
      'Typically the priciest option here. The value proposition is strongest for a pet likely to develop one ongoing, costly condition, where the per-condition deductible and direct pay shine.',
    customerExperience:
      'Praised for direct vet pay and handling of major claims. The most common complaints are price and premium increases, plus the exam-fee exclusion.',
    bestFor: 'Owners who want their vet paid directly and expect a costly chronic condition.',
    notIdealFor: 'Budget-focused shoppers and those who want exam fees covered.',
    alternatives: ['Healthy Paws', 'Pumpkin', 'Fetch'],
    faqs: [
      { q: 'How does the per-condition deductible work?', a: 'You pay the deductible once per condition, not once per year, and it does not reset annually.' },
      { q: 'Will Trupanion pay my vet directly?', a: 'Yes, at clinics that use its software; otherwise you are reimbursed after paying.' },
      { q: 'Are exam fees covered?', a: 'Often not. Exam fees are commonly excluded, which is a notable limitation.' },
    ],
  },
  embrace: {
    overview:
      'Embrace pairs accident-and-illness coverage with a diminishing deductible that drops $50 for every claim-free year, plus an optional Wellness Rewards budget for routine costs. It is frequently cited for customer service and for covering dental illness, not just dental accidents.',
    pros: [
      'Diminishing (vanishing) deductible rewards claim-free years',
      'Optional Wellness Rewards for routine and preventive care',
      'Covers dental illness, not only dental accidents',
      'Short 2-day accident waiting period',
    ],
    cons: [
      'Wellness is a separate budget, not insurance, with its own cap',
      'Upper age limit applies to new accident-and-illness enrollments',
      'Claims involving pre-existing conditions draw the usual complaints',
      'Premiums rise with age like the rest of the category',
    ],
    coverageDetails:
      'Covers accidents, illnesses, hereditary and congenital conditions, dental illness, and behavioral therapy. Exam fees for covered conditions are included. Wellness Rewards is an optional, non-insurance allowance for routine care.',
    claimsExperience:
      'Claims process in roughly 5 to 15 days. Detailed medical records help avoid delays, particularly where a condition could be flagged as pre-existing.',
    pricingConsiderations:
      'Mid-range premiums. The vanishing deductible improves value the longer you stay claim-free, which rewards owners of generally healthy pets.',
    customerExperience:
      'Often singled out for responsive customer service. The most common frustrations involve pre-existing condition determinations and rising renewal premiums.',
    bestFor: 'Owners who value customer service, dental illness coverage, and long-term deductible savings.',
    notIdealFor: 'Those enrolling an older pet above the accident-and-illness age cap.',
    alternatives: ['Pets Best', 'Spot', 'Healthy Paws'],
    faqs: [
      { q: 'How does the vanishing deductible work?', a: 'Your annual deductible drops $50 for each year you go without filing a claim.' },
      { q: 'Is wellness care insurance?', a: 'No. Wellness Rewards is an optional allowance for routine costs, separate from the insurance policy.' },
      { q: 'Does Embrace cover dental?', a: 'Yes, including dental illness, which some competitors exclude.' },
    ],
  },
  pumpkin: {
    overview:
      'Pumpkin keeps plan choices simple, with 90% reimbursement options and coverage for dental and behavioral conditions built in. An optional Preventive Essentials package covers some routine care. It can be competitive for senior dogs, though premiums sit toward the higher end.',
    pros: [
      'Straightforward 90% reimbursement options',
      'Dental and behavioral conditions covered in the base plan',
      'Covers exam fees for covered conditions',
      'No upper age limit for enrollment',
    ],
    cons: [
      'Premiums can run higher than several competitors',
      'Preventive Essentials is a separate package, not insurance',
      'No direct-to-vet payment',
      'Fewer deductible tiers than the most flexible insurers',
    ],
    coverageDetails:
      'Covers accidents, illnesses, hereditary conditions, dental disease, behavioral issues, and exam fees. The optional Preventive Essentials package refunds the cost of select routine services such as vaccines and a wellness exam.',
    claimsExperience:
      'Claims are filed through the app or portal after you pay the vet. Reviewers describe a clear process, with records again being the key to smooth approval.',
    pricingConsiderations:
      'Higher-than-average premiums in exchange for broad base coverage. For senior dogs and pets needing dental/behavioral coverage, the inclusive plan can offset the price.',
    customerExperience:
      'Generally positive on coverage breadth and the simplicity of the plan structure. Price is the most frequent point of criticism.',
    bestFor: 'Owners wanting broad built-in coverage, including dental and behavioral, for dogs and cats of any age.',
    notIdealFor: 'Shoppers focused mainly on the lowest possible premium.',
    alternatives: ['Spot', 'Fetch', 'Embrace'],
    faqs: [
      { q: 'Does Pumpkin cover dental?', a: 'Yes, dental illness is included in the base plan, not just dental accidents.' },
      { q: 'Is preventive care included?', a: 'It is an optional add-on (Preventive Essentials) that refunds select routine services.' },
      { q: 'Is there an age limit?', a: 'No upper age limit applies for enrollment.' },
    ],
  },
  'pets best': {
    overview:
      'Pets Best is known for affordability, a range of plan tiers, and optional direct payment to your vet. It offers accident-only and accident-and-illness plans, short accident waiting periods, and a 24/7 pet helpline. It is a common pick for budget-conscious owners of younger pets.',
    pros: [
      'Lower base premiums, especially for young, healthy pets',
      'Direct-to-vet payment available at participating clinics',
      'Multiple plan tiers and an affordable accident-only option',
      '24/7 vet helpline included',
    ],
    cons: [
      'Routine care requires a separate wellness add-on',
      'Exam fees are not covered on all plan tiers',
      'Pre-existing condition denials draw the usual criticism',
      'Premiums increase with age',
    ],
    coverageDetails:
      'Covers accidents, illnesses, hereditary and congenital conditions, and diagnostics, with optional wellness routine-care add-ons. Accident coverage starts after a short 3-day waiting period; illness coverage after 14 days.',
    claimsExperience:
      'Claims can be filed online, and direct vet pay is available at participating clinics. Processing is generally in the 5 to 15 day range depending on documentation.',
    pricingConsiderations:
      'One of the more affordable options here, particularly for younger pets. Choosing a higher deductible or lower reimbursement reduces the premium further.',
    customerExperience:
      'Reviewers like the price and plan flexibility. Complaints mirror the category: premium increases and disputes over pre-existing conditions.',
    bestFor: 'Budget-conscious owners and anyone wanting an affordable accident-only plan.',
    notIdealFor: 'Owners who want exam fees and wellness bundled into one simple plan.',
    alternatives: ['Embrace', 'ASPCA', 'Lemonade'],
    faqs: [
      { q: 'Is Pets Best cheaper than competitors?', a: 'It is frequently among the more affordable options, particularly for young, healthy pets.' },
      { q: 'Can it pay my vet directly?', a: 'Yes, direct vet pay is available at participating clinics.' },
      { q: 'Are exam fees covered?', a: 'Coverage of exam fees depends on the plan tier you choose.' },
    ],
  },
  fetch: {
    overview:
      'Fetch offers one of the more comprehensive base plans, bundling in features other insurers treat as extras, such as sick-visit exam fees, dental coverage, and even some boarding and trip-cancellation benefits. The breadth comes at a price: Fetch tends to be among the more expensive options.',
    pros: [
      'Comprehensive base coverage with fewer add-ons needed',
      'Covers sick-visit exam fees',
      'Up to $1,000 in dental coverage',
      'Includes extras like virtual vet visits',
    ],
    cons: [
      'Generally the most expensive of the providers compared here',
      'Higher deductible floors than some competitors',
      'No direct-to-vet payment',
      'Orthopedic and other conditions can trigger documentation disputes',
    ],
    coverageDetails:
      'Covers accidents, illnesses, hereditary and congenital conditions, dental, exam fees, behavioral therapy, and some travel/boarding benefits. Accident coverage can start quickly, while illness coverage follows a 15-day waiting period.',
    claimsExperience:
      'Claims are filed through the app or portal. Because coverage is broad, reviewers stress the importance of complete records to avoid a covered item being misclassified.',
    pricingConsiderations:
      'Premiums run high, reflecting the inclusive coverage. If you would otherwise buy multiple add-ons elsewhere, the all-in plan can be competitive on value even if the sticker price is higher.',
    customerExperience:
      'Valued for breadth of coverage and useful extras. Cost is the leading complaint, along with the documentation requirements common to comprehensive plans.',
    bestFor: 'Owners who want the most inclusive single plan and will use the extra benefits.',
    notIdealFor: 'Price-sensitive shoppers who only need core accident-and-illness coverage.',
    alternatives: ['Pumpkin', 'Spot', 'Figo'],
    faqs: [
      { q: 'What makes Fetch different?', a: 'Its base plan bundles items like exam fees, dental, and some travel benefits that others charge extra for.' },
      { q: 'Is Fetch expensive?', a: 'It is typically among the priciest options, in exchange for broad built-in coverage.' },
      { q: 'Does it cover dental?', a: 'Yes, up to a set dental limit (commonly around $1,000).' },
    ],
  },
  figo: {
    overview:
      'Figo is a tech-forward insurer offering accident-and-illness coverage with an unusual 100% reimbursement option and a well-reviewed app (the Pet Cloud). Plans are flexible across deductibles and limits. As with most app-first insurers, the trade-off is reliance on documentation and self-service.',
    pros: [
      'Offers a 100% reimbursement tier, which is rare',
      'Flexible deductibles and annual limits',
      'Well-regarded Pet Cloud app',
      'Covers hereditary and congenital conditions',
    ],
    cons: [
      'Some reviewers report orthopedic claims classified as illness rather than accident',
      'Fine print on items like vaccines/pre-existing conditions can be easy to misread',
      'Extensive vet records may be requested for claims',
      'No direct-to-vet payment',
    ],
    coverageDetails:
      'Covers accidents, illnesses, hereditary and congenital conditions, and diagnostics, with optional wellness and extra-care riders. A short accident waiting period applies, with a 14-day illness waiting period.',
    claimsExperience:
      'Claims are filed in-app. Reviewers note that thorough records matter, and that understanding how a condition is categorized (accident vs. illness) can affect the outcome.',
    pricingConsiderations:
      'Wide price range depending on the reimbursement tier and limits chosen. The 100% reimbursement option costs more but eliminates your co-insurance share on covered claims.',
    customerExperience:
      'Praised for the app and flexibility. The most common complaints involve claim categorization disputes and fine-print misunderstandings.',
    bestFor: 'App-savvy owners who want a 100% reimbursement option and flexible limits.',
    notIdealFor: 'Owners who prefer phone-based support and direct vet payment.',
    alternatives: ['Lemonade', 'Spot', 'Pets Best'],
    faqs: [
      { q: 'Does Figo really offer 100% reimbursement?', a: 'Yes, it is one of the few insurers with a 100% reimbursement tier, at a higher premium.' },
      { q: 'Why might an orthopedic claim be disputed?', a: 'Some reviewers report such conditions being treated as illnesses; reading the policy definitions helps set expectations.' },
      { q: 'Is there an app?', a: 'Yes, the Pet Cloud app is generally well reviewed for managing policies and claims.' },
    ],
  },
  lemonade: {
    overview:
      'Lemonade is an app-first insurer known for fast, AI-driven claims and low starting premiums, with discounts for bundling other Lemonade policies. The speed and price are real draws; the trade-off is a largely automated experience that some owners find frustrating when a claim needs human review.',
    pros: [
      'Fast, AI-assisted claims that can pay quickly',
      'Low starting premiums and bundle discounts',
      'Optional preventive care packages',
      'Modern, easy-to-use app',
    ],
    cons: [
      'Automated denials can be frustrating, especially for pre-existing conditions',
      'Reaching a human for appeals can be difficult',
      'Availability is limited in some states',
      'Less suited to those who prefer phone support',
    ],
    coverageDetails:
      'Covers accidents, illnesses, diagnostics, and hereditary conditions, with optional preventive and extra-coverage packages. Accident coverage can begin quickly, with a 14-day illness waiting period.',
    claimsExperience:
      'Simple claims are filed in-app and can be approved rapidly by the AI system. More complex claims route to human review, which is where reviewers report slower service and difficulty escalating appeals.',
    pricingConsiderations:
      'Among the lowest entry premiums, helped by bundle discounts. As always, the lowest quotes assume higher deductibles or lower reimbursement and rise as pets age.',
    customerExperience:
      'Frequently praised for claims speed and price, and frequently criticized for limited human support and automated pre-existing-condition denials.',
    bestFor: 'Tech-comfortable owners who want speed, low prices, and bundling discounts.',
    notIdealFor: 'Owners who want hands-on, phone-based support, or live where coverage is unavailable.',
    alternatives: ['Figo', 'Pets Best', 'Spot'],
    faqs: [
      { q: 'How fast are Lemonade claims?', a: 'Straightforward claims can be approved in minutes by its AI; complex ones take longer in human review.' },
      { q: 'Is Lemonade available everywhere?', a: 'No. Pet coverage is limited to certain states, so check availability for your area.' },
      { q: 'Can I get human support?', a: 'Yes, but some reviewers report it is harder to reach a person for appeals than with traditional insurers.' },
    ],
  },
  aspca: {
    overview:
      'The ASPCA Pet Health Insurance program (underwritten by a third party) offers accident-and-illness and accident-only plans that notably include exam fees in the base coverage, plus microchipping and behavioral coverage. It can be a strong value for senior pets, though annual limits are lower than some uncapped competitors.',
    pros: [
      'Exam fees included in the base plan',
      'Covers microchipping and behavioral issues',
      'Multi-pet discount available',
      'Accident-only option for tighter budgets',
    ],
    cons: [
      'Annual coverage limits are capped rather than unlimited',
      'No direct-to-vet payment',
      'Premiums rise with age as elsewhere',
      'Wellness/routine care requires a separate add-on',
    ],
    coverageDetails:
      'Covers accidents, illnesses, hereditary and congenital conditions, behavioral issues, microchipping, and exam fees. Optional preventive care add-ons cover routine services. A 14-day waiting period applies to coverage.',
    claimsExperience:
      'Claims are filed online or via app after you pay the vet. The inclusion of exam fees reduces out-of-pocket costs on each covered visit, which reviewers appreciate.',
    pricingConsiderations:
      'Competitive mid-range pricing, and the included exam fees can save $150–$400 a year versus plans that exclude them. The capped annual limit is the main trade-off to weigh.',
    customerExperience:
      'Generally positive on exam-fee coverage and value for senior pets. The most common criticisms are the capped limits and standard premium increases.',
    bestFor: 'Owners who want exam fees included and are insuring senior pets or multiple pets.',
    notIdealFor: 'Those who specifically want unlimited annual payouts.',
    alternatives: ['Pets Best', 'Embrace', 'Spot'],
    faqs: [
      { q: 'Does ASPCA cover exam fees?', a: 'Yes, exam fees are included in the base plan, which can save money on every covered visit.' },
      { q: 'Are payouts unlimited?', a: 'No. Annual limits are capped, unlike some competitors that offer unlimited coverage.' },
      { q: 'Is there a multi-pet discount?', a: 'Yes, a discount is available for insuring more than one pet.' },
    ],
  },
}

export function getProviderReview(name: string): ProviderReview | undefined {
  return providerReviews[name.trim().toLowerCase()]
}
