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
      <form>
        <input type="text" class="form-control" value="Recherche" />
      </form>
    </b-row>
    <b-row>
      <b-col cols="16" align-h="start">
        <b-table striped hover :items="patients" :fields="fieldsDef">
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
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import PatientDataService from "../services/PatientDataService";

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
          key: "attributionGroup",
          label: "Groupe d'attribution",
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
      aaze: null,
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