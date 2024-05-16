import { Driver, WebSocketConnector } from "tgrid";

export const webSocketClientMain = async () => {
  const connector: WebSocketConnector<null, null, ICalculator> =
    new WebSocketConnector(
      null, // header
      null, // provider for remote server
    );
  await connector.connect("ws://127.0.0.1:37000/composite");

  const remote: Driver<ICalculator> = connector.getDriver();
  console.log(
    await remote.plus(10, 20), // returns 30
    await remote.minus(7, 3), // returns 4
    await remote.multiply(3, 4), // returns 12
    await remote.divide(5, 2), // returns 2.5
  );

  await connector.close();
};

interface ICalculator {
  plus(a: number, b: number): number;
  minus(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}
