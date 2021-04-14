<template>
  <div id="app container">
    <div class="row py-5 bg-info" >
      <div class="col-2">
       
        <span>HOMELINK</span>
       
      </div>
      <div class="col-9" >
     <span>HEADER avec plein de trucs</span>
      </div>
      <div class="col-1">
        <span>Options</span>
      </div>
    </div>
    <div class="row">
      <div class="col-2  bg-info" >
        <b-nav vertical class="navbar navbar-dark bg-info">
          <div class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/patients" class="nav-link"
                >Patients</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/formulaires" class="nav-link"
                >Formulaires</router-link
              >
            </li>
          </div>
        </b-nav>
      </div>
      <div class="container col-10" >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
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
