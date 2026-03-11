export const formatTime = (time) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return [h, m, s].map(v => v.toString().padStart(2, "0")).join(":");
};