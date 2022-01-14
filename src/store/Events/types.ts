import {Position} from 'google-map-react';
import {EventType} from "../EventTypes/types";
import {Image} from "../../types";


export interface Event extends Position{
    type: EventType;
    img: Image;
    description?: string;
    creator: string;
    createdAt: string;
}