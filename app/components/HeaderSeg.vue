<template>
    <div>
        <div v-on:click="showPanel" v-html="header.data">
        </div>
    </div>
</template>


<script>
    export default {
        name: "HeaderSeg",
        props:["header"],
        methods:{
            showPanel(){

            }
        },
        components:{
        }
    }
</script>

<style scoped>

</style>