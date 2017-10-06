import React from 'react';

import * as actionNames from './timelineActionTypes';
import { timelineReducer, zoomLevels as timelineZooms } from './timelineReducer';
import Timeline from './Timeline.jsx'; //eslint-disable-line
import TimelineElement from './TimelineElement.jsx'; //eslint-disable-line
import TimelineControl from './TimelineControl.jsx'; //eslint-disable-line

require('./../asset/timeline.css');

const timelineComponentStyle = {
    textAlign: 'center'
};

const timelineWrapperStyle = {
    position: 'relative',
    height: '120px',
    margin: '0px 40px',
    overflow: 'hidden'
};

const calculatePartitionCount = () => {
    const defaultCount = Math.floor(window.innerWidth / TimelineElement.size) - 2;
    return defaultCount % 2 === 0 ? defaultCount - 1 : defaultCount;
};

function generateData(timelineObject) {
    const yearRange = timelineZooms[timelineObject.zoom];
    const result = [];

    timelineObject.partitions.forEach((item) => {
        result.push({
            index: item.index,
            yearFrom: item.year,
            yearTo: item.year + yearRange,
            isVisible: item.isVisible
        });
    });
    return result;
}

class TimelineWrapper extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.registeredCallbacks = [];
        this.updateTimeout = null;

        TimelineElement.clickCallback = (elementProps) => {
            this.timelineObjectReducer({
                type: actionNames.ERA_ENTERED,
                year: elementProps.year
            });
        };

        this.clickNextCallback = () => {
            this.timelineObjectReducer({ type: actionNames.ERA_PLUS });
        };

        this.clickPrevCallback = () => {
            this.timelineObjectReducer({ type: actionNames.ERA_MINUS });
        };

        this.clickZoomInCallback = () => {
            this.timelineObjectReducer({ type: actionNames.ERA_ZOOM_IN });
        };

        this.clickZoomOutCallback = () => {
            this.timelineObjectReducer({ type: actionNames.ERA_ZOOM_OUT });
        };

        this.changeYearCallback = (year) => {
            if (year) {
                const minYear = this.state.timelineObject.minYear;
                const maxYear = this.state.timelineObject.maxYear;
                let updateState = true;
                let newYear = null;

                if (minYear && minYear > year) {
                    updateState = false;
                    newYear = minYear;
                }

                if (maxYear && maxYear < year) {
                    updateState = false;
                    newYear = maxYear;
                }

                if (this.updateTimeout) {
                    clearTimeout(this.updateTimeout);
                    this.updateTimeout = null;
                }

                if (updateState) {
                    this.timelineObjectReducer({
                        type: actionNames.ERA_ENTERED,
                        year
                    });
                } else {
                    this.updateTimeout = setTimeout(() => {
                        this.timelineObjectReducer({
                            type: actionNames.ERA_ENTERED,
                            year: newYear
                        });
                    }, 2000);
                }
            }
        };

        this.windowResizeHandelerTimeoutId = null;

        this.windowResizeHandeler = () => {
            if (this.windowResizeHandelerTimeoutId) {
                clearTimeout(this.windowResizeHandelerTimeoutId);
            }

            this.windowResizeHandelerTimeoutId = setTimeout(() => {
                TimelineElement.parentContainerCenter = window.innerWidth / 2;
                this.timelineObjectReducer({
                    type: actionNames.TIMELINE_CHANGE_PARTITION,
                    partitionCount: calculatePartitionCount()
                });
            }, 100);
        };

        this.register = (callback) => {
            if (typeof callback === 'function') {
                this.registeredCallbacks.push(callback);
            }
        };
    }

    componentWillMount() {
        this.enableControl = this.props.enableControl || false;
        TimelineElement.parentContainerCenter = window.innerWidth / 2;
        TimelineElement.size = this.props.elementSize ? this.props.elementSize : 50;
        this.state = {
            timelineObject: timelineReducer({}, {
                type: actionNames.TIMELINE_INIT,
                year: this.props.year || 1444,
                minYear: this.props.minYear,
                maxYear: this.props.maxYear,
                zoom: this.props.zoom || 3,
                partitionCount: calculatePartitionCount()
            })
        };
        window.addEventListener('resize', this.windowResizeHandeler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeHandeler);
    }

    timelineObjectReducer(action) {
        const timelineObject = timelineReducer(this.state.timelineObject, action);
        const callbackData = generateData(timelineObject);
        this.registeredCallbacks.forEach((callback) => {
            callback(callbackData);
        });
        this.setState({ timelineObject });
    }

    render() {
        const timelineControl = this.enableControl ? (
            <TimelineControl clickZoomInCallback={ this.clickZoomInCallback }
                clickZoomOutCallback={ this.clickZoomOutCallback }
                setYearCallback= { this.changeYearCallback }
                year={ this.state.timelineObject.year }
            />
        ) : '';

        const children = this.props.children ?
            React.cloneElement(this.props.children, { register: this.register }) : null;

        return (
            <div style={ timelineComponentStyle }>
                <div style={timelineWrapperStyle}>
                    { timelineControl }
                    <Timeline partitions={ this.state.timelineObject.partitions }
                        clickNextCallback={ this.clickNextCallback }
                        clickPrevCallback={ this.clickPrevCallback }
                        enabledControl={ this.enableControl }
                    />
                </div>
                {children}
            </div>
        );
    }
}

TimelineWrapper.propTypes = {
    elementSize: React.PropTypes.number,
    minYear: React.PropTypes.number,
    maxYear: React.PropTypes.number,
    year: React.PropTypes.number,
    enableControl: React.PropTypes.bool,
    zoom: React.PropTypes.number,
    children: React.PropTypes.element
};

export default TimelineWrapper;
