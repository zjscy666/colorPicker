const accMul = (arg1, arg2) => {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        if (s1.split(".")[1]) m += s1.split(".")[1].length;
    }
    catch (e) {
        console.warn(e)
    }
    try {
        if (s2.split(".")[1]) m += s2.split(".")[1].length;
    }
    catch (e) {
        console.warn(e)
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
const accDiv = (arg1, arg2) => {
    var t1 = 0, t2 = 0, r1, r2, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        if (s1.split(".")[1]) t1 = s1.toString().split(".")[1].length;
    }
    catch (e) {
        console.warn(e)
    }
    try {
        if (s2.split(".")[1]) t2 = s2.toString().split(".")[1].length;
    }
    catch (e) {
        console.warn(e)
    }
    r1 = Number(s1.replace(".", ""));
    r2 = Number(s2.replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};

Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};