.DEFAULT_GOAL := build

.PHONY: github-pkg
github-pkg:
	@if cat ~/.npmrc | grep -q '^//npm\.pkg\.github\.com/:_authToken'; then \
		exit 0; \
	fi; \
	echo '======================================================================='; \
	echo 'Cannot download @caseable packages from the Github package repository'; \
	echo 'Please go to https://github.com/settings/tokens and generate a personal'; \
	echo 'access token with permissions to read packages. After you generate the '; \
	read -a GH_TOKEN -e -p 'token, please type or paste it here: '; \
	touch ~/.npmrc \
	&& npm config set '//npm.pkg.github.com/:_authToken' "$$GH_TOKEN"

.PHONY: node_modules
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

.PHONY: make-type-declarations
make-type-declarations:
	npm run makeTypeDeclarations

.PHONY: clean
clean:
	rm -rf ./node_modules
	rm -rf ./dist

.PHONY: ci
ci: lint build make-type-declarations test

