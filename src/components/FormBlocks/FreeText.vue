<template>
  <div class="FreeText">

    <span v-if="!editionmode" >{{block.headline}}</span>
    <input v-if="editionmode" v-model="block.headline"/>
    <input v-if="!editionmode" v-model="block.value"/>

  </div>
</template>
 
<script>
export default {
  props: {
    block: Object,
    editionmode : Boolean
  },
  name: "freeText"
};
</script>