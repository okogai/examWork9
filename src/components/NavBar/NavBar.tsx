import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            color="inherit"
            component={NavLink}
            to="/"
            sx={{ textDecoration: "none" }}
          >
            Finance tracker
          </Typography>
          <Box sx={{ ml: "auto", display: "flex" }}>
            <Button
              color="inherit"
              variant="text"
              component={NavLink}
              to="/categories"
            >
              Categories
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
