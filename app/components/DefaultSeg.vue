<template>
    <div>
        <div v-for="(value, key) in default_seg">
            <Card class="lower">
                <div slot="header" class="clearfix">
                    <span>{{key}} Segment</span>
                </div>
                <div v-html="value"></div>
            </Card>
        </div>
    </div>
</template>

<script>
    import {  Card } from 'element-ui';

    export default {
        name: "DefaultSeg",
        props:["default_seg"],
        components:{
          Card
        },
        created(){
        }
    }
</script>

<style scoped>

</style>