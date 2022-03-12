'use strict'

/*
Create an object factory for a student object. The student object should have
the following methods and it should produce the expected results demonstrated
in the sample code:

info: Logs the name and year of the student.
addCourse: Enrolls student in a course. A course is an object literal that
  has properties for its name and code.
listCourses: Returns a list of the courses student has enrolled in.
addNote: Adds a note property to a course. Takes a code and a note as an
  argument. If a note already exists, the note is appended to the existing one.
updateNote: Updates a note for a course. Updating a note replaces the existing
  note with the new note.
viewNotes: Logs the notes for all the courses. Courses without notes are not displayed.

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


let foo = createStudent('Foo', '1st');
console.log(foo.info());
// "Foo is a 1st year student"
console.log(foo.listCourses());
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
console.log(foo.listCourses());
// // [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]

foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"

foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
// // "Advance Math: Difficult subject"

foo.updateNote(101, 'Fun course');
foo.viewNotes();
// // "Math: Fun course"
// // "Advanced Math: Difficult subject"



/*
LS Solution:
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        if (course.note) {
          course.note += `; ${note}`;
        } else {
          course.note = note;
        }
      }

    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },

    updateNote(courseCode, note) {
      const course = this.courses.filter(({code}) => code === courseCode)[0];

      if (course) {
        course.note = note;
      }
    },
  };
}

All the methods are straightforward. The main thing to handle is the mutation
of the specific course when adding and updating a note. The solution does this
by filtering the array of courses and returning the course object itself.
Another thing to note, is the conditional for checking if a course was found
for both the addNote and updateNotes method. This conditional ensures that a
note will only be added when a student has the course.

*/