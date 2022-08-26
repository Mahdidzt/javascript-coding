class MyPromise {
    constructor(executionFunction) {
        this.handleError = () => { };
        this.promiseChain = [];

        this.onResolve = this.onResolve.bind(this);
        this.onReject = this.onReject.bind(this);
        executionFunction(this.onResolve, this.onReject)
    }

    then(handleSuccess) {
        this.promiseChain.push(handleSuccess);
        return this;
    }

    catch(handleError) {
        this.handleError = handleError;
        return this;
    }

    onResolve(value) {
        let storeValue = value;
        try {
            this.promiseChain.forEach(nextFunction => {
                storeValue = nextFunction(storeValue);
            })
        } catch (error) {
            this.promiseChain = [];
            this.onReject(error)
        }
    }
    onReject(error) {
        this.handleError(error)
    }
}

const all = (arrayOfPromise) => {
    const resolveList = [];
    return new MyPromise(async (resolve, reject) => {
        try {
            for await (const item of arrayOfPromise) {
                resolveList.push(item);

            }
        }
        catch (error) {
            reject(error);
            return;
        }

        // for (const item of arrayOfPromise) {
        //     try {
        //         const value = await item;
        //         resolveList.push(value);

        //     }
        //     catch (error) {
        //         reject(error);
        //         return;
        //     }
        // }
        resolve(resolveList);
    })
}

const allSettled = (arrayOfPromise) => {
    const resolveList = [];
    return new MyPromise(async (resolve, reject) => {
        // try {
        //     for await (const item of arrayOfPromise) {
        //         resolveList.push({ status: 'fulfilled', value: item })
        //     }
        // }
        // catch (error) {
        //     resolveList.push({ status: 'rejected', reason: error })
        // }

        for (const item of arrayOfPromise) {
            try {
                const value = await item;
                resolveList.push({ status: 'fulfilled', value })
            }
            catch (error) {
                resolveList.push({ status: 'rejected', reason: error })
            }
        }
        resolve(resolveList);
    })

};

const race = (arrayOfPromise) => {
    return new Promise(async (resolve, reject) => {
        for (const item of arrayOfPromise) {
            item.then(res => {
                resolve(res)
                return;
            }).catch(error => {
                reject(error)
                return;
            })
        }
    })
}

const any = (arrayOfPromise) => {
    return new Promise(async (resolve, reject) => {
        let count = arrayOfPromise.length;
        for (const item of arrayOfPromise) {
            item.then(res => {
                resolve(res)
                return;
            }).catch(err => {
                count--;
                if (count === 0) {
                    reject('All promises were rejected');
                }
            })
        }
    })
}




const failedCallback = new Error('Failed callback');

const promisify = (speed) => (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(value), speed);
    })
}
const failPromisify = (speed) => (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('failed'), speed);
    })
}


const slowestCallbackFn = promisify(2000);
const slowerCallbackFn = promisify(10);
const fastCallbackFn = promisify(0);
const failedCallbackFn = failPromisify(0);

// all([slowerCallbackFn('first'), slowestCallbackFn('second'), fastCallbackFn('third')]).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })
// allSettled([slowerCallbackFn('first'), failedCallbackFn('second'), fastCallbackFn('third')]).then(res => {
//     console.log(res);
// })
// race([slowerCallbackFn('first'), fastCallbackFn('third'), failedCallbackFn('second'),]).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })
// any([failedCallbackFn('first'), failedCallbackFn('third'), slowestCallbackFn('second')]).then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// })

fakeApiBackend = () => {
    const user = {
        username: 'treyhuffine',
        favoriteNumber: 42,
        profile: 'https://gitconnected.com/treyhuffine'
    };

    // Introduce a randomizer to simulate the possibility of encountering an error
    if (Math.random() > .05) {
        return {
            data: user,
            statusCode: 200,
        };
    } else {
        const error = {
            statusCode: 404,
            message: 'Could not find user',
            error: 'Not Found',
        };

        return error;
    }
};

// Assume this is your AJAX library.
// Almost all newer ones return a Promise object.
const makeApiCall = () => {
    return new MyPromise((resolve, reject) => {

        // Use a timeout to simulate the network delay waiting for the response.
        // This is THE reason you use a promise.
        // It waits for the API to respond, and after received, it executes code in the `then()` blocks in order.
        // If it executed this immediately, there would be no data.
        setTimeout(() => {
            const apiResponse = fakeApiBackend();

            if (apiResponse.statusCode >= 400) {
                reject(apiResponse);
            } else {
                resolve(apiResponse.data);
            }
        }, 5000);
    });
};

// makeApiCall()
//     .then((user) => {
//         console.log('In the first .then()');

//         return user;
//     })
//     .then((user) => {
//         console.log(`User ${user.username}'s favorite number is ${user.favoriteNumber}`);

//         return user;
//     })
//     .then((user) => {
//         console.log('The previous .then() told you the favoriteNumber')

//         return user.profile;
//     })
//     .then((profile) => {
//         console.log(`The profile URL is ${profile}`);
//     })
//     .then(() => {
//         console.log('This is the last then()');
//     })
//     .catch((error) => {
//         console.log(error.message);
//     });


console.log(Math.floor(Math.random() * 10));