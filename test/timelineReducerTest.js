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
                { year: 1422, isAnniversary: false, isSelected: false },
                { year: 1423, isAnniversary: false, isSelected: false },
                { year: 1424, isAnniversary: false, isSelected: true },
                { year: 1425, isAnniversary: true, isSelected: false },
                { year: 1426, isAnniversary: false, isSelected: false }
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
                { year: 1400, isAnniversary: true, isSelected: false },
                { year: 1405, isAnniversary: false, isSelected: false },
                { year: 1410, isAnniversary: false, isSelected: false },
                { year: 1415, isAnniversary: false, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: true },
                { year: 1425, isAnniversary: true, isSelected: false },
                { year: 1430, isAnniversary: false, isSelected: false },
                { year: 1435, isAnniversary: false, isSelected: false },
                { year: 1440, isAnniversary: false, isSelected: false }
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
                { year: 1600, isAnniversary: true, isSelected: false },
                { year: 1605, isAnniversary: false, isSelected: false },
                { year: 1610, isAnniversary: false, isSelected: false },
                { year: 1615, isAnniversary: false, isSelected: false },
                { year: 1620, isAnniversary: false, isSelected: false },
                { year: 1625, isAnniversary: true, isSelected: false },
                { year: 1630, isAnniversary: false, isSelected: false },
                { year: 1635, isAnniversary: false, isSelected: false },
                { year: 1640, isAnniversary: false, isSelected: false },
                { year: 1645, isAnniversary: false, isSelected: false },
                { year: 1650, isAnniversary: true, isSelected: false },
                { year: 1655, isAnniversary: false, isSelected: false },
                { year: 1660, isAnniversary: false, isSelected: false },
                { year: 1665, isAnniversary: false, isSelected: false },
                { year: 1670, isAnniversary: false, isSelected: false },
                { year: 1675, isAnniversary: true, isSelected: true },
                { year: 1680, isAnniversary: false, isSelected: false },
                { year: 1685, isAnniversary: false, isSelected: false },
                { year: 1690, isAnniversary: false, isSelected: false },
                { year: 1695, isAnniversary: false, isSelected: false },
                { year: 1700, isAnniversary: true, isSelected: false },
                { year: 1705, isAnniversary: false, isSelected: false },
                { year: 1710, isAnniversary: false, isSelected: false },
                { year: 1715, isAnniversary: false, isSelected: false },
                { year: 1720, isAnniversary: false, isSelected: false },
                { year: 1725, isAnniversary: true, isSelected: false },
                { year: 1730, isAnniversary: false, isSelected: false },
                { year: 1735, isAnniversary: false, isSelected: false },
                { year: 1740, isAnniversary: false, isSelected: false },
                { year: 1745, isAnniversary: false, isSelected: false },
                { year: 1750, isAnniversary: true, isSelected: false }
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
                { year: 1400, isAnniversary: true, isSelected: false },
                { year: 1405, isAnniversary: false, isSelected: false },
                { year: 1410, isAnniversary: false, isSelected: false },
                { year: 1415, isAnniversary: false, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: true },
                { year: 1425, isAnniversary: true, isSelected: false },
                { year: 1430, isAnniversary: false, isSelected: false },
                { year: 1435, isAnniversary: false, isSelected: false },
                { year: 1440, isAnniversary: false, isSelected: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 2,
            partitionCount: 9,
            partitions: [
                { year: 1380, isAnniversary: false, isSelected: false },
                { year: 1390, isAnniversary: false, isSelected: false },
                { year: 1400, isAnniversary: true, isSelected: false },
                { year: 1410, isAnniversary: false, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: true },
                { year: 1430, isAnniversary: false, isSelected: false },
                { year: 1440, isAnniversary: false, isSelected: false },
                { year: 1450, isAnniversary: true, isSelected: false },
                { year: 1460, isAnniversary: false, isSelected: false }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_ZOOM_OUT
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper zoom out - test 2', () => {
    it('it should not zoom out when zoom is at minimum detail', () => {
        const stateBefore = {
            year: 1424,
            zoom: 6,
            partitionCount: 3,
            partitions: [
                { year: 1300, isAnniversary: false, isSelected: false },
                { year: 1400, isAnniversary: false, isSelected: true },
                { year: 1500, isAnniversary: true, isSelected: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 6,
            partitionCount: 3,
            partitions: [
                { year: 1300, isAnniversary: false, isSelected: false },
                { year: 1400, isAnniversary: false, isSelected: true },
                { year: 1500, isAnniversary: true, isSelected: false }
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
                { year: 1415, isAnniversary: false, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: true },
                { year: 1425, isAnniversary: true, isSelected: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 0,
            partitionCount: 3,
            partitions: [
                { year: 1423, isAnniversary: false, isSelected: false },
                { year: 1424, isAnniversary: false, isSelected: true },
                { year: 1425, isAnniversary: true, isSelected: false }
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
                { year: 1423, isAnniversary: false, isSelected: false },
                { year: 1424, isAnniversary: false, isSelected: true },
                { year: 1425, isAnniversary: true, isSelected: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 0,
            partitionCount: 3,
            partitions: [
                { year: 1423, isAnniversary: false, isSelected: false },
                { year: 1424, isAnniversary: false, isSelected: true },
                { year: 1425, isAnniversary: true, isSelected: false }
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
                { year: 1380, isAnniversary: false, isSelected: false },
                { year: 1400, isAnniversary: true, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: true },
                { year: 1440, isAnniversary: false, isSelected: false },
                { year: 1460, isAnniversary: false, isSelected: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1555,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1500, isAnniversary: true, isSelected: false },
                { year: 1520, isAnniversary: false, isSelected: false },
                { year: 1540, isAnniversary: false, isSelected: true },
                { year: 1560, isAnniversary: false, isSelected: false },
                { year: 1580, isAnniversary: false, isSelected: false }
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
                { year: 1380, isAnniversary: false, isSelected: false },
                { year: 1400, isAnniversary: true, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: true },
                { year: 1440, isAnniversary: false, isSelected: false },
                { year: 1460, isAnniversary: false, isSelected: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1444,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1400, isAnniversary: true, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: false },
                { year: 1440, isAnniversary: false, isSelected: true },
                { year: 1460, isAnniversary: false, isSelected: false },
                { year: 1480, isAnniversary: false, isSelected: false }
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
                { year: 1400, isAnniversary: true, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: false },
                { year: 1440, isAnniversary: false, isSelected: true },
                { year: 1460, isAnniversary: false, isSelected: false },
                { year: 1480, isAnniversary: false, isSelected: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1380, isAnniversary: false, isSelected: false },
                { year: 1400, isAnniversary: true, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: true },
                { year: 1440, isAnniversary: false, isSelected: false },
                { year: 1460, isAnniversary: false, isSelected: false }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_MINUS
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper selected year - test 1', () => {
    it('it should move range to previous 5 decades', () => {
        const stateBefore = {
            year: 1444,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1400, isAnniversary: true, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: false },
                { year: 1440, isAnniversary: false, isSelected: true },
                { year: 1460, isAnniversary: false, isSelected: false },
                { year: 1480, isAnniversary: false, isSelected: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { year: 1380, isAnniversary: false, isSelected: false },
                { year: 1400, isAnniversary: true, isSelected: false },
                { year: 1420, isAnniversary: false, isSelected: true },
                { year: 1440, isAnniversary: false, isSelected: false },
                { year: 1460, isAnniversary: false, isSelected: false }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_MINUS
        })).toEqual(stateAfter);
    });
});

