import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Menu } from 'antd';

import { loggedUserSelector, isLogged, logOut } from '../store/loggedUser';

const MenuItem = Menu.Item;
const { SubMenu } = Menu;

class UserMenu extends React.Component {
  constructor() {
    super();
    this.state = { openKeys: [] };
  }

  render() {
    return (
      <Menu
        key="logged"
        mode="horizontal"
        theme="dark"
        className="MainMenu__logged"
        selectable={false}
        openKeys={this.state.openKeys}
        onOpenChange={openKeys => this.setState({ openKeys })}
        onClick={() => this.props.logOut()}
      >
        <SubMenu
          key="user"
          title={this.props.loggedUser.email}
          onTitleClick={({ key }) => this.setState({ openKeys: [key] })}
        >
          <MenuItem key="logOut">{this.props.t('Log out')}</MenuItem>
        </SubMenu>
      </Menu>
    );
  }
}

UserMenu.defaultProps = {
  loggedUser: null,
};

UserMenu.propTypes = {
  t: PropTypes.func.isRequired,
  loggedUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  logOut: PropTypes.func.isRequired,
};

function MainMenu(props) {
  const { t } = props;
  return (
    <div className="MainMenu">
      <Menu
        key="title"
        mode="horizontal"
        theme="dark"
        className="MainMenu__logo"
        selectable={false}
      >
        <MenuItem>Main-app</MenuItem>
      </Menu>
      {props.isLogged ? (
        <UserMenu t={t} loggedUser={props.loggedUser} logOut={props.logOut} />
      ) : (
        <Menu
          key="links"
          mode="horizontal"
          theme="dark"
          className="MainMenu__logInSignUp"
          selectable={false}
        >
          <MenuItem key="logIn">
            <Link href="/#/logIn" to="/logIn">
              {t('logIn')}
            </Link>
          </MenuItem>
          <MenuItem key="signUp">
            <Link href="/#/signUp" to="/signUp">
              {t('signUp')}
            </Link>
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}

MainMenu.defaultProps = {
  loggedUser: null,
};

MainMenu.propTypes = {
  t: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  loggedUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }),
  logOut: PropTypes.func.isRequired,
};

const connection = connect(
  state => ({
    isLogged: isLogged(state),
    loggedUser: loggedUserSelector(state),
  }),
  { logOut },
);

export default compose(connection, translate('MainMenu'))(MainMenu);
