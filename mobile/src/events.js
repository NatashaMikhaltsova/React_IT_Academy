import {EventEmitter} from 'events';

const clientInfoEvents = new EventEmitter(); //все события, связанные с изменением информации о клиенте;
const EAddedClientInfo = 'EAddedClientInfo'; //кликнута кнопка добавления нового клиена, его сэмиттирует ClientDescription и примет MobileCompany
const ESavedClientInfo = 'ESavedClientInfo'; //кликнута кнопка сохранения информации о клиенте, его сэмиттирует ClientDescription и примет MobileCompany
const ECanceledClientInfo = 'ECanceledClientInfo'; //кликнута кнопка отмены изменения/добавления информации о клиенте, его сэмиттирует ClientDescription и примет MobileCompany
const EDeletedClientInfo = 'EDeletedClientInfo'; //кликнута кнопка удаления информации о клиенте, его сэмиттирует MobileClient и примет MobileCompany
const EEditedClientInfo = 'EEditedClientInfo'; //кликнута кнопка редактирования информации о клиенте, его сэмиттирует MobileClient и примет MobileCompany

export { clientInfoEvents, EAddedClientInfo, ESavedClientInfo, ECanceledClientInfo, EDeletedClientInfo, EEditedClientInfo }