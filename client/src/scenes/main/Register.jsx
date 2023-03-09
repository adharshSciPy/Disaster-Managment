import React from 'react'
import { Container, Box, } from '@mui/system'
import Typography from '@mui/material/Typography'
import { Card, Grid } from '@mui/material'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react';

function Register() {
  // form validation
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phoneNumber: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // inputs onChange handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  // form validation
  const validateFormData = (data) => {
    const errors = {};


    // Full Name validation
    if (!data.fullName) {
      errors.fullName = 'Full Name is required';
    } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(data.fullName)) {
      errors.fullName = 'Full Name is invalid';
    }

    return errors;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateFormData(formData);
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      console.log('No errors')
    }
    else {
      console.log("Errror found in validation")
    }
  }
  return (
    <Container minWidth="md" maxWidth="md">
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: '8rem' }}>
        <Card sx={{ width: '40%', borderRadius: '1rem', p: '1rem', boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 400 }}>Register</Typography>


          <Box
            component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Full name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={!!formErrors.fullName}
                  helperText={formErrors.fullName}
                  required
                  autoFocus
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  error={!!formErrors.lastname}
                  helperText={formErrors.lastname}
                  required
                  autoFocus
                  fullWidth
                  size="small"
                />
              </Grid>


              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  required
                  autoFocus
                  fullWidth
                  size="small"
                />
              </Grid>


              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  required
                  autoFocus
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create Account
                </Button>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouterLink to="/login">
                    <Link component="span" variant="caption">
                      {"Already have an account? Sign In"}
                    </Link>
                  </RouterLink>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  )
}

export default Register