<template>
    <div id="controlseg">
        <div v-for="(value, key) in control_card">
            <Card class="lower">
                <div slot="header" class="clearfix">
                    <span>{{key}}</span>
                </div>
                <div  v-html="value.header">
                </div>
                <div v-for="(block,index) in value.body">
                    <Tooltip class="item" effect="dark" content="Click to See the Parameters" placement="top-start">
                        <div v-html="block" class="block" v-on:click="showPanel(key, index)"></div>
                    </Tooltip>
                </div>
                <div v-html="value.tail">
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import {  Card, Tooltip, Button } from 'element-ui';
    import bus from '../utils/EventBus'
    export default {
        name: "ControlCardSeg",
        props:["control_card"],
        methods:{
            showPanel(key, index){
                bus.$emit('UpdateView', {data:this.control_card[key].blocks[index], card: key, block: index})
            }
        },
        components:{
            Card,
            Tooltip,
            Button
        }
    }
</script>

<style scoped>
.block{
    cursor: pointer;
}

</style>