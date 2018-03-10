import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLocation } from 'react-router-redux';

import MainMenu from './MainMenu';
import ContentLayout from './ContentLayout';
import ErrorHandler from './ErrorHandler';

import SignUpView from '../views/signUp/SignUpView';
import LogInView from '../views/logIn/LogInView';
import ErrorView from '../views/error/ErrorView';

import {
  getLoggedUser,
  isLoggedUserLoaded,
  isLogged,
} from '../store/loggedUser';

const { Header, Content } = Layout;

class AppLayout extends React.PureComponent {
  componentWillMount() {
    this.props.getLoggedUser();
  }

  render() {
    return (
      this.props.isLoggedUserLoaded && (
        <Layout>
          <Header className="AppLayout__header">
            <MainMenu />
          </Header>
          <Content className="AppLayout__content">
            <ContentLayout location={this.props.location}>
              <ErrorHandler>
                {this.props.isLogged ? (
                  <Switch location={this.props.location}>
                    <Route
                      exact
                      path="/logged"
                      component={() => <div>Logged In</div>}
                    />
                    <Route exact path="/error" render={ErrorView} />
                    <Route render={() => <Redirect to="/logged" />} />
                  </Switch>
                ) : (
                  <Switch location={this.props.location}>
                    <Route exact path="/signUp" component={SignUpView} />
                    <Route
                      exact
                      path="/signedUp"
                      component={() => {
                        return <div>Signed up</div>;
                      }}
                    />
                    <Route exact path="/logIn" component={LogInView} />
                    <Route exact path="/error" render={ErrorView} />
                    <Route render={() => <Redirect to="/signUp" />} />
                  </Switch>
                )}
              </ErrorHandler>
            </ContentLayout>
          </Content>
        </Layout>
      )
    );
  }
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
