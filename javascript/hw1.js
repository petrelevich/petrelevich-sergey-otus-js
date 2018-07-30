function sum (value) {
    let counter = 0;
    const sumInt = (value) => {
        if (value !== undefined) {
            counter += value;
            return sumInt;
        } else {
            const f = () => counter;
            return f();
        }
    }
    return sumInt(value);
}

/*
tests:
console.log(sum());
console.log(sum(1)(2)(3)(4)());

*/
