import React from 'react/react';

import * as actionNames from './timelineActionTypes.js';
import timelineReducer from './timelineReducer.js';
import Timeline from './Timeline';

const timelineWraperStyle = {
    position: 'relative',
    height: '120px',
    margin: '0px 40px',
    overflow: 'hidden'
};

class TimelineWrapper extends React.Component {
    constructor() {
        super();
        this.state = {
            timelineObject: timelineReducer({}, {
                type: actionNames.TIMELINE_INIT,
                year: 1450,
                zoom: 3,
                partitionCount: 20
            })
        };

        this.clickElementCallback = (elementProps) => {
            console.log('click element callback', elementProps);
            this.setState(
                { timelineObject: timelineReducer(this.state.timelineObject, {
                    type: actionNames.ERA_ENTERED,
                    year: elementProps.year })
                }
            );
        };

        this.clickNextCallback = () => {
            console.log('click next callback');
            this.setState(
                { timelineObject: timelineReducer(this.state.timelineObject, {
                    type: actionNames.ERA_PLUS })
                }
            );
        };

        this.clickPrevCallback = () => {
            console.log('click prec callback');
            this.setState(
                { timelineObject: timelineReducer(this.state.timelineObject, {
                    type: actionNames.ERA_MINUS })
                }
            );
        };
    }

    render() {
        return (
            <div style={timelineWraperStyle}>
                <Timeline partitions={this.state.timelineObject.partitions}
                    clickElementCallback={ this.clickElementCallback}
                    clickNextCallback={ this.clickNextCallback }
                    clickPrevCallback={ this.clickPrevCallback }
                />
            </div>
        );
    }
}

export default TimelineWrapper;
