import "./TermsOfUse.css"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"

function TermsOfUse() {
  // first, scroll to the top of the page
  window.scrollTo(0, 0);

  // change the titile of the page
  document.title = "Terms of Use - Know Your KOL";
  
  return (
    <div id="touWrapper">
      <Navbar />

      <div className="container" id="touContainer">
        <div id="headerTOU">Terms of Use</div>
        <div id="touContent">
          <p>Thank you for joining the Know Your KOL community! By engaging with our website, you agree to abide by these Terms of Use. We encourage you to review them thoroughly before participating.</p>
<p className="emptyLine"></p>
          <p>1. Purpose and Usage</p>
          <p>Know Your KOL is a platform where users can share experiences, rate KOLs, provide feedback, and explore Daily, Weekly, and Monthly PnL trends. This site is designed as a community resource for insights and should not be relied upon for financial decisions or investment strategies.</p>
<p className="emptyLine"></p>
          <p>2. Your Commitment</p>
          <p>As a user, you are expected to:</p>
          <p>-Share genuine reviews and comments based on your own interactions with KOLs.</p>
          <p>-Respect local laws and regulations while using the platform.</p>
          <p>-Avoid employing automated tools or scripts to influence ratings or skew results.</p>
<p className="emptyLine"></p>
          <p>3. What’s Not Allowed</p>
          <p>To keep our community safe and fair, you must refrain from:</p>
          <p>-Unauthorized attempts to interfere with the site’s performance or security.</p>
          <p>-Engaging in deceptive practices, harassment, or illegal activities.</p>
          <p>-Misrepresenting yourself or others with false information.</p>
          <p>-Overloading the site with excessive data requests or scraping content.</p>
          <p>-Posting harmful content, including malware or offensive remarks.</p>
<p className="emptyLine"></p>
          <p>4. No Guarantees</p>
          <p>KOL information on Know Your KOL is compiled from publicly available community data and supplemented by our own verification efforts. While we aim to ensure accuracy and completeness to the best of our ability, there is a risk that some data may be inaccurate due to the nature of the sources. We cannot be held legally or otherwise responsible for any losses, issues, or misinformation arising from your use of the platform—proceed at your own discretion.</p>
<p className="emptyLine"></p>
          <p>5. Our Right to Evolve</p>
          <p>We may adjust, pause, or end any aspect of the site or these Terms of Use at our discretion, with or without prior notice. By continuing to use Know Your KOL, you accept these updates.</p>
<p className="emptyLine"></p>
          <p>6. Legal Framework</p>
          <p>These Terms are governed by the laws of the United States. Any disputes related to your use of Know Your KOL will fall under the jurisdiction of the relevant U.S. courts.</p>
<p className="emptyLine"></p>
          <p>7. Access Termination</p>
          <p>We retain the authority to revoke your access to Know Your KOL if you breach these Terms or for any other reason we deem necessary.</p>
<p className="emptyLine"></p>
          <p>9. Leaderboard Discretion</p>
          <p>We reserve the right to determine which KOLs are featured on the leaderboard at our sole discretion.</p>
<p className="emptyLine"></p>
          <p>10. Wallet Address Privacy</p>
          <p>Some KOLs may wish to appear on the leaderboard without displaying their wallet address. We will make reasonable efforts to conceal this information; however, we accept no responsibility for any unintended leaks or disclosures.</p>
<p className="emptyLine"></p>
          <p>11. Non-Refundable Donations</p>
          <p>Any payments or donations made to Know Your KOL are non-refundable, as they support the ongoing development and maintenance of the platform.</p>
<p className="emptyLine"></p>
          <p>8. Get in Touch</p>
          <p>Have questions about these Terms? We’d love to hear from you—please send us a DM at https://x.com/KnowYourKOL.</p>
<p className="emptyLine"></p>
          <p>Updated as of: Feb 15th, 2025</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TermsOfUse