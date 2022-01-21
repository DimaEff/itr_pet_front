import {Position} from 'google-map-react';

import {EventType} from "../EventTypes/types";
import {Image} from "../../types";


export interface Event extends Position{
    _id: string;
    title: string;
    description?: string;
    creator: string;
    createdAt: string;
    type: EventType;
    images: Image[];
}