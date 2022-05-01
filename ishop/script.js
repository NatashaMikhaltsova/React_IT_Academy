const welcomeString = 'Добро пожаловать в наш зоомагазин!';
const tableHeaders = {
    id: '#',
    title: 'Название',
    price: 'Цена',
    url: 'Фото',
    count: 'Количество'
};
const productData = [
    { id: 1, title: "Ошейник", price: 16.50, url: "https://img.joomcdn.net/d6a27399e764b6c95f95642d78d7efb1947ff045_original.jpeg", count: 5 },
    { id: 2, title: "Когтеточка", price: 100, url: "https://vetapteki.by/wp-content/uploads/prod/2021/08/G000104961_0.jpg", count: 2 },
    { id: 3, title: "Клетка для попугая", price: 253.99, url: "https://garfield.by/upload/iblock/33e/11aa5y4tpb4cprapouzr2tli0hmix9vj/a44cbbaf928dc09e36ac324ceff8ab6a.jpg", count: 1 },
    { id: 4, title: "Аквариум", price: 199.6, url: "https://hvost.news/optimpictures/images/2f1004555a8c85de25a2202527708c3c/f114ff09d1b3e96e9a2e5ccd224757e4.jpg.webp", count: 3 },
    { id: 5, title: "Расческа", price: 10.5, url: "https://lovely-dog.ru/wp-content/uploads/2019/10/puhoderka-dyal-sobak.jpg", count: 10 },
    { id: 6, title: "Игрушка", price: 3, url: "https://cdn-irec.r-99.com/sites/default/files/product-images/152762/XagVKwipBofdXslHxso9g.png", count: 30 },
];

ReactDOM.render(
    React.createElement(productTable, { welcome: welcomeString, tableHeader: tableHeaders, product: productData }),
    document.getElementById('table')
);