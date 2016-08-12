/**
 * Created by Deng on 2016/8/5.
 * 管道pipes $base64pipe  解码
 */
import {Pipe,PipeTransform} from '@angular/core';

/*处理数据dotosubmit页面，将数组key中的数据提取*/
@Pipe({name : 'keytoparams'})
export class KeyToParamsPipe implements PipeTransform {
  transform(value , args:string) : any {
    var items;
    items = value.split("@");
    return items[args];
  }
}

/*处理空对象的数据ngIF判断为真的情况*/
@Pipe({name : 'nulltofalse'})
export class NullToFalse implements PipeTransform {
  transform(value) : any {
    console.log(typeof value);
    if(!value || this.isEmptyObject(value)) {
      return false
    }
    return true;
  }
  isEmptyObject(obj) {
    for(var i in obj) {
      return false;
    }
    return true;
  }
}




/*转化为key-value的数组转成{key:xxx,value:xxx}方便遍历*/
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value : any, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    console.log('key',keys);
    return keys;
  }
}

/*转化base64*/
@Pipe({name:"base64pipe"})
export class Base64pipe implements PipeTransform {
  private _keyStr : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  transform(args : string) : any {
    return this.decode(args).replace(new RegExp('<','gm'),'&lt;').replace(new RegExp('>','gm'),'&gt;');
  }
  // public method for encoding
  encode(input) {
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
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output +
      this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
      this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
  }
  return output;
}

  // public method for decoding
  decode(input) {
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
}

  // private method for UTF-8 encoding
  _utf8_encode(string) {
  string = string.replace(/\r\n/g,"\n");
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }
  return utftext;
}

  // private method for UTF-8 decoding
  _utf8_decode(utftext) {
  var string = "";
  var i = 0;
  var c = 0, c3 = 0 ,c2=0;
  while ( i < utftext.length ) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i+1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i+1);
      c3 = utftext.charCodeAt(i+2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return string;
}


}

