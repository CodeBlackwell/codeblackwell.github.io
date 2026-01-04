import React from "react";
import "./LoaderLogo.css";

class LogoLoader extends React.Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="logo-container">
        <div className="logo-name" style={{ color: theme.body }}>
          <span className="logo-first">LeChristopher</span>
          <span className="logo-last">Blackwell</span>
        </div>
        <div className="logo-tagline" style={{ color: theme.secondaryText }}>
          Full-Stack Engineer & AI Specialist
        </div>
        <div className="logo-loader">
          <div className="loader-bar" style={{ backgroundColor: theme.body }}></div>
        </div>
      </div>
    );
  }
}

export default LogoLoader;
