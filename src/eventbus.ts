import { EventBusEventInit, IEventBusEventListener, IEventbusEvent } from './eventbus.types';

export class Eventbus {
  private listeners = new Map();
  
  public addEventListener = (event: string, handler: IEventBusEventListener): void => {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    this.listeners.get(event).add(handler);
  }
  
  public removeEventListener = (event: string, handler: IEventBusEventListener): boolean => {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(handler);
      
      return true;
    }
    
    return false;
  }
  
  public dispatchEvent = (event: IEventbusEvent): void => {
    if (this.listeners.has(event.type)) {
      const eventListeners: Set<IEventBusEventListener> = this.listeners.get(event.type);
      for (let listener of eventListeners) {
        queueMicrotask(() => {
          listener(event);
        });
      }
    }
  }
  
  public _listeners = (event: string): Set<IEventBusEventListener> | null => {
    if (this.listeners.has(event)) {
      return this.listeners.get(event);
    }
    
    return null;
  }
}

export class EventBusEvent extends Event {
  readonly target;
  constructor(event: string, eventInit?: EventBusEventInit) {
    super(event, eventInit);

    this.target = eventInit?.target || null;
  }
}