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
echo "[Release Process] Check diff"
echo -e "-----------------------------------------"
if git diff --quiet; then
  echo "No changes found."
else
  echo -e "${RED}Changes found. Exiting...${NO_COLOR}"
  exit 1;
fi
echo -e "\n"
