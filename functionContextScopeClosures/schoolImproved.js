'use strict'

/*
In an earlier exercise, we created a school object. It works, however, it can still be improved. The following are improvements for you to implement in the solution provided:

Make the list students private. Right now, anyone can gain access to it and manipulate it.
Make the constraint for allowed values for years a private variable. As a private variable it avoids an unnecessary statement in the addStudent method and at the same time makes the code more declarative.
Make the getCourse function accessible in the addGrade method also. As it is, only the courseReport method has access.
*/

const school = (function() {
  let students = [];
  const validYears = ['1st', '2nd', '3rd', '4th', '5th'];
  function getCourse(student, courseName) {
    return student.listCourses().filter(({name}) => name === courseName)[0];
  }
  
  return {
    addStudent(name, year) {
      if (validYears.includes(year)) {
        const student = createStudent(name, year);
        this.students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    },

    enrollStudent(student, courseName, courseCode) {
      student.addCourse({name: courseName, code: courseCode})
    },

    addGrade(student, courseName, grade) {
      const course = student.getCourse(student, courseName);

      if (course) {
        course.grade = grade;
      }
    },

    getReportCard(student) {
      student.listCourses().forEach(({grade, name}) => {
        if (grade) {
          console.log(`${name}: ${grade}`);
        } else {
          console.log(`${name}: In progress`);
        }
      });
    },

    courseReport(courseName) {
      const courseStudents = this.students.map(student => {
        const course = getCourse(student, courseName) || { grade: undefined };
        return { name: student.name, grade: course.grade };
      }).filter(({grade}) => grade);

      if (courseStudents.length > 0) {
        console.log(`=${courseName} Grades=`);

        const average = courseStudents.reduce((total, {name, grade}) => {
          console.log(`${name}: ${grade}`);
          return total + grade;
        }, 0) / courseStudents.length;

        console.log('---');
        console.log(`Course Average: ${average}`);
      }
    },
  };
})();

/*
LS Solution:
const school = (() => {
  const students = [];
  const allowedYears = ['1st', '2nd', '3rd', '4th', '5th'];

  function getCourse(student, courseName) {
    return student.listCourses().filter(({name}) => name === courseName)[0];
  }

  return {
    addStudent(name, year) {
      if (allowedYears.includes(year)) {
        const student = createStudent(name, year);
        students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    },

    enrollStudent(student, courseName, courseCode) {
      student.addCourse({
        name: courseName,
        code: courseCode
      })
    },

    addGrade(student, courseName, grade) {
      const course = getCourse(student, courseName);

      if (course) {
        course.grade = grade;
      }
    },

    getReportCard(student) {
      student.listCourses().forEach(({grade, name}) => {
        if (grade) {
          console.log(`${name}: ${String(grade)}`);
        } else {
          console.log(`${name}: In progress`);
        }
      });
    },

    courseReport(courseName) {
      const courseStudents = students.map(student => {
        const course = getCourse(student, courseName) || {
          grade: undefined
        };
        return {
          name: student.name,
          grade: course.grade
        };
      }).filter(({grade}) => grade);

      if (courseStudents.length > 0) {
        console.log(`=${courseName} Grades=`);

        const average = courseStudents.reduce((total, {name, grade}) => {
          console.log(`${name}: ${String(grade)}`);
          return total + grade;
        }, 0) / courseStudents.length;

        console.log('---');
        console.log(`Course Average: ${String(average)}`);
      }
    },
  };
})();

The key for all improvements is the use of an IIFE. The IIFE is used to create a function that returns an object that has access to variables and functions in the function expressions' body. Because of the concept of closures, those variables and functions are accessible to the methods of the returned object. Furthermore, since the function expression creates a scope, those variables and functions aren't accessible outside of the function.
*/
