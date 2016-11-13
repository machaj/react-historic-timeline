import React from 'react/react';

class TimelineBox2x extends React.Component {
    componentWillMount() {
        this.props.register((data)=> {
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
    register: React.PropTypes.func
};

export default TimelineBox2x;