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
 * Created by Administrator on 2016/9/29.
 * 使用屏幕的密码解锁方式登录
 */
var core_1 = require("@angular/core");
var ionic_native_1 = require('ionic-native');
var Fingerprint = (function () {
    function Fingerprint() {
    }
    ;
    Fingerprint.prototype.initFinger = function (success, errorfn) {
        console.log('2222222222');
        if (ionic_native_1.Device.device.platform == 'ios') {
            console.log('device.device.platform == ios');
            ionic_native_1.TouchID.isAvailable().then(function (res) {
                ionic_native_1.TouchID.verifyFingerprint("Scan your fingerprint please").then(function (res) {
                    console.log('login by IOS touchid');
                    success && success();
                }, function (err) {
                    console.log(err);
                });
            }, function (err) { errorfn && errorfn(); });
        }
        else if (ionic_native_1.Device.device.platform == 'Android') {
            console.log('device.device.platform == Android');
            //安卓指纹解锁是否被支持
            ionic_native_1.AndroidFingerprintAuth.isAvailable().then(function (result) {
                console.log('AndroidFingerprintAuth.isAvailable()', result);
                if (result) {
                    ionic_native_1.AndroidFingerprintAuth.show({ clientId: "ionicapp", clientSecret: "abc123" }).then(function (result) {
                        console.log('AndroidFingerprintAuth.show()', result);
                        if (result.withFingerprint) {
                            console.log('login by android fingerprint');
                        }
                        else if (result.withPassword) {
                            console.log('login by android password');
                        }
                        success && success();
                    }).catch(function (error) { return console.log(error); });
                }
                else {
                    errorfn && errorfn();
                }
            }).catch(function (error) { return console.log(error); });
        }
    };
    Fingerprint = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Fingerprint);
    return Fingerprint;
})();
exports.Fingerprint = Fingerprint;
