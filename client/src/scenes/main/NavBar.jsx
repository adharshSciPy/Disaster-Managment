import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];
const mainNavItems = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Login',
    link: '/login'
  },
  {
    title: 'Register',
    link: '/register'
  }
]

function DrawerAppBar(props) {
  const naivgate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // navlink active style
  let activeStyle = {
    textDecoration: "none",
    backgroundColor: "skyblue",
    borderRadius: ".8rem",
  };

  let nonActiveStyle = {
    textDecoration: "none",
  };


  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {
          !isAuthenticated &&
          mainNavItems.map((item, val) => (
            <ListItem key={val} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={() => naivgate(item.link)}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))
        }
        {
          isAuthenticated &&
          navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', mb: 10 }}>
      <CssBaseline />
      <AppBar component="nav" position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>


            {
              !isAuthenticated &&
              mainNavItems.map((item, val) => (
                <NavLink to={item.link} style={({ isActive }) =>
                  isActive ? activeStyle : nonActiveStyle
                }>
                  <Button key={val} sx={{ color: '#fff' }}>
                    {item.title}
                  </Button>
                </NavLink>
              ))

            }
            {

              isAuthenticated && <Button>Logout</Button>
            }

          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;