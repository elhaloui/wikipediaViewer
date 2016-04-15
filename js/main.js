var url = 'http://en.wikipedia.org/w/api.php?',
    params = 'action=query&format=json&prop=extracts%7Cpageimages&generator=search&exsentences=1&exlimit=max&exintro=1&explaintext=1&pilimit=max&gsrnamespace=0&gsrlimit=10&';
var searchApp = angular.module('searchApp', []);
searchApp.controller('searchCtrl', function($scope, $http) {
  $scope.search = function() {

        $scope.results = [];
        $http.jsonp(url + params + 'callback=JSON_CALLBACK&gsrsearch='+$scope.query).
        success(function(data) {
            var pages = data.query.pages;
            var pageUrl='https://en.wikipedia.org/?curid='
            angular.forEach(pages, function(v, k) {
                $scope.results.push({
                    'title': v.title,
                    'extract': v.extract,
                    'image': v.thumbnail ? v.thumbnail.source : 'img/image.png',
                    'url' : pageUrl+v.pageid
                });
            });
  });
    }
    $scope.search();
});
$(document).ready(function(){
 $('input.wikisearch-input' ).on( 'focus', function(){$('#wikisearch').addClass('open');} );
  $( 'span.wikisearch-close' ).on( 'click', function(){$('#wikisearch').removeClass('open');} );
});
