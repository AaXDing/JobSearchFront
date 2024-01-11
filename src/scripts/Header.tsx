import React, { useState } from 'react';
import '../styles/header.css';
import { LikeOutlined, HeartOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { deleteUser, getUser } from './helper/localUser';

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

const items: MenuProps['items'] = [
    {
        label: (
            <span>
                Job Search
            </span>
        ),
        key: 'jobsearch',
        disabled: true,
    },
    {
        label: (
            <a href="/search" rel="noopener noreferrer">
                Search
            </a>
        ),
        key: 'search',
        icon: <SearchOutlined />,
    },
    {
        label: (
            <a href="/favorite" rel="noopener noreferrer">
                Favorite
            </a>
        ),
        key: 'favorite',
        icon: <HeartOutlined />,
    },
    {
        label: (
            <a href="/recommend" rel="noopener noreferrer">
                Recommend
            </a>
        ),
        key: 'recommend',
        icon: <LikeOutlined />,
    },
    {
        label: (
            <a onClick={logout} rel="noopener noreferrer">
                Logout {userId}
            </a>
        ),
        key: 'logout',
        icon: <LogoutOutlined />,
    },
];

const Header: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Layout
        style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#001529',
        }}
    >
        <Menu theme="dark"  forceSubMenuRender={true} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </Layout>;
};

export default Header;