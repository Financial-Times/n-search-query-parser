IGNORE_A11Y = true

node_modules/@financial-times/n-gage/index.mk:
	npm install @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

unit-test:
	export NODE_ENV=test; mocha 'test/spec/**/*.spec.js'

# unit-test-coverage:
	# nyc --reporter=$(if $(CIRCLECI),lcovonly,lcov) make unit-test

test:
	make verify

# ifeq ($(CIRCLECI),true)
	# make unit-test-coverage && cat ./coverage/lcov.info | ./node_modules/.bin/coveralls
# else
	# make unit-test
# endif
