import { LegalLayout } from '@/components/legal-layout'

export const metadata = {
  title: 'Terms of Service | Pet Keepings',
  description: 'The terms and conditions governing your use of Pet Keepings.',
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="June 1, 2026">
      <section>
        <p>
          Welcome to Pet Keepings. These Terms of Service (&quot;Terms&quot;) govern your access to and use of
          our website and services. By accessing or using Pet Keepings, you agree to be bound by these
          Terms. If you do not agree, please do not use our services.
        </p>
      </section>

      <section>
        <h2>1. About Our Service</h2>
        <p>
          Pet Keepings is an educational and comparison platform focused on pet insurance. We provide
          information, comparisons, and tools to help pet owners make informed decisions. We are not an
          insurance company, broker, or agent, and we do not sell, underwrite, or issue insurance
          policies.
        </p>
      </section>

      <section>
        <h2>2. Not Financial or Professional Advice</h2>
        <p>
          The content on Pet Keepings is provided for general informational purposes only and should
          not be relied upon as financial, legal, veterinary, or insurance advice. Coverage details,
          pricing, and availability vary by provider and may change at any time. Always review the
          official terms of any policy directly with the insurer before purchasing.
        </p>
      </section>

      <section>
        <h2>3. Eligibility</h2>
        <p>
          You must be at least 18 years old and able to form a legally binding contract to use our
          services. By using Pet Keepings, you represent and warrant that you meet these requirements.
        </p>
      </section>

      <section>
        <h2>4. Acceptable Use</h2>
        <p>When using our services, you agree not to:</p>
        <ul>
          <li>Use the site for any unlawful or fraudulent purpose;</li>
          <li>Post content that is harmful, abusive, defamatory, or infringing;</li>
          <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts;</li>
          <li>Interfere with or disrupt the integrity or performance of the website;</li>
          <li>Use automated means to scrape or harvest data without our permission.</li>
        </ul>
      </section>

      <section>
        <h2>5. User Submissions</h2>
        <p>
          If you submit content to our community areas, you grant us a non-exclusive, royalty-free
          license to display and distribute that content in connection with our services. You are
          responsible for the content you submit and represent that you have the right to share it. We
          reserve the right to review, moderate, or remove any submission at our discretion.
        </p>
      </section>

      <section>
        <h2>6. Intellectual Property</h2>
        <p>
          All content on Pet Keepings, including text, graphics, logos, and software, is owned by or
          licensed to us and is protected by intellectual property laws. You may not reproduce,
          distribute, or create derivative works from our content without our prior written consent.
        </p>
      </section>

      <section>
        <h2>7. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites, including those of insurance
          providers. We are not responsible for the content, policies, or practices of any third-party
          site. Accessing those sites is at your own risk and subject to their own terms.
        </p>
      </section>

      <section>
        <h2>8. Disclaimer of Warranties</h2>
        <p>
          Our services are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any
          kind, whether express or implied. We do not warrant that the service will be uninterrupted,
          error-free, or that the information provided is accurate, complete, or current.
        </p>
      </section>

      <section>
        <h2>9. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Pet Keepings and its affiliates will not be liable
          for any indirect, incidental, special, or consequential damages arising out of or related to
          your use of the service, even if we have been advised of the possibility of such damages.
        </p>
      </section>

      <section>
        <h2>10. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of our services after changes take
          effect constitutes your acceptance of the revised Terms. We will update the &quot;Last updated&quot;
          date above whenever changes are made.
        </p>
      </section>

      <section>
        <h2>11. Contact Us</h2>
        <p>
          If you have questions about these Terms, please contact us at{' '}
          <strong>help@pkservice.com</strong>.
        </p>
      </section>
    </LegalLayout>
  )
}
