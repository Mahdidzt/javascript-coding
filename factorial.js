
var factorial = (function hideCache() {
    var cache = [];
    return function factorial(num) {
        if (num < 2) {
            return 1;
        }
        if (!(num in cache)) {
            cache[num] = num * factorial(num - 1);
            return cache[num];
        }
        return cache[num];
    }
})()


console.log(factorial(6));