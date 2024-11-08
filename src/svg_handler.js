export class SVGHandler {
    constructor(div_id, file_path) {
        this.div = div_id;
        this.file_path = file_path;
        this.svg = null;
    }
    loadSVG() {
        fetch(this.file_path)
            .then(response => response.text())
            .then(svgContent => {
                const parser = new DOMParser();
                const svgDocument = parser.parseFromString(svgContent, 'image/svg+xml');
                const svgElement = svgDocument.documentElement;
                document.getElementById(this.div).appendChild(svgElement);
            })
            .catch(error => console.error('Error loading SVG:', error));
    }
}
