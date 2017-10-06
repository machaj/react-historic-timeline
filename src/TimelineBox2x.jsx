import React from 'react';
import PropTypes from 'prop-types';

class TimelineBox2x extends React.Component {
    componentWillMount() {
        this.props.register((data) => {
            console.log('BOX', data);
        });
    }

    render() {
        return (
            <div>
                TADY
            </div>
        );
    }
}

TimelineBox2x.propTypes = {
    register: PropTypes.func
};

export default TimelineBox2x;
