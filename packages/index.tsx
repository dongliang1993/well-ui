export { default as Button } from "./button";

class Person {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const map = new Map([]);
console.log(map);

console.log(new Person("dongliang"));
