'use strict'

// In JavaScript, comparing two objects either with == or === checks for object
// identity. In other words, the comparison evaluates as true if it's the same
// object on either side of == or ===. This is a limitation, in a sense, because
// sometimes we need to check if two objects have the same key/value pairs.
// JavaScript doesn't give us a way to do that.

// Write a function objectsEqual that accepts two object arguments and returns
// true or false depending on whether the objects have the same key/value pairs.

function objectsEqual(obj1, obj2) {
  let obj1Keys = Object.keys(obj1);
  let obj1Values = Object.values(obj1);
  let obj2Keys = Object.keys(obj2);
  let obj2Values = Object.values(obj2);

  return obj1Keys.every(key => obj2Keys.includes(key)) &&
         obj1Values.every(value => obj2Values.includes(value));
}

// refactored:
function objectsEqual(obj1, obj2) {
  return Object.keys(obj1).every(key => obj2[key] && obj1[key] === obj2[key]);
}

// another solution:
function objectsEqual(obj1, obj2) {
  for (let [key, value] of Object.entries(obj1)){
    if (!obj2.hasOwnProperty(key) || obj2[key] !== value) return false
  }

  return true
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false

/*
LS Solution:
function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }

  return (keysMatch(a, b) && valuesMatch(a, b));
}

function keysMatch(a, b) {
  const aKeys = Object.getOwnPropertyNames(a).sort();
  const bKeys = Object.getOwnPropertyNames(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key, index) => key === bKeys[index]);
}

function valuesMatch(a, b) {
  const aKeys = Object.getOwnPropertyNames(a).sort();

  return aKeys.every(key => a[key] === b[key]);
}


Discussion
The solution is straightforward, it checks whether the keys are the same and
the values for the respective keys are the same, and it makes use of helper
functions for each. The solution also has a guard clause to immediately
returns true if the two arguments passed reference the same object.

Futher Exploration
A limitation of this function is that it doesn't look for deep equality.
In other words, if one of the values is an object in both objects, this will
return false unless that object is identical on both objects.
*/