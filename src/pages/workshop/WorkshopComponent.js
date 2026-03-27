import React, { Component } from "react";
import Header from "../../components/header/Header";
import PageHelmet from "../../components/pageHelmet/PageHelmet";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Workshop from "../../components/workshop/Workshop";
import { workshopData } from "../../portfolio.js";
import "./WorkshopComponent.css";

class WorkshopPage extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="workshop-main">
        <PageHelmet
          title="The Workshop"
          description="Explore skill domains across projects, powered by PROVE."
          path="/workshop"
        />
        <Header theme={theme} />
        <div className="basic-workshop">
          <Workshop config={workshopData} theme={theme} />
        </div>
        <Footer theme={theme} />
        <TopButton theme={theme} />
      </div>
    );
  }
}

export default WorkshopPage;
