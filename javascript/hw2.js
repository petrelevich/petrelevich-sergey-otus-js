var fn1 = () => {
    console.log('fn1');
    return Promise.resolve(1);
}
var fn2 = () => new Promise(resolve => {
    console.log('fn2');
    setTimeout(() => resolve(2), 1000);
})

function promiseReduce(asyncFunctions, reduce, initialValue) {
    return asyncFunctions.reduce((accum, current) => {
        return accum.then(value => {
            return current().then(value2 => {
                return reduce(value, value2);
            });
        })
    }, Promise.resolve(initialValue));
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
