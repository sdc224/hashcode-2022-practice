import * as fs from "fs";
import * as path from "path";

import parse, { readScore } from "./parser";
import score from "./scorer";
import solve from "./solver";
import write, { writeScore } from "./writer";

const INPUT_DIRECTORY = "inputs";
const OUTPUT_DIRECTORY = "solutions";
const SCORES_DIRECTORY = "bestScores";
const INPUTS_PATH = path.join(__dirname, "..", INPUT_DIRECTORY);

//reads every input case, parses the content and computes the solution and the score. If the score is better than the best cached score, saves the output to file
fs.readdir(INPUTS_PATH, (err, files) => {
	if (err) return console.error(err);
	files.forEach((file) => {
		const inputPath = path.join(INPUTS_PATH, file);
		const outputPath = inputPath
			.replace(INPUT_DIRECTORY, OUTPUT_DIRECTORY)
			.replace(".in", ".out");
		const scorePath = inputPath
			.replace(INPUT_DIRECTORY, SCORES_DIRECTORY)
			.replace(".in", ".score");

		const data = parse(inputPath);
		const solution = solve(data);
		const points = score(data, solution);
		const bestScore = readScore(scorePath);

		console.log(
			`Case ${file}: solution score`,
			points,
			"best score",
			bestScore
		);

		if (points > bestScore) {
			write(solution, outputPath);
			writeScore(points, scorePath);
		}
	});
});
