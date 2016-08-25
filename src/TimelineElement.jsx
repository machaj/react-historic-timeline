import React from 'react/react';
import { TIMELINE_SPACER } from './timelineConstants';

const timelineElementDefaultLabel = {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    textAlign: 'center',
    paddingBottom: '15px',
    width: '50px',
    transition: 'all 0.3s'
};

const timelineDefaultDelimiter = {
    position: 'absolute',
    bottom: '0px',
    width: '1px',
    zIndex: 2,
    transition: 'all 0.3s'
};

const timelineDelimiter = Object.assign(
    {
        height: '8px',
        borderLeft: '1px solid rgba(223, 223, 223, 0.9)'
    },
    timelineDefaultDelimiter
);

const timelineAnniversaryDelimiter = Object.assign(
    {
        height: '12px',
        borderLeft: '1px solid rgb(223, 223, 223)'
    },
    timelineDefaultDelimiter
);

class TimelineElement extends React.Component {
    componentWillMount() {
        this.clickCallback = () => {
            if (typeof TimelineElement.clickCallback === 'function') {
                TimelineElement.clickCallback(
                    {
                        year: this.props.year
                    }
                );
            }
        };
    }

    render() {
        const positionLeft = TimelineElement.calculatePosition(this.props.index);
        const opacity = this.props.isVisible ? 1 : 0;
        const isClickable = (this.props.isEnabled && this.props.isVisible);
        const labelStyle = {
            left: `${positionLeft}px`,
            width: `${this.props.elementSize}px`,
            cursor: isClickable ? 'pointer' : 'default',
            opacity
        };


        if (this.props.index === 0) {
            labelStyle.color = 'red';
            labelStyle.fontWeight = 'bolder';
            labelStyle.fontSize = '1.2em';
        } else if (this.props.isAnniversary) {
            labelStyle.color = this.props.isEnabled ? 'black' : 'rgba(0, 0, 0, 0.25)';
            labelStyle.fontWeight = 'bold';
        } else {
            labelStyle.color = this.props.isEnabled ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)';
            labelStyle.fontSize = '0.85em';
        }

        const hrefStyle = Object.assign(
            labelStyle,
            timelineElementDefaultLabel
        );
        const spanStyle = Object.assign(
            {
                left: `${positionLeft + TIMELINE_SPACER}px`,
                opacity
            },
            this.props.isAnniversary ? timelineAnniversaryDelimiter : timelineDelimiter
        );

        return (
            <li>
                <a onClick={isClickable ? this.clickCallback : null} style={hrefStyle} >{this.props.year}</a>
                <span style={spanStyle}></span>
            </li>
        );
    }
}

TimelineElement.parentContainerCenter = 0;
TimelineElement.size = 100;

TimelineElement.calculatePosition = (index) => {
    return TimelineElement.parentContainerCenter + (index - 1.5) * TimelineElement.size;
};

TimelineElement.propTypes = {
    index: React.PropTypes.number.isRequired,
    isAnniversary: React.PropTypes.bool.isRequired,
    isEnabled: React.PropTypes.bool.isRequired,
    isVisible: React.PropTypes.bool.isRequired,
    year: React.PropTypes.number.isRequired
};


export default TimelineElement;
