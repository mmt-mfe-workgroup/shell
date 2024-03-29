// @ts-nocheck
const STORAGE = "MFE"
const SYNC_OUT_EVENT = "MFE_SYNC"
const CUSTOM_LISTENER = "MFE_STORE"
export class ModuleSync {
    private modules: any[]
    private hasStorage: boolean
    public custom: CustomEvent
    constructor(expected: string[]) {
        this.modules = []
        this.hasStorage = !!localStorage.getItem(STORAGE)
        this.custom = new CustomEvent(SYNC_OUT_EVENT, {detail: { store: localStorage.getItem(STORAGE) }})
        this.initialise(expected)
    }
    register(name: string) {
        this.modules.push(this.prepare(name))
    }
    registerListener(event: string) {
        const useEventHandler = this.setupReaction(event)
        window.addEventListener(event, useEventHandler)
    }
    initialise(list: string[]) {
        this.modules = list.map((name: string) => this.prepare(name))
    }
    prepare(name: string) {
        const store = `${CUSTOM_LISTENER}_${name.toUpperCase()}`    
        return {
            name,
            state: "REGISTERED",
            sync: this.hasStorage ? "PENDING" : "OMIT",
            callback: null,
            store,
        }
    }
    subscribe(name:string, callback: () => void) {
        let SYNC_IN_EVENT
        this.modules = this.modules.map(module => {
            if(name === module.name) {  
                module.state = "MOUNTED"
                module.callback = callback
                SYNC_IN_EVENT = module.store
                this.registerListener(SYNC_IN_EVENT)
            }
            return module
        })
        
        return { listener: SYNC_OUT_EVENT, dispatcher: SYNC_IN_EVENT, ready: this.checkForBroadcast }
    }
    checkForBroadcast(from) {
        console.log(from)
        // const canBroadcast = this.modules.filter(module => module.state === 'MOUNTED').length === this.modules.length
        const store = JSON.parse(localStorage.getItem(STORAGE))
        const event = new CustomEvent(SYNC_OUT_EVENT, { detail: { ...store } })
        window.dispatchEvent(event)
    }
    setupReaction(eventName) {
        const [{ name }] = this.modules.filter(module => {
            return eventName.toLowerCase().includes(module.name)
        })
        return ({ detail }: CustomEvent) => {
            const store = localStorage.getItem(STORAGE) ?? "{}"
            const update = JSON.parse(store)
            update[name] = {...detail }
            console.log(update)
            localStorage.setItem(STORAGE, JSON.stringify(update))
        }
    }
    clearStore() {
        localStorage.clear()
    }
    targetStorage(app, payload) {
        const store = localStorage.getItem(STORAGE) || "{}"
        const update = JSON.parse(store)
        
        if(app === 'basket') {
            update[app] = !update[app] ? [] : update[app]
            update[app] = [...update[app], payload]
            localStorage.setItem(STORAGE, JSON.stringify(update))
        }
    }
}

export default ModuleSync