<template>
  <div class="submit-form">
    <div v-if="!submitted">
       <div class="form-group">
        <label for="title">Identifiant</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="formulaire.Identifiant"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="title">Contenu JSON</label>
        <textarea
          type="text"
          class="form-control"
          id="title"
          required
          v-model="formulaire.formulaire"
          name="title"
          rows=15

        />
      </div>

      <button @click="saveFormulaire" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newFormulaire">Add</button>
    </div>
  </div>
</template>

<script>
import FormulaireDataService from "../services/FormulaireDataService";

export default {
  name: "add-formulaire",
  data() {
    return {
      formulaire: {
        _id: null,
        identifiant: "",
        formulaire: ""
      },
      submitted: false
    };
  },
  methods: {
    saveFormulaire() {
      var data = {
        formulaire: this.formulaire.formulaire
      };

      FormulaireDataService.create(data)
        .then(response => {
          this.formulaire._id = response.data._id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newFormulaire() {
      this.submitted = false;
      this.formulaire = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>