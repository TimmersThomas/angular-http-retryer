;(function (angular, _) {
  'use strict'

  angular
    .module('http-retryer', [])
    .provider('HttpRetryer', HttpRetryerProvider)

  HttpRetryerProvider.$inject = []

  function HttpRetryerProvider () {
    var self = this
    self.maxRetries = 10
    self.delay = 30000
    self.retries = 0

    self.setMaxRetries = function (max) {
      self.maxRetries = max
    }

    this.$get = [ '$injector', '$timeout', '$q', function ($injector, $timeout, $q) {
      var retryer = {
        resetRetries: function () {
          self.retries = 0
          $timeout(retryer.resetRetries, self.delay)
        },

        request: function (config) {
          return config
        },

        response: function (response) {
          return response
        },

        responseError: function (rejection) {
          if (rejection.status === 0 && ++self.retries <= self.maxRetries) {
            var $http = $injector.get('$http')
            return $http(rejection.config)
          } else {
            return $q.reject(rejection)
          }
        }
      }
      retryer.resetRetries()
      return retryer
    } ]
  }
})(window.angular, window._)
