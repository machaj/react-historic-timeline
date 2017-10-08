import React from 'react';
import PropTypes from 'prop-types';

import TimelineElement from './TimelineElement'; //eslint-disable-line

const timelineContainerStyle = {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: '49px',
    height: '1px',
    width: '100%',
    transform: 'translate3d(0px, 0px, 0px)',
    background: 'rgb(223, 223, 223)'
};

const timelineOlStyle = {
    listStyle: 'none'
};

const timelineArrowStyle = {
    position: 'absolute',
    bottom: 0,
    zIndex: 3,
    textAlign: 'center',
    paddingBottom: '15px',
    cursor: 'pointer',
    width: '10px'
};

const timelineLeftArrowStyle = Object.assign(
    { left: 0 },
    timelineArrowStyle
);

const timelineRightArrowStyle = Object.assign(
    { right: 0, paddingRight: '10px' },
    timelineArrowStyle
);

class Timeline extends React.Component {
    render() {
        const timelineElements = [];

        this.props.partitions.forEach((partition) => {
            timelineElements.push(<TimelineElement key={partition.year}
                index={partition.index}
                year={partition.year}
                isAnniversary={partition.isAnniversary}
                isEnabled={partition.isEnabled}
                isVisible={partition.isVisible}
                enabledControl={this.props.enabledControl}
            />);
        });

        return (
            <div style={timelineContainerStyle}>
                <ol style={timelineOlStyle}>
                    <li>
                        <a onClick={this.props.clickPrevCallback} style={timelineLeftArrowStyle}>
                            &lt;&lt;
                        </a>
                    </li>
                    {timelineElements}
                    <li>
                        <a onClick={this.props.clickNextCallback} style={timelineRightArrowStyle}>
                            &gt;&gt;
                        </a>
                    </li>
                </ol>
            </div>
        );
    }
}

Timeline.propTypes = {
    clickNextCallback: PropTypes.func.isRequired,
    clickPrevCallback: PropTypes.func.isRequired,
    partitions: PropTypes.array.isRequired,
    enabledControl: PropTypes.bool.isRequired
};


export default Timeline;
