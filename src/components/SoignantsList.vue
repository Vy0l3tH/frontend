<template>
  <b-container fluid>

    <b-row>
      <b-col cols="12" align-h="start">
          <router-link to="/addSoignant/">
            <a class="m-3 btn btn-sm btn-info" :href="'/addSoignant/'">
              New soignant
            </a>
          </router-link>
      </b-col>
    </b-row>
    <b-row>
        <form>  
            <input type="text" class="form-control" value="Recherche">
        </form> 
    </b-row>
    <b-row>
      <b-col cols="12" align-h="start">
      <b-table
        striped
        hover
        :items="soignants"
        :fields="fields"
      >
       <template #cell(plop)  >
        
     
        <b-button class="btn btn-sm btn-info mr-2" :href="'/addSoignant/'">
         Edit
        </b-button>
         <b-button class="btn btn-sm btn-info " :href="'/addSoignant/'">
         Delete
        </b-button>
      </template>
      </b-table>
      
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import SoignantDataService from "../services/SoignantDataService";

export default {
  name: "soignants-list",
  data() {
    return {
      fields: [
         
        {
          key: "doc.name",
          label: "Name",
          sortable: true,
        },
        {
          key: "doc.firstName",
          label: "First name",
          sortable: false,
        },
        {
          key: "doc.mailAdress",
          label: "First name",
          sortable: false,
        },
        {
          key: "doc.adress",
          label: "Adress",
          sortable: false,
        },
        {
          key: "doc.birthDate",
          label: "Birth date",
          sortable: false,
        },
        {
          key: "doc.phoneNumber",
          label: "Phone number",
          sortable: false,
        }, {key: "plop",
          label: "",
          sortable: false,
        },
          
      ],
      soignants: [],
      currentSoignant: null,
      currentIndex: -1,
      title: "",
      aaze: null,
    };
  },
  methods: {
    retrieveSoignants() {
      SoignantDataService.getAll()
        .then((response) => {
          this.soignants = response.data.rows;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveSoignants();
      this.currentSoignant = null;
      this.currentIndex = -1;
    },

    setActiveSoignant(soignant, index) {
      this.currentSoignant = soignant;
      this.currentIndex = index;
    },

    removeAllSoignants() {
      SoignantDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      SoignantDataService.findByTitle(this.title)
        .then((response) => {
          this.soignants = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveSoignants();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.form-control{
    margin-top:  10px;
    margin-bottom: 10px;
}

</style>