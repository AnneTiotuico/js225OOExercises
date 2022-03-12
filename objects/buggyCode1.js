'use strict'

// The code below is expected to output the following when run:

// > const helloVictor = createGreeter('Victor');
// > helloVictor.greet('morning');
// = Good Morning Victor

function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${morning} ${name}`;
          break;
        case 'afternoon':
          msg += `${afternoon} ${name}`;
          break;
        case 'evening':
          msg += `${evening} ${name}`;
          break;
      }

      console.log(msg);
    },
  };
}

// However, it instead results in an error. What is the problem with the code?
// Why isn't it producing the expected results?

/*
We need to add `this` so that it can access the object's/itself's properties.
*/

//fixed:
function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}

/*
LS Solution:
The problem is that it didn't use this keyword to access the properties of
the object returned by the createGreeter function.

// rest of code omitted for brevity

      switch (timeOfDay) {
        case 'morning':
          msg += this.morning + ' ' + this.name;
          break;
        case 'afternoon':
          msg += this.afternoon + ' ' + this.name;
          break;
        case 'evening':
          msg += this.evening + ' ' + this.name;
          break;
      }

// rest of code omitted for brevity

Further Exploration
An alternative solution to this exercise is the following code:

// rest of code omitted for brevity

      switch (timeOfDay) {
        case 'morning':
          msg += this.morning + ' ' + name;
          break;
        case 'afternoon':
          msg += this.afternoon + ' ' + name;
          break;
        case 'evening':
          msg += this.evening + ' ' + name;
          break;
      }

// rest of code omitted for brevity
Why does it work? What concept does this demonstrate?
It works because we we pass in the `name` variable and it looks within its closure.

*/