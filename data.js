const cars= [
    {
        make: 'Buick', 
        model: 'Encore GX', 
        year: '2023', 
        color: 'blue',
        price: '$29,290', 
    },
    {
        make: 'Tesla', 
        model: 'S P90D', 
        year: '2015',
        color: 'white',
        price: '$37,000',
    },
    {
        make: 'Jeep', 
        model: 'Wrangler', 
        year: '2023',
        color: 'blue',
        price: '$86,530', 
    },
    {
        make: 'lexus',
        model: 'lexus RX', 
        year: '2022',
        color: 'blue', 
        price: '$47,000', 
    },
    {
        make: 'BMW', 
        model: 'BMW X1', 
        year: '2023',
        color: 'blue', 
        price: '$39,000', 
    },
];

function getAll() {
    return cars;
}

function getItem(key) {
    return cars.find(item => item.model === key);
}

export {getAll, getItem }
