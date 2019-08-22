import React, { Component } from 'react'
import axios from 'axios'
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
    maxWidth: '350px',
    minHeight: '350px',
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

class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      Password: '',
      emailPlaceholder: 'Enter Email-id',
      passplaceholder: 'Enter Password',
      Token: 'token',
      UserVerified: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleformSubmit = this.handleformSubmit.bind(this)
  }

  handleChange = name => event => {
    if(name === "email"){
      event.target.value.length !== 0 ? (
      this.setState({
          [name]: event.target.value,
          emailPlaceholder: ""
        }))
      : (
        this.setState({
          [name]: "",
          emailPlaceholder: "Invalid"
        })
        // document.getElementById("emailId").focus()
      )
    } else {
      event.target.value.length !== 0 ?
        this.setState({
          [name]: event.target.value,
          passplaceholder: ""
        }) 
        : 
        this.setState({
          [name]: "",
          passplaceholder: "Invalid"
        });
        // document.getElementById("password").focus(); 
      } 
  }

  handleformSubmit () {
    // hit User APi
    if(this.state.email.length === 0) {
      window.alert("Enter Correct Email-id. (Email Cannot be empty.)");
      // document.getElementById("emailId").focus();
    } else if (this.state.Password.length === 0) {
      window.alert("Enter Correct Password. (password Cannot be empty.)");
      // document.getElementById("password").focus();
    } else {
    const User = {
      email: this.state.email,
      password: this.state.Password
    }
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'application/json'
      }
    };
    axios.defaults.headers.common['Authorization'] =
    'bearer ' + window.sessionStorage.getItem("UserToken");

    User.email.length > 0 && User.password.length > 0 ?
    axios
    .post(`${environment.DEV_ENDPOINT}auth/login`, { ...User }, {config})
      .then(res => {
        const data = Object.values(res.data);
        if( data[0] === 1 ) {
          window.alert("Password does not match.");
        } else if( data[0] === 0 ) {
          window.alert("Email does not exist.");
        } else {
          window.sessionStorage.setItem('UserToken', data[0]);
          window.sessionStorage.setItem('userName', this.state.email);
          this.setState({
            email: "",
            Password: "",
            Token: data[0],
            UserVerified: true
          });
        }
      })
      : null
    }
  }

  handleRedirect = () => {
    <Redirect to='/register' />
  }

  render () {
    const { classes } = this.props;

    return (
      <div className = {classes.body} >
        {!this.state.UserVerified
          ? <div>
            {window.sessionStorage.getItem('UserToken')
                ? <div>
                  <Redirect to='/threadList' />
                </div>
                : <Paper className={classes.root} elevation={1}>
                    <h2 style={{textAlign: "center", fontFamily: 'Google Sans'}}>
                      {"Sign In"}
                    </h2>  
                    <h4 style={{textAlign: "center", fontFamily: 'Google Sans'}}>
                      {"to continue to Dcoder"}
                    </h4> 
                  <img src={Avtar} alt='AVATAR' className={classes.image} />
                  <Typography variant='body2'>
                      Email:
                    </Typography>
                  <input
                    type='email'
                    id='emailId'
                    placeholder="Enter Email-id"
                    onBlur={this.handleChange('email')}
                    className={classes.input}
                    defaultValue={this.state.email}
                    />
                  {this.state.emailPlaceholder === "Invalid" ? 
                    <p style={{color: "red"}}>
                      {"Invalid Entry! Please enter correct email-id."}
                    </p>  
                    : null
                  }
                  <Typography variant='body2'>
                      Password:
                    </Typography>
                  <input
                    type='password'
                    id='password'
                    placeholder="Enter Passsword"
                    onBlur={this.handleChange('Password')}
                    className={classes.input}
                    defaultValue={this.state.password}
                    />
                  {this.state.passplaceholder === "Invalid" ? 
                    <p style={{color: "red"}}>
                      {"Invalid Entry! Please enter correct password."}
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
                      LogIn
                  </Button>
                  <div className={classes.link}>
                    <Link to="/register" >{"Create account"}</Link>
                  </div>
                </Paper>}
          </div>
          : <Redirect to='/threadList' />}
      </div>
    )
  }
}

export default withStyles(styles)(Login)
