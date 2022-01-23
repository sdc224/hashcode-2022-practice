import * as fs from 'fs'

export type Input = {}

const parse = (file : string) : Input => {
    const data = fs.readFileSync(file, 'ascii')
    //TODO: transform 'data' to the input dataset according to the problem specs
    return {}
}
//reads the best score for the case stored in 'file', returns 0 otherwise
export const read_score = (file : string) : number => {    
    try {
        const data = fs.readFileSync(file, 'ascii')
        return parseFloat(data)
    } catch {
        return 0
    }
}

export default parse