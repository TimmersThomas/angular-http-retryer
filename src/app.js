;(function (angular, _) {
  'use strict'

  angular
    .module('http-retryer', [])
    .factory('HttpErrorInterceptor', HttpErrorInterceptor)

  HttpErrorInterceptor.$inject = [ '$timeout', '$q', '$injector' ]

  function HttpErrorInterceptor ($timeout, $q, $injector) {

    var maxRetries = 10
    var retries = 0

    function resetRetries () {
      retries = 0
      $timeout(resetRetries, 30000)
    }

    resetRetries()

    return {
      request: function (config) {
        return config
      },

      response: function (response) {
        return response
      },

      responseError: function (rejection) {
        if (rejection.status === 0 && ++retries <= maxRetries) {
          var $http = $injector.get('$http')
          return $http(rejection.config)
        } else {
          return $q.reject(rejection)
        }
      }
    }
  }
})(window.angular, window._)
