echo -e "-----------------------------------------"
echo "[Release Process] Install packages"
echo -e "-----------------------------------------"
yarn install
echo -e "\n"

echo -e "-----------------------------------------"
echo "[Release Process] Build"
echo -e "-----------------------------------------"
yarn build
echo -e "\n"

echo -e "-----------------------------------------"
echo "[Release Process] Pack"
echo -e "-----------------------------------------"
yarn pac
yarn zip
echo -e "\n"

git diff --exit-code
