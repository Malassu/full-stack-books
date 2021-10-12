VENV = .venv
export VIRTUAL_ENV := $(abspath ${VENV})
export PATH := ${VIRTUAL_ENV}/bin:${PATH}

${VENV}:
	python3 -m venv $@

requirements: requirements.txt | ${VENV}
	pip install -r requirements.txt

test:
	${VENV}/bin/pytest

lint:
	${VENV}/bin/pylint *.py

clean:
	rm -rf .venv
