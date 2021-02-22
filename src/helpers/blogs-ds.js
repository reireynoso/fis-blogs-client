// export class Node {
//     constructor(val){
//         this.val = val;
//         this.next = null;
//     }
// }
import {DSLinkedListTemplate, Node} from './ds-template';

export class BlogLinkedList extends DSLinkedListTemplate {
    constructor(){
        super();
    }

    addItem(val){
        const newVal = new Node(val);
        if(!this.head){
            this.head = newVal;
            this.tail = this.head;
        }
        else{
            // lists in regular order
            // this.tail.next = newVal;
            // this.tail = newVal;
            // lists in recent order
            newVal.next = this.head;
            this.head = newVal;
        }

        this.length++;

        return this.arrayList();
    }

    removeBlog(id){
        let currentNode = this.head;
        let prevNode = null;

        while(currentNode){
            if(currentNode.val._id === id){
                if(!prevNode){
                    this.head = currentNode.next
                    currentNode.next = null
                }else{
                    if(currentNode.val._id === this.tail.val._id){
                        this.tail = prevNode;
                    }
                    prevNode.next = currentNode.next
                    currentNode.next = null;
                }
                break;
            }
            prevNode = currentNode;
            currentNode = currentNode.next;
        }
        this.length--;
        return this.arrayList();
    }

    approveBlog(id){
        if(this.head.val._id === id){
            this.head.val.approved = true
        }
        else if(this.tail.val._id === id){
            this.tail.val.approved = true
        }
        else{
            let currentNode = this.head;
            while(currentNode){
                if(currentNode.val.id === id){
                    currentNode.val.approved = true;
                    break;
                }
            }
        }

        return this.arrayList()
    }
}
