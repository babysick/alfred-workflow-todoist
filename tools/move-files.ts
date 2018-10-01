const shell = require('shelljs')

const argv = Object.assign([], process.argv)
argv.splice(0, 2)
const call: 'moveToTemp' | 'moveFromTemp' | undefined = argv.shift()

const dataPath = `${
  process.env.HOME
}/Library/Application Support/Alfred 3/Workflow Data/com.alfred-workflow-todoist`
const cachePath = `${
  process.env.HOME
}/Library/Caches/com.runningwithcrayons.Alfred-3/Workflow Data/com.alfred-workflow-todoist`
const cwd = process.cwd()
const TEMP_FOLDER = 'assets'

function noop() {
  console.log('Please try: ts-node tools/move-files.ts [call]\n\n\tcall: moveToTemp | moveFromTemp')
}

function moveToTemp() {
  shell.cp('dist/workflow/info.plist', `${TEMP_FOLDER}/info.plist`)
  shell.cp('dist/workflow/icon.png', `${TEMP_FOLDER}/icon.png`)
  // shell.cp('-R', 'dist/workflow/images/', `${TEMP_FOLDER}/images`)
}

function moveFromTemp() {
  shell.cp(`${TEMP_FOLDER}/info.plist`, 'dist/workflow/info.plist')
  shell.cp(`${TEMP_FOLDER}/icon.png`, 'dist/workflow/icon.png')
  // shell.cp('-R', `${TEMP_FOLDER}/images/`, 'dist/workflow/images/')

  shell.rm('-rf', `${TEMP_FOLDER}/info.plist`)
  shell.rm('-rf', `${TEMP_FOLDER}/icon.png`)
  // shell.rm('-rf', `${TEMP_FOLDER}/images/`)
}

if (call === 'moveToTemp') {
  moveToTemp()
} else if (call === 'moveFromTemp') {
  moveFromTemp()
} else {
  noop()
}