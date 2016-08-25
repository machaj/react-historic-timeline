import React from 'react/react';
import { TIMELINE_SPACER } from './timelineConstants';

const timelineElementDefaultLabel = {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    textAlign: 'center',
    paddingBottom: '15px',
    cursor: 'pointer',
    width: '50px',
    transition: 'all 0.3s',
    opacity: 1
};

const timelineElementLabel = Object.assign(
    {
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: '0.85em'
    },
    timelineElementDefaultLabel
);

const timelineElementAnniversaryLabel = Object.assign(
    {
        color: 'black',
        fontWeight: 'bold'
    },
    timelineElementDefaultLabel
);

const timelineElementSelectedLabel = Object.assign(
    {
        color: 'red',
        fontWeight: 'bolder',
        fontSize: '1.2em'
    },
    timelineElementDefaultLabel
);

const timelineDefaultDelimiter = {
    position: 'absolute',
    bottom: '0px',
    width: '1px',
    zIndex: 2,
    transition: 'all 0.3s',
    opacity: 1
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
        let labelStyle = this.props.isAnniversary ? timelineElementAnniversaryLabel : timelineElementLabel;
        let elementIsInvisible = {};

        if (this.props.index === 0) {
            labelStyle = timelineElementSelectedLabel;
        }

        if (!this.props.isVisible) {
            elementIsInvisible = {
                opacity: 0
            };
        }

        const hrefStyle = Object.assign(
            {
                left: `${positionLeft}px`,
                width: `${this.props.elementSize}px`
            },
            labelStyle,
            elementIsInvisible
        );
        const spanStyle = Object.assign(
            { left: `${positionLeft + TIMELINE_SPACER}px` },
            this.props.isAnniversary ? timelineAnniversaryDelimiter : timelineDelimiter,
            elementIsInvisible
        );

        return (
            <li>
                <a onClick={this.clickCallback} style={hrefStyle} >{this.props.year}</a>
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
    isVisible: React.PropTypes.bool.isRequired,
    year: React.PropTypes.number.isRequired
};


export default TimelineElement;
