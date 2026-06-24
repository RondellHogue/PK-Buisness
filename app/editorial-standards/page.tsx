import { LegalLayout } from '@/components/legal-layout'

export const metadata = {
  title: 'Editorial Standards | Pet Keepings',
  description:
    'The standards that guide how Pet Keepings researches, writes, and updates its pet insurance comparisons and reviews.',
}

export default function EditorialStandardsPage() {
  return (
    <LegalLayout title="Editorial Standards" updated="June 1, 2026">
      <section>
        <p>
          These standards describe how we research, write, and maintain the content on Pet Keepings.
          They exist so you can judge our work by a stated set of rules rather than taking our
          conclusions on faith.
        </p>
      </section>

      <section>
        <h2>Our purpose</h2>
        <p>
          We publish comparisons and explainers to help pet owners understand pet insurance and decide
          whether a policy fits their situation. We are not an insurer, an agent, or a broker, and we do
          not sell policies. Our role is to organize publicly available information and explain it
          clearly.
        </p>
      </section>

      <section>
        <h2>How we research</h2>
        <ul>
          <li>
            We rely on primary sources first, including each provider&apos;s own policy documents, sample
            contracts, and published pricing where available.
          </li>
          <li>
            We review patterns across public, independent sources such as Trustpilot, Consumer Affairs,
            and the Better Business Bureau, looking for recurring themes rather than isolated reviews.
          </li>
          <li>
            We note when information is an estimate, when it varies by pet or location, and when a detail
            could not be independently confirmed.
          </li>
        </ul>
      </section>

      <section>
        <h2>How we write</h2>
        <ul>
          <li>We describe both advantages and drawbacks for every provider. No provider is presented as flawless.</li>
          <li>
            We avoid promotional language such as &quot;best-in-class&quot; or &quot;top-rated&quot; unless a specific,
            verifiable source supports it.
          </li>
          <li>
            We prefer concrete observations over adjectives. Instead of &quot;great claims service,&quot; we
            describe what reviewers actually report, including complaints.
          </li>
          <li>We do not invent customer stories, quotes, or statistics.</li>
        </ul>
      </section>

      <section>
        <h2>Accuracy and corrections</h2>
        <p>
          Insurance terms change. We review provider information on a recurring basis and update it when
          we become aware of changes. If you spot something inaccurate or out of date, email us at{' '}
          <strong>help@pkservice.com</strong> and we will review it. When we make a meaningful correction,
          we update the &quot;Last updated&quot; date on the relevant page.
        </p>
      </section>

      <section>
        <h2>Independence from advertising</h2>
        <p>
          Pet Keepings earns money through affiliate links, explained on our How We Make Money and
          Affiliate Disclosure pages. Commercial relationships never determine our assessments, our
          comparison criteria, or the order in which providers are listed. Content decisions are kept
          separate from monetization.
        </p>
      </section>
    </LegalLayout>
  )
}
