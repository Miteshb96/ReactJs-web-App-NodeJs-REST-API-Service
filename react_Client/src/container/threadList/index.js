import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from 'react-router-dom'
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Chip from "@material-ui/core/Chip";
import { Stars } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import UserDetailsStyle from "./index.style";
import axios from "axios";
import environment from "../../environment";


class ThreadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      addThread: false
    }
  }

  componentWillMount() {
    this.getAllThreads();
  }

  getAllThreads() {
    axios
      .get(`${environment.DEV_ENDPOINT}thread/getThread`)
      .then(res => {
        const data = res.data;
        this.setState({
          threads: data
        });
      })
      .catch(error => {
        console.log("Error occured while fetching data");
        console.log(error);
      });
  }

  handleRedirect = () => {
    this.setState({
      addThread: true
    });
  }

  handleView = () => {
    const { classes } = this.props;
    const temp = [];
    for (let i = 0; i< this.state.threads.length ; i++) {
      temp.push(this.state.threads[i]);
    }
    const res = temp.map(t => {
      return <div style={{borderStyle: "groove", marginBottom: "10px", padding: "10px 20px 10px 20px"}}>
              <Grid
                className={classes.userProfileContent}
                container
                spacing={24}
              >
                <Grid item xs={12}>
                  <b>{"Title:  "}</b>{t.title}
                </Grid>
                <Grid item xs={12}>
                  <b>{"Description:  "}</b>{t.description}
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                <b>{"Tags:  "}</b>
                  <br />
                  {t.tags.map((tag, i) => {
                      return (
                        <Fragment>
                          <Chip
                            avatar={
                              <Avatar>
                                <Stars />
                              </Avatar>
                            }
                            key={i}
                            label={tag}
                            className={classes.interestsChip}
                          />
                        </Fragment>
                      );
                    })}
                </Grid>
              </Grid>
            </div>
    })
    return res;
  }


  render() {
    const { classes } = this.props;
    const res = this.handleView();
    return (
      <div className={classes.root}>
        {res}
        <Button variant="contained" color="primary" 
          style={{
            // margin: "auto 10px 10px auto",
            borderRadius: "65px",
            width: "64px",
            height: "62px",
            float: "right"
          }}
          onClick={this.handleRedirect}
        >
          <AddIcon />
        </Button>
        {
          this.state.addThread ? 
           <Redirect to='/addThread' />
           : null
        }
      </div>
    );
  }
}

ThreadList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(UserDetailsStyle)(ThreadList);
