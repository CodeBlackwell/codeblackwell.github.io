import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import PassionCard from "../../components/passionCard/PassionCard";
import { Fade } from "react-reveal";
import "./BeyondComponent.css";
import { beyondPageData } from "../../portfolio.js";

class Beyond extends Component {
  state = {
    activePassionId: null,
  };

  handlePassionHover = (passionId) => {
    this.setState({ activePassionId: passionId });
  };

  render() {
    const theme = this.props.theme;
    const { activePassionId } = this.state;
    return (
      <div className="beyond-main">
        <Header theme={theme} />
        <div className="basic-beyond">
          <Fade bottom duration={2000} distance="40px">
            <div className="beyond-heading-div">
              <div className="beyond-heading-text-div">
                <h1 className="beyond-heading-text" style={{ color: theme.text }}>
                  {beyondPageData.title}
                </h1>
                <h3 className="beyond-heading-sub-text" style={{ color: theme.secondaryText }}>
                  {beyondPageData.subtitle}
                </h3>
                <p
                  className="beyond-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {beyondPageData.description}
                </p>
              </div>
            </div>
          </Fade>
          <div className="passions-cards-div">
            {beyondPageData.passions.map((passion) => (
              <PassionCard
                key={passion.id}
                passion={passion}
                theme={theme}
                isActive={activePassionId === passion.id}
                onHover={this.handlePassionHover}
              />
            ))}
          </div>
        </div>
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Beyond;
