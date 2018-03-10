import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';

import { Menu } from 'antd';

function MainMenu(props) {
  const { t } = props;
  return (
    <div className="MainMenu">
      <Menu
        key="title"
        mode="horizontal"
        theme="dark"
        className="MainMenu__leftPart"
        selectable={false}
      >
        <Menu.Item>Main-app</Menu.Item>
      </Menu>
      <Menu
        key="links"
        mode="horizontal"
        theme="dark"
        className="MainMenu__rightPart"
        selectable={false}
      >
        <Menu.Item key="logIn">
          <Link href="/#/logIn" to="/logIn">
            {t('logIn')}
          </Link>
        </Menu.Item>
        <Menu.Item key="signUp">
          <Link href="/#/signUp" to="/signUp">
            {t('signUp')}
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

MainMenu.propTypes = {
  t: PropTypes.func.isRequired,
};

export default translate('MainMenu')(MainMenu);
