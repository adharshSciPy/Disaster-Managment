import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'

function LandingPage() {

  return (
    <Container maxWidth='md'>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Stack direction="column" justifyContent='space-between' alignItems='center'>
          <Box>
            <Typography variant="h5" color="primary" >Disaster Managment</Typography>
          </Box>

          <Box sx={{ height: '20rem', width: '20rem', overflow: 'hidden' }}>
            <img sx={{ height: '50%', width: '50%' }} src="https://img.lovepik.com/photo/40012/6170.jpg_wh860.jpg" alt="" />
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}

export default LandingPage