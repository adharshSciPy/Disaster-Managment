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

function MyReliefCenter() {
    // table demo data
    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const [reliefCenter, setReliefCenter] = useState(false)
    const [reliefCenterData, setReliefCenterData] = useState([])
    const userId = '640ebd6f861347e3c197e5d7'

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



    const loadData = () => {
        axios.get(`/relief/getreliefcenterbyid/${userId}`)
            .then((res) => {
                console.log(res)
                setReliefCenterData(res.data)
                setUpdateNumber(res.data[0].Capacity)
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
    const [updateNumber, setUpdateNumber] = useState()
    const handleSlotUpdate = () => {
        console.log('update slot')
        !updateSlot ? setSlotUpdate(true) : setSlotUpdate(false)
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

    // modal states
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Box sx={{ p: 2 }}>
                                            <Typography variant="h6" color="initial" sx={{ mb: 3 }}>{reliefCenterData[0].CenterName}</Typography>
                                            <Stack direction="row" alignItems="center" justifyContent="start" spacing={2}>
                                                <Box>
                                                    <Typography variant="body2" color="initial">contact Info: </Typography>
                                                    <Typography variant="body2" color="initial">location:</Typography>
                                                </Box>

                                                <Box>
                                                    <Typography variant="body2" color="initial">{reliefCenterData[0].Phone}</Typography>
                                                    <Typography variant="body1" color="primary">Karyavattom</Typography>
                                                </Box>
                                            </Stack>
                                        </Box>


                                        <Box sx={{ p: 3 }}>
                                            <Stack direction="column" alignItems='center' justifyContent="center">
                                                {
                                                    !updateSlot ?
                                                        <Typography variant="h2" color="initial" onDoubleClick={handleSlotUpdate}>{reliefCenterData[0].Capacity}</Typography>
                                                        :
                                                        <Stack direction="row" alignItems="center" justifyContent='center'>
                                                            <Button onClick={() => setUpdateNumber(updateNumber !== 0 ? updateNumber - 1 : 0)}>-</Button>
                                                            <Typography variant="h2" color="primary">{updateNumber}</Typography>
                                                            <Button onClick={() => setUpdateNumber(updateNumber !== 0 && updateNumber + 1)}>+</Button>
                                                        </Stack>
                                                }
                                            </Stack>
                                        </Box>

                                        {updateSlot &&
                                            <Box sx={{ mr: 3 }}>
                                                <Button size="small" onClick={handleSlotUpdate}>Update Slot</Button>
                                            </Box>
                                        }

                                    </Stack>
                                </Card>

                            </Grid>

                            <Grid item xs={12}>
                                <Card sx={{ width: '100%', height: 'auto', borderRadius: '1rem', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', backgroundColor: '#0000800', p: 2 }}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Item Name</TableCell>
                                                    <TableCell align="right">Quantity</TableCell>
                                                    <TableCell align="right">Status</TableCell>
                                                    <TableCell align="right">Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right">{row.fat}</TableCell>
                                                        <TableCell align="right">
                                                            <ButtonGroup size="small" aria-label="small button group">
                                                                <IconButton color="error">
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                <IconButton color="success">
                                                                    <CheckIcon />
                                                                </IconButton>
                                                            </ButtonGroup>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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
                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                                <Typography variant="h6" color="primary" >Supply Request</Typography>
                                <Button variant="contained" size="small">Send</Button>
                            </Stack>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Item" variant="outlined" size="small" />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField label="Quantity" variant="outlined" size="small" />
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </Container>
        </>
    )
}

export default MyReliefCenter