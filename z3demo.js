import { init } from 'z3-solver';

const { Context } = await init();
const { Solver, Int, And, Or, Distinct } = new Context("main");
let solver = new Solver();

const bob = Int.const('Bob');  // x is a Z3 integer
const mary = Int.const('Mary');
const cathy = Int.const('Cathy');
const sue = Int.const('Sue');

solver.add(Distinct(bob, mary, cathy, sue));
//solver.add(And(x.le(10), x.ge(9)));  // x <= 10, x >=9
solver.add(And(bob.le(4), bob.ge(1)));
solver.add(And(mary.le(4), mary.ge(1)));
solver.add(And(cathy.le(4), cathy.ge(1)));
solver.add(And(sue.le(4), sue.ge(1)));

solver.add(And(bob.eq(2), sue.eq(3), mary.neq(4)));

// Run Z3 solver, find solution and sat/unsat
console.log(await solver.check());

// Extract value for x
if (await solver.check() === "sat") {
    const model = solver.model();
    const bobVal = model.eval(bob);
    const maryVal = model.eval(mary);
    const cathyVal = model.eval(cathy);
    const sueVal = model.eval(sue);
    console.log(`Bob: ${bobVal}\nMary: ${maryVal}\nCathy: ${cathyVal}\nSue: ${sueVal}\n`);
}

else {

    console.log("unsat. Could not find a valid value for x.");

}
solver.reset();

const x = Int.const('x');
const y = Int.const('y');

solver.add(And(x.lt(10), x.gt(5)));
solver.add(And(y.lt(25), y.gt(15)));

console.log(await solver.check());

const cowModel = solver.model();
const xVal = cowModel.eval(x);
const yVal = cowModel.eval(y);
console.log(`Cow at x: ${xVal}, y: ${yVal}`);

