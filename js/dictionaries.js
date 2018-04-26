class ControlCardDictionary {
	constructor() {
		this.params = ["Main/Sub Code", "Carrier Evacuation", "Op. Stop", "DSCS", "Sub Roller", 
				"Yarn Address", "Yarn In/Out", "Final Stitch", "Stitich/Loop Len", "Racking",
				"Pat_dev (F)", "IGN. Block", "Sub/Main", "Jump Economy", "ABS. Jump", "Fabric Presser B",
				"Sinker Reset", "Pat_dev (B)", "Final Stitich Course", "Op. Stop", "Racking Adjust",
				"Final Stitich Crs. Unit", "Elastic Yarn Pause", "Y. Hold Hook Cmd", "Cleaner", "Carriage Air",
				"Y. Hold Carrier Num", "Yarn insert hook", "Carrier Preparation", "Pat. Address (F)", 
				"Pat. Address (B)"];
		
		this.start = [12, 46, 47, 48, 49, 50, 52, 53, 56, 58, 59, 60, 61, 62, 64, 66, 69, 70, 71, 72, 74, 76, 81, 83, 
				90, 91, 93, 94, 108, 116, 120, 126];
		
		this.len = [2, 1, 1, 1, 1, 2, 1, 3, 2, 3, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1,
				1, 1, 1, 1, 2, 4, 2, 2];

		this.param_num = this.params.length;
	}
}