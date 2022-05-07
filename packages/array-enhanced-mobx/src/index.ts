import "array-enhanced";
import {$mobx, action, computed, isObservableArray} from "mobx";

function defineMobxProperty(propertyName: string) {
    const symbol = Symbol();
    const descriptor = Object.getOwnPropertyDescriptor(Array.prototype, propertyName);
    const oldPropertyGet = descriptor.get;
    Object.defineProperty(Array.prototype, propertyName, {
        get: function () {
            if (isObservableArray(this)) {
                const adm = Object.getOwnPropertyDescriptor(this, $mobx).value;
                const proxy = adm.proxy;
                return (this[symbol] = this[symbol] ?? computed(() => oldPropertyGet.call(proxy))).get()
            }
            return oldPropertyGet.call(this);
        }
    });
}

function defineMobxAction(propertyName: string) {
    const descriptor = Object.getOwnPropertyDescriptor(Array.prototype, propertyName);
    const oldPropertyGet = descriptor.value;
    Object.defineProperty(Array.prototype, propertyName, {
        value: action(function (...args: any) {
            if (isObservableArray(this)) {
                const adm = Object.getOwnPropertyDescriptor(this, $mobx).value;
                const proxy = adm.proxy;

                return oldPropertyGet.call(proxy, ...args);
            }
            return oldPropertyGet.call(this, ...args);
        }
    )});
}

defineMobxProperty("first");
defineMobxProperty("last");
defineMobxProperty("isEmpty");
defineMobxProperty("isNotEmpty");

defineMobxAction("delete");
defineMobxAction("deleteAll");

export {};
