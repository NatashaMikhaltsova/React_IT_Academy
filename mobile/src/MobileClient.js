import React from 'react';
import PropTypes from 'prop-types';
import { clientInfoEvents, EEditedClientInfo, EDeletedClientInfo } from './events';

import './MobileClient.css';

class MobileClient extends React.PureComponent {

    static propTypes = {
        info: PropTypes.shape({
            id: PropTypes.number.isRequired,
            surname: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            patronymic: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        }),
    };

    editedClientInfo = () => {
        clientInfoEvents.emit(EEditedClientInfo, this.props.info);
    }

    deletedClientInfo = () => {
        clientInfoEvents.emit(EDeletedClientInfo, this.props.info);
    }

    render() {
        console.log("MobileClient id=" + this.props.info.id + " render");
        return (
            <div key={this.props.info.id} className='MobileClient'>
                <span className='MobileClientCell'>{this.props.info.surname}</span>
                <span className='MobileClientCell'>{this.props.info.name}</span>
                <span className='MobileClientCell'>{this.props.info.patronymic}</span>
                <span className='MobileClientCell'>{this.props.info.balance}</span>
                {(this.props.info.balance >= 0)
                    ? <span className='MobileClientCell MobileClientBalanceActive'>Активен</span>
                    : <span className='MobileClientCell MobileClientBalanceBlocked'>Заблокирован</span>
                }
                <div className='MobileClientCell'><input type="button" value="Редактировать" onClick={this.editedClientInfo} /></div>
                <div className='MobileClientCell'><input type="button" value="Удалить" onClick={this.deletedClientInfo} /></div>
            </div>
        );
    }
}

export default MobileClient;
