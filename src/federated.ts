// @ts-nocheck
import MODULE_DATA from './config'

export function federatedLoader(key, callback) {
    const { app, element, props } = MODULE_DATA[key]
    app.then(module => {
        module.default(element, props, __MFE_SYNC__.subscribe(key))
        callback?.()
    }).catch((e) => console.log(`issue with loading ${key}`, e))
}

export function mount(app) {
    // pass into FM to register module ^^
  const [subscription, targetEvent, ready] = __MFE_SYNC__.subscribe(app)
  console.log(subscription, targetEvent)
  // inside FM listen to sync refresh event
  window.addEventListener(subscription) // callback to assign sync
  // let other federated apps know it's go time
  ready()
  // example save new state
  // setTimeout(() => {
  //   const syncState = new CustomEvent(targetEvent, {
  //     detail: { show: true},
  //   });
  //   console.log(syncState)
    // window.dispatchEvent(syncState)
  // }, 500)
}