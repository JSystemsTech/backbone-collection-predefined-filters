#!/bin/sh

if [ "$TRAVIS_PULL_REQUEST" = "false" ]
then
  echo -e "Starting to update README.md\n"
  echo -e "Configure Git username and email\n"
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"

  echo -e pwd
  echo -e "git checkout master\n"
  git checkout -b master
 
  echo -e "git add README.md\n"
  git add README
  echo -e "git commit"
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed README.md update to master"

  echo -e "push to master\n"
  git remote add origin-master https://"${GH_TOKEN}"@github.com/JSystemsTech/backbone-collection-predefined-filters.git > /dev/null 2>&1
  git push --quiet --set-upstream origin-master master

  echo -e "Pushed README.md update\n"
fi