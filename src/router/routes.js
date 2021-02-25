const Home = () => import('@/pages/MainPage')
const OrderListPage = () => import('@/pages/OrderListPage')

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: Home
    },
    {
        path: '/orders',
        name: 'OrderListPage',
        component: OrderListPage
    }
]

export default routes
