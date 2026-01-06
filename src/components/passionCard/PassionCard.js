import React, { Component } from "react";
import "./PassionCard.css";
import { Fade } from "react-reveal";

class PassionCard extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.processEmbeds();
  }

  componentDidUpdate(prevProps) {
    const { passion, isActive } = this.props;
    const prevPassion = prevProps.passion;

    if (
      passion.instagram_url !== prevPassion.instagram_url ||
      passion.tiktok_url !== prevPassion.tiktok_url
    ) {
      this.processEmbeds();
    }

    // Handle video play/pause based on isActive
    if (isActive !== prevProps.isActive && this.videoRef.current) {
      if (isActive) {
        this.videoRef.current.play();
      } else {
        this.videoRef.current.pause();
      }
    }
  }

  handleMouseEnter = () => {
    const { passion, onHover } = this.props;
    if (onHover) {
      onHover(passion.id);
    }
  };

  handleMouseLeave = () => {
    const { onHover } = this.props;
    if (onHover) {
      onHover(null);
    }
  };

  processEmbeds() {
    const { passion } = this.props;

    // Process Instagram embeds
    if (passion.instagram_url && window.instgrm) {
      window.instgrm.Embeds.process();
    }

    // Process TikTok embeds
    if (passion.tiktok_url && window.tiktokEmbed) {
      window.tiktokEmbed.lib.render();
    }
  }

  extractInstagramId(url) {
    const match = url.match(/instagram\.com\/(p|reel)\/([A-Za-z0-9_-]+)/);
    return match ? match[2] : null;
  }

  extractTikTokId(url) {
    // Matches: tiktok.com/@user/video/123456 or vm.tiktok.com/123456
    const match =
      url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/) || url.match(/vm\.tiktok\.com\/(\w+)/);
    return match ? match[1] : null;
  }

  renderMedia() {
    const { passion } = this.props;

    // Priority: Video > TikTok > Instagram > Image
    if (passion.video_path) {
      return (
        <div
          className="passion-card-header passion-card-video"
          style={{ borderTopColor: passion.color_code }}
        >
          <video ref={this.videoRef} className="passion-card-image" loop muted playsInline>
            <source src={process.env.PUBLIC_URL + "/" + passion.video_path} type="video/mp4" />
          </video>
          <div
            className="passion-card-overlay"
            style={{
              background: `linear-gradient(180deg, transparent 30%, ${passion.color_code}cc 100%)`,
            }}
          ></div>
        </div>
      );
    }

    if (passion.tiktok_url) {
      const videoId = this.extractTikTokId(passion.tiktok_url);
      if (videoId) {
        return (
          <div className="passion-card-tiktok">
            <blockquote
              className="tiktok-embed"
              cite={passion.tiktok_url}
              data-video-id={videoId}
              style={{ maxWidth: "100%", minWidth: "100%" }}
            >
              <section>
                <a href={passion.tiktok_url} target="_blank" rel="noopener noreferrer">
                  View on TikTok
                </a>
              </section>
            </blockquote>
          </div>
        );
      }
    }

    if (passion.instagram_url) {
      const postId = this.extractInstagramId(passion.instagram_url);
      if (postId) {
        return (
          <div className="passion-card-instagram">
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink={passion.instagram_url}
              data-instgrm-version="14"
            >
              <a href={passion.instagram_url} target="_blank" rel="noopener noreferrer">
                View on Instagram
              </a>
            </blockquote>
          </div>
        );
      }
    }

    // Fallback to image
    return (
      <div className="passion-card-header" style={{ borderTopColor: passion.color_code }}>
        <img
          className="passion-card-image"
          src={process.env.PUBLIC_URL + "/" + passion.image_path}
          alt={passion.name}
        />
        <div
          className="passion-card-overlay"
          style={{
            background: `linear-gradient(180deg, transparent 30%, ${passion.color_code}cc 100%)`,
          }}
        ></div>
      </div>
    );
  }

  render() {
    const { passion, theme } = this.props;

    return (
      <Fade bottom duration={2000} distance="40px">
        <div
          className="passion-card"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div className="passion-card-content">
            {this.renderMedia()}
            <div className="passion-card-body">
              <h2 className="passion-card-title" style={{ color: theme.text }}>
                {passion.name}
              </h2>
              <p className="passion-card-description" style={{ color: theme.secondaryText }}>
                {passion.description}
              </p>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

export default PassionCard;
