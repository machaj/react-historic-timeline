import { combineReducers } from 'redux';
import * as timelineReducer from './timeline';


export default combineReducers(Object.assign(timelineReducer));
