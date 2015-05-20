angular.module('myApp', ['ngMessages', 'ngAnimate'])
    .controller('MyCtrl', ['$scope', '$http', function ($scope, $http) {
        $scope.submitted = false;
        $scope.searchingMessage = function (tagName) {
            $scope.tagShow = tagName;
            $scope.searching = true;
        };
        $scope.searchInstagram = function (tagName) {
            if (tagName) {
                $scope.notReset = true;
                $scope.tag = tagName;
                $scope.tagShow = tagName;
                $scope.submitted = true;
                $scope.results = [];

                var url = "https://api.instagram.com/v1/tags/" + $scope.tag + "/media/recent";
                var params = {
                    count: 20,
                    callback: 'JSON_CALLBACK',
                    client_id: 'dc4e762600ec43fdaa46e137e3e824fb'
                    };
                $http({
                    method: 'JSONP',
                    url: url,
                    params: params
                })
                    .success(function(response) {
                        $scope.results = response.data;
                        $scope.tagName = "";
                        $scope.searching = false;
                    })
                    .error(function() {
                        alert('error');
                        $scope.tagName = "";
                        $scope.searching = false;
                    })
            }
        };
        $scope.reset = function () {
            $scope.notReset = false;
            $scope.results = "";
            $scope.submitted = false;
        }
    }]);

// Code goes here

//angular.module('PromisesApp', [])
//    .controller('PromisesExampleCtrl', ['$scope', '$timeout', '$q', '$http', function($scope, $timeout, $q, $http) {$http = fakeHttp;
//        function wait() {
//            return $q(function(resolve, reject){
//                $timeout(function() {
//                    resolve();
//                }, 2000);
//            });
//        }
//
//        function notify() {
//            $scope.notifySaved = true;
//            return wait().then(function() {
//                $scope.notifySaved = false;
//            });
//        }
//
//        $scope.saveSettings = function(valid) {
//            var url = valid ? '/api/update_password' : 'http://borken-api/update_password';
//            $http.put(url, $scope.data)
//                .success(function() {
//                    notify();
//                })
//                .error(function() {
//                    $scope.error = true;
//                    notify().then(function() {
//                        $scope.error = false;
//                    });
//                });
//        };
//    }]);


//Ignore
Promise.prototype.success = Promise.prototype.then;
Promise.prototype.error = function (callback) {
    callback();
};
var fakeHttp = {
    put: function (url) {
        var callback, resolv;
        var ret = {
            success: function (cb) {
                callback = cb;
                return new Promise(function (resolve) {
                    resolv = resolve;
                });
            }, error: function () {
            }
        };
        setTimeout(function () {
            callback();
            resolv();
        }, 3000);
        return ret;
    }
};