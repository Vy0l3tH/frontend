<template>
  <b-container fluid>

    <b-row>
      <b-col cols="12" align-h="start">
          <router-link to="/addSoignant/">
            <a class="mt-3 btn btn-sm btn-info" :href="'/addSoignant/'">
              Nouveau soignant
            </a>
          </router-link>
      </b-col>
    </b-row>
    <b-row>
 <!-- filtre sur l'ensemble des données -->
        <b-form-group
          label-for="filter-input"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Recherche"
            >
            </b-form-input>

          </b-input-group>
        </b-form-group>
<!-- fin du filtre -->
    </b-row>
    <b-row>
      <b-col cols="16" align-h="start">
        <b-table striped hover  :items="soignants" :fields="fieldsDef" :filter="filter" >
          <template #cell(actions)="data">
            <b-button
              class="btn btn-sm btn-info mr-2"
              :href="'AddSoignant?id=' + `${data.item.id}`"
            >
              Editer
            </b-button>
            <b-button
              class="btn btn-sm btn-info"
              v-on:click="removeSoignant(data.item.id)"
            >
              Supprimer
            </b-button>
          </template>
        </b-table>
      
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import CaregiverDataService from "../services/CaregiverDataService";

export default {
  name: "soignants-list",
  data() {
    return {
  
     fieldsDef: [
        {
          key: "name",
          label: "Nom",
          sortable: true,
        },
        {
          key: "firstName",
          label: "Prénom",
          sortable: false,
        },
        {
          key: "mailAdress",
          label: "Adresse email",
          sortable: false,
        },
        {
          key: "adress",
          label: "Adresse",
          sortable: false,
        },
        {
          key: "birthDate",
          label: "Date de naissance",
          sortable: false,
        },
        {
          key: "phoneNumber",
          label: "Numéro de téléphone",
          sortable: false,
        },
        {
          key: "actions",
          label: "",
          sortable: false,
        },
      ],
      soignants: [],
      currentSoignant: null,
      currentIndex: -1,
      title: "",
      aaze: null,
      filter: null,
    };
  },
  methods: {
    retrieveSoignants() {
      CaregiverDataService.getAll()
        .then((response) => {
          this.soignants = response.data.items;
          
        })
        .catch();
    },

    refreshList() {
      this.retrieveSoignants();
      this.currentSoignant = null;
      this.currentIndex = -1;
    },

    setActiveSoignant(soignant, index) {
      this.currentSoignant = soignant;
      this.currentIndex = index;
    },

    removeAllSoignants() {
      CaregiverDataService.deleteAll()
        .then(function (){         
          this.refreshList();
        })
        .catch();
    },


    removeSoignant(id) {
      CaregiverDataService.deleteSoignant(id)
        .then(function() {
          
          this.refreshList();
        })
        .catch();
    },

    searchTitle() {
      CaregiverDataService.findByTitle(this.title)
        .then((response) => {
          this.soignants = response.data;
          
        })
        .catch();
    },
  },
  mounted() {
    this.retrieveSoignants();
  },
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