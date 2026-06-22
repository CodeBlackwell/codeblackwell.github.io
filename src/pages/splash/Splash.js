import React, { Component } from "react";
import "./Splash.css";
import { Redirect } from "react-router-dom";
import LoaderLogo from "../../components/Loader/LoaderLogo.js";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper" onClick={props.onSkip}>
      <div className="screen" style={{ backgroundColor: props.theme.splashBg }}>
        <LoaderLogo id="logo" theme={props.theme} />
      </div>
    </div>
  );
}

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.skip = () => this.setState({ redirect: true });
  }

  componentDidMount() {
    this.id = setTimeout(this.skip, 2500);
    window.addEventListener("keydown", this.skip);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
    window.removeEventListener("keydown", this.skip);
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/home" />
    ) : (
      <AnimatedSplash theme={this.props.theme} onSkip={this.skip} />
    );
  }
}

export default Splash;
