<template>
    <FormBuilder v-model="configuration"></FormBuilder>
</template>

<script>
    import {FormBuilder} from 'v-form-builder';
    
    export default {
        name: "MyAdminProMaxComponent",
        components: {FormBuilder},
        data: () => ({
            configuration: {}
        }),
    }
</script>