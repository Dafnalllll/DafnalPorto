import { useEffect, useState } from "react";
import { translations } from "../data/translations";

export default function Loader({ isExiting = false }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("dafa_portfolio_lang") || "id"
  );
  const t = translations[lang]?.loader || translations.id.loader;

  useEffect(() => {
    function handleLanguageChange() {
      setLang(localStorage.getItem("dafa_portfolio_lang") || "id");
    }

    window.addEventListener("languagechange", handleLanguageChange);
    return () => window.removeEventListener("languagechange", handleLanguageChange);
  }, []);

  return (
    <div
      className={`page-loader fixed inset-0 z-50 flex items-center justify-center select-none ${
        isExiting ? "page-loader--exiting" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={t.aria}
    >
      <div className="page-loader__content flex flex-col items-center">
        <div className="page-loader__stage" aria-hidden="true">
          <span className="page-loader__orbit page-loader__orbit--outer" />
          <span className="page-loader__orbit page-loader__orbit--inner" />
          <span className="page-loader__energy page-loader__energy--vertical" />
          <span className="page-loader__energy page-loader__energy--horizontal" />
          <span className="page-loader__spark page-loader__spark--one" />
          <span className="page-loader__spark page-loader__spark--two" />
          <span className="page-loader__spark page-loader__spark--three" />
          <div className="page-loader__core">
            <span className="page-loader__core-flare" />
            <img src="/dafnal.webp" alt="" className="page-loader__logo" />
          </div>
        </div>
        <div className="page-loader__caption">
          <span className="page-loader__eyebrow">{t.eyebrow}</span>
          <span className="page-loader__status">
            {t.status}
            <span className="page-loader__ellipsis" aria-hidden="true">...</span>
          </span>
          <span className="page-loader__track"><span /></span>
        </div>
      </div>
    </div>
  );
}
