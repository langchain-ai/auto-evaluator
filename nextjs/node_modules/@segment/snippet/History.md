4.13.1 / 2020-08-12
==================

  * fix: minified snippet not generated correctly

4.13.0 / 2020-08-11
==================

  * added ajsPath option to load from customized location
  * updated dependencies 

4.12.0 / 2020-05-21
==================

  * add destination mw to snippe


4.11.0 / 2020-05-14
==================

  * add setAnonymousId stub


4.10.0 / 2020-05-06
==================

  * rename addDestinationMiddleware to addIntegrationMiddleware

4.9.0 / 2020-04-23
==================

  * release 4.9.0
  * build before publishing

4.8.0 / 2020-04-23
==================

  * update package.json to 4.8.0

4.6.0 / 2020-04-23
==================

  * Revert "add post install step to satisfy app build"
  * add post install step to satisfy app build
  * rm -v prefix required to publish a tag

4.4.0 / 2018-06-19
==================

  * Always use HTTPs to load from CDN.

4.3.1 / 2018-05-03
==================

  * Fix empty strings being output around the .load() call (#33).

4.3.0 / 2018-05-03
==================

  * Add license.

4.2.0 / 2018-05-03
==================

  * Add `load` option for omitting the `load()` call.

4.1.1 / 2018-02-15
==================

  * Rebuild of 4.1.0 to pull in all of its changes

4.1.0 / 2018-02-14
==================

  * Add options to load

4.0.0 / 2016-09-14
==================

  * Allow usage in-browser via browserify/webpack (#22)

3.1.0 / 2015-09-04
==================

  * add reset() method


3.0.1 / 2015-01-05
==================

  * snippet: fix ajax loading stack overflow case
  * Adding semi-colon because ocd

3.0.0 / 2014-11-26
==================

  * refactor
  * test: window.analytics -> analytics
  * wrap in a closure

2.1.1 / 2014-11-12
==================

  * fix: make sure the snippet is included once

2.1.0 / 2014-10-15
==================

 * updating host to cdn.segment.com

2.0.9 - March 28, 2013
----------------------
* shorten line length

2.0.8 - December 5, 2013
------------------------
* add linebreak fixes

2.0.7 - December 4, 2013
------------------------
* adding page options to snippet

2.0.6 - November 11, 2013
-------------------------
* adding window.analytics where forgotten

2.0.5 - November 10, 2013
-------------------------
* fixing default host

2.0.4 - November 6, 2013
------------------------
* add `window.analytics.page()`

2.0.3 - October 24, 2013
------------------------
* add `on`, `once`, `off`

2.0.2 - September 16, 2013
--------------------------
* made queue stubs return the `analytics` object

2.0.1 - September 16, 2013
--------------------------
* made all `analytics` references `window.analytics`

2.0.0 - September 13, 2013
--------------------------
:sparkles:
