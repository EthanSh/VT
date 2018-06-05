// Handler of the uploaded .000 file
// Version: 0.1
// Author:  Peng
// Date:    Apr 25 2018

// class definition
class Parser {
	constructor() {

	}

	validation() {

	}

	parse() {

	}
}

class HeaderParser extends Parser {

}

class ControlCardParser {
	constructor(str) {
		this.str = str;
		this.reg = /0002c60303c0[0123456789abcdef]+8303030100/ig;
		this.dic = new ControlCardDictionary();
	}

	split_segments() {
		var starting = "0002";
		var ending = "8303030100";
		var segs = this.str.match(this.reg)[0].split(ending);
		segs.pop();
		for (var i = 0; i < segs.length; ++i) {
			segs[i] = segs[i].substring(segs[i].indexOf(starting))
		}
		return segs;
	}

	parse_seg_header(str) {
		var res = "";
		for (var k = 0; k < str.length; ++k) {
			if (k != 0 && k % 4 == 0) {
				res += " ";
			}
			res += str[k];
		}
		return res;
	}

	parse_blocks(str) {
		const line_length = 44;
		
		var res = "";
		for (var k = 0; k < str.length; ++k) {
			if (k != 0 && k % 2 == 0) {
				res += " ";
			}
			if (k != 0 && k % line_length == 0) {
				res += "\n";
			}
			res += str[k];
		}	
		return res;	
	}

	extract_card_info(str) {
		var res = "";
		for (var i = 0; i < this.dic.param_num; ++i) {
			res += this.dic.params[i] + ": " 
				+ str.substring(this.dic.start[i], this.dic.start[i] + this.dic.len[i]) + "\n";
		}
		return res;
	}

	parse() {
		const header_length = 44;

		var segs = this.split_segments();
		console.log(segs.length);
		console.log(segs);

		var res = "";

		for (var i = 0; i < segs.length; ++i) {
			res = res + this.parse_seg_header(segs[i].substring(0, header_length)) 
					  + "\n\n" 
					  + this.parse_blocks(segs[i].substring(header_length))
			   	 	  + "\n\n"
					  + this.extract_card_info(segs[i]) 
					  + "\n\n\n";
		}

		return res;
	}
}

class PatternMomeryParser extends Parser {

}

class DefaultParser extends Parser {

}

// function defintion
function binary2String(data) {
	function byteToHex(b) { //fixed-width byte value
		return "0123456789abcdef"[Math.floor(b/16)] + "0123456789abcdef"[b%16];
	}

	var bytes = new Uint8Array(data);
	var text = "";
	var i = 0;
	while (i < bytes.length) {
			text += byteToHex(bytes[i]);
			++i;
	}

	// console.log(text);
	return text;
}

function parseTripleZero(data) {
	str = binary2String(data);

	var ccp = new ControlCardParser(str);
	res = ccp.parse();

	return res
}






