

function HomeController(BlogService, MetadataService) {
    var vm = this;

    vm.featuredPosts = [];

    vm.news = [];

    BlogService.featuredPosts().then(function(posts) {
        vm.featuredPosts = posts;
    });

    BlogService.news().then(function(posts){
        vm.news = posts;
    });


    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});
}

angular
    .module('app')
    .controller('HomeController', HomeController);
