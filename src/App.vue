<template>
  <div id="app container">
    <div class="row py-3 bg-info">
      <div class="col-2">
        <span class= "navbar-brand">HOMELINK </span>
      </div>
      <div  v-if="currentUser" class="col-9">
       <span class= "navbar-brand">{{currentUser.role}} MODE</span>
      </div>
      <div v-if="currentUser" class="navbar-nav ml-auto col-1">
      
        <li class="nav-item">
          <a class="nav-link bg-info" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt"/>LogOut
          </a>
        </li>
      </div>
    </div>
    <div class="row">
      <div class="col-1 bg-info" v-if="currentUser">
        <b-nav vertical class="navbar navbar-dark bg-info">
          <div class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/patients" class="nav-link"
                >Patients</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/soignants" class="nav-link"
                >Soignants</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/admins" class="nav-link"
                >Administrateurs</router-link
              >
            </li>          
            
            <li class="nav-item">
              <router-link to="/formulaires" class="nav-link"
                >Formulaires</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/addForm" class="nav-link">Add form</router-link>
            </li>            
          </div>
        </b-nav>
      </div>
      <div :class="currentUser ? 'col-10' : 'col-12' " >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
 data() {
   return {
  active:"col-12"
 }}
  ,
  computed: {
    currentUser() {
      if (this.$store.state.auth.user)
        return this.$store.state.auth.user;
        else return null;
    },
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
