<template>
    <b-container fluid>
    <b-row>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group id="input-group-1" label="Name:" label-for="nameInput">
        <b-form-input
          id="nameInput"
          v-model="admin.name"
          placeholder="Enter name"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="First name:" label-for="firstNameInput">
        <b-form-input
          id="firstNameInput"
          v-model="admin.firstName"
          placeholder="Enter firstname"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Email address:" label-for="emailInput">  
        <b-form-input
          id="emailInput"
          type ="email"
          v-model="admin.mailAdress"
          placeholder="Enter email address"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-6" label="Phone Number:" label-for="phoneNumberInput">  
        <b-form-input
          id="phoneNumberInput"
          v-model="admin.phoneNumber"
          placeholder="Enter phoneNumber"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-7" label="Account active?" label-for="activeInput">  
        <b-form-checkbox
          id="activeInput"
          v-model="admin.active"
          value= 1
          unchecked-value= 0
          required>
        </b-form-checkbox>
      </b-form-group>
      <b-form-group id="input-group-8" label="Username:" label-for="usernameInput">  
        <b-form-input
          id="usernameInput"
          v-model="admin.username"
          placeholder="Enter username"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-9" label="Password:" label-for="passwordInput">  
        <b-form-input
          id="passwordInput"
          type=password
          v-model="admin.password"
          placeholder="Enter password"
          required>
        </b-form-input>
        <div v-if="passwordError" class="error">!! {{passwordError}}</div>
      </b-form-group>
      <b-form-group id="input-group-10" label="UidHospital:" label-for="uidHospitalInput">  
        <b-form-input
          id="uidHospitalInput"
          v-model="admin.uidHospital"
          placeholder="Enter uidhospital"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-11" label="InamiNumber:" label-for="inamiNumberInput">  
        <b-form-input
          id="inamiNumberInput"
          v-model="admin.inamiNumber"
          placeholder="Enter inamiNumber"
          required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="input-group-12" label="Speciality:" label-for="specialityInput">  
        <b-form-input
          id="specialityInput"
          v-model="admin.speciality"
          placeholder="Enter speciality"
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
import AdminDataService from "../services/AdminDataService";

export default {
  name: "add-admin",
  data() {
    return {
      admin: {
        _id: null,
        name: "",
        firstName: "",
        mailAdress: "",
        phoneNumber: "",
        active: 1,
        username: "",
        password: "",
        uidHospital: "",
        inamiNumber: "",
        speciality: "",
      },
      submitted: false,
      admins: [],
      passwordError: null,
      modifyForm: false,
    };
  },
  methods: {
    saveAdmin() {
      var data = {
        name: this.admin.name,
        firstName : this.admin.firstName,
        mailAdress: this.admin.mailAdress,
        phoneNumber: this.admin.phoneNumber,
        active: this.admin.active,
        username: this.admin.username,
        password: this.admin.password,
        role: this.admin.role,
        uidHospital: this.admin.uidHospital,
        inamiNumber: this.admin.inamiNumber,
        speciality: this.admin.speciality,
      };
      if(this.modifyForm)
        AdminDataService.updateAdmin(this.$route.query.id, data)
      else
        AdminDataService.create(data)
        
        .then(response => {
          this.admin._id = response.data._id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newAdmin() {
      this.submitted = false;
      this.admin = {};
    },
   onSubmit(event) {
      //empêche le comportement normal du bouton submit
      event.preventDefault()
      // Vérifie les erreurs de validation du form
      this.passwordError = this.admin.password.length > 4 ?
       '' : 'Password must be at least 5 chars long'
      if(!this.passwordError)
      { 
      this.saveAdmin()
      this.$router.push('/admins')
      }
    },
      onReset(event) {
        event.preventDefault()
        // Reset our form values

        this.admin.name = ''      
        this.admin.firstName = ''
        this.admin.mailAdress = ''
        this.admin.phoneNumber = ''
        this.admin.active = 1
        this.admin.username = ''
        this.admin.password = ''
        this.admin.uidHospital = ''
        this.admin.inamiNumber = ''
        this.admin.speciality = ''

        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      retrieveAdmin(id) {
        AdminDataService.getAdmin(id)
      .then((response) => {
        console.log(response.data);
        this.admin = response.data;
        console.log(response.data);
        console.log(this.modifyForm)
        if(!this.$route.query.id == '')
          this.modifyForm= true;
        console.log(this.modifyForm);

      })
      .catch((e) => {
        console.log(e);
      });     
    
  }
},
  mounted() {
    if(!this.$route.query.id == '')
      this.retrieveAdmin(this.$route.query.id);
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