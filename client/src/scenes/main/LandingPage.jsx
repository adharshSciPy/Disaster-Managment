import { Box, Button, Container, Stack, Typography, Grid } from "@mui/material";
import React from "react";
import heroImg from "../../assets/hero-img.png";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate()
  return (
    // <Box
    //   sx={{
    //     backgroundColor: "#000080",
    //     mt: -2,
    //     minHeight: "100vh",
    //     width: "100%",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   <Container maxWidth="lg">
    //     {/* main page container */}
    //     <Box
    //       sx={{
    //         height: "100%",
    //         width: "100%",
    //         color: "#fff",
    //       }}
    //     >
    //       <Box>
    //         <Stack
    //           direction={{ xs: "column", sm: "row" }}
    //           spacing={{ xs: 1, sm: 2, md: 4 }}
    //           justifyContent="space-between"
    //           alignItems="center"
    //         >
    //           <Box>
    //             <Typography variant="h2">Disaster</Typography>
    //             <Typography variant="h1">Managment</Typography>

    //             <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
    //               Be Prepared Be Safe
    //             </Typography>
    //             <Button
    //               variant="contained"
    //               sx={{
    //                 backgroundColor: "#fff",
    //                 color: "#000080",
    //                 "&:hover": {
    //                   backgroundColor: "#fff",
    //                 },
    //               }}
    //               onClick={() => navigate('/login')}
    //             >
    //               Get Started
    //             </Button>
    //           </Box>

    // <Box sx={{ maxHeight: "40vh", maxWidth: "25vw" }}>
    //   <img
    //     src={heroImg}
    //     alt="hero"
    //     style={{ height: "100%", width: "100%" }}
    //   />
    // </Box>
    //         </Stack>
    //       </Box>
    //     </Box>
    //   </Container>
    // </Box>
    <>
      <Box sx={{
        backgroundColor: "#000080",
        minHeight: '100vh',
        mt: -5,
        display: 'flex',
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6} >
              <Box>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box sx={{ color: "#fff", pl: '4rem' }}>
                    <Typography variant="h3">Disaster
                    </Typography>

                    <Typography variant="h2">Managment</Typography>

                    <Typography variant="h5" sx={{
                      mt: 2, mb: 2
                    }}>
                      Be Prepared Be Safe!
                    </Typography>


                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#fff",
                        color: "#000080",
                        "&:hover": {
                          backgroundColor: "#fff",
                        },
                      }}
                      onClick={() => navigate('/login')}
                    >
                      Get Started
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            <Grid item lg={6} display={{ xs: 'none', md: 'block' }}>
              <Box sx={{ maxHeight: '60vh', maxWidth: '30vw', pr: '4rem' }}>
                <img
                  src={heroImg}
                  alt="hero"
                  style={{ height: "100%", width: "100%" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default LandingPage;
