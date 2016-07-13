

function HomeController(BlogService, MetadataService) {
    var vm = this;

    vm.featuredPosts = [];

    vm.news = [];
    vm.products =[];

    BlogService.featuredPosts().then(function(posts) {
        vm.featuredPosts = posts;
    });

    BlogService.news().then(function(posts){
        vm.news = posts;
    });

    BlogService.products().then(function(posts){
        vm.products = posts;
        console.log(posts);
    });


    // pass an empty object to use the defaults.
    MetadataService.setMetadata({});
}

angular
    .module('app')
    .controller('HomeController', HomeController);
