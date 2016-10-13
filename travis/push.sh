#!/bin/sh

if [ "$TRAVIS_PULL_REQUEST" = "false" ]
then
  echo -e "Starting to update README.md\n"
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"
  git add README.md
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed README.md update to master [ci skip]"
  git checkout master
  git merge HEAD@{1}
  git remote add origin-master https://"${GH_TOKEN}"@github.com/JSystemsTech/backbone-collection-predefined-filters.git > /dev/null 2>&1
  git push --quiet --set-upstream origin-master master
  echo -e "Pushed README.md update\n"
fi