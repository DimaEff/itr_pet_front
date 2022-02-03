import {Image} from "../../types";
import {CreateEventTypeDto} from "./dto/create-event-type.dto";


export interface IEventType extends CreateEventTypeDto{
    _id: string;
    icon: Image;
}