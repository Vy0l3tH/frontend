<template>
  <div>
    <b-form-group v-if="editionmode">
      <label for="labelInput">Label</label>
      <b-form-input
        id="labelInput"
        placeholder=""
        v-model="block.headline"
      ></b-form-input>
    </b-form-group>
    <b-form inline v-if="editionmode" class="mb-2">
      <label class="mr-sm-2" for="inline-form-custom-select-pref"
        >Returned value :
      </label>
      <b-form-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder=""
        v-model="currentValue"
      ></b-form-input>
      <label class="mr-sm-2" for="inline-form-custom-select-pref"
        >Displayed text :
      </label>
      <b-form-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder=""
        v-model="currentTitle"
      ></b-form-input>
      <button type="button" @click="addOption" class="bg-info btn btn-success">
        Add option
      </button>
    </b-form>
    <b-table striped hover :items="block.options" v-if="editionmode"></b-table>
    <b-form-group v-if="!editionmode">
      <label class="mr-sm-2">{{ block.headline }}</label>
      <b-form-select v-model="selectedOption">
        <b-select-option
          v-for="valueOption in block.options"
          v-bind:key="valueOption.value"
          v-bind:value="valueOption.value"
        >
          {{ valueOption.title }}
        </b-select-option>
      </b-form-select>
    </b-form-group>
  </div>
</template>
 
<script>
export default {
  props: {
    block: Object,
    editionmode: Boolean,
  },
  name: "comboBox",
  data() {
    return {
      selectedOption: "",
      currentValue: "",
      currentTitle: "",
      valueOptions: [{ value: "1" }, { value: "2" }],
    };
  },
  methods: {
    addOption() {
      console.log(this.block.options.some((e) => e.title == this.currentValue));
      if (!this.block.options.some((e) => e.value == this.currentValue)) {
        this.block.options.push({
          value: this.currentValue,
          title: this.currentTitle,
        });
        this.currentValue = "";
        this.currentTitle = "";
      }
    },
  },
};
</script>