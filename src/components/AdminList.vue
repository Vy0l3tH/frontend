<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" align-h="start">
          <router-link to="/addAdmin/">
            <a class="m-3 btn btn-sm btn-info" :href="'/addAdmin/'">
              New admin
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
        :items="admins"
        :fields="fieldsDef"
      >
       <template #cell(plop)>
        
     
        <b-button class="btn btn-sm btn-info mr-2" :href="'/addAdmin/'">
         Edit
        </b-button>
         <b-button class="btn btn-sm btn-info " :href="'/addAdmin/'">
         Delete
        </b-button>
      </template>
      </b-table>
      
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import AdminDataService from "../services/AdminDataService";

export default {
  name: "admins-list",
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
          label: "First name",
          sortable: false,
        },
        {
          key: "adress",
          label: "Adress",
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
          key: "username",
          label: "Username",
          sortable: false,
        },   
        {
          key: "uidHospital",
          label: "uid Hôpital",
          sortable: false,
        }, 

        {
          key: "inamiNumber",
          label: "Numéro INAMI",
          sortable: false,
        },  
        {
          key: "speciality",
          label: "Spécialité",
          sortable: false,
        },  
        

        {
          key: "plop",
          label: "Edit / Delete",
          sortable: false,
        },    

          
      ],
      admins: [],
      currentAdmin: null,
      currentIndex: -1,
      title: "",
      aaze: null,
    };
  },
  methods: {
    retrieveAdmins() {
      AdminDataService.getAll()
        .then((response) => {
          this.admins = response.data.items;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveAdmins();
      this.currentAdmin = null;
      this.currentIndex = -1;
    },

    setActiveAdmin(admin, index) {
      this.currentAdmin = admin;
      this.currentIndex = index;
    },

    removeAllAdmins() {
      AdminDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      AdminDataService.findByTitle(this.title)
        .then((response) => {
          this.admins = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveAdmins();
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