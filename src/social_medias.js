class SocialMedia {
    constructor(name, audio_path, icon_path, use_data_path) {
        this.name = name;
        this.icon_path = icon_path;
        this.audio_path = audio_path
        this.use_data_path = use_data_path;
        
        this.createAndConnectButton();
        this.createAudioPlayer();

        this.div = 'myDiv';
        this.users_mill_path = "scripts/users_mill.json";
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
            y: y - 8,
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
    createButton() {
        const button = document.createElement('button');
        document.getElementById(this.div).appendChild(button);
        button.innerHTML = this.name;
        this.button = button;
    }
    connectButton() {
        this.button.onclick = () => {
            this.changeTrace();
        }
    }
    createAndConnectButton() {
        this.createButton();
        this.connectButton();
    }
    createAudioPlayer() {
        this.audio = new Tone.Player(this.audio_path).toDestination();
        this.audio.autostart = false;
        this.audio.loop = false;
    }
    changeTrace() {
        throw new Error("Method 'changeTrace()' must be implemented.");
    }
    async loadData(path) {
        const response = await fetch(path);
        const data = await response.json();
        return data;
    }
    async saveData() {
        this.data = await this.loadData(this.use_data_path);
    }
}