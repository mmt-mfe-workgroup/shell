// @ts-nocheck
import ModuleSync from './pubsub'
import './style.css'

window.__MFE_SYNC__ = new ModuleSync(['header', 'catalogue', 'basket'])

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
  if(tgt?.classList.contains('init')) {
    checkout = () => import("checkout/App");
    checkout().then(fe => {
      fe.default(tgt)
      window.__MFE_SYNC__.register('checkout')
      tgt?.classList.remove('init')
    }).catch((e) => console.log("issue with loading checkout", e))
  }
})

window.addEventListener('clearBasket', () => {
  const tgt = document.getElementById("checkout")
  if(tgt?.classList.contains('flex-1')) {
    const cat = document.getElementById("accordion")
    const bas = document.getElementById("basket")
    tgt?.classList.add('hidden')
    tgt?.classList.remove('flex-1')
    cat?.classList.remove('hidden')
    bas?.classList.remove('flex-1')
  }
})