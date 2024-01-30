import federation from "@originjs/vite-plugin-federation";
export default () => federation({
    name: 'host-app',
    remotes: {
        header: "https://mmt-mfe-header.netlify.app/assets/remoteEntry.js",
        catalogue: "https://mmt-mfe-catalogue.netlify.app/assets/remoteEntry.js",
        basket: "https://mmt-mfe-basket.netlify.app/assets/remoteEntry.js",
        checkout: "https://literate-duck.surge.sh/assets/remoteEntry.js",
    },
    shared: []
})
