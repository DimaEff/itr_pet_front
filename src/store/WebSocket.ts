import {Socket} from "socket.io-client";
import {makeAutoObservable} from "mobx";


class WebSocket {
    // private baseUrl = process.env.REACT_APP_SERVER_WS_EVENTS + '/event-chat';
    socket: Socket | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    subscribe = () => {

    }
}

export default new WebSocket();