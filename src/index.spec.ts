/**
 * Created by Administrator on 2016/10/18.
 * 测试 组件
 */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { TestUtils }                        from '../../src/test';
import { LoginPage }                            from '../../app/pages/login/login';

let fixture: ComponentFixture<LoginPage> = null;
let instance: any = null;

describe('NullToFalse: NullToFalse', () => {

  beforeEach(() => {
    TestUtils.configureIonicTestingModule([LoginPage]);
    fixture = TestBed.createComponent(LoginPage);
    instance = fixture.debugElement.componentInstance;
  });

  it('should create page2', async(() => {
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
