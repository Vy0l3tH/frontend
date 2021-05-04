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
          <!-- objet littéral en ligne -->
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
                <h5>{{ block.component }}</h5>
                <component
                  :editionmode="editionmode"
                  :is="block.component"
                  :block="block"
                ></component>
                <button
                  type="button"
                  @click="addAlert(block.uid)"
                  class="bg-danger btn btn-success my-2"
                >
                  Add alert
                </button>
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
      </b-form>
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
      componentList: [
        { name: "Free text", value: "freeText" },
        { name: "Combo box", value: "comboBox" },
        { name: "Number input", value: "numberInput" },
      ],
      currentForm: {
        content: [],
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
        alerts: [],
      });
    },
    addAlert(id) {
      var found = this.currentForm.content.findIndex(function (post) {
        if (post.uid == id) return true;
      });
      alert(this.currentForm.content[found].uid);
      this.currentForm.content[found].alerts.push({
        component: "higherThan",
        uid: this.$uuid.v1(),
        value: "",
      });
      alert(found);
    },
    switchEditionMode() {
      this.editionmode = !this.editionmode;
    },
    saveForm() {
      var data = {
        name: this.currentForm.name,
        content: this.currentForm.content,
      };
      FormDataService.create(data)
        .then((response) => {
          this.data.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveForm(id) {
      FormDataService.getForm(id)
        .then((response) => {
          console.log(response.data);
          this.currentForm = response.data;
          console.log(response.data);
          console.log(this.modifyForm);
          if (!this.$route.query.id == "") this.modifyForm = true;
          console.log(this.modifyForm);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    if (!this.$route.query.id == "") this.retrieveForm(this.$route.query.id);
  },
};
</script>