import "../src/index";

describe("tests", () => {

    it("as", () => {
        const a = [1, 2];
        expect(a.first).toBe(1);
        expect(a.last).toBe(2);
        expect(a.isEmpty).toBe(false);
        expect(a.isNotEmpty).toBe(true);

        a.clear();
        expect(a.first).toBe(undefined);
        expect(a.last).toBe(undefined);
        expect(a.length).toBe(0);
        expect(a.isEmpty).toBe(true);
        expect(a.isNotEmpty).toBe(false);
    })

    it("remove", () => {
        const a = [1, 2, 3, 4, 5, 1];

        expect(a.first).toBe(1);
        expect(a.last).toBe(1);
        expect(a.remove(1)).toBe(a);
        expect(a.first).toBe(2);
        expect(a.last).toBe(1);
        expect(a.length).toBe(5);
        expect(a).toEqual([2, 3, 4, 5, 1]);

        expect(a.remove(4)).toBe(a);
        expect(a.first).toBe(2);
        expect(a.last).toBe(1);
        expect(a.length).toBe(4);
        expect(a).toEqual([2, 3, 5, 1]);

        expect(a.remove(7)).toBe(a);
        expect(a.first).toBe(2);
        expect(a.last).toBe(1);
        expect(a.length).toBe(4);
        expect(a).toEqual([2, 3, 5, 1]);

        expect(a.remove(2, 1)).toBe(a);
        expect(a.first).toBe(3);
        expect(a.last).toBe(5);
        expect(a.length).toBe(2);
        expect(a).toEqual([3, 5]);

        expect(a.remove(3, 5)).toBe(a);
        expect(a.first).toBe(undefined);
        expect(a.last).toBe(undefined);
    })
});
