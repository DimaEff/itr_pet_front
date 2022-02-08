import {action, makeAutoObservable, makeObservable, observable} from "mobx";
import {io, Socket} from "socket.io-client";

import {IMessage} from "./types";
import {CreateMessageDto} from "./dto/createMessage.dto";
import {WebSocket} from "../WebSocket";


// class EventChat {
//     private baseUrl: string;
//     private socket: Socket | null = null;
//
//     messages: IMessage[] = [];
//     connect: boolean = false;
//
//     constructor() {
//         this.baseUrl = process.env.REACT_APP_SERVER_WS + '/event-chat';
//         makeAutoObservable(this);
//     }
//
//     subscribe = async (eventId: string) => {
//         const jwt_token = localStorage.getItem('auth0_token');
//         this.socket = io(this.baseUrl, {query: {jwt_token}}).connect();
//         this.socket.emit('events-chat.connect', eventId);
//         this.connect = true;
//         this.socket.on('events-chat.connected', this.setMessages);
//         this.socket.on('events-chat.changed', this.setMessages);
//     }
//
//     unsubscribe = () => {
//         this.socket?.disconnect();
//         this.connect = false;
//     }
//
//     message = (dto: CreateMessageDto) => {
//         this.socket?.emit('events-chat.message', dto);
//     }
//
//     private setMessages = (messages: IMessage[]) => {
//         this.messages = messages;
//         console.log('eventChat', this.messages);
//     }
// }

class EventChat extends WebSocket {
    messages: IMessage[] = [];

    constructor() {
        super({
            socketName: 'events-chat',
            onChange: (data) => this._setMessages(data),
        });
        makeObservable(this, {
            messages: observable,
            message: action,
            _setMessages: action,
        });
    }

    message = (dto: CreateMessageDto) => {
        this._socket?.emit(this._getSubscribeMessage('message'), dto);
    }

    _setMessages = (messages: IMessage[]) => {
        console.log('messages', messages);
        this.messages = messages;
    }
}

export default new EventChat();