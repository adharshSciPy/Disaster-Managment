import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { logout } from "../../store/auth";
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "js-cookie";


const drawerWidth = 240;
// navItems when user not logged in
const mainNavItems = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Login",
    link: "/login",
  },
  {
    title: "Register",
    link: "/register",
  },
];

// navItems for user who have relief center role
const reliefNavItems = [
  {
    title: 'My Relief Center',
    link: 'volunteer/my-relief-center'
  },
  {
    title: 'All Relief Centers',
    link: 'volunteer/relief-center'
  }
]


function DrawerAppBar(props) {
  const naivgate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role)
  // logout functionality
  const handleLogout = () => {
    dispatch(logout())
    naivgate('/')
    Cookies.remove('Token')
  }

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // navlink active style
  let activeStyle = {
    textDecoration: "none",
    backgroundColor: "skyblue",
    borderRadius: ".5rem",
    padding: '.1rem',
    textAlign: "center",
  };

  let nonActiveStyle = {
    textDecoration: "none",
    textAlign: "center",
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Disaster Managment
      </Typography>
      <Divider />
      <List>
        {!isAuthenticated &&
          mainNavItems.map((item, val) => (
            <ListItem key={val} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => naivgate(item.link)}
              >
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}

        {
          role === 'relief' &&
          reliefNavItems.map((item, val) => {
            return (
              <ListItem key={val} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={() => naivgate(item.link)}
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            )
          })
        }
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", mb: 10 }}>
      <AppBar
        component="nav"
        position="fixed"
        color="primary"
        sx={{ boxShadow: "none", p: 0 }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Disaster Managment
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {!isAuthenticated &&
                mainNavItems.map((item, val) => (
                  <NavLink
                    to={item.link}
                    style={({ isActive }) =>
                      isActive ? activeStyle : nonActiveStyle
                    }
                  >
                    <Button key={val} sx={{ color: "#fff" }}>
                      {item.title}
                    </Button>
                  </NavLink>
                ))}

              {role === 'relief' &&
                reliefNavItems.map((item, val) => (
                  <NavLink
                    to={item.link}
                    style={({ isActive }) =>
                      isActive ? activeStyle : nonActiveStyle
                    }
                  >
                    <Button sx={{ color: "#fff" }}>
                      {item.title}
                    </Button>
                  </NavLink>
                ))}
              {isAuthenticated && <Button onClick={handleLogout} startIcon={<LogoutIcon />} sx={{ backgroundColor: 'white', color: '#fff', ml: 4 }}>Logout</Button>}
            </Box>
          </Toolbar>
        </Container>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
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
