import "./PrivacyPolicies.css"
import Navbar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"

function PrivacyPolicies() {
  // first, scroll to the top of the page
  window.scrollTo(0, 0);
  
  return (
    <div id="touWrapper">
      <Navbar />

      <div className="container" id="touContainer">
        <div id="headerTOU">Privacy Policy</div>
        <div id="touContent">
          <p>At Know Your KOL, we value your privacy and are dedicated to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website and use our services.</p>
<p className="emptyLine"></p>
          <p>1. Information We Collect</p>
          <p>We collect limited, anonymous information to enhance your experience and improve our services:</p>
          <p>Usage Data: Anonymous analytics (e.g., page views or interactions) to optimize site functionality, without identifying individuals.</p>
<p className="emptyLine"></p>
          <p>2. How We Use Your Information</p>
          <p>The data we collect is used to:</p>
          <p>Analyze usage patterns to enhance features like KOL reviews, upvoting/downvoting, commenting, and P&L tracking.</p>
          <p>Improve the overall performance and user experience of our platform.</p>
<p className="emptyLine"></p>
          <p>3. User Rights</p>
          <p>Users can request the removal of their own reviews at any time.</p>
          <p>KOLs can request the removal of their personal information, such as real Name, Wallet Address or Location, at any time.</p>
          <p>To submit a request, please DM us at https://x.com/KnowYourKOL.</p>
<p className="emptyLine"></p>
          <p>4. Data Storage and Security</p>
          <p>Your data is stored securely with robust measures to prevent unauthorized access. This includes protecting anonymous usage data. We regularly review our security practices to ensure your information remains safe.</p>
<p className="emptyLine"></p>
          <p>5. Cookies</p>
          <p>We may use cookies to support sign-in functionality, maintain your session, and enhance your experience. These cookies do not track personal data beyond what is necessary for account management.</p>
<p className="emptyLine"></p>
          <p>6. Third-Party Services</p>
          <p>Know Your KOL utilizes third party APIs to receive data but does not share your data with third parties, except as required by law or to support essential services (e.g., website hosting or analytics providers).</p>
<p className="emptyLine"></p>
          <p>7. Changes to This Privacy Policy</p>
          <p>We may update this Privacy Policy periodically. Any changes will be reflected here with an updated "Last Updated" date.</p>
<p className="emptyLine"></p>
          <p>8. Contact Us</p>
          <p>For questions about this Privacy Policy or how we handle your data, please DM us at https://x.com/KnowYourKOL.</p>
<p className="emptyLine"></p>
          <p>Updated as of: Feb 15th, 2025</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PrivacyPolicies