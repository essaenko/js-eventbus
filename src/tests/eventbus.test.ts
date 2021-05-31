import { Eventbus, EventBusEvent } from '../eventbus';
import { IEventBusEventListener } from '../eventbus.types';

const bus = new Eventbus();

test('Should add new event listener', (): void => {
  const eventListener: IEventBusEventListener = (): void => void 0;
  bus.addEventListener('test1', eventListener);
  expect(bus._listeners('test1').has(eventListener)).toBe(true);
});

test('Should remove event listener', (): void => {
  const eventListener: IEventBusEventListener = (): void => void 0;
  bus.addEventListener('test2', eventListener);
  expect(bus._listeners('test2').has(eventListener)).toBe(true);
  bus.removeEventListener('test2', eventListener);
  expect(bus._listeners('test2').has(eventListener)).toBe(false);
});

test('Shouldn\'t remove event listener', (): void => {
  const eventListener: IEventBusEventListener = (): void => void 0;
  const result: boolean = bus.removeEventListener('removeEvent', eventListener);
  expect(result).toBeFalsy();
  expect(bus._listeners('removeEvent')).toBe(null);
});

test('Should call dispatched listener on single listener', (): void => {
  const jestCallback: jest.Mock = jest.fn();
  const eventListener: IEventBusEventListener = (): void => {
    new Promise((resolve): void => {
      jestCallback();
      resolve(true);
    }).then((): void => {
      expect(jestCallback).toBeCalledTimes(1);
    })
  };
  bus.addEventListener('test3', eventListener);
  bus.dispatchEvent(new EventBusEvent('test3'));
});

test('Should call dispatched listener on multiple listeners', (): void => {
  const jestCallback: jest.Mock = jest.fn();
  const getListener = (): IEventBusEventListener => (): void => {
    new Promise((resolve) => {
      jestCallback();
      resolve(true);
    }).then(() => {
      expect(jestCallback).toBeCalledTimes(3);
    })
  };
  bus.addEventListener('test4', getListener());
  bus.addEventListener('test4', getListener());
  bus.addEventListener('test4', getListener());
  bus.dispatchEvent(new EventBusEvent('test4'));
});