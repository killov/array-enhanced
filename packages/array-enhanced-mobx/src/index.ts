import "array-enhanced";
import {$mobx, action, computed, isObservableArray} from "mobx";

function defineMobxProperty(propertyName: string) {
    const symbol = Symbol();
    const oldPropertyGet = Object.getOwnPropertyDescriptor(Array.prototype, propertyName).get;
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
    const oldPropertyGet = Object.getOwnPropertyDescriptor(Array.prototype, propertyName).value;
    Object.defineProperty(Array.prototype, propertyName, {
        value: action(function () {
            if (isObservableArray(this)) {
                const adm = Object.getOwnPropertyDescriptor(this, $mobx).value;
                const proxy = adm.proxy;

                return oldPropertyGet.call(proxy, arguments);
            }
            return oldPropertyGet.call(this, arguments);
        })
    });
}

defineMobxProperty("first");
defineMobxProperty("last");
defineMobxProperty("isEmpty");
defineMobxProperty("isNotEmpty");

defineMobxAction("clear");

export {};
