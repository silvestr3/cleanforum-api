openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048 2>/dev/null
openssl rsa -pubout -in private_key.pem -out public_key.pem 2>/dev/null

private_b64=$(cat private_key.pem | base64 -w0)
public_b64=$(cat public_key.pem | base64 -w0)

echo "JWT_PRIVATE_KEY=\"$private_b64\""
echo
echo "JWT_PUBLIC_KEY=\"$public_b64\""

rm *_key.pem