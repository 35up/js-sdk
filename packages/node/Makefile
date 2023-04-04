.DEFAULT_GOAL := build

node_modules:
	npm i

.PHONY: build
build: node_modules
	npm run build

.PHONY: test-unit
test-unit: node_modules
	npm run test

.PHONY: test
test: test-unit

.PHONY: lint
lint: node_modules
	npm run lint

.PHONY: clean
clean:
	rm -rf ./dist

.PHONY: ci
ci: clean lint build test

