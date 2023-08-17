# FE BE Assignment

Assignment for jumbo FE-BE.

#### Test Credentials

```
email: yuvraj@example.com
password: password
```

Login with these credentials to get access token and then you'd need to pass that access token in `Authorization` header like `Bearer <token>` in order to access APIs.

FYI: login API endpoint is `/login`.

## TODOs:

- [x] Set up a new NestJS application using the Nest CLI.
- [x] Create a PostgreSQL database schema using TypeORM to store video data and user data.
- [x] Implement a cron job that fetches the latest videos from the YouTube API every 2 hours.
- [x] Implement user authentication using NestJS JWT utilities module.
- [x] Implement "Watch Later" functionality for authenticated users.
- [x] Protect the API endpoints related to video addition and deletion (Watch Later) so that only authenticated users can access them.
- [x] Create API endpoints to interact with the video data.
- [x] Implement caching to reduce the load on the YouTube API during frequent requests. (OPTIONAL)

## Setup

- Clone the repo.
- Create `.env` file. A `sample.env` file has been added for reference.

### Development

To setup locally on you system you'd need few dependencies:

- Nodejs 16
- Yarn 1.22
- Postgres 14

#### Steps

1. Install project dependencies.

```sh
yarn install
```

2. Create database in postgres.

```sql
CREATE DATABASE <dbname>;
```

3. Update `.env` file with postgres db name that you've just setup.

```env
...
POSTGRES_DB=<dbname>
```

4. You'd need `youtube` API key. You can refer to this website in order to know how to get this key. https://developers.google.com/youtube/v3/getting-started. After you get this key update that in the `.env` file.

```env
YOUTUBE_API_KEY=<key>
```

5. Run the app.

```sh
yarn start
```

You can access the app by going to `http://localhost:3000` in your browser.

### Production

To deploy on production we have `docker-compose.prod.yml` file, using this you can easily deploy the app with just a single command.

You'd need `docker` and `docker-compose` installed on you system. You can download both of those from here https://www.docker.com/.

#### Steps:

1. Update `.env` file according to the containers environment.

2. Start the container

```sh
docker-compose up -d
```

3. Your app should be available at `http://localhost:3000`. you can access to it by visiting this link in your browser.
