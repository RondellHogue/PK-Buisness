import { LegalLayout } from '@/components/legal-layout'

export const metadata = {
  title: 'Privacy Policy | Pet Keepings',
  description: 'How Pet Keepings collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 1, 2026">
      <section>
        <p>
          Pet Keepings (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to
          protecting the personal information you share with us. This Privacy Policy explains what
          information we collect, how we use it, and the choices you have. By using our website and
          services, you agree to the practices described below.
        </p>
      </section>

      <section>
        <h2>1. Information We Collect</h2>
        <p>We collect information in a few different ways:</p>
        <ul>
          <li>
            <strong>Information you provide.</strong> When you contact us, fill out a quote form, or
            post to our community, you may give us your name, email address, and details about your
            pets such as species, breed, and age.
          </li>
          <li>
            <strong>Automatically collected information.</strong> Like most websites, we collect
            limited technical data such as your browser type, device information, and pages visited
            to help us improve the experience.
          </li>
          <li>
            <strong>Cookies.</strong> We use cookies and similar technologies to remember your
            preferences and understand how our site is used. You can disable cookies in your browser
            settings.
          </li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide and improve our comparison tools and educational content;</li>
          <li>Respond to your questions and support requests;</li>
          <li>Personalize the providers and plans we show you;</li>
          <li>Maintain the security and integrity of our website;</li>
          <li>Comply with applicable legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Share Information</h2>
        <p>
          We do not sell your personal information. We do not rent or trade it to third parties for
          their marketing purposes. We may share limited information only in the following
          circumstances:
        </p>
        <ul>
          <li>
            With trusted service providers who help us operate our website, under strict
            confidentiality agreements;
          </li>
          <li>When required by law, regulation, or valid legal process;</li>
          <li>To protect the rights, property, or safety of Pet Keepings, our users, or the public.</li>
        </ul>
      </section>

      <section>
        <h2>4. Data Retention</h2>
        <p>
          We keep your personal information only as long as necessary to fulfill the purposes
          described in this policy, unless a longer retention period is required by law. When data is
          no longer needed, we take reasonable steps to delete or anonymize it.
        </p>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We implement reasonable administrative, technical, and physical safeguards designed to
          protect your information from unauthorized access, disclosure, or loss. However, no method
          of transmission over the internet is completely secure, and we cannot guarantee absolute
          security.
        </p>
      </section>

      <section>
        <h2>6. Your Rights and Choices</h2>
        <p>
          Depending on where you live, you may have the right to access, correct, or delete the
          personal information we hold about you, or to object to certain processing. To exercise
          these rights, contact us using the details below and we will respond within a reasonable
          timeframe.
        </p>
      </section>

      <section>
        <h2>7. Children&apos;s Privacy</h2>
        <p>
          Our services are not directed to individuals under the age of 16, and we do not knowingly
          collect personal information from children. If you believe a child has provided us with
          personal information, please contact us so we can remove it.
        </p>
      </section>

      <section>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last
          updated&quot; date at the top of this page. We encourage you to review this policy periodically.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or our data practices, please reach out
          to us at <strong>help@pkservice.com</strong>.
        </p>
      </section>
    </LegalLayout>
  )
}
