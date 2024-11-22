const DIV = 'svgContainer';

class SVGHandler {
    constructor(div_id, file_path) {
        this.div = div_id;
        this.file_path = file_path;
        this.svg = null;
    }
    async loadSVG() {
        fetch(`assets/svg/${this.file_path}`)
            .then(response => response.text())
            .then(svgContent => {
                const parser = new DOMParser();
                const svgDocument = parser.parseFromString(svgContent, 'image/svg+xml');
                const svgElement = svgDocument.documentElement;
                this.svg = svgElement;
                this.setSVGAtrributes();
                document.getElementById(this.div).appendChild(svgElement);
            })
            .catch(error => console.error('Error loading SVG:', error));
    }
    setSVGAtrributes() {
        this.svg.classList.add('scaled-svg');
        this.addText();
    }
    addText() {
        const text = document.createElementNS(
            'http://www.w3.org/2000/svg', 'text'
        );
        text.setAttribute('x', 50);
        text.setAttribute('y', 120);
        text.setAttribute('fontfamily', 'Arial');
        text.setAttribute('font-size', '8.5');
        text.setAttribute('fill', 'black');

        const lines = [
            'La cantidad de usuarios activos',
            'disminuye a pesar de la disponibilidad',
            'de mejores velocidades de internet.',
            'Sin embargo, las conexiones móviles',
            'se han mantenido estables y constantes.'
        ];
    
        lines.forEach((line, index) => {
            const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.setAttribute('x', 48);
            tspan.setAttribute('dy', index === 0 ? '0' : '1.6em');
            tspan.textContent = line;
            text.appendChild(tspan);
        });

        this.svg.appendChild(text);
    }
}

export async function loadSVG() {
    const svgHandler = new SVGHandler(
        DIV, 'cuadro_texto_oscuro.svg'
    );
    await svgHandler.loadSVG();
}