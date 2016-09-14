var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by Deng on 2016/8/5.
 * 管道pipes $base64pipe  解码
 */
var core_1 = require('@angular/core');
/*处理数据dotosubmit页面，将数组key中的数据提取*/
var KeyToParamsPipe = (function () {
    function KeyToParamsPipe() {
    }
    KeyToParamsPipe.prototype.transform = function (value, args) {
        var items;
        items = value.split("@");
        return items[args];
    };
    KeyToParamsPipe = __decorate([
        core_1.Pipe({ name: 'keytoparams' }), 
        __metadata('design:paramtypes', [])
    ], KeyToParamsPipe);
    return KeyToParamsPipe;
})();
exports.KeyToParamsPipe = KeyToParamsPipe;
/*处理空对象的数据ngIF判断为真的情况*/
var NullToFalse = (function () {
    function NullToFalse() {
    }
    NullToFalse.prototype.transform = function (value) {
        console.log(typeof value);
        if (!value || this.isEmptyObject(value)) {
            return false;
        }
        return true;
    };
    NullToFalse.prototype.isEmptyObject = function (obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    };
    NullToFalse = __decorate([
        core_1.Pipe({ name: 'nulltofalse' }), 
        __metadata('design:paramtypes', [])
    ], NullToFalse);
    return NullToFalse;
})();
exports.NullToFalse = NullToFalse;
/*转化为key-value的数组转成{key:xxx,value:xxx}方便遍历*/
var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        console.log(value);
        var keys = [];
        for (var key in value) {
            keys.push({ key: key, value: value[key] });
        }
        console.log(keys);
        return keys;
    };
    KeysPipe = __decorate([
        core_1.Pipe({ name: 'keys' }), 
        __metadata('design:paramtypes', [])
    ], KeysPipe);
    return KeysPipe;
})();
exports.KeysPipe = KeysPipe;
/*转化base64*/
var Base64pipe = (function () {
    function Base64pipe() {
        this._keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    }
    Base64pipe.prototype.transform = function (args) {
        return this.decode(args).replace(new RegExp('<', 'gm'), '&lt;').replace(new RegExp('>', 'gm'), '&gt;');
    };
    // public method for encoding
    Base64pipe.prototype.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    };
    // public method for decoding
    Base64pipe.prototype.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    };
    // private method for UTF-8 encoding
    Base64pipe.prototype._utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    // private method for UTF-8 decoding
    Base64pipe.prototype._utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = 0, c3 = 0, c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
    Base64pipe = __decorate([
        core_1.Pipe({ name: "base64pipe" }), 
        __metadata('design:paramtypes', [])
    ], Base64pipe);
    return Base64pipe;
})();
exports.Base64pipe = Base64pipe;
