// This file is shared across the UI.

import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText } from "@material-ui/core";
import { AccountCircle, PersonAdd, List, TextFormat } from "@material-ui/icons";

export default ({ toggle }) => (
  <div>
    {!window.sessionStorage.getItem('UserToken') ?
    <Link onClick={toggle} to="/login">
      <ListItem button>
        <AccountCircle />
        <ListItemText primary="Login" />
      </ListItem>
    </Link>: null}
    {!window.sessionStorage.getItem('UserToken') ?
    <Link onClick={toggle} to="/register">
      <ListItem button>
        <PersonAdd />
        <ListItemText primary="Register" />
      </ListItem>
    </Link>: null}
    <Link onClick={toggle} to="/threadList">
      <ListItem button>
        <List />
        <ListItemText primary="threadList" />
      </ListItem>
    </Link>
    <Link onClick={toggle} to="/addThread">
      <ListItem button>
        <TextFormat />
        <ListItemText primary="addThread" />
      </ListItem>
    </Link>
  </div>
);
