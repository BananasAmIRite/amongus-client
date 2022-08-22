import {
  ClientAmongusPayloadType,
  ClientMessageType,
  ServerAmongusPayloadType,
  ServerMessageType,
} from 'amongus-types';
import { Socket } from 'socket.io-client';

type Method<T> = (a: T) => void;

export type ServerListenerMap = {
  [Property in ServerMessageType]: Method<ServerAmongusPayloadType[Property]>;
};

export type ClientListenerMap = {
  [Property in ClientMessageType]: Method<ClientAmongusPayloadType[Property]>;
};

export type AmongusSocket = Socket<ServerListenerMap, ClientListenerMap>;
