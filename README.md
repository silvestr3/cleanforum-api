# Clean Forum

Forum application API built with Nestjs, Clean Architecture and DDD

## How to start
1. Install dependencies:
```bash
npm install
```

2. Generate signing key pair:
```bash
chmod +x genkeys.sh
./genkeys.sh
```
And paste the output in your `.env` file

3. Start postgres and redis servers:
```bash
docker-compose up -d
```
4. Apply migrations:
```bash
npx prisma migrate deploy
```

5. Populate `.env` variables with Couldflare R2 or AWS S3 bucket info

6. Run development server with
```bash
npm run start:dev
```


## Testing

- Unit tests:
```bash
npm run test
```

- E2E tests:
You can create a separate R2/S3 bucket for end-to-end tests and override the `AWS_BUCKET_NAME` environment variable in the `.env.test` file

```bash
npm run test:e2e
```
