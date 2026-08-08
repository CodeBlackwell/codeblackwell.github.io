import React, { Component } from "react";
import Header from "../../components/header/Header";
import PageHelmet from "../../components/pageHelmet/PageHelmet";
import Footer from "../../components/footer/Footer";
import ConsultingCard from "../../components/consultingCard/ConsultingCard";
import Button from "../../components/button/Button";
import TopButton from "../../components/topButton/TopButton";
import { Fade } from "react-reveal";
import { consulting, consultingHeader } from "../../portfolio.js";
import "./Consulting.css";
import ProjectsImg from "../projects/ProjectsImg";

class Consulting extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="consulting-main">
        <PageHelmet
          title="Consulting"
          description="Client engagements built end to end and running in production behind access control: defense acquisition strategy tooling and evidence-backed research institution matching."
          path="/consulting"
        />
        <Header theme={theme} />
        <div className="basic-consulting">
          <Fade bottom duration={2000} distance="40px">
            <div className="consulting-heading-div">
              <div className="consulting-heading-img-div">
                <ProjectsImg theme={theme} />
              </div>
              <div className="consulting-heading-text-div">
                <h1 className="consulting-heading-text" style={{ color: theme.text }}>
                  {consultingHeader.title}
                </h1>
                <p
                  className="consulting-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {consultingHeader.description}
                </p>
              </div>
            </div>
          </Fade>
        </div>

        <div className="consulting-cards-div-main">
          {consulting.data.map((engagement) => (
            <ConsultingCard key={engagement.id} engagement={engagement} theme={theme} />
          ))}
        </div>

        <Button
          text={"Request Access"}
          className="consulting-button"
          href="/contact"
          theme={theme}
        />

        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Consulting;
