<template>
  <b-container fluid>
    <b-row>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Name:" label-for="nameInput">
          <b-form-input
            id="nameInput"
            v-model="currentShippingPolicy.Name"
            placeholder="Enter name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Periodicity:"
          label-for="nameInput"
        >
          <b-form-input
            id="nameInput"
            v-model="currentShippingPolicy.Periodicity"
            placeholder="Enter periodicity"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Time in day:"
          label-for="nameInput"
        >
          <b-form-input
            id="nameInput"
            v-model="currentShippingPolicy.TimeInDay"
            placeholder="Enter time in day"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Time in day:"
          label-for="nameInput"
        >
          <b-form-select v-model="selectedForm">
            <b-select-option
              v-for="form in formsList"
              v-bind:key="form.id"
              v-bind:value="form"
            >
              {{ form.name }}
            </b-select-option>
            <!-- objet littéral en ligne -->
          </b-form-select>
        </b-form-group>
        <button type="button" @click="addForm" class="bg-info btn btn-success">
          Add form
        </button>
        <b-table striped hover :items="currentShippingPolicy.Forms"></b-table>
        <b-button type="submit" class="mr-2 mt-2" variant="info"
          >Submit</b-button
        >
        <b-button type="reset" class="mt-2" variant="info">Reset</b-button>
      </b-form>
    </b-row>
  </b-container>
</template>

<script>
import ShippingPolicyDataService from "../services/ShippingPolicyDataService";
import FormDataService from "../services/FormDataService";

export default {
  name: "add-shippingPolicy",
  data() {
    return {
      selectedForm: "1c385944a77312b08bf0e0905002002d",
      formsList: [],
      submitted: false,
      currentShippingPolicy: {
        Name: "",
        Periodicity: "",
        TimeInDay: "",
        Forms: [],
      },
    };
  },
  methods: {
   
    addForm() {
      this.currentShippingPolicy.Forms.push(this.selectedForm);
    },
    saveShippingPolicy() {
      ShippingPolicyDataService.create(this.currentShippingPolicy)
        .then((response) => {
          this.currentShippingPolicy.id = response.data.id;

          this.submitted = true;
        })
        .catch();
    },
    retrieveForms() {
      FormDataService.getAll()
        .then((response) => {
          this.formsList = response.data.items;
          
        })
        .catch();
    },
    newShippingPolicy() {
      this.submitted = false;
      this.shippingPolicy = {};
    },
    onSubmit(event) {
      event.preventDefault();
      this.saveShippingPolicy();
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values

      this.shippingPolicy.name = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  mounted() {
    this.retrieveForms();
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>