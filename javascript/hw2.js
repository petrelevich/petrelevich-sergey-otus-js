var fn1 = () => {
    console.log('fn1');
    return Promise.resolve(1);
}
var fn2 = () => new Promise(resolve => {
    console.log('fn2');
    setTimeout(() => resolve(2), 1000);
})

var fn3 = () => new Promise(resolve => {
    console.log('fn3');
    throw "Error!!!";
})

function promiseReduce(asyncFunctions, reduce, initialValue) {
    let result = initialValue;
    return new Promise((resolve, reject) => {
        const execFunc = (idx) => {
            if (idx === asyncFunctions.length) {
                resolve(result);
            }
            asyncFunctions[idx]().then((value) => {
                result = reduce(result, value);
                execFunc(++idx);
            }).catch(function(e) {
                console.log(e);
            });
        };
        execFunc(0);
    });
}

promiseReduce([fn1, fn2, fn3],
    function (memo, value) {
        console.log('reduce');
        return memo * value;
    }, 1).then(console.log);


/*
Вывод в консоль

fn1
reduce
fn2
reduce
2
*/
