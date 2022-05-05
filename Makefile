.DEFAULT_GOAL := build

.npmrc:
  # Sets proper registry
	npm config set --userconfig .npmrc \
      "@35up:registry" "https://npm.pkg.github.com" \

  # Makes sure token is present
	@if cat .npmrc | grep -q '^//npm\.pkg\.github\.com/:_authToken'; then \
		exit 0; \
	elif cat ~/.npmrc | grep -q '^//npm\.pkg\.github\.com/:_authToken'; then \
    exit 0; \
  fi; \
	echo '==============================================================='; \
	echo 'Cannot download private packages from the Github package'; \
	echo 'repository. Please go to https://github.com/settings/tokens and'; \
	echo 'generate a personal access token with permissions to read'; \
	echo 'packages. After you generate the token, please type or paste it'; \
	read -p 'here: ' GH_TOKEN \
	&& npm config set --userconfig .npmrc \
		'//npm.pkg.github.com/:_authToken' "$$GH_TOKEN" \

node_modules: .npmrc
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
	rm -rf ./dist

.PHONY: ci
ci: clean lint build make-type-declarations test

