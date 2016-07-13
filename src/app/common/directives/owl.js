/**
 * Angular Directive for Owl Carosuel
 *
 * Sample Usage:
 *
     <body ng-controller="MainCtrl">
        <data-owl-carousel class="owl-carousel" data-options="{navigation: true, pagination: false, rewindNav : false}">
            <div owl-carousel-item="" ng-repeat="item in ::items1" class="item">
                <p>{{::item}}</p>
            </div>
        </data-owl-carousel>
        <data-owl-carousel class="owl-carousel" data-options="{navigation: false, pagination: true, rewindNav : false}">
            <div owl-carousel-item="" ng-repeat="item in ::items2" class="item">
                <p>{{::item}}</p>
            </div>
        </data-owl-carousel>
    </body>
 */

angular.module('app').directive("owlCarousel", function() {
    return {
        restrict: 'E',
        transclude: false,
        link: function(scope) {
            scope.initCarousel = function(element) {
                // provide any default options you want
                var defaultOptions = {
                    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                    animateIn: true,
                    animateOut: true
                };
                var customOptions = scope.$eval($(element).attr('data-options'));
                // combine the two options objects
                for (var key in customOptions) {
                    if(customOptions.hasOwnProperty(key)){
                        defaultOptions[key] = customOptions[key];
                    }
                }
                // init carousel
                $(element).owlCarousel(defaultOptions);
            };
        }
    };
});

angular.module('app').directive('owlCarouselItem', [function() {
    return {
        restrict: 'A',
        transclude: false,
        link: function(scope, element) {
          // wait for the last item in the ng-repeat then call init
            if(scope.$last) {
                scope.initCarousel(element.parent());
            }
        }
    };
}]);
