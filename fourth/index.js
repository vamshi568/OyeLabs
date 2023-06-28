const person = {
  id: 2,
  gender: "male",
};

const student = {
  name: "ravi",
  email: "ravi11@yopmail.com",
};

const newObject = { ...person, ...student }; // the newObject will give the all the properties of object person and student
console.log(newObject)