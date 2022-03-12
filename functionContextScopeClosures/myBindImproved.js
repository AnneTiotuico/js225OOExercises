'use strict'
/*
Our earlier implementation of the Function.prototype.bind was simplistic. Function.prototype.bind has another trick up its sleeve besides hard-binding functions to context objects. It's called partial function application. Read this assignment and the MDN documentation to learn more about partial function application.

Alter the myBind function written in the previous exercise to support partial function application.
*/

function myBind(func, context, ...initialArgs) {
  return function(...args) {
    const allArgs = initialArgs.concat(args);
    return func.apply(context, allArgs);
  };
}

function addNumbers(a, b) {
  return a + b;
}

const addFive = myBind(addNumbers, null, 5);

console.log(addFive(10)); // 15

/*
LS Solution:
function myBind(func, ctx, ...partialArgs) {
  return function(...args) {
    const fullArgs = partialArgs.concat(args);

    return func.apply(ctx, fullArgs);
  };
}

Now to see the new myBind in action:
function addNumbers(a, b) {
  return a + b;
}

const addFive = myBind(addNumbers, null, 5);

addFive(10); // 15

The key here is visualizing what happens to the arguments when myBind is called and when the bound function is eventually called. The first thing to visualize is when myBind is executed, the partialArgs array contains the pre-specified initial arguments. Next, when the bound function is called, the remaining arguments are then concatenated with the partialArgs. Notice that the key here is to cache the initial set of arguments and have it accessible via the closure formed by the return value of myBind.

With the complete args, the solution again leverages Function.prototype.apply to execute the function passed to myBind with its this set to ctx.

*/