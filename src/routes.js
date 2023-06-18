import {
	createRouter,
	createWebHistory
} from 'vue-router';
const routes = [
	{
		path: '',
		redirect: '/map',
	},
	{
		path: '/map',
		component: ()=>import('./pages/Map/index.vue'),
	}
]
const router = createRouter({
	history: createWebHistory(`/`),
	routes
})

export default router
