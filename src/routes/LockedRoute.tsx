import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import {useStateValue} from '../context-api/Provider';

type Props = {
    component: React.FC,
    path: string,
}
const LockedRoute:React.FC<Props> = ({component: Component, ...rest}) => {
    const [{user}] = useStateValue();
        // console.log()
        return <Route {...rest} component={(props:object) => (
            user ? ( 
                <Component {...props}/>
            ) 
            :
            (
                <Redirect to="/login"/>
            )
        )}  
        />
}

export default LockedRoute