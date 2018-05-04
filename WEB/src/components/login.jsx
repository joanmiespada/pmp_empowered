import React from 'react';
import { Dialog, Input } from 'react-toolbox';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passw: '',
      formValid: false,
      formErrors: { email: undefined, passw: undefined },
    };
  }

  handleChange = name => (value) => {
    this.setState({ ...this.state, [name]: value }, () => {
      const validate = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      };
      const valid = (validate(this.state.email) && this.state.passw.length > 0) ? true : false;
      this.setState({ ...this.state, formValid: valid });
    });
  }

  login = () => {
  }

  render() {
    const errorMessage = [];
    const red = { color: 'red' };

    if (this.state.formErrors.email !== undefined) {
      errorMessage.push((<span style={red}>{this.state.formErrors.email} </span>));
    }
    if (this.state.formErrors.passw !== undefined) {
      errorMessage.push((<span style={red}> {this.state.formErrors.email} </span>));
    }

    const actions = [
      {
        label: 'Login',
        disabled: !this.state.formValid,
        raised: true,
        primary: true,
        onClick: this.login,
      },
      { label: 'Close', onClick: this.props.handleToggle },
    ];

    return (
      <Dialog
        actions={actions}
        active={this.props.showme}
        onEscKeyDown={this.props.handleToggle}
        onOverlayClick={this.props.handleToggle}
        title="Login"
      >
        <Input
          type="email"
          label="Email address"
          required
          value={this.state.email}
          maxLength={50}
          onChange={this.handleChange('email')}
        />
        <Input
          type="password"
          label="Password"
          required
          value={this.state.passw}
          maxLength={50}
          onChange={this.handleChange('passw')}
        />
        {errorMessage}
      </Dialog>);
  }
}

Login.propTypes = {
  showme: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default Login;

