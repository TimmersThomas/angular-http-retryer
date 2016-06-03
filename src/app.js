;(function (angular, _) {
  'use strict'

  angular
    .module('http-retryer', [])
    .provider('HttpRetryer', HttpRetryerProvider)

  HttpRetryerProvider.$inject = []

  function HttpRetryerProvider () {
    var self = this
    self.maxRetries = 10
    self.delay = 600000
    self.retries = 0
    self.timeout = 5000
    self.pending = 0

    self.setMaxRetries = function (max) {
      self.maxRetries = max
    }

    self.setTimeout = function (timeout) {
      self.timeout = timeout
    }

    self.setDelay = function (delay) {
      self.delay = delay
    }

    this.$get = [ '$injector', '$timeout', '$q', '$rootScope', function ($injector, $timeout, $q, $rootScope) {
      var retryer = {
        resetRetries: function () {
          self.retries = 0
          retryer.emit()
          $timeout(retryer.resetRetries, self.delay)
        },

        checkPending: function(){
          if (!self.pending)
            self.retries = 0
          retryer.emit()
        },

        request: function (config) {
          self.pending++
          config.timeout = self.timeout
          return config
        },

        response: function (response) {
          self.pending --
          retryer.checkPending()
          return response
        },

        emit: function(){
          if (self.retries)
            $rootScope.$broadcast('RequestRetry', self.retries)
          else
            $rootScope.$broadcast('NetworkBackToNormal')
          if (self.retries > self.maxRetries/4){
            $rootScope.$broadcast('BadNetwork', self.retries)
          }
        },

        responseError: function (rejection) {
          retryer.checkPending()
          if (rejection.status <= 0 && ++self.retries <= self.maxRetries) {
            retryer.emit()
            var delay = 1000 * self.retries
            var $http = $injector.get('$http')
            return $timeout(function () {
              self.pending --
              return $http(rejection.config)
            }, delay)
          } else {
            self.pending --
            return $q.reject(rejection)
          }
        }
      }
      retryer.resetRetries()
      return retryer
    } ]
  }
})(window.angular, window._);
