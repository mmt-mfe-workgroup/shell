// @ts-nocheck
import ModuleSync from './pubsub'
import addMetaData from './meta'
import { federatedLoader } from './federated';
import initEventListeners from './runEventListeners'
import './style.css'

const onLoadApps = ['header', 'catalogue', 'basket']

// register FM's
window.__MFE_SYNC__ = new ModuleSync(onLoadApps)
// load Apps
onLoadApps.forEach(app => federatedLoader(app))
// for x-ray
addMetaData()
// app ui
initEventListeners()