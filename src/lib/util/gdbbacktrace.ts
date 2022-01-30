export const parseGdbBackTrace = (bt_str: string): Array<Map<string, string>> => {
    const funcs = [];
    const pat1 = new RegExp(/#[0-9]+[\s]+(?<name>[^=()]*)[\s]+\(/);
    const firstMatch = bt_str.match(pat1)
    if (firstMatch != null && firstMatch[0].search('in') == -1) {
        funcs.push({'name': firstMatch.groups.name})
    }
    const pat = new RegExp(/#[0-9]+[\s]+0x[0-9a-f]+[\s]+in[\s]+(?<name>[^=()]*)[\s]+\(/g);
    let matches;
    while ((matches = pat.exec(bt_str))) {
        funcs.push({'name': matches[1]});
    }
    return funcs
}

export const plantumlFromGdbBackTrace = (bt_str: string): string => {
    const funcs = parseGdbBackTrace(bt_str).reverse();
    let code = "@startuml"
    for (let i = 0; i < funcs.length; i++) {
        const func = funcs[i];
        if (i > 0) {
            code += '\n\t --> "' + func['name'] + '"';
        } else {
            code += '\n\t (*) --> "' + func['name'] + '"';
        }
    }
    code += "\n@enduml"
    return code;
}