import React from 'react'
import { Box, Container } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid';
import { Button, Fade, Grid, Modal, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

function ReliefCenter() {

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalData, setModalData] = React.useState('')


  // demo data
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'centerName', headerName: 'First name', width: 300 },
    { field: 'location', headerName: 'Last name', width: 300 },
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

          // alert(JSON.stringify(thisRow));
          setModalData((thisRow));
          handleOpen()
          console.log(modalData)
        };

        return <Button variant='outlined' onClick={onClick} size="small" >View More</Button>;
      },
    },
  ];

  const rows = [
    { id: 1, centerName: 'Scipy Relief Center', contactInfo: '+91 8139031923', location: 'karyavattom', capacity: 22 },
    { id: 2, centerName: 'Lorem Relief Center', contactInfo: '+91 8139031923', location: 'karyavattom', capacity: 22 },
    { id: 3, centerName: 'Ipsum Relief Center', contactInfo: '+91 8139031923', location: 'karyavattom', capacity: 22 },
    { id: 4, centerName: 'Carwol Relief Center', contactInfo: '+91 8139031923', location: 'karyavattom', capacity: 22 },
    { id: 5, centerName: 'Lalasd Relief Center', contactInfo: '+91 8139031923', location: 'karyavattom', capacity: 22 },
    { id: 6, centerName: 'Reosd Relief Center', contactInfo: '+91 8139031923', location: 'karyavattom', capacity: 22 },
    { id: 7, centerName: 'Posdf Relief Center', contactInfo: '+91 8139031923', location: 'karyavattom', capacity: 22 },
    { id: 8, centerName: 'Bavasd Relief Center', contactInfo: '+91 8139031923', location: 'karyavattom', capacity: 22 },
    { id: 9, centerName: 'Postse Relief Center', contactInfo: '+91 8139031923', location: 'karyavattom', capacity: 22 },
  ];



  return (
    <Box sx={{ mt: 8 }}>
      <Container>
        <Stack container direction='row' alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h5" color="initial">Releif Center</Typography>
          {/* <Button variant="outlined" onClick={handleOpen}>Add Center</Button> */}
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="h6" color="primary" sx={{ fontWeight: '600', fontSize: '1rem' }}>Center Details</Typography>
            </Stack>


            <Grid container alignItems='center' justifyContent='space-between' >
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="subtitle1" color="initial">
                      Aswas Relief Center
                    </Typography>
                    <Box sx={{ width: '70%' }}>
                      <Typography variant="caption" color="secondary">
                        Aswas Relief Center, Kadavantara, Erankulam Twn, 698438
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="initial">
                      +91 8129023910
                    </Typography>
                  </Box>

                  <Box>
                    <Stack direction="row" alignItems="baseLine" justifContent="center">
                    <Typography variant="h3" color="secondary">
                      23 
                    </Typography>
                    <Typography variant="h6" color="secondary">Slots</Typography>
                    </Stack>
                   
                    <Typography variant="body2" color="primary">
                      In Charge: Hareesh
                    </Typography>
                  </Box>
                </Stack>
              </Grid>

              <Grid item xs={12}>

              </Grid>

              <Grid item>

              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default ReliefCenter