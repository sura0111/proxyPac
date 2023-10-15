RED='\033[0;31m'
NO_COLOR='\033[0m'

echo -e "-----------------------------------------"
echo "[Release Process] Install packages"
echo -e "-----------------------------------------"
yarn install || exit 1
echo -e "\n"

