import * as fs from 'fs'
import asp from '@4a/asp'
import { load } from 'js-yaml'
import { extname } from 'path'
import { Project } from 'ts-morph'

function gen(filename: string) {
    const content = fs.readFileSync(filename, { encoding: 'utf-8' })
    const parsedYaml = load(content)
    const source = JSON.stringify(parsedYaml, null, 2)
    const defaultExportedJson = `
        const _default = ${source} as const
        export = _default
        export default _default
    `
    const project = new Project({
        compilerOptions: {
            declaration: true,
            emitDeclarationOnly: true,
        },
    })
    project.createSourceFile(
        filename.replace(extname(filename), '.ts'),
        defaultExportedJson,
        { overwrite: true }
    )
    project.emitSync()

    if (process.argv.includes('--debug')) {
        asp.debug(filename, '=>', filename.replace(extname(filename), '.d.ts'))
    }
}

export const run = async () => {
    process.argv
        .slice(2)
        .filter(file => file.match(/\.(yml|yaml)$/))
        .map(file => gen(file))
}
