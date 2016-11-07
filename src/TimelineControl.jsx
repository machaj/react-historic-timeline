import React from 'react/react';

const width = '55px';

const timelineControlStyle = {
    position: 'absolute',
    zIndex: 2,
    left: '-8px',
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    top: 0,
    width
};

const timelineYearInputStyle = {
    textAlign: 'center',
    fontWeight: 'bolder',
    fontSize: '1.2em',
    color: 'red',
    marginTop: '12px',
    width
};

const timelineZoomButtonsContainerStyle = {
    position: 'absolute',
    top: '60px',
    left: '17px'
};

class TimelineControl extends React.Component {
    constructor() {
        super();

        this.state = { value: null };
        this.timeoutId = null;

        this.onChange = (event) => {
            const value = event.target.value;
            this.setState({ value });
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            this.timeoutId = setTimeout(() => {
                this.props.setYearCallback(parseInt(value, 10));
            }, 500);
        };
    }

    componentWillMount() {
        this.setState({ value: this.props.year });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.year });
    }

    render() {
        return (
            <div style={timelineControlStyle}>
                <input className="timeline" type="number"
                    onChange={ this.onChange }
                    value={ this.state.value }
                    style={timelineYearInputStyle}
                />
                <div style={timelineZoomButtonsContainerStyle}>
                    <a onClick={ this.props.clickZoomOutCallback }>-</a> /
                    <a onClick={ this.props.clickZoomInCallback }>+</a>
                </div>
            </div>
        );
    }
}

TimelineControl.propTypes = {
    year: React.PropTypes.number.isRequired,
    clickZoomInCallback: React.PropTypes.func.isRequired,
    clickZoomOutCallback: React.PropTypes.func.isRequired,
    setYearCallback: React.PropTypes.func.isRequired
};


export default TimelineControl;
