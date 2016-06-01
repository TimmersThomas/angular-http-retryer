angular.module('test', [ 'http-retryer' ])
  .config([ '$httpProvider',
    function ($httpProvider, HttpErrorInterceptor) {
      $httpProvider.interceptors.push('HttpErrorInterceptor')
    } ])

describe('Http Retryer', function () {

  var httpBackend, $rootScope, $timeout, $http

  beforeEach(module('test'))

  beforeEach(function () {

    inject(function ($httpBackend, _$http_, _$rootScope_, _$timeout_) {
      httpBackend = $httpBackend
      $http = _$http_
      $rootScope = _$rootScope_
      $timeout = _$timeout_
    })

  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation()
    httpBackend.verifyNoOutstandingRequest()
  })

  it('should make a simple query', function () {
    $http.get('http://MOCKURL.com/model1')
    httpBackend.expectGET('http://MOCKURL.com/model1').respond()
    httpBackend.flush()
  })

  it('should retry', function () {
    $http.get('http://MOCKURL.com/model1')
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond()
    httpBackend.flush()
  })

  it('shouldns retry avetu max retreizes', function(){
    $http.get('http://MOCKURL.com/model1')
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/model1').respond(0)
    httpBackend.flush()



  })
})