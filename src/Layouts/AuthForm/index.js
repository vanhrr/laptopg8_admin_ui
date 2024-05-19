import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import images from '~/assets/images';
import styles from './AuthForm.module.scss';

const cx = classNames.bind(styles);

function AuthForm({ children, title, error, message }) {
    const [visibleError, setVisibleError] = useState(error);
    const [success, setsuccess] = useState(message);
    useEffect(() => {
        setVisibleError(error);
    }, [error]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <img src={images.logo} alt="auth" />
            </div>
            <div className={cx('right')}>
                <p className={cx('title')}>{title}</p>
                {children}
                <div
                    className={cx('message', success ? 'success' : '')}
                    style={{ opacity: visibleError || success ? 1 : 0 }}
                >
                    {success ? success : visibleError}
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
