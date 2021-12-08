import {Position} from 'google-map-react';


export type EventsTypes = 'music' | 'food' | 'art' | 'other';

export interface Event {
    position: Position;
    type: EventsTypes;
    img?: string;
    description?: string;
    creatorEmail: string;
    createdAt: string;
}