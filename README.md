# angular-http-retryer

HTTP interceptor for Angular.

It allows retry on queries return with status 0 or -1. 

You can set a custom timeout on queries and set a custom timer between each retries.

## Installation 
1 - Install using bower 
  
```bower install git://github.com/90TechSAS/angular-http-retryer#master ```

2 - Insert in your html

```<script type='text/javascript' src='bower_components/angular-http-retryer/src/app.js'></script>```

## Usage

```js
angular
  .module('app', ['http-retryer'])
```


## Configuration
```js
angular
  .module('app')
  .config(['$httpProvider', 'HttpRetryerProvider', function ($httpProvider, HttpRetryerProvider) {
    
    // Set the max number of retries
    HttpRetryerProvider.setMaxRetries(10)

    // Set the timeout for all queries
    HttpRetryerProvider.setTimeout(3000)

    // Set the delay before resetting retries count
    HttpRetryerProvider.setDelay(3000)

    $httpProvider.interceptors.push('HttpRetryer')
  }])
```

Field | Default value
----------|--------
maxRetries | 10 |
delay | 600000 |
timeout | 5000 |
