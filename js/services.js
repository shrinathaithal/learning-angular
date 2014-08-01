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
            var promise = twitterHandle
                    .get('https://api.twitter.com/1.1/search/tweets.json', {
                        data: {
                            q: query,
                            lang: 'en',
                            result_type: 'mixed',
                            include_entities: 'false'
                        }
                    })
                    .done(function(data) {
                        deferred.resolve(data);
                    });

            return deferred.promise;
        }

    }

});