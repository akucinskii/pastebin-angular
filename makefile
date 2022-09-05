deps-ui:
	- cd ui && npm i
deps-api:
	- cd api && npm i
deps:
	-make -j 2 deps-ui deps-api


run-ui:
	- cd ui && ng serve
run-api:
	- cd api && npm run dev
run:
	- make -j 2 run-ui run-api
