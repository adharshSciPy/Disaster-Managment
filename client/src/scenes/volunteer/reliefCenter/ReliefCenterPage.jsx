import React from 'react'
import { Box, Container } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Fade, Grid, Modal, Stack, TextField, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';

function ReliefCenterPage() {

  // modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#fff',
    boxShadow: 24,
    pt:2,
    p: 4,
    fontFamily: 'Poppins sans-serif'
  };

  // modal states
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // demo data
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );

          alert(JSON.stringify(thisRow));
          navigate('sfd')
        };

        return <Button variant='outlined' onClick={onClick} size="small" >More</Button>;
      },
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: 'Eros', age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];


  // usenavigation hook
  const navigate = useNavigate()

  return (
    <Box sx={{ mt: 8 }}>
      <Container>
        <Stack container direction='row' alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h5" color="initial">Accomodation</Typography>
          <Button variant="outlined" onClick={handleOpen}>Add Accomodation</Button>
        </Stack>

        <Box sx={{ height: '80vh', maxHeight: '70vh', width: '90vw' }}>
          <DataGrid columns={columns} rows={rows} />
        </Box>
      </Container>


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
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{mb:3}}>
            <Typography variant="body1" color="initial" >Center Details</Typography>
            <Button variant="contained" size="small">Save</Button>
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="Outlined" variant="outlined" size="small" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField label="Outlined" variant="outlined" size="small" />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField label="Outlined" variant="outlined" size="small"  fullWidth/>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default ReliefCenterPage