/* eslint-disable no-unused-vars */
type EventHandler<T = any> = (data: T) => void;

class EventEmitter {
  private eventHandlers: Record<string, EventHandler[]> = {};

  subscribe<T>(eventName: EventName, handler: EventHandler<T>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(handler);
  }

  unsubscribe<T>(eventName: EventName, handler: EventHandler<T>): void {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(
        existingHandler => existingHandler !== handler
      );
    }
  }

  emit<T>(eventName: EventName, data: T): void {
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach(handler => handler(data));
    }
  }
}

// Create a singleton instance
export const eventEmitter = new EventEmitter();

// Enum for event names
export enum EventName {
  TEST_EVENT = "TEST_EVENT",
}

// Usage Example:
// eventEmitter.subscribe(EventName.TEST_EVENT, (data) => console.log(data));
// eventEmitter.emit(EventName.TEST_EVENT, { someData: 123 });
// eventEmitter.unsubscribe(EventName.TEST_EVENT, handler);
