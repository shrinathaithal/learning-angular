var app = angular.module('twitter', ['twitter.wrapper', 'd3']);

app.filter("asDate", function() {
    return function(input) {
        return new Date(input);
    }
});

