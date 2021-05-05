<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" align-h="start">
        <router-link to="/addPatient/">
          <a class="m-3 btn btn-sm btn-info" :href="'/addPatient/'">
            New patient
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
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Effacer</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
<!-- fin du filtre -->

    </b-row>
    <b-row>
      <b-col cols="16" align-h="start">
        <b-table striped hover  :items="patients" :fields="fieldsDef" :filter="filter" >
          <template #cell(plop)="data">
            <b-button
              class="btn btn-sm btn-info mr-2"
              :href="'AddPatient?id=' + `${data.item.id}`"
            >
              Edit
            </b-button>
            <b-button
              class="btn btn-sm btn-info"
              v-on:click="removePatient(data.item.id)"
            >
              Delete
            </b-button>
            <b-button  class="btn btn-sm btn-info" v-b-modal.modal-1>Send form</b-button>

       
          </template>
        </b-table>
      </b-col>
    </b-row>
     <b-modal id="modal-1" title="Send form">
           <b-form-select v-model="selectedForm">
            <b-select-option
              v-for="form in formsList"
              v-bind:key="form.id"
              v-bind:value="form"
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
          label: "Name",
          sortable: true,
        },
        {
          key: "firstName",
          label: "First name",
          sortable: false,
        },
        {
          key: "mailAdress",
          label: "Email",
          sortable: false,
        },
        {
          key: "adress",
          label: "Adress",
          sortable: false,
        },
        {
          key: "birthDate",
          label: "Birth date",
          sortable: false,
        },
        {
          key: "phoneNumber",
          label: "Phone number",
          sortable: false,
        },

        {
          key: "active",
          label: "Active",
          sortable: false,
        },
        {
          key: "username",
          label: "Username",
          sortable: false,
        },
        {
          key: "patientNumber",
          label: "Patient Number",
          sortable: true,
        },
        {
          key: "followUpType",
          label: "Type de suivi",
          sortable: false,
        },
        {
          key: "alarm",
          label: "Alarme",
          sortable: false,
        },
        {
          key: "gdprAgreement",
          label: "Consentement RGPD",
          sortable: false,
        },
        {
          key: "rswPublication",
          label: "Publication RSW",
          sortable: false,
        },
        {
          key: "riskLevel",
          label: "Niveau de risque",
          sortable: false,
        },
        {
          key: "plop",
          label: "Edit / Delete",
          sortable: false,
        },
      ],
      patients: [],
      currentPatient: null,
      currentIndex: -1,
      title: "",
     formsList: [],
      filter: null,
      selectedForm:""
    };
  },
  methods: {
    retrievePatients() {
      PatientDataService.getAll()
        .then((response) => {
          console.log(response.data);
          this.patients = response.data.items;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, retrieveForms() {
      FormDataService.getAll()
        .then((response) => {
          console.log(response.data);
          this.formsList = response.data.items;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
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
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    removePatient(id) {
      PatientDataService.deletePatient(id)
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      PatientDataService.findByTitle(this.title)
        .then((response) => {
          this.patients = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
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