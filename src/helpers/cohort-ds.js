import {DSLinkedListTemplate} from './ds-template';

export class CohortLinkedList extends DSLinkedListTemplate {
    constructor(){
        super();
        this.cohortObj = {}
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
}