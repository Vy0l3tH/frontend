<template>
  <div id="app container" class="flex-grow:1 vh-100" >
      <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="#">HomeLink</b-navbar-brand>

          <b-navbar-toggle  v-if="currentUser"
            target="nav-collapse navbar-fixed-top"
          ></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item
                variant="info"
                v-if="currentUser"
                href
                @click.prevent="logOut"
              >
                <font-awesome-icon icon="sign-out-alt" />Logout
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
    <div class="row h-100 h-100">
      <div class="col-1 bg-info h-100 flex-grow:1" v-if="currentUser">
        <b-nav class="navbar navbar-dark bg-info flex-grow:1">
          
          <div class="navbar-nav mr-auto">
            <li class="nav-item" v-if="isAdmin">
              <router-link to="/patients" class="nav-link"
                >Liste des patients</router-link
              >
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link to="/soignants" class="nav-link"
                >Liste des soignants</router-link
              >
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link to="/admins" class="nav-link"
                >Liste des Administrateurs</router-link
              >
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link to="/patientGroups" class="nav-link"
                >Groupes de patients</router-link
              >
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link to="/caregiverGroups" class="nav-link"
                >Groupes de soignants</router-link
              >
            </li>

            <li class="nav-item" v-if="isAdmin">
              <router-link to="/forms" class="nav-link">Liste des formulaire</router-link>
            </li>
            <li class="nav-item" v-if="isCaregiver">
              <router-link to="/alertList" class="nav-link"
                >Mes alertes</router-link
              >
            </li>
            <li class="nav-item" v-if="isCaregiver" >
              <router-link to="/patientFormList" class="nav-link"
                >Mes formulaires reçus</router-link
              >
            </li>
            <li class="nav-item" v-if="isCaregiver">
              <router-link to="/patientsByCaregiver" class="nav-link"
                >Mes patients</router-link
              >
            </li>
          </div>
        </b-nav>
      </div>
      <div :class="currentUser ? 'col-10 flex-grow:1 h-100' : 'col-12'">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "col-12",
    };
  },
  computed: {
    currentUser() {
      if (this.$store.state.auth.user) return this.$store.state.auth.user;
      else return null;
    },
    isAdmin(){
      return this.$store.state.auth.user.role=="ADMINISTRATOR"
    },
    isCaregiver(){
       return this.$store.state.auth.user.role=="CAREGIVER"
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
