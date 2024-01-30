// @ts-nocheck
import ModuleSync from './pubsub'
import './style.css'

window.__MFE_SYNC__ = new ModuleSync(['header', 'catalogue', 'basket', 'checkout'])

const header:any = () => import("header/App");
const catalogue:any = () => import("catalogue/App");
const basket:any = () => import("basket/App");
let checkout

document.querySelector<HTMLDivElement>('#title')!.innerHTML = `
  <div>
    <h1>MMT MFE SHELL</h1>
  </div>
`
header().then(fe => {
  fe.default(document.getElementById("header"))
  // pass into FM to register module ^^
  const [subscription, targetEvent, ready] = __MFE_SYNC__.subscribe('header')
  console.log(subscription, targetEvent, ready)
  // inside FM listen to sync refresh event
  window.addEventListener(subscription, (e) => console.log("can sync this..", e))
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
}).catch((e) => console.log("issue with loading header", e))
catalogue().then(app => app.default("catalogue")).catch(() => console.log("issue with loading catalogue"))
basket().then(fe => fe.default("basket")).catch(() => console.log("issue with loading basket")) 

window.addEventListener('goToCheckout', () => {
  const tgt = document.getElementById("checkout")
  const cat = document.getElementById("accordion")
  const bas = document.getElementById("basket")
  tgt?.classList.remove('hidden')
  tgt?.classList.add('flex-1')
  cat?.classList.add('hidden')
  bas?.classList.add('flex-1')
  checkout = () => import("checkout/App");
  checkout().then(fe => fe.default(tgt)).catch((e) => console.log("issue with loading checkout", e))
})