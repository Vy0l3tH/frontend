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
          type ="email"
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
          type=password
          v-model="patient.password"
          placeholder="Enter password"
          required>
        </b-form-input>
        <div v-if="passwordError" class="error">!! {{passwordError}}</div>
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
        patientNumber: "",
        attributionGroup: "",
        followUpType: "",
        alarm: 1,
        gdprAgreement: 0,
        rswPublication: 0,
        riskLevel: "",
      },
      submitted: false,
      patients: [],
      passwordError: null,
      modifyForm: false,

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
        gdprAgreement: this.patient.gdprAgreement,
        rswPublication: this.patient.rswPublication,
        riskLevel: this.patient.riskLevel,
      };
      if(this.modifyForm)
        PatientDataService.updatePatient(this.$route.query.id, data)
      else
        PatientDataService.create(data)

        .then(response => {
          this.patient._id = response.data._id;
          console.log(response.data);
          this.submitted = true;
          console.log(this.submitted)
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
      //empêche le comportement normal du bouton submit
      event.preventDefault()
      // Vérifie les erreurs de validation du formulaire
      this.passwordError = this.patient.password.length > 5 ?
       '' : 'Password must be at least 6 chars long'
      if(!this.passwordError)
      { 
      this.savePatient()
      this.$router.push('/patients')
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values

      this.patient.name = ''      
      this.patient.firstName = ''
      this.patient.mailAdress = ''
      this.patient.adress = ''
      this.patient.birthDate = ''
      this.patient.phoneNumber = ''
      this.patient.active = 1
      this.patient.username = ''
      this.patient.password = ''
      this.patient.patientNumber = ''
      this.patient.attributionGroup = ''
      this.patient.followUpType = ''
      this.patient.alarm = 1
      this.patient.gdprAgreement = 0
      this.patient.rswPublication = 0
      this.patient.riskLevel = ''

      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
      this.show = true
      })
    },

    retrievePatient(id) {
    PatientDataService.getPatient(id)
      .then((response) => {
        console.log(response.data);
        this.patient = response.data;
        console.log(response.data);
        console.log(this.modifyForm)
        if(!this.$route.query.id == '')
          this.modifyForm= true;
        console.log(this.modifyForm)

      })
      .catch((e) => {
        console.log(e);
      });
    }
    
  },
  mounted() {
    if(!this.$route.query.id == '')
      this.retrievePatient(this.$route.query.id);
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.error {
  color: red;
}
</style>