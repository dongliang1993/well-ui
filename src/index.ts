import sum from "./utils/sum";
import Person from "./utils/Person";
import Person2 from "./utils/Person2";
import jscookie from "js-cookie";

const person = new Person("dongliang");
console.log(person);
console.log(new Person2(22));
console.log(sum());

const a = { b: 12 };
console.log({ ...a });

console.log([1, 2, 3].includes(1));
const b = new Map([]);

console.log(b);

console.log(jscookie);
