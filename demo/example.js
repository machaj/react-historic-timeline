import React from 'react';
import ReactDOM from 'react-dom';
import TimelineWrapper from '../lib/TimelineWrapper';

ReactDOM.render(<TimelineWrapper minYear={660} maxYear={1750} />, document.getElementById("container"));