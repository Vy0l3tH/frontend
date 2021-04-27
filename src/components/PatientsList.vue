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
            <input type="text" class="form-control" value="Recherche">
        </form> 
    </b-row>
    <b-row>
      <b-col cols="16" align-h="start">
      <b-table
        striped
        hover
        :items="patients"
        :fields="fieldsDef"
      >
       <template #cell(plop)>
        
     
        <b-button class="btn btn-sm btn-info mr-2" :href="'/addPatient/'">
         Edit
        </b-button>
         <b-button class="btn btn-sm btn-info " @click="removePatient(item.id)">
         Delete
        </b-button>


      </template>
      <template #row-details="row">
          <b-col>{{ row.item.name }}</b-col>
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
          label: "Email",
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
        }, 

            {
          key: "doc.active",
          label: "Active",
          sortable: false,
        }, 
            {
          key: "doc.username",
          label: "Username",
          sortable: false,
        }, 
            {
          key: "doc.password",
          label: "Password",
          sortable: false,
        }, 
            {
          key: "doc.role",
          label: "Role",
          sortable: false,
        },   
        {
          key: "doc.patientNumber",
          label: "Patient Number",
          sortable: true,
        }, 
        {
          key: "doc.attributionGroup",
          label: "Groupe d'attribution",
          sortable: true,
        }, 
                {
          key: "doc.followUpType",
          label: "Type de suivi",
          sortable: false,
        }, 
                {
          key: "doc.alarm",
          label: "Alarme",
          sortable: false,
        }, 
                {
          key: "doc.gdprAgreement",
          label: "Consentement RGPD",
          sortable: false,
        }, 
                {
          key: "doc.rswPublication",
          label: "Publication RSW",
          sortable: false,
        }, 
                {
          key: "doc.riskLevel",
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
.form-control{
    margin-top:  10px;
    margin-bottom: 10px;
}

</style>