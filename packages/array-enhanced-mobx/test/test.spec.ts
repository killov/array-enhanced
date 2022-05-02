import "../src/index";
import {autorun, observable} from "mobx";

describe("tests", () => {

    it("as", () => {
        const a = [1, 2];
        expect(a.first).toBe(1);
        expect(a.last).toBe(2);
        expect(a.isEmpty).toBe(false);
        expect(a.isNotEmpty).toBe(true);

        a.deleteAll();
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
        expect(a.delete(1));
        expect(a.first).toBe(2);
        expect(a.last).toBe(1);
        expect(a.length).toBe(5);
        expect(a).toEqual([2, 3, 4, 5, 1]);

        expect(a.delete(4));
        expect(a.first).toBe(2);
        expect(a.last).toBe(1);
        expect(a.length).toBe(4);
        expect(a).toEqual([2, 3, 5, 1]);

        expect(a.delete(7));
        expect(a.first).toBe(2);
        expect(a.last).toBe(1);
        expect(a.length).toBe(4);
        expect(a).toEqual([2, 3, 5, 1]);

        expect(a.delete(2, 1));
        expect(a.first).toBe(3);
        expect(a.last).toBe(5);
        expect(a.length).toBe(2);
        expect(a).toEqual([3, 5]);

        expect(a.delete(3, 5));
        expect(a.first).toBe(undefined);
        expect(a.last).toBe(undefined);
    })

    fit("mobx", () => {
        const a = observable([]);
        const spyEmptyCount = jasmine.createSpy();
        const spyNotEmptyCount = jasmine.createSpy();
        const spyFirst = jasmine.createSpy();
        const spyLast = jasmine.createSpy();

        autorun(() => {
            a.isEmpty;
            spyEmptyCount();
        });
        autorun(() => {
            a.isNotEmpty;
            spyNotEmptyCount();
        });
        autorun(() => {
            //a.length;
            a.first;
            spyFirst();
        });
        autorun(() => {
            a.last;
           // a.length;
            spyLast();
        });

        expect(spyEmptyCount).toHaveBeenCalledTimes(1);
        expect(spyNotEmptyCount).toHaveBeenCalledTimes(1);
        expect(spyFirst).toHaveBeenCalledTimes(1);
        expect(spyLast).toHaveBeenCalledTimes(1);

        a.push(1);
        expect(spyEmptyCount).toHaveBeenCalledTimes(1);
        expect(spyNotEmptyCount).toHaveBeenCalledTimes(1);
        //a[0] = 1;
       // expect(spyFirst).toHaveBeenCalledTimes(2);
        //expect(spyLast).toHaveBeenCalledTimes(2);

        a.push(2);
        expect(spyEmptyCount).toHaveBeenCalledTimes(1);
        expect(spyNotEmptyCount).toHaveBeenCalledTimes(1);

        a.clear();
        expect(spyEmptyCount).toHaveBeenCalledTimes(1);
        expect(spyNotEmptyCount).toHaveBeenCalledTimes(1);

        a.push(2);
        expect(spyEmptyCount).toHaveBeenCalledTimes(1);
        expect(spyNotEmptyCount).toHaveBeenCalledTimes(1);
    });
});

