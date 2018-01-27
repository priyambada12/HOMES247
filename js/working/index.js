//(function(){
var app = angular.module('homesApp', ['routerApp', 'networkApp', 'sidebarApp',
    'footerApp', 'aboutUsApp', 'blogsApp',
    'careerApp', 'calculatorApp', 'faqApp',
    'servicesApp', 'offersApp', 'policyApp',
    'signupApp', 'contactUsApp', 'loginApp', 'myAccountApp','propertyApp','cityApp'
]);
app.factory('networkFactory', function(networking) {
    var factory = {};

    factory.getCityDetails = function(callback) {
        return networking.callServerForUrlEncondedGETRequest('/get_location', callback);
    };

    factory.getTopProperties = function(requestData,callback) {
        return networking.callServerForUrlEncondedPOSTRequest('/get_topProperties',requestData,callback);
    };

    factory.getNewProperties = function(requestData,callback) {
        return networking.callServerForUrlEncondedPOSTRequest('/get_newProperties',requestData,callback);
    };

    factory.addCallbackDetails = function(requestData, callback) {
        return networking.callServerForUrlEncondedPOSTRequest('/callback', requestData, callback);
    };
	
	factory.getBuilderDetails = function(requestData , callback){
		 return networking.callServerForUrlEncondedPOSTRequest('/autocomplete', requestData, callback);
	};
	
	factory.getProjectDetails = function(requestData,callback){
		 return networking.callServerForUrlEncondedGETRequest('/search/'+requestData, callback);
	};
	
    return factory;
});

app.controller('dashboardCtrl', function($scope, networkFactory,$state) {


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
    $(fourd).carouseller();
    $(fourd01).carouseller();


    $scope.user = {
        name: '',
        mobileno: ''
    }

    $scope.callBack = function(user) {
        console.log(user);
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
	
	

    networkFactory.getCityDetails(function(success) {
        console.log(success.data);
        $scope.cities = success.data.locations;
		$scope.currentCity = $scope.cities [0];
		$scope.cityProperty = $scope.currentCity ;
		$scope.getProperties($scope.currentCity);
		$scope.getBuilders();
    });
	
	$scope.getProperties= function(){
	var id = $scope.cityProperty.id;
    networkFactory.getTopProperties({'cityId':id},function(success) {
        console.log(success.data.deatils);
		$scope.topProperties =success.data.deatils; 
    });

    networkFactory.getNewProperties({'cityId':id},function(success) {
        console.log(success.data.deatils);
		$scope.newProperties = success.data.deatils;
    });
	}
	$scope.getBuilders = function(){
	
		var builder = $scope.currentCity;
		console.log(builder);
		networkFactory.getBuilderDetails({'city_id':builder.id},function(success){
			console.log(success.data.autolist);
			$scope.autolist = success.data.autolist;
		});
	};
	
	$scope.getProjects = function(){
		var currentcity = $scope.currentCity;
		console.log(currentcity.city);
		networkFactory.getProjectDetails(currentcity.city,function(success){
			console.log(success);
			var projectDetails = success.data.deatils;
			
			$state.go('city',{ param: JSON.stringify(projectDetails) });
			//$state.go('city',{ param: projectDetails });
			
		},function(error){
			console.log(error);
		});
	}
	
	$scope.getPropertyID = function(propertyID){
		$state.go('property',{param:propertyID});
	};
	


});

//});