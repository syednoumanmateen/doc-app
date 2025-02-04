import { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

interface FieldType {
    name?: string;
    password?: string;
    email?: string;
};

const Register: FC = () => {
    const appName = import.meta.env.VITE_APP_NAME ?? 'Application';

    const onFinish = (values: FieldType) => {
        console.log('Form submitted:', values); // Debugging form submission
    };


    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input />
            </Form.Item>

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

            <div className='mb-3'>
                <span className='text-secondary'>Already user at {appName}? </span>
                <Link to="/user/login">Login</Link>
            </div>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
};

export default Register;