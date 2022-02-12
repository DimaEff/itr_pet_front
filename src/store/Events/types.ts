import {Position} from 'google-map-react';

import {IEventType} from "../EventTypes/types";
import {Image} from "../../types";


export interface IEvent extends Position {
    _id: string;
    title: string;
    description?: string;
    uid: string;
    type: IEventType;
    images: Image[];
    startDate: string;
    endDate: string;
    likes: string[];
    reports: string[];
}

export interface ILikeOrReport {
    uid: string;
    eid: string;
}

export const eventFilters = ['byLikes', 'validDate'] as const;
export type EventFilters = typeof eventFilters[number];