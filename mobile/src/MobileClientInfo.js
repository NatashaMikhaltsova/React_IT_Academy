import React from "react";
import { clientInfoEvents, EAddedClientInfo, ESavedClientInfo, ECanceledClientInfo } from './events';
import PropTypes from "prop-types";

import './MobileClientInfo.css';

export class MobileClientInfo extends React.PureComponent {

    static propTypes = {
        initInfo: PropTypes.shape({
            id: PropTypes.number,
            surname: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            patronymic: PropTypes.string.isRequired,
            balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
        mode: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.newSurnameRef = React.createRef();
        this.newNameRef = React.createRef();
        this.newPatronymicRef = React.createRef();
        this.newBalanceRef = React.createRef();
    };

    info = this.props.initInfo;

    setNewSurname = () => {
        if (this.newSurnameRef.current)
            this.info.surname = this.newSurnameRef.current.value;
    };

    setNewName = () => {
        if (this.newNameRef.current)
            this.info.name = this.newNameRef.current.value;
    };

    setNewPatronymic = () => {
        if (this.newPatronymicRef.current)
            this.info.patronymic = this.newPatronymicRef.current.value;
    };

    setNewBalance = () => {
        if (this.newBalanceRef.current)
            this.info.balance = +(this.newBalanceRef.current.value);
    };

    updateInfo() {
        this.setNewSurname();
        this.setNewName();
        this.setNewPatronymic();
        this.setNewBalance();
    }

    savedMobileClientInfo = () => {
        this.updateInfo();
        clientInfoEvents.emit(ESavedClientInfo, this.info);
    };

    canceledMobileClientInfo = () => {
        clientInfoEvents.emit(ECanceledClientInfo, this.props.initInfo);
    };

    addedMobileClientInfo = () => {
        this.updateInfo();
        clientInfoEvents.emit(EAddedClientInfo, this.info);
    };

    render() {
        console.log("MobileClientInfo render");

        if (this.props.mode === 'edit') {
            return (
                <div className="MobileClientInfoBlock">
                    <h1>Редактирование</h1>
                    <div>
                        <label htmlFor="surname">Фамилия: </label>
                        <input type="text" className='MobileClientInfoInput' id="surname" defaultValue={this.props.initInfo.surname} ref={this.newSurnameRef} />
                    </div>
                    <div>
                        <label htmlFor="name">Имя: </label>
                        <input type="text" className='MobileClientInfoInput' id="name" defaultValue={this.props.initInfo.name} ref={this.newNameRef} />
                    </div>
                    <div>
                        <label htmlFor="patronymic">Отчество: </label>
                        <input type="text" className='MobileClientInfoInput' id="patronymic" defaultValue={this.props.initInfo.patronymic} ref={this.newPatronymicRef} />
                    </div>
                    <div>
                        <label htmlFor="balance">Баланс: </label>
                        <input type="number" className='MobileClientInfoInput' id="balance" defaultValue={this.props.initInfo.balance} ref={this.newBalanceRef} />
                    </div>
                    <div>
                        <input type='button' value='Сохранить' onClick={this.savedMobileClientInfo} />
                        <input type='button' value='Отменить' onClick={this.canceledMobileClientInfo} />
                    </div>
                </div>
            )
        }
        else if (this.props.mode === 'add') {
            return (
                <div className="MobileClientInfoBlock">
                    <h1>Добавьте нового клиента</h1>
                    <div>
                        <label htmlFor="surname">Фамилия: </label>
                        <input type="text" className='MobileClientInfoInput' id="surname" defaultValue={this.props.initInfo.surname} ref={this.newSurnameRef} />
                    </div>
                    <div>
                        <label htmlFor="name">Имя: </label>
                        <input type="text" className='MobileClientInfoInput' id="name" defaultValue={this.props.initInfo.name} ref={this.newNameRef} />
                    </div>
                    <div>
                        <label htmlFor="patronymic">Отчество: </label>
                        <input type="text" className='MobileClientInfoInput' id="patronymic" defaultValue={this.props.initInfo.patronymic} ref={this.newPatronymicRef} />
                    </div>
                    <div>
                        <label htmlFor="balance">Баланс: </label>
                        <input type="number" className='MobileClientInfoInput' id="balance" defaultValue={this.props.initInfo.balance} ref={this.newBalanceRef} />
                    </div>
                    <div>
                        <input type='button' value='Добавить' onClick={this.addedMobileClientInfo} />
                        <input type='button' value='Cancel' onClick={this.canceledMobileClientInfo} />
                    </div>
                </div>
            )
        }
        else {
            return (null)
        }
    }
}