#!/usr/bin/env node
import f from 'fs'
import {resolve as r} from 'path'

let k = 'package.json',
  g = '.git',
  n = ' not found',
  x = process.exit,
  e = console.error,
  d = r(g, 'hooks')

if (process.env.KAGIT != '0') {
  f.existsSync(g) || e(g + n) || x(1)
  f.existsSync(k) || e(k + n) || x(1)

  f.rmSync(d, {force: true, recursive: true})
  f.mkdirSync(d, {recursive: true})

  k = JSON.parse(f.readFileSync(k, 'utf8')).kagit || {}
  for (g in k) f.writeFileSync(r(d, g), '#!/bin/sh\n' + k[g], {mode: 0o755})
}
