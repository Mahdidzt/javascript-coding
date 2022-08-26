function filter(arr, callback) {
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            newArray.push(arr[i])
        }
    }
    return newArray;
}

function filterObject(object, callback) {
    let newOject = {};
    for (const key in object) {
        if (callback(object[key], key, object)) {
            newOject = { ...newOject, ...{ [key]: object[key] } };
        }

    }
    return newOject;
}

// const objFilter = { a: 2, b: 3, c: 4, f: 10 }
// console.log(filterObject(objFilter, (value => value > 3)));
// const arr = [1, 2, 2, 3, 4, 5, 6]
// console.log(filter(arr, (x => x > 3)))
// filter(arr, ((x, i, a) => {
//     console.log(i);
// }))


function map(array, callback) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(callback(array[i], i, array))
    }
    return newArray;
}

function objectMap(object, callback) {
    let newOject = {}
    for (const key in object) {
        newOject = { ...newOject, ...{ [key]: callback(object[key], key) } }
    }
    return newOject;
}
// const array = [1, 2, 3, 4]
// const array = [{ x: 2, y: 3 }, { x: 2, y: 3 }]
// console.log(map(array, (x => x.x)));

// const obj = { a: 2, b: 3, x: 4 }
// console.log(Object.keys(obj));
// console.log(
//     objectMap(obj, ((val, key) => {
//         return val * 2;
//     }
//     ))
// );


function reduce(array, callback, initialValue) {
    let accumulator = initialValue ?? 0;
    for (let i = 0; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array)
    }
    return accumulator;
}

function objectReduce(object, callback, initialValue) {
    let accumulator = initialValue ?? 0;
    for (const key in object) {
        accumulator = callback(accumulator, object[key], key, object);
    }
    return accumulator;
}

// const array = [1, 2, 3, 4]
const object = { a: 2, b: 3, x: 4 }
// console.log(reduce(array, ((acc, item) => {
//      acc.push()
// }), [] ));

// console.log(
//     objectReduce(object, ((acc, value, key) => {
//         acc += value;

//         return acc;
//     }), 0)
// );

// function flat(array, depth = 1) {
//     return array.reduce((acc, item) => {
//         if (Array.isArray(item)) {
//             if (depth >= 1) {
//                 acc.push(...flat(item, depth - 1))
//                 return acc;
//             }
//         }
//         acc.push(item)
//         return acc;
//     }, [])
// }

function flat(array, depth = 1) {
    return array.reduce((acc, item) => {
        if (Array.isArray(item) && depth >= 1) {
            acc.push(...flat(item, depth - 1))
            return acc;
        }
        acc.push(item);
        return acc;
    }, [])
}

const arr = [[1, 2], 3, [8, 4, [5, 6]]];
console.log(flat(arr));









