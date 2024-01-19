import React from 'react';
import '../styles/register.css';
// import { Navigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Md5 } from 'ts-md5';
import {
    LoginForm,
    ProFormText,
} from '@ant-design/pro-components';
import { Tabs, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import search from '../images/search.jpg';

type LoginType = 'account';

const Register: React.FC = () => {
    const { token } = theme.useToken();
    const [loginType, setLoginType] = useState<LoginType>('account');
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        var username = values.username,
            password = values.password;
        //user name / password validation : avoid too many requests
        password = Md5.hashAsciiStr(username + Md5.hashAsciiStr(password)); //password encrypted
        fetch("http://localhost:8080/JobSearch_war_exploded/register", {
            method: "POST",
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                user_id: username,
                password: password,
                first_name: values.first_name,
                last_name: values.last_name
            })
        }).then(() => { window.location.href = '/'; });
        return Promise.resolve(false);
    }

    return (
        <div
            style={{
                backgroundColor: 'white',
                height: '100vh',
                display: 'flex',
                flexDirection: 'row',
                backgroundImage: `url(${search})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
            }}
        >
            <div className="register-form">
                <LoginForm
                    logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Search_icon.svg/1024px-Search_icon.svg.png"
                    title="Job Search"
                    onFinish={onFinish}
                    submitter={{ searchConfig: { submitText: 'Register'}}}
                >
                    <Tabs
                        centered
                        activeKey={loginType}
                        onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                    >
                        <Tabs.TabPane key={'account'} tab={'Register'} />
                    </Tabs>
                    {loginType === 'account' && (
                        <>
                            <ProFormText
                                name="first_name"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'} />,
                                }}
                                placeholder={'Firstname'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your first name!',
                                    },
                                ]}
                            />
                            <ProFormText
                                name="last_name"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'} />,
                                }}
                                placeholder={'Lastname'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your last name!',
                                    },
                                ]}
                            />
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'} />,
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
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                    strengthText:
                                        'Password should contain numbers, letters and special characters, at least 8 characters long.',

                                    statusRender: (value) => {
                                        const getStatus = () => {
                                            if (value && value.length > 12) {
                                                return 'ok';
                                            }
                                            if (value && value.length > 6) {
                                                return 'pass';
                                            }
                                            return 'poor';
                                        };
                                        const status = getStatus();
                                        if (status === 'pass') {
                                            return (
                                                <div style={{ color: token.colorWarning }}>
                                                    Strength: Medium
                                                </div>
                                            );
                                        }
                                        if (status === 'ok') {
                                            return (
                                                <div style={{ color: token.colorSuccess }}>
                                                    Strength: Strong
                                                </div>
                                            );
                                        }
                                        return (
                                            <div style={{ color: token.colorError }}>Strength: Weak</div>
                                        );
                                    },
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
                    )}
                </LoginForm>
            </div>
        </div>
    );
}

export default Register;