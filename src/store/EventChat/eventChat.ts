import {action, makeObservable, observable} from "mobx";

import {IMessage} from "./types";
import {CreateMessageDto} from "./dto/createMessage.dto";
import {WebSocket} from "../WebSocket";


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