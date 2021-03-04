import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

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

const PersonalDetail = (props) => {

    const classes = useStyles();

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
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
            setName('');
            setMobile('');
            setEmail('');
            props.handleNext();
        }
    }

    const formValidation = () => {
        const tmpError = {...error}
        if (name.trim().length === 0 && name.trim().length < 3) {
            tmpError.name = "Please enter valid name.";
        } else {
            tmpError.name = ""
        }
        if (mobile.trim().length === 0 && mobile.trim().length < 3) {
            tmpError.mobile = "Please enter valid mobile number.";
        } else {
            tmpError.mobile = ""
        }
        if (email.trim().length === 0 && email.trim().length < 3) {
            tmpError.email = "Please enter valid email address.";
        } else {
            tmpError.email = ""
        }
        setError(tmpError)
        return tmpError
    }

    return (
        <React.Fragment>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
                <Box mb={2}>
                    <TextField fullWidth
                               name="name"
                               value={name}
                               onChange={(e) => {
                                   setName(e.target.value)
                               }}
                               label="Name"/>
                    {error && error.name && <div className={classes.errMsg}>{error.name}</div>}
                </Box>
                <Box mb={2}>
                    <TextField fullWidth
                               name="mobile"
                               value={mobile}
                               onChange={(e) => {
                                   setMobile(e.target.value)
                               }}
                               label="Mobile"/>
                    {error && error.mobile && <div className={classes.errMsg}>{error.mobile}</div>}
                </Box>
                <Box mb={2}>
                    <TextField fullWidth
                               name="email"
                               value={email}
                               onChange={(e) => {
                                   setEmail(e.target.value)
                               }}
                               label="Email"/>
                    {error && error.email && <div className={classes.errMsg}>{error.email}</div>}
                </Box>
                <Box align="center">
                    <button className={classes.addBtn} spacing={2}
                            variant="contained" color="primary">
                        Next
                    </button>
                </Box>
            </form>
        </React.Fragment>
    )
}

export default PersonalDetail;
