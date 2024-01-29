import federation from "@originjs/vite-plugin-federation";
export default () => federation({
    name: 'host-app',
    remotes: {
        header: "https://unnatural-slope.surge.sh/assets/remoteEntry.js",
        catalogue: "https://true-robin.surge.sh/assets/remoteEntry.js",
        basket: "https://unused-example.surge.sh/assets/remoteEntry.js",
        checkout: "https://literate-duck.surge.sh/assets/remoteEntry.js",
    },
    shared: []
})
