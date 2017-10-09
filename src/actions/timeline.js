import * as types from './types';

export function timelineInit(initConfig) {
    return {
        type: types.TIMELINE_INIT,
        ...initConfig
    };
}

export function timelineSetYear(year) {
    return {
        type: types.TIMELINE_ERA_ENTERED,
        year
    };
}

export function timelineEraPlus() {
    return {
        type: types.TIMELINE_ERA_PLUS
    };
}

export function timelineEraMinus() {
    return {
        type: types.TIMELINE_ERA_MINUS
    };
}

export function timelineZoomIn() {
    return {
        type: types.TIMELINE_ERA_ZOOM_IN
    };
}

export function timelineZoomOut() {
    return {
        type: types.TIMELINE_ERA_ZOOM_OUT
    };
}

export function timelineChangePartition(partitionCount) {
    return {
        type: types.TIMELINE_CHANGE_PARTITION,
        partitionCount
    };
}
