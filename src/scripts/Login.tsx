import React from 'react';
import '../styles/login.css';
import { useNavigate } from "react-router-dom";
import { Md5 } from 'ts-md5';
import { saveUser } from './helper/localUser';

import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    LoginFormPage,
    ProConfigProvider,
    ProFormText,
} from '@ant-design/pro-components';
import { Tabs, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';

type LoginType = 'account';

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const Page = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const { token } = theme.useToken();
    const navigate = useNavigate();
    const [loginError, setLoginError] = React.useState('');

    const onFinish = (values: any): Promise<boolean | void> => {
        console.log('Received values of form: ', values);
        var username = values.username,
            password = values.password;
        //user name / password validation : avoid too many requests
        password = Md5.hashAsciiStr(username + Md5.hashAsciiStr(password)); //password encrypted

        const url = "http://localhost:8080/JobSearch_war_exploded/login";
        const method = "POST";
        fetch(url, {
            method: method,
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                user_id: username,
                password: password,
            })
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === 'OK') {
                    //   welcomeMsg(res);
                    //   fetchData();
                    saveUser(username);
                    navigate('/favorite', { replace: true });
                    return Promise.resolve(true);
                } else {
                    setLoginError('Invalid username or password');
                    return Promise.resolve(false);
                }
            }).catch((error) => {
                console.log(error);
                setLoginError('Invalid username or password');
                return Promise.resolve(false);
            });
        return Promise.resolve(false);
    };

    return (
        <div
            style={{
                backgroundColor: 'white',
                height: '100vh',
            }}
        >
            <LoginFormPage
                backgroundImageUrl="https://media.journoportfolio.com/users/9087/images/4f0cedf4-6e83-49e4-9dab-cfd650c03754.jpg"
                logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Search_icon.svg/1024px-Search_icon.svg.png"
                // backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                title="Job Search"
                submitter={{ searchConfig: { submitText: 'Login now'}}}
                containerStyle={{
                    backgroundColor: 'rgba(0, 0, 0,0.65)',
                    backdropFilter: 'blur(4px)',
                }}
                onFinish={onFinish}
                subTitle="Help you find your best fit position"
                // activityConfig={{
                //     style: {
                //         boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
                //         color: token.colorTextHeading,
                //         borderRadius: 8,
                //         backgroundColor: 'rgba(0,0,0,0.65)',
                //         backdropFilter: 'blur(4px)',
                //     },
                //     title: 'With the help of AI',
                //     subTitle: 'we will find you the best position',
                // }}
            >
                <Tabs
                    centered
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                    <Tabs.TabPane key={'account'} tab={'Login'} />
                </Tabs>
                <>
                    <ProFormText
                        name="username"
                        fieldProps={{
                            size: 'large',
                            prefix: (
                                <UserOutlined
                                    style={{
                                        color: token.colorText,
                                    }}
                                    className={'prefixIcon'}
                                />
                            ),
                        }}
                        placeholder={'Username'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter username!',
                            },
                        ]}
                    />
                    <ProFormText.Password
                        name="password"
                        fieldProps={{
                            size: 'large',
                            prefix: (
                                <LockOutlined
                                    style={{
                                        color: token.colorText,
                                    }}
                                    className={'prefixIcon'}
                                />
                            ),
                        }}
                        placeholder={'Password'}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter password!',
                            },
                        ]}
                    />
                </>
                <div
                    style={{
                        marginBlockEnd: 24,
                        paddingBottom: 24,
                    }}
                >
                    <a
                        style={{
                            float: 'right',
                        }}
                        href="/register"
                    >
                        Register
                    </a>
                </div>
            </LoginFormPage>
        </div>
    );
};

export default () => {
    return (
        <ProConfigProvider dark>
            <Page />
        </ProConfigProvider>
    );
};


// export default Login;

