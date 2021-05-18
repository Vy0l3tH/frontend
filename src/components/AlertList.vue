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
              :href="'AddForm?id=' + `${data.item.id}`"
            >
              View
            </b-button>
            <b-button
              class="btn btn-sm btn-info"
              v-on:click="validate(data.item.id)"
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
import AlertDataService from "../services/AlertDataService";

export default {
  name: "forms-list",
  data() {
    return {
      fieldsDef: [
        {
          key: "label",
          label: "Label",
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
    console.log(this.currentUser.id)
      AlertDataService.findByCaregiverId(this.currentUser.id)
        .then((response) => {
         
          this.forms = response.data.items;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveForms();
      this.currentForm = null;
      this.currentIndex = -1;
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