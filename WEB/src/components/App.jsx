import React, { Component } from 'react'
import { AppBar, Checkbox, IconButton } from 'react-toolbox'
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox'
import GithubIcon from './githubicon'
import Login from './login'

class App extends Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false,
    loginDialog: false
  };
toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };
toggleDrawerPinned = () => {
    this.setState({ drawerPinned: !this.state.drawerPinned });
  };
toggleSidebar = () => {
    this.setState({ sidebarPinned: !this.state.sidebarPinned });
  };
loginOpen = () => {
    this.setState({ loginDialog: !this.state.loginDialog });
    console.log(this.state)
}
render() {
    return (
      <Layout>
        <Login  showme={this.state.loginDialog } />
        <NavDrawer active={this.state.drawerActive}
                    permanentAt='xxxl'
                   onOverlayClick={ this.toggleDrawerActive }>
          <p>
            Navigation, account switcher, etc. go here.
          </p>
        </NavDrawer>
        <Panel>
          <AppBar title="Pmp enhanced" leftIcon="menu" rightIcon={<GithubIcon/>} 
                    onLeftIconClick={ this.toggleDrawerActive } onRightIconClick={this.loginOpen}   />
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            <h1>Welcome</h1>
            
          </div>
        </Panel>
        <Sidebar pinned={ this.state.sidebarPinned } width={ 5 }>
          <div><IconButton icon='close' onClick={ this.toggleSidebar }/></div>
          <div style={{ flex: 1 }}>
            <p>Supplemental content goes here.</p>
          </div>
        </Sidebar>
      </Layout>
    );
  }
}
export default App
