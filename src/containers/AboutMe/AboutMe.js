import React, {Component} from 'react';
import ReactPlayer from 'react-player';

import {Container} from '../../theme/grid';
import {H2, H1} from '../../theme/types';

import QASection from '../../components/QASection/QASection';
import {Title, VideoContainer} from './AboutMe.style';
import WhenInView from '../../components/WhenInView/WhenInView';
import {RevealQASection} from './AboutMe.style';

class AboutMe extends Component {
    render() {
        return (
            <Container>
                <Title>About Me</Title>
                <H1 align="right">Do you like to stay active? Haha I can't help it!!</H1>
                <H2 align="right">Check out </H2>
                <VideoContainer>
                <ReactPlayer url={require('../../assets/IMG_2510.mp4')} controls={true} />
                </VideoContainer>


                <QASection
                    question="Soo what sports am I into?"
                    justify="flex-end"
                    align="flex-end"
                    qIndex="2"
                    answer="Well they change every so often but right now I love Rock Climbing!!"
                    imageURL="http://i.imgur.com/tIDAnmM.png"
                />
                <WhenInView>
                    { ({isInView}) =>
                        <RevealQASection hide={!isInView}>
                            <QASection
                                question="Soo what sports am I into?"
                                justify="flex-start"
                                align="flex-end"
                                qIndex="3"
                                answer="Well they change every so often but right now I love Rock Climbing!!"
                                imageURL="http://i.imgur.com/tIDAnmM.png"
                            />
                        </RevealQASection>
                    }
                </WhenInView>
                <WhenInView>
                    { ({isInView}) =>
                        <RevealQASection hide={!isInView}>
                            <QASection
                                question="Soo what sports am I into?"
                                justify="flex-start"
                                align="flex-end"
                                qIndex="3"
                                answer="Well they change every so often but right now I love Rock Climbing!!"
                                imageURL="http://i.imgur.com/tIDAnmM.png"
                            />
                        </RevealQASection>
                    }
                </WhenInView>
                <WhenInView>
                    { ({isInView}) =>
                        <RevealQASection hide={!isInView}>
                            <QASection
                                question="Soo what sports am I into?"
                                justify="flex-start"
                                align="flex-end"
                                qIndex="3"
                                answer="Well they change every so often but right now I love Rock Climbing!!"
                                imageURL="http://i.imgur.com/tIDAnmM.png"
                            />
                        </RevealQASection>
                    }
                </WhenInView>
                <WhenInView>
                    { ({isInView}) =>
                        <RevealQASection hide={!isInView}>
                            <QASection
                                question="Soo what sports am I into?"
                                justify="flex-start"
                                align="flex-end"
                                qIndex="3"
                                answer="Well they change every so often but right now I love Rock Climbing!!"
                                imageURL="http://i.imgur.com/tIDAnmM.png"
                            />
                        </RevealQASection>
                    }
                </WhenInView>
            </Container>
        );
    }
}

export default AboutMe;