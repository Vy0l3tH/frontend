<template>


  <div class="list row">
   
    <div class="col-md-6">
     
         <select  class="form-select form-select-lg mb-3"  v-model="selected">
  <option v-for="formu in availableFormulaires"  v-bind:value="formu.doc" v-bind:key="formu.doc.iden" >
    {{ formu.doc.identifiant }}
  </option>

</select>
 <button class="m-3 btn btn-sm btn-info" @click="addFormToPatient(selected)">
        Add
      </button>
      <h4>Formulaires List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(formulaire, index) in formulaires"
          :key="index"
          @click="setActiveFormulaire(formulaire, index)"
        >
          {{ formulaire.doc.identifiant }}
        </li>
      </ul>

      
    </div>
   
    <div class="col-md-6">
      <div v-if="currentFormulaire">
        <h4>Formulaire</h4>
        <template v-for="block in currentFormulaire.doc.formulaire">
      <component
        :is="block.component"
        :block="block"
        :key="block._uid"
      ></component>
    </template>
      </div>
     
    </div>
  </div>
</template>

<script>

import PatientDataService from "../services/PatientDataService";
import FormulaireDataService from "../services/FormulaireDataService";


export default {
  name: "formulaires-list",
  data() {
    return {
      patient:"robert",
      formulaires: [],
      currentFormulaire: null,
      currentIndex: -1,
      title: "",
      availableFormulaires:[],
      selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
    };
  },
  methods: {
    retrieveFormulaires(patient) {
      PatientDataService.getForms(patient)
        .then(response => {
       
          this.formulaires = response.data.rows;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    retrieveAvailableFormulaires() {
      FormulaireDataService.getAll()
        .then(response => {
          this.availableFormulaires = response.data.rows;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    refreshList() {
      this.retrieveFormulaires(this.patient);
      this.retrieveAvailableFormulaires();
      this.currentFormulaire = null;
      this.currentIndex = -1;
    },

    setActiveFormulaire(formulaire, index) {
      this.currentFormulaire = formulaire;
      this.currentIndex = index;
    },

    addFormToPatient(formulaire) {
      console.log(formulaire);
       var data = {
        formulaire: formulaire.formulaire,
        identifiant:formulaire.identifiant,
        validated:formulaire.validated
      };

      PatientDataService.addForms(this.$route.params.id,data)
        .then(response => {
this.retrieveFormulaires(this.$route.params.id);
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

  },
  mounted() {
    this.retrieveFormulaires(this.$route.params.id);
    this.retrieveAvailableFormulaires();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>