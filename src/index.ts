
import parse, {read_score} from './parser'
import score from './scorer'
import write, {write_score} from './writer'
import solve from './solver'
import * as path from 'path'
import * as fs from 'fs'


const input_dir = "inputs"
const output_dir = "solutions"
const scores_dir = "best_scores"
const inputs_path = path.join(__dirname, "..", input_dir)

//reads every input case, parses the content and computes the solution and the score. If the score is better than the best cached score, saves the output to file
fs.readdir(inputs_path, (err, files) => {
    if(err) return console.error(err)
    files.forEach(file => {
        const input_path = path.join(inputs_path, file)
        const output_path = input_path.replace(input_dir, output_dir).replace(".in", ".out")
        const score_path = input_path.replace(input_dir, scores_dir).replace(".in", ".score")
        const data = parse(input_path)
        const solution = solve(data)
        const points = score(data, solution)
        const best_score = read_score(score_path)
        console.log(`Case ${file}: solution score`, points, "best score", best_score)
        if(points > best_score) {
            write(solution, output_path)
            write_score(points, score_path)
        }
    })
})

