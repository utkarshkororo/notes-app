const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync('notes.json', 'utf-8'));
  } catch (err) {
    data = [];
  }
  return data;
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

exports.addNote = (title, body) => {
  const notes = loadNotes();

  const found = notes.find((note) => note.title === title);

  if (!found) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green.bgBlack.inverse.bold('New Note Added!'));
  } else {
    console.log(chalk.red.bgWhite.inverse.bold('Note title taken!'));
  }
};

exports.removeNote = (title) => {
  const notes = loadNotes();

  const foundIdx = notes.findIndex((note) => note.title === title);

  if (foundIdx != -1) {
    notes.splice(foundIdx, 1);
    saveNotes(notes);
    console.log(chalk.green.bgBlack.inverse.bold('Note deleted!'));
  } else {
    console.log(chalk.red.bgWhite.inverse.bold('Note title does not exist!'));
  }
};

exports.listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse.bold('Your Notes!'));

  notes.forEach((note, i) => {
    console.log(i + 1, note.title);
  });
};

exports.readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(`Title: ${note.title}`));
    console.log(note.body);
  } else {
    console.log(chalk.red.bgWhite.inverse('Note not found!'));
  }
};
