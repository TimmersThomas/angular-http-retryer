angular.module('test', [ 'http-retryer' ])
  .config([ '$httpProvider', 'HttpRetryerProvider',
    function ($httpProvider, HttpRetryerProvider) {
      HttpRetryerProvider.setMaxRetries(10)
      $httpProvider.interceptors.push('HttpRetryer')
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
    $http.get('http://MOCKURL.com/')
    httpBackend.expectGET('http://MOCKURL.com/').respond()
    httpBackend.flush()
  })

  it('should retry', function () {
    $http.get('http://MOCKURL.com/')
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond()
    httpBackend.flush()
  })

  it('should\'nt retry after max retries', function(){
    $http.get('http://MOCKURL.com/')
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.flush()
  })

  it ('should retry after delay', function(){
    $http.get('http://MOCKURL.com/')
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.flush()
    /** Timeout flush simulates the service's timeout being resolved, thus resetting the max_tries counter */
    $timeout.flush()
    $http.get('http://MOCKURL.com/')
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.expectGET('http://MOCKURL.com/').respond(0)
    httpBackend.flush()
  })
})