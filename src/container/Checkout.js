import React, {useEffect, useState} from "react";
import {withRouter} from 'react-router-dom';

import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PersonalDetail from "../components/PersonalDetail";
import ShipmentDetails from "../components/ShipmentDetails";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
        width: '100%',
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperModal: {
        minWidth: '500px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3),
        borderRadius: '20px',
        outline: 'none'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const getSteps = () => {
    return ['Personal Details', 'Shipment Details'];
}

const getStepContent = (stepIndex, handleNext, data) => {
    switch (stepIndex) {
        case 0:
            return <PersonalDetail handleNext={handleNext}/>;
        case 1:
            return <ShipmentDetails data={data}/>;
        default:
            return 'Unknown stepIndex';
    }
}

const Checkout = (props) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {
        if (props?.location?.state?.data) {
            setData(props?.location?.state?.data)
        }
    }, [props.location.state.data]);


    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Box py={5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h6" className={classes.title}>
                                Items Selected List
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell align="right">Price</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row, k) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                                <TableCell align="right">{row.price}</TableCell>
                                                <TableCell align="right">{row.qty}</TableCell>
                                                <TableCell align="right">{row.status}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item align="center" xs={12}>
                            <Button variant="contained" color="secondary" onClick={handleOpen}>
                                Buy Now
                            </Button>
                            <Modal
                                aria-labelledby="spring-modal-title"
                                aria-describedby="spring-modal-description"
                                className={classes.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <div className={classes.paperModal}>
                                        <Box align="right" mb={2}>
                                            <Button variant="contained" color="secondary"
                                                    onClick={handleClose}>
                                                X
                                            </Button>
                                        </Box>
                                        <Box mb={3} color="primary.main">
                                            <Typography align="center" color="primary" className="" variant="h4"
                                                        gutterBottom>
                                                Payment Details
                                            </Typography>
                                        </Box>
                                        <Grid item xs={12}>
                                            <div className={classes.root}>
                                                <Stepper activeStep={activeStep} alternativeLabel>
                                                    {steps.map((label) => (
                                                        <Step key={label}>
                                                            <StepLabel>{label}</StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                                <div>
                                                    {activeStep === steps.length ? (
                                                        <div>
                                                            <Typography className={classes.instructions}>All steps
                                                                completed</Typography>
                                                            <Button onClick={handleReset}>Reset</Button>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <Typography
                                                                className={classes.instructions}>{getStepContent(activeStep, handleNext, data)}</Typography>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Grid>
                                    </div>
                                </Fade>
                            </Modal>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default withRouter(Checkout);
