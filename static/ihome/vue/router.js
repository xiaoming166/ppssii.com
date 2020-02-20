const routes = [
    {
        path: '/',
        component: Index,
        children: [{
            path: '',
            components:
                {
                    tree: Tree,
                    note: Note
                }
        }]
    }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
const app = new Vue({
    router,
}).$mount('#app')