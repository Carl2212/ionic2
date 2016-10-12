/**
 * Created by Administrator on 2016/9/29.
 * 使用屏幕的密码解锁方式登录
 */
import {Component,Injectable} from "@angular/core";
import { AndroidFingerprintAuth,TouchID ,Device} from 'ionic-native';
import {error} from "util";

@Injectable()
export class Fingerprint {
  constructor() {
  };
  initFinger(success,errorfn) {
    console.log('2222222222');
    if(Device.device.platform == 'ios') {
      console.log('device.device.platform == ios');
      TouchID.isAvailable().then(
        res => {
          TouchID.verifyFingerprint("Scan your fingerprint please").then(
            res=>{
              console.log('login by IOS touchid');
              success && success();
            },
            err=>{
              console.log(err);
            }
          )
        },
        err => {errorfn && errorfn()}
      );
    }else if(Device.device.platform == 'Android') {
      console.log('device.device.platform == Android');
      //安卓指纹解锁是否被支持
      AndroidFingerprintAuth.isAvailable().then(
        result=>{
          console.log('AndroidFingerprintAuth.isAvailable()',result);
          if(result) {
            AndroidFingerprintAuth.show({clientId: "ionicapp", clientSecret: "abc123"}).then(
              result => {
                console.log('AndroidFingerprintAuth.show()',result);
                if(result.withFingerprint) {
                  console.log('login by android fingerprint');
                }else if(result.withPassword) {
                  console.log('login by android password');
                }
                success && success();
              }
            ).catch(
              error => console.log(error)
            )
          }else{
            errorfn && errorfn();
          }
        }
      ).catch(
        error =>console.log(error)
      );
    }

  }

}

