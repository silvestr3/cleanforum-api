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
