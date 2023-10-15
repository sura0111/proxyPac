RED='\033[0;31m'
NO_COLOR='\033[0m'
WORKSPACE_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo -e "-----------------------------------------"
echo "[Release Process] New Version"
echo -e "-----------------------------------------"
echo "workspace branch: $WORKSPACE_BRANCH"
echo "workspace version: $npm_package_version"
echo -e "\n"

echo -e "-----------------------------------------"
echo "[Release Process] Update workdspace branch"
echo -e "-----------------------------------------"
git add -A
git commit -m "v$npm_package_version"
git push --quiet
echo -e "\n"

echo -e "-----------------------------------------"
echo "[Release Process] Create remote tag"
echo -e "-----------------------------------------"
git tag -a v$npm_package_version -m "v$npm_package_version"
git push origin v$npm_package_version
echo -e "\n"

echo -e "-----------------------------------------"
echo "[Release Process] Checkout to workspace branch"
echo -e "-----------------------------------------"
git checkout $WORKSPACE_BRANCH
echo -e "\n"

echo -e "\n\n-----------------------------------------"
echo "[Release Process] Successfully created $npm_package_version"
echo -e "-----------------------------------------\n"
