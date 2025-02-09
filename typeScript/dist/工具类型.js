"use strict";
const a12 = { a: 12, d: {}, b: { c: 12, d: {} } };
a12.d = a12;
a13 = {
    a: 1,
    d: a13,
    b: {
        c: 1,
        d: {}
    }
};
