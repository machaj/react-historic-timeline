import * as actionNames from './timelineActionTypes.js';

const zoomLevels = [1, 5, 10, 20, 25, 50, 100];

function checkZoom(newZoom) {
    let result;

    if (newZoom < 0) {
        result = 0;
    } else if (zoomLevels.length - 1 < newZoom) {
        result = zoomLevels.length - 1;
    } else {
        result = newZoom;
    }

    return result;
}

function fillPartitions(partitionCount, selectedYear, zoomLevel) {
    const oddPartitionCount = partitionCount % 2 === 0 ? partitionCount + 1 : partitionCount;
    const zoomCorrection = zoomLevels[zoomLevel];
    const yearShift = (oddPartitionCount - 1) / 2 * zoomCorrection;
    const roundedYear = selectedYear - (selectedYear % zoomCorrection);
    const startingYear = roundedYear - yearShift * 2;
    const firstVisibleYear = roundedYear - yearShift;
    const lastVisibleYear = roundedYear + yearShift;
    const endYear = roundedYear + yearShift * 2;
    const anniversaryYear = zoomLevels[zoomLevel] * 5;
    const partitions = [];
    let index = - (oddPartitionCount - 1);

    for (let year = startingYear; year <= endYear; year = year + zoomCorrection) {
        partitions.push({
            index: index++,
            isAnniversary: year % anniversaryYear === 0,
            isVisible: (year >= firstVisibleYear && year <= lastVisibleYear),
            year
        });
    }
    return partitions;
}

export default (state = {}, action = {}) => {
    let updatedYear = null;
    let updatedZoom = null;

    switch (action.type) {
    case actionNames.TIMELINE_INIT:
        return {
            year: action.year,
            zoom: action.zoom,
            partitionCount: action.partitionCount,
            partitions: fillPartitions(action.partitionCount, action.year, action.zoom)
        };
    case actionNames.TIMELINE_CHANGE_PARTITION:
        return {
            ...state,
            partitionCount: action.partitionCount,
            partitions: fillPartitions(action.partitionCount, state.year, state.zoom)
        };
    case actionNames.ERA_ENTERED:
        return {
            ...state,
            partitions: fillPartitions(state.partitionCount, action.year, state.zoom),
            year: action.year
        };
    case actionNames.ERA_MINUS:
        updatedYear = state.year - zoomLevels[state.zoom];
        return {
            ...state,
            partitions: fillPartitions(state.partitionCount, updatedYear, state.zoom),
            year: updatedYear
        };
    case actionNames.ERA_PLUS:
        updatedYear = state.year + zoomLevels[state.zoom];
        return {
            ...state,
            partitions: fillPartitions(state.partitionCount, updatedYear, state.zoom),
            year: updatedYear
        };
    case actionNames.ERA_ZOOM_IN:
        updatedZoom = checkZoom(state.zoom - 1);
        return {
            ...state,
            partitions: fillPartitions(state.partitionCount, state.year, updatedZoom),
            zoom: updatedZoom
        };
    case actionNames.ERA_ZOOM_OUT:
        updatedZoom = checkZoom(state.zoom + 1);
        return {
            ...state,
            partitions: fillPartitions(state.partitionCount, state.year, updatedZoom),
            zoom: updatedZoom
        };
    default:
        return state;
    }
};
