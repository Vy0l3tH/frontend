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
     <b-form v-if="editionmode">
      <label class="mr-sm-2" for="inline-form-custom-select-pref"
        >Number of star</label
      >
      <b-form-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder=""
        v-model="block.maxValue"
      ></b-form-input>
    </b-form>
    <b-form-group v-if="!editionmode">
      <label class="mr-sm-2" for="inline-form-custom-select-pref"
        >{{ block.headline }} </label>
      <b-form-rating v-model="block.value" :stars="block.maxValue"></b-form-rating>
    </b-form-group>
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