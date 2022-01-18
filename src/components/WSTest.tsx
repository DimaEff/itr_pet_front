import React, {useRef, useState} from 'react';
import {io, Socket} from 'socket.io-client';

const WsTest = () => {
    const [connected, setConnected] = useState(false);

    const socket = useRef<Socket>();

    const connect = () => {
        socket.current = io('ws://localhost:5001/cats').connect();
        setConnected(true);

        socket.current.on('catsConnect', (e) => console.log(e));

        socket.current.on('catAdded', (e) => console.log(e));
    }

    const [name, setName] = useState('');
    const [age, setAge] = useState<number>(0);
    const [breed, setBreed] = useState('');

    const handleMessage = () => {
        if (!socket.current || !connected) {
            return
        }

        socket.current.emit('addCat', {name, age, breed});
    }

    return (
        <div>
            {
                connected ?
                    <>
                        <div>
                            connected
                        </div>
                        <input value={name} onChange={e => setName(e.target.value)} placeholder={'name'} type="text"/>
                        <input value={age} onChange={e => setAge(+e.target.value)} placeholder={'age'} type="text"/>
                        <input value={breed} onChange={e => setBreed(e.target.value)} placeholder={'breed'} type="text"/>
                        <button onClick={handleMessage}>Add cat</button>
                    </> :
                    <>
                        not connected
                        <button onClick={connect}>Connect</button>
                    </>
            }
        </div>
    );
};

export default WsTest;