import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  List,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navigation({ open, handler }) {
  const [selected, setSelected] = useState(0);

  const toggleDrawer = () => {
    handler(!open);
  };

  const handlePageChange = (event, el) => {
    setSelected(el);
    toggleDrawer();
  };

  const drawer = (
    <Box sx={{ width: 256 }}>
      <Toolbar>
        {/* <Typography variant="h5" sx={{ display: { sm: "none" } }}>
          Hacker News
        </Typography> */}
      </Toolbar>
      <Divider />
      <List>
        <Link
          to="/new"
          onClick={(event) => handlePageChange(event, 0)}
          className="nav-link"
        >
          <ListItemButton selected={selected === 0}>
            <ListItemText primary={`New`}></ListItemText>
          </ListItemButton>
        </Link>
        <Link
          to="/top"
          onClick={(event) => handlePageChange(event, 1)}
          className="nav-link"
        >
          <ListItemButton selected={selected === 1}>
            <ListItemText primary={`Top`}></ListItemText>
          </ListItemButton>
        </Link>
        <Link
          to="/ask"
          onClick={(event) => handlePageChange(event, 2)}
          className="nav-link"
        >
          <ListItemButton selected={selected === 2}>
            <ListItemText primary={`Ask`}></ListItemText>
          </ListItemButton>
        </Link>
        <Link
          to="/show"
          onClick={(event) => handlePageChange(event, 3)}
          className="nav-link"
        >
          <ListItemButton selected={selected === 3}>
            <ListItemText primary={`Show`}></ListItemText>
          </ListItemButton>
        </Link>
        <Link
          to="/jobs"
          onClick={(event) => handlePageChange(event, 4)}
          className="nav-link"
        >
          <ListItemButton selected={selected === 4}>
            <ListItemText primary={`Jobs`}></ListItemText>
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar
        position="sticky"
        sx={
          open && {
            width: { sm: "calc(100%-256px)" },
            ml: { sm: "256px" },
          }
        }
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 3 }}
          >
            <Menu></Menu>
          </IconButton>
          <Typography variant="h6">Hacker News</Typography>
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
      <Box>
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          sx={{ display: { sm: "none" } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="persistent"
          open={open}
          onClose={toggleDrawer}
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
