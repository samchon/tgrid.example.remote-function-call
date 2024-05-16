import { WebSocketServer } from "tgrid";

import { Calculator } from "./Calculator";

export const webSocketServerMain = async () => {
  const server: WebSocketServer<
    null, // header
    Calculator, // provider for remote client
    null // provider from remote client
  > = new WebSocketServer();
  await server.open(37_000, async (acceptor) => {
    const provider: Calculator = new Calculator();
    await acceptor.accept(provider);
  });
  return server;
};
