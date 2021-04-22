<template>
  <b-container fluid>
    <b-row>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Name:" label-for="nameInput">
        <b-form-input
          id="nameInput"
          v-model="patient.name"
          placeholder="Enter name"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="First name:" label-for="firstNameInput">
        <b-form-input
          id="firstNameInput"
          v-model="patient.firstName"
          placeholder="Enter firstname"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Email address:" label-for="emailInput">  
        <b-form-input
          id="emailInput"
          v-model="patient.mailAdress"
          placeholder="Enter email address"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Address:" label-for="adressInput">  
        <b-form-input
          id="adressInput"
          v-model="patient.adress"
          placeholder="Enter address"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="Birthdate:" label-for="birthDateInput">  
        <b-form-input
          id="birthDateInput"
          v-model="patient.birthDate"
          placeholder="Enter Birthdate"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-6" label="Phone Number:" label-for="phoneNumberInput">  
        <b-form-input
          id="phoneNumberInput"
          v-model="patient.phoneNumber"
          placeholder="Enter phoneNumber"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-7" label="Account active?" label-for="activeInput">  
        <b-form-checkbox
          id="activeInput"
          v-model="patient.active"
          value= 1
          unchecked-value= 0
          required>
        </b-form-checkbox>
      </b-form-group>
      <b-form-group id="input-group-8" label="Username:" label-for="usernameInput">  
        <b-form-input
          id="usernameInput"
          v-model="patient.username"
          placeholder="Enter username"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-9" label="Password:" label-for="passwordInput">  
        <b-form-input
          id="passwordInput"
          v-model="patient.password"
          placeholder="Enter password"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-10" label="Rôle:" label-for="roleInput">  
        <b-form-input
          id="roleInput"
          v-model="patient.role"
          disabled
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-11" label="Patient Number:" label-for="patientNumberInput">  
        <b-form-input
          id="patientNumberInput"
          v-model="patient.patientNumber"
          placeholder="Enter Patient Number"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-12" label="Follow-up Type:" label-for="followUpTypeInput">  
        <b-form-input
          id="followUpTypeInput"
          v-model="patient.followUpType"
          placeholder="Enter Follow-up Type"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-13" label="Activate Alarm:" label-for="alarmInput">  
       <b-form-checkbox
          id="alarmInput"
          v-model="patient.alarm"
          value= 1
          unchecked-value= 0
          required>
        </b-form-checkbox>
      </b-form-group>
      <b-form-group id="input-group-14" label="Agree to gdpr:" label-for="gdprAgreementInput">  
        <b-form-checkbox
          id="gdprAgreementInput"
          v-model="patient.gdprAgreement"
          value= 1
          unchecked-value= 0
          required>
        </b-form-checkbox>
      </b-form-group>
      <b-form-group id="input-group-15" label="rswPublication:" label-for="rswPublicationInput">  
        <b-form-checkbox
          id="rswPublicationInput"
          v-model="patient.rswPublication"
          value= 1
          unchecked-value= 0
          required>
        </b-form-checkbox>
      </b-form-group>
      <b-form-group id="input-group-16" label="Risk Level:" label-for="riskLevelInput">  
        <b-form-input
          id="riskLevelInput"
          v-model="patient.riskLevel"
          placeholder="Enter Risk Level"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-16" label="Attribution Group:" label-for="attributionGroupInput">  
        <b-form-input
          id="attributionGroupInput"
          v-model="patient.attributionGroup"
          placeholder="Enter Attribution Group"
          required>
        </b-form-input>
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
        firstName: "",
        mailAdress: "",
        adress: "",
        birthDate: "",
        phoneNumber: "",
        active: 1,
        username: "",
        password: "",
        role: "patient",
        patientNumber: "",
        attributionGroup: "",
        followUpType: "",
        alarm: 1,
        gdprAgreement: 0,
        rswPublication: 0,
        riskLevel: "",
      },
      submitted: false
    };
  },
  methods: {
    savePatient() {
      var data = {
        name: this.patient.name,
        firstName : this.patient.firstName,
        mailAdress: this.patient.mailAdress,
        adress: this.patient.adress,
        birthDate: this.patient.birthDate,
        phoneNumber: this.patient.phoneNumber,
        active: this.patient.active,
        username: this.patient.username,
        password: this.patient.password,
        role: this.patient.role,
        patientNumber: this.patient.patientNumber,
        attributionGroup: this.patient.attributionGroup,
        followUpType: this.patient.followUpType,
        alarm: this.patient.alarm,
        gdprAgreement: this.patient. gdprAgreement,
        rswPublication: this.patient.rswPublication,
        riskLevel: this.patient.riskLevel,
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