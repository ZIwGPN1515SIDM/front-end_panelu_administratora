'use strict';

/* Controllers */
//kontroler ktory definiuje moduł myapp i przypisuje domyslne wartosci zmiennym.

var app = angular.module('myApp', []);
app.controller('mainCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
    $location.search().code;
    $scope.email = "";
    $scope.new_password = "";
    $scope.verify_password = "";
    $scope.sent = false;
    $scope.fine = true;
    $scope.four0four =false;
    //$scope.equal=true;
    //$scope.strong=true;
    //$scope.emailvalid=true;
    //$scope.emptypass=false;
    //$scope.emptypass2=false;
    //$scope.emptymail=false;
    //Password should be at least 8 characters long and should contain one number,one character and one special character.
    //$scope.passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    //Email regex pattern
    //$scope.emailPattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
    var user = {"code": "kod", "email": "mail@gmail.com", "new_password": "password", "verify_password": "password"};
    console.log(user);
    //funkcje w ciele kontrolera która operuje na scopie (ma dostep do wszystkich zmiennych w swoim obrebie) przypisuje dane przypisane do ngmodeli z formularzy odpowiednim polom w jsonie
    $scope.finalize = function () {
        user = {
            "code": $location.search().code,
            "email": $scope.email,
            "new_password": $scope.new_password,
            "verify_password": $scope.verify_password
        }
        console.log(user);
    }
    $scope.register = function () {
        {
            $http.post('http://193.70.41.208/api/v2/user/password', JSON.stringify(user))
                .then(function (response) {
                    if (response.status == "200") {
                        $scope.sent=true;
                        $scope.fine=true;
                    }
                }, function (error) {
                    if (error.status == "404") {
                        $scope.sent=true;
                        $scope.fine=false;
                        $scope.four0four=true;
                    }
                    else{
                        $scope.sent=true;
                        $scope.fine=false;
                    }
                })
        }

    };
}]);
