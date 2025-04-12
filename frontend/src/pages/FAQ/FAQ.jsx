import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "What are the criteria to be a KOL?",
    answer: "Minimum 1,000 followers or/and PnL of $20K (30 days) or $10K (7 days). May vary by market—DM us for updates."
  },
  {
    question: "Can I give feedback on any KOL?",
    answer: "Yes, but only for KOLs you’ve Followed or engaged with. Do not post false feedback to harm reputations intentionally. "
  },
  {
    question: "Is there a paid version of KnowYourKOL?",
    answer: "No, it’s free—and we’re keeping it that way as long as the support keeps flowing."
  },
  {
    question: "Should I copy trade top KOLs?",
    answer: "We strongly recommend against blindly copy-trading KOLs. Study their moves and mix it with your own game plan."
  },
  {
    question: "I’m a KOL—how do I get a bad review taken down?",
    answer: "We typically don’t remove reviews, but if you believe one is a false acquisation and you have proof of that, please DM us with evidence."
  },
  {
    question: "Who is the \"King of KOLs\"",
    answer: <>The King of KOLs is the top-performing crypto influencer crowned periodically based on:
<br/>- Highest PnL (Highest weight).
<br/>- Best Follower Sentiment Score based on the community reviews and upvotes (Lower Weight).</>
  },
  {
    question: "What are \"Rising Stars\"",
    answer: <>Rising Stars are breakout KOLs gaining momentum rapidly. They’re also spotlighted periodically based on:
<br/> - High ROI ratio in a short duration (Return on Investment).
<br/>- Recent PnL spikes.</>
  }
];

function FAQ() {
  const [loading] = useState(true);
  // first, scroll to the top of the page only while loading for the first time, for no state change
  useEffect(() => {
    window.scrollTo(0, 0);
  }
  , [loading]);

  // change the titile of the page
  document.title = "FAQ - Know Your KOL";

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);  // Toggle the answer visibility
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.header}>Frequently Asked Questions</h1>
        <p className={styles.headerP}>Find answers to common questions about KnowYourKOL.</p>
        <p className={styles.headerP}>For further help, please DM us on our Twitter (X) page.</p>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div className={styles.question} onClick={() => toggleAnswer(index)}>
                {faq.question}
                <button className={styles.faqToggleBtn} onClick={() => toggleAnswer(index)}>
                  {/* {openIndex === index ? "Hide Answer" : <img src="/plus_sign.png" alt="Expand" />} */}
                  <img src="/plus_sign.png" alt="Expand" />
                </button>
              </div>
              {openIndex === index && <p className={styles.answer}>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FAQ;
