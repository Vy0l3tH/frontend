<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" align-h="start">
        <router-link to="/addShippingPolicy/">
          <a class="m-3 btn btn-sm btn-info" :href="'/addShippingPolicy/'">
            New shipping policy
          </a>
        </router-link>
      </b-col>
    </b-row>
    <b-row>
      <!-- filtre sur l'ensemble des données -->
      <b-form-group label-for="filter-input">
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Recherche"
          >
          </b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''"
              >Effacer</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <!-- fin du filtre -->
    </b-row>
    <b-row>
      <b-col cols="16" align-h="start">
        <b-table
          striped
          hover
          :items="shippingPolicys"
          :fields="fieldsDef"
          :filter="filter"
        >
          <template #cell(plop)="data">
            <b-button
              class="btn btn-sm btn-info mr-2"
              :href="'AddShippingPolicy?id=' + `${data.item.id}`"
            >
              Edit
            </b-button>
            <b-button
              class="btn btn-sm btn-info"
              v-on:click="removeShippingPolicy(data.item.id)"
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
import ShippingPolicyDataService from "../services/ShippingPolicyDataService";


export default {
  name: "shippingPolicys-list",
  data() {
    return {
      fieldsDef: [
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "Periodicity",
          label: "Periodicity",
          sortable: false,
        },
        {
          key: "TimeInDay",
          label: "Time in Day",
          sortable: false,
        },
        {
          key: "MaxOccurence",
          label: "Max Occurence",
          sortable: false,
        },
      ],
      shippingPolicys: [],
      currentShippingPolicy: null,
      currentIndex: -1,
      title: "",
      aaze: null,
      filter: null,
    };
  },
  methods: {
    retrieveShippingPolicys() {
      ShippingPolicyDataService.getAll()
        .then((response) => {
          console.log(response.data);
          this.shippingPolicys = response.data.items;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveShippingPolicys();
      this.currentShippingPolicy = null;
      this.currentIndex = -1;
    },

    setActiveShippingPolicy(shippingPolicy, index) {
      this.currentShippingPolicy = shippingPolicy;
      this.currentIndex = index;
    },

    removeAllShippingPolicys() {
      ShippingPolicyDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    removeShippingPolicy(id) {
      ShippingPolicyDataService.deleteShippingPolicy(id)
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      ShippingPolicyDataService.findByTitle(this.title)
        .then((response) => {
          this.shippingPolicys = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveShippingPolicys();
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