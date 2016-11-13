import React from 'react';
import ReactDOM from 'react-dom';
import TimelineWrapper from '../lib/TimelineWrapper';
import TimelineBox2x from '../lib/TimelineBox2x'

ReactDOM.render(
    <TimelineWrapper year={899} minYear={660} maxYear={1750} enableControl>
        <TimelineBox2x/>
    </TimelineWrapper>
    , document.getElementById("container")
);