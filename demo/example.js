import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger'
import reducer from '../src/reducers';

import TimelineWrapper from '../lib/TimelineWrapper.js';
import TimelineBox2x from '../lib/TimelineBox2x.js';

const store = createStore(reducer, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <TimelineWrapper year={899} minYear={660} maxYear={1750} enableControl>
        </TimelineWrapper>
    </Provider>
    , document.getElementById("container")
);