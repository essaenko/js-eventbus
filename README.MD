#JS-EventBus

##Motivation

This is the simple boilerplate event manager that can handle/fire event for your needs.

## Basic usage

### Create eventbus

```typescript
import { Eventbus } from 'eventbus';

const bus = new Eventbus();
// This line is only example to get bus around the page
window.customEvents = bus;
```

### Add event listener

```typescript
import { Eventbus } from 'eventbus';

const bus = new Eventbus();
bus.addEventListener('event', (event) => {
  // Handle event here
});
```

### Remove event listener

```typescript
import { Eventbus } from 'eventbus';

const eventListener = () => {};

const bus = new Eventbus();
bus.removeEventListener('event', eventListener);
```

### Dispatch events

```typescript
import { Eventbus, EventBusEvent } from 'eventbus';

const bus = new Eventbus();
bus.dispatchEvent(new Event('MyCustomEvent'));
// EventBusEvent - buildin class that provide you functionality to pass your own target to the event
bus.dispatchEvent(new EventBusEvent('MyCustomEventWithTarget', { target: myTarget }));
```