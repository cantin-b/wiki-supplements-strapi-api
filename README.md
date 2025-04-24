# 🚀 Getting started with Strapi

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```


---

## 🔐 Automated Database Backup to Google Drive

You can dump your PostgreSQL database and automatically upload the dump to a private Google Drive folder using the following custom scripts.


### 🔧 Setup

1. Add your Google service account key (JSON) to the `keys/` directory (already gitignored).
2. Update your `.env` file with:

```env
GOOGLE_KEY_PATH=./keys/your-google-key.json
```


### Make the dump script executable once:

```bash
chmod +x ./scripts/dump-db.sh
```


### Dump your database 

```bash
npm run backup:db
```
This will create a .sql file in the backups/ directory (which is gitignored by default).


### Upload the latest dump to Google Drive

```bash
npm run backup:upload
```

This will automatically upload the most recent .sql dump to your SupplementoPedia DB DUMPS folder on Google Drive (via the service account).

Make sure the service account has Editor access to the target Drive folder.

