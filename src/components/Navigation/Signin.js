import React from 'react';
import './Signin.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }

  onEmailChange = (event) => {
    this.setState(
      { signInEmail: event.target.value },
      console.log('hello email')
    );
  };

  onPasswordChange = (event) => {
    this.setState(
      { signInPassword: event.target.value },
      console.log('hello password')
    );
  };

  onSubmitSignIn = () => {
    var myString = JSON.stringify({
      email: this.state.singInEmail,
      password: this.state.signInPassword,
    });
    console.log(myString);
    console.log(this.state.signInEmail, this.state.signInPassword);
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          console.log('hello user');
          this.props.loadUser(user);
          console.log(user);
          this.props.onRouteChange('home');
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shadow-5">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('register')}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange('home')}
                className="f6 link dim black db pointer"
              >
                Continue as guest{' '}
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;