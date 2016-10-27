/**
 * Created by Administrator on 2016/10/19.
 */
require('./polyfills.ts');
console('1');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy.js');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
var forms_1 = require('@angular/forms');
var testing_1 = require('@angular/core/testing');
var ionic_angular_1 = require('ionic-angular');
var mocks_1 = require('./mocks');
var clickers_mock_1 = require('./services/clickers.mock');
var services_1 = require('./services');
// Prevent Karma from running prematurely.
__karma__.loaded = function () { };
Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing'),
])
    .then(function (_a) {
    var testing = _a[0], testingBrowser = _a[1];
    testing.getTestBed().initTestEnvironment(testingBrowser.BrowserDynamicTestingModule, testingBrowser.platformBrowserDynamicTesting());
})
    .then(function () { return require.context('./', true, /\.spec\.ts/); })
    .then(function (context) { return context.keys().map(context); })
    .then(__karma__.start, __karma__.error);
var TestUtils = (function () {
    function TestUtils() {
    }
    TestUtils.configureIonicTestingModule = function (components) {
        testing_1.TestBed.configureTestingModule({
            declarations: components.slice(),
            providers: [
                { provide: ionic_angular_1.App, useClass: mocks_1.ConfigMock },
                { provide: ionic_angular_1.Config, useClass: mocks_1.ConfigMock },
                ionic_angular_1.Form,
                { provide: ionic_angular_1.Keyboard, useClass: mocks_1.ConfigMock },
                { provide: ionic_angular_1.MenuController, useClass: mocks_1.ConfigMock },
                { provide: ionic_angular_1.NavController, useClass: mocks_1.NavMock },
                { provide: ionic_angular_1.Platform, useClass: mocks_1.PlatformMock },
                { provide: services_1.ClickersService, useClass: clickers_mock_1.ClickersServiceMock },
            ],
            imports: [
                forms_1.FormsModule,
                ionic_angular_1.IonicModule,
                forms_1.ReactiveFormsModule,
            ],
        });
    };
    // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
    TestUtils.eventFire = function (el, etype) {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        }
        else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    };
    return TestUtils;
})();
exports.TestUtils = TestUtils;
