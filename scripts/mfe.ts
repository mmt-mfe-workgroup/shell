import federation from "@originjs/vite-plugin-federation";
export default () => federation({
    name: 'host-app',
    remotes: {
        // header: "https://rude-clouds.surge.sh/assets/remoteEntry.js",
        catalogue: "https://true-robin.surge.sh/assets/remoteEntry.js",
        basket: "https://seemly-temper.surge.sh/assets/remoteEntry.js",
    },
    shared: []
})