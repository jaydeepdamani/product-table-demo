import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from 'react-router-dom';

/*Styles Start*/
const useStyles = makeStyles((theme) => ({
    addBtn: {
        marginRight: '15px',
        padding: '10px 30px',
        backgroundColor: '#3f51b5',
        color: "#ffffff",
        borderRadius: "5px",
        border: "none",
        outline: "none",
        fontFamily: 'sans-serif !important',
        fontSize: '16px',
        cursor: "pointer"
    },
    errMsg: {
        color: 'red',
        marginTop: '5px',
        fontFamily: 'sans-serif !important',
        fontSize: '12px'
    }

}));

/*Styles End*/

const ShipmentDetails = (props) => {

    const classes = useStyles();
    const history = useHistory();

    const [address, setAddress] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [error, setError] = useState({})

    const checkObjectIsEmptyOrNot = (obj) => {
        for (const key in obj) {
            if (obj[key] !== null && obj[key] !== "")
                return false;
        }
        return true;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if (checkObjectIsEmptyOrNot(isValid)) {
            setAddress('');
            setLandmark('');
            setCity('');
            setState('');
            history.push('/', { data: props.data})
        }
    }

    const formValidation = () => {
        const tmpError = {...error}
        if (address.trim().length === 0 && address.trim().length < 3) {
            tmpError.address = "Please enter address.";
        } else {
            tmpError.address = ""
        }
        if (landmark.trim().length === 0 && landmark.trim().length < 3) {
            tmpError.landmark = "Please enter landmark.";
        } else {
            tmpError.landmark = ""
        }
        if (city.trim().length === 0 && city.trim().length < 3) {
            tmpError.city = "Please enter city.";
        } else {
            tmpError.email = ""
        }
        if (state.trim().length === 0 && state.trim().length < 3) {
            tmpError.state = "Please enter state.";
        } else {
            tmpError.state = ""
        }
        setError(tmpError)
        return tmpError
    }

    return (
        <React.Fragment>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
                <Box mb={2}>
                    <TextField fullWidth
                               name="address"
                               value={address}
                               onChange={(e) => {
                                   setAddress(e.target.value)
                               }}
                               label="Address"/>
                    {error && error.address && <div className={classes.errMsg}>{error.address}</div>}
                </Box>
                <Box mb={2}>
                    <TextField fullWidth
                               name="landmark"
                               value={landmark}
                               onChange={(e) => {
                                   setLandmark(e.target.value)
                               }}
                               label="Landmark"/>
                    {error && error.landmark && <div className={classes.errMsg}>{error.landmark}</div>}
                </Box>
                <Box mb={2}>
                    <TextField fullWidth
                               name="city"
                               value={city}
                               onChange={(e) => {
                                   setCity(e.target.value)
                               }}
                               label="City"/>
                    {error && error.city && <div className={classes.errMsg}>{error.city}</div>}
                </Box>

                <Box mb={2}>
                    <TextField fullWidth
                               name="state"
                               value={state}
                               onChange={(e) => {
                                   setState(e.target.value)
                               }}
                               label="State"/>
                    {error && error.state && <div className={classes.errMsg}>{error.state}</div>}
                </Box>
                <Box align="center">
                    <button className={classes.addBtn} spacing={2}
                            variant="contained" color="primary">
                        Add
                    </button>
                </Box>
            </form>
        </React.Fragment>
    )
}

export default ShipmentDetails;
