import {makeAutoObservable} from "mobx";
import {io, Socket} from "socket.io-client";

import {IMessage} from "./types";
import {CreateMessageDto} from "./dto/createMessage.dto";


class EventChat {
    private baseUrl: string;
    private socket: Socket | null = null;

    messages: IMessage[] = [];
    connected: boolean = false;

    constructor() {
        this.baseUrl = process.env.REACT_APP_SERVER_WS + '/event-chat';
        makeAutoObservable(this);
    }

    subscribe = (event_id: string) => {
        const jwt_token = localStorage.getItem('auth0_token');
        this.socket = io(this.baseUrl, {query: {jwt_token, event_id}}).connect();
        this.connected = true;
        this.socket.on('events-chat.connected', this.setMessages);
        this.socket.on('events-chat.changed', this.setMessages);
    }

    unsubscribe = () => {
        this.socket?.disconnect();
        this.connected = false;
    }

    message = (dto: CreateMessageDto) => {
        this.socket?.emit('event-chat.message', dto);
    }

    private setMessages = (messages: IMessage[]) => {
        this.messages = messages;
        console.log(this.messages);
    }
}

export default new EventChat();