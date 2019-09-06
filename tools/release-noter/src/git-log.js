const childProcess = require("child_process");

function execute(command) {
    return new Promise(function (resolve, reject) {
        childProcess.exec(command, function (error, stdOutput, stdError) {
            if (error) {
                reject();

                return;
            }

            if (stdError) {
                reject(stdError);

                return;
            }

            resolve(stdOutput);
        });
    });
}

module.exports = function () {
    this.getCurrentBranchCommits = function () {
        return new Promise(async (resolve, reject) => {
            try {
                var result = await execute('git log --pretty=format:"{\\"line\\":{\\"child-parent\\":\\"%p\\",\\"subject\\":\\"%s\\""}},');
                result = JSON.parse("[" + result.substring(0, result.length - 1) + "]");
                var element;
                var lines = "";
                for (var i = 0; i < result.length; i++) {
                    element = result[i];
                    if ((element["line"]["child-parent"]).split(" ").length > 1) {
                        break;
                    }
                    lines = lines + (element["line"]["child-parent"]).split(" ")[0] + " - " +element["line"]["subject"] + "\n";
                }
                // console.log(lines)
                resolve(lines)
            } catch (error) {
                reject({
                    origin: "GIT-LOG",
                    error: error
                })
            }
        })
    }
}