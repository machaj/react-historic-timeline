import React from 'react/react';

import * as actionNames from './timelineActionTypes.js';
import timelineReducer from './timelineReducer.js';
import Timeline from './Timeline';

const timelineComponentStyle = {
    textAlign: 'center'
};

const timelineWraperStyle = {
    position: 'relative',
    height: '120px',
    margin: '0px 40px',
    overflow: 'hidden'
};

class TimelineWrapper extends React.Component {
    constructor() {
        super();
        this.state = {
            timelineObject: timelineReducer({}, {
                type: actionNames.TIMELINE_INIT,
                year: 1444,
                zoom: 3,
                partitionCount: 20
            })
        };

        this.clickElementCallback = (elementProps) => {
            this.setState({
                timelineObject: timelineReducer(this.state.timelineObject, {
                    type: actionNames.ERA_ENTERED,
                    year: elementProps.year }
                )
            });
        };

        this.clickNextCallback = () => {
            this.setState({
                timelineObject: timelineReducer(this.state.timelineObject, {
                    type: actionNames.ERA_PLUS
                })
            });
        };

        this.clickPrevCallback = () => {
            this.setState({
                timelineObject: timelineReducer(this.state.timelineObject, {
                    type: actionNames.ERA_MINUS
                })
            });
        };

        this.clickZoomInCallback = () => {
            this.setState({
                timelineObject: timelineReducer(this.state.timelineObject, {
                    type: actionNames.ERA_ZOOM_IN
                })
            });
        };

        this.clickZoomOutCallback = () => {
            this.setState({
                timelineObject: timelineReducer(this.state.timelineObject, {
                    type: actionNames.ERA_ZOOM_OUT
                })
            });
        };

        this.changeYearCallback = (event) => {
            console.log('Input changed', event);
        };
    }

    render() {
        return (
            <div style={ timelineComponentStyle }>
                <a onClick={ this.clickZoomInCallback }>Zoom in</a>
                <input type="text" onChange={ this.changeYearCallback } />
                <a onClick={ this.clickZoomOutCallback }>Zoom out</a>
                <div style={timelineWraperStyle}>
                    <Timeline partitions={ this.state.timelineObject.partitions }
                        clickElementCallback={ this.clickElementCallback}
                        clickNextCallback={ this.clickNextCallback }
                        clickPrevCallback={ this.clickPrevCallback }
                    />
                </div>
            </div>
        );
    }
}

export default TimelineWrapper;
