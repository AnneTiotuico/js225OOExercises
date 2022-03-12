'use strict'

/*
The method franchise.allMovies is supposed to return the following array:

[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]
Explain why this method will not return the desired object? Try fixing this problem by taking advantage of JavaScript lexical scoping rules.
*/

// const franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies() {
//     return [1, 2, 3].map(function(number) {
//       return `${this.name} ${number}`;
//     });
//   },
// };

// console.log(franchise.allMovies())

// This won't return the desired object because the `this` within the anonymous function passed into the `map` function refers to the global object. The global object does not have the `name` property defined therefore it will return `undefined` and the returned array will contain `undefined 1`, `undefined 2` and `undefined 3`. 

// to fix it we can use an arrow function or assign `this` to a local variable `self` to take advantage of JS lexical scoping rules:

// const franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies() {
//     return [1, 2, 3].map((number) => {
//       return `${this.name} ${number}`;
//     });
//   },
// };

// console.log(franchise.allMovies())

//OR :
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return `${self.name} ${number}`;
    });
  },
};

console.log(franchise.allMovies())


/* LS Solution:
The current implementation will not work because this will be bound to the wrong object (window) when the anonymous function passed to map is invoked. We want to access the object franchise from within that anonymous function.

There are multiple ways to solve this problem. Both of the solutions below take advantage of JavaScript's lexical scoping rules, but in different ways.

Solution 1

Here we take advantage of the fact that a variable defined in an outer scope is available to an inner scope by assigning a local variable self to this within the allMovies method and then referencing self within the anonymous callback function:

const franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    const self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
};

Solution 2

Here we take advantage of the fact that arrow functions don't create their own this binding, and so the value of this within an arrow function is determined lexically:

const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(number => `${this.name} ${number}`);
  },
};

*/

