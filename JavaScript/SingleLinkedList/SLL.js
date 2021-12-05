class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

console.log(new Node(1));

class SingleLinkedList {
    constructor() {
        this.head = null;
    }

    insert(value) {
        // 값이 없을 때
        if (this.head == null) {
            this.head = new Node(value);
        } else {
            let temp = this.head;
            this.head = new Node(value);
            this.head.next = temp;
        }
    }
    print() {
        let str = "";
        for (let i = this.head; i != null; i = i.next) {
            str += `${i.data}->`;
        }

        console.log(str);
    }
}

let SLL = new SingleLinkedList();
SLL.insert(1);
console.log(SLL);
SLL.insert(3);
SLL.insert(5);
SLL.insert(4);
SLL.insert(2);
console.log(SLL);
SLL.print();
