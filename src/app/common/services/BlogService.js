/**
 * The BlogService retrieves and processes the json response from WP-API into a form that Angular can use.
 *
 * @param $http
 * @param $sce
 * @param config
 * @returns {{news:news,allPosts: allPosts, allPostsByTag: allPostsByTag, allPostsBySearchTerm: allPostsBySearchTerm, featuredPosts: featuredPosts, post: post}}
 * @constructor
 */
function BlogService($http, $sce, config) {

    function allPosts() {
        return getData('posts?filter[category_name]=post');
    }

    function news() {
        return getData('posts?filter[category_name]=news');
    }

    function products(){
        return  getData('posts?filter[category_name]=product&_embed');
    }

    function allPostsByTag(tag) {
        return getData('posts?filter[category_name]=post&filter[tag]=' + tag);
    }

    function allPostsBySearchTerm(searchTerm) {
        return getData('posts?filter[category_name]=post&filter[s]=' + searchTerm);
    }

    function featuredPosts() {
        return getData('posts?filter[category_name]=post%2Bfeatured');
    }

    function post(id) {
        return getData('posts/' + id);
    }

    function getData(url) {
        return $http
            .get(config.API_URL + url, { cache: true })
            .then(function(response) {
                if (response.data instanceof Array) {
                    var items = response.data.map(function(item) {
                        return decorateResult(item);
                    });
                    return items;
                } else {
                    return decorateResult(response.data);
                }
            });
    }

    /**
     * Decorate a post to make it play nice with AngularJS
     * @param result
     * @returns {*}
     */
    function decorateResult(result) {
        result.excerpt.rendered = $sce.trustAsHtml(result.excerpt.rendered);
        result.date = Date.parse(result.date);
        result.content.rendered = $sce.trustAsHtml(result.content.rendered);
        console.log(result);
        if(result.featured_media > 0)
            result.featured = result._embedded['wp:featuredmedia'][0];

        return result;
    }

    return {
        news:news,
        allPosts: allPosts,
        allPostsByTag: allPostsByTag,
        allPostsBySearchTerm: allPostsBySearchTerm,
        featuredPosts: featuredPosts,
        post: post,
        products:products
    };
}

angular
    .module('app')
    .factory('BlogService', BlogService);
