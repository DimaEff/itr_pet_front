import {makeAutoObservable} from "mobx";
import {io, Socket} from "socket.io-client";

import {IMessage} from "./types";
import {CreateMessageDto} from "./dto/createMessage.dto";


// class EventChat {
//     private baseUrl: string;
//     private socket: Socket | null = null;
//
//     messages: IMessage[] = [];
//     connected: boolean = false;
//
//     constructor() {
//         this.baseUrl = process.env.REACT_APP_SERVER_WS + '/event-chat';
//         makeAutoObservable(this);
//     }
//
//     subscribe = async (eventId: string) => {
//         const jwt_token = localStorage.getItem('auth0_token');
//         this.socket = io(this.baseUrl, {query: {jwt_token}}).connect();
//         this.socket.emit('events-chat.join', eventId);
//         this.connected = true;
//         this.socket.on('events-chat.joined', this.setMessages);
//         this.socket.on('events-chat.changed', this.setMessages);
//     }
//
//     unsubscribe = () => {
//         this.socket?.disconnect();
//         this.connected = false;
//     }
//
//     message = (dto: CreateMessageDto) => {
//         this.socket?.emit('event-chat.message', dto);
//     }
//
//     private setMessages = (messages: IMessage[]) => {
//         this.messages = messages;
//         console.log('eventChat', this.messages);
//     }
// }

class EventChat {
    private baseUrl: string;
    private socket: Socket | null = null;

    messages: IMessage[] = [];
    connected: boolean = false;

    constructor() {
        this.baseUrl = process.env.REACT_APP_SERVER_WS + '/event-chat';
        makeAutoObservable(this);
    }

    subscribe = async (eventId: string) => {
        const jwt_token = localStorage.getItem('auth0_token');
        this.socket = io(this.baseUrl, {query: {jwt_token}}).connect();
        this.socket.emit('events-chat.join', eventId);
        this.connected = true;
        this.socket.on('events-chat.joined', this.setMessages);
        this.socket.on('events-chat.changed', this.setMessages);
    }

    unsubscribe = () => {
        this.socket?.disconnect();
        this.connected = false;
    }

    message = (dto: CreateMessageDto) => {
        this.socket?.emit('events-chat.message', dto);
    }

    private setMessages = (messages: IMessage[]) => {
        this.messages = messages;
        console.log('eventChat', this.messages);
    }
}

export default new EventChat();