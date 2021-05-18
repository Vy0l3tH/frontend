<template>
  <b-container fluid>
    <button type="button" @click="saveForm" class="btn bg-info btn-success m-2">
      Save this form
    </button>
    <button
      type="button"
      @click="switchEditionMode"
      class="bg-info btn btn-success"
    >
      Edition mode
    </button>
    <b-row>
      <b-form>
        <b-form-group id="input-group-16" label="Name" label-for="name">
          <b-form-input
            id="name"
            v-model="currentForm.name"
            placeholder="Title"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-select v-model="selectedControl">
          <b-select-option
            v-for="component in componentList"
            v-bind:key="component.value"
            v-bind:value="component.value"
          >
            {{ component.name }}
          </b-select-option>
        </b-form-select>
        <button
          type="button"
          @click="addInput"
          class="bg-info btn btn-success my-2"
        >
          Add
        </button>

        <b-form-group id="input-group-1" label="Fields:" label-for="content">
          <div v-if="currentForm">
            <template v-for="block in currentForm.content">
              <div :key="block.uid" class="border p-2 mb-2">
                <b-checkbox v-model="block.selected"></b-checkbox>
                <h5>{{ block.component }}</h5>
                <component
                  :editionmode="editionmode"
                  :is="block.component"
                  :block="block"
                ></component>
                <template v-for="alert in block.alerts">
                  <component
                    :key="alert.uid"
                    :is="alert.component"
                    :cont="alert"
                  ></component>
                </template>
              </div>
            </template>
          </div>
        </b-form-group>
        <b-button class="btn btn-sm btn-info" v-b-modal.modal-1
          >Add alert form</b-button
        >
      </b-form>
      <b-modal id="modal-1" title="Alert type" @ok="addFormAlert">
        <b-form-select v-model="alertType">
          <b-select-option value="higherThan"> Higher than </b-select-option>
          <!-- objet littéral en ligne -->
        </b-form-select>
        <b-input v-model="alertValue"></b-input>
      </b-modal>
    </b-row>
  </b-container>
</template>
<script>
import FormDataService from "../services/FormDataService";
import { uuid } from "vue-uuid";
export default {
  data() {
    return {
      uuid: uuid.v1(),
      editionmode: true,
      name: "MyAdminProMaxComponent",
      selectedControl: "freeText",
      alertType: "",
      alertValue: "",
      componentList: [
        { name: "Free text", value: "freeText" },
        { name: "Combo box", value: "comboBox" },
        { name: "Number input", value: "numberInput" },
        { name: "Rating", value: "rating" },
      ],
      currentForm: {
        content: [],
        alerts: [],
      },
    };
  },
  methods: {
    addInput() {
      this.currentForm.content.push({
        component: this.selectedControl,
        uid: this.$uuid.v1(),
        headline: "",
        value: "",
        options: [],
      });
    },
    addFormAlert() {
      var componentList = this.currentForm.content.filter(
        (block) => block.selected
      );
      
      alert(componentList.map(a => a.uid))
      this.currentForm.alerts.push({
        alertType: this.alertType,
        componentList: componentList.map(a => a.uid),
        value: this.alertValue,
      });
    },
    addAlert(id) {
      var found = this.currentForm.content.findIndex(function (post) {
        if (post.uid == id) return true;
      });

      this.currentForm.content[found].alerts.push({
        component: "higherThan",
        uid: this.$uuid.v1(),
        value: "",
        selected: false,
      });
    },
    switchEditionMode() {
      this.editionmode = !this.editionmode;
    },
    saveForm() {
      
      FormDataService.create(this.currentForm)
        .then((response) => {
          this.data.id = response.data.id;
          
          this.submitted = true;
        })
        .catch();
    },
    retrieveForm(id) {
      FormDataService.getForm(id)
        .then((response) => {
          
          this.currentForm = response.data;
          
          
          if (!this.$route.query.id == "") this.modifyForm = true;
          
        })
        .catch();
    },
  },
  mounted() {
    if (!this.$route.query.id == "") this.retrieveForm(this.$route.query.id);
  },
};
</script>