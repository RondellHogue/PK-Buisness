import { LegalLayout } from '@/components/legal-layout'

export const metadata = {
  title: 'How We Make Money | Pet Keepings',
  description:
    'A transparent explanation of how Pet Keepings earns revenue and how we keep funding separate from our editorial judgment.',
}

export default function HowWeMakeMoneyPage() {
  return (
    <LegalLayout title="How We Make Money" updated="June 1, 2026">
      <section>
        <p>
          Running a research site has costs, so it is fair for you to ask how we pay for it and whether
          that money shapes what we publish. Here is the honest answer.
        </p>
      </section>

      <section>
        <h2>Our revenue comes from affiliate commissions</h2>
        <p>
          When you click certain links to a provider and go on to buy a policy, that provider may pay us a
          referral commission. This is our primary source of revenue. You pay the same price either way,
          and you are never charged for using Pet Keepings.
        </p>
      </section>

      <section>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not sell your personal information.</li>
          <li>We do not accept payment to rank a provider higher or to hide its drawbacks.</li>
          <li>We do not publish &quot;sponsored&quot; reviews disguised as independent ones.</li>
          <li>We do not let a commission rate decide which providers we cover or how we describe them.</li>
        </ul>
      </section>

      <section>
        <h2>How we keep funding separate from judgment</h2>
        <p>
          The criteria we use to evaluate providers are fixed and applied equally, as described in our{' '}
          <a href="/methodology"><strong>Review Methodology</strong></a>. Whether a provider has an
          affiliate relationship with us is not part of those criteria. A provider can rate well or poorly
          in our comparisons regardless of how much, or whether, it pays us.
        </p>
      </section>

      <section>
        <h2>Why we are upfront about this</h2>
        <p>
          Plenty of comparison sites earn money the same way without saying so clearly. We would rather
          state it plainly, because a recommendation is only useful if you understand the incentives
          behind it. If our transparency costs us a click, that is a trade we are willing to make.
        </p>
      </section>

      <section>
        <h2>Questions</h2>
        <p>
          If anything here is unclear, or you want to know whether a specific link is an affiliate link,
          email us at <strong>help@pkservice.com</strong>. Related reading:{' '}
          <a href="/affiliate-disclosure"><strong>Affiliate Disclosure</strong></a> and{' '}
          <a href="/editorial-standards"><strong>Editorial Standards</strong></a>.
        </p>
      </section>
    </LegalLayout>
  )
}
