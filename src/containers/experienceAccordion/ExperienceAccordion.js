import React, { Component } from "react";
import ExperienceCard from "../../components/experienceCard/ExperienceCard.js";
import "./ExperienceAccordion.css";
import { Accordion, Panel } from "baseui/accordion";

class ExperienceAccordion extends Component {
  render() {
    const theme = this.props.theme;
    // Create array of all section indices to expand by default
    const expandedKeys = this.props.sections.map((_, index) => String(index));
    return (
      <div className="experience-accord">
        <Accordion initialState={{ expanded: expandedKeys }}>
          {this.props.sections.map((section, index) => {
            return (
              <Panel
                className="accord-panel"
                title={section["title"]}
                key={String(index)}
                overrides={{
                  Header: {
                    style: () => ({
                      backgroundColor: `${theme.body}`,
                      border: `1px solid`,
                      borderRadius: `5px`,
                      borderColor: `${theme.headerColor}`,
                      marginBottom: `3px`,
                      fontFamily: "Google Sans Regular",
                      color: `${theme.text}`,
                      ":hover": {
                        color: `${theme.secondaryText}`,
                      },
                    }),
                  },
                  Content: {
                    style: () => ({
                      backgroundColor: `${theme.body}`,
                    }),
                  },
                }}
              >
{section["experiences"].map((experience,index) => {
                  return (
                    <ExperienceCard index={index} totalCards={section["experiences"].length} experience={experience} theme={theme} />
                  );
                })}
              </Panel>
            );
          })}
        </Accordion>
      </div>
    );
  }
}

export default ExperienceAccordion;
