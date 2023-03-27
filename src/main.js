import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';

// createRouter needs some configuration
// which diffrents Routes/URLs we want to support
const router = createRouter({
    history: createWebHistory(), // history option: telling router how to manage the routing history in this app, 
    routes: [
        { path: '/', redirect: '/teams' },
        // { path: '/', alias: },
        { path: '/teams', component: TeamsList }, // our-domain.com/teams => TeamsList
        { path: '/users', component: UsersList },
        { path: '/teams/:teamId', component: TeamMembers, props: true }, 
        { path: '/:notFound(.*)', component : NotFound } // 'catch all' route, needs to come last

        // dynamic path segment after a colon
        // props: true, tells the vue router, that the dynamic parameters should be passed
        // into this component as props rather than just on the $route property
        // -> makes compnents more reusable
    ], // array full of routes/paths/urls - every object represents one route and its configuration
    
     // linkActiveClass: 'active' 
});

const app = createApp(App);
app.use(router);


app.mount('#app');
