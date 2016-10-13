#!/bin/sh

if [ "$TRAVIS_PULL_REQUEST" = "false" ]
then
  echo -e "Starting to update README.md\n"
  echo -e "Configure Git username and email\n"
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"
 
  git branch

  echo -e "git add README.md\n"
  git add README.md
  echo -e "git commit\n"
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed README.md update to master"
  git checkout master
  git merge HEAD@{1}
  echo -e "push to master\n"
  git remote add origin-master https://"${GH_TOKEN}"@github.com/JSystemsTech/backbone-collection-predefined-filters.git > /dev/null 2>&1
  git push --quiet --set-upstream origin-master master

  echo -e "Pushed README.md update\n"
fi