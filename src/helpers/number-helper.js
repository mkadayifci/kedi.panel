

export default new class NumberHelper {
    decimalToHexString(number) {
        return '0x' + (number+0x10000).toString(16).substr(-4).toUpperCase();
    }
}
