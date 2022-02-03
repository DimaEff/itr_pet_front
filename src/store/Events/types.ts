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
}