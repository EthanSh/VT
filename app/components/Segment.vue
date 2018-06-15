<template>
    <div id="segment">
        <Card class="lower">
            <div slot="header" class="clearfix">
                <span>Header</span>
            </div>
            <HeaderSeg :header="header"></HeaderSeg>
        </Card>
        <Card class="lower">
            <div slot="header" class="clearfix">
                <span>Control Card</span>
            </div>
            <ControlCardSeg :control_card="control_card"></ControlCardSeg>
        </Card>
        <Card class="lower">
            <div slot="header" class="clearfix">
                <span>Pattern Memory</span>
            </div>
            <PatternSeg :pattern_memory="pattern_memory"></PatternSeg>
        </Card>
        <Card class="lower">
            <div slot="header" class="clearfix">
                <span>Default Segment</span>
            </div>
            <DefaultSeg :default_seg="default_seg"></DefaultSeg>
        </Card>
    </div>
</template>

<script>
    import {SegmentDict, ControlCardDict} from '../utils/Dict'
    import PatternSeg from './PatternSeg'
    import ControlCardSeg from './ControlCardSeg'
    import HeaderSeg from './HeaderSeg'
    import DefaultSeg from './DefaultSeg'
    import config from '../utils/Config'
    import {  Card } from 'element-ui';

    export default {
        name: "Segment",
        components:{
            PatternSeg,
            ControlCardSeg,
            HeaderSeg,
            DefaultSeg,
            Card
        },
        created(){
            this.parseTripleZero()
        },
        watch:{
            text(val){
                // console.log(val);
                // this.text = val
                // this.parseTripleZero()
                this.parseTripleZero()
            }
        },
        props:["text"],
        data(){
            return{
                header:{},
                pattern_memory:{},
                control_card:{},
                default_seg:{}
            }
        },

        methods:{
            headerParse(){
                let SEGMENT_CODE = config.header.SEGMENT_CODE;
                let NEXT_SEGMENT_CODE = config.header.NEXT_SEGMENT_CODE;
                let reg = config.header.reg;

                let str = this.text.substring(0, this.text.lastIndexOf(NEXT_SEGMENT_CODE));

                let params = this.text.split("0d");

                let file_name_ascii = params[1].substring(4, params[1].lastIndexOf("09"));
                let file_name_str = "";
                for (let k = 0; k < file_name_ascii.length; k += 2) {
                    file_name_str += String.fromCharCode(parseInt(file_name_ascii.substring(k, k+2), 16));
                }
                this.header.filename = file_name_str;

                for (let i = 2; i < 7; ++i) {
                    let param_name = String.fromCharCode(parseInt(params[i].substring(0, 2), 16));
                    let param_val = String.fromCharCode(parseInt(params[i].substring(params[i].indexOf("3d")+2, params[i].lastIndexOf("09")), 16));

                    this.header[param_name] = param_val;
                }

                let data = "";
                for (let i = 0; i < str.length; i += 2) {
                    let char = str.substring(i, i+2);
                    data = data + char + " ";
                    if (char == "0d"){
                        data = data + "<br/>";
                    }
                }
                this.header.data = data;
            },
            controlCardParse(){
                let SEGMENT_CODE = config.controlcard.SEGMENT_CODE;
                let NEXT_SEGMENT_CODE = config.controlcard.NEXT_SEGMENT_CODE;
                let HEADER_LENGTH = config.controlcard.HEADER_LENGTH;
                let str = this.text;
                let reg = config.controlcard.reg;
                let split_segments = () => {
                    let starting = "0002";
                    let ending = "8303030100";
                    // let segs = this.str.match(this.reg)[0].split(ending);
                    let seg = str.match(reg)[0].split("0002c60303c0");
                    seg.shift();
                    for (let i = 0; i < seg.length; ++i) {
                        // segs[i] = segs[i].substring(segs[i].indexOf(starting))
                        seg[i] = SEGMENT_CODE + seg[i];
                    }
                    let last_seg = seg[seg.length-1];
                    seg[seg.length-1] = last_seg.substring(0, last_seg.lastIndexOf(NEXT_SEGMENT_CODE));
                    return seg;
                }

                let parse_seg_header =(str)=> {
                    let res = "";
                    let card_id = "";
                    for (let k = 0; k < str.length; ++k) {
                        if (k == 12 || k == 13) {
                            card_id += str[k];
                        }

                        if (k != 0 && k % 4 == 0) {
                            res += " ";
                        }
                        res += str[k];
                    }
                    res += "<br/><br/>";
                    if (card_id == "00") {
                        card_id = "Main";
                    } else {
                        card_id = "Sub" + card_id;
                    }
                    this.control_card[card_id] = {"header": res, "body": "", "tail": "", "blocks": ""};

                    return card_id;
                }

                let extract_card_info = (str)=> {
                    let card_info = {};
                    for (let i = 0; i < ControlCardDict.params.length; ++i) {
                        // for (let param in this.dic.params) {
                        let param = ControlCardDict.params[i];
                        card_info[param.name] = str.substring(param.start, param.start + param.length);
                    }

                    return card_info;
                }

                let parse_seg_body = (str, id)=> {
                    const line_length = 44;
                    const block_length = 88;

                    let res = "";
                    let blockOrigin = []

                    for (let k = 0; k < str.length; ++k) {
                        if (k != 0 && k % 2 == 0) {
                            res += " ";
                        }

                        if (k != 0 && k % line_length == 0) {
                            res += "<br/>";
                        }

                        res += str[k];

                        if (k !=0 && (k+1) % block_length == 0) {
                            blockOrigin.push(res)
                            res = ""
                        }
                    }

                    this.control_card[id].body = blockOrigin;

                    let seg_info = new Array();
                    for (let l = 0; l < str.length / block_length; ++l) {
                        let card_info = extract_card_info(str.substring(l * line_length, l * line_length + block_length - 1));
                        seg_info.push(card_info);
                    }

                    this.control_card[id].blocks = seg_info;

                }

                let parse_seg_tail = (str, id) => {
                    const line_length = 64;

                    let res = "<br/>";
                    res = res + str[0] + str[1] + '<br/>';

                    str = str.substring(2);

                    for (let k = 0; k < str.length; ++k) {
                        if (k != 0 && k % 4 == 0) {
                            res += " ";
                        }
                        if (k != 0 && k % line_length == 0) {
                            res += "<br/>";
                        }
                        res += str[k];
                    }

                    this.control_card[id].tail = res;
                }

                let segs = split_segments();
                for (let i = 0; i < segs.length; ++i) {
                    let card_id = parse_seg_header(segs[i].substring(0, HEADER_LENGTH));
                    parse_seg_body(segs[i].substring(HEADER_LENGTH, segs[i].lastIndexOf("8303030100")), card_id);
                    parse_seg_tail(segs[i].substring(segs[i].indexOf("8303030100")), card_id);
                }
            },
            patternParse(){
                let SEGMENT_CODE = config.pattern.SEGMENT_CODE;
                let NEXT_SEGMENT_CODE = config.pattern.NEXT_SEGMENT_CODE;
                let HEADER_LENGTH = config.pattern.HEADER_LENGTH;
                let reg = config.pattern.reg;
                let str = this.text;

                let parse_header = (str) => {
                    let res = "";

                    for (let k = 0; k < str.length; ++k) {
                        if (k != 0 && k % 2 == 0) {
                            res += " ";
                        }
                        res += str[k];
                    }

                    this.pattern_memory.header = res + "<br/>";
                }

                let parse_body = (str) => {
                    const line_length = 64;

                    let blocks = str.split("0303");
                    blocks.shift();
                    let res = "";

                    for (let i = 0; i < blocks.length; ++i) {
                        res = res + "0303" + "<br/>";
                        for (let k = 0; k < blocks[i].length; ++k) {
                            if (k != 0 && k % 2 == 0) {
                                res += " ";
                            }
                            if (k != 0 && k % line_length == 0) {
                                res += "<br/>";
                            }
                            res += blocks[i][k];
                        }
                        res += "<br/>";
                    }

                    this.pattern_memory.body = res;
                }

                let parse_extra = (str) => {
                    const line_length = 36;

                    let res = "";

                    res = res + str.substring(0, 4) + "<br/>" + str.substring(4, 6) + "<br/>";
                    str = str.slice(6);

                    for (let k = 0; k < str.length; ++k) {
                        if (k != 0 && k % 2 == 0) {
                            res += " ";
                        }
                        if (k != 0 && k % line_length == 0) {
                            res += "<br/>";
                        }
                        res += str[k];
                    }

                    this.pattern_memory.extra = res;
                }

                let parse_tail = (str) => {
                    const line_length = 64;

                    let res = "";

                    for (let k = 0; k < str.length; ++k) {
                        if (k != 0 && k % 4 == 0) {
                            res += " ";
                        }
                        if (k != 0 && k % line_length == 0) {
                            res += "<br/>";
                        }
                        res += str[k];
                    }

                    this.pattern_memory.tail = res;
                }

                let seg = str.match(reg)[0];
                seg = seg.substring(0, seg.lastIndexOf(NEXT_SEGMENT_CODE));
                parse_header(seg.substring(0, HEADER_LENGTH));
                parse_body(seg.substring(HEADER_LENGTH, seg.lastIndexOf("030305")));
                parse_extra(seg.substring(seg.lastIndexOf("030305"), seg.lastIndexOf("03030100")));
                parse_tail(seg.substring(seg.lastIndexOf("03030100")));
            },
            defaultParse(){
                const line_length = 64;
                let str = this.text;
                for (let i = 0; i < SegmentDict.default_segments.length; ++i) {
                    let seg = SegmentDict.default_segments[i];
                    let name = seg.name;
                    let seg_str = str.match(seg.reg)[0];
                    seg_str = seg_str.slice(0, seg_str.lastIndexOf(seg.next_seg));
                    let res = "";

                    for (let k = 0; k < seg_str.length; ++k) {
                        if (k != 0 && k % 4 == 0) {
                            res += " ";
                        }
                        if (k != 0 && k % line_length == 0) {
                            res += "<br/>";
                        }
                        res += seg_str[k];
                    }
                    this.default_seg[name] = res;
                }
            },
            parseTripleZero(){
                this.defaultParse();
                this.headerParse();
                this.controlCardParse();
                this.patternParse();
            }
        }
    }
</script>

<style scoped>
    #segment{
        line-height: 21px;
        font-size: 13px;
    }
    .lower{
        transition: background-color .25s ease;
        background: #fff;
    }
    .lower:hover{
        background: #fafafb;
    }
</style>