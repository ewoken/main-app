import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

function MainMenu() {
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
            Log In
          </Link>
        </Menu.Item>
        <Menu.Item key="signUp">
          <Link href="/#/signUp" to="/signUp">
            Sign Up
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default MainMenu;
