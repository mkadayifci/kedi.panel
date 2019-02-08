

export default new class NumberHelper {
    decimalToHexString(number) {
        return '0x' + (number+0x10000).toString(16).substr(-4).toUpperCase();
    }
    readableBytes(bytes) {
        var i = Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
    }
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
