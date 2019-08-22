import React, { Fragment, Component } from 'react'
import { Redirect } from 'react-router-dom'
import classNames from 'classnames'
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Divider
} from '@material-ui/core'
import { ChevronLeft, ChevronRight, ExitToApp, Menu } from '@material-ui/icons'
import Tooltip from '@material-ui/core/Tooltip'
import { SidebarItems } from '../../component';

export default class Sidebar extends Component {
  constructor () {
    super()
    this.state = {
      isloggedIn: 'hidden',
      isloggedout: false
    }
    this.handleLogout = this.handleLogout.bind(this)
  }
  
  handleLogout () {
    this.setState({
      isloggedout: true
    })
    sessionStorage.removeItem("userName", '')
    sessionStorage.removeItem('UserToken', '')
  }

  componentDidMount () {
    this.HandleComponentChange();
  }

  HandleComponentChange = () => {
    sessionStorage.getItem('UserToken')
      ? (this.setState({
          isloggedIn : 'visible'
        })
      ) : (
        this.setState({
          isloggedIn : 'hidden'
        })
      )
  }

  render () {
    const { classes, theme, open, toggle } = this.props
    return (
      <div>
        {this.state.isloggedout === true ? <Redirect to='/login' /> : <div />}
        <Fragment>
          <AppBar
            position='absolute'
            className={classNames(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar
              style={{
                // position: "fixed",
                width: '100%',
                minHeight: 48,
                backgroundColor: '#1565C0'
              }}
              disableGutters={!open}
            >
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={toggle}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <Menu />
              </IconButton>
              <Typography style={{ fontSize: 20 }} color='inherit' noWrap>
                Dcoder
              </Typography>
              {/* <Text> */}
                <p style={{marginLeft: 'auto', marginRight: "10px"}}>{window.sessionStorage.getItem("userName")}</p>
              {/* </Text> */}
              <IconButton
                style={{
                  // marginLeft: 'auto',
                  marginRight: '10px',
                  visibility: this.state.isloggedIn
                }}
                onClick={this.handleLogout}
              >
                <Tooltip title='LogOut'>
                  <ExitToApp />
                </Tooltip>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant='permanent'
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              )
            }}
            open={open}
          >
            <div style={{ minHeight: 48 }} className={classes.toolbar}>
              <IconButton onClick={toggle}>
                {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </div>
            <Divider />
            <SidebarItems />
          </Drawer>
        </Fragment>
      </div>
    )
  }
}







