class SingleLinkedListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class SingleLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    isEmpty() {
        return this.size == 0;
    }
    insert(value) {
        // 헤드가 비어 있으면 헤드는 신규 노드로..
        if (this.head == null) {
            this.head = new SingleLinkedListNode(value);
        } else {
            let temp = this.head;
            this.head = new SingleLinkedListNode(value);
            this.head.next = temp;
        }
        this.size++;
    }
    // SLL에서 노드를 삭제하는 것은 해당 노드의 참조를 제거한다.
    // 만약 삭제하고자 하는 노드가 연결 리스트의 중간에 있다면
    // 삭제 하고자 하는 노드의 next 포인터가 삭제하고자 하는 노드의 다음
    // 노드를 가르키도록 한다.
    remove(value) {
        let currentHead = this.head;

        // 현재 헤드가 삭제하고자 하는 값을 가지고 있기 때문에 바로 삭제한다.
        // 헤드는 이제 새로운 값을 갖는다.
        if (currentHead.data == value) {
            this.head = currentHead.next;
            this.size--;
        } else {
            let prev = currentHead;
            while (currentHead.next) {
                if (currentHead.data == value) {
                    prev.next = currentHead.next;
                    prev = currentHead;
                    currentHead = currentHead.next;
                    break;
                }
                prev = currentHead;
                currentHead = currentHead.next;
            }
            // 삭제하고자 노드가 중간에도 없고 헤드에 없으면 꼬리에 있는 것.
            if (currentHead.data == value) {
                prev.next = null;
            }
            this.size--;
        }
    }
    // 검색 : 어떤 값이 SLL내에 존재하는지 확인하기 위해서는 모든 next포인터를 반복순회하면 된다.
    find(value) {
        let currentHead = this.head;
        while (currentHead.next) {
            if (currentHead.data == value) {
                return true;
            }
            currentHead = currentHead.next;
        }
        return false;
    }
    print() {
        let str = "";
        for (let i = this.head; i != null; i = i.next) {
            str += `${i.data}->`;
        }
        str += `NULL`;
        console.log(str);
    }
}

let SLL = new SingleLinkedList();
SLL.insert(1);

SLL.insert(2);
SLL.insert(3);
SLL.insert(4);
SLL.remove(2);
console.log(SLL.find(2));
SLL.print();
