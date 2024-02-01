// @ts-nocheck
import { federatedLoader } from './federated';
export default function() {
    // verbose [event] handling for checkout init

// switch view to basket|checkout
window.addEventListener('goToCheckout', () => {
    const tgt = document.getElementById("checkout")
    const cat = document.getElementById("catalogue-container")
    const bas = document.getElementById("basket-container")
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
      const cat = document.getElementById("catalogue-container")
      const bas = document.getElementById("basket-container")
      tgt?.classList.add('hidden')
      tgt?.classList.remove('flex-1')
      cat?.classList.remove('hidden')
      bas?.classList.remove('flex-1')
    }
  })
  
  // setup x-ray event dispatcher
  const shell = document.getElementById('shell-container')
  const basket = document.getElementById('basket-container')
  const catalogue = document.getElementById('catalogue-container')
  const header = document.getElementById('header-container')
  const checkout = document.getElementById('checkout')
  const checkbox = document.getElementById('mfe-checkbox')
  checkbox?.addEventListener('change', ({ target }) => {
    window.dispatchEvent(new CustomEvent('view:x-ray', { detail: target.checked }))
    if(target.checked) {
      shell?.classList.add('x-ray')
      basket?.classList.add('x-ray','bg-blue')
      catalogue?.classList.add('x-ray','bg-green')
      header?.classList.add('x-ray', 'bg-orange')
      checkout?.classList.add('bg-indigo')
    } else {
        shell?.classList.remove('x-ray')
        basket?.classList.remove('x-ray','bg-blue')
        catalogue?.classList.remove('x-ray','bg-green')
        header?.classList.remove('x-ray', 'bg-orange')      
        checkout?.classList.remove('bg-indigo')
    }
  })
}