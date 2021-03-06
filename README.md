# create-fastify-app

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/) [![Coverage Status](https://coveralls.io/repos/github/davidedantonio/create-fastify-app/badge.svg?branch=master)](https://coveralls.io/github/davidedantonio/create-fastify-app?branch=master) [![Build Status](https://travis-ci.com/davidedantonio/create-fastify-app.svg?branch=master)](https://travis-ci.com/davidedantonio/create-fastify-app) [![Greenkeeper badge](https://badges.greenkeeper.io/davidedantonio/create-fastify-app.svg)](https://greenkeeper.io/) ![npm-version](https://img.shields.io/npm/v/create-fastify-app.svg)

Create Fastify App is an utility that help you to generate or add plugin to your [Fastify](https://github.com/fastify/fastify) project. This mean that you can easily:

- Generate a Fastify Project, also from a given swagger file.
- Generate a service skeleton in existing Fastify Project.
- Add fastify-cors plugin in existing Fastify Project.
- Add fastify-mongodb plugin in existing Fastify Project.
- Add fastify-redis plugin in existing Fastify Project.
- Add fastify-postgres plugin in existing Fastify Project.

## Install

If you want to use `create-fastify-app` you must first install globally on your machine

```
npm install -g create-fastify-app
```

## Usage

```
Generate Fastify projects and utilities:

  create-fastify-app [command] <options>

Command
  generate:project     Generate a ready to use Fastify project
  generate:service     Generate service skeleton source in given project
  add:mysql            Add fastify-mysql plugin in given project folder
  add:mongo            Add fastify-mongodb plugin in given project folder
  add:cors             Add fastify-cors plugin in given project folder
  add:redis            Add fastify-redis plugin in given project folder
  add:postgres         Add fastify-postgres plugin in given project folder

Options

  -d, --directory
      Fastify project folder

  -h, --help
      Show this help message
```

Except for `generate:project` command the others work on an existent project created with `create-fastify-app`.

### `generate:project`

Generate a new Fastify project run following command

```
create-fastify-app generate:project -d <project-folder>
```

If `-d`, or `--directory`, option is omitted the new project will be created in curret folder. At this point further information will be asked:

- **Application Name**: the application name.
- **Description**: a short description non how the application do.
- **Author**: the application author.
- **Email**: the application email author.
- **Version**: semver version.
- **Keywords**: a list of comma separated keywords.
- **License**: the application license.
- **Swagger File**: a swagger file to start from (YAML or JSON).

After providing these information the entire application skeleton will be created for you. Simply run

```
cd /your/wonderful/application
npm install
npm run dev
```

#### Project structure

By default `create-fastify-app` generate a project structured in this way:

```
/your/wonderful/application
├── README.md
├── app
│   ├── app.js
│   ├── plugins
│   │   ├── README.md
│   │   └── support.js
│   └── services
│       ├── README.md
│       ├── hello
│       │   └── index.js
│       └── root.js
├── args.js
├── help
│   └── start.txt
├── package.json
├── server.js
└── test
    ├── helper.js
    ├── plugins
    │   └── support.test.js
    └── services
        ├── example.test.js
        └── root.test.js
```

The `app` folder contains all you need to develop your application. In particular, she contains the following directories:

- `plugins`: here you can add all your plugins you need into you application.
- `services`: here you can develop all the endpoint you need for your application, or the generated endpoint if you give a swagger file at project creation.
- `test`: here you can declare all your test.


The `package.json` file comes with three predefined npm task:

```diff
"scripts": {
  "test": "tap test/**/*.test.js",
  "start": "node server.js",
  "dev": "node server.js -l info -P"
}
```

* `npm test`: runs the test
* `npm start`: start your application
* `npm run dev`: start your application with [`pino-colada`](https://github.com/lrlna/pino-colada) pretty logging

#### Options

You can pass the following options via command line with `node server.js <options>`. Every options has the corresponding environment variable:

|  Description | Short command | Full command | Environment variable |
| ------------- | ------------- |-------------| ----- |
| The application file to start | `-f` | `--file` | `FASTIFY_FILE` |
| Port to listen on (default to 3000) | `-p` | `--port` | `FASTIFY_PORT or PORT` |
| Address to listen on | `-a` | `--address` | `FASTIFY_ADDRESS` |
| Log level (default to fatal) | `-l` | `--log-level` | `FASTIFY_LOG_LEVEL` |
| Prints pretty logs | `-P` | `--pretty-logs` | `FASTIFY_PRETTY_LOGS` |
| Use custom options | `-o` | `--options` | `FASTIFY_OPTIONS` |
| Set the prefix | `-r` | `--prefix` | `FASTIFY_PREFIX` |
| Set the plugin timeout | `-T` | `--plugin-timeout` | `FASTIFY_PLUGIN_TIMEOUT` |
| Defines the maximum payload, in bytes,<br>the server is allowed to accept |  | `--body-limit` | `FASTIFY_BODY_LIMIT` |

#### Generate a project from a swagger file

When you generate a new project you can give in input a swagger file. In an api driven project this feature can be very important because `create-fastify-app` will generate all your project endpoints for you. You will only have to worry about the development of the various endpoints.

If you give in input the [Petstore](https://editor.swagger.io/?_ga=2.5251579.932457202.1552732701-831465500.1549699944) swagger file given as example on [Swagger.io](https://swagger.io), you can see that `create-fastify-app` automatically generate a project with `fastify-swagger` already configured and ready to use in your project. If you take a look at `/documentation` endpoint you'll find something like that:

![swagger-example](./swagger.png)

In your `app/services` folder you'll find your endpoints folder

```
./app/services
├── README.md
├── pet
│   ├── index.js
│   └── routes.schema.js
├── root.js
├── store
│   ├── index.js
│   └── routes.schema.js
└── user
    ├── index.js
    └── routes.schema.js
```

### `generate:service`

This command allow you to generate a new service skeleton for your api. You simply run

```
create-fastify-app generate:service -d <project-folder>
```

And give some information such as:

- **Service Name**: The name of the service you want to generate
- **Methods to implement**: GET, POST, PUT, DELETE etc.
- **Api Prefix**: The prefix url (for example `/api`)

Moreover the command generate for you a small set of test foreach methods.

### `add:mongo`

If you want to easily add the [`fastify-mongodb`](https://github.com/fastify/fastify-mongodb) plugin to your application this command is all you need. Just simply run

```
create-fastify-app add:mongo -d <project-folder>
```

And give some information such as:

- **MongoDB Host**: your MongoDB host.
- **MongoDB Port**: your MongoDB port.
- **MongoDB Collection**: your default collection.
- **MongoDB User**: your MongoDB user.
- **MongoDB Password**: your MongoDB password.

At this point the command add the `fastify-mongodb` to you application with the given information for your [MongoDB](https://www.mongodb.com) connection.

### `add:mysql`

If you want to easily add the [`fastify-mysql`](https://github.com/fastify/fastify-mysql) plugin to your application this command is all you need. Just simply run

```
create-fastify-app add:mysql -d <project-folder>
```

And give some information such as:

- **MySQL Host**: your MySQL host.
- **MySQL Port**: your MySQL port.
- **MySQL Database**: your default database.
- **MySQL User**: your MySQL user.
- **Mysql Password**: your MySQL password.

At this point the command add the `fastify-mysql` to you application with the given information for your [MySQL](https://www.mysql.com) connection.

### `add:redis`

If you want to easily add the [`fastify-redis`](https://github.com/fastify/fastify-redis) plugin just simply run

```
create-fastify-app add:redis -d <project-folder>
```

And give some information such as:

- **Redis Host**: your redis host
- **Redis Port**: your redis port
- **Redis Password**: your redis password, if you have one.
- **Redis Index**: your redis index

exactly as the `add:mongo` and `add:mysql` command `add:redis` add the plugin into your application plugins folder with the given information for your [Redis](https://redis.io) connection.

### `add:cors`

If you want to easily add the [`fastify-cors`](https://github.com/fastify/fastify-cors) plugin just simply run

```
create-fastify-app add:cors -d <project-folder>
```

And give some information such as:

- **Method**: at least one of DELETE, PATCH, POST, PUT, HEAD, OPTIONS

after the choises `fastify-cors` plugin will be added in your application.

### `add:postgres`

If you want to easily add the [`fastify-postgres`](https://github.com/fastify/fastify-postgres) plugin to your application this command is all you need. Just simply run

```
create-fastify-app add:postgres -d <project-folder>
```

And give some information such as:

- **Postgres Host**: your Postgres host.
- **Postgres Port**: your Postgres port.
- **Postgres Database**: your default database.
- **Postgres User**: your Postgres user.
- **Postgres Password**: your Postgres password.

At this point the command add the `fastify-postgres` to you application with the given information for your [Postgres](https://www.postgresql.org/) connection.

## Contributing

If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.

The code follows the Standard code style.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Acknowledgements

It is inspired by the [fastify-cli](https://github.com/fastify/fastify-cli) project. Some part have been extracted from it.

This project is kindly sponsored by [Webeetle s.r.l.](http://webeetle.com)

## License

Licensed under [MIT](./LICENSE).