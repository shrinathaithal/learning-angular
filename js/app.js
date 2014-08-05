var app = angular.module('twitter', ['twitter.wrapper']);

app.filter("asDate", function () {
    return function (input) {
        return new Date(input);
    }
});