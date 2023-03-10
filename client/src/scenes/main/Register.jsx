import React from 'react'
import { Container, Box, } from '@mui/system'
import Typography from '@mui/material/Typography'
import { Card, Grid, MenuItem } from '@mui/material'
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
    phoneNumber: '',
  });
  const [formErrors, setFormErrors] = useState({});



  const [role, setRole] = useState('')
  const handleChange = (event) => {
    if (event.target.value === 'reliefCenter') {
      setRole('reliefCenter')
    }
    else if (event.target.value === 'collectionCenter') {
      setRole('collectionCenter')
    }
  }

  // inputs onChange handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  // form validation
  const validateFormData = (data) => {
    const errors = {};


    // First Name validation
    if (!data.firstName) {
      errors.firstName = 'First Name is required';
    } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(data.firstName)) {
      errors.firstName = 'Full Name is invalid';
    }


    // Last Name validation
    if (!data.lastName) {
      errors.lastName = 'Last Name is required';
    } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(data.lastName)) {
      errors.lastName = 'Full Name is invalid';
    }


    // Email validation
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }


    // Email validation
    if (!data.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(data.phoneNumber)) {
      errors.phoneNumber = 'Phone Number is invalid';
    }



    // Password validation
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(data.password)) {
      errors.password = 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number';
    }


    // Confirm Password validation
    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    }
    else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }


    // userRole validation
    if (role === '') {
      errors.role = 'User Role is required'
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
    <Container minWidth="lg" maxWidth="lg">
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: '8rem' }}>
        <Card sx={{ width: '40%', borderRadius: '1rem', p: '1rem', boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 400 }}>Register</Typography>


          <Box
            component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}

                  autoFocus
                  fullWidth
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  autoFocus
                  fullWidth
                  size="small"
                />
              </Grid>


              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}

                  autoFocus
                  fullWidth
                  size="small"
                />
              </Grid>


              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  error={!!formErrors.phoneNumber}
                  helperText={formErrors.phoneNumber}

                  autoFocus
                  fullWidth
                  size="small"
                />
              </Grid>


              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}

                  autoFocus
                  fullWidth
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}

                  autoFocus
                  fullWidth
                  size="small"
                />

              </Grid>


              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  select
                  label="Role"
                  name='userRole'
                  value={role}
                  sx={{ width: '100%' }}
                  error={!!formErrors.role}
                  helperText={formErrors.role}
                  onChange={handleChange}
                  size="small"
                >
                  <MenuItem value='reliefCenter'>Relief Center</MenuItem>
                  <MenuItem value='collectionCenter'>Collection Center</MenuItem>
                </TextField>
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