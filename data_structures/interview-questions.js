//^ tricky interview questions in JS language:

//! What is the difference between null and undefined:
// In JS, both null and undefined represent an absence of a value, but they serve a different purpose:
// Undefined: Indicates that a variable has been declared but not assigned a valie, or that a function does not return anything explicitly.
// Null: An intentiional assignment to represent 'no value' or 'no object'.

// Example:
let a;
console.log(a); // undefined:

let b = null;
console.log(b); // null:

// equality check:
console.log(null == undefined); // loose equality coercs types
console.log(null === undefined); // strict equality checks type and value

//! Explain how the 'this' keyword works in JS language:
// this keyword refers to the execution context of a function and its value depends on how the function is called:
// * Global scope: this is the global object (window in the browser):
// * Object method: this refers to the object the method belongs to:
// * Standalone function: this is the global object (or undefined in strict mode):
// * Constructor with new: this is the newly created instance:
// * Arrow functions: this is inherited from the enclosing scope, not bound dynamically:

// Example:
const obj = {
    name: 'Alice',
    greet: function () {
        console.log(`Hello, ${this.name}`);
    }
};

// call the function (or method attached to an object), defined function:
obj.greet();
// assign an obj.greet to a variable function expression:
const greetFunction = obj.greet;
greetFunction(); // undefined (in strict mode):

//! What is the closure and how does it work:
//* A closure is a function that retains access to variable from its outer (lexical) scope, even after the outer function has finished executing:

// Example:
function outer() {
    let count = 0;
    return function inner() {
        count++;
        console.log(count);
    };
}

const counter = outer();
counter();
counter();

// In the above case, the inner forms a closure over count, preserving its value between calls. They are a powerful tools for data privacy and state management but can lead to memory leaks if not handled carefully.

//! What is the difference between == and === ?
// == (Loose equality): Compares values after type coercion, converting operands to the same type if needed:
// === (Strict equaluty): Compares both value and type without coercion. Strict equality is prefered to avoid unexpected behavior from type coercion.

//! How does JS handle asynchronus operations?
// JS is a single-threaded but uses an event loop to handle asyncrhonous operations, enabling non-blocking behavior. Common tools include:
//* Callbacks: functions passed as arguments to execute later.
//* Promises: Objects representing eventual completion (or a failure) of an operation.
//* Async/Await: Syntactic sugar over promises for cleaner asynchronous code.

// Example with async/await:
async function getData() {
    try {
        // GET pokemon/pikachu endpoint: GET code status 200 (OK)!
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error)
    }
}

// call the async function:
getData();

//! What are the differences between var, let, and const:
// These keywords differ in scope, hoisting, reassignment.
//* var: function-scoped, hoisted with default initialization to undefined:
//* let: block-scoped, hoisted but not initialized (temporal dead zone):
//* const: block-scopted, hoisted but not initialized, and cannot be reassigned (though object properties can change):

// Example:
if (true) {
    var x = 1;
    let y = 2;
    const z = 3;
};

console.log(x);
// console.log(y); <- this will throw an error reference Error:
// console.log(z); <- this will throw an error reference Error:

//! Explain prototypical inheritance in JS.
// JS uses prototypical inheritance, where objects inherit properties and methods from a prototype object via prototype chain.
//^ Note: this prototype declaration can be converted to class declartion!
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function () {
    console.log(`${this.name} make a sound.`);
}

function Dog(name) {
    Animal.call(this, name);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog('Buddy');
dog.speak();

//! What is difference between function declarations and function expressions?
// * Function Declaration: Defined with function keyword and hoisted fully (name and body).
// * Function Expression: Assigned to a variable, only the variable is hoisted (not the function).

// Example:
// calling the function 'before', out of order, but the function greet() is hoisted thus this works: 
greet();
function greet() {
    console.log('Hello');
}

// greet1(); Error cannot greet1() before initialization:
const greet1 = function () {
    console.log('Hello');
};

//! How do you handle errors in asynchronous code?
// Error handling varies by asynchronous patter.
// * Callbacks: Pass errors as the first argument.
// * Promises: Use .catch() 
// * Async/Await: Use try/catch 

//! What are the differences between arrow functions and regular functions?
// * Syntax: arrow functions are (=>) concise:
// * this Binding: arrow functions inherit this from the enclosing scope; regular functions bind this based on how this based on they are called.
// * arguments Object: arrow functions lack their own argument object.
// * constructors: Arrow functions cannot be used with new.

const object = {
    name: 'Nuraly',
    regularFunction: function () {
        console.log(this.name);
    },
    arrowFunction: () => {
        console.log(this.name);
    }
};

object.regularFunction(); // this will work
object.arrowFunction(); // this will throw undefined