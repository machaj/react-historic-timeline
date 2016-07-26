import expect from 'expect';
import deepFreeze from 'deep-freeze';

import * as actionNames from '../src/timelineActionTypes.js';
import timelineReducer from '../src/timelineReducer.js';

describe('Timeline initialization - test 1', () => {
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

describe('Timeline initialization - test 2', () => {
    it('it should return initialized timeline with nine years', () => {
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

describe('Timeline zoom out - test 1', () => {
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

describe('Timeline zoom in - test 1', () => {
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

describe('Timeline zoom in - test 2', () => {
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

describe('Timeline change era - test 1', () => {
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

describe('Timeline next range - test 1', () => {
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

describe('Timeline prev range - test 1', () => {
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
