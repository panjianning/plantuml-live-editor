npm run build;
git add . && git commit -m "$1" && git push origin master;
cp dist/* ../puml-dist -Rf && cd ../puml-dist && git add . && git commit -m "$1" && git push origin gh-pages && cd ../puml || exit ;

