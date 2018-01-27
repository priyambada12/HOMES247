//(function(){
var app = angular.module('aboutUsApp', []);
app.factory('networkFactory', function(networking) {
    var factory = {};

    factory.addCallbackDetails = function(requestData, callback) {
        return networking.callServerForUrlEncondedPOSTRequest('/callback', requestData, callback);
    };
    return factory;
});
app.controller('aboutusCtrl', function($scope, networkFactory) {
	
    $scope.user = {
        name: '',
        mobileno: ''
    }

    $scope.callBack = function(user) {
        console.log($scope.user);
        if (user.name == "") {
            alert("please provide your name");
        } else if (user.mobileno == "") {
            alert("please provide your Mobile Number");
        } else if (user.name != "" && user.mobileno != "") {
            var requestParam = {
                name: user.name,
                number: user.mobileno
            };
            networkFactory.addCallbackDetails(requestParam, function(success) {
                var status = success.status;
                if (status == 200) {
                    alert("You will intimate you soon");
                }

            }, function(error) {
                console.log(error);
            });
        }

    };
    //$('.test_design').niceSelect();
    $('#first').carouseller({
        scrollSpeed: 850,
        autoScrollDelay: -1800,
        easing: 'easeOutBounce'
    });

    $('#third').carouseller({
        scrollSpeed: 800,
        autoScrollDelay: 1600,
        easing: 'linear'
    });
    $('#top-project').carouseller({
        scrollSpeed: 800,
        autoScrollDelay: 1600,
        easing: 'linear'
    });

    //$(fourd).carouseller();

});

//});