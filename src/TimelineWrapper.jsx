import React from 'react';
import { connect } from 'react-redux';
import bindActionCreators from 'redux/es/bindActionCreators';
import PropTypes from 'prop-types';

import { ActionCreators } from './actions/index';
import Timeline from './components/Timeline'; //eslint-disable-line
import TimelineElement from './components/TimelineElement'; //eslint-disable-line
import TimelineControl from './components/TimelineControl'; //eslint-disable-line

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

const getNewYear = (year, minYear, maxYear) => {
    let newYear = null;

    if (minYear && minYear > year) {
        newYear = minYear;
    }

    if (maxYear && maxYear < year) {
        newYear = maxYear;
    }

    return newYear;
};

class TimelineWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateTimeout = null;
        this.enableControl = this.props.enableControl || false;

        TimelineElement.parentContainerCenter = window.innerWidth / 2;
        TimelineElement.size = this.props.elementSize ? this.props.elementSize : 50;
        TimelineElement.clickCallback = (elementProps) => {
            this.props.timelineSetYear(elementProps.year);
        };

        this.changeYearCallback = (year) => {
            if (year) {
                const newYear = getNewYear(year, this.props.timeline.minYear, this.props.timeline.maxYear);
                const updateState = newYear === null;

                if (this.updateTimeout) {
                    clearTimeout(this.updateTimeout);
                    this.updateTimeout = null;
                }

                if (updateState) {
                    this.props.timelineSetYear(year);
                } else {
                    this.updateTimeout = setTimeout(() => {
                        this.props.timelineSetYear(newYear);
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
                this.props.timelineChangePartition(calculatePartitionCount());
            }, 100);
        };

        this.props.timelineInit({
            year: this.props.year || 1444,
            minYear: this.props.minYear,
            maxYear: this.props.maxYear,
            zoom: this.props.zoom || 3,
            partitionCount: calculatePartitionCount()
        });

        window.addEventListener('resize', this.windowResizeHandeler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizeHandeler);
    }

    render() {
        if (Object.keys(this.props.timeline).length === 0) {
            return null;
        }

        const timelineControl = this.enableControl ? (
            <TimelineControl clickZoomInCallback={this.props.timelineZoomIn}
                clickZoomOutCallback={this.props.timelineZoomOut}
                setYearCallback={this.changeYearCallback}
                year={this.props.timeline.year}
            />
        ) : '';

        return (
            <div style={timelineComponentStyle}>
                <div style={timelineWrapperStyle}>
                    {timelineControl}
                    <Timeline partitions={this.props.timeline.partitions}
                        clickNextCallback={this.props.timelineEraPlus}
                        clickPrevCallback={this.props.timelineEraMinus}
                        enabledControl={this.enableControl}
                    />
                </div>
                {this.props.children}
            </div>
        );
    }
}

TimelineWrapper.propTypes = {
    elementSize: PropTypes.number,
    minYear: PropTypes.number,
    maxYear: PropTypes.number,
    year: PropTypes.number,
    enableControl: PropTypes.bool,
    zoom: PropTypes.number,
    children: PropTypes.element
};

function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators(ActionCreators, dispatch);
    actions.dispatch = dispatch;
    return actions;
}

function mapStateToProps(state) {
    return {
        timeline: state.timelineReducer
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineWrapper);
