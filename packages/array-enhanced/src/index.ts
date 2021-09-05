

declare global {
    interface Array<T> {
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        clear(): void;
        remove(...items: T[]): Array<T>;
        toSet(): Set<T>;
    }
}

Object.defineProperty(Array.prototype, "isEmpty", {
    get: function () {
        [].length
        return this.length === 0;
    }
});

Object.defineProperty(Array.prototype, "isNotEmpty", {
    get: function () {
        return !this.isEmpty;
    }
});

Object.defineProperty(Array.prototype, "first", {
    get: function () {
        return this[0];
    }
});

Object.defineProperty(Array.prototype, "last", {
    get: function () {
        return this[this.length - 1];
    }
});

Object.defineProperty(Array.prototype, "clear", {
    value: function () {
        this.length = 0;
    }
});

Object.defineProperty(Array.prototype, "remove", {
    value: function (...items: any[]) {
        if (items.isEmpty) {
            return this;
        }
        const index = this.indexOf(items.shift());

        if (index > -1) {
            this.splice(index, 1);
        }
        this.remove(...items);

        return this;
    }
});

export {};