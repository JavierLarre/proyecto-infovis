export class SocialMedia {
    constructor(name, audio_path, icon_path, use_data_path) {
        this.div = 'myDiv';
        this.users_mill_path = "scripts/users_mill.json";

        this.name = name;
        this.icon_path = icon_path;
        this.audio_path = audio_path
        this.use_data_path = use_data_path;
        
        this.createAudioPlayer();
    }
    async initialize() {
        const data = await this.loadData(this.use_data_path);
        this.data = data;
        this.users_mill = await this.loadData(this.users_mill_path);
        this.cleanData();
        this.createTrace();
    }
    playSound() {
        if (Tone.context.state !== 'running') {
            Tone.context.resume().then(() => {
                this.audio.start();
            });
        }
        else {
            this.audio.start();
        }
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
            sizex: 10,
            sizey: 10,
            xanchor: "center",
            yanchor: "middle",
            xref: "x",
            yref: "y"
        };
        // Actualizamos layout.images sin eliminar otras imágenes
        // por qué ??????
        layout.images = [hoverImage];
        Plotly.relayout(this.div, { images: layout.images });
    }
    createAudioPlayer() {
        this.audio = new Tone.Player(this.audio_path).toDestination();
        this.audio.autostart = false;
        this.audio.loop = false;
    }
    async loadData(path) {
        const response = await fetch(path);
        const data = await response.json();
        return data;
    }
    cleanData() {
        for (const key in this.data) {
            if (this.data[key] === 0) {
                delete this.data[key];
            }
            else {
                this.data[key] = (
                    (parseFloat(this.data[key]) * 100)
                    / parseFloat(this.users_mill[key]));
            }
        }
    }
    createTrace() {
        this.trace = {
            x: Object.keys(this.data),
            y: Object.values(this.data),
            mode: 'lines',
            name: `Usuarios de ${this.name}`,
            line: { color: 'gray', width: 2 },
            hoverinfo: 'none',
            hovertemplate: `Año: %{x}<br>Usuarios: %{y:.2f} <extra></extra>`
        }
    }
}