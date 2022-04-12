import * as process from 'process'
import * as cp from 'child_process'
import * as fs from 'fs'
import * as path from 'path'
import {afterAll, beforeAll, describe, expect, test} from '@jest/globals'

/* 
  The next line will fail because we use 'dotenv' package in order to manage inputs in environment variables (accessKey, secretAccessKey, etc...)
  => dotenv needs a ".env" file.
  Due to the presence of private elements, We strongly recommand TO NOT commit/push your .env file
  These tests are made for local, not to be triggered in a workflow.
*/
import 'dotenv/config'

const output = path.join(process.cwd(), 'output')

// shows how the runner will run a javascript action with env / stdout protocol©
describe('Download "dev" folder', () => {
  beforeAll(() => {
    process.env['INPUT_DESTINATION'] = output
    const np = process.execPath
    const ip = path.join(__dirname, '..', 'lib', 'main.js')
    const options: cp.ExecFileSyncOptions = {
      env: process.env
    }

    if (fs.existsSync(process.env['INPUT_DESTINATION'])) {
      fs.rmSync(process.env['INPUT_DESTINATION'], {recursive: true})
    }

    console.log(cp.execFileSync(np, [ip], options).toString())
  })

  describe('Images files', () => {
    const isImage = (f: string) => cp.execSync(`convert "${f}" /dev/null &> /dev/null; echo $?`).toString().replace(/\r?\n/g, '')

    describe('The command should return "1"', () => {
      test('If file does not exists', () => {
        expect(isImage('/this/file/does/not/exists')).toBe('1')
      })
      test('If file is not an image', () => {
        const file = path.join(output, 'dev', 'test.txt')
        cp.execSync(`echo "I am a text file" > ${file}`)
        expect(isImage(file)).toBe('1')
      })
    })

    test('"logo.png" should be an image', () => {
      expect(fs.existsSync(path.join(output, 'dev', 'images', 'logo.png'))).toBeTruthy()
      const file = path.join(output, 'dev', 'images', 'logo.png')
      expect(isImage(file)).toBe('0')
    })
    test('"qizuna-logo-small.jpg" should be an image', () => {
      const file = path.join(output, 'dev', 'images', 'qizuna-logo-small.jpg')
      expect(isImage(file)).toBe('0')
    })
  })

  afterAll(() => {
    if (fs.existsSync(output)) {
      fs.rmSync(output, {recursive: true})
    }
  })
})
