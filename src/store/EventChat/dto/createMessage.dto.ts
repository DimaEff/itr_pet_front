export interface CreateMessageForm {
    message: string;
}

export interface CreateMessageDto extends CreateMessageForm {
    eid: string;
    uid: string;
}