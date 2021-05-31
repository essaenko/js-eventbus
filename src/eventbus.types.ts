import { EventBusEvent } from './eventbus';

export type EventBusEventInit = EventInit & {
  target: any;
}

export type IEventBusEventListener = (event: Event | EventBusEvent) => void;

export type IEventbusEvent = Event | EventBusEvent;