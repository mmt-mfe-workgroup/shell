export default function() {
    // useless mounting
    document.querySelector<HTMLDivElement>('#title')!.innerHTML = `
    <div class="ui">
    <h1>MFE Shell Application</h1>
    </div>
    <div class="flex items-center mb-4">
        <input id="mfe-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-900 rounded focus:ring-blue-500 focus:ring-2">
        <label for="mfe-checkbox" class="ms-2 text-sm font-medium text-gray-900">MFE x-ray mode</label>
    </div>
    <code>
    APP: <span class="tag">mfe-shell@0.0.1</span>
    <br>
    CDN_LOCATION: <span class="tag">mmt-mfe-shell.netlify.app</span>
    <br>
    FRAMEWORK: <span class="tag">Vanila JS</span>
    <br>
    SHARED_RESOURCES: <span class="tag">N/A</span>
    <br>
    EVENTS:DISPATCHED => <span class="tag mfe-blue">"view:x-ray"</span>
    <br>
    EVENTS:SUBSCRIBED => <span class="tag mfe-yellow">"goToCheckout"</span> <span class="tag mfe-brown">"clearBasket"</span>
    </code>`
}