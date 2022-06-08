import { EventEmitter } from 'events';

const eventHandler = new EventEmitter();
const ERefreshDayEvents = 'ERefreshDayEvents'; //update day events list


export { eventHandler, ERefreshDayEvents };