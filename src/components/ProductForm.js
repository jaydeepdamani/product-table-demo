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

const ProductForm = (props) => {

    const classes = useStyles();

    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
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
        if(checkObjectIsEmptyOrNot(isValid)){
            setName('');
            setQty('');
            setPrice('');
            setStatus('');
            props.addProduct({
                name,
                qty,
                price,
                status
            })
        }
    }

    const formValidation = () => {
        const tmpError = {...error}
        if(name.trim().length === 0 && name.trim().length < 3 ){
            tmpError.name = "Please add product name.";
        } else {
            tmpError.name = ""
        }
        if(qty.trim().length === 0 && qty.trim().length < 3 ){
            tmpError.qty = "Please add minimum 1 quantity.";
        } else {
            tmpError.qty = ""
        }
        if(price.trim().length === 0 && price.trim().length < 3 ){
            tmpError.price = "Please add valid price.";
        } else {
            tmpError.price = ""
        }
        if(status.trim().length === 0 ){
            tmpError.status = "Please add status.";
        } else {
            tmpError.status = ""
        }
        setError(tmpError)
        return tmpError
    }

    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={onSubmit}>
                <Box mb={2}>
                    <TextField fullWidth
                               name="name"
                               value={name}
                               onChange={(e) => {
                                   setName(e.target.value)
                               }}
                               label="Item Name"/>
                    {error && error.name && <div className={classes.errMsg}>{error.name}</div>}
                </Box>
                <Box mb={2}>
                    <TextField fullWidth
                               name="qty"
                               value={qty}
                               onChange={(e) => {
                                   setQty(e.target.value)
                               }}
                               label="Quantity"/>
                    {error && error.qty && <div className={classes.errMsg}>{error.qty}</div>}
                </Box>
                <Box mb={2}>
                    <TextField fullWidth
                               name="price"
                               value={price}
                               onChange={(e) => {
                                   setPrice(e.target.value)
                               }}
                               label="Price"/>
                    {error && error.price && <div className={classes.errMsg}>{error.price}</div>}
                </Box>
                <Box mb={2}>
                    <TextField fullWidth
                               name="status"
                               value={status}
                               onChange={(e) => {
                                   setStatus(e.target.value)
                               }}
                               label="Status"/>
                    {error && error.status && <div className={classes.errMsg}>{error.status}</div>}
                </Box>
                <Box align="center">
                    <button className={classes.addBtn} spacing={2}
                            variant="contained" color="primary">
                        Add
                    </button>
                </Box>
            </form>
        </div>
    )
}

export default ProductForm;
