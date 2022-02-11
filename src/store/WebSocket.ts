import {io, Socket} from "socket.io-client";
import {SocketOptions} from "engine.io-client/build/esm/socket";
import {action, makeObservable, observable} from "mobx";


interface IWebSocket {
    socketName: string;
    socketOptions?: SocketOptions;
    onChange: (data?: any) => void;
    onConnect?: (data?: any) => void;
}

export class WebSocket {
    _socket: Socket | null = null;
    connect: boolean = false;
    pending: boolean = false;

    private readonly _baseUrl: string;
    private readonly _socketName: string;
    private readonly _socketOptions?: SocketOptions
    readonly _handleChange: (data?: any) => void;
    readonly _handleConnect?: (date?: any) => void;

    constructor({socketName, socketOptions, onChange, onConnect}: IWebSocket) {
        this._baseUrl = `${process.env.REACT_APP_SERVER_WS}/${socketName}`;
        this._socketName = socketName;
        this._socketOptions = socketOptions;
        this._handleChange = (data: any) => {
            onChange(data);
            this.pending = false;
        };
        this._handleConnect = onConnect;

        makeObservable(this, {
            _socket: observable,
            connect: observable,
            pending: observable,
            _handleChange: action,
            // _handleConnect: this._handleConnect ? action :flow,
            subscribe: action,
            unsubscribe: action,
        });
    }

    subscribe = (connectData?: any) => {
        const jwt_token = localStorage.getItem('auth0_token');
        this._socket = io(this._baseUrl, {query: {jwt_token}}).connect();
        this.pending = true;
        this._socket.emit(this._getSubscribeMessage('connect'), connectData);
        this.connect = true;
        this._socket.on(this._getSubscribeMessage('connected'), this._handleConnect || this._handleChange);
        this._socket.on(this._getSubscribeMessage('changed'), this._handleChange);
    }

    unsubscribe = () => {
        this._socket?.disconnect();
        this._socket = null;
        this.connect = false;
    }

    _getSubscribeMessage = (pointName: string): string => `${this._socketName}.${pointName}`;
}