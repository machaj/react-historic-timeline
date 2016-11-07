import React from 'react';
import ReactDOM from 'react-dom';
import TimelineWrapper from '../lib/TimelineWrapper';

ReactDOM.render(<TimelineWrapper year={899} minYear={660} maxYear={1750} enableControl />, document.getElementById("container"));