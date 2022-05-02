

declare global {
    interface Array<T> {
        readonly first: T|undefined;
        readonly last: T|undefined;
        readonly isEmpty: boolean;
        readonly isNotEmpty: boolean;
        deleteAll(): T[];
        delete(...items: T[]): T[];
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

Object.defineProperty(Array.prototype, "deleteAll", {
    value: function () {
        this.length = 0;
        return this;
    }
});

Object.defineProperty(Array.prototype, "delete", {
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
