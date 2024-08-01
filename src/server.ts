import { WebSocketServer } from "tgrid";

export const webSocketServerMain = async () => {
  const server: WebSocketServer<
    null, // header
    Calculator, // provider for remote client
    null // provider from remote client
  > = new WebSocketServer();
  await server.open(37_000, async (acceptor) => {
    const provider: Calculator = new Calculator();
    await acceptor.accept(provider);
    acceptor.ping(15_000);
  });
  return server;
};

class Calculator {
  public plus(x: number, y: number): number {
    return x + y;
  }
  public minus(x: number, y: number): number {
    return x - y;
  }
  public multiply(x: number, y: number): number {
    return x * y;
  }
  public divide(x: number, y: number): number {
    return x / y;
  }
}
