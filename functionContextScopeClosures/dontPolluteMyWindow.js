'use strict'

// Consider the following code:
// const name = 'Naveed';
// const greeting = 'Hello';

// const greeter = {
//   message: `${greeting} ${name}!`,
//   sayGreetings() {
//     console.log(this.message);
//   }
// };

// Note that the message property uses the result of interpolation as its value. As a result, we have two global variables: name, and greeting that pollute the global scope. As we already know, we should limit the use of global variables as much as we can. Here we can avoid using the global variables by simply setting the message property to the value "Hello Naveed!". But let's pretend that we must use variables and interpolation to accomplish this. Can you think of a way to refactor this code so we don't have any other variables in the global scope besides greeter?

const greeter = (function(name, greeting) {
  return {
    message: `${greeting} ${name}!`,
    sayGreetings() {
      console.log(this.message);
    }
  }
})('Naveed', 'Hello');

greeter.sayGreetings()

/*
LS Solution:
const greeter = {
  message: (() => {
    const name = 'Naveed';
    const greeting = 'Hello';

    return `${greeting} ${name}!`;
  })(),

  sayGreetings() {
    console.log(this.message);
  }
};

Here we use an IIFE to set the value of the message property. This allows us to do all the work necessary for setting the value without using any extra global variables.

This is of course, a toy example, but this pattern can be useful in cases where setting a property requires some sort of "pre-work" that introduces extra variables.
*/