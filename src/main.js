import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import TeamsList from "./components/teams/TeamsList.vue";
import UsersList from "./components/users/UsersList.vue";
import TeamMembers from "./components/teams/TeamMembers.vue";
import NotFound from "./components/nav/NotFound.vue";
import TeamsFooter from "./components/teams/TeamsFooter.vue";
import UsersFooter from "./components/users/UsersFooter.vue";

// createRouter needs some configuration
// which diffrents Routes/URLs we want to support
const router = createRouter({
  history: createWebHistory(), // history option: telling router how to manage the routing history in this app,
  routes: [
    { path: "/", redirect: "/teams" },
    // { path: '/', alias: },
    {
      name: "teams",
      path: "/teams",
      meta: { needsAuth: true }, // can store any kind of values in here
      // you can access this meta field in all the places, where the $route object is available
      components: { default: TeamsList, footer: TeamsFooter }, // bc. of nested route -> need to add
      // an extra <router-view> for all the child routes
      children: [
        // nested route
        {
          name: "team-members",
          path: ":teamId",
          component: TeamMembers,
          props: true,
        }, // /teams/teamId
      ],
    }, // our-domain.com/teams => TeamsList
    {
      path: "/users",
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      beforeEnter(to, from, next) { // will be called whenever we go to users
        console.log('users beforeEnter')
        console.log(to, from);
        next();
      }
    },
    // { path: '/teams/:teamId', component: TeamMembers, props: true },
    { path: "/:notFound(.*)", component: NotFound }, // 'catch all' route, needs to come last

    // dynamic path segment after a colon
    // props: true, tells the vue router, that the dynamic parameters should be passed
    // into this component as props rather than just on the $route property
    // -> makes compnents more reusable
  ], // array full of routes/paths/urls - every object represents one route and its configuration

  // linkActiveClass: 'active',
  scrollBehavior(_, _2, savedPosition) {
    // console.log(to, from, savedPosition);
    // to, from are route objects
    // savedPosition (scroll position) is only set when u use the back button

    if (savedPosition) {
      return savedPosition;
    }
    // an object which describes where the browser should scroll to upon a page change
    return { left: 0, top: 0 };
  },
});

// Navigation guards
router.beforeEach((to, from, next) => {
  // useful, to check whether user is authenticated and prevent access to certain page if they're not authenticated
  // to - route object of the page we're going to
  // from - route object of the page we're coming from
  // next - function, we call to confirm/cancel this navigation action
  console.log("Global beforeEach");
  console.log(to, from);
  if ( to.meta.needsAuth) {
    console.log('Needs Authentication')
    // could check whether user is authenticated
    next();
  }
  // next(false); // cancel the navigation
  // next('/users'); // path
  //   if (to.name === "team-members") {
  //     next();
  //   } else {
  //     next({ name: "team-members", params: { teamId: "t2" } }); // using navigation obect; this example makes no sense btw
  //   }
  next(); // or next(true); // allow/confirm the navigation
});

router.afterEach((to, from) => {
    // only runs, once a navigation has been confirmed
    // sending analytics data; not used to control what user sees on screen, too late for that
    console.log('Global afterEach');
    console.log(to, from);

});

const app = createApp(App);
app.use(router);

app.mount("#app");
