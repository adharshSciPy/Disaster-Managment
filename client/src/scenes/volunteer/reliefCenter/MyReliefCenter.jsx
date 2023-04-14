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
    // table demo data
    const columns = [
        { field: '_id', headerName: 'ID', width: 70 },
        { field: 'CenterName', headerName: 'Center Name', width: 250 },
        { field: 'ItemName', headerName: 'Item', width: 2.00 },
        { field: 'Quantity', headerName: 'Quantity', width: 130 },
        {
            field: 'Status',
            headerName: 'Status',
            width: 130,
            // hide: true
        }
    ];

    // setting rows in datagrid
    function setRow() {
        axios
            .get(`relief/getreliefsupply`)
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



    const [reliefCenter, setReliefCenter] = useState(false)
    const [reliefCenterData, setReliefCenterData] = useState([])
    const [reliefCenterId, setReliefCenterId] = useState()
    const userId = useSelector((state) => state.auth.id)
    console.log('user id' + userId)

    // creating relief center 
    const [reliefForm, setReliefForm] = useState({
        CenterName: '',
        Phone: '',
        Capacity: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReliefForm({ ...reliefForm, [name]: value });
    };



    const loadData = async () => {
        await axios.get(`/relief/getreliefcenterbyid/${userId}`)
            .then((res) => {
                console.log(res)
                setReliefCenterData(res.data)
                setReliefCenterId(res.data[0]._id)
                setUpdateNumber(res.data[0].Admission)
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
    const handleSlotUpdate = () => {
        console.log('update slot')
        axios.put(`relief/addadmission/${reliefCenterId}`, {
            Admission: updateNumber
        })
            .then((res) => {
                console.log(res)
                loadData()
                handleAccomClose()
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
            InCharge: userId
        };

        axios.post('relief/addreliefcenter', form)
            .then((res) => {
                console.log(res);
                toast.success('Relief Center Created');
                setReliefForm({
                    CenterName: '',
                    Phone: '',
                    Capacity: ''
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

    const [accomodationModal, setAccomodationModal] = React.useState(false);
    const handleAccomOpen = () => setAccomodationModal(true);
    const handleAccomClose = () => setAccomodationModal(false);


    // handle supply request
    const [item, setItem] = useState('')
    const [quantity, setQuantity] = useState('')


    // handle supply request api
    const handleSupplyRequest = () => {
        const form = {
            ItemName: item,
            Qunatity: quantity,
            CenterName: reliefCenterData[0].CenterName,
            Phone: reliefCenterData[0].Phone
        }
        axios.post('/relief/addreliefsupplyrequest', form)
            .then((res) => {
                console.log(res.data)
                handleClose()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 6 }}>
                {
                    reliefCenter ?
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between" >
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
                                <Card sx={{ width: '100%', height: '25vh', borderRadius: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', backgroundColor: '#0000800' }}>
                                    <Grid container alignItems="center" justifyContent="space-between">
                                        <Grid item xs={6} sx={{ p: 2 }}>
                                            <Typography variant="h6" color="initial" sx={{ mb: 1 }}>{reliefCenterData[0].CenterName}</Typography>
                                            <Stack direction="row" alignItems="center" justifyContent="start" spacing={2}>
                                                <Box>
                                                    <Typography variant="body2" color="initial">contact Info</Typography>
                                                    <Typography variant="body2" color="initial">Vaccancy</Typography>
                                                    <Typography variant="body2" color="initial">location</Typography>
                                                </Box>

                                                <Box>
                                                    <Typography variant="body2" color="initial">{reliefCenterData[0].Phone}</Typography>
                                                    <Typography variant="body2" color="initial">{reliefCenterData[0].Capacity - reliefCenterData[0].Admission} <span> / </span>{reliefCenterData[0].Capacity}</Typography>
                                                    <Typography variant="body2" color="primary">Karyavattom</Typography>
                                                </Box>
                                            </Stack>
                                        </Grid>


                                        <Grid item xs={3} sx={{ p: 3 }}>
                                            <Stack direction="column" alignItems='center' justifyContent="center">
                                                <Button variant="outlined" color="primary" size="small" onClick={() => handleAccomOpen()}>
                                                    Add Accomodation
                                                </Button>
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
                                        checkboxSelection
                                        disableRowSelectionOnClick
                                        getRowId={(row: any) => uuid()}
                                    />

                                </Card>
                            </Grid>
                        </Grid>

                        :

                        setInterval(() => {
                            return (
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
                            )
                        }, 1000)

                }
                {/* modal */}
                <Modal
                    // aria-labelledby="transition-modal-title"
                    // aria-describedby="transition-modal-description"
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

                <Modal
                    open={accomodationModal}
                    onClose={handleAccomClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={accomodationModal}>
                        <Box sx={AccomModalstyle}>
                            <Typography variant="h6" color="initial">Add Accomodation</Typography>
                            <Stack direction="row" alignItems="center" justifyContent='center'>
                                <Button onClick={() => setUpdateNumber(updateNumber !== 0 ? updateNumber - 1 : 0)}>-</Button>
                                <Typography variant="h2" color="primary">{updateNumber}</Typography>
                                <Button onClick={() => setUpdateNumber(updateNumber !== 0 && updateNumber + 1)}>+</Button>
                            </Stack>
                            <Button variant="outlined" color="primary" size="small" sx={{ mt: 2 }} onClick={() => handleSlotUpdate()}>
                                Update
                            </Button>
                        </Box>
                    </Fade>
                </Modal>
            </Container>
        </>
    )
}

export default MyReliefCenter