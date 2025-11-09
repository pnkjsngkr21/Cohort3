const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
    .name('todo-cli')
    .description('A simple CLI to manage your TODOs')
    .version('0.8.0');

program.command('add')
    .description('Add a new TODO')
    .argument('<todo>', 'The TODO item to add')
    .action((todo) => {
        if (!todo.trim()) {
            console.error('Cannot add an empty TODO item.');
            return;
        }
        if (!fs.existsSync('todos.txt')) {
            fs.writeFileSync('todos.txt', '');
        }
        fs.appendFileSync('todos.txt', todo + '\n');
        console.log(`Added TODO: "${todo}"`);
    });

program.command('list')
    .description('List all TODOs')
    .action(() => {
        if (!fs.existsSync('todos.txt')) {
            console.log('No TODOs found.');
            return;
        }
        const todos = fs.readFileSync('todos.txt', 'utf8').trim().split('\n');
        if (todos.length === 0 || (todos.length === 1 && todos[0] === '')) {
            console.log('No TODOs found.');
            return;
        }
        console.log('Your TODOs:');
        todos.forEach((todo, index) => {
            console.log(`${index + 1}. ${todo}`);
        });
    });

program.command('delete')
    .description('Delete a TODO by its number')
    .argument('<number>', 'The number of the TODO item to delete')
    .action((number) => {
        const index = parseInt(number) - 1;
        if (isNaN(index) || index < 0) {
            console.error('Please provide a valid TODO number to delete.');
            return;
        }
        if (!fs.existsSync('todos.txt')) {
            console.log('No TODOs found.');
            return;
        }
        const todos = fs.readFileSync('todos.txt', 'utf8').trim().split('\n');
        if (index >= todos.length) {
            console.error('TODO number out of range.');
            return;
        }
        const removed = todos.splice(index, 1);;
        fs.writeFileSync('todos.txt', todos.join('\n') + (todos.length ? '\n' : ''));
        console.log(`Deleted TODO: "${removed[0]}"`);
    });

program.parse();