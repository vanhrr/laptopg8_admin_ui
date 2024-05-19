import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { faClipboardList, faHome, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faNewspaper, faClipboard, faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

const listMenu = [
    {
        title: 'Dashboard',
        icon: faHome,
        route: routes.home,
    },
    {
        title: 'Accounts',
        icon: faUsers,
        route: routes.accounts,
    },
    {
        title: 'Orders',
        icon: faClipboardList,
        route: routes.orders,
    },
    {
        title: 'Categories',
        icon: faRectangleList,
        route: routes.categories,
    },

    {
        title: 'Products',
        icon: faClipboard,
        route: routes.products,
    },
    {
        title: 'Events',
        icon: faCalendar,
        route: routes.events,
    },
    {
        title: 'Articles',
        icon: faNewspaper,
        route: routes.articles,
    },
];

function Menu({ className }) {
    return (
        <div className={cx('wrapper', className)}>
            {listMenu.map((menu, index) => {
                return (
                    <NavLink key={index} to={menu.route}>
                        <MenuItem icon={menu.icon} name={menu.title} />
                    </NavLink>
                );
            })}
        </div>
    );
}

export default Menu;
