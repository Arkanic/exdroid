const SOUND_NAMES = [];

const sounds = {};
const downloadPromise = Promise.all(SOUND_NAMES.map(downloadSound));

function downloadSound(soundName) {
    return new Promise(resolve => {
        const sound = new Audio();
        sound.onload = () => {
            console.log(`Successfully downloaded ${soundName}`);
            sounds[soundName] = sound;
            resolve();
        };
        sound.src = `/assets/sounds/${soundName}`;
    });
}

export const downloadSounds = () => downloadPromise;
export const getAsset = soundName => sounds[soundName];