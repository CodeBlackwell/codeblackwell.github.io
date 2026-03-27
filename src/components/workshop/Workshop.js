import React, { useState, useEffect } from "react";
import "./Workshop.css";

function buildCategoryMap(repos, palette) {
  const names = [...new Set(repos.flatMap((r) => r.domains.map((d) => d.domain)))].sort();
  return Object.fromEntries(names.map((name, i) => [name, palette[i % palette.length]]));
}

function Ring({ project, categoryMap }) {
  const total = project.domains.reduce((s, d) => s + d.snippets, 0);
  const circumference = Math.PI * 34;
  let offset = 0;

  return (
    <div className="workshop-ring">
      <svg viewBox="0 0 36 36" className="workshop-ring-svg">
        <circle cx="18" cy="18" r="17" fill="none" stroke="var(--ws-border)" strokeWidth="2" />
        {project.domains.map((d) => {
          const pct = (d.snippets / total) * 100;
          const dashArray = `${(pct / 100) * circumference} ${circumference}`;
          const dashOffset = -offset;
          offset += (pct / 100) * circumference;
          return (
            <circle
              key={d.domain}
              cx="18"
              cy="18"
              r="17"
              fill="none"
              stroke={categoryMap[d.domain]}
              strokeWidth="2"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>
      <span className="workshop-ring-label">{project.display_name || project.name}</span>
    </div>
  );
}

function Header({ title, theme }) {
  return (
    <div className="workshop-header">
      <h2 className="workshop-title" style={{ color: theme.text }}>
        {title}
      </h2>
    </div>
  );
}

function Stage({ repos, categoryMap }) {
  return (
    <div className="workshop-stage">
      {repos.map((project) => (
        <Ring key={project.name} project={project} categoryMap={categoryMap} />
      ))}
    </div>
  );
}

function Legend({ categoryMap }) {
  return (
    <div className="workshop-legend">
      {Object.entries(categoryMap).map(([name, color]) => (
        <span key={name} className="workshop-legend-item">
          <span className="workshop-legend-dot" style={{ backgroundColor: color }} />
          {name}
        </span>
      ))}
    </div>
  );
}

function Hint({ text }) {
  return <p className="workshop-hint">{text}</p>;
}

export default function Workshop({ theme, config }) {
  const [repos, setRepos] = useState(null);

  useEffect(() => {
    fetch(config.apiUrl)
      .then((r) => r.json())
      .then(setRepos)
      .catch(() => setRepos(null));
  }, [config.apiUrl]);

  const isGlass = Boolean(theme.glass);
  const style = {
    "--ws-gap": "1rem",
    "--ws-padding": "2rem",
    "--ws-radius": "12px",
    "--ws-bg": isGlass ? theme.glass.background : theme.body,
    "--ws-text": theme.text,
    "--ws-muted": theme.secondaryText,
    "--ws-accent": theme.imageHighlight,
    "--ws-border": isGlass ? "rgba(255,255,255,0.1)" : theme.compImgHighlight,
    "--ws-ring-size": "120px",
  };

  if (!repos) {
    return (
      <div className="workshop" style={style}>
        <p style={{ color: theme.secondaryText }}>Loading...</p>
      </div>
    );
  }

  const categoryMap = buildCategoryMap(repos, config.palette);

  return (
    <div className={`workshop${isGlass ? " workshop-glass" : ""}`} style={style}>
      <Header title={config.title} theme={theme} />
      <Stage repos={repos} categoryMap={categoryMap} />
      <Legend categoryMap={categoryMap} />
      <Hint text={config.hint} />
    </div>
  );
}
