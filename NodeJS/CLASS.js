// var Human = function (type) {
//     this.type = type || "human";
// };

// Human.isHuman = function (human) {
//     return human instanceof Human;
// };

// Human.prototype.breathe = function () {
//     alert("h-a-a-a-m");
// };

// var Zero = function (type, firstName, lastName) {
//     Human.apply(this, arguments);
//     this.firstName = firstName;
//     this.lastName = lastName;
// };

// Zero.prototype = Object.create(Human.prototype);
// Zero.prototype.constructor = Zero; // 상속하는 부분
// Zero.prototype.sayName = function () {
//     alert(this.firstName + " " + this.lastName);
// };
// var oldZero = new Zero("animal", "Zero", "Cho");
// console.log(Human.isHuman(oldZero)); //true
// oldZero.sayName();

// class Human {
//     constructor(type) {
//         this.type = type || "human";
//     }
//     static isHuman(human) {
//         return human instanceof Human;
//     }
//     breathe() {
//         alert("h-a-a-a-m");
//     }
// }



// class Zero {
//     constructor(type, firstName, lastName) {
//         Human.apply(this, arguments);
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
//     sayName() {
//         alert(this.firstName + " " + this.lastName);
//     }
// }

// Zero.prototype = Object.create(Human.prototype);
// ; // 상속하는 부분
// var oldZero = new Zero("animal", "Zero", "Cho");
// console.log(Human.isHuman(oldZero)); //true
// oldZero.sayName();

class Human{
    constructor(type='human'){
        this.type = type;
    }
    static isHuman(human){
        return human instanceof Human;
    }
    breathe(){
        alert('h-a-a-a-m');
    }
}

class Zero extends Human {
    constructor(type, firstName, lastName){
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }
    sayName(){
        super.breathe();
        alert(`${this.firstName} ${this.lastName}`);
    }
}

const newZero = new Zero('human', 'zero', 'cho');
Human.isHuman(newZero); //true
