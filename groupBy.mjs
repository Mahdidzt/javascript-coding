function groupBy(array, callBack) {
    const newArray = [];
    const obj = {};
    for (let i = 0; i < array.length; i++) {
        const key = callBack(array[i], i);
        if (!obj[key]) {
            obj[key] = [array[i]];

        } else {
            obj[key].push(array[i])
        }

    }
    newArray.push(obj);
    return newArray;
}

const products = [
    { name: 'apples', category: 'fruits' },
    { name: 'oranges', category: 'fruits' },
    { name: 'potatoes', category: 'vegetables' }
];


const groupByCategory = groupBy(products, (res) => res.category)
console.log('groupByCategory: ', groupByCategory);