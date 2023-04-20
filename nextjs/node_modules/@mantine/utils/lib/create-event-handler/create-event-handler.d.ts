type EventHandler<Event> = (event?: Event) => void;
export declare function createEventHandler<Event>(parentEventHandler: EventHandler<Event>, eventHandler: EventHandler<Event>): (event?: Event) => void;
export {};
//# sourceMappingURL=create-event-handler.d.ts.map