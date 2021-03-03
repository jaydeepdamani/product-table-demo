import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

/*Material UI*/
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ProductForm from "../components/ProductForm";
import FilterListIcon from '@material-ui/icons/FilterList';

/*Styles Start*/
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
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
}));
/*Styles End*/

const createData = (name, qty, price, status) => {
    return {name, qty, price, status};
}

const rows = [
    createData('ItemA', 1, 300, "Available"),
    createData('ItemB', 10, 400, "Added"),
    createData('ItemC', 15, 500, "Available"),
    createData('ItemD', 22, 200, "Added"),
    createData('ItemE', 30, 100, "Available"),
    createData('ItemF', 1, 50, "Added"),
    createData('ItemG', 1, 300, "Available"),
    createData('ItemH', 10, 400, "Added"),
    createData('ItemI', 15, 500, "Available"),
    createData('ItemJ', 22, 200, "Added"),
    createData('ItemK', 30, 100, "Available"),
    createData('ItemL', 1, 50, "Added"),
];

const headCells = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Product Name'},
    {id: 'qty', numeric: true, disablePadding: false, label: 'Quantity'},
    {id: 'price', numeric: true, disablePadding: false, label: 'Price'},
    {id: 'status', numeric: true, disablePadding: false, label: 'Status'},
];

const EnhancedTableHead = (props) => {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"/>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="center"
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const {numSelected} = props;
    const history = useHistory();

    const handleCartClick = () => {
        const tmpCartData = []
        props.selectedData.map(itm => {
            tmpCartData.push(props.products.find(item => item.name === itm))
        })
        history.push('/checkout', { data: tmpCartData });
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Whey Protiens Products
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Shopping Cart">
                    <IconButton aria-label="shopping cart">
                        <ShoppingCartIcon fontSize="large" onClick={handleCartClick}/>
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <Tooltip title="Filter list">
                        <IconButton aria-label="filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedData: PropTypes.array,
    products: PropTypes.array
};

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const ProductTable = () => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('qty');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [products, setProducts] = useState(rows)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = products.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        if(!((products.find(itm => itm.name === name).status).toLowerCase() === "added")) {
            const selectedIndex = selected.indexOf(name);
            let newSelected = [];
            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name);
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                );
            }
            setSelected(newSelected);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addProduct = (product) => {
        product.id = products.length + 1
        setProducts([...products , product])
        setOpen(false);
    }

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = e => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        if(searchTerm) {
            const results = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.qty.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.status.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setProducts(results)
        } else {
            setProducts(rows)
        }
    }, [searchTerm]);

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Box py={5}>
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography align="center" color="secondary" className="" variant="h4" gutterBottom>
                                    Product Table
                                </Typography>
                            </Grid>
                            <Grid item align="right" xs={12}>
                                <Button variant="contained" color="secondary" onClick={handleOpen}>
                                    Add Item
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
                                                <Typography align="center" color="primary" className="" variant="h4" gutterBottom>
                                                    Add Item
                                                </Typography>
                                            </Box>

                                            <Grid item xs={12}>
                                                <ProductForm addProduct={addProduct}/>
                                            </Grid>
                                        </div>
                                    </Fade>
                                </Modal>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Grid boxShadow={3} xs={12}>
                                <Paper className={classes.paper}>
                                    <EnhancedTableToolbar
                                        numSelected={selected.length}
                                        selectedData={selected}
                                        products={products}
                                    />
                                    <TableContainer>
                                        <Grid xs={12}>
                                            <Box mx={2}>
                                                <TextField
                                                    placeholder="Search"
                                                    value={searchTerm}
                                                    onChange={handleSearch}
                                                    label="Search"
                                                />
                                            </Box>
                                        </Grid>
                                        <Table
                                            className={classes.table}
                                            aria-labelledby="tableTitle"
                                            aria-label="enhanced table"
                                        >
                                            <EnhancedTableHead
                                                classes={classes}
                                                numSelected={selected.length}
                                                order={order}
                                                orderBy={orderBy}
                                                onSelectAllClick={handleSelectAllClick}
                                                onRequestSort={handleRequestSort}
                                                rowCount={products.length}
                                            />
                                            <TableBody>
                                                {stableSort(products, getComparator(order, orderBy))
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row, index) => {
                                                        const isItemSelected = isSelected(row.name);
                                                        const labelId = `enhanced-table-checkbox-${index}`;

                                                        return (
                                                            <TableRow
                                                                hover
                                                                onClick={(event) => handleClick(event, row.name)}
                                                                role="checkbox"
                                                                aria-checked={isItemSelected}
                                                                tabIndex={-1}
                                                                key={row.name}
                                                                selected={isItemSelected}
                                                            >
                                                                <TableCell padding="checkbox">
                                                                    {!((row.status).toLowerCase() === "added") &&
                                                                        <Checkbox
                                                                            checked={isItemSelected}
                                                                            inputProps={{'aria-labelledby': labelId}}
                                                                        />
                                                                    }
                                                                </TableCell>
                                                                <TableCell align="center" component="th" id={labelId}
                                                                           scope="row" padding="none">
                                                                    {row.name}
                                                                </TableCell>
                                                                <TableCell align="center">{row.qty}</TableCell>
                                                                <TableCell align="center">{row.price}</TableCell>
                                                                <TableCell align="center">{row.status}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow>
                                                        <TableCell colSpan={6}/>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 20, 30]}
                                        component="div"
                                        count={products.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </Grid>
                        </Box>
                    </div>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default ProductTable;
