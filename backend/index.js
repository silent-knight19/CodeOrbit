const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { initRepo } = require('./controllers/init');
const { addFiles } = require('./controllers/add');

yargs(hideBin(process.argv))
  .command(
    'init',
    'Initialize a new git repository',
    () => {},
    () => {
      initRepo();
    }
  )
  .command(
    'add <file>',
    'Add Files to the staging area',
    (yargs) => {
      return yargs.positional('file', {
        describe: 'File to add to the staging area',
        type: 'string'
      });
    },
    (argv) => {
      addFiles(argv.file);
    }
  )
  .demandCommand(1, 'Please provide a command')
  .help()
  .argv;