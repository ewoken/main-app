import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLocation } from 'react-router-redux';

import MainMenu from './MainMenu';
import ContentLayout from './ContentLayout';
import ErrorHandler from './ErrorHandler';
import Loader from './Loader';

import SignUpView from '../views/signUp/SignUpView';
import LogInView from '../views/logIn/LogInView';
import ErrorView from '../views/error/ErrorView';
import ForgotPasswordView from '../views/forgotPassword/ForgotPasswordView';
import ResetPasswordView from '../views/resetPassword/ResetPasswordView';

import {
  getLoggedUser,
  isLoggedUserLoaded,
  isLogged,
} from '../store/loggedUser';

const { Header, Content } = Layout;

function AppLayout(props) {
  return (
    <Loader
      load={props.getLoggedUser}
      isLoaded={props.isLoggedUserLoaded}
      spinSize="large"
    >
      <Layout>
        <Header className="AppLayout__header">
          <MainMenu />
        </Header>
        <Content className="AppLayout__content">
          <ContentLayout>
            <ErrorHandler>
              {props.isLogged ? (
                <Switch location={props.location}>
                  <Route
                    exact
                    path="/logged"
                    component={() => <div>Logged In</div>}
                  />
                  <Route exact path="/error" render={ErrorView} />
                  <Route render={() => <Redirect to="/logged" />} />
                </Switch>
              ) : (
                <Switch location={props.location}>
                  <Route exact path="/signUp" component={SignUpView} />
                  <Route
                    exact
                    path="/signedUp"
                    component={() => <div>Signed up</div>}
                  />
                  <Route exact path="/logIn" component={LogInView} />
                  <Route
                    exact
                    path="/forgotPassword"
                    component={ForgotPasswordView}
                  />
                  <Route
                    exact
                    path="/resetPassword"
                    component={ResetPasswordView}
                  />
                  <Route exact path="/error" render={ErrorView} />
                  <Route render={() => <Redirect to="/signUp" />} />
                </Switch>
              )}
            </ErrorHandler>
          </ContentLayout>
        </Content>
      </Layout>
    </Loader>
  );
}

AppLayout.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
  isLoggedUserLoaded: PropTypes.bool.isRequired,
  isLogged: PropTypes.bool.isRequired,
  getLoggedUser: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    isLogged: isLogged(state),
    isLoggedUserLoaded: isLoggedUserLoaded(state),
    location: getLocation(state),
  }),
  {
    getLoggedUser,
  },
)(AppLayout);
