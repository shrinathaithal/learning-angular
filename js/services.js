angular.module('twitter.wrapper', []).factory('twitterWrapper', function($q) {

    var twitterHandle = false; // Holds oauth.io object

    return {
        init: function() {
            OAuth.initialize('RDqkiQmmXOAJoPgjmsEUvGxz5O8', {cache: true});
            twitterHandle = OAuth.create('twitter');
        },
        auth: function() {
            var deferred = $q.defer();
            OAuth.popup('twitter', {cache: true}, function(error, result) {
                if (!error) {
                    twitterHandle = result;
                    deferred.resolve();
                } else {
                    console.log(error);
                }
            });
            return deferred.promise;
        },
        ready: function() {
            return (twitterHandle);
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            twitterHandle = false;
        },
        search: function(query) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            var options = {
                data: {
                    q: query,
                    lang: 'en',
                    result_type: 'mixed',
                    include_entities: 'false'
                }
            };

            var url = 'https://api.twitter.com/1.1/search/tweets.json';

            twitterHandle.get(url, options)
                    .done(function(data) {
                        deferred.resolve(data);
                    });

            return deferred.promise;

        },
        counter: function($scope, next_results, deferred, count) {
            if (!deferred) {
                var deferred = $q.defer();
            }

if (!count) { 
    count = 0;
}

            var promise = deferred.promise;

            var options = {};


            var url = 'https://api.twitter.com/1.1/search/tweets.json';

            if (next_results) {
                options = {};
                url += next_results;
            }

            var self = this;

            twitterHandle.get(url, options)
                    .done(function(data) {
                        
                        $scope.results_found+= data.search_metadata.count;
                        count+= data.search_metadata.count;
                        if (data.search_metadata.next_results) {
                            deferred.notify(); 
                            self.counter($scope, data.search_metadata.next_results, deferred, count);
                        }
                        else {
                            deferred.resolve();
                            return deferred.promise;
                        }
                    });

            return deferred.promise;

        }
    }

});