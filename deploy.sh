echo "Switching to master branch"
# git checkout master

echo "Building app..."
# npm run build

echo "Deploying files to server"
# we should have both private key and passwd link to the public key present in server
# or only the passwd if connection is made through user/passwd
# merlino user chould own the /var/www/merlino/ folder
scp -r dist/* merlino@141.147.1.193:/var/www/merlino/

# The nginx root => root /var/www/merlino/my-app-docker and APP_BASE_HREF = /my-app-docker
# cause the dist folder has my-app-docker folder
# And we get the site via: https://www.amtnet19.xyz/my-app-docker/
# if not: 
# The nginx root => root /var/www/merlino/
# And we get the site via: https://www.amtnet19.xyz/
# with https://www.amtnet19.xyz/ that point on ip-server:443 => 141.147.1.193:443

# run

# chmod u+x deploy.sh
# ./deploy.sh and provide the keyPass