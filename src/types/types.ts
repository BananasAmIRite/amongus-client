import {
  ClientAmongusPayloadType,
  ClientMessageType,
  ServerAmongusPayloadType,
  ServerMessageType,
} from 'amongus-types';
import { Socket } from 'socket.io-client';

type Method<T> = (a: T) => void;

type ServerMap = {
  [Property in ServerMessageType]: Method<ServerAmongusPayloadType[Property]>;
};

type ClientMap = {
  [Property in ClientMessageType]: Method<ClientAmongusPayloadType[Property]>;
};

export type AmongusSocket = Socket<ServerMap, ClientMap>;
