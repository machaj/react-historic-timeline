import React from 'react/react';

import * as actionNames from './timelineActionTypes.js';
import { TIMELINE_SPACER } from './timelineConstants';
import timelineReducer from './timelineReducer.js';
import Timeline from './Timeline'; // eslint-disable-line
import TimelineElement from './TimelineElement'; // eslint-disable-line

const timelineComponentStyle = {
    textAlign: 'center'
};

const timelineWraperStyle = {
    position: 'relative',
    height: '120px',
    margin: '0px 40px',
    overflow: 'hidden'
};

const calculatePartitionCount = () => {
    const defaultCount = Math.floor(window.innerWidth / TimelineElement.size) - 2;
    return defaultCount % 2 === 0 ? defaultCount - 1 : defaultCount;
};

class TimelineWrapper extends React.Component {
    constructor() {
        super();
        this.state = {};

        TimelineElement.clickCallback = (elementProps) => {
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

        this.windowResizeHandelerTimeoutId = null;

        this.windowResizeHandeler = () => {
            if (this.windowResizeHandelerTimeoutId) {
                clearTimeout(this.windowResizeHandelerTimeoutId);
            }

            this.windowResizeHandelerTimeoutId = setTimeout(() => {
                TimelineElement.parentContainerCenter = window.innerWidth / 2;
                this.setState({
                    timelineObject: timelineReducer(this.state.timelineObject, {
                        type: actionNames.TIMELINE_CHANGE_PARTITION,
                        partitionCount: calculatePartitionCount()
                    })
                });
            }, 500);
        };
    }

    componentWillMount() {
        TimelineElement.parentContainerCenter = window.innerWidth / 2;
        TimelineElement.size = this.props.elementSize ? this.props.elementSize : 50;
        this.state = {
            timelineObject: timelineReducer({}, {
                type: actionNames.TIMELINE_INIT,
                year: 1444,
                zoom: 3,
                partitionCount: calculatePartitionCount()
            })
        };
        window.addEventListener('resize', this.windowResizeHandeler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeHandeler);
    }

    render() {
        return (
            <div style={ timelineComponentStyle }>
                <a onClick={ this.clickZoomInCallback }>Zoom in</a>
                <input type="text" onChange={ this.changeYearCallback } />
                <a onClick={ this.clickZoomOutCallback }>Zoom out</a>
                <div style={timelineWraperStyle}>
                    <Timeline partitions={ this.state.timelineObject.partitions }
                        clickNextCallback={ this.clickNextCallback }
                        clickPrevCallback={ this.clickPrevCallback }
                    />
                </div>
            </div>
        );
    }
}

TimelineWrapper.propTypes = {
    elementSize: React.PropTypes.number
};

export default TimelineWrapper;
