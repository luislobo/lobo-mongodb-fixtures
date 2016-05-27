# Changelog
##1.0.0
- Merged several forks into this one. Fixing original issues and updating to latest modules versions.
- Added [.jshint](.jshint) and [.eshint](.eslint). Fixed according to the rules defined.
- Added `npm run js-beautify` and run it to addapt the code to the [.jsbeautify](.jsbeautify) rules
- Added [.editorconfig](.editorconfig) file
- Replaced the use of _.pluck with _.map

##0.13.0
- replace underscore to lodash
- rename project to mongodb-fixtures
- add npm test support
- Update mongodb driver to 2.0.x
- Updated `collection.insert` with `collection.insertMany` - the former is marked for deprecation in version 3.x
- Move to Lo-Dash from Underscore

##0.10.0
- Update mongodb driver to 1.3.x
- Add ability to connect with URI
- Make safe mode the default

##0.8.1
- Add mongofixtures CLI program

##0.7.1
- Add 'safe' option (donnut)

##0.7.0
- Add user and password options for connecting to authenticated/remote DBs

##0.6.4
- Add username and password connect options

##0.6.3
- Make clear be safe

##0.6.2
- Windows fixes (samitny)

##0.6.1
- Ignore subdirectories (hiddentao)
