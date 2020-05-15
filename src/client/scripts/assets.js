const ASSET_NAMES = [
    "ship.svg",
    "bullet.svg",
    "object.svg",
    "basic.svg",
    "circle.svg",
    "rotary.svg",
    "shotgun.svg",
    "sniper.svg",
    "repeater.svg"
];

const assets = {};
const downloadPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName) {
    return new Promise(resolve => {
        const asset = new Image();
        asset.onload = () => {
            console.log(`Successfully downloaded ${assetName}`);
            assets[assetName] = asset;
            resolve();
        };
        asset.src = `/assets/images/${assetName}`;
    });
}

export const downloadAssets = () => downloadPromise;
export const getAsset = assetName => assets[assetName];