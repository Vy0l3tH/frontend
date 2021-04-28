<template>
  <b-container fluid>
    <button type="button" @click="saveForm" class="btn bg-info btn-success">
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
        <b-form-group id="input-group-1" label="Champs:" label-for="content">
          <button
            type="button"
            @click="addInput"
            class="bg-info btn btn-success"
          >
            Add
          </button>

          <div v-if="currentForm">
            <template v-for="block in currentForm.content">
              <component
                :editionmode="editionmode"
                :is="block.component"
                :block="block"
                :key="block._uid"
              ></component>
            </template>
          </div>
        </b-form-group>
      </b-form>
    </b-row>
  </b-container>
</template>
<script>
import FormDataService from "../services/FormDataService";
export default {
  data() {
    return {
      editionmode: true,
      name: "MyAdminProMaxComponent",
      currentForm: {
        content: [],
      },
    };
  },
  methods: {
    addInput() {
      this.currentForm.content.push({
        component: "freeText",
        headline: "",
        value: "",
      });
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