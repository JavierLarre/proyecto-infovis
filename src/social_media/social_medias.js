class SocialMedia {
    constructor(name, audio_path, icon_path, use_data_path, traceIndex) {
        this.plot_div = 'myDiv';
        this.image_div = 'svgContainer';
        this.users_mill_path = "users_mill.json";

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
        this.playing = false;
        this.playing_year = null;
        this.min_year = null;
    }
    async initialize() {
        const data = await this.loadData(this.use_data_path);
        this.data = data;
        this.min_year = Math.min(...Object.keys(data));
        console.log(`min year for ${this.name}: ${this.min_year}`);
        this.users_mill = await this.loadData(this.users_mill_path);
        this.cleanData();
        this.createTrace();
        await this.createAudioPlayer();
    }
    validYear(year) {
        const is_valid = year >= this.min_year;
        if (!is_valid) {
            return false;
        }
        if (this.playing_year === year) {
            return false;
        }
        this.playing_year = year;
        return true;
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
            source: `assets/imagenes/${this.icon_path}`,
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
        this.image_element.src = `assets/imagenes/${this.icon_path}`;
        this.image_element.className = 'image-on-hover';
        document.getElementById(this.image_div).appendChild(this.image_element);
    }
    removeImage() {
        document.getElementById(this.image_div).removeChild(this.image_element);
    }
    async createAudioPlayer() {
        this.audio = await new Tone.Player(`assets/sonidos/${this.audio_path}`).toDestination();
        this.audio.autostart = false;
        this.audio.loop = false;
        this.looper = new Tone.Loop((time) => this.playSound(time), 1);
    }
    startLooper(year) {
        this.looper.interval = this.data[year] / this.users_mill[year];
        this.looper.interval = (this.users_mill[year] / this.data[year]) + 1;
        Tone.Transport.start();
        this.looper.start(0);
        this.playing = true;
    }
    stopLooper() {
        this.looper.stop(0);
        Tone.Transport.stop();
        this.playing = false;
    }
    async loadData(path) {
        const response = await fetch(`assets/json/${path}`);
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
    highlightTrace() {
        const color = 'blue';
        Plotly.restyle(this.plot_div, { 'line.width': 4, 'line.color': color }, [this.traceIndex]);
    }
    unHighlightTrace() {
        const color = 'gray';
        Plotly.restyle(this.plot_div, { 'line.width': 2, 'line.color': color }, [this.traceIndex]);
    }
    onHover(layout, x, y) {
        if (this.validYear(x)) {
            this.highlightTrace();
            this.placeImage(layout, 1.15, this.data[2023] / 100);
            this.startLooper(x);
        }
    }
    unHover() {
        this.unHighlightTrace();
        this.stopLooper();
        this.playing_year = null;
    }
    getYearFrom(x) {
        const years = Object.keys(this.data).length;
        const ratio = window.innerWidth / years;
        let i = 0;
        for (let year in this.data) {
            var left = i * ratio;
            var right = (i + 1) * ratio;
            if (x >= left && x < right) {
                return this.min_year + i;
            }
            i++;
        }
    }
}

export const social_medias = [
    new SocialMedia(
        'Facebook', 'facebook.wav', 'facebook.png', 'uso_facebook.json', 2
    ),
    new SocialMedia(
        'Instagram', 'instagram.wav', 'instagram.png', 'uso_instagram.json', 3
    ),
    new SocialMedia(
        'Twitter', 'twitter.wav', 'twitter.png', 'uso_twitter.json', 4
    ),
]
await Promise.all(social_medias.map(sm => sm.initialize()));