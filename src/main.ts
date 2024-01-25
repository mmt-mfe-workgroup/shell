// @ts-nocheck
import './style.css'

const header:any = () => import("header/App");
const catalogue:any = () => import("catalogue/App");
const basket:any = () => import("basket/App");

document.querySelector<HTMLDivElement>('#title')!.innerHTML = `
  <div>
    <h1>Zain's Phonez 2000</h1>
  </div>
`

header().then(fe => {
  console.log(fe)
  fe.default(document.getElementById("header"))
}).catch(() => console.log("issue with loading header"))
catalogue().then(app => app.default("catalogue")).catch((e) => console.log("issue with loading catalogue", e))
basket().then(fe => fe.default("basket")).catch(() => console.log("issue with loading basket"))
