import React from 'react';
import '../styles/register.css';
// import { Navigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Md5 } from 'ts-md5';

const Register: React.FC = () => {
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
    }

    return (
        <Form
            name="normal_register"
            className="register-form"
            onFinish={onFinish}
        >
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
            <Form.Item
                name="first_name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
            </Form.Item>
            <Form.Item
                name="last_name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Register;