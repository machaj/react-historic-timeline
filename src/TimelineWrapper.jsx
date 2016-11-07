require('./../asset/timeline.css');
import React from 'react/react';

import * as actionNames from './timelineActionTypes.js';
import timelineReducer from './timelineReducer.js';
import Timeline from './Timeline'; // eslint-disable-line
import TimelineElement from './TimelineElement'; // eslint-disable-line
import TimelineControl from './TimelineControl'; // eslint-disable-line

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

class TimelineWrapper extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.updateTimeout = null;

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
                    this.setState({
                        timelineObject: timelineReducer(this.state.timelineObject, {
                            type: actionNames.ERA_ENTERED,
                            year
                        })
                    });
                } else {
                    this.updateTimeout = setTimeout(() => {
                        this.setState({
                            timelineObject: timelineReducer(this.state.timelineObject, {
                                type: actionNames.ERA_ENTERED,
                                year: newYear
                            })
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
                this.setState({
                    timelineObject: timelineReducer(this.state.timelineObject, {
                        type: actionNames.TIMELINE_CHANGE_PARTITION,
                        partitionCount: calculatePartitionCount()
                    })
                });
            }, 100);
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

    render() {
        const timelineControl = this.enableControl ? (
            <TimelineControl clickZoomInCallback={ this.clickZoomInCallback }
                clickZoomOutCallback={ this.clickZoomOutCallback }
                setYearCallback= { this.changeYearCallback }
                year={ this.state.timelineObject.year }
            />
        ) : '';

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
    zoom: React.PropTypes.number
};

export default TimelineWrapper;
