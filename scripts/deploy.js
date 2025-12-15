import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { publish } from 'gh-pages'
import gitRepoInfo from 'git-repo-info'

const distDir = path.resolve('dist')
const gitlabCiPath = path.resolve('.gitlab-ci.yml')
const readmePath = path.resolve('README.md')
const stageDir = path.resolve('.deploy-tmp')

// if (!existsSync(distDir)) {
//   console.error('dist 폴더가 없습니다. 먼저 npm run build 를 실행하세요.')
//   process.exit(1)
// }

if (existsSync(stageDir)) {
  rmSync(stageDir, { recursive: true, force: true })
}
mkdirSync(stageDir)

const publicDir = path.join(stageDir, 'public')
cpSync(distDir, publicDir, { recursive: true })
const stagedGitlabCi = path.join(stageDir, '.gitlab-ci.yml')
const stagedReadme = path.join(stageDir, 'README.md')

if (existsSync(gitlabCiPath)) {
  copyFileSync(gitlabCiPath, stagedGitlabCi)
}

if (existsSync(readmePath)) {
  copyFileSync(readmePath, stagedReadme)
}

const messageFlagIndex = process.argv.indexOf('--message')
const customMessageRaw =
  messageFlagIndex !== -1 && process.argv[messageFlagIndex + 1]
    ? process.argv[messageFlagIndex + 1]
    : null

const sanitizeMessage = (value) =>
  value
    .replace(/^\s*["']?/, '')
    .replace(/["']?\s*$/, '')
    .replace(/\^/g, '')
    .trim()

const normalizedMessage =
  customMessageRaw !== null ? sanitizeMessage(customMessageRaw) : null

const customMessage =
  normalizedMessage && normalizedMessage.length > 0 ? normalizedMessage : null

const repoInfo = gitRepoInfo()
const commitMessage = repoInfo.commitMessage || 'manual deploy'
const deployMessage = customMessage
  ? `[DEPLOY] ${customMessage}`
  : `[DEPLOY] ${commitMessage}`

publish(
  stageDir,
  {
    branch: 'master',
    message: deployMessage,
    dotfiles: true,
    add: false,
  },
  (error) => {
    rmSync(stageDir, { recursive: true, force: true })
    if (error) {
      console.error('배포 실패:', error)
      process.exit(1)
    } else {
      console.log(`배포 완료 (branch: master, message: ${deployMessage})`)
    }
  }
)
