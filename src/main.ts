// @ts-nocheck
import ModuleSync from './pubsub'
import { federatedLoader } from './federated';
import './style.css'

// useless mounting
document.querySelector<HTMLDivElement>('#title')!.innerHTML = `<div><h1>MMT MFE SHELL</h1></div>`

const onLoadApps = ['header', 'catalogue', 'basket']

// register FM's
window.__MFE_SYNC__ = new ModuleSync(onLoadApps)
// load Apps
onLoadApps.forEach(app => federatedLoader(app))

// verbose [event] handling for checkout init

// switch view to basket|checkout
window.addEventListener('goToCheckout', () => {
  const tgt = document.getElementById("checkout")
  const cat = document.getElementById("accordion")
  const bas = document.getElementById("basket")
  tgt?.classList.remove('hidden')
  tgt?.classList.add('flex-1')
  cat?.classList.add('hidden')
  bas?.classList.add('flex-1')
  if(tgt?.classList.contains('init')) {
    federatedLoader('checkout', () => {
      window.__MFE_SYNC__.register('checkout')
      tgt?.classList.remove('init')
    })
  }
})

// will revert view back to catalogue|basket
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