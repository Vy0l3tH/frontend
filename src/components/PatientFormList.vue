<template>
  <b-container fluid>
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
              :href="'viewForm?userId='+`${data.item.userId}`+'&id=' + `${data.item.id}`"
            >
              View
            </b-button>
            <b-button
              class="btn btn-sm btn-info"
              v-on:click="vali(data.item.id)"
            >
              Validate
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
          sortable: false,
        },
        {
          key: "firstName",
          label: "User Name",
          sortable: false,
        },
        {
          key: "plop",
          label: "",
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
  computed: {
    currentUser() {
      if (this.$store.state.auth.user) return this.$store.state.auth.user;
      else return null;
    },
  },
  methods: {
    retrieveForms() {
      FormDataService.findFormByCaregiverId(this.currentUser.id)
        .then((response) => {
          var plop = [];
          response.data.items.forEach((element) => {
            
            element.forms.items.forEach((form) => {
              
              form.firstName = element.user.firstName
              
              form.userId = element.user.id
            plop = plop.concat(form);
          });
          });

          
          this.forms = plop;
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