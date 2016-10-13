#!/bin/sh

if [ "$TRAVIS_PULL_REQUEST" = "false" ]
then
  echo -e "Starting to update README.md\n"

  #cd to home and setup git
  cd "$HOME" || exit
  git config --global user.email "travis@travis-ci.org"
  git config --global user.name "Travis"

  cd master || exit
  git checkout -b master
 
  git add -f . README.md
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed README.md update to master"
  git push -fqu origin master > /dev/null

  git remote add origin-master https://"${GH_TOKEN}"@github.com/JSystemsTech/backbone-collection-predefined-filters.git > /dev/null 2>&1
  git push --quiet --set-upstream origin-master master

  echo -e "Pushed README.md update\n"
fi