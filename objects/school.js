'use strict'

/*
Create a school object. The school object uses the student object from the
previous exercise. It has methods that use and update information about the
student. Be sure to check out the previous exercise for the other arguments
that might be needed by the school object. Implement the following methods
for the school object:

addStudent: Adds a student by creating a new student and adding the student
to a collection of students. The method adds a constraint that the year can
only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'.
Returns a student object if year is valid otherwise it logs "Invalid Year".
enrollStudent: Enrolls a student in a course.
addGrade: Adds the grade of a student for a course.
getReportCard: Logs the grades of a student for all courses.
If the course has no grade, it uses "In progress" as the grade.
courseReport: Logs the grades of all students for a given course name.
Only student with grades are part of the course report.
To test your code, use the three student objects listed below.
Using the three student objects, produce the following values from the
getReportCard and courseReport methods respectively.
*/
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      return `${this.name} is a ${this.year} year student`;
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(code, note) {
      this.courses.forEach(course => {
        if (course.code === code) {
          course.notes ? course.notes.push(note) : course.notes = [note];
        }
      });
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.notes) {
          console.log(`${course.name}: ${course.notes.join('; ')}`);
        }
      });
    },

    updateNote(code, newNote) {
      this.courses.forEach(course => {
        if (course.code === code) {
          course.notes = [newNote];
        }
      });
    }
  };
}

const school = {
  students: [],

  addStudent(student) {
    let validYears = ['1st', '2nd', '3rd', '4th', '5th'];
    if (validYears.includes(student.year)) {
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year');
    }
  },

  enrollStudent(student, course) {
    student.addCourse(course);
  },

  addGrade(student, courseName, grade) {
    student.courses.forEach(course => {
      if (course.name === courseName) {
        course.grade = grade;
      }
    });
  },

  getReportCard(student) {
    student.courses.forEach(({name, grade}) => {
      if (grade) {
        console.log(`${name}: ${grade}`);
      } else {
        console.log(`${name}: In Progress`);
      }
    });
  },

  courseReport(courseName) {
    let report;
    let grades = [];
    this.students.forEach(({name, courses}) => {
      courses.forEach((course) => {
        if (course.name === courseName && course.grade) {
          if (!report) report = `=${courseName} Grades=`;
          grades.push(course.grade);
          report += `\n${name}: ${course.grade}`;
        }
      });
    });
    if (grades.length > 0) {
      let avg = grades.reduce((sum, num) => sum + num) / grades.length;
      report += `\n---\nCourse Average: ${avg}`;
    }
    console.log(report);
  },
};

let foo = createStudent('foo', '3rd');
foo.addCourse({ name: 'Math', code: 101, grade: 95, });
foo.addCourse({ name: 'Advanced Math', code: 102, grade: 90, });
foo.addCourse({ name: 'Physics', code: 202, });

let bar = createStudent('bar', '1st');
bar.addCourse({ name: 'Math', code: 101, grade: 91, });

let qux = createStudent('qux', '2nd');
qux.addCourse({ name: 'Math', code: 101, grade: 93, });
qux.addCourse({ name: 'Advanced Math', code: 102, grade: 90, });

// => testing invalid year input
// let invalid = createStudent('invalid', '6th');
// school.addStudent(invalid);

school.addStudent(foo);
school.addStudent(bar);
school.addStudent(qux);

// => testing adding a student grade for a course
// school.addGrade(foo, 'Physics', 100);
// console.log(foo)

// => testing enrolling a student into a course
// school.enrollStudent(qux, { name: 'Physics', code: 202, })
// console.log(qux)

school.getReportCard(foo);
// = Math: 95
// = Advanced Math: 90
// = Physics: In progress


school.courseReport('Math');
// = =Math Grades=
// = foo: 95
// = bar: 91
// = qux: 93
// = ---
// = Course Average: 93

school.courseReport('Advanced Math');
// = =Advanced Math Grades=
// = foo: 90
// = qux: 90
// = ---
// = Course Average: 90

school.courseReport('Physics');
// = undefined


/*
LS Solution:
const school = {
  students: [],
  addStudent(name, year) {
    if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
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
    const course = student.listCourses().filter(({name}) => name === courseName)[0];

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
    function getCourse(student, courseName) {
      return student.listCourses().filter(({name}) => name === courseName)[0];
    }

    const courseStudents = this.students.map(student => {
      const course = getCourse(student, courseName) || { grade: undefined };
      return { name: student.name, grade: course.grade };
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

The key to the enrollStudent, addGrade, and getReportCard method is the use of
the student object as a parameter. With the student object, the three methods
just use the methods and properties of the object to update the information on
the student object. Although not passed as an argument, the key also for the
courseReport method is using the methods on the student object and then using
list processing techniques to convert the list of students to the appropriate
data needed to log the scores and average for a course. Of note is the use of
map to transform the student object to only contain the name and grade of the
student for a course.

*/