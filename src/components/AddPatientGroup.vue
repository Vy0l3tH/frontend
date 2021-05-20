<template>
  <b-container fluid>
    <b-row>
      <b-form @submit="onSubmit" @reset="onReset">
      
        <b-button type="submit" class="mt-2 mr-2 mb-2 btn btn-sm" variant="info">Sauvegarder</b-button>
        <b-button type="reset" class="mt-2 mr-2 mb-2 btn btn-sm" variant="info">Annuler</b-button>
          <b-form-group
            size="sm"
          id="input-group-1"
          label="Nom du groupe :"
          label-for="groupNameInput"
        >
          <b-form-input
            size="sm"
            id="groupNameInput"
            v-model="group.groupName"
            placeholder="Entrez un nom de groupe"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label-for="filter-input">
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Recherche"
            >
            </b-form-input>
           
          </b-input-group>
        </b-form-group>
        <b-col cols="16" align-h="start">
          <b-table
            striped
            hover
            :items="patients"
            :fields="fieldsDef"
            :filter="filter"
          >
          

            <template #cell(actions)="data">
              <b-button
                class="btn btn-sm btn-info mr-2"
                  v-if="!isInGroup(data.item.id)"
                v-on:click="AddUserinGroup(group.id, data.item.id)"
              >
                Add
              </b-button>
              <b-button
                class="btn btn-sm "
                  v-if="isInGroup(data.item.id)"
                v-on:click="DeleteUserinGroup(group.id, data.item.id)"
              >
                Delete
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-form>
    </b-row>
  </b-container>
</template>

<script>
import PatientDataService from "../services/PatientDataService";
import GroupDataService from "../services/GroupDataService";

export default {
  name: "add-group",
  data() {
    return {
      group: {
        _id: null,
        groupName: "",
        users: [],
      },
      fieldsDef: [
        
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "firstName",
          label: "First name",
          sortable: true,
        },
        {
          key: "actions",
          label: "",
          sortable: false,
        },
      ],
      submitted: false,
      groups: [],
      passwordError: null,
      modifyForm: false,
      patients: [],
      currentPatient: null,
      currentIndex: -1,
      title: "",
      aaze: null,
      filter: null,
    };
  },
  computed: {},
  methods: {
    isInGroup(id) {
      return this.group.users.indexOf(id) > -1 ;
    },

    saveGroup() {
      var data = {
        groupName: this.group.groupName,
        users: this.group.users,
      };
      
      if (this.modifyForm)
        GroupDataService.updateGroup(this.$route.query.id, data);
      else
        GroupDataService.createPatientGroup(data)

          .then((response) => {
            this.group._id = response.data._id;
            
            this.submitted = true;
          })
          .catch();
    },

    AddUserinGroup(groupId, userId) {
      this.group.users.push(userId);
    },
    DeleteUserinGroup(groupId, userId) {
      this.group.users = this.group.users.filter((a) => a != userId);
    },
    retrievePatients() {
      PatientDataService.getAll()
        .then((response) => {
          
          this.patients = response.data.items;
          
        })
        .catch();
    },

    refreshList() {
      this.retrievePatients();
      this.currentPatient = null;
      this.currentIndex = -1;
    },

    newGroup() {
      this.submitted = false;
      this.group = {};
    },
    onSubmit(event) {
      //empêche le comportement normal du bouton submit
      event.preventDefault();
      // Vérifie les erreurs de validation du form
      this.saveGroup();
      this.$router.push("/patientGroups");
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values

      this.group.groupName = "";
      this.group.users = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    retrieveGroup(id) {
      GroupDataService.getGroup(id)
        .then((response) => {
          
          this.group = response.data;
          
          
          if (!this.$route.query.id == "") this.modifyForm = true;
          
        })
        .catch();
    },
  },
  mounted() {

    if (!this.$route.query.id == "") this.retrieveGroup(this.$route.query.id);
    this.retrievePatients();
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.error {
  color: red;
}
</style>