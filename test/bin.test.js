import {describe, test, beforeEach, afterEach} from 'node:test'
import * as path from 'node:path'
import * as fs from 'node:fs'
import {tmpdir} from 'node:os'
import {spawnSync} from 'node:child_process'
/** @import { SpawnSyncOptions, SpawnSyncReturns } from 'node:child_process' */

describe('kagit', () => {
  const bin = path.resolve(import.meta.dirname, '..', 'bin', 'kagit.js')
  /** @type {string} */
  let cwd
  /** @type {SpawnSyncOptions} */
  let baseSpawnOptions

  beforeEach(() => {
    cwd = fs.mkdtempSync(path.join(tmpdir(), 'kagit-'))
    baseSpawnOptions = {cwd, encoding: 'utf8'}
    spawnSync('git', ['init'], baseSpawnOptions)
    spawnSync('npm', ['init', '-y'], baseSpawnOptions)

    const packageJson = path.resolve(cwd, 'package.json')
    const content = JSON.parse(fs.readFileSync(packageJson, 'utf8'))
    content.kagit = {'pre-commit': 'echo hi'}
    fs.writeFileSync(packageJson, JSON.stringify(content))
  })

  afterEach(() => {
    fs.rmSync(cwd, {force: true, recursive: true})
  })

  describe('installation', () => {
    test('success', (t) => {
      const spawn = spawnSync('node', [bin], baseSpawnOptions)
      t.assert.deepEqual(spawn.status, 0)

      const hooks = fs.readdirSync(path.resolve(cwd, '.git', 'hooks'))
      t.assert.deepEqual(hooks.length, 1)
      t.assert.deepEqual(hooks[0], 'pre-commit')
    })

    test('skipped', (t) => {
      const spawn = spawnSync('node', [bin], {
        ...baseSpawnOptions,
        env: {KAGIT_SKIP_INSTALL: '1'}
      })
      t.assert.deepEqual(spawn.status, 0)

      const hooks = fs.readdirSync(path.resolve(cwd, '.git', 'hooks'))
      t.assert.ok(hooks.length > 0)
    })
  })

  describe('hook', () => {
    test('success', (t) => {
      spawnSync('node', [bin], baseSpawnOptions)
      spawnSync('git', ['add', '.'], baseSpawnOptions)

      const commit = spawnSync(
        'git',
        ['commit', '-am', 'initial'],
        baseSpawnOptions
      )
      t.assert.deepEqual(commit.status, 0)
      t.assert.deepEqual(commit.stderr, 'hi\n')
    })

    test('skipped', (t) => {
      spawnSync('node', [bin], baseSpawnOptions)
      spawnSync('git', ['add', '.'], baseSpawnOptions)

      const commit = spawnSync('git', ['commit', '-am', 'initial'], {
        ...baseSpawnOptions,
        env: {...process.env, KAGIT_SKIP_HOOKS: '1'}
      })
      t.assert.deepEqual(commit.status, 0)
      t.assert.deepEqual(commit.stderr, '')
    })
  })
})
