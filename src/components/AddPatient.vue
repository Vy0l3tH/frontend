<template>
  <b-container fluid>
    <b-row>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Name:" label-for="nameInput">
        <b-form-input
          id="nameInput"
          v-model="patient.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="First name:" label-for="nameInput">
        <b-form-input
          id="nameInput"
          v-model="patient.name"
          placeholder="Enter firstname"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" class="mr-2" variant="info">Submit</b-button>
      <b-button type="reset" variant="info">Reset</b-button>
    </b-form>
    </b-row>
  </b-container>
 
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
    },
    onSubmit(event) {
        event.preventDefault()
        this.savePatient()
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values

        this.patient.name = ''

        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
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