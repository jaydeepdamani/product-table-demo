import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom';

const Checkout = (props) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if(props?.location?.state?.data) {
            setData(props?.location?.state?.data)
        }
    }, [props.location.state.data]);

    return (
        <React.Fragment>
            {console.log('callllll propspsp', data)}
            Check Out Page
        </React.Fragment>
    )
}

export default withRouter(Checkout);
