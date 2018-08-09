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
        if (asyncFunctions.length === 1) {
            asyncFunctions[0]().then(value => resolve(reduce(result, value)));
            return;
        }

        asyncFunctions.slice(1, asyncFunctions.length).reduce((accum, current) => {
            return accum.then(value => {
                result = reduce(result, value);
                return current();
            })
        }, asyncFunctions[0]()).then(valueLast => {resolve(reduce(result, valueLast));});
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
