// class
class Person {
    constructor(name, age) {
        this.name = name || "Person";
        this.age = age || 20;
    }
}

class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade || "F";
    }
}

const kim = new Student("KIM", 23, "A");
console.log(kim);

// prototype
function Person2(name, age) {
    this.name = name || "Person";
    this.age = age || 20;
}

function Student2(name, age, grade) {
    Person2.call(this, name, age);
    this.grade = grade || "F";
}

Student2.prototype = Object.create(Person2.prototype);
Student2.prototype.constructor = Student2;

const kim2 = new Student2("CHOI", 22, "B");
console.log(kim2);
