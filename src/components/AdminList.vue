<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" align-h="start">
          <router-link to="/addAdmin/">
            <a class="mt-3 btn btn-sm btn-info" :href="'/addAdmin/'">
              Nouvel administrateur
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
        <b-table striped hover  :items="admins" :fields="fieldsDef" :filter="filter" >
          <template #cell(actions)="data">
            <b-button
              class="btn btn-sm btn-info mr-2"
              :href="'AddAdmin?id=' + `${data.item.id}`"
            >
              Editer
            </b-button>
            <b-button
              class="btn btn-sm btn-info"
              v-on:click="removeAdmin(data.item.id)"
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
import AdminDataService from "../services/AdminDataService";

export default {
  name: "admins-list",
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
      admins: [],
      currentAdmin: null,
      currentIndex: -1,
      title: "",
      aaze: null,
      filter: null,
    };
  },
  methods: {
    retrieveAdmins() {
      AdminDataService.getAll()
        .then((response) => {
          this.admins = response.data.items;
          
        })
        .catch();
    },

    refreshList() {
      this.retrieveAdmins();
      this.currentAdmin = null;
      this.currentIndex = -1;
    },

    setActiveAdmin(admin, index) {
      this.currentAdmin = admin;
      this.currentIndex = index;
    },

    removeAllAdmins() {
      AdminDataService.deleteAll()
        .then(function() {
          
          this.refreshList();
        })
        .catch();
    },
    removeAdmin(id) {
      AdminDataService.deleteAdmin(id)
        .then(function() {
          
          this.refreshList();
        })
        .catch();
    },
    searchTitle() {
      AdminDataService.findByTitle(this.title)
        .then((response) => {
          this.admins = response.data;
          
        })
        .catch();
    },
  },
  mounted() {
    this.retrieveAdmins();
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