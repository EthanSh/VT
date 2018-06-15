exports.ControlCardDict = {
    params: [
        {name: "Carrier Evacuation", start: 2, length: 1},
        {name: "Op. Stop", start: 3, length: 1},
        {name: "DSCS", start: 4, length: 1},
        {name: "Sub Roller", start: 5, length: 1},
        {name: "Yarn Address", start: 6, length: 2},
        {name: "Yarn In/Out", start: 8, length: 1},
        {name: "Final Stitch", start: 9, length: 3},
        {name: "Stitch/Loop Len", start: 12, length: 2},
        {name: "Racking", start: 14, length: 3}
    ]
}

exports.SegmentDict = {
    header_length: 512,
    default_segments: [
        {name: "0002af", reg: /0002af[0123456789abcdef]+0002c6/i, next_seg: "0002c6"},
        {name: "0002f5", reg: /0002f5[0123456789abcdef]+0002bd/i, next_seg: "0002bd"},
        {name: "0002bd", reg: /0002af[0123456789abcdef]+0002e2/i, next_seg: "0002e2"},
        {name: "0002e2", reg: /0002e2[0123456789abcdef]+0002c9/i, next_seg: "0002c9"},
        {name: "0002cc", reg: /0002cc[0123456789abcdef]+00020f/i, next_seg: "00020f"},
        {name: "00020f", reg: /00020f[0123456789abcdef]+ffff/i, next_seg: "f"}
    ]
}