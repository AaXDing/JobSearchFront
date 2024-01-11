import React from 'react';
import '../styles/login.css';
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, theme } from 'antd';
import { Md5 } from 'ts-md5';
import { saveUser } from './helper/localUser';


const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = React.useState('');

    const onFinish = (values: any) => {
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
                } else {
                    setLoginError('Invalid username or password');
                }
            }).catch((error) => {
                console.log(error);
                setLoginError('Invalid username or password');
            });
    };

    return (
        <div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <span className="title">Job Search</span>
                <Form.Item
                    name="username"
                    rules={[{ required: true, pattern: /^[a-z0-9_]+$/, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <p style={{ color: 'red' }}>{loginError}</p>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="/register">register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;