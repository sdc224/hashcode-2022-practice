import * as fs from "fs";
import { Solution } from "./solver";

const write = (solution: Solution, file: string) => {
	const data: string = "test+";
	//TODO: map the solution to the output file according to the specs of the problem
	fs.writeFileSync(file, data);
};

//caches the best score to file
export const write_score = (score: number, file: string) => {
	fs.writeFileSync(file, `${score}`);
};

export default write;
