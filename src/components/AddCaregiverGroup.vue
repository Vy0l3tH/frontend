<template>
  <b-container fluid>
    <b-row>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Group Name:"
          label-for="groupNameInput"
        >
          <b-form-input
            id="groupNameInput"
            v-model="group.groupName"
            placeholder="Enter Group Name"
            required
          >
          </b-form-input>
        </b-form-group>
        <b-button type="submit" class="mr-2" variant="info">Submit</b-button>
        <b-button type="reset" variant="info">Reset</b-button>
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
        <b-col cols="16" align-h="start">
          <b-table
            striped
            hover
            :items="patients"
            :fields="fieldsDef"
            :filter="filter"
          >
            <template #cell(check)="data">
              {{ isInGroup(data.item.id) }}
            </template>

            <template #cell(plop)="data">
              <b-button
                class="btn btn-sm btn-info mr-2"
                v-on:click="AddUserinGroup(group.id, data.item.id)"
              >
                Add
              </b-button>
              <b-button
                class="btn btn-sm btn-info"
                v-on:click="DeleteUserinGroup(group.id, data.item.id)"
              >
                Delete
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-form>
    </b-row>
    <b-row>Groupes patients</b-row>
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
          <b-input-group-append>
            <b-button :disabled="!filterPatients" @click="filterPatients = ''"
              >Effacer</b-button
            >
          </b-input-group-append>
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
            <template #cell(check)="data">
              {{ isPatientGroupIn(data.item.id) }}
            </template>

            <template #cell(plop)="data">
              <b-button
                class="btn btn-sm btn-info mr-2"
                v-on:click="AddPatientGroup(data.item.id)"
              >
                Add
              </b-button>
              <b-button
                class="btn btn-sm btn-info"
                v-on:click="DeletePatientGroup(data.item.id)"
              >
                Delete
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-form>
    </b-row>
    {{ group.users }}
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
          key: "id",
          label: "id",
          sortable: true,
        },
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
          key: "username",
          label: "Username",
          sortable: false,
        },
        {
          key: "check",
          label: "Groupe?",
          sortable: true,
        },
        {
          key: "plop",
          label: "Add / Delete",
          sortable: false,
        },
      ],
      fieldsPatientsDef: [
        {
          key: "groupName",
          label: "Name",
          sortable: true,
        },
        {
          key: "check",
          label: "Groupe?",
          sortable: true,
        },
        {
          key: "plop",
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
          console.log(response.data);
          this.patientGroups = response.data.items;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    isInGroup(id) {
      return this.group.users.indexOf(id) > -1 ? "Yes" : "No";
    },

    isPatientGroupIn(id) {
      return this.group.patientGroups.indexOf(id) > -1 ? "Yes" : "No";
    },

    saveGroup() {
      var data = {
        groupName: this.group.groupName,
        users: this.group.users,
        patientGroups: this.group.patientGroups,
      };
      console.log(data);
      if (this.modifyForm)
        GroupDataService.updateGroup(this.$route.query.id, data);
      else
        GroupDataService.createCaregiverGroup(data)

          .then((response) => {
            this.group._id = response.data._id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
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
          console.log(response.data);
          this.patients = response.data.items;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
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
          console.log(response.data);
          this.group = response.data;
          console.log(response.data);
          console.log(this.modifyForm);
          if (!this.$route.query.id == "") this.modifyForm = true;
          console.log(this.modifyForm);
        })
        .catch((e) => {
          console.log(e);
        });
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