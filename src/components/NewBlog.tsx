import React from 'react';
import {useStateValue} from '../context-api/Provider';

const NewBlog : React.FC = () => {

    const [{user}] = useStateValue();

    return (
        <div>
            {
                user ? "New Blog" : "Please Login first before posting a blog"
            }
        </div>
    )
}

export default NewBlog