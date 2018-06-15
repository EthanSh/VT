<template>
    <div>
        <div v-html="pattern_memory.header"></div>
        <div v-html="pattern_memory.body"></div>
        <div v-html="pattern_memory.extra"></div>
        <div v-html="pattern_memory.tail"></div>
    </div>
</template>

<script>
    export default {
        name: "PatternSeg",
        props:["pattern_memory"],
        created(){
            console.log(this.pattern_memory)
        }
    }
</script>

<style scoped>

</style>