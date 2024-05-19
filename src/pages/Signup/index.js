import { useState } from 'react';
import classNames from 'classnames/bind';

import AuthForm from '~/Layouts/AuthForm';
import InputAuth from '~/components/InputAuth';
import Button from '~/components/Button';
import routes from '~/config/routes';
import { register } from '~/ultils/services/adminService';
import styles from './Signup.module.scss';

const cx = classNames.bind(styles);

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    //const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        if (!firstName || !lastName || !phoneNumber || !username || !password || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }
        if (!passwordRegex.test(password)) {
            setError('Mật khẩu có ít nhất 8 ký tự và bao gồm cả chữ và số');
            return;
        }

        try {
            let req = {
                firstName: firstName,
                lastName: lastName,
                phone: phoneNumber,
                username: username,
                password: password,
            };
            const response = await register(req);
            console.log(response);

            if (response.status === 'success') {
                alert('Đăng ký thành công. Vui lòng chờ xác nhận');
                return;
            } else {
                setError(response.message);
                return;
            }

            //console.log(response);
            // Xử lý phản hồi từ server sau khi đăng ký thành công
        } catch (error) {
            console.log(error);
            setError('Đăng ký thất bại');
        }
    };

    return (
        <AuthForm title="Signup" error={error} message={message}>
            <div className={cx('signup')}>
                <div className={cx('name')}>
                    <InputAuth label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <InputAuth label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <InputAuth
                        label="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div className={cx('name2')}>
                    <InputAuth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <InputAuth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputAuth
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className={cx('group_btn')}>
                <Button rounded to={routes.login}>
                    Login
                </Button>
                <Button primary onClick={handleSubmit}>
                    Sign Up
                </Button>
            </div>
        </AuthForm>
    );
}

export default Signup;
