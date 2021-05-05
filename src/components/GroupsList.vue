<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" align-h="start">
        <router-link to="/addGroup/">
          <a class="m-3 btn btn-sm btn-info" :href="'/addGroup/'">
            New group
          </a>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
<!-- filtre sur l'ensemble des données -->
        <b-form-group
          label-for="filter-input"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Recherche"
            >
            </b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Effacer</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
<!-- fin du filtre -->

    </b-row>
    <b-row>
      <b-col cols="16" align-h="start">
        <b-table striped hover  :items="groups" :fields="fieldsDef" :filter="filter" >
          <template #cell(plop)="data">
            <b-button
              class="btn btn-sm btn-info mr-2"
              :href="'AddGroup?id=' + `${data.item.id}`"
            >
              Edit
            </b-button>
            <b-button
              class="btn btn-sm btn-info"
              v-on:click="removeGroup(data.item.id)"
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
import GroupDataService from "../services/GroupDataService";

export default {
  name: "groups-list",
  data() {
    return {
      fieldsDef: [
        {
          key: "id",
          label: "id",
          sortable: true,
        },
        {
          key: "groupName",
          label: "Nom du groupe",
          sortable: true,
        },
        {
          key: "users",
          label: "Utilisateurs",
          sortable: false,
        },
        {
          key: "plop",
          label: "Edit / Delete",
          sortable: false,
        },
      ],
      groups: [],
      currentGroup: null,
      currentIndex: -1,
      title: "",
      aaze: null,
      filter: null,
    };
  },
  methods: {
    retrieveGroups() {
      GroupDataService.getAll()
        .then((response) => {
          console.log(response.data);
          this.groups = response.data.items;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveGroups();
      this.currentGroup = null;
      this.currentIndex = -1;
    },

    setActiveGroup(group, index) {
      this.currentGroup = group;
      this.currentIndex = index;
    },

    removeAllGroups() {
      GroupDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    removeGroup(id) {
      GroupDataService.deleteGroup(id)
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      GroupDataService.findByTitle(this.title)
        .then((response) => {
          this.groups = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveGroups();
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