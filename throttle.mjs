function throttle(fn, timer) {
    let throttlePaused;
    return (...args) => {
        if (throttlePaused) {
            return;
        }
        fn.apply(this, args);
        throttlePaused = true;
        setTimeout(() => {
            throttlePaused = false;
        }, timer);
    }
}


function save() {
    console.log('item saved!!');
}

const process = throttle(save, 5000)
setInterval(() => {
    process()
}, 500);