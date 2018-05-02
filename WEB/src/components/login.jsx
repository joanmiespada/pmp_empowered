import React, { Component } from 'react'
import Dialog from 'react-toolbox/lib/dialog'

class Login extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
          active: props.showme
        };
      }

    handleToggle = () => {
        this.setState({active: !this.state.active});

    }

    actions = [
        { label: "Login", onClick: this.handleToggle },
        { label: "Close", onClick: this.handleToggle }
      ];
 
    render() {
        return (<Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Login'
        >
          <p>Here you can add arbitrary content. Components like Pickers are using dialogs now.</p>
        </Dialog>)
    }
}

export default Login

