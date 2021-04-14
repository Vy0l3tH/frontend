import Vue from "vue";
import Router from "vue-router";
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/patients",
      name: "patients",
      component: () => import("./components/PatientsList")
    },
    {
      path: "/addPatient",
      name: "addPatient",
      component: () => import("./components/AddPatient")
    },
    {
      path: "/viewPatient/:id",
      name: "viewPatient",
      component: () => import("./components/PatientFormulairesList")
    },
    {
      path: "/addFormulaire",
      name: "addFormulaire",
      component: () => import("./components/AddFormulaire")
    }
    ,
    {
      path: "/formulaires",
      name: "formulaires",
      component: () => import("./components/FormulairesList")
    },
    {
      path: "/addForm",
      name: "Create form",
      component: () => import("./components/FormEditor")
    },{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    }

    
    
  ]
});


    
