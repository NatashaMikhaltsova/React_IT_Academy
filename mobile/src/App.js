import React from 'react';
import MobileCompany from './MobileCompany';

import './App.css';
let companyName = 'Velcom';

let clientsArr = [
  { id: 1, surname: "Иванов", name: "Иван", patronymic: "Иванович", balance: 200 },
  { id: 2, surname: "Сидоров", name: "Сидор", patronymic: "Сидорович", balance: 250 },
  { id: 3, surname: "Петров", name: "Петр", patronymic: "Петрович", balance: 180 },
  { id: 4, surname: "Григорьев", name: "Григорий", patronymic: "Григорьевич", balance: -220 },
];

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <MobileCompany name={companyName} initClients={clientsArr} />
      </div>
    )
  }
}

export default App;
