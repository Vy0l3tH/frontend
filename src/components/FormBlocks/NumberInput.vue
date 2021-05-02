<template>
  <div class="NumberInput">
    <b-form v-if="editionmode">
      <label class="mr-sm-2" for="inline-form-custom-select-pref"
        >Label</label
      >
      <b-form-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder=""
        v-model="block.headline"
      ></b-form-input>
    </b-form>
    <b-form v-if="!editionmode">
      <label class="mr-sm-2" for="inline-form-custom-select-pref"
        >{{ block.headline }} </label>
      <b-form-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder=""
        v-model="block.value"
        type="number"
      ></b-form-input>
    </b-form>
  </div>
</template>
<script>
export default {
  props: {
    block: Object,
    editionmode: Boolean,
  },
  name: "numberInput",
};
</script>