import Vue from "vue";
import Router from "vue-router";

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
    }

    
    
  ]
});