<template>
  <b-container fluid>
    <button type="button" @click="sendForm" class="btn bg-info btn-success m-2">
      Validate
    </button>
    <b-row>
      <b-form>
        <b-form-group
          id="input-group-1"
          label=""
          class="border"
          label-for="content"
        >
          <div v-if="currentForm">
            <template v-for="block in currentForm.content">
              <div :key="block.uid" class="p-2">
                <component
                  :editionmode="editionmode"
                  :is="block.component"
                  :block="block"
                ></component>
              </div>
            </template>
          </div>
        </b-form-group>
      </b-form>
    </b-row>
  </b-container>
</template>
<script>
import FormDataService from "../services/FormDataService";
import AlertDataService from "../services/AlertDataService";
import { uuid } from "vue-uuid";
export default {
  data() {
    return {
      uuid: uuid.v1(),
      editionmode: false,
      currentForm: {
        content: [],
        alerts: [],
      },
    };
  },
  methods: {
    sendForm() {
      //Check alerts
      var alerts = this.currentForm.alerts;
      alerts.forEach((alert) => {
        if (alert.alertType == "higherThan") {
          var total = 0;

          var patate = this.currentForm.content.filter((block) =>
            alert.componentList.includes(block.uid)
          );

          patate.forEach((elem) => {
            total += Number(elem.value);
          });

          if (total > Number(alert.value)) {
            var newAlert = {
              label: "Alert on value for this form",
              ressource: "form",
              ressourceId: this.currentForm.id,
              date: Date.now(),
              state: "UNSEEN",
            };

            AlertDataService.create(this.$route.query.userId, newAlert);
          }
        }
      });
    },
    retrieveForm(userId, id) {
      FormDataService.viewFormFromUser(userId, id)
        .then((response) => {
          this.currentForm = response.data;
          if (!this.$route.query.id == "") this.modifyForm = true;
        })
        .catch();
    },
  },
  mounted() {
    //if (!this.$route.query.id == "") {
    this.retrieveForm(this.$route.query.userId, this.$route.query.id);
    //}
  },
};
</script>