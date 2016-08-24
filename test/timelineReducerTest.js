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
                { index: -2, year: 1420, isAnniversary: true, isSelected: false, isVisible: false },
                { index: -1, year: 1421, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1422, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 1, year: 1423, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 2, year: 1424, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 3, year: 1425, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 4, year: 1426, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 5, year: 1427, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 6, year: 1428, isAnniversary: false, isSelected: false, isVisible: false }
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
    it('it should return initialized timeline with nine visible partition', () => {
        const stateBefore = {};
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 1,
            partitionCount: 9,
            partitions: [
                { index: -4, year: 1380, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -3, year: 1385, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -2, year: 1390, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -1, year: 1395, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1400, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 1, year: 1405, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 2, year: 1410, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 3, year: 1415, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 4, year: 1420, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 5, year: 1425, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 6, year: 1430, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 7, year: 1435, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 8, year: 1440, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 9, year: 1445, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 10, year: 1450, isAnniversary: true, isSelected: false, isVisible: false },
                { index: 11, year: 1455, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 12, year: 1460, isAnniversary: false, isSelected: false, isVisible: false }
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
                { index: -15, year: 1525, isAnniversary: true, isSelected: false, isVisible: false },
                { index: -14, year: 1530, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -13, year: 1535, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -12, year: 1540, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -11, year: 1545, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -10, year: 1550, isAnniversary: true, isSelected: false, isVisible: false },
                { index: -9, year: 1555, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -8, year: 1560, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -7, year: 1565, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -6, year: 1570, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -5, year: 1575, isAnniversary: true, isSelected: false, isVisible: false },
                { index: -4, year: 1580, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -3, year: 1585, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -2, year: 1590, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -1, year: 1595, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1600, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 1, year: 1605, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 2, year: 1610, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 3, year: 1615, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 4, year: 1620, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 5, year: 1625, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 6, year: 1630, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 7, year: 1635, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 8, year: 1640, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 9, year: 1645, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 10, year: 1650, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 11, year: 1655, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 12, year: 1660, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 13, year: 1665, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 14, year: 1670, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 15, year: 1675, isAnniversary: true, isSelected: true, isVisible: true },
                { index: 16, year: 1680, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 17, year: 1685, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 18, year: 1690, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 19, year: 1695, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 20, year: 1700, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 21, year: 1705, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 22, year: 1710, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 23, year: 1715, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 24, year: 1720, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 25, year: 1725, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 26, year: 1730, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 27, year: 1735, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 28, year: 1740, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 29, year: 1745, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 30, year: 1750, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 31, year: 1755, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 32, year: 1760, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 33, year: 1765, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 34, year: 1770, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 35, year: 1775, isAnniversary: true, isSelected: false, isVisible: false },
                { index: 36, year: 1780, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 37, year: 1785, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 38, year: 1790, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 39, year: 1795, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 40, year: 1800, isAnniversary: true, isSelected: false, isVisible: false },
                { index: 41, year: 1805, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 42, year: 1810, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 43, year: 1815, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 44, year: 1820, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 45, year: 1825, isAnniversary: true, isSelected: false, isVisible: false }
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
                { index: -4, year: 1380, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -3, year: 1385, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -2, year: 1390, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -1, year: 1395, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1400, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 1, year: 1405, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 2, year: 1410, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 3, year: 1415, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 4, year: 1420, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 5, year: 1425, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 6, year: 1430, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 7, year: 1435, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 8, year: 1440, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 9, year: 1445, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 10, year: 1450, isAnniversary: true, isSelected: false, isVisible: false },
                { index: 11, year: 1455, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 12, year: 1460, isAnniversary: false, isSelected: false, isVisible: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 2,
            partitionCount: 9,
            partitions: [
                { index: -4, year: 1340, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -3, year: 1350, isAnniversary: true, isSelected: false, isVisible: false },
                { index: -2, year: 1360, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -1, year: 1370, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1380, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 1, year: 1390, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 2, year: 1400, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 3, year: 1410, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 4, year: 1420, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 5, year: 1430, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 6, year: 1440, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 7, year: 1450, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 8, year: 1460, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 9, year: 1470, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 10, year: 1480, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 11, year: 1490, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 12, year: 1500, isAnniversary: true, isSelected: false, isVisible: false }
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
                { index: -1, year: 1200, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1300, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 1, year: 1400, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 2, year: 1500, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 3, year: 1600, isAnniversary: false, isSelected: false, isVisible: false }
            ]
        };
        deepFreeze(stateBefore);

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_ZOOM_OUT
        })).toEqual(stateBefore);
    });
});

describe('TimelineWrapper zoom in - test 1', () => {
    it('it should switch from five to one year scope', () => {
        const stateBefore = {
            year: 1424,
            zoom: 1,
            partitionCount: 3,
            partitions: [
                { index: -1, year: 1410, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1415, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 1, year: 1420, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 2, year: 1425, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 3, year: 1430, isAnniversary: false, isSelected: false, isVisible: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 0,
            partitionCount: 3,
            partitions: [
                { index: -1, year: 1422, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1423, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 1, year: 1424, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 2, year: 1425, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 3, year: 1426, isAnniversary: false, isSelected: false, isVisible: false }
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
                { index: -1, year: 1422, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1423, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 1, year: 1424, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 2, year: 1425, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 3, year: 1426, isAnniversary: false, isSelected: false, isVisible: false }
            ]
        };
        deepFreeze(stateBefore);

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_ZOOM_IN
        })).toEqual(stateBefore);
    });
});

describe('TimelineWrapper change era - test 1', () => {
    it('it should recalculate years', () => {
        const stateBefore = {
            year: 1424,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { index: -2, year: 1340, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -1, year: 1360, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1380, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 1, year: 1400, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 2, year: 1420, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 3, year: 1440, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 4, year: 1460, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 5, year: 1480, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 6, year: 1500, isAnniversary: true, isSelected: false, isVisible: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1555,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { index: -2, year: 1460, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -1, year: 1480, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1500, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 1, year: 1520, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 2, year: 1540, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 3, year: 1560, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 4, year: 1580, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 5, year: 1600, isAnniversary: true, isSelected: false, isVisible: false },
                { index: 6, year: 1620, isAnniversary: false, isSelected: false, isVisible: false }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_ENTERED,
            year: 1555
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper next range - test 1', () => {
    it('it should move range to next 2 decades', () => {
        const stateBefore = {
            year: 1424,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { index: -2, year: 1340, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -1, year: 1360, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1380, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 1, year: 1400, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 2, year: 1420, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 3, year: 1440, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 4, year: 1460, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 5, year: 1480, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 6, year: 1500, isAnniversary: true, isSelected: false, isVisible: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1444,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { index: -2, year: 1360, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -1, year: 1380, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1400, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 1, year: 1420, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 2, year: 1440, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 3, year: 1460, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 4, year: 1480, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 5, year: 1500, isAnniversary: true, isSelected: false, isVisible: false },
                { index: 6, year: 1520, isAnniversary: false, isSelected: false, isVisible: false }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_PLUS
        })).toEqual(stateAfter);
    });
});

describe('TimelineWrapper prev range - test 1', () => {
    it('it should move range to previous 2 decades', () => {
        const stateBefore = {
            year: 1444,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { index: -2, year: 1360, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -1, year: 1380, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1400, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 1, year: 1420, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 2, year: 1440, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 3, year: 1460, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 4, year: 1480, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 5, year: 1500, isAnniversary: true, isSelected: false, isVisible: false },
                { index: 6, year: 1520, isAnniversary: false, isSelected: false, isVisible: false }
            ]
        };
        deepFreeze(stateBefore);

        const stateAfter = {
            year: 1424,
            zoom: 3,
            partitionCount: 5,
            partitions: [
                { index: -2, year: 1340, isAnniversary: false, isSelected: false, isVisible: false },
                { index: -1, year: 1360, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 0, year: 1380, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 1, year: 1400, isAnniversary: true, isSelected: false, isVisible: true },
                { index: 2, year: 1420, isAnniversary: false, isSelected: true, isVisible: true },
                { index: 3, year: 1440, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 4, year: 1460, isAnniversary: false, isSelected: false, isVisible: true },
                { index: 5, year: 1480, isAnniversary: false, isSelected: false, isVisible: false },
                { index: 6, year: 1500, isAnniversary: true, isSelected: false, isVisible: false }
            ]
        };

        expect(timelineReducer(stateBefore, {
            type: actionNames.ERA_MINUS
        })).toEqual(stateAfter);
    });
});
