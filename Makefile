install:
	npm ci
lint:
	npx eslint .
serve:
	npx webpack serve --open --mode development
dev:
	npx webpack --mode development
build:
	npx webpack --mode production
