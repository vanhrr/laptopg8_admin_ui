import config from '~/config';

// Layouts

// Pages
import Home from '~/pages/Home';
import Accounts from '~/pages/Accounts';
import Orders from '~/pages/Orders';
import Products from '~/pages/Products';
import Events from '~/pages/Events';
import Articles from '~/pages/Articles';
import Categories from '~/pages/Categories';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.signup, component: Signup, layout: null },
    { path: config.routes.accounts, component: Accounts },
    { path: config.routes.orders, component: Orders },
    { path: config.routes.categories, component: Categories },
    { path: config.routes.products, component: Products },
    { path: config.routes.events, component: Events },
    { path: config.routes.articles, component: Articles },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
