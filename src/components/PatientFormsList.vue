<template>
  <div class="list row">
    <div class="col-md-6">
      <select class="form-select form-select-lg mb-3" v-model="selected">
        <option
          v-for="formu in availableForms"
          v-bind:value="formu.doc"
          v-bind:key="formu.doc.iden"
        >
          {{ formu.doc.identifiant }}
        </option>
      </select>
      <button
        class="m-3 btn btn-sm btn-info"
        @click="addFormToPatient(selected)"
      >
        Add
      </button>
      <h4>Forms List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(form, index) in forms"
          :key="index"
          @click="setActiveForm(form, index)"
        >
          {{ form.doc.identifiant }}
        </li>
      </ul>
    </div>

    <div class="col-md-6">
      <div v-if="currentForm">
        <h4>Form</h4>
        <template v-for="block in currentForm.doc.form">
          <component
            :is="block.component"
            :block="block"
            :key="block._uid"
          ></component>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import PatientDataService from "../services/PatientDataService";
import FormDataService from "../services/FormDataService";

export default {
  name: "forms-list",
  data() {
    return {
      patient: "robert",
      forms: [],
      currentForm: null,
      currentIndex: -1,
      title: "",
      availableForms: [],
      selected: "A",
      options: [
        { text: "One", value: "A" },
        { text: "Two", value: "B" },
        { text: "Three", value: "C" },
      ],
    };
  },
  methods: {
    retrieveForms(patient) {
      PatientDataService.getForms(patient)
        .then((response) => {
          this.forms = response.data.rows;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveAvailableForms() {
      FormDataService.getAll()
        .then((response) => {
          this.availableForms = response.data.rows;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveForms(this.patient);
      this.retrieveAvailableForms();
      this.currentForm = null;
      this.currentIndex = -1;
    },

    setActiveForm(form, index) {
      this.currentForm = form;
      this.currentIndex = index;
    },

    addFormToPatient(form) {
      console.log(form);
      var data = {
        form: form.form,
        identifiant: form.identifiant,
        validated: form.validated,
      };

      PatientDataService.addForms(this.$route.params.id, data)
        .then((response) => {
          this.retrieveForms(this.$route.params.id);
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveForms(this.$route.params.id);
    this.retrieveAvailableForms();
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