import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Styles from "./index.styles";
// import "./index.css";
import Sidebar from "../Sidebar";
import { withStyles } from "@material-ui/core";
import { default as AppRoutes } from "../../router";

class Main extends React.Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        {window.sessionStorage.getItem('UserToken') ? ( 
          <div className={classes.root}>
            <Sidebar
              classes={classes}
              theme={theme}
              open={open}
              toggle={() => this.handleToggle()}
            />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <AppRoutes />
            </main>
          </div>  
        ) : ( 
          <main className={classes.content}>
              <div className={classes.toolbar} />
              <AppRoutes />
          </main>
        )}
      </Fragment>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(Styles, { withTheme: true })(Main);
