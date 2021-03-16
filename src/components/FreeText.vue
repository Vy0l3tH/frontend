<template>
  <div class="FreeText">
    <h1>{{block.headline}}</h1>
    <input/>
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