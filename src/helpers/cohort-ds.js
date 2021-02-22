import {DSLinkedListTemplate, Node} from './ds-template';

export class CohortLinkedList extends DSLinkedListTemplate {
    constructor(){
        super();
        this.cohortObj = {}
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

        if(this.cohortObj){
            this.cohortObj[newVal.val._id] = this.length
            // console.log(this.cohortObj)
        }

        this.length++;

        return this.arrayList();
    }

    findCohortIndex(id){
        return this.cohortObj[id]
    }

    findCohortNode(id){
        let currentNode = this.head;

        while(currentNode && currentNode.val._id !== id){
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    editCohortName(id, name){
        const cohortNode = this.findCohortNode(id);
        cohortNode.val.name = name;

        return this.arrayList();
    }

    removeUserAdmin(cohortId, userIndex){
        const cohortNode = this.findCohortNode(cohortId);

        let index = userIndex;

        let stop = cohortNode.val.admins.length - 1;
        while (index < stop) {
            cohortNode.val.admins[index] = cohortNode.val.admins[++index];
        }

        cohortNode.val.admins.pop();
        return this.arrayList();
    }

    addUserAdmin(cohortId, user){
        const cohortNode = this.findCohortNode(cohortId);
        cohortNode.val.admins.push(user);
        return this.arrayList();
    }
}