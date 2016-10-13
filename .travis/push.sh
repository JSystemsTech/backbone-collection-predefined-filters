#!/bin/sh

setup_git() {
  git config --global user.email "jsystemstech@gmail.com"
  git config --global user.name "Travis CI"
}

commit_website_files() {
  git checkout -b master
  git add . README.md
  git commit --message "Travis build: $TRAVIS_BUILD_NUMBER update README.md"
}

upload_files() {
  echo git remote add origin-master https://${GH_TOKEN}@github.com/JSystemsTech/backbone-collection-predefined-filters.git > /dev/null 2>&1
  git remote add origin-master https://${GH_TOKEN}@github.com/JSystemsTech/backbone-collection-predefined-filters.git > /dev/null 2>&1
  git push --quiet --set-upstream origin-master master 
}

setup_git
commit_website_files
upload_files