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
git diff --exit-code --quiet || echo -e "${RED}exit due to the presence of uncommitted files.${NO_COLOR}" && exit 1
echo -e "\n"

