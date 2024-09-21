class Student {
  #fullName;
  #age;
  #finalCGPA;
  #semesterGrades = [];
  #finalGrade;
  #numberOfYearsToGraduate;
  semesterCGPAlist = [];
  #studentID;

  static #allStudents = [];
  static studID = 0;

  static getAllStudents() {
    return Student.#allStudents;
  }
  getStudentID() {
    return this.#studentID;
  }
  getFullName() {
    return this.#fullName;
  }
  getAge() {
    return this.#age;
  }
  getFinalCGPA() {
    return this.#finalCGPA;
  }
  getSemesterGrades() {
    return this.#semesterGrades;
  }
  getFinalGrade() {
    return this.#finalGrade;
  }
  getNumberOfYearsToGraduate() {
    return this.#numberOfYearsToGraduate;
  }

  constructor(
    studentID,
    firstName,
    lastName,
    fullName,
    dob,
    age,
    semesterCGPAlist,
    finalCGPA,
    semesterGrades,
    finalGrade,
    yearOfEnrollment,
    yearOfPassing,
    numberOfYearsToGraduate
  ) {
    this.#studentID = studentID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.#fullName = fullName;
    this.dob = dob;
    this.#age = age;
    this.semesterCGPAlist = semesterCGPAlist;
    this.#finalCGPA = finalCGPA;
    this.#semesterGrades = semesterGrades;
    this.#finalGrade = finalGrade;
    this.yearOfEnrollment = yearOfEnrollment;
    this.yearOfPassing = yearOfPassing;
    this.#numberOfYearsToGraduate = numberOfYearsToGraduate;
  }

  static newStudent(
    firstName,
    lastName,
    dob,
    semesterCGPAlist,
    yearOfEnrollment,
    yearOfPassing
  ) {
    try {
      if (typeof firstName != "string")
        throw new Error("Enter a valid first Name !");

      if (typeof lastName != "string")
        throw new Error("Enter a valid last name !");

      if (firstName == lastName) throw new Error("Enter a valid name!");

      if (typeof dob != "string") throw new Error("Enter a valid dob");

      if (typeof yearOfEnrollment != "string")
        throw new Error("Enter a valid year of enrollment!");

      if (typeof yearOfPassing != "string")
        throw new Error("Enter a valid year of passing!");

      if (!Array.isArray(semesterCGPAlist))
        throw new Error("Enter a valid CGPA list");

      if (semesterCGPAlist.length != 8)
        throw new Error("Enter a valid CGPA list");

      for (let perSemCGPA of semesterCGPAlist) {
        if (isNaN(perSemCGPA)) throw new Error("Enter a valid CGPA list!");
        if (perSemCGPA < 0) throw new Error("CGPA cannot be less than 0!");
        if (perSemCGPA > 10) throw new Error("CGPA cannot be more tha 10!");
      }

      const validDatePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const validYearPattern = /^\d{4}$/;
      const dobMatch = dob.match(validDatePattern);
      if (!dobMatch) throw new Error("Invalid date of birth format!");

      const enrollmentYearMatch = yearOfEnrollment.match(validYearPattern);
      if (!enrollmentYearMatch) throw new Error("invalid enrollment year!");

      const passingYearMatch = yearOfPassing.match(validYearPattern);
      if (!passingYearMatch) throw new Error("invalid passing year");

      //operations -> calculate dependent variable

      let fullName = firstName + " " + lastName;

      let currentDate = new Date();

      let birthDate = new Date(dob);
      let age = currentDate.getFullYear() - birthDate.getFullYear();

      let tempEnrollmentYear = new Date(yearOfEnrollment);
      let tempPassingYear = new Date(yearOfPassing);
      let numberOfYearsToGraduate =
        tempEnrollmentYear.getFullYear() - tempPassingYear.getFullYear();

      let finalCGPA = 0;
      let sum = 0;
      for (let perSemCGPA of semesterCGPAlist) {
        sum += perSemCGPA;
      }
      finalCGPA = Math.round(sum / 8);

      let semesterGrades = [];
      for (let i = 0; i < semesterCGPAlist.length; i++) {
        let currentCGPA = semesterCGPAlist[i];
        if (currentCGPA >= 8.0 && currentCGPA <= 10.0) {
          semesterGrades[i] = "A";
        } else if (currentCGPA >= 6.0 && currentCGPA < 8.0) {
          semesterGrades[i] = "B";
        } else if (currentCGPA >= 5.0 && currentCGPA < 6.0) {
          semesterGrades[i] = "C";
        } else if (currentCGPA >= 4.0 && currentCGPA < 5.0) {
          semesterGrades[i] = "D";
        } else {
          semesterGrades[i] = "F";
        }
      }

      let finalGrade;
      if (finalCGPA >= 8.0 && finalCGPA <= 10.0) {
        finalGrade = "A";
      } else if (finalCGPA >= 6.0 && finalCGPA < 8.0) {
        finalGrade = "B";
      } else if (finalCGPA >= 5.0 && finalCGPA < 6.0) {
        finalGrade = "C";
      } else if (finalCGPA >= 4.0 && finalCGPA < 5.0) {
        finalGrade = "D";
      } else {
        finalGrade = "F";
      }

      let studentID = Student.studID++;

      let tempStudent = new Student(
        studentID,
        firstName,
        lastName,
        fullName,
        dob,
        age,
        semesterCGPAlist,
        finalCGPA,
        semesterGrades,
        finalGrade,
        yearOfEnrollment,
        yearOfPassing,
        numberOfYearsToGraduate
      );

      //adding each student object in array
      Student.#allStudents.push(tempStudent);
      return tempStudent;
    } catch (error) {
      console.log(error);
    }
  }

  //validate student id code
  static validateStudentID(studentID) {
    try {
      if (studentID < 0) throw new Error("Enter a valid student id");

      if (isNaN(studentID)) throw new Error("Enter a valid student id ");

      if (studentID >= this.#allStudents.length)
        throw new Error(`Student with id ${studentID} does not exists!`);
    } catch (error) {
      console.log(error);
    }
  }
  static getStudentByID(studentID) {
    try {
      Student.validateStudentID(studentID);

      let allStudents = this.getAllStudents();
      for (let student of allStudents) {
        if (student.#studentID == studentID) return student;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  //update each property of student
  updateFullName() {
    try {
      if (this.firstName == this.lastName) throw new Error("Invalid name!");
      this.#fullName = this.firstName + " " + this.lastName;
    } catch (error) {
      console.log(error);
    }
  }
  updateFirstName(firstName) {
    try {
      if (typeof firstName != "string")
        throw new Error("Enter a valid first name");
      this.firstName = firstName;
      this.updateFullName();
    } catch (error) {
      console.log(error);
    }
  }
  updateLastName(lastName) {
    try {
      if (typeof lastName != "string")
        throw new Error("Enter a valid first name");
      this.lastName = lastName;
      this.updateFullName();
    } catch (error) {
      console.log(error);
    }
  }

  updateAge() {
    let currentDate = new Date();
    let birthDate = new Date(this.dob);
    this.#age = currentDate.getFullYear() - birthDate.getFullYear();
  }
  updateDOB(dob) {
    try {
      if (typeof dob != "string") throw new Error("invalid dob");

      const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      const dobmatch = dob.match(datePattern);
      if (!dobmatch) {
        throw new Error("invalid dob format");
      }
      this.dob = dob;
      this.updateAge();
    } catch (error) {
      console.log(error);
    }
  }
  updateNumberOfYearsToGraduate() {
    let enrollmentYear = new Date(this.yearOfEnrollment);
    let passingYear = new Date(this.yearOfPassing);
    this.#numberOfYearsToGraduate =
      enrollmentYear.getFullYear() - passingYear.getFullYear();
  }
  updateYearOfEnrollment(yearOfEnrollment) {
    try {
      if (yearOfEnrollment != "string")
        throw new Error("Enter a valid year of enrollment");
      const validYearPattern = /^\d{4}$/;

      const enrollmentYearMatch = yearOfEnrollment.match(validYearPattern);
      if (!enrollmentYearMatch) throw new Error("invalid enrollment year!");

      this.yearOfEnrollment = yearOfEnrollment;
      this.updateNumberOfYearsToGraduate();
    } catch (error) {
      console.log(error);
    }
  }
  updateYearOfPassng(yearOfPassing) {
    try {
      if (yearOfPassing != "string")
        throw new Error("Enter a valid year of enrollment");
      const validYearPattern = /^\d{4}$/;

      const enrollmentYearMatch = yearOfPassing.match(validYearPattern);
      if (!enrollmentYearMatch) throw new Error("invalid enrollment year!");

      this.yearOfPassing = yearOfPassing;
      this.updateNumberOfYearsToGraduate();
    } catch (error) {
      console.log(error);
    }
  }
  updateFinalGrade() {
    if (this.#finalCGPA >= 8.0 && this.#finalCGPA <= 10.0) {
      this.#finalGrade = "A";
    } else if (this.#finalCGPA >= 6.0 && this.#finalCGPA < 8.0) {
      this.#finalGrade = "B";
    } else if (this.#finalCGPA >= 5.0 && this.#finalCGPA < 6.0) {
      this.#finalGrade = "C";
    } else if (this.#finalCGPA >= 4.0 && this.#finalCGPA < 5.0) {
      this.#finalGrade = "D";
    } else {
      this.#finalGrade = "F";
    }
  }
  updateFinalCGPA() {
    let cgpaList = this.semesterCGPAlist;
    let sum = 0;
    for (let perSemCGPA of semesterCGPAlist) {
      sum += perSemCGPA;
    }
    this.#finalCGPA = Math.round(sum / 8);
    this.updateFinalGrade();
  }

  updateSemesterGrades() {
    // let semesterGrades = [];
    for (let i = 0; i < this.semesterCGPAlist.length; i++) {
      let currentCGPA = this.semesterCGPAlist[i];
      if (currentCGPA >= 8.0 && currentCGPA <= 10.0) {
        this.#semesterGrades[i] = "A";
      } else if (currentCGPA >= 6.0 && currentCGPA < 8.0) {
        this.#semesterGrades[i] = "B";
      } else if (currentCGPA >= 5.0 && currentCGPA < 6.0) {
        this.#semesterGrades[i] = "C";
      } else if (currentCGPA >= 4.0 && currentCGPA < 5.0) {
        this.#semesterGrades[i] = "D";
      } else {
        this.#semesterGrades[i] = "F";
      }
    }
  }
  updateCGPAlist(semesterCGPAlist) {
    try {
      if (!Array.isArray(semesterCGPAlist))
        throw new Error("Enter a valid CGPA list");

      if (semesterCGPAlist.length != 8)
        throw new Error("Enter a valid CGPA list");

      for (let perSemCGPA of semesterCGPAlist) {
        if (isNaN(perSemCGPA)) throw new Error("Enter a valid CGPA list!");
        if (perSemCGPA < 0.0) throw new Error("CGPA cannot be less than 0!");
        if (perSemCGPA > 10.0) throw new Error("CGPA cannot be more tha 10!");
      }

      this.semesterCGPAlist = semesterCGPAlist;
      this.updateFinalCGPA();
      this.updateSemesterGrades();
    } catch (error) {
      console.log(error);
    }
  }

  //update student by id
  static updateStudentByID(studentID, parameter, value) {
    try {
      Student.validateStudentID(studentID);

      let foundStudent = Student.getStudentByID(studentID);

      switch (parameter) {
        case "firstName":
          foundStudent.updateFirstName(value);
          break;
        case "lastName":
          foundStudent.updateLastName(value);
          break;
        case "dob":
          foundStudent.updateDOB(value);
          break;
        case "semesterCGPAlist":
          foundStudent.updateCGPAlist(value);
          break;
        case "yearOfEnrollment":
          foundStudent.updateYearOfEnrollment(value);
          break;
        case "yearOfPassing":
          foundStudent.updateYearOfPassng(value);
          break;

        default:
          console.log("Enter a valid parameter to change!");
      }
      return foundStudent;
    } catch (error) {
      console.log(error);
    }
  }

  //delete student by id
  static deleteStudentByID(studentID) {
    try {
      Student.validateStudentID(studentID);
      let allStudents = Student.getAllStudents();

      const indexOfFoundStudent = allStudents.findIndex((obj) => {
        return obj.#studentID == studentID;
      });

      allStudents.splice(indexOfFoundStudent, 1);
      console.log(`Student with student ID ${studentID} is deleted...`);
    } catch (error) {
      console.log(error);
    }
  }
}

let student1 = Student.newStudent(
  "Aniket",
  "Shetty",
  "02/06/2002",
  [9.2, 8.43, 7.8, 8.2, 9, 7.5, 6.8, 7.8],
  "2020",
  "2024"
);

let student2 = Student.newStudent(
  "Rajesh",
  "Kumar",
  "08/29/2003",
  [9.2, 8.43, 9.8, 8.2, 9, 7.5, 8.7, 9.0],
  "2018",
  "2022"
);

let allStudents = Student.getAllStudents();
console.log(allStudents);

console.log(
  `${student1.getFullName()}  ${student1.getSemesterGrades()}   ${student1.getFinalCGPA()} ${student1.getFinalGrade()}`
);
console.log(
  `${student2.getFullName()}  ${student2.getSemesterGrades()}   ${student2.getFinalCGPA()} ${student2.getFinalGrade()}`
);

console.log(Student.getStudentByID(0));

console.log(Student.updateStudentByID(1, "firstName", "Aneesh"));
Student.deleteStudentByID(1);
console.log(Student.getAllStudents());
