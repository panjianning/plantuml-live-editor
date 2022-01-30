export const parseGdbStackString = (stack_str: string): Array<Map<string,string>> => {
	const lines = stack_str.split(new RegExp(/#[0-9]+ /));
	const funcs = [];
	if (lines.length <= 1) {
	    return funcs;
    }
	let isFirst = true;
	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		if (line.trim() !== '' && isFirst) {
		    line = " in " + line;
		    isFirst = false;
        }
		const namePattern = new RegExp(/in[\s]+(?<name>[_a-zA-Z][_a-zA-Z0-9]*)/);
		const matchs = line.match(namePattern);
		if (matchs != null) {
			funcs.push({'name':matchs.groups.name});
		}
	 }
	return funcs
}

export const plantumlFromGdbStack = (stack_str: string) : string => {
    const funcs = parseGdbStackString(stack_str).reverse();
    let code = "\n@startuml"
    for (let i = 0; i < funcs.length; i++) {
        const func = funcs[i];
        if (i > 0) {
            code += '\n\t --> ' + func['name'];
        } else {
            code += '\n\t (*) --> ' + func['name'];
        }
    }
    code += "\n@enduml"
    return code;
}