class Person {

   constructor(name, age) {
    this.name = name;
    this.age = age;
   }
   getName= ()=>{
    return this.name;
   }
   getAge= ()=>{
    return this.age;
   }
}
let Personal = new Person("Joshua", 30)
console.log(Personal.getAge());