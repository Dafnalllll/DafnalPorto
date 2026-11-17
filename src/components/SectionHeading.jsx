import { createElement } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subheading,
  description,
  meta,
  align = "left",
  size = "section",
  as: Heading = "h2",
  className = "",
}) {
  return (
    <header
      className={`section-heading section-heading--${align} section-heading--${size} ${className}`}
    >
      <div className="section-heading__top">
        <span className="section-heading__eyebrow">
          <span className="section-heading__marker" aria-hidden="true" />
          {eyebrow}
        </span>
        {meta && <span className="section-heading__meta">{meta}</span>}
      </div>
      {createElement(Heading, { className: "section-heading__title" }, title)}
      {subheading && (
        <p className="section-heading__subheading">{subheading}</p>
      )}
      {description && (
        <p className="section-heading__description">{description}</p>
      )}
    </header>
  );
}
