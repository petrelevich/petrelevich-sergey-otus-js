function sum (value) {
    let counter = 0;
    const sumInt = (value) => {
        if (value !== undefined) {
            counter += value;
            return sumInt;
        }
        return counter;
    }
    return sumInt(value);
}

/*

https://repl.it/@petrelevich/PastelMediocreInstructionset

*/
//tests:
console.log(sum());
console.log(sum(1)(2)(3)(4)());