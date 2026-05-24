import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

const FAQS = [
  {
    q: "Is this calculator officially affiliated with Sukkur IBA University?",
    a: "No. This is an independent student project. It uses IBA's official grading policy for calculations but is not officially endorsed or affiliated with the university. Always verify results with your official ERP portal."
  },
  {
    q: "How accurate are the results?",
    a: "Very accurate for standard theory courses — as long as you enter the correct marks and credit hours. The grading table used is Sukkur IBA's official policy. Minor differences may occur for courses with special grading rules set by individual departments."
  },
  {
    q: "What is a Non-Credit course?",
    a: "A non-credit course is one that does not count toward your GPA or CGPA. Examples include some language courses or workshops. Toggle the 'Non-Credit' checkbox for such courses and they will be automatically excluded from your GPA calculation."
  },
  {
    q: "Can I enter decimal marks like 76.5 or 82.25?",
    a: "Yes. The calculator accepts decimal marks and rounds them using standard rounding rules — 76.5 becomes 77, 82.25 stays 82, and so on."
  },
  {
    q: "What is the difference between GPA and CGPA?",
    a: "GPA (Grade Point Average) is calculated for a single semester. CGPA (Cumulative GPA) is calculated across all semesters combined, weighted by credit hours."
  },
  {
    q: "How do I calculate CGPA?",
    a: "Go to the CGPA Calculator page. Enter each semester's GPA and total credit hours. The calculator computes: CGPA = Σ(Semester GPA × Credit Hours) ÷ Σ(Total Credit Hours)."
  },
  {
    q: "Can I export my result?",
    a: "Yes. After calculating, click the 'Export PDF' button on the results page to download a PDF report of your GPA or CGPA."
  },
  {
    q: "Is my data stored anywhere?",
    a: "No. All calculations happen directly in your browser. No data is sent to any server or stored anywhere. Your privacy is completely protected."
  },
  {
    q: "What is the minimum GPA to avoid academic probation?",
    a: "Based on Sukkur IBA policy, a GPA below 2.00 places a student on academic probation. A GPA of 2.00–2.49 is a Warning, 2.50–2.99 is Satisfactory, 3.00–3.49 is Good Standing, and 3.50+ earns Dean's List."
  },
  {
    q: "Does this work on mobile phones?",
    a: "Yes. The calculator is fully responsive and works on all screen sizes — mobile, tablet, and desktop."
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: "1.5px solid var(--border)", borderRadius: "var(--radius)",
      overflow: "hidden", marginBottom: 10,
      boxShadow: open ? "var(--shadow)" : "none",
      transition: "box-shadow 0.15s"
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", textAlign: "left", padding: "14px 18px",
        background: open ? "var(--primary-light)" : "var(--surface)",
        border: "none", cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 12, transition: "background 0.15s"
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: open ? "var(--primary)" : "var(--text)", lineHeight: 1.4 }}>
          {item.q}
        </span>
        <span style={{
          fontSize: 18, color: "var(--primary)", flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s", fontWeight: 300
        }}>+</span>
      </button>
      {open && (
        <div style={{ padding: "14px 18px", background: "var(--surface2)", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <PageWrapper>
    <div className="container section">
      <div style={{ marginBottom: 28 }}>
        <h1 className="section-title" style={{ fontSize: 24 }}>❓ Frequently Asked Questions</h1>
        <p className="section-sub">Everything you need to know about the GPA Calculator</p>
      </div>
      {FAQS.map((item, i) => <FAQItem key={i} item={item} />)}
      <div style={{
        marginTop: 24, background: "var(--primary-light)",
        border: "1.5px solid var(--primary)", borderRadius: "var(--radius)",
        padding: "16px 20px", textAlign: "center"
      }}>
        <p style={{ fontSize: 14, color: "var(--primary)", margin: 0 }}>
          Still have a question? Contact the developer or ask in your student group.
        </p>
      </div>
    </div>
    </PageWrapper>
  );
}