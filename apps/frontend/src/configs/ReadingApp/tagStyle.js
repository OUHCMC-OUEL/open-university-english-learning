export const tagStyle = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + hash * 31;
    }
    const hue = Math.abs(hash) % 360;
    return {
        backgroundColor: `hsl(${hue}, 70%, 85%)`,
        color: `hsl(${hue}, 60%, 25%)`
    };
};