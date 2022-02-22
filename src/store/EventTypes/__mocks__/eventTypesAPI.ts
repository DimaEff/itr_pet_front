import { IEventType } from "../types";

class EventTypesAPI {
    eventTypes: IEventType[] = [
        {
            _id: '123',
            value: 'value',
            icon: {
                filename: '123',
                path: '123',
            },
            title: '123',
        },
        {
            _id: '1233',
            value: 'value',
            icon: {
                filename: '123',
                path: '123',
            },
            title: '123',
        },
    ];

    async getAllEventTypes(): Promise<{data: any}> {
        return new Promise((resolve) => {
            process.nextTick(() => resolve({data: this.eventTypes}));
        });
    }
}

export default new EventTypesAPI();