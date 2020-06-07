module.exports.modularScale = function (index = '0', base = '1', ratio = '1.333') {
    return modularScale(parseFloat(index), parseFloat(base), parseFloat(ratio)) + 'em';
};

function modularScale(index, base, ratio) {
    return Math.pow(ratio, index) * base;
}
