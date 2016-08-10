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
 * Created by Deng on 2016/7/29.
 */
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/map');
require('rxjs/Rx');
var isArray_1 = require("rxjs/util/isArray");
var PostRequest = (function () {
    function PostRequest(http) {
        this.http = http;
    }
    PostRequest.prototype.postrequerst = function (params, url, successfn) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var jsondata = this.ParamsToJson(params);
        return this.http.post(url, jsondata, { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return successfn(data); }, function (err) { return _this.handleError(err); }, function () { return console.log('Authentication Complete'); });
    };
    PostRequest.prototype.ParamsToJson = function (params) {
        if (!params || (isArray_1.isArray(params) && params.length <= 0))
            return '';
        var jdata = new http_1.URLSearchParams();
        for (var _i = 0; _i < params.length; _i++) {
            var param = params[_i];
            jdata.append(param.key, param.value);
        }
        return jdata.toString();
    };
    PostRequest.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    PostRequest.prototype.prequest = function (p, url, callback) {
        this.postrequerst(p, url, callback);
    };
    PostRequest = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PostRequest);
    return PostRequest;
})();
exports.PostRequest = PostRequest;
