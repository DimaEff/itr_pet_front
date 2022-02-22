import { faker } from "@faker-js/faker";
import { Coords } from "google-map-react";

import { Image } from "../types";
import { IEvent, IEventType } from "../store";


const generateImage = (): Image => ({
    path: faker.image.imageUrl(),
    filename: faker.datatype.uuid(),
});
export const generateFakerImage = createMultipleGenerator<Image>(generateImage);

const generateEventType = (): IEventType => ({
    _id: generateId(),
    title: faker.name.title(),
    value: faker.datatype.string(),
    icon: generateFakerImage(),
});
const generateFakerEventType = createMultipleGenerator<IEventType>(generateEventType);

const generateEvent = (): IEvent => ({
    _id: generateId(),
    uid: generateId(),
    title: faker.name.title(),
    endDate: generateDateString(),
    startDate: generateDateString(),
    likes: [faker.datatype.uuid()],
    reports: [faker.datatype.uuid()],
    type: generateFakerEventType(),
    images: [generateFakerImage()],
    description: faker.datatype.string(),
    weight: faker.datatype.number({min: 1, max: 12}),
    ...generateCoords(),
});
export const generateFakerEvent = createMultipleGenerator<IEvent>(generateEvent);

const generateCoords = (): Coords => ({
    lng: faker.datatype.number({min: 0, max: 100}),
    lat: faker.datatype.number({min: 0, max: 100}),
});
const generateDateString = () => faker.date.future().toDateString();
const generateId = (): string => faker.datatype.uuid();

function createMultipleGenerator<T>(generator: () => T) {
    function a(): T;
    function a(count: number): T[];
    function a(count?: number) {
        if (!count) {
            return generator();
        }

        return [...Array(count)].map(generator);
    }

    return a;
}