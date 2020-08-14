import Home from '@src/page/home';

// 路由的routes文件
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/image',
    name: 'hello',
    component: () => import('@src/page/hello'),
  },
];

export default routes;
