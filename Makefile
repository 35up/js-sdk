.PHONY: %/clean
%/clean:
	cd ./packages/$*  && $(MAKE) clean

.PHONY: clean
clean: base/clean browser/clean node/clean

node_modules:
	npm i
