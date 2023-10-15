RED='\033[0;31m'
NO_COLOR='\033[0m'
WORKSPACE_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo -e "-----------------------------------------"
echo "[Release Process] Build"
echo -e "-----------------------------------------"
yarn build || exit 1
echo -e "\n"

echo -e "-----------------------------------------"
echo "[Release Process] Check diff"
echo -e "-----------------------------------------"
if git diff --quiet -- . ':!package.json'; then
  echo "No changes found except for package.json."
else
  echo -e "${RED}Changes found (excluding package.json). Exiting...${NO_COLOR}"
  exit 1;
fi
echo -e "\n"

echo -e "-----------------------------------------"
echo "[Release Process] Pack"
echo -e "-----------------------------------------"
yarn rimraf artifacts
mkdir artifacts
yarn pack:crx
yarn pack:zip
mv key.pem ./artifacts/
echo -e "\n"

echo -e "-----------------------------------------"
echo "[Release Process] New Version"
echo -e "-----------------------------------------"
echo "workspace branch: $WORKSPACE_BRANCH"
echo "workspace version: $npm_package_version"
echo -e "\n"

echo -e "-----------------------------------------"
echo "[Release Process] Update workspace branch"
echo -e "-----------------------------------------"
git add package.json
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
