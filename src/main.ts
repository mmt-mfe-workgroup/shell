// @ts-nocheck
import ModuleSync from './pubsub'
import { federatedLoader } from './federated';
import './style.css'

// useless mounting
document.querySelector<HTMLDivElement>('#title')!.innerHTML = `<div class="shell-header">
  <h1>MMT MFE SHELL</h1>
  <div class="flex items-center mb-4">
    <input id="mfe-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
    <label for="mfe-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">MFE x-ray mode</label>
  </div>
  <code>
  CDN_LOCATION = https://unnatural-slope.surge.sh/assets/remoteEntry.js
  FRAMEWORK = REACT@18.2
  APP NAME AND VERSION = SHELL
  SHARED RESOURCES = N/A
  EVENTS - DISPATCHED => "XRAY"
  EVENTS - SUBSCRIBED => "addToBasket"
  <code>
</div>`

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

// setup x-ray event dispatcher
const shell = document.getElementById('title')
const checkbox = document.getElementById('mfe-checkbox')
checkbox?.addEventListener('change', ({ target }) => {
  console.log('view:x-ray', target.checked)
  window.dispatchEvent(new CustomEvent('view:x-ray', { detail: target.checked }))
  if(target.checked) {
    shell?.classList.add('x-ray')
  } else {
    shell?.classList.remove('x-ray')
  }
})

