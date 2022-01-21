export interface CreateEventForm {
    title: string;
    description: string;
    type: string;
    startDate?: Date;
    endDate: Date;
}

export interface CreateEventDto extends CreateEventForm{
    files: File[];
    lat: number;
    lng: number;
}