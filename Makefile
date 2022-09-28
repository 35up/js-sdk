.PHONY: base/ci
base/ci:
	cd ./packages/base && $(MAKE) ci

.PHONY: browser/ci
browser/ci:
	cd ./packages/browser && $(MAKE) ci

.PHONY: node/ci
node/ci:
	cd ./packages/node && $(MAKE) ci

.PHONY: ci
ci: base/ci browser/ci node/ci

node_modules:
	npm i

.PHONY: %/node_modules
%/node_modules: node_modules
	npm run bootstrap
