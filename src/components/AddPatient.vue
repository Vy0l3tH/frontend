<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Nom</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="patient.name"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="age">Age</label>
        <input
          class="form-control"
          id="Age"
          required
          v-model="patient.age"
          name="age"
        />
      </div>
        <div class="form-group">
        <label for="email">Email</label>
        <input
          class="form-control"
          id="Email"
          required
          v-model="patient.email"
          name="email"
        />
      </div>

      <button @click="savePatient" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPatient">Add</button>
    </div>
  </div>
</template>

<script>
import PatientDataService from "../services/PatientDataService";

export default {
  name: "add-patient",
  data() {
    return {
      patient: {
        _id: null,
        name: "",
        age: 0,
        email: ""
      },
      submitted: false
    };
  },
  methods: {
    savePatient() {
      var data = {
        name: this.patient.name,
        age: this.patient.age,
        email: this.patient.email
      };

      PatientDataService.create(data)
        .then(response => {
          this.patient._id = response.data._id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newPatient() {
      this.submitted = false;
      this.patient = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>