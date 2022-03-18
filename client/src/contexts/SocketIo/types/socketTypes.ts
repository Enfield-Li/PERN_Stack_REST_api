// on
export interface ServerToClientEvents {
  MsgToClient: (data: helloWorld) => void;
}

// emit
export interface ClientToServerEvents {
  MsgToServer: (data: helloWorld) => void;
  login: (userId: number | undefined) => void;
}

type helloWorld = {
  msg: string;
};
