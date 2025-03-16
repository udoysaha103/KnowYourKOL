import { useState } from "react";
import "./FAQ.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const faqs = [
  {
    question: "What are the criteria to be a KOL?",
    answer: "Minimum 3,000 followers and P&L of $50K (30 days) or $20K (7 days). May vary by market—DM us for updates."
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
];

function FAQ() {
  // first, scroll to the top of the page
  window.scrollTo(0, 0);

  // change the titile of the page
  document.title = "FAQ - Know Your KOL";

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);  // Toggle the answer visibility
  };

  return (
    <div className="FAQwrapper">
      <Navbar />
      <div className="container">
        <h1>Frequently Asked Questions</h1>
        <p className="headerP">Find answers to common questions about KnowYourKOL.</p>
        <p className="headerP">For further help, please DM us on our Twitter (X) page.</p>

        <div className="faqList">
          {faqs.map((faq, index) => (
            <div key={index} className="faqItem">
              <div className="faqQuestion" onClick={() => toggleAnswer(index)}>
                {faq.question}
                <button className="faqToggleBtn" onClick={() => toggleAnswer(index)}>
                  {/* {openIndex === index ? "Hide Answer" : <img src="/plus_sign.png" alt="Expand" />} */}
                  <img src="/plus_sign.png" alt="Expand" />
                </button>
              </div>
              {openIndex === index && <p className="faqAnswer">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FAQ;
