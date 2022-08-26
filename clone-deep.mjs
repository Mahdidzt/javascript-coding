const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};

target.target2 = target;
function cloneDeep(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        const cloneTarget = Array.isArray(target) ? [] : {}
        const currentTarget = map.get(target);
        if (currentTarget) {
            return currentTarget;
        }
        map.set(target, cloneTarget)
        for (const key in target) {
            cloneTarget[key] = cloneDeep(target[key], map);
        }
        return cloneTarget;
    }
    return target;
}


const newTarget = cloneDeep(target);
// const newTarget = target;
console.log(target.field4 === newTarget.field4);