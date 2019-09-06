const GitLog = require('./src/git-log');
const MakeNotes = require('./src/make-notes')

const FILE_PATH = "./release-notes.txt";
var gitLog = new GitLog();
gitLog.getCurrentBranchCommits().then(output => {
    MakeNotes(FILE_PATH, output);
    console.log("Generated Notes: \n\n", output);
}).catch(error => {
    console.log("Release-Noter Error: ", error);
});