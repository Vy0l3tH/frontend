<template>
  <b-container fluid>
    <b-row>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Name:" label-for="nameInput">
        <b-form-input
          id="nameInput"
          v-model="soignant.name"
          placeholder="Enter name"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="First name:" label-for="firstNameInput">
        <b-form-input
          id="firstNameInput"
          v-model="soignant.firstName"
          placeholder="Enter firstname"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Email address:" label-for="emailInput">  
        <b-form-input
          id="emailInput"
          type ="email"
          v-model="soignant.mailAdress"
          placeholder="Enter email address"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Address:" label-for="adressInput">  
        <b-form-input
          id="adressInput"
          v-model="soignant.adress"
          placeholder="Enter address"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-5" label="Birthdate:" label-for="birthDateInput">  
        <b-form-input
          id="birthDateInput"
          v-model="soignant.birthDate"
          placeholder="Enter Birthdate"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-6" label="Phone Number:" label-for="phoneNumberInput">  
        <b-form-input
          id="phoneNumberInput"
          v-model="soignant.phoneNumber"
          placeholder="Enter phoneNumber"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-7" label="Account active?" label-for="activeInput">  
        <b-form-checkbox
          id="activeInput"
          v-model="soignant.active"
          value= 1
          unchecked-value= 0
          required>
        </b-form-checkbox>
      </b-form-group>
      <b-form-group id="input-group-8" label="Username:" label-for="usernameInput">  
        <b-form-input
          id="usernameInput"
          v-model="soignant.username"
          placeholder="Enter username"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-9" label="Password:" label-for="passwordInput">  
        <b-form-input
          id="passwordInput"
          type=password
          v-model="soignant.password"
          placeholder="Enter password"
          required>
        </b-form-input>
        <div v-if="passwordError" class="error">!! {{passwordError}}</div>
      </b-form-group>

      <b-form-group id="input-group-12" label="Caregiver Type:" label-for="caregiverTypeInput">  
        <b-form-input
          id="caregiverTypeInput"
          v-model="soignant.caregiverType"
          placeholder="Enter Follow-up Type"
          required>
        </b-form-input>
      </b-form-group>
      
      <b-form-group id="input-group-16" label="Institution:" label-for="institutionInput">  
        <b-form-input
          id="institutionInput"
          v-model="soignant.institution"
          placeholder="Enter Risk Level"
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
import CaregiverDataService from "../services/CaregiverDataService";

export default {
  name: "add-soignant",
  data() {
    return {
      soignant: {
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
        caregiverType: "",
        institution: "",
      },
      submitted: false,
      soignants: [],
      passwordError: null,
      modifyForm: false,
    };
  },
  methods: {
    saveSoignant() {
      var data = {
        name: this.soignant.name,
        firstName : this.soignant.firstName,
        mailAdress: this.soignant.mailAdress,
        adress: this.soignant.adress,
        birthDate: this.soignant.birthDate,
        phoneNumber: this.soignant.phoneNumber,
        active: this.soignant.active,
        username: this.soignant.username,
        password: this.soignant.password,
        role: this.soignant.role,
        caregiverType: this.soignant.caregiverType,
        institution: this.soignant.institution
      };
      if(this.modifyForm)
        CaregiverDataService.updateSoignant(this.$route.query.id, data)
      else
      CaregiverDataService.create(data)
        .then(response => {
          this.soignant._id = response.data._id;
          console.log(response.data);
          this.submitted = true;
          console.log(this.submitted)
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newSoignant() {
      this.submitted = false;
      this.soignant = {};
    },
   onSubmit(event) {
      //empêche le comportement normal du bouton submit
      event.preventDefault()
      // Vérifie les erreurs de validation du form
      this.passwordError = this.soignant.password.length > 5 ?
       '' : 'Password must be at least 6 chars long'
      if(!this.passwordError)
      { 
        this.saveSoignant()
        this.$router.push('/soignants')
      }
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values

        this.soignant.name = ''
        this.soignant.firstName = ''
        this.soignant.mailAdress = ''
        this.soignant.adress = ''
        this.soignant.birthDate = ''
        this.soignant.phoneNumber = ''
        this.soignant.active = 1
        this.soignant.username = ''
        this.soignant.password = ''
        this.soignant.caregiverType = ''
        this.soignant.institution = ''


        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      retrieveSoignant(id) {
      CaregiverDataService.getSoignant(id)
        .then((response) => {
          console.log(response.data);
          this.soignant = response.data;
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
      this.retrieveSoignant(this.$route.query.id);
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