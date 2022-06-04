import { EventEmitter } from 'events';

const calendarEvents = new EventEmitter();
const ESetDateForEvent = 'ESetDateForEvent';

export { calendarEvents, ESetDateForEvent };