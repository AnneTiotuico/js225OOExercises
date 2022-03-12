'use strict'

 // Read the following code carefully. Will the JavaScript garbage collection mechanism garbage collect the array assigned to the variable array after the function pushIt is run on line 10?

function makeArrays() {
  let array = [];

  return () => {
    array.push('');
    return array;
  };
}

const pushIt = makeArrays();
pushIt();
// more code

// No, it will not be garbage collected because we return the return value of the arrow function on line 6, which mutates the array assigned to `array` then returns it. After pushIt() returns, there is still a reference to the array held in the pushIt variable.

/*
LS Solution:
No. Since pushIt can be called multiple times, it needs to retain a reference to the array variable in the closure. Since array is never reassigned, every call to pushIt returns a pointer to the same array. The array gets mutated by each invocation, but it's the same array, so it is not eligible for garbage collection.

*/