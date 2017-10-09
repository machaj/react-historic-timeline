import React from 'react';
import PropTypes from 'prop-types';

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
    left: '17px',
    cursor: 'pointer'
};

class TimelineControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: props.year };
        this.timeoutId = null;

        this.onChange = (event) => {
            const value = event.target.value;
            this.setState({ value });
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            this.timeoutId = setTimeout(() => {
                this.props.setYearCallback(parseInt(value, 10));
            }, 1000);
        };
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
    year: PropTypes.number.isRequired,
    clickZoomInCallback: PropTypes.func.isRequired,
    clickZoomOutCallback: PropTypes.func.isRequired,
    setYearCallback: PropTypes.func.isRequired
};


export default TimelineControl;
