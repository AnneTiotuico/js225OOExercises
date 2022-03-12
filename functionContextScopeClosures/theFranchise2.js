'use strict'

/*
In the previous exercise, we had a situation where an anonymous method passed to map had an undesirable execution context. We solved the problem by taking advantage of lexical scoping and introducing a new variable self. Solve the same problem again by passing a hard-bound anonymous function to map.
*/

const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }.bind(this));
  },
};

console.log(franchise.allMovies())

/*
LS Solution:
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }.bind(this));
  },
};

The solutions provided for the same problem are all valid, usable solutions. That said, the map method and a few other methods on Array.prototype give us a convenient way to set the execution context of a callback: If you pass a second argument to these methods, it will be treated as the execution context of the passed in callback:

const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }, this);
  },
};

Note that we're using anonymous functions in the above solutions. It's not possible to bind an arrow function to this, since the value of this is always determined lexically in arrow functions.

*/