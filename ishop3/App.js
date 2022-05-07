import React from 'react';
import ReactDOM from 'react-dom';
import Shop from './components/shop';
import './components/style.css';

const welcomeString = 'Добро пожаловать в наш зоомагазин!';
const tableHeaders = {
    id: '#',
    title: 'Название',
    price: 'Цена',
    url: 'Фото',
    count: 'Количество',
    control: 'Управление',
};
const productData = require('./products.json');

ReactDOM.render(
    <Shop welcome={welcomeString} tableHeader={tableHeaders} initProducts={productData} />,
    document.getElementById('table')
);