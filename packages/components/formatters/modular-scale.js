exports.modularScale = function modularScale(index = '0', base = '1', ratio = '1.333') {
    return `${Math.pow(parseFloat(ratio), parseFloat(index)) * parseFloat(base)}em`;
}
