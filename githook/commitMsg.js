/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const BGred = '\x1b[41m';
const reset = '\x1b[0m';
const green = '\x1b[32m';
const magenta = '\x1b[35m';

const Example = '1. [FIX]: Some text';
const Example1 = '2. (PROJ-123,PROJ-432,PROJ-1344):[FIX]: Some text';
const Example2 = '3. (PROJ-123):[FIX]: Some text';

function main() {
  const rootDir = process.cwd();
  const commitFilePath = path.join(rootDir, '.git', 'COMMIT_EDITMSG');
  const commitMessage = fs.readFileSync(commitFilePath, 'utf8');

  // const regExp = /^\s?(?:\((PROJ-\d+(?:,PROJ-\d+)*)\):)?\[(FIX|FEAT|WIP|NONE|CHORE|CHANGE|UPDATE|REFACTOR|DOC|ADD|TEST|STYLE)]:\s*(?:(?!(ed\b|\.$)).)+$/
  const regExp =
    /^\s?(?:\((PROJ-\d+(?:,PROJ-\d+)*)\):)?\[(FIX|FEAT|WIP|NONE|CHORE|CHANGE|UPDATE|REFACTOR|DOC|ADD|TEST|STYLE)]:\s.+/;

  const valid = regExp.test(commitMessage);
  if (!valid) {
    console.log(
      BGred,
      "Aborting commit: the commit message doesn't comply with conventional commits standard.",
      reset,
    );
    console.log(
      green,
      '\n Example: \n',
      Example,
      '\n',
      Example1,
      '\n',
      Example2,
      reset,
    );
    process.exitCode = 1;
  } else {
    console.log(magenta, 'Your commit message is valid. 🚀🚀🚀 ', reset);
  }
}

main();
