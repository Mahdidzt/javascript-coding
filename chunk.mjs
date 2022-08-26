function chunk(array, size) {
    if (!array.length) {
        return [];
    }

    return [array.slice(0, size), ...chunk(array.slice(size), size)];
}

let arr = [1, 2, 3, 4, 5, 6];
console.log(chunk(arr, 0));