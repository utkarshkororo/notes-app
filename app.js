const yargs = require('yargs');
const notes = require('./notes');

/* fs.writeFileSync('notes.txt', 'This file was created by Node.js!');

fs.appendFileSync(
  'notes.txt',
  '\nNode.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser'
); */

/* console.log(chalk.greenBright.inverse.bold('Success!'));
console.log(chalk.magentaBright.bgWhiteBright.inverse.bold('Hello world!'));
 */

// console.log(process.argv); // argument values

// Customize yargs version
yargs.version('1.1.0');
// console.log(yargs.argv);

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    notes.removeNote(argv.title);
  },
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'List your note',
  handler: () => {
    notes.listNotes();
  },
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  },
});

yargs.parse();
