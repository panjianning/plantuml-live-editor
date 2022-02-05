import {encode} from "plantuml-encoder"

export const getPlantUMLUrl = (code: string): Map<string, string> =>
{
    // deflate are defined in app.html https://www.panjianning.com/mystatic/js/rawdeflate.js
    const pumlCode = encode(code);
    const pngUrl = `https://www.plantuml.com/plantuml/png/${pumlCode}`;
    const svgUrl = `https://www.plantuml.com/plantuml/svg/${pumlCode}`;
    return new Map([["png", pngUrl], ["svg", svgUrl]])
}


