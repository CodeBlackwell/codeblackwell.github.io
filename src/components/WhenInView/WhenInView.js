import React, { Component } from 'react';
import Waypoint from 'react-waypoint';

class WhenInView extends Component {
    constructor(props){
        super(props);

        this.state = {
            isInView: false
        };

        this.onEnter = this.onEnter.bind(this);
    }


    onEnter({ previousPosition }) {
        console.log('should be in view', this.state);
        if( previousPosition === Waypoint.below) {
            this.setState({
                isInView: true
            })
        }
    }
    render () {
        console.log(this.state , 'on render');
        return (
            <div>
                <Waypoint onEnter={this.onEnter}>
                    {this.props.children({ isInView: this.state.isInView })}
                </Waypoint>
            </div>
        )
    }
}

export default WhenInView;