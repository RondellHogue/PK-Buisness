import { LegalLayout } from '@/components/legal-layout'

export const metadata = {
  title: 'Review Methodology | Pet Keepings',
  description:
    'How Pet Keepings evaluates and compares pet insurance providers, including the criteria used and how recommendations are formed.',
}

export default function MethodologyPage() {
  return (
    <LegalLayout title="Review Methodology" updated="June 1, 2026">
      <section>
        <p>
          This page explains how we evaluate pet insurance providers. The goal is a consistent process:
          every provider is judged against the same criteria, so differences in our write-ups reflect the
          plans themselves rather than how each company markets itself.
        </p>
      </section>

      <section>
        <h2>What we evaluate</h2>
        <p>For each provider, we look at the factors that most affect real-world value:</p>
        <ul>
          <li><strong>Coverage types.</strong> Accident-only, accident and illness, and optional wellness add-ons.</li>
          <li><strong>Waiting periods.</strong> How long before accident, illness, and orthopedic coverage begins.</li>
          <li><strong>Reimbursement levels.</strong> The percentage of eligible costs paid back, and whether it is adjustable.</li>
          <li><strong>Deductible options.</strong> Annual vs. per-condition deductibles and the range offered.</li>
          <li><strong>Annual limits.</strong> Whether payouts are capped and at what level.</li>
          <li><strong>Claims process.</strong> How claims are filed, typical turnaround, and direct-pay availability.</li>
          <li><strong>Mobile app.</strong> Whether a functional app exists for claims and policy management.</li>
          <li><strong>Exclusions.</strong> Common limitations such as pre-existing conditions and age restrictions.</li>
        </ul>
      </section>

      <section>
        <h2>Where our information comes from</h2>
        <ul>
          <li>Official provider websites, sample policies, and published rate information.</li>
          <li>
            Independent review platforms including Trustpilot, Consumer Affairs, and the Better Business
            Bureau, used to identify recurring customer themes.
          </li>
          <li>Public customer discussions, which we treat as anecdotal context rather than proof.</li>
        </ul>
        <p>
          We summarize patterns we can observe across multiple sources. We do not copy content from these
          sources, and we do not fabricate reviews or customer experiences.
        </p>
      </section>

      <section>
        <h2>How we form recommendations</h2>
        <p>
          We avoid declaring a single &quot;best&quot; provider, because the right plan depends on your pet&apos;s age,
          breed, health, and your budget. Instead, we match each provider&apos;s strengths to the situations it
          tends to suit, such as budget-focused shopping, comprehensive coverage, or enrolling an older
          pet, and we explain the reasoning so you can judge whether it applies to you.
        </p>
      </section>

      <section>
        <h2>What we deliberately do not do</h2>
        <ul>
          <li>We do not present any provider as perfect or free of drawbacks.</li>
          <li>We do not use star ratings or popularity claims we cannot substantiate.</li>
          <li>We do not let affiliate relationships influence rankings or assessments.</li>
        </ul>
      </section>

      <section>
        <h2>Keeping it current</h2>
        <p>
          Coverage and pricing change over time. We re-check provider details periodically and revise the
          content when terms change. Pricing shown anywhere on the site is an estimate; always confirm
          current details directly with the provider before purchasing.
        </p>
      </section>
    </LegalLayout>
  )
}
