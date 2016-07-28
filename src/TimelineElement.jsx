import React from 'react/react';

const timelineElementDefaultLabel = {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    textAlign: 'center',
    paddingBottom: '15px',
    cursor: 'pointer',
    width: '50px'
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
    transition: 'background-color 0.3s, border-color 0.3s'
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
            this.props.clickElementCallback(
                {
                    year: this.props.year
                }
            );
        };
    }

    render() {
        let labelStyle = this.props.isAnniversary ? timelineElementAnniversaryLabel : timelineElementLabel;
        if (this.props.isSelected) {
            labelStyle = timelineElementSelectedLabel;
        }

        const hrefStyle = Object.assign(
            { left: `${(this.props.index + 1) * 50}px` },
            labelStyle
        );
        const spanStyle = Object.assign(
            { left: `${(this.props.index + 1) * 50 + 26}px` },
            this.props.isAnniversary ? timelineAnniversaryDelimiter : timelineDelimiter
        );

        return (
            <li>
                <a onClick={this.clickCallback} style={hrefStyle} >{this.props.year}</a>
                <span style={spanStyle}></span>
            </li>
        );
    }
}

TimelineElement.propTypes = {
    clickElementCallback: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
    isAnniversary: React.PropTypes.bool.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    year: React.PropTypes.number.isRequired
};


export default TimelineElement;
