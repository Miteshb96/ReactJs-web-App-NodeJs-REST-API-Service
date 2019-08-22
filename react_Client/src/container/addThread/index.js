import React, { Component } from 'react'
import axios from 'axios';
import moment from "moment";
import { Redirect, Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avtar from '../../image/Avtar.png';
import environment from "../../environment";

const styles = theme => ({
  button: {
    position: 'relative',
    display: 'block',
    margin: 'auto',
    width: '130px',
    padding: 0
  },
  invalidField: {
    color: "red"
  },
  link: {
    position: 'relative',
    // display: 'block',
    margin: '5px 10px',
    width: '130px',
    padding: 0
  },
  root: {
    ...theme.mixins.gutters(),
    flexGrow: '1',
    margin: '5px',
    center: 'true',
    marginTop: '10px',
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: '450px',
    minHeight: '450px',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  input: {
    fontFamily: 'Montserrat-Bold',
    fontSize: '15px',
    lineHeight: 1.2,
    color: '#333333',

    display: 'block',
    width: '90%',
    /* background: #fff; */
    height: '40px',
    borderRadius: '5px',
    padding: '0 20px 0 10px',
    margin: '5px 25px 5px 0px'
  },
  image: {
    display: 'block',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

class AddThread extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      description: '',
      titlePlaceholder: "",
      descPlaceholder: "",
      tagPlaceholder: "",
      tags: [],
      addthread: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleformSubmit = this.handleformSubmit.bind(this)
  }

  handleChange = name => event => {
    if(name === "title"){
      event.target.value.length !== 0 ? (
      this.setState({
          [name]: event.target.value,
          titlePlaceholder: ""
        }))
      : 
        this.setState({
          [name]: "",
          titlePlaceholder: "Invalid"
        })
        // document.getElementById("emailId").focus()
      
    } else if (name === "description") {
      event.target.value.length !== 0 ?
        this.setState({
          [name]: event.target.value,
          descPlaceholder: ""
        }) 
        : 
        this.setState({
          [name]: "",
          descPlaceholder: "Invalid"
        });
        // document.getElementById("password").focus(); 
      } else {
        if (event.target.value.length !== 0) {
          const temp =  event.target.value.split(",");
          this.setState({
            tags: temp
          });
        } else{
          this.setState({
            [name]: "",
            tagPlaceholder: "Invalid"
          });
        }
      }
  }

  handleformSubmit () {
    // hit User APi
    if(this.state.title.length === 0) {
      window.alert("Enter Correct title. (Title Cannot be empty.)");
      // document.getElementById("emailId").focus();
    } else if (this.state.description.length === 0) {
      window.alert("Enter Correct Description. (Description Cannot be empty.)");
      // document.getElementById("password").focus();
    } else if (this.state.tags.length === 0) {
      window.alert("Enter Correct Tags. (Tags Cannot be empty.)");
    } else {
    const User = {
      title: this.state.title,
      description: this.state.description,
      tags: this.state.tags,
      userName: window.sessionStorage.getItem("userName"),
      date: moment()
    }
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'application/json'
      }
    };
    axios.defaults.headers.common['Authorization'] =
    'bearer ' + window.sessionStorage.getItem("UserToken");

    axios
    .post(`${environment.DEV_ENDPOINT}thread/addThread`, { ...User }, {config})
      .then(res => {
        this.setState({
          title: "",
          description: "",
          tags: [],
          addthread: true
        });
      })
    }
  }

  render () {
    const { classes } = this.props;

    return (
      <div className = {classes.body} >
        <div>
            {window.sessionStorage.getItem('UserToken')
                ? <Paper className={classes.root} elevation={1}>
                    <h2 style={{textAlign: "center", fontFamily: 'Google Sans'}}>
                      {"Add new thread here"}
                    </h2>  
                    <img src={Avtar} alt='AVATAR' className={classes.image} />
                    <Typography variant='body2'>
                      Title:
                    </Typography>
                    <input
                        type='text'
                        id='title'
                        placeholder="Enter title"
                        onBlur={this.handleChange('title')}
                        className={classes.input}
                        defaultValue={this.state.title}
                        required
                    />
                    {this.state.titlePlaceholder === "Invalid" ? 
                      <p className={classes.invalidField}>
                        {"Invalid Entry! Please enter correct title."}
                      </p>
                      : null
                    }
                    <Typography variant='body2'>
                        description:
                    </Typography>
                    <input
                        type='text'
                        id='description'
                        placeholder="Describe about you here."
                        onBlur={this.handleChange('description')}
                        className={classes.input}
                        defaultValue={this.state.description}
                    />
                    {this.state.descPlaceholder === "Invalid" ? 
                      <p className={classes.invalidField}>
                        {"Invalid Entry! Please enter correct Description."}
                      </p>
                      : null
                    }
                    <Typography variant='body2'>
                        tags:
                    </Typography>
                    <input
                        type='text'
                        id='tags'
                        placeholder="Enter tags as comma saperated values"
                        onBlur={this.handleChange('tags')}
                        className={classes.input}
                        defaultValue={this.state.tags.length > 0 ? this.state.tags.join(", ") : undefined}
                        required
                    />
                    {this.state.tagPlaceholder === "Invalid" ? 
                      <p className={classes.invalidField}>
                        {"Invalid Entry! Please enter correct tags."}
                      </p>
                      : null
                    }
                    <br/>
                    <Button
                        variant='raised'
                        color='secondary'
                        className={classes.button}
                        onClick = {this.handleformSubmit}
                    >
                        Create
                    </Button>
                    {
                      this.state.addthread ? 
                        <Redirect to='/threadList' />
                        : null
                    }
                </Paper>
                :
                <Redirect to="/login" />
            }
          </div>
      </div>
    )
  }
}

export default withStyles(styles)(AddThread)
