import { useEffect, useState } from "react";

export default function PageWrapper({ children }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 10); return () => clearTimeout(t); }, []);
  return (
    <div className={visible ? "page-enter-active" : "page-enter"}
      style={{ minHeight: "60vh" }}>
      {children}
    </div>
  );
}