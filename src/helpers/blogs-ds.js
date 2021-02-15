class Node {
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

export class BlogLinkedList {
    constructor(){
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    addBlog(val){
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
        return this.blogsArrayList();
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
        return this.blogsArrayList();
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

        return this.blogsArrayList()
    }

    convertArrayToLinkedList(blogsArr){
        for(let i = 0; i < blogsArr.length; i++){
            this.addBlog(blogsArr[i])
        }

        return this.blogsArrayList();
    }

    blogsArrayList(){
        let currentNode = this.head;
        const blogsArray = [];
        while(currentNode){
            blogsArray.push(currentNode.val);
            currentNode = currentNode.next
        }

        return blogsArray
    }
}
