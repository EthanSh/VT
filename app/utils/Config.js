module.exports = {
    header:{
        SEGMENT_CODE : "5354415254",
        NEXT_SEGMENT_CODE : "0002af14",
        reg: /5354415254[0123456789abcdef]+0002af14/i
    },
    default:{

    },
    pattern:{
        SEGMENT_CODE : "0002c9",
        NEXT_SEGMENT_CODE : "0002cc",
        HEADER_LENGTH : 18,
        reg : /0002c9[0123456789abcdef]+0002cc/i
    },
    controlcard:{
        SEGMENT_CODE: "0002c60303c0",
        NEXT_SEGMENT_CODE: "0002f50303",
        HEADER_LENGTH: 44,
        reg : /0002c60303c0[0123456789abcdef]+0002f50303/i
    }
}