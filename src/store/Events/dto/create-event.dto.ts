export interface CreateEventDto {
    readonly title: string;
    readonly description: string;
    readonly type: string;
    readonly lat: number;
    readonly lng: number;
}