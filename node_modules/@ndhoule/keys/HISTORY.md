## 2.0.0

- Remove Component/Duo support

## 1.1.1

- Update Makefile targets
- Ensure npm@>=2.7.0 on Travis CI
- Update installation instructions in README
- Rename to scoped package for npm package publish

## 1.1.0

- Now works on IE 6-8
- Now works on non-string primitives to match ES6 `Object.keys` behavior. ES5 `Object.keys` threw a `TypeError` when passed a non-Object; we've updated to match ES6's more tolerant behavior.

## 1.0.0

Initial release
