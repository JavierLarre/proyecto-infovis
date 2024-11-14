export class SocialMedia {
    constructor(name, audio_path, icon_path, use_data_path, traceIndex) {
        this.plot_div = 'myDiv';
        this.image_div = 'svgContainer';
        this.users_mill_path = "scripts/users_mill.json";

        this.name = name;
        this.icon_path = icon_path;
        this.audio_path = audio_path
        this.use_data_path = use_data_path;
        this.traceIndex = traceIndex;

        this.image_element = null;
        this.audio = null;
        this.looper = null;
        this.data = null;
        this.users_mill = null;
        this.trace = null;
        
    }
    async initialize() {
        const data = await this.loadData(this.use_data_path);
        this.data = data;
        this.users_mill = await this.loadData(this.users_mill_path);
        this.cleanData();
        this.createTrace();
        await this.createAudioPlayer();
    }
    playSound(time) {
        this.audio.start(time);
    }
    stopSound() {
        if (this.audio && this.audio.state === "started") {
            this.audio.stop();
        }
    }
    placeImage(layout, x, y) {
        layout.images = layout.images || [];
        const hoverImage = {
            source: this.icon_path,
            x: x,
            y: y,
            sizex: 0.1,
            sizey: 0.1,
            xanchor: "center",
            yanchor: "middle",
            xref: "paper",
            yref: "paper"
        };
        // Actualizamos layout.images sin eliminar otras imágenes
        // por qué ??????
        layout.images = [hoverImage];
        Plotly.relayout(this.plot_div, { images: layout.images });
    }
    placeImageDiv() {
        this.image_element = document.createElement('img');
        this.image_element.src = this.icon_path;
        this.image_element.className = 'image-on-hover';
        document.getElementById(this.image_div).appendChild(this.image_element);
    }
    removeImage() {
        document.getElementById(this.image_div).removeChild(this.image_element);
    }
    async createAudioPlayer() {
        this.audio = await new Tone.Player(this.audio_path).toDestination();
        this.audio.autostart = false;
        this.audio.loop = false;
        this.looper = new Tone.Loop((time) => this.playSound(time), 1);
    }
    startLooper(year) {
        this.looper.interval = this.data[year] / this.users_mill[year];
        Tone.Transport.start();
        this.looper.start(0);
    }
    stopLooper() {
        this.looper.stop(0);
        Tone.Transport.stop();
    }
    async loadData(path) {
        const response = await fetch(path);
        const data = await response.json();
        return data;
    }
    cleanData() {
        Object.keys(this.data).forEach(key => {
            this.data[key] = (
                (parseFloat(this.data[key]) * 100)
                / parseFloat(this.users_mill[key])
            );
        });
    }
    createTrace() {
        this.trace = {
            x: Object.keys(this.data),
            y: Object.values(this.data),
            mode: 'lines',
            name: `Usuarios de <br> <b>${this.name}<b>`,
            line: { color: 'gray', width: 2 },
            hoverinfo: 'none',
            hovertemplate: `Año: %{x}<br>Usuarios: %{y:.2f} <extra></extra>`
        }
    }
    changeColor(color) {
        this.trace.line.color = color;
        Plotly.restyle(this.plot_div, { 'line.color': color }, [this.traceIndex]);
    }
    onHover(layout, x, y) {
        this.trace.line.width = 4;
        this.changeColor('blue');
        this.placeImage(layout, 1.15, this.data[2023] / 100);
        this.startLooper(x);
    }
    unHover() {
        this.trace.line.width = 2;
        this.changeColor('gray');
        this.stopLooper();
    }
}