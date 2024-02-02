# MMT MFE Shell page

Distributions are built using `npm create vite@latest`

**Current CDN Distribution:** [mmt-mfe-shell](https://mmt-mfe-shell.netlify.app)

![overview](./overview.jpg)

## Remote Application repos

- **header** https://github.com/mmt-mfe-workgroup/header/tree/master
- **catalogue** https://github.com/mmt-mfe-workgroup/catalogue/tree/master
- **basket** https://github.com/mmt-mfe-workgroup/catalogue/tree/master
- **checkout** https://github.com/mmt-mfe-workgroup/checkout/tree/master



:bulb: We will need to align exposing App import statements and any load procedures.

:bulb: Is the remote application **mounted** by the _shell_ or it is **imported** as a shared remote resource? => we need a way to define its Federated module **_type_**

### Federated loader config

The Federated apps will mount onto the Shell DOM, using the custom `federatedLoader`, where they can passed their mountpoints and any props required for their runtime.


```
{
    "header": {
        app: import("header/App"),
        element: document.getElementById("header"),
        props: {
            label: "Distributed Teams Showcase"
        }
    },
    "basket": {
        app: import("basket/App"),
        element: "basket",
        props: {}
    },
    "catalogue": {
        app: import("catalogue/App"),
        element: "catalogue",
        props: {}
    },
    "checkout": {
        app: import("checkout/App"),
        element: document.getElementById("checkout"),
        props: {}
    },
}
```

This will be consumed once the main script has loaded and the page is ready.

Each Remote App has config keys which can be consumed as follows:
```
import { federatedLoader } from './federated';

const onLoadApps = ['header', 'catalogue', 'basket'];
onLoadApps.forEach(app => federatedLoader(app));
```

An app can be consumed at any time, depending on requirements - useful for loading in part of the service after the initial page load.
```
federatedLoader('checkout')
```



---

### Shell Event Interfaces

CustomEvents used by the Shell application, in order for cross app communication.

**Dispatch**

* `window`: `view:x-ray` : `boolean` => signal to put apps into #xray mode

**Listeners**

* `header`: `clearBasket` => hides **Checkout app** from page
* `basket`: `goToCheckout` => loads **Checkout app** 

---

### X-ray mode

Show case the underlying data systems of our federated components as a visual layer

Apps should listen to the `view:x-ray` event and consume `{ detail: boolean }`

* HIDE standard UI
* FILL will solid colours
* Imply the follow data:
  * CDN_LOCATION
  * FRAMEWORK
  * APP NAME AND VERSION
  * SHARED RESOURCES
  * EVENTS - DISPATCHED
  * EVENTS - SUBSCRIBED



## MFE Shared configs

Ensure other apps share these commonalities in their respective `package.json`

```
"type": "module",
 "config": {
    "cdn": "CDN_LOCATION"
 },
"devDependencies": {
    "@originjs/vite-plugin-federation": "^1.3.4",
    "surge": "^0.23.1",
}
```

```
npm install @originjs/vite-plugin-federation surge --save-dev
```

### Deployment (for all Apps) `deprecated`

`npm run deploy`

1. Builds to `/dist`
2. Copies CORS stuff for **surge**
3. Copies CDN location to :clipboard: clipboard
4. **surge** asks to confirm build location
5. **surge** asks for CDN location => clear then paste :wink:

:bomb: (we have moved on to use netflify)

## Federated modules: remotes | exposures

Ensure you have a `vite.config.js`

```
const fm = () => federation({
    name: 'app-name',
    filename: 'remoteEntry.js',
    remotes: {
				'Header': `https://${CDN_LOCATION}/assets/remoteEntry.js`
		},
		exposes: {
        './Button': './src/components/Button', // !important
    },
    shared: ['react']
})

export default defineConfig({
  plugins: [react(), fm()],
  build: {
    target: 'esnext' // !important for ESM exposure
  }
})
```



## App consumption

### Shell import Apps which Mount with ReactDom

```
const basket:any = () => import("basket/App"); // lazy
const runtimeParams = "root" // HTMLElement
basket()
	.then(fmodule => fmodule.default(runtimeParams)) // target to mount
	.catch(console.log)
```



### Remote Import Apps which are consumed by Framework runtime

_n.b React framework_

```
import { lazy, Suspense } from 'react';
const RemoteButton = lazy(() => import('UI/Button'));

<Suspense fallback={<div>Loading...</div>}>
	<RemoteButton label='Apply voucher' onClick={() => console.log('applying voucher...')} />
</Suspense>
```
