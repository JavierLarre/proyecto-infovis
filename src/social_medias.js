class SocialMedia {
    constructor() {
        if (this.constructor === SocialMedia) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.audio_path = "";
        this.icon_path = "";
    }

    playSound() {
        throw new Error("Method 'playSound()' must be implemented.");
    }

    getIcon() {
        throw new Error("Method 'getIcon()' must be implemented.");
    }
}

export class Instagram extends SocialMedia {
    constructor() {
        this.audio_path = "sonidos/instagram.wav";
        this.icon_path = "imagenes/instagram.png";
    }
    playSound() {
        console.log("Playing Instagram notification sound");
    }

    getIcon() {
        return "📸";
    }
}

// const instagram = new Instagram();
// instagram.playSound();
// console.log(instagram.getIcon());