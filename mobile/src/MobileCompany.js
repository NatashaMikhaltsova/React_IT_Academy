import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { clientInfoEvents, EAddedClientInfo, ESavedClientInfo, ECanceledClientInfo, EDeletedClientInfo, EEditedClientInfo } from './events';
import MobileClient from './MobileClient';
import { MobileClientInfo } from './MobileClientInfo';
import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        initClients: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                surname: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                patronymic: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        name: this.props.name,
        clients: this.props.initClients,
        filteredClients: this.props.initClients,
        mobileClientInfoMode: null,
        selectedClient: { id: null, surname: '', name: '', patronymic: '', balance: '' },
    };

    lastID = this.state.clients[this.state.clients.length - 1].id;
    filter= 0; //0 - все клиенты, 1 - активные клиенты, 2 - заблокированные клиенты
    headers = ['Фамилия', 'Имя', 'Отчество', 'Баланс', 'Статус', 'Управление'];

    componentDidMount = () => {
        clientInfoEvents.addListener(EDeletedClientInfo, this.deletedClientInfo);
        clientInfoEvents.addListener(EEditedClientInfo, this.editedClientInfo);
        clientInfoEvents.addListener(EAddedClientInfo, this.addedClientInfo);
        clientInfoEvents.addListener(ECanceledClientInfo, this.canceledClientInfo);
        clientInfoEvents.addListener(ESavedClientInfo, this.savedClientInfo);
    };

    componentWillUnmount = () => {
        clientInfoEvents.removeListener(EDeletedClientInfo, this.deletedClientInfo);
        clientInfoEvents.removeListener(EEditedClientInfo, this.editedClientInfo);
        clientInfoEvents.removeListener(EAddedClientInfo, this.addedClientInfo);
        clientInfoEvents.removeListener(ECanceledClientInfo, this.canceledClientInfo);
        clientInfoEvents.removeListener(ESavedClientInfo, this.savedClientInfo);
    };

    deletedClientInfo = (cl_info) => {
        let deletionConfirmed = window.confirm(`Вы действительно хотите ударить клиента ${cl_info.surname}?`);
        if (deletionConfirmed) {
            let deletedClientInd = this.state.clients.findIndex(cl => cl.id === cl_info.id);
            let newClients = this.state.clients.slice();
            newClients.splice(deletedClientInd, 1);
            let filteredClients = this.filterClients(newClients);
            this.setState({ clients: newClients, filteredClients: filteredClients });
        }
    };

    editedClientInfo = (cl_info) => {
        !_.isEqual(cl_info, this.state.selectedClient) && this.setState({ mobileClientInfoMode: 'edit', selectedClient: { ...cl_info } });
    };

    addedClientInfo = (cl_info) => {
        let newClients = this.state.clients.slice();
        newClients = [...newClients, cl_info];
        let filteredClients = this.filterClients(newClients);
        this.setState({ clients: newClients, mobileClientInfoMode: 'null', filteredClients: filteredClients });
        this.lastID += 1;
        this.resetMibileClientInfo();
    };

    canceledClientInfo = () => {
        this.setState({ mobileClientInfoMode: 'null' });
        this.resetMibileClientInfo();
    };

    savedClientInfo = (cl_info) => {
        let newClients = this.state.clients.slice();
        newClients.forEach((el, ind) => {
            if (el.id === cl_info.id && !_.isEqual(el, cl_info)) {
                let newClient = { ...el, ...cl_info };
                newClients[ind] = newClient
            };
        });
        let filteredClients = this.filterClients(newClients);
        this.setState({ clients: newClients, mobileClientInfoMode: 'null', filteredClients: filteredClients });
        this.resetMibileClientInfo();
    };

    resetMibileClientInfo(id = null) {
        let emptySelectedClient = { id: id, surname: '', name: '', patronymic: '', balance: '' };
        !_.isEqual(emptySelectedClient, this.state.selectedClient) && this.setState({ selectedClient: emptySelectedClient });
    };

    setMTCName = () => {
        this.setState({ name: 'MTC' });
    };

    setVelcomName = () => {
        this.setState({ name: 'Velcom' });
    };

    addNewClient = () => {
        this.state.mobileClientInfoMode !== 'add' && this.setState({ mobileClientInfoMode: 'add' });
        this.resetMibileClientInfo(this.lastID + 1);
    };

    filterClients = (clients = this.state.clients) => {
        let filteredClients;
        if (this.filter === 0) filteredClients = clients;
        else {
            filteredClients = clients.filter(el => this.filter === 1 ? el.balance >= 0 : el.balance < 0);
        }
        return filteredClients;
    };

    showAllClients = () => {
        this.filter = 0;
        this.setState({ filteredClients: this.filterClients() });
    };

    showActiveClients = () => {
        this.filter = 1;
        let activeClients = this.filterClients();
        !_.isEqual(this.state.filteredClients, activeClients) && this.setState({ filteredClients: activeClients });
    };

    showBlockedClients = () => {
        this.filter = 2;
        let blockedClients = this.filterClients();
        !_.isEqual(this.state.filteredClients, blockedClients) && this.setState({ filteredClients: blockedClients });
    };

    render() {

        console.log("MobileCompany render");

        let clientsCode = this.state.filteredClients.map(client =>
            <MobileClient key={client.id} info={client} />
        );

        let mobileClientInfoCode = <MobileClientInfo key={this.state.selectedClient.id + '_info'} initInfo={this.state.selectedClient} mode={this.state.mobileClientInfoMode} />;

        const clientHeader = this.headers.map(el =>
            <span key={el + '_column'} className='MobileClientCell'>{el}</span>
        );

        return (
            <div className='MobileCompany'>
                <div>
                    <input type="button" value="MTC" onClick={this.setMTCName} />
                    <input type="button" value="Velcom" onClick={this.setVelcomName} />
                    <div className='MobileCompanyName'>Компания &laquo;{this.state.name}&raquo;</div>
                </div>
                <div className='MobileCompanyClientsFilter'>
                    <input type="button" value="Все" onClick={this.showAllClients} />
                    <input type="button" value="Активные" onClick={this.showActiveClients} />
                    <input type="button" value="Заблокированные" onClick={this.showBlockedClients} />
                </div>
                <div className='MobileCompanyTable'>
                    <div className='MobileCompanyTableHeader'>{clientHeader}</div>
                    {clientsCode}
                </div>
                <div><input type="button" value="Добавить клиента" onClick={this.addNewClient} /></div>
                <div>{mobileClientInfoCode}</div>
            </div>
        )
    }

}

export default MobileCompany;