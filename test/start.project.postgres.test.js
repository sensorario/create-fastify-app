'use strict'

const t = require('tap')
const { test } = t
const server = require('./workdir/server')
const path = require('path')
const { run, ENTER } = require('./helpers/inputify')
const { existsSync } = require('fs')

test('add postgres plugin and start server', (t) => {
  t.plan(3)

  run(
    ['create-fastify-app.js', 'add:postgres', '-d', `./test/workdir`],
    [
      `localhost${ENTER}`,
      `3306${ENTER}`,
      `test${ENTER}`,
      `root${ENTER}`,
      `${ENTER}`
    ]
  ).then(_ => {
    server.start(['-f', path.join(__dirname, 'workdir', 'app', 'app.js')], function (err, fastify) {
      t.error(err)
      t.ok(fastify.pg)

      fastify.close(() => {
        t.pass('server closed')
      })
    })
  })
})

test('add redis plugin and get error', (t) => {
  t.plan(1)

  run(
    ['create-fastify-app.js', 'add:postgres', '-d', `./test/workdir`],
    [
      `localhost${ENTER}`,
      `3211${ENTER}`,
      `test${ENTER}`,
      `${ENTER}`,
      `${ENTER}`
    ]
  ).then(out => {
    t.ok(out.indexOf('Postgres plugin already configured') !== -1)
  })
})

test('add postgres show help', (t) => {
  t.plan(1)

  run(
    ['create-fastify-app.js', 'add:postgres', '-h'],
    []
  ).then(out => {
    t.ok(out.indexOf('Generate Fastify projects and utilities') !== -1)
  })
})

test('add postgres error', (t) => {
  t.plan(1)

  run(
    ['create-fastify-app.js', 'add:postgres'],
    []
  ).then(out => {
    t.ok(out.indexOf('/app folder') !== -1)
  })
})

test('check postgres plugin files', (t) => {
  t.plan(3)

  t.ok(existsSync(path.join(__dirname, 'workdir', 'app')))
  t.ok(existsSync(path.join(__dirname, 'workdir', 'app', 'plugins')))
  t.ok(existsSync(path.join(__dirname, 'workdir', 'app', 'plugins', 'postgres.db.js')))
})
