import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const zoomLevels = [1, 5, 10, 20, 25, 50, 100];

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

function fillPartitions(partitionCount, selectedYear, zoomLevel, minYear, maxYear) {
    const oddPartitionCount = partitionCount % 2 === 0 ? partitionCount + 1 : partitionCount;
    const zoomCorrection = zoomLevels[zoomLevel];
    const yearShift = ((oddPartitionCount - 1) / 2) * zoomCorrection;
    const yearMod = selectedYear % zoomCorrection;
    const yearMinusMod = selectedYear - yearMod;
    const roundedYear = (zoomCorrection / 2) < yearMod ? yearMinusMod + zoomCorrection : yearMinusMod;
    const startingYear = roundedYear - (yearShift * 2);
    const firstVisibleYear = roundedYear - yearShift;
    const lastVisibleYear = roundedYear + yearShift;
    const endYear = roundedYear + (yearShift * 2);
    const anniversaryYear = zoomLevels[zoomLevel] * 5;
    const partitions = [];
    let index = -(oddPartitionCount);

    for (let year = startingYear; year <= endYear; year += zoomCorrection) {
        partitions.push({
            index: index += 1,
            isEnabled: ((minYear <= year || minYear === null) && (year <= maxYear || maxYear === null)),
            isAnniversary: year % anniversaryYear === 0,
            isVisible: (year >= firstVisibleYear && year <= lastVisibleYear),
            year
        });
    }
    return partitions;
}

export const timelineReducer = createReducer({}, {
    [types.TIMELINE_INIT](state, action) {
        const minYear = action.minYear !== undefined ? action.minYear : null;
        const maxYear = action.maxYear !== undefined ? action.maxYear : null;

        return {
            year: action.year,
            zoom: action.zoom,
            minYear,
            maxYear,
            partitionCount: action.partitionCount,
            partitions: fillPartitions(action.partitionCount, action.year, action.zoom, minYear, maxYear)
        };
    },
    [types.TIMELINE_CHANGE_PARTITION](state, action) {
        return {
            ...state,
            partitionCount: action.partitionCount,
            partitions: fillPartitions(action.partitionCount, state.year, state.zoom, state.minYear, state.maxYear)
        };
    },
    [types.TIMELINE_ERA_ENTERED](state, action) {
        return {
            ...state,
            partitions: fillPartitions(state.partitionCount, action.year, state.zoom, state.minYear, state.maxYear),
            year: action.year
        };
    },
    [types.TIMELINE_ERA_MINUS](state) {
        let updatedYear = state.year - (((state.partitions.length - 1) / 4) * zoomLevels[state.zoom]);

        if (state.minYear !== null && updatedYear < state.minYear) {
            updatedYear = state.minYear;
        }

        return {
            ...state,
            partitions: fillPartitions(state.partitionCount, updatedYear, state.zoom, state.minYear, state.maxYear),
            year: updatedYear
        };
    },
    [types.TIMELINE_ERA_PLUS](state) {
        let updatedYear = state.year + (((state.partitions.length - 1) / 4) * zoomLevels[state.zoom]);

        if (state.maxYear !== null && updatedYear > state.maxYear) {
            updatedYear = state.maxYear;
        }

        return {
            ...state,
            partitions: fillPartitions(state.partitionCount, updatedYear, state.zoom, state.minYear, state.maxYear),
            year: updatedYear
        };
    },
    [types.TIMELINE_ERA_ZOOM_IN](state) {
        const updatedZoom = checkZoom(state.zoom - 1);
        return {
            ...state,
            partitions: fillPartitions(state.partitionCount, state.year, updatedZoom, state.minYear, state.maxYear),
            zoom: updatedZoom
        };
    },
    [types.TIMELINE_ERA_ZOOM_OUT](state) {
        const updatedZoom = checkZoom(state.zoom + 1);
        return {
            ...state,
            partitions: fillPartitions(state.partitionCount, state.year, updatedZoom, state.minYear, state.maxYear),
            zoom: updatedZoom
        };
    }
});
