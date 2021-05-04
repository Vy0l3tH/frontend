<template>
  <div class="HigherThan">
    <b-form >
      <label class="mr-sm-2" for="inline-form-custom-select-pref"
        >Higher than :</label>
      <b-form-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder=""
        v-model="cont.value"
        type="number"
      ></b-form-input>
    </b-form>
  </div>
</template>
<script>
export default {
  props: {
    cont: Object,
  },
  name: "higherThan",
};
</script>