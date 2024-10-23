<template>
    <div v-show="errorMsg !== ''" class="error-msg">
        <IconError />
        {{errorMsg}}
    </div>
</template>

<script>
export default {
    name: 'FrontendMlErrorMsg',
    props:{
        errorMsg:{
            type: String
        }
    },
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>