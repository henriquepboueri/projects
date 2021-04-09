'use strict';

let age = 17;
let allowedToDrive = (age > 21) ? 'yes' : 'no';

function isAllowedToDrive(age) {
  if (age > 21) {
    return true;
  } else {
    return false;
  }
}

console.log(isAllowedToDrive(age));

function sayDay(day) {
  switch (day) {
    case 1: console.log("Sunday"); break;
    case 2: console.log("Monday"); break;
    default: console.log("We live in a binary world. Go to  Pluto.");
  }
}
sayDay(1);
sayDay(2);

function debugSwitch(level, msg) {
  switch (level) {
    case "INFO":
    case "WARN":
    case "DEBUG": console.log(`${level}: ${msg}`); break;
    case "ERROR": console.log(msg); // same as 'else'
  }
}

debugSwitch("INFO", "Info message");
debugSwitch("DEBUG", "Debug message");
debugSwitch("ERROR", "Fatal Exception");

function debugIf(level, msg) {
  if (level === 'INFO' ||
    level === 'WARN' ||
    level === 'DEBUG') {
    console.log(`${level}: ${msg}`);
  } else { // same as 'default'
    console.log(msg);
  }
}

debugIf("INFO", "Info message");
debugIf("DEBUG", "Debug message");
debugIf("ERROR", "Fatal Exception");

let i = 0;

while (i < 10) {
  console.log(++i)
}

// let choice = 0;
// do {
//     choice = +prompt('Choose a number. [0] to stop.');
// } while (choice);

for (let i = 0; i < 5; i++) { // each parameter is optional
  console.log('Hello', i + 1);
}

// valid too
let x5 = 0;
for (; x5 < 5; x5++) {
  console.log('Hello', x5 + 1);
}
// valid too
for (let i = 0; ; i++) {
  if (i >= 5) {
    break;
  } else {
    console.log('Hello', i + 1);
  }
}

for (let i = 0; i < 5;) {
  console.log('Hello', i + 1);
  i++;
}

let arr = [10, 20, 30];
// Assigns all arrays values to 100
for (i = 0; i < arr.length; arr[i++] = 100); // no body
console.log(arr);

console.log(Object.is(NaN, NaN));

console.log("" == 0); // true, because "" is falsy
console.log("" === 0); // false
console.log(0 === "0"); // false
console.log(false === "false"); // false
console.log(false === "0"); // false
console.log(false === undefined); // false
console.log(false === null); // false
console.log(undefined === null); // false

console.log({} === {}); // false
console.log(new String("bah") === "bah"); // false
console.log(new String("bah") == "bah"); // true
console.log(new Number(1) === 1); // false
console.log(new Number(1) == 1); // true

let n = 0;
let o = new String("0");
let s = "0";
let b = false;

console.log(n === n); // true
console.log(o === o); // true
console.log(s === s); // true

console.log(n === o); // false
console.log(n == o); // true
console.log(n === s); // false
console.log(o === s); // false, types are different
console.log(null === undefined); // false
console.log(o === null); // false
console.log(o === undefined); // false

// never use the `==` operator; stay away from this sheet
console.log("" == "0"); // false
console.log(0 == ""); // true
console.log(0 == "0"); // true
console.log(false == "false"); // false
console.log(false == "0"); // true
console.log(false == undefined); // false
console.log(false == null); // false
console.log(null == undefined); // true

let fortyTwo = 42;
console.log(fortyTwo.toString()[1]); // 2

let t = 1;
let u = "" + t;
console.log(typeof t); // number
console.log(typeof u); // string
let v = String(t);
console.log(typeof v); // string
let x = null;
console.log("" + x); // null

let a = "abc";
console.log(a.length);
console.log(a.toUpperCase());

console.log(typeof null === "object"); // true

// the right way to find out if it is null
let x2 = null;
if (!x2 && typeof x === 'object') {
  console.log('100% null');
}

let f = function test() {
  return 12;
}
console.log(typeof f === "function");

console.log(typeof [1, 2, 3, 4]); // object

let looseVar = 1;
console.log(typeof looseVar);
looseVar = false;
console.log(typeof looseVar);

console.log(typeof typeof 1);

let z, w = 100;
console.log(z, w);

let obj = {
  prop: 'value'
}

// type checking
let zz = "string";
console.log(typeof zz === 'string');
zz = 1.2;
console.log(typeof zz === 'number');
zz = false;
console.log(typeof zz === 'boolean');
zz = {};
console.log(typeof zz === 'object');
zz = null;
console.log(zz === null);
zz = undefined;
console.log(zz === undefined);
// null or undefined
console.log(zz == null);

// type casting
const age2 = 0; // bad
let hasAge = new Boolean(age2); // good
hasAge = Boolean(age2); // good
hasAge = !!age2;

function useStrictMode() {
  'use strict' // useful to run strict mode only on this function, preventing legacy code from breaking
}

function add(a, b) {
  return a + b;
}
let sum = add(1, 2);
console.log(sum);

const add2 = (a, b) => a + b;
console.log(add2(1, 2));

const sum2 = (...args) => args.reduce((pv, nv) => pv + nv);

console.log(sum2(1, 2, 2, 3, 3, 3));

(function sayHello() {
  console.log("Hello, world!");
})();

let say = console.log;
say("Hello, world!");

let validateDataForAge = function (data) {
  const person = data();
  console.log(person);
  if (person.age < 1 || person.age > 99) {
    return true;
  } else {
    return false;
  }
}

let errorHandlerForAge = function (error) {
  console.log('Error while processing age');
}

function parseRequest(data, validateData, errorHandler) {
  let error = validateData(data);
  if (!error) {
    console.log("No errors.");
  } else {
    errorHandler();
  }
}

let generateDataForScientist = function () {
  return {
    name: 'Albert Einstein',
    age: Math.floor(Math.random() * (100 - 1) + 1),
  }
}

let generateDataForComposer = function () {
  return {
    name: "J S Bach",
    age: Math.floor(Math.random() * (100 - 1)) + 1,
  }
}

parseRequest(generateDataForComposer, validateDataForAge, errorHandlerForAge);
parseRequest(generateDataForScientist, validateDataForAge, errorHandlerForAge);

var a5 = 1;
function scopeTest() {
  console.log(a5);
}
scopeTest();

var scope_name = "Global";
function showScopeName() {
  var scope_name = "Local";
  console.log(scope_name);
}
console.log(scope_name);
showScopeName();

var sum3 = function () {
  var i, total = 0;
  console.log(i, total);
  for (i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(sum3(1, 1, 12, 6));

(function sum(...args) {
  console.log(this);
  return args.reduce((pv, nv) => pv + nv, 0);
}());

var person = {
  name: 'Albert Einstein',
  age: 66,
  greet: function () {
    console.log(this.name);
  }
}
person.greet();

var Person = function (name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return this.name;
}

var albert = new Person('Albert Einstein');
albert.greet();

function functionApply() {
  console.log(this);
  console.log(arguments);
}
// prepares a functions and executes it immediattely
functionApply.apply(albert, [4, "Engie", 1.0, true, undefined]); // expects an array as second argument
functionApply.call(albert, 4, "Engie", 1.0, true, undefined); // expects multiple values as arguments
// prepares a function and returns it, not executing it right way
let functionBind = functionApply.bind(albert, 4, "Engie", 1.0, true, undefined);
functionBind();

var santa = {
  say: function () {
    console.log('ho ho ho!');
  }
}
santa.say();

var things = [function () { console.log("ThingOne") },
function () { console.log("ThingTwo") }];
things.forEach(f => f());

function eventHandler(event) {
  event();
}

eventHandler(function () {
  console.log("Event fired!");
})

// creating a function depending on a variable value
var shape, shape_name = "SQUARE";
switch (shape_name) {
  case 'SQUARE':
    shape = function () {
      return "drawing square";
    }
    break;
  default:
    shape = function () {
      return "drawing something else";
    }
}
console.log(shape());

// var outer = 'I am outer';
// function outerFn() {
//   console.log(outer);
// }
// outerFn();

// // closure
// var outer = 'Outer';
// var copy;
// function outerFn() {
//   var inner = "Inner";
//   function innerFn() {
//     console.log(outer);
//     console.log(inner);
//   }
//   copy = innerFn;
// }
// outerFn();
// copy(); // can run innerFn() indirectly


var outer = 'outer';
var copy;
function outerFn() {
  var inner = 'inner';
  function innerFn(param) {
    console.log(outer);
    console.log(inner);
    console.log(param);
    console.log(magic);
  }
  copy = innerFn;
}
console.log(magic); //ERROR: magic not defined
var magic = "Magic";
outerFn();
copy("copy");

// (function delay(message) {
//   setTimeout(() => {
//     console.log(message);
//   }, 1000);
// }('Hello, World!'));

function privateTest() {
  var points = 0;
  this.getPoints = function () {
    return points;
  }
  this.score = function () {
    points++;
  }
}

var priv = new privateTest();
priv.score();
priv.score();
priv.score();
console.log(priv.points);
console.log(priv.getPoints());

class PrivateTest {
  //points = 0;
  constructor() {
    this.points = 0;
  }
  getScore() {
    return this.points;
  }

  score() {
    this.points++;
  }
}

var priv2 = new PrivateTest();
priv2.score();
console.log(priv2.getScore());

// for (var ii = 1; ii <= 5; ii++) {
//   setTimeout(function delay() {
//     console.log(ii);
//   }, ii * 100);
// }

for (var i3 = 1; i3 <= 5; i3++) {
  (function (j) {
    setTimeout(function delay() {
      console.log(j);
    }, j * 100);
  })(i3);
}