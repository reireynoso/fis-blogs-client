export class Node {
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

export class DSLinkedListTemplate {
    constructor(){
        this.head = null;
        this.tail = null;
    }

    convertArrayToLinkedList(itemsArray){
        for(let i = 0; i < itemsArray.length; i++){
            this.addItem(itemsArray[i])
        }

        return this.arrayList();
    }

    arrayList(){
        let currentNode = this.head;
        const itemsArray = [];
        while(currentNode){
            itemsArray.push(currentNode.val);
            currentNode = currentNode.next
        }

        return itemsArray
    }

    addItem(val){
        const newVal = new Node(val);
        if(!this.head){
            this.head = newVal;
            this.tail = this.head;
        }
        else{
            this.tail.next = newVal;
            this.tail = newVal;
        }
        this.length++;
        return this.arrayList();
    }
    
}