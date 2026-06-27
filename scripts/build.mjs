import { cpSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import compressing from 'compressing'

const FILE_NAME = 'StartNewTab'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const targetDir = path.join(__dirname, '../dist')
const packageDir = path.join(targetDir, 'package')
const target = path.join(targetDir, `${FILE_NAME}.zip`)
const source = path.join(__dirname, '../src')
const packageJsonPath = path.join(__dirname, '../package.json')
const manifestPath = path.join(source, 'manifest.json')

async function build() {
  assertManifestVersion()
  rmSync(targetDir, { recursive: true, force: true })
  mkdirSync(targetDir, { recursive: true })
  cpSync(source, packageDir, {
    recursive: true,
    filter: sourcePath => !path.basename(sourcePath).startsWith('.DS_'),
  })
  await compressing.zip.compressDir(packageDir, target, { ignoreBase: true })
  rmSync(packageDir, { recursive: true, force: true })
}

function assertManifestVersion() {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

  if (packageJson.version !== manifest.version)
    throw new Error(`Manifest version ${manifest.version} does not match package version ${packageJson.version}`)
}

build().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
