<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" align-h="start">
        <router-link to="/addPatient/">
          <a class="mt-3 btn btn-sm btn-info" :href="'/addPatient/'">
            Nouveau patient
          </a>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <!-- filtre sur l'ensemble des données -->
      <b-form-group label-for="filter-input">
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
        <b-table
          striped
          hover
          :items="patients"
          :fields="fieldsDef"
          :filter="filter"
        >
          <template #cell(actions)="data">
                        <b-button
              class="btn btn-sm btn-info mr-2"
              v-on:click="setSelectedPatient(data.item.id)"
              v-b-modal.modal-1
              >Envoyer un formulaire</b-button
            >
            <b-button
              class="btn btn-sm btn-info mr-2"
              :href="'AddPatient?id=' + `${data.item.id}`"
            >
              Editer
            </b-button>
            <b-button
              class="btn btn-sm btn-info mr-2"
              v-on:click="removePatient(data.item.id)"
            >
              Supprimer
            </b-button>

          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-modal id="modal-1" title="Envoyer un formulaire" @ok="handleOk">
      <b-form-select v-model="selectedForm">
        <b-select-option
          v-for="form in formsList"
          v-bind:key="form.id"
          v-bind:value="form"
          ok-title="LOL"
        >
          {{ form.name }}
        </b-select-option>
        <!-- objet littéral en ligne -->
      </b-form-select>
    </b-modal>
  </b-container>
</template>
<script>
import PatientDataService from "../services/PatientDataService";
import FormDataService from "../services/FormDataService";

export default {
  name: "patients-list",
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
      patients: [],
      currentPatient: null,
      currentIndex: -1,
      title: "",
      formsList: [],
      filter: null,
      selectedForm: "",
      selectedPatientId: "",
    };
  },
  computed: {
    currentUser() {
      if (this.$store.state.auth.user) return this.$store.state.auth.user;
      else return null;
    },
  },
  methods: {
    handleOk() {
      this.selectedForm.Date = Date.now()
      FormDataService.addFormToUser(this.selectedPatientId, this.selectedForm);
    },
    setSelectedPatient(id) {
      this.selectedPatientId = id;
    },
    retrievePatients() {
      if (this.currentUser.role == "ADMINISTRATOR") {
        PatientDataService.getAll()
          .then((response) => {
            this.patients = response.data.items;
          })
          .catch();
      }
      if (this.currentUser.role == "CAREGIVER") {
        PatientDataService.findPatientByCaregiverId(this.currentUser.id)
          .then((response) => {
            this.patients = response.data.items;
          })
          .catch();
      }
    },

    retrieveForms() {
      FormDataService.getAll()
        .then((response) => {
          this.formsList = response.data.items;
        })
        .catch();
    },

    refreshList() {
      this.retrievePatients();
      this.currentPatient = null;
      this.currentIndex = -1;
    },

    setActivePatient(patient, index) {
      this.currentPatient = patient;
      this.currentIndex = index;
    },

    removeAllPatients() {
      PatientDataService.deleteAll()
        .then(function () {
          this.refreshList();
        })
        .catch();
    },

    removePatient(id) {
      PatientDataService.deletePatient(id)
        .then(function () {
          this.refreshList();
        })
        .catch();
    },

    searchTitle() {
      PatientDataService.findByTitle(this.title)
        .then((response) => {
          this.patients = response.data;
        })
        .catch();
    },
  },
  mounted() {
    this.retrievePatients();
    this.retrieveForms();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.form-control {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>