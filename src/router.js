import Vue from "vue";
import Router from "vue-router";
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);


  const router = new Router({
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
      component: () => import("./components/PatientFormsList")
    },
    {
      path: "/admins",
      name: "admins",
      component: () => import("./components/AdminList")
    },
    {
      path: "/addAdmin",
      name: "addAdmin",
      component: () => import("./components/AddAdmin")
    },
    {
      path: "/addForm",
      name: "addForm",
      component: () => import("./components/AddForm")
    }
    ,
    {
      path: "/forms",
      name: "forms",
      component: () => import("./components/FormsList")
    },
    {
      path: "/soignants",
      name: "soignants",
      component: () => import("./components/SoignantsList")
    },
    {
      path: "/addSoignant/",
      name: "addSoignant",
      component: () => import("./components/AddSoignant")
    },
    {
      path: "/caregiverGroups",
      name: "Caregiver groups",
      component: () => import("./components/CaregiverGroupsList")
    },
    {
      path: "/patientGroups",
      name: "Patient groups",
      component: () => import("./components/PatientGroupsList")
    },
    {
      path: "/addPatientGroup",
      name: "Patient group",
      component: () => import("./components/AddPatientGroup")
    },
    {
      path: "/addCaregiverGroup",
      name: "Caregiver group",
      component: () => import("./components/AddCaregiverGroup")
    },
    {
      path: "/addShippingPolicy/",
      name: "addShippingPolicy",
      component: () => import("./components/AddShippingPolicy.vue")
    },
    {
      path: "/shippingPolicies/",
      name: "shippingPolicies",
      component: () => import("./components/ShippingPolicyList.vue")
    },
    {
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
router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router


    
