import { LegalLayout } from '@/components/legal-layout'

export const metadata = {
  title: 'Affiliate Disclosure | Pet Keepings',
  description:
    'How Pet Keepings uses affiliate links and what that means for the comparisons and recommendations on the site.',
}

export default function AffiliateDisclosurePage() {
  return (
    <LegalLayout title="Affiliate Disclosure" updated="June 1, 2026">
      <section>
        <p>
          We want to be direct about how this site is funded, because it affects how you should read our
          recommendations. This page explains our use of affiliate links in plain terms.
        </p>
      </section>

      <section>
        <h2>What an affiliate link is</h2>
        <p>
          Some links on Pet Keepings are affiliate links. If you click one and later purchase a policy,
          the provider may pay us a commission. There is no extra cost to you, and the price you pay is
          the same whether or not you use our link.
        </p>
      </section>

      <section>
        <h2>What this does not change</h2>
        <ul>
          <li>It does not change our assessment of a provider&apos;s strengths or weaknesses.</li>
          <li>It does not change the criteria we apply, which are the same for every provider.</li>
          <li>It does not buy a better position. Commissions do not determine listing order.</li>
          <li>It does not make a provider appear without earning its place through the same review process.</li>
        </ul>
      </section>

      <section>
        <h2>Why we use affiliate links</h2>
        <p>
          Affiliate commissions keep Pet Keepings free to use and free of paywalls. We think this is a
          reasonable model as long as it is disclosed and kept separate from editorial judgment, which is
          the commitment we describe in our{' '}
          <a href="/editorial-standards"><strong>Editorial Standards</strong></a> and{' '}
          <a href="/methodology"><strong>Review Methodology</strong></a>.
        </p>
      </section>

      <section>
        <h2>Not all links earn a commission</h2>
        <p>
          We link to providers, public review platforms, and reference material regardless of whether a
          commercial relationship exists. The presence or absence of an affiliate arrangement is not a
          signal of quality.
        </p>
      </section>

      <section>
        <h2>A note on accuracy</h2>
        <p>
          We are not the insurer and do not control the policies, pricing, or claims decisions of the
          providers we describe. Always review the provider&apos;s current terms directly before buying. If
          you have questions about this disclosure, contact us at <strong>help@pkservice.com</strong>.
        </p>
      </section>
    </LegalLayout>
  )
}
