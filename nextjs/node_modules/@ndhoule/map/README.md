# map [![CI][ci-badge]][ci-link]

Apply a function to a each element of a collection and return a new array of results.

## Installation

```sh
$ component install ndhoule/map
$ npm install @ndhoule/map
```

## API

### map(iterator : Function, collection : Object|Array|string) => Array

Produce a new array by passing each value in the input `collection` through an `iterator` function and accumulating the results. The `iterator` is passed three arguments: `(value, index, collection)`.

```javascript
var square = function(x) { return x * x; };

map(square, [1, 2, 3]);
//=> [1, 4, 9]
```

## License

Released under the [MIT license](LICENSE.md).

[ci-link]: https://travis-ci.org/ndhoule/map
[ci-badge]: https://travis-ci.org/ndhoule/map.svg?branch=master
