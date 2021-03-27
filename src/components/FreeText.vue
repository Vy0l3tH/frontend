<template>
  <div class="FreeText">
    <h1>{{block.headline}}</h1>
    <input v-model="block.value"/>
  </div>
</template>
 
<script>
export default {
  props: {
    block: Object
  },
  name: "freeText"
};
</script>