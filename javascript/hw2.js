var fn1 = () => {
    console.log('fn1');
    return Promise.resolve(1);
}
var fn2 = () => new Promise(resolve => {
    console.log('fn2');
    setTimeout(() => resolve(2), 1000);
})

function promiseReduce(asyncFunctions, reduce, initialValue) {
    let result = 0;
    return new Promise((resolve, reject) => {
        asyncFunctions.reduce((accum, current) => {
            return accum.then(value => {
                console.log("value:" + value);
                result = reduce(result, value);
                return current();
            })
        }, Promise.resolve(initialValue))
            .then(valueLast => {resolve(reduce(result, valueLast));});
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
reduce
fn2
=> Promise { <pending> }
reduce
2
*/
