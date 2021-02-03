#!/usr/bin/env node

const fs = require('fs'); //requires all the modules needed from the file system
const util = require('util');
const chalk = require('chalk'); //enables coloring and bolding of files and folders when consoled
const path = require('path');

const {
    lstat
} = fs.promises;

const targetDir = process.argv[2] || process.cwd()

fs.readdir(process.cwd(), async (err, filenames) => { //process.cwd prints the current working directory
    if (err) {
        console.log(err);
    }

    const StatPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });

    const allStats = await Promise.all(StatPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(filenames[index]); //outputs filenames with their default color
        } else {
            console.log(chalk.yellow(filenames[index])); //outputs folders with a yellow color . chalk can be use with any color or any other transformation like bold
        }
    }
});