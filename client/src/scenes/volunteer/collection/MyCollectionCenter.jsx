import React from 'react'
import Typography from '@mui/material/Typography'
import { Button, Card, Container, Grid, Modal, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid';

function MyCollectionCenter() {


    // modal style
    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: '#fff',
        boxShadow: 24,
        pt: 2,
        p: 4,
    };
    // modal states
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [modalData, setModalData] = React.useState('')


    const [collectionCenter, setCollectionCenter] = useState(false)
    const [collectionCenterData, setCollectionCenterData] = useState([])
    const userId = '640ebd6f861347e3c197e5d7'

    // creating relief center 
    const [collectionForm, setCollectionForm] = useState({
        CenterName: '',
        Phone: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCollectionForm({ ...collectionForm, [name]: value });
    };



    const loadData = () => {
        axios.get(`/relief/getreliefcenterbyid/${userId}`)
            .then((res) => {
                console.log(res)
                setCollectionCenterData(res.data)
                const dataArr = res.data
                if (dataArr.length === 0) {
                    setCollectionCenter(false)
                }
                else {
                    setCollectionCenter(true)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        loadData()
    }, []);



    // submit function of form
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(reliefForm);

    //     const form = {
    //         CenterName: reliefForm.CenterName,
    //         Capacity: reliefForm.Capacity,
    //         Phone: reliefForm.Phone,
    //         InCharge: userId
    //     };

    //     axios.post('relief/addreliefcenter', form)
    //         .then((res) => {
    //             console.log(res);
    //             toast.success('Relief Center Created');
    //             setReliefForm({
    //                 CenterName: '',
    //                 Phone: '',
    //                 Capacity: ''
    //             });
    //             loadData()
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };


    // datarid
    function getStatusButton(status, rowData) {
        const handleAccept = () => {
            // here api to update the status of collection center
        };

        const handleDispatch = () => {
            setOpen(true)
            setModalData(rowData)
        }

        switch (status) {
            case 'pending':
                return <Button variant="outlined" size="small" onClick={handleAccept} color="info">Accept</Button>;
            case 'accepted':
                return <Button variant="outlined" size="small" onClick={handleDispatch} color="success">Dispatch</Button>;
            default:
                return '';
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'item', headerName: 'Item', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            // hide: true
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <div>
                    {getStatusButton(params.row.status, params.row)}
                </div>
            )
        }
    ];

    const rows = [
        { id: 1, name: 'Aswas Relif Center', item: 'Clothes', quantity: '8', status: 'pending' },
        { id: 2, name: 'Jane Smith', item: 'Food', quantity: '2', status: 'accepted' },
        { id: 3, name: 'Bob Johnson', item: 'Snacks', quantity: '3', status: 'pending' },
        { id: 4, name: 'Aswas Relif Center', item: 'Clothes', quantity: '10', status: 'pending' },
        { id: 5, name: 'Jane Smith', item: 'Water', quantity: '8', status: 'accepted' },
        { id: 6, name: 'Bob Johnson', item: 'Clothes', quantity: '8', status: 'pending' },
        { id: 7, name: 'Aswas Relif Center', item: 'Fuel', quantity: '10', status: 'pending' },
        { id: 8, name: 'Jane Smith', item: 'Food', quantity: '8', status: 'accepted' },
        { id: 9, name: 'Bob Johnson', item: 'Clothes', quantity: '20', status: 'pending' },
    ];


    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 6 }}>
                {
                    collectionCenter ?
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between" >
                            <Grid item sx={6}>
                                <Typography variant="h6" color="primary" sx={{ fontWeight: 600, fontSize: '15px' }}>
                                    My Collection Center
                                </Typography>
                            </Grid>


                            <Grid item xs={12}>
                                <Card sx={{ width: '100%', height: '25vh', borderRadius: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', backgroundColor: '#0000800' }}>
                                    <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2 }}>
                                        <Grid item xs={6} sx={{ p: 2 }}>
                                            <Typography variant="h6" color="initial" sx={{ mb: 3 }}>{collectionCenterData[0].CenterName}</Typography>
                                            <Stack direction="row" alignItems="center" justifyContent="start" spacing={2}>
                                                <Box>
                                                    <Typography variant="body2" color="initial">contact Info: </Typography>
                                                    <Typography variant="body2" color="initial">location:</Typography>
                                                </Box>

                                                <Box>
                                                    <Typography variant="body2" color="initial">{collectionCenterData[0].Phone}</Typography>
                                                    <Typography variant="body1" color="primary">Karyavattom</Typography>
                                                </Box>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card sx={{ width: '100%', height: 'auto', borderRadius: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', backgroundColor: '#0000800', p: 2 }}>
                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid rows={rows} columns={columns} />
                                    </div>
                                </Card>
                            </Grid>
                        </Grid>

                        :
                        <Grid container spacing={3} direction="column" alignItems='center' justifyContent="center" sx={{ mt: 3 }}>
                            <Grid item>
                                <Typography variant="h5" color="initial">Create your Relief Center</Typography>
                            </Grid>

                            <Box component="form" sx={{ mt: 2, p: 3, width: '40vw', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="text"
                                            label="Center Name"
                                            name="CenterName"
                                            value={collectionForm.CenterName}
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
                                            value={collectionForm.Phone}
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
                                            Create Relief Center                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                }

                {/* modal for despatching the supply request */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {modalData.name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {modalData.item}
                        </Typography>
                    </Box>
                </Modal>


            </Container>
        </>
    )
}

export default MyCollectionCenter