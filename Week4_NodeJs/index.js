const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program.argument('<file-path>');

program.parse();

const filePath = program.args[0];

try {
  const data = fs.readFileSync('abc.txt', 'utf8');
  const words = data.split(' ').length;
  console.log('You have '+words+' words in this file');
} catch (err) {
  console.error('Error reading file:', err);
}

