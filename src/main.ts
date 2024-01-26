// @ts-nocheck
import ModuleSync from './pubsub'
import './style.css'

window.__MFE_SYNC__ = new ModuleSync(['header', 'catalogue', 'basket'])

const header:any = () => import("header/App");
const catalogue:any = () => import("catalogue/App");
const basket:any = () => import("basket/App");

document.querySelector<HTMLDivElement>('#title')!.innerHTML = `
  <div>
    <h1>MMT MFE SHELL</h1>
  </div>
`
header().then(fe => {
  fe.default(document.getElementById("header"))
  const [subscription, targetEvent, ready] = __MFE_SYNC__.subscribe('header', () => console.log('sync please'))
  window.addEventListener(subscription, (e) => console.log("can sync this..", e))
  // ready()
  // setTimeout(() => {
  //   const syncState = new CustomEvent(targetEvent, {
  //     detail: { show: true},
  //   });
  //   console.log(syncState)
  //   window.dispatchEvent(syncState)
  // }, 500)
}).catch(() => console.log("issue with loading header"))
catalogue().then(app => app.default("catalogue")).catch((e) => console.log("issue with loading catalogue", e))
basket().then(fe => fe.default("basket")).catch(() => console.log("issue with loading basket"))
