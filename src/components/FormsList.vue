<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" align-h="start">
        <router-link to="/addForm/">
          <a class="m-3 btn btn-sm btn-info" :href="'/addForm/'">
            New form
          </a>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <form>
        <input type="text" class="form-control" value="Recherche" />
      </form>
    </b-row>
    <b-row>
      <b-col cols="16" align-h="start">
        <b-table striped hover :items="forms" :fields="fieldsDef">
          <template #cell(plop)="data">
            <b-button
              class="btn btn-sm btn-info mr-2"
              :href="'AddForm?id=' + `${data.item.id}`"
            >
              Edit
            </b-button>
            <b-button
              class="btn btn-sm btn-info"
              v-on:click="removeForm(data.item.id)"
            >
              Delete
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import FormDataService from "../services/FormDataService";

export default {
  name: "forms-list",
  data() {
    return {
      fieldsDef: [
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "plop",
          label: "Edit / Delete",
          sortable: false,
        },
      ],
      forms: [],
      currentForm: null,
      currentIndex: -1,
      title: "",
      aaze: null,
    };
  },
  methods: {
    retrieveForms() {
      FormDataService.getAll()
        .then((response) => {
          
          this.forms = response.data.items;
          
        })
        .catch();
    },

    refreshList() {
      this.retrieveForms();
      this.currentForm = null;
      this.currentIndex = -1;
    },

    setActiveForm(form, index) {
      this.currentForm = form;
      this.currentIndex = index;
    },

    removeAllForms() {
      FormDataService.deleteAll()
        .then(function() {
          
          this.refreshList();
        })
        .catch();
    },

    removeForm(id) {
      FormDataService.deleteForm(id)
        .then(function() {
          
          this.refreshList();
        })
        .catch();
    },

    searchTitle() {
      FormDataService.findByTitle(this.title)
        .then((response) => {
          this.forms = response.data;
          
        })
        .catch();
    },
  },
  mounted() {
    this.retrieveForms();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.form-control {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>