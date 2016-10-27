/**
 * Created by Administrator on 2016/10/18.
 * 测试 组件
 */
var testing_1 = require('@angular/core/testing');
var test_1 = require('../../src/test');
var login_1 = require('../../app/pages/login/login');
var fixture = null;
var instance = null;
describe('NullToFalse: NullToFalse', function () {
    beforeEach(function () {
        test_1.TestUtils.configureIonicTestingModule([login_1.LoginPage]);
        fixture = testing_1.TestBed.createComponent(login_1.LoginPage);
        instance = fixture.debugElement.componentInstance;
    });
    it('should create page2', testing_1.async(function () {
        expect(instance).toBeTruthy();
    }));
});
//describe('KeyToParamsPipe', () => {
//beforeEach(angular.mock.module('App'));
//it('should have a LoginCtrl controller', function() {
//  expect(App.LoginPage).toBeDefined();
//});
//beforeEach(angular.mock.module('App.PostRequest'));
//it('should have a PostRequest controller', function() {
//  expect(App.PostRequest).toBeDefined();
//});
//it('transforms 1@2@3@4@5:3 to 4',()=>{
//  expect(pipe.transform('1@2@3@4@5:3').toBe('4'));
//});\
//it('should have a working LoginService service', inject(['LoginService',
//  function(LoginService) {
//    expect(LoginService.isValidEmail).not.to.equal(null);
//
//    // test cases - testing for success
//    var validEmails = [
//      'test@test.com',
//      'test@test.co.uk',
//      'test734ltylytkliytkryety9ef@jb-fe.com'
//    ];
//
//    // test cases - testing for failure
//    var invalidEmails = [
//      'test@testcom',
//      'test@ test.co.uk',
//      'ghgf@fe.com.co.',
//      'tes@t@test.com',
//      ''
//    ];
//
//    // you can loop through arrays of test cases like this
//    for (var i in validEmails) {
//      var valid = LoginService.isValidEmail(validEmails[i]);
//      expect(valid).toBeTruthy();
//    }
//    for (var i in invalidEmails) {
//      var valid = LoginService.isValidEmail(invalidEmails[i]);
//      expect(valid).toBeFalsy();
//    }
//
//  }])
//)
//});
