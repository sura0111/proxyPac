RED='\033[0;31m'
NO_COLOR='\033[0m'

echo -e "-----------------------------------------"
echo "[Release Process] Install packages"
echo -e "-----------------------------------------"
yarn install || exit 1
echo -e "\n"

echo -e "-----------------------------------------"
echo "[Release Process] Build"
echo -e "-----------------------------------------"
yarn build || exit 1
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
echo "[Release Process] Check diff"
echo -e "-----------------------------------------"
git diff --exit-code --quiet || (echo -e "${RED}exit due to the presence of uncommitted files.${NO_COLOR}" && exit 1)
echo -e "\n"


WORKSPACE_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo -e "-----------------------------------------"
echo "[Release Process] New Version"
echo -e "-----------------------------------------"

if [ -z "$1" ]; then
  echo -e "${RED}exit due to the version is not provided.${NO_COLOR}"
  exit 1;
fi

yarn version $1
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
