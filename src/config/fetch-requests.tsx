import Cookies from 'universal-cookie';
import {server} from '../config/endpoints';
const cookies = new Cookies();

// handles new blog request
type informationObjectType = {
    tags: string[],
    link: string,
    cohort: string
}
export const newBlogRequest = (informationObject: informationObjectType) => {
    return fetch(`${server}/blog/new`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application.json",
            "Authorization": `Bearer ${cookies.get("token")}`
        },
        body: JSON.stringify(informationObject)
    })
    .then(res => res.json())
}

// handles fetching cohorts from db
export const fetchCohorts = () => {
    return fetch(`${server}/cohort`)
    .then(res => {
        return res.json()
    })
}