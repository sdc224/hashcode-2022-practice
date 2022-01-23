import * as fs from "fs";
import * as path from "path";

import parse, { readScore } from "./parser";
import score from "./scorer";
import solve from "./solver";
import write, { writeScore } from "./writer";

const INPUT_DIRECTORY = "inputs";
const OUTPUT_DIRECTORY = "solutions";
const SCORES_DIRECTORY = "best_scores";
const INPUTS_PATH = path.join(__dirname, "..", INPUT_DIRECTORY);

//reads every input case, parses the content and computes the solution and the score. If the score is better than the best cached score, saves the output to file
fs.readdir(INPUTS_PATH, (err, files) => {
	if (err) return console.error(err);
	files.forEach((file) => {
		const input_path = path.join(INPUTS_PATH, file);
		const output_path = input_path
			.replace(INPUT_DIRECTORY, OUTPUT_DIRECTORY)
			.replace(".in", ".out");
		const score_path = input_path
			.replace(INPUT_DIRECTORY, SCORES_DIRECTORY)
			.replace(".in", ".score");
		const data = parse(input_path);
		const solution = solve(data);
		const points = score(data, solution);
		const best_score = readScore(score_path);
		console.log(
			`Case ${file}: solution score`,
			points,
			"best score",
			best_score
		);
		if (points > best_score) {
			write(solution, output_path);
			writeScore(points, score_path);
		}
	});
});
