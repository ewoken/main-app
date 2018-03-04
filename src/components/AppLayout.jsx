import React from 'react';
import { Layout } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';

import MainMenu from './MainMenu';
import ContentLayout from './ContentLayout';

import SignUpView from '../views/SignUpView';

const { Header, Content } = Layout;

function AppLayout() {
  return (
    <Layout>
      <Header className="AppLayout__header">
        <MainMenu />
      </Header>
      <Content className="AppLayout__content">
        <ContentLayout>
          <Switch>
            <Route exact path="/signUp" component={SignUpView} />
            <Route
              exact
              path="/signedUp"
              component={() => <div>Signed up</div>}
            />
            <Route exact path="/logIn" component={() => <div>Log in</div>} />
            <Route render={() => <Redirect to="/signUp" />} />
          </Switch>
        </ContentLayout>
      </Content>
    </Layout>
  );
}

export default AppLayout;
