echo "Switching to master branch"
# git checkout master

echo "Building app..."
# npm run build

echo "Deploying files to server"
scp -r build/* merlino@141.147.1.193:/var/www/merlino/

# run

# chmod u+x deploy.sh
# ./deploy.sh