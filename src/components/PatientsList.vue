<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" align-h="start">
        <a class="m-3 btn btn-sm btn-info" :href="'/addPatient/'">
          New patient
        </a>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" align-h="start">
      <b-table
        striped
        hover
        :items="patients"
        :fields="fields"
      >
       <template #cell(plop)  >
        
     
        <b-button class="btn btn-sm btn-info mr-2" :href="'/addPatient/'">
         Edit
        </b-button>
         <b-button class="btn btn-sm btn-info " :href="'/addPatient/'">
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
      fields: [
         
        {
          key: "doc.name",
          label: "Name",
          sortable: true,
        },
        {
          key: "doc.firstName",
          label: "First name",
          sortable: false,
        },
        {
          key: "doc.mailAdress",
          label: "First name",
          sortable: false,
        },
        {
          key: "doc.adress",
          label: "Adress",
          sortable: false,
        },
        {
          key: "doc.birthDate",
          label: "Birth date",
          sortable: false,
        },
        {
          key: "doc.phoneNumber",
          label: "Phone number",
          sortable: false,
        }, {key: "plop",
          label: "",
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
          this.patients = response.data.rows;
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

</style>