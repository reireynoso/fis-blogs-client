import React, {useEffect} from 'react';
import {useStateValue} from '../context-api/Provider';
import {server} from '../config/endpoints';
import Cookies from 'universal-cookie';
import {setCohorts} from '../context-api/actions';

const cookies = new Cookies();

const NewBlog : React.FC = () => {

    const [{user, cohorts}, dispatch] = useStateValue();

    useEffect(() => {
        // auto fetch cohorts 
        if(!cohorts.length){
            fetch(`${server}/cohort`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                dispatch(setCohorts(data));
            })
        }
    }, [cohorts])

    return (
        <div>
            {
                !user ?  
                "Please Login first before posting a blog" 
                :
                <form>
                    <label>Title</label>
                    <input type="text" placeholder="Title" name="title"/>
                    <label>Link</label>
                    <input type="text" placeholder="Link" name="link"/>
                    <label>Cohort</label>
                    <select>
                        {
                            cohorts.map((cohort:{name:string}) => (
                                <option>{cohort.name}</option>
                            ))
                        }
                    </select>
                    <input type="submit" value="Post Blog"/>
                </form>

            }
        </div>
    )
}

export default NewBlog