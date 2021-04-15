<template>
  <div class="list row">
     <div class="row-md-6">
<!--       </router-link> -->
     <b-row>
      <button class="m-3 btn btn-sm btn-info" @click="removeAllFormulaires">
        Remove All
      </button>

    <router-link to="/addPatient/">
            <button class="m-3 btn btn-sm btn-info" :href="'/addPatient/'">
              New patient      
            </button>
    </router-link>
    </b-row>    

    <b-row>
        <form>  
            <input type="text" class="form-control" value="Recherche">
        </form> 
    </b-row>
        <b-row>
      <b-col cols="12" align-h="start">
      <b-table
        striped
        hover
        :items="formulaires"
        :fields="fields"
      >
       <template #cell(plop)  >
        
     
        <b-button class="btn btn-sm btn-info mr-2" :href="'/addForm/'">
         Edit
        </b-button>
         <b-button class="btn btn-sm btn-info " :href="'/addForm/'">
         Delete
        </b-button>
        
      </template>
      </b-table>
      
      </b-col>
      
    </b-row>

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

import FormulaireDataService from "../services/FormulaireDataService";

export default {
  name: "formulaires-list",
  data() {
    return {
      fields: [
         
        {
          key: "doc.name",
          label: "Nom formulaire",
          sortable: true,
        },
        {
          key: "doc.firstName",
          label: "Bla bla",
          sortable: false,
        },
        {
           key: "plop",
          label: "",
          sortable: false,
        },
          
      ],

      formulaires: [],
      currentFormulaire: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveFormulaires() {
      FormulaireDataService.getAll()
        .then(response => {
       
          this.formulaires = response.data.rows;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveFormulaires();
      this.currentFormulaire = null;
      this.currentIndex = -1;
    },

    setActiveFormulaire(formulaire, index) {
      this.currentFormulaire = formulaire;
      this.currentIndex = index;
    },

    removeAllFormulaires() {
      FormulaireDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      FormulaireDataService.findByTitle(this.title)
        .then(response => {
          this.formulaires = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveFormulaires();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.form-control{
    margin-top:  10px;
    margin-bottom: 10px;
}
</style>