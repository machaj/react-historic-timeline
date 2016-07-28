import * as actionNames from './timelineActionTypes.js';

const zoomLevels = [1, 5, 10, 20, 25, 50, 100];

function checkZoom(newZoom) {
    let result;

    if (newZoom < 0) {
        result = 0;
    } else if (zoomLevels.length < newZoom) {
        result = zoomLevels.length - 1;
    } else {
        result = newZoom;
    }

    return result;
}

function fillPartitions(partitionCount, selectedYear, zoomLevel) {
    const oddPartitionCount = partitionCount % 2 === 0 ? partitionCount + 1 : partitionCount;
    const zoomCorrection = zoomLevels[zoomLevel];
    const partitionBefore = (oddPartitionCount - 1) / 2;
    const partitions = [];
    const roundedYear = selectedYear - (selectedYear % zoomCorrection);
    const startingYear = roundedYear - zoomCorrection * partitionBefore;
    const endYear = startingYear + (oddPartitionCount * zoomCorrection);
    const anniversaryYear = zoomLevels[zoomLevel] * 5;

    for (let year = startingYear; year < endYear; year = year + zoomCorrection) {
        partitions.push({
            isAnniversary: year % anniversaryYear === 0,
            isSelected: selectedYear === year,
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
