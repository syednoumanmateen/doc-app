import { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

interface FieldType {
    email: string;
    password: string;
}

const Login: FC = () => {
    const appName = import.meta.env.VITE_APP_NAME ?? 'Application'; // Fallback in case it's undefined

    const onFinish = (values: FieldType) => {
        console.log('Form submitted:', values); // Debugging form submission
    };

    return (
        <Form
            name="login-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <div className="mb-3">
                <span className="text-secondary">New to {appName}? </span>
                <Link to="/user/register">Register</Link>
            </div>

            <Form.Item>
                <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
