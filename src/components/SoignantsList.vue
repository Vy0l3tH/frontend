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
      <b-col cols="16" align-h="start">
      <b-table
        striped
        hover
        :items="soignants"
        :fields="fieldsDef"
      >
       <template #cell(plop)>
        
     
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
  
      fieldsDef: [
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "firstName",
          label: "First name",
          sortable: false,
        },
        {
          key: "mailAdress",
          label: "Email",
          sortable: false,
        },
        {
          key: "adress",
          label: "Adress",
          sortable: false,
        },
        {
          key: "birthDate",
          label: "Birth date",
          sortable: false,
        },
        {
          key: "phoneNumber",
          label: "Phone number",
          sortable: false,
        }, 

            {
          key: "active",
          label: "Active",
          sortable: false,
        }, 
            {
          key: "role",
          label: "Role",
          sortable: false,
        }, 
        {
          key: "attributionGroup",
          label: "Groupe d'attribution",
          sortable: true,
        }, 
                {
          key: "caregiverType",
          label: "Type de soignant",
          sortable: true,
        }, 
                {
          key: "institution",
          label: "Institution",
          sortable: false,
        },
        {
          key: "plop",
          label: "Edit / Delete",
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
          this.soignants = response.data.items;
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