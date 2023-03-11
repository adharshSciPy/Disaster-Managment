import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import heroImg from "../../assets/hero-img.png";

function LandingPage() {
  return (
    <Box
      sx={{
        backgroundColor: "#000080",
        mt: -2,
        minHeight: "90vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        {/* main page container */}
        <Box
          sx={{
            height: "100%",
            width: "100%",
            color: "#fff",
          }}
        >
          <Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h2">Disaster</Typography>
                <Typography variant="h1">Managment</Typography>

                <Typography variant="h5" sx={{ mt: 2, mb: 2 }}>
                  Be Prepared Be Safe
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
                >
                  Get Started
                </Button>
              </Box>

              <Box sx={{ maxHeight: "40vh", maxWidth: "25vw" }}>
                <img
                  src={heroImg}
                  alt="hero"
                  style={{ height: "100%", width: "100%" }}
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage;
