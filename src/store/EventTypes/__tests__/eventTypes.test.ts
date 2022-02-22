import { EventTypes } from "../eventTypes";

jest.mock('../eventTypesAPI');

describe('Event types store', () => {
    let store = {} as EventTypes;
    beforeEach(() => {
        store = new EventTypes();
    });

    it('getAllEventTypes should set event types', async () => {
        expect(store.eventTypes).not.toBeUndefined();
        expect(store.eventTypes).not.toBeNull();
        expect(store.eventTypes).toHaveLength(0);

        await store.fetchEventTypes();

        expect(store.eventTypes).not.toBeUndefined();
        expect(store.eventTypes).not.toBeNull();
        expect(store.eventTypes.length).toBeGreaterThan(0);
    });
});