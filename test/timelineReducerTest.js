import expect from 'expect';
import deepFreeze from 'deep-freeze';

import * as actionNames from '../src/timelineActionTypes.js';
import timelineReducer from '../src/timelineReducer.js';

describe('TimelineWrapper initialization - test 1', () => {
    it('it should return initialized timeline', () => {
        const stateBefore = {};
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 0,
            partitionCount: 5,
            partitions: [
                { year: 1422 },
                { year: 1423 },
                { year: 1424 },
                { year: 1425 },
                { year: 1426 }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.TIMELINE_INIT,
            year: 1424,
            zoom: 0,
            partitionCount: 5
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper initialization - test 2', () => {
    it('it should return initialized timeline with nine partition', () => {
        const stateBefore = {};
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 1,
            partitionCount: 9,
            partitions: [
                { year: 1400 },
                { year: 1405 },
                { year: 1410 },
                { year: 1415 },
                { year: 1420 },
                { year: 1425 },
                { year: 1430 },
                { year: 1435 },
                { year: 1440 }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.TIMELINE_INIT,
            year: 1424,
            zoom: 1,
            partitionCount: 9
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper initialization - test 3', () => {
    it('it should return initialized timeline with thirty partitions', () => {
        const stateBefore = {};
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1675,
            zoom: 1,
            partitionCount: 30,
            partitions: [
                { year: 1600 },
                { year: 1605 },
                { year: 1610 },
                { year: 1615 },
                { year: 1620 },
                { year: 1625 },
                { year: 1630 },
                { year: 1635 },
                { year: 1640 },
                { year: 1645 },
                { year: 1650 },
                { year: 1655 },
                { year: 1660 },
                { year: 1665 },
                { year: 1670 },
                { year: 1675 },
                { year: 1680 },
                { year: 1685 },
                { year: 1690 },
                { year: 1695 },
                { year: 1700 },
                { year: 1705 },
                { year: 1710 },
                { year: 1715 },
                { year: 1720 },
                { year: 1725 },
                { year: 1730 },
                { year: 1735 },
                { year: 1740 },
                { year: 1745 },
                { year: 1750 },
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.TIMELINE_INIT,
            year: 1675,
            zoom: 1,
            partitionCount: 30
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper zoom out - test 1', () => {
    it('it should switch from five to ten years scope', () => {
        const stateBefore = {
            year: 1424,
            zoom: 1,
            partitionCount: 9,
            partitions: [
                { year: 1400 },
                { year: 1405 },
                { year: 1410 },
                { year: 1415 },
                { year: 1420 },
                { year: 1425 },
                { year: 1430 },
                { year: 1435 },
                { year: 1440 }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 2,
            partitionCount: 9,
            partitions: [
                { year: 1380 },
                { year: 1390 },
                { year: 1400 },
                { year: 1410 },
                { year: 1420 },
                { year: 1430 },
                { year: 1440 },
                { year: 1450 },
                { year: 1460 }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_ZOOM_OUT
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper zoom in - test 1', () => {
    it('it should switch from five to one year scope', () => {
        const stateBefore = {
            year: 1424,
            zoom: 1,
            partitionCount: 3,
            partitions: [
                { year: 1415 },
                { year: 1420 },
                { year: 1425 }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 0,
            partitionCount: 3,
            partitions: [
                { year: 1423 },
                { year: 1424 },
                { year: 1425 }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_ZOOM_IN
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper zoom in - test 2', () => {
    it('it should not zoom in because one year scope is max detail', () => {
        const stateBefore = {
            year: 1424,
            zoom: 0,
            partitionCount: 3,
            partitions: [
                { year: 1423 },
                { year: 1424 },
                { year: 1425 }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 0,
            partitionCount: 3,
            partitions: [
                { year: 1423 },
                { year: 1424 },
                { year: 1425 }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_ZOOM_IN
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper change era - test 1', () => {
    it('it should recalculate years', () => {
        const stateBefore = {
            year: 1424,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1380 },
                { year: 1400 },
                { year: 1420 },
                { year: 1440 },
                { year: 1460 }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1555,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1500 },
                { year: 1520 },
                { year: 1540 },
                { year: 1560 },
                { year: 1580 }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_ENTERED,
            year: 1555
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper next range - test 1', () => {
    it('it should move range to next 5 decades', () => {
        const stateBefore = {
            year: 1424,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1380 },
                { year: 1400 },
                { year: 1420 },
                { year: 1440 },
                { year: 1460 }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1444,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1400 },
                { year: 1420 },
                { year: 1440 },
                { year: 1460 },
                { year: 1480 }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_PLUS
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper prev range - test 1', () => {
    it('it should move range to previous 5 decades', () => {
        const stateBefore = {
            year: 1444,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1400 },
                { year: 1420 },
                { year: 1440 },
                { year: 1460 },
                { year: 1480 }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1380 },
                { year: 1400 },
                { year: 1420 },
                { year: 1440 },
                { year: 1460 }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_MINUS
        })).toEqual(stateAfter);
    });
});
