.PHONY: %/clean
%/clean:
	cd ./packages/$*  && $(MAKE) clean

.PHONY: clean
clean: base/clean browser/clean node/clean

.npmrc:
  # Disables package lock
	npm config set "package-lock"="false" --userconfig .npmrc \

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
		'//npm.pkg.github.com/:_authToken' "$$GH_TOKEN"

node_modules: .npmrc
	npm i
