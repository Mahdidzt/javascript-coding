
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}


function save(params) {
    console.log('item saved in ' + params);
}

const timer = 1500;
const process = debounce(save, timer);
setInterval(() => {

    process(timer)
}, 200);
