let audio_player = null;
const audio_paths = {
    facebook: "sonidos/facebook.wav",
    google: "sonidos/google.wav",
    instagram: "sonidos/instagram.wav",
    twitter: "sonidos/twitter.wav",
    youtube: "sonidos/youtube.wav"
}

const year_mapping = {
    2014: new Tone.Player(audio_paths.twitter).toDestination(),
    2015: new Tone.Player(audio_paths.facebook).toDestination(),
    2016: new Tone.Player(audio_paths.facebook).toDestination(),
    2017: new Tone.Player(audio_paths.facebook).toDestination(),
    2018: new Tone.Player(audio_paths.instagram).toDestination(),
    2019: new Tone.Player(audio_paths.twitter).toDestination(),
    2020: new Tone.Player(audio_paths.youtube).toDestination(),
    2021: new Tone.Player(audio_paths.youtube).toDestination(),
    2022: new Tone.Player(audio_paths.google).toDestination(),
    2023: new Tone.Player(audio_paths.facebook).toDestination(),
    2024: new Tone.Player(audio_paths.twitter).toDestination(),
}

for (const key in year_mapping) {
    year_mapping[key].autostart = false;
    year_mapping[key].loop = false;
}

function playSound(xValue, yValue) {
    const frequency = yValue / 100;
    const adjust = 1.5;
    audio_player = year_mapping[xValue];
    audio_player.playbackRate = frequency * adjust;
    audio_player.loop = true;
    audio_player.start();
}

function PlayOnHover(xValue, yValue) {
    if (Tone.context.state !== 'running') {
        Tone.context.resume().then(() => {
            playSound(xValue, yValue);
        });
    } else {
        playSound(xValue, yValue);
    }
}

function stopSound() {
    if (audio_player && audio_player.state === "started") {
        audio_player.stop();
    }
}

export { PlayOnHover, stopSound };