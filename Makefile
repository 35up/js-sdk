.PHONY: %/ci
%/ci:
	cd ./packages/$* && $(MAKE) ci

.PHONY: ci
ci: base/ci browser/ci node/ci

node_modules:
	npm i

.PHONY: node_modules_packages
node_modules_packages:
	$(MAKE) base/node_modules
	$(MAKE) browser/node_modules
	$(MAKE) node/node_modules

.PHONY: %/node_modules
%/node_modules: node_modules
	cd ./packages/$* && $(MAKE) node_modules

.PHONY: %/clean
%/clean:
	cd ./packages/$*  && $(MAKE) clean

.PHONY: clean
clean: base/clean browser/clean node/clean

.PHONY: lint
lint:
	npm run lint

.PHONY: test
test:
	npm run test

.PHONY: build
build:
	npm run build

.PHONY: bootstrap
bootstrap:
	npm run bootstrap
