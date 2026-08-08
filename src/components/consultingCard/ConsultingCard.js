import React from "react";
import "./ConsultingCard.css";
import { Fade } from "react-reveal";

export default function ConsultingCard({ engagement, theme }) {
  return (
    <div className="consulting-card-div" style={{ backgroundColor: theme.highlight }}>
      <Fade bottom duration={2000} distance="40px">
        <a
          className="consulting-card-link"
          href={engagement.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="consulting-lock-row">
            <span
              className="consulting-lock-badge"
              style={{ color: theme.body, backgroundColor: theme.text }}
            >
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 5a3 3 0 1 1 6 0v3H9V6z" />
              </svg>
              {engagement.access}
            </span>
            <span className="consulting-period" style={{ color: theme.secondaryText }}>
              {engagement.period}
            </span>
          </div>

          <p className="consulting-name" style={{ color: theme.text }}>
            {engagement.name}
          </p>
          <p className="consulting-client" style={{ color: theme.secondaryText }}>
            {engagement.client}
          </p>
          <p className="consulting-description" style={{ color: theme.text }}>
            {engagement.description}
          </p>

          <div className="consulting-stack">
            {engagement.stack.map((tech) => (
              <span
                key={tech}
                className="consulting-chip"
                style={{ color: theme.text, borderColor: theme.secondaryText }}
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="consulting-cta" style={{ color: theme.imageHighlight }}>
            Open the live system &#8599;
          </p>
        </a>
      </Fade>
    </div>
  );
}
