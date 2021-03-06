#!/bin/sh

if [ "$TRAVIS_PULL_REQUEST" = "false" ]
then
  echo -e "Starting to update Post Build files\n"
  echo "\n[travis-build-badge]: https://img.shields.io/badge/Travis%20Build%20%23-$TRAVIS_BUILD_NUMBER-4B0082.svg?style=flat" >> README.md
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"
  buildnumber=`cat version_number.txt`
  git add build_history.json
  git add README.md
  git add package.json
  git add ./dist/backbone-collection-predefined-filters.min.js
  git add ./dist/backbone-collection-predefined-filters.js
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed README.md & build_history.json update to master [ci skip]"
  git checkout master
  git merge HEAD@{1}
  git remote add origin-master https://"${GH_TOKEN}"@github.com/JSystemsTech/backbone-collection-predefined-filters.git > /dev/null 2>&1
  git tag "$buildnumber"
  git push --quiet --set-upstream origin-master master tag "$buildnumber"
  echo -e "Pushed Post Build files update\n"
fi