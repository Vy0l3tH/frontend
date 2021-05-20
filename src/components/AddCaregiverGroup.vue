<template>
  <b-container fluid>
    <b-row>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-button type="submit" class="mt-2 mr-2 mb-2 btn btn-sm " variant="info"
          >Sauvegarder</b-button
        >
        <b-button type="reset" class="btn btn-sm mt-2 mb-2 " variant="info">Annuler</b-button>


        <b-form-group
        size="sm"
          id="input-group-1"
          label="Nom du groupe:"
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
         <label>Liste des soignants</label>
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
                Ajouter
              </b-button>
              <b-button
                class="btn btn-sm btn-alert"
                v-if="isInGroup(data.item.id)"
                v-on:click="DeleteUserinGroup(group.id, data.item.id)"
              >
                Supprimer
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-form>
    </b-row>
           <label>Liste des groupes de patient</label>
    <b-row>
      <b-form-group label-for="filter-input">
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filterPatients"
            type="search"
            placeholder="Recherche"
          >
          </b-form-input>

        </b-input-group>
      </b-form-group>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-col cols="16" align-h="start">
          <b-table
            striped
            hover
            :items="patientGroups"
            :fields="fieldsPatientsDef"
            :filter="filterPatients"
          >
          

            <template #cell(actions)="data">
              <b-button
                class="btn btn-sm btn-info mr-2"
                  v-if="!isPatientGroupIn(data.item.id)"
                v-on:click="AddPatientGroup(data.item.id)"
              >
                Ajouter
              </b-button>
              <b-button
                class="btn btn-sm"
                       v-if="isPatientGroupIn(data.item.id)"
                v-on:click="DeletePatientGroup(data.item.id)"
              >
                Supprimer
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-form>
    </b-row>
  </b-container>
</template>

<script>
import CaregiverDataService from "../services/CaregiverDataService";
import GroupDataService from "../services/GroupDataService";

export default {
  name: "add-group",
  data() {
    return {
      group: {
        _id: null,
        groupName: "",
        users: [],
        patientGroups: [],
        
      },
      fieldsDef: [
        {
          key: "name",
          label: "Nom",
          sortable: true,
          
        },
        {
          key: "firstName",
          label: "Prénom",
          sortable: false,
        },
        
        {
          key: "actions",
          label: "",
          sortable: false,
        },
      ],
      fieldsPatientsDef: [
        {
          key: "groupName",
          label: "Nom",
          sortable: true,
        },
        {
          key: "actions",
          label: "Add / Delete",
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
      filterPatients: null,
      patientGroups: [],
    };
  },
  computed: {},
  methods: {
    retrievePatientsGroups() {
      GroupDataService.getAllPatientGroup()
        .then((response) => {
          this.patientGroups = response.data.items;
        })
        .catch();
    },
    isInGroup(id) {
      return this.group.users.indexOf(id) > -1;
    },

    isPatientGroupIn(id) {
      return this.group.patientGroups.indexOf(id) > -1;
    },

    saveGroup() {
      var data = {
        groupName: this.group.groupName,
        users: this.group.users,
        patientGroups: this.group.patientGroups,
      };

      if (this.modifyForm)
        GroupDataService.updateGroup(this.$route.query.id, data);
      else
        GroupDataService.createCaregiverGroup(data)

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

    AddPatientGroup(patientGroupId) {
      this.group.patientGroups.push(patientGroupId);
    },
    DeletePatientGroup(patientGroupId) {
      this.group.patientGroups = this.group.patientGroups.filter(
        (a) => a != patientGroupId
      );
    },
    retrievePatients() {
      CaregiverDataService.getAll()
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
      this.$router.push("/caregiverGroups");
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
    this.retrievePatientsGroups();
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