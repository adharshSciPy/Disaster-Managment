import React from 'react'
import Typography from '@mui/material/Typography'
import { Button, Card, Container, Grid, Stack, Table, TextField, Modal, Fade, Paper, Backdrop, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/system'
import { toast } from 'react-toastify'
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import uuid from "react-uuid";

function MyReliefCenter() {
    const [rows, setRows] = useState([])



    function getStatusButton(status) {
        const delivery = () => {
            console.log('id' + status._id)
            axios.put(`relief/confirmdelivery/${status._id}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }
        switch (status.Status) {
            case 'dispatched':
                return <Button variant="outlined" size="small" color="info" onClick={() => delivery()}>Confirm</Button>;
            default:
                return '';
        }
    }
    // table demo data
    const columns = [
        { field: '_id', headerName: 'ID', width: 70 },
        { field: 'CenterName', headerName: 'Center Name', width: 200 },
        { field: 'ItemName', headerName: 'Item', width: 300 },
        { field: 'Quantity', headerName: 'Quantity', width: 130 },
        { field: 'isDisabled', headerName: 'Checkbox', hide: true, selectable: false },
        {
            field: 'Status',
            headerName: 'Status',
            width: 150,
            // hide: true
        },
        {
            field: 'confirm',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => (
                <div>
                    {
                        getStatusButton(params.row)
                    }

                </div>
            )
        },

    ];

    const [reliefCenter, setReliefCenter] = useState(false)
    const [reliefCenterData, setReliefCenterData] = useState([])
    const [reliefCenterId, setReliefCenterId] = useState()
    const userId = useSelector((state) => state.auth.id)
    console.log('user id' + userId)


    // setting rows in datagrid
    function setRow() {
        axios
            .get(`relief/getSupplyReqbyCreator/${userId}`)
            .then((res) => {
                setRows(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    React.useEffect(() => {
        setRow();
    }, []);

    // creating relief center 
    const [reliefForm, setReliefForm] = useState({
        CenterName: '',
        Phone: '',
        Capacity: '',
        Address: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReliefForm({ ...reliefForm, [name]: value });
    };



    const loadData = async () => {
        await axios.get(`/relief/getreliefcenterbyid/${userId}`)
            .then((res) => {
                console.log(res.data)
                setReliefCenterData(res.data)
                setReliefCenterId(res.data[0]._id)
                const dataArr = res.data
                if (dataArr.length === 0) {
                    setReliefCenter(false)
                }
                else {
                    setReliefCenter(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        loadData()
    }, []);


    // update slot
    const [updateSlot, setSlotUpdate] = useState(false)
    const [updateNumber, setUpdateNumber] = useState(0)
    const [IncrementNumber, setIncrementNumber] = useState(0)
    const [DecrementNumber, setDecrementNumber] = useState(0)

    const handleIncrement = () => {
        console.log('handle increment slot')
        // const val = ((reliefCenterData[0].Capacity - reliefCenterData[0].Admission) - updateNumber)
        setIncrementNumber((reliefCenterData[0].Capacity - reliefCenterData[0].Admission) - updateNumber)
        axios.put(`relief/addadmission/${reliefCenterId}`, {
            Admission: IncrementNumber
        })
            .then((res) => {
                console.log(res)
                loadData()
                setSlotUpdate(0)
                handleIncModalClose()
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleDecrement = () => {
        console.log('handle decrement slot')
        axios.put(`relief/addadmission/${reliefCenterId}`, {
            Admission: updateNumber
        })
            .then((res) => {
                console.log(res)
                loadData()
                handleDecModalClose()
            })
            .catch((err) => {
                console.log(err)
            })
    }




    // submit function of form
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(reliefForm);

        const form = {
            CenterName: reliefForm.CenterName,
            Capacity: reliefForm.Capacity,
            Phone: reliefForm.Phone,
            Address: reliefForm.Address,
            InCharge: userId
        }

        axios.post('relief/addreliefcenter', form)
            .then((res) => {
                console.log(res);
                toast.success('Relief Center Created');
                setReliefForm({
                    CenterName: '',
                    Phone: '',
                    Capacity: '',
                    Address: ''
                });
                loadData()
            })
            .catch((err) => {
                console.log(err);
            });
    };


    // modal style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: '#fff',
        boxShadow: 24,
        pt: 2,
        p: 4,
        // fontFamily: 'Poppins sans-serif'
    };

    // modal style
    const AccomModalstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: '#fff',
        boxShadow: 24,
        pt: 2,
        p: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    };

    // modal states
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [accoIncModal, setAccoIncModal] = React.useState(false);
    const [accoDecModal, setAccoDecModal] = React.useState(false);

    const handleIncModal = () => setAccoIncModal(true);
    const handleIncModalClose = () => {
        setAccoIncModal(false);
        setUpdateNumber(0)
    };
    const handleDecModal = () => setAccoDecModal(true);
    const handleDecModalClose = () => {
        setAccoDecModal(false);
        setUpdateNumber(0)
    };

    // handle supply request
    const [item, setItem] = useState('')
    const [quantity, setQuantity] = useState('')


    // handle supply request api
    const handleSupplyRequest = () => {
        const form = {
            ItemName: item,
            Quantity: quantity,
            CenterName: reliefCenterData[0].CenterName,
            Phone: reliefCenterData[0].Phone,
            Requester: userId
        }
        axios.post('/relief/addreliefsupplyrequest', form)
            .then((res) => {
                console.log(form)
                console.log(res.data)
                handleClose()
                toast.success('Request Submitted')
                setRow();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Container maxWidth="lg">
                {
                    reliefCenter ?
                        <Grid container spacing={2} sx={{ mt: '-3rem', display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                            <Grid item sx={6}>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 600, fontSize: '15px' }}>
                                    My Relief Center
                                </Typography>
                            </Grid>


                            <Grid item sx={6}>
                                <Button variant="outlined" size="small" onClick={handleOpen}>
                                    Supply Request
                                </Button>
                            </Grid>




                            <Grid item xs={12}>
                                <Card sx={{ width: '100%', height: '20vh', borderRadius: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', backgroundColor: '#0000800', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Grid container alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
                                        <Grid item xs={6}  >
                                            <Typography variant="h6" color="initial" sx={{ mb: 1 }}>{reliefCenterData[0].CenterName}</Typography>
                                            <Stack direction="row" alignItems="center" justifyContent="start" spacing={2}>
                                                <Box>
                                                    <Typography variant="body2" color="initial">contact Info</Typography>
                                                    <Typography variant="body2" color="initial">Vaccancy</Typography>
                                                    <Typography variant="body2" color="initial">Address</Typography>
                                                </Box>

                                                <Box>
                                                    <Typography variant="body2" color="initial">{reliefCenterData[0].Phone}</Typography>
                                                    <Typography variant="body2" color="initial">{reliefCenterData[0].Capacity - reliefCenterData[0].Admission} <span> / </span>{reliefCenterData[0].Capacity}</Typography>
                                                    <Typography variant="body2" color="primary">{reliefCenterData[0].Address}</Typography>
                                                </Box>
                                            </Stack>
                                        </Grid>


                                        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <Stack direction="column" alignItems='center' justifyContent="center" gap="1rem">
                                                {/* <Button variant="outlined" color="primary" size="small" onClick={() => handleAccomOpen()}>
                                                    Add Accomodation
                                                </Button>

                                                <Button variant="outlined" color="primary" size="small" onClick={() => handleAccomOpen()}>
                                                    Room Vacating
                                                </Button> */}

                                                <ButtonGroup
                                                    disableElevation
                                                    variant="outlined"
                                                >
                                                    <Button onClick={() => handleIncModal()}>Admint</Button>
                                                    <Button onClick={() => handleDecModal()}>Vacate</Button>
                                                </ButtonGroup>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card sx={{ width: '100%', height: '80vh', borderRadius: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', backgroundColor: '#0000800', p: 2 }}>
                                    {/* table */}
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 5,
                                                },
                                            },
                                        }}
                                        pageSizeOptions={[5]}
                                        getRowId={(row: any) => uuid()}

                                    />

                                </Card>
                            </Grid>
                        </Grid>

                        :
                        <Grid container spacing={3} direction="column" alignItems='center' justifyContent="center" sx={{ mt: 3 }}>
                            <Grid item>
                                <Typography variant="h5" color="initial">Create your Relief Center</Typography>
                            </Grid>

                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, p: 3, width: '40vw', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="text"
                                            label="Center Name"
                                            name="CenterName"
                                            value={reliefForm.CenterName}
                                            size="small"
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="tel"
                                            label="Phone No"
                                            name="Phone"
                                            size="small"
                                            value={reliefForm.Phone}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="number"
                                            label="Capacity"
                                            name="Capacity"
                                            size="small"
                                            value={reliefForm.Capacity}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="text"
                                            label="Address"
                                            name="Address"
                                            size="small"
                                            value={reliefForm.Address}
                                            onChange={handleChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Create Relief Center
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>



                }


                {/* modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            {/* supply request */}
                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                                <Typography variant="h6" color="primary" >Supply Request</Typography>
                                <Button variant="contained" size="small" onClick={() => handleSupplyRequest()}>Send</Button>
                            </Stack>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Item" variant="outlined" size="small" onChange={(e) => setItem(e.target.value)} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField label="Quantity" variant="outlined" size="small" onChange={(e) => setQuantity(e.target.value)} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>


                {/* Accomodation admitting modal */}
                <Modal
                    open={accoIncModal}
                    onClose={handleIncModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={accoIncModal}>
                        <Box sx={AccomModalstyle}>
                            <Typography variant="h6" color="initial">Add Accomodation</Typography>
                            <Stack direction="row" alignItems="center" justifyContent='center'>
                                <Button></Button>
                                <Typography variant="h2" color="primary">{updateNumber}</Typography>
                                <Button onClick={() => setUpdateNumber(updateNumber + 1)}>+</Button>
                            </Stack>
                            <Button variant="outlined" color="primary" size="small" sx={{ mt: 2 }} onClick={() => handleIncrement()}>
                                Update
                            </Button>
                        </Box>
                    </Fade>
                </Modal>


                {/* Accomodation Vocating modal */}
                <Modal
                    open={accoDecModal}
                    onClose={handleDecModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={accoDecModal}>
                        <Box sx={AccomModalstyle}>
                            <Typography variant="h6" color="initial">Add Accomodation</Typography>
                            <Stack direction="row" alignItems="center" justifyContent='center'>
                                <Button></Button>
                                <Typography variant="h2" color="primary">{updateNumber}</Typography>
                                <Button onClick={() => setUpdateNumber(updateNumber + 1)}>+</Button>
                            </Stack>
                            <Button variant="outlined" color="primary" size="small" sx={{ mt: 2 }} onClick={() => handleDecrement()}>
                                Update
                            </Button>
                        </Box>
                    </Fade>
                </Modal>
            </Container >
        </>
    )
}

export default MyReliefCenter