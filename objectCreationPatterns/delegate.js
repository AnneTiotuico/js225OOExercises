'use strict'
/*
Write a delegate function that can be used to delegate the behavior of a method or function to another object's method. delegate takes a minimum of two arguments: (1) the object and (2) name of the method on the object. The remaining arguments, if any, are passed — as arguments — to the objects' method that it delegates to.

Note that this is not the same as using bind. bind returns a new function, whereas delegate maintains the reference.

Here's a sample run;
*/

function delegate(obj, funcName, ...args) {
  return function() {
    obj[funcName].call(obj, ...args)
  };
}

const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = () => { console.log('changed'); };

baz.qux();          // logs 'changed'

/*
LS Solution:
function delegate(context, methodName, ...args) {
  return () => context[methodName].apply(context, args);
}

The main challenge of this exercise is maintaining the reference to the function and its context. Our solution handles this by using the concept of closures so that we can return, and consequently assign to a method, a function that maintains a reference to the context object. Using the context and the method name, the solution then uses Function.prototype.apply to execute the method on the context object.
*/