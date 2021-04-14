<template>
  <div class="list row">

<table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

    <div class="col-md-6">
      <button class="m-3 btn btn-sm btn-info" @click="removeAllPatients">
        Remove All
      </button>
          <a class="m-3 btn btn-sm btn-info" :href="'/addPatient/'">
        New patient
      </a>  

        
      <h4>Patients List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(patient, index) in patients"
          :key="index"
          @click="setActivePatient(patient, index)"
        >
          {{ patient.doc.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentPatient">
        <h4>Patient</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentPatient.doc.name }}
        </div>
        <div>
          <label><strong>Âge:</strong></label> {{ currentPatient.doc.age }}
        </div>
        <div>
          <label><strong>Email:</strong></label> {{ currentPatient.doc.email  }}
        </div>   
          <a class="m-3 btn btn-sm btn-info" v-bind:href="'/viewPatient/'+currentPatient.doc.name.toLowerCase()">
        View patient forms
      </a>  
      </div>
    </div>
  </div>
</template>

<script>
import PatientDataService from "../services/PatientDataService";

export default {
  name: "patients-list",
  data() {
    return {
      patients: [],
      currentPatient: null,
      currentIndex: -1,
      title: "",
      aaze:null
    };
  },
  methods: {
    retrievePatients() {
      PatientDataService.getAll()
        .then(response => {
       
          this.patients = response.data.rows;
          console.log(response.data);
        })
        .catch(e => {
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
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      PatientDataService.findByTitle(this.title)
        .then(response => {
          this.patients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievePatients();
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