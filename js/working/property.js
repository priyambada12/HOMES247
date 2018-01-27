//(function(){
var app = angular.module('propertyApp', []);
app.factory('propertyFactory', function(networking) {
    var factory = {};
    factory.getPropretiesByID = function(requestData, callback) {
        return networking.callServerForUrlEncondedPOSTRequest('/get_propertyById', requestData, callback);
    };

    factory.addCallbackDetails = function(requestData, callback) {
        return networking.callServerForUrlEncondedPOSTRequest('/callback', requestData, callback);
    };
	factory.getCallBackBasedOnProperty = function(requestData,callback){
		return networking.callServerForUrlEncondedPOSTRequest('/PropContactInfo', requestData, callback);
	};
    return factory;
});
app.controller('propertyCtrl', function($scope, propertyFactory, $stateParams) {

    var property_id = $stateParams.param;
    $scope.user = {
        name: '',
        mobileno: ''
    };

    propertyFactory.getPropretiesByID({
        propId: property_id
    }, function(success) {
        if (success.data.hasOwnProperty('deatils')) {
            $scope.propDetails = success.data.deatils;
			$scope.location = $scope.propDetails[0].locality_name;
			$scope.city_name=   $scope.propDetails[0].city_name;
        }
    }, function(error) {
        console.log(error);
    });
	
	$scope.getcallBackForProperties = function(){
		if (user.name == "") {
            alert("please provide your name");
        } else if (user.mobileno == "") {
            alert("please provide your Mobile Number");
        } else if (user.name != "" && user.mobileno != "") {
		var propertyCallBack = {name:$scope.user.name,number:$scope.user.mobileno,propId:property_id};
		propertyFactory.getCallBackBasedOnProperty(propertyCallBack,function(success){
			console.log(success);
		},function(error){
			console.log(error);
		});
		};
	};

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
            propertyFactory.addCallbackDetails(requestParam, function(success) {
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

    $('#horizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion           
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        closed: 'accordion', // Start closed if in accordion view
        activate: function(event) { // Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#tabInfo');
            var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });
    $('#verticalTab').easyResponsiveTabs({
        type: 'vertical',
        width: 'auto',
        fit: true
    });

    <!--**************** Gallery Vertical Silder ****************-->

    var firstSlides = $("#slideshow-list li"),
        secondSlides = $("#image-list li"),
        nbSlides = firstSlides.length,
        slideTime = 3000,
        nextSlide = 0,
        timer;

    function slideshow() {
        secondSlides.eq(nextSlide).addClass('active').siblings().removeClass('active');
        firstSlides.eq(nextSlide).fadeIn().delay(2000).fadeOut();
        nextSlide = (nextSlide + 1) % nbSlides;
        timer = setTimeout(slideshow, slideTime);

    }

    slideshow();

    $('#image-list li').click(function() {
        clearTimeout(timer);
        var clickIndex = $(this).index()
        $('#slideshow-list li').eq(clickIndex).show().siblings().hide();
    });

    $('#image-list').mouseleave(function(e) {
        $('#slideshow-list li').hide();
        clearTimeout(timer);
        setTimeout(slideshow(), 2000);
    });
	/* 


  if($(".overview_section_main").offset() !=undefined){
    var triggerTop = $(".overview_section_main").offset().top - 80;
    var triggerBottom = triggerTop + $(".overview_section_main").height();
    var item = $('.sticky-stuff');
  }
    $(window).scroll(function() {
            var curentScroll = $(window).scrollTop();
            var isSticky = curentScroll > triggerTop && curentScroll < triggerBottom
            item.toggleClass('sticky', isSticky);
        })
        .resize(function() {
            size = $(window).height();
        });




    // Prevent console.log from generating errors in IE for the purposes of the demo
    if (!window.console) console = {
        log: function() {}
    };

    // The actual plugin
    $('.single-page-nav').singlePageNav({
        offset: $('.single-page-nav').outerHeight(),
        filter: ':not(.external)',
        updateHash: true,
        beforeStart: function() {
            console.log('begin scrolling');
        },
        onComplete: function() {
            console.log('done scrolling');
        }
    }); */
});
//});