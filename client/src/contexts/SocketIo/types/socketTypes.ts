export interface ServerToClientEvents {
  MsgToClient: (data: { msg: string }) => void;
}

export interface ClientToServerEvents {
  MsgToServer: ({ msg }: { msg: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
