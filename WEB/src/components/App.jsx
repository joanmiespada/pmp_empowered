import React, { Component } from 'react';
import { AppBar, Layout, NavDrawer, Panel, FontIcon } from 'react-toolbox';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
} from 'react-router-dom';
import Login from './Login';
import MenuOption from './MenuOption';


const Home = () => (
  <p> Home<br />matches.</p>
);

const WillMatch = () => <h3>Matched!</h3>;

const NoMatch = () => (
  <div>
    <h3>
      No matched component
    </h3>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
      loginDialog: false,
    };
  }

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  loginOpen = () => {
    this.setState({ loginDialog: !this.state.loginDialog });
  }

  render() {
    return (
      <BrowserRouter>
        <Router>
          <Layout>
            <Login showme={this.state.loginDialog} handleToggle={this.loginOpen} />
            <NavDrawer
              active={this.state.drawerActive}
              permanentAt="xxxl"
              onOverlayClick={this.toggleDrawerActive}
            >
              <MenuOption close={this.toggleDrawerActive} label="User List" url="/users" />
              <MenuOption close={this.toggleDrawerActive} label="Task List" url="/tasks" />
            </NavDrawer>
            <Panel>
              <AppBar
                title="Pmp enhanced"
                leftIcon="menu"
                rightIcon={<FontIcon value="account_circle" />}
                onLeftIconClick={this.toggleDrawerActive}
                onRightIconClick={this.loginOpen}
              />
              <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/users" component={WillMatch} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
            </Panel>
          </Layout>
        </Router>
      </BrowserRouter>
    );
  }
}

export default App;
