

declare global {
    interface Array<T> {
        readonly first: T|undefined;
        readonly last: T|undefined;
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        deleteAll(): T[];
        delete(...items: T[]): T[];
    }
}

Object.defineProperty(Array.prototype, "isEmpty", {
    configurable: true,
    get: function () {
        [].length
        return this.length === 0;
    }
});

Object.defineProperty(Array.prototype, "isNotEmpty", {
    configurable: true,
    get: function () {
        return !this.isEmpty;
    }
});

Object.defineProperty(Array.prototype, "first", {
    configurable: true,
    get: function () {
        if (this.isEmpty) {
            return undefined;
        }
        return this[0];
    }
});

Object.defineProperty(Array.prototype, "last", {
    configurable: true,
    get: function () {
        if (this.isEmpty) {
            return undefined;
        }
        return this[this.length - 1];
    }
});

Object.defineProperty(Array.prototype, "deleteAll", {
    configurable: true,
    value: function () {
        this.length = 0;
        return this;
    }
});

Object.defineProperty(Array.prototype, "delete", {
    configurable: true,
    value: function (...items: any[]) {
        for (const item of items) {
            const index = this.indexOf(item);

            if (index > -1) {
                this.splice(index, 1);
            }
        }

        return this;
    }
});

export {};
