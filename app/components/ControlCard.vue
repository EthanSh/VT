<template>
    <div>
        <Card>
            <div slot="header" class="clearfix">
                <div>Control Card Information</div>
                <div>Card:{{controlPanel.card}}</div>
                <div>Block:{{controlPanel.block}}</div>
            </div>
            <div v-for="(value, key) in controlPanel.data" class="row">
                <div class="info"><span class="key">{{key}}</span> <span class="value">{{value}}</span></div>
            </div>
        </Card>
    </div>
</template>

<script>
    import bus from '../utils/EventBus'
    import {  Card } from 'element-ui';
    export default {
        name: "ControlCard",
        data(){
          return {
              controlPanel:{}
          }
        },
        mounted(){
            bus.$on('UpdateView', msg=>{
                this.controlPanel = msg
            })
        },
        components:{
            Card
        }
    }
</script>

<style scoped lang="scss">
    div{
        font-size: 13px;
        line-height: 21px;
    }
    .info{
        display: flex;
        span{
            flex: 1;
            display: inline-block;
            padding: 0 5px;
            &.key{
                border-right: 1px solid #ebeef5;
            }
            &.value{
                padding-left: 10px;
            }
        }
    }
.row{
    border-bottom: 1px solid #ebeef5;
    padding: 6px 0;
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    position: relative;
}
.el-card__body{
    padding: 0;
}
</style>