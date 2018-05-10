<template>
    <div id="app">
        <Header height="45px">
            <img v-bind:src="imgUrl" alt="logo" id="logo">
            Visualization Tool For .000 Files
        </Header>
        <Card>
            <div slot="header" class="clearfix">
                <span>Upload File</span>
            </div>
            <Container class="fileUploadContainer">
                <Upload
                        class="upload"
                        drag
                        action=""
                        show-file-list
                        :auto-upload="false"
                        :on-change="handleSuccess"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Drag your file here, or <em>Click to Upload</em></div>
                    <div class="el-upload__tip" slot="tip">Only the .000 file will be accepted</div>
                </Upload>
            </Container>
        </Card>
        <Card class="lower" >
            <div slot="header" class="clearfix">
                <span>File Information</span>
            </div>
            <Container v-if="isShow">
                <Main>
                    <Segment :text="text"></Segment>
                </Main>
                <Aside >
                    <ControlCard :cardInfo="cardInfo" :class="navBarFixed == true ? 'navBarWrap' :''"></ControlCard>
                </Aside>
            </Container>
        </Card>

        <Footer height="45px">© 2018 CMU Knitout</Footer>
    </div>
</template>

<script>
    import { Button, Container, Header, Aside, Main, Footer, Card, Upload } from 'element-ui';
    import logo from './assets/logo.PNG'
    import Segment from './components/Segment'
    import ControlCard from './components/ControlCard'

    export default {
        name: "app",
        data(){
            return {
                imgUrl:logo,
                text:"",
                isShow: false,
                cardInfo: {},
                navBarFixed: false
            }
        },
        components: {
            Header,
            Aside,
            Main,
            Container,
            Button,
            Footer,
            Card,
            Upload,
            Segment,
            ControlCard
        },
        mounted(){
            document.addEventListener('scroll', this.watchScroll, true)
            document.querySelector('.el-upload__input').addEventListener('change', this.handle)
        },
        destroyed(){
            window.removeEventListener('scroll', this.watchScroll)
        },
        methods:{
            watchScroll(event){
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                if (scrollTop > 350) {
                    this.navBarFixed = true
                } else {
                    this.navBarFixed = false
                }
            },
            handleSuccess(file, event){
                let fileReader = new FileReader()
                console.log(event)
                fileReader.readAsArrayBuffer(file.raw)
                fileReader.onload = ()=> {
                    if(fileReader.result){
                        this.text = this.binary2String(fileReader.result)
                        this.isShow = true
                        // self = this
                        // bus.$emit('UpdateParse', self.text)
                    }
                }
            },
            binary2String(data){
                function byteToHex(b) { //fixed-width byte value
                    return "0123456789abcdef"[Math.floor(b/16)] + "0123456789abcdef"[b%16];
                }

                let bytes = new Uint8Array(data);
                let text = "";
                let i = 0;
                while (i < bytes.length) {
                    text += byteToHex(bytes[i]);
                    ++i;
                }
                return text;
            }
        }
    }
</script>

<style lang="scss">
    body {
        font-family: Consolas, Monaco, monospace;
    }
</style>

<style scoped lang="scss">
    .el-header{
        background: #fafafb;
        text-align: center;
        line-height: 40px;
        border-top: 2px solid #409EFF;
        color: #5e6d82;
        box-sizing: border-box;
        padding-top: 2px;
        #logo{
            height: 90%;
            float: left;
            overflow: hidden;
        }
    }
    .el-main{
        padding: 0;
    }
    .el-footer{
        line-height: 45px;
        text-align: center;
        font-size: 12px;
    }

    .lower{
        margin-top: 10px;
    }
    .fileUploadContainer{
        align-items:center;
        justify-content:center;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
    .navBarWrap {
        position:fixed;
        top:0;
        right: 20px;
        z-index:999;
        width: 28%;
    }
</style>
