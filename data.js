const data = [
    {name: 'Item1', attribute1: 'attribute1.1', attribute2: 'attribute1.2', attribute3: 'attribute1.3', attribute4: 'attribute1.4'},
    {name: 'Item2', attribute1: 'attribute2.1', attribute2: 'attribute2.2', attribute3: 'attribute2.3', attribute4: 'attribute2.4'},
    {name: 'Item3', attribute1: 'attribute3.1', attribute2: 'attribute3.2', attribute3: 'attribute3.3', attribute4: 'attribute3.4'},
    {name: 'Item4', attribute1: 'attribute4.1', attribute2: 'attribute4.2', attribute3: 'attribute4.3', attribute4: 'attribute4.4'},
    {name: 'Item5', attribute1: 'attribute5.1', attribute2: 'attribute5.2', attribute3: 'attribute5.3', attribute4: 'attribute5.4'},
];

function getAll() {
    return data;
}

function getItem(key) {
    return data.find(item => item.name === key);
}

module.exports = {
    getAll,
    getItem
}