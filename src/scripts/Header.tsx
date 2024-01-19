import React, { useState } from 'react';
import '../styles/header.css';
import Icon, { LikeOutlined, HeartOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Button } from 'antd';
import { deleteUser, getUser } from './helper/localUser';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';
import { calc } from 'antd/es/theme/internal';

const logout = () => {
    deleteUser();
    window.location.href = '/';
}

function truncateToFiveWords(inputString: string) {
    // Split the string into an array of words

    // Select the first 5 words and join them back together
    if (inputString.length <= 8) return inputString;
    return inputString.substring(0, 5) + '...';
}

const userId = truncateToFiveWords(getUser() || "");

const Header: React.FC = (tab: any) => {
    return <Layout.Header
        style={{
            zIndex: 1, width: '100%', height: '64px',
            padding: '0 10%', justifyContent: 'space-between', // Add this line
        }}
    >
        <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px', float: 'left', width: "400px" }}
        // selectedKeys={[tab.toString()]}
        >
            {renderNavLinks()}
        </Menu>
        <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px', float: 'right', width: "250px" }}
        >
            {renderUserLinks()}
        </Menu>
    </Layout.Header>
};

//containers/Navigation.js
const renderNavLinks = () => {
    // let { HOME, ACCOUNT, SIGN_IN, PROJECTS } = routes;
    // let { authUser, toggleMobileMenuOpen, isMobileMenu } = this.props.sessionStore;
    // let signedInUserId = authUser && authUser.uid;
    // if (signedInUserId) {
    return [
        <Menu.Item key={1}>
            <Link
                // onClick={() => toggleMobileMenuOpen()}
                to={`/search`}
            >
                <SearchOutlined /> Search
            </Link>
        </Menu.Item>,
        <Menu.Item key={2}>
            <Link
                // onClick={() => toggleMobileMenuOpen()}
                to={`/favorite`}
            >
                <HeartOutlined /> Favorite
            </Link>
        </Menu.Item>,
        <Menu.Item key={3}>
            <Link
                // onClick={() => toggleMobileMenuOpen()}
                to={`/recommend`}
            >
                <LikeOutlined /> Recommend
            </Link>
        </Menu.Item>
    ]
}

const renderUserLinks = () => {
    return [
        <Menu.Item
            style={{
                float: 'right', display: 'flex',
                justifyContent: "space-around",
                alignItems: 'center',
            }}
            key={1}
        >
            <span style={{ color: 'white' }}>Welcome, {userId}</span>
        </Menu.Item>,
        <Menu.Item
            style={{
                float: 'right', display: 'flex',
                justifyContent: "space-around",
                alignItems: 'center',
            }}
            key={2}
        >
            <a onClick={logout}>
                Logout <LogoutOutlined />
            </a>
        </Menu.Item>
    ]
}

export default Header;