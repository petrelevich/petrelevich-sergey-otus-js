var fn1 = () => {
    console.log('fn1');
    return Promise.resolve(1);
}
var fn2 = () => new Promise(resolve => {
    console.log('fn2');
    setTimeout(() => resolve(2), 1000);
})

function promiseReduce(asyncFunctions, reduce, initialValue) {
    let result = initialValue;
    return new Promise((resolve, reject) => {
        asyncFunctions.forEach((func, idx) => {
            func().then(value => {
                result = reduce(result, value);
                if (idx === asyncFunctions.length - 1) {
                    resolve(result);
                }
            })
        })
    });
}

promiseReduce([fn1, fn2],
    function (memo, value) {
        console.log('reduce');
        return memo * value;
    }, 1).then(console.log);


//https://repl.it/@petrelevich/ViciousGranularSequel
/*
Вывод в консоль
fn1
fn2
reduce
=> Promise { <pending> }
reduce
2
*/
