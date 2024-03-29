import { Subscription } from 'rxjs'

export function isObject(obj) {
  return typeof obj === 'object'
}

export function isArray(arr) {
  return Array.isArray(arr)
}

export function isEmptyArray(arr) {
  return isArray(arr) && arr.length === 0
}

export function isString(str) {
  return typeof str === 'string'
}

export function isEmptyString(str) {
  return isString(str) && str.length === 0
}

export function isNull(obj) {
  return obj === null
}

export function isUndefined(obj) {
  return typeof obj === 'undefined'
}

export function isEmpty(obj) {
  return isNull(obj) || isUndefined(obj)
}

export function isLiveSubscription(subscription: Subscription) {
  return !isEmpty(subscription) && !subscription.closed
}

export function isEmptyObject(obj) {
  return !(obj && Object.keys(obj).length > 0)
}

export function excludePropertyFromObj(propertyName: string, fromObj: Object): Object {
  let exludedObj = {}

  for (let key in fromObj) {
    if (key === propertyName) continue

    exludedObj[ key ] = fromObj[ key ]
  }

  return exludedObj
}
