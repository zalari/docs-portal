#! /usr/bin/env node

const args = require('yargs').argv;
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const target = args.t || args.target;
const docs = args.docs ? args.docs.split(' ') : undefined;
const name = args.name || 'index.html';
const title = args.title || 'Documentation portal';
const charset = args.charset || 'utf-8';
const language = args.language || 'en';
const usage = `
Usage: docs-portal COMMAND

Generates a static index.html file providing iframe based access to documents in subfolders relative to it.
The template is based on Material lite (https://getmdl.io) and will be customizable in a future release.

Options:

  ARGUMENT          DEFAULT                 MANDATORY   DESCRIPTION
-------------------------------------------------------------------------------------------------------------------------
  -t, --target                              yes         The target to generate and lookup folders
      --charset     utf-8                   no          The document charset
      --docs                                no          Force manually which folders to show by passing a string (e.g. 'foo bar')
      --language    en                      no          The document language
      --name        index.html              no          The name of the file to write
      --title       Documentation portal    no          The portal title
`;

// check mandatory arguments
if (!target) {
    console.log(usage);
    process.exit(0);
}

// get folders to show
const template = fs.readFileSync(path.join(__dirname, 'index.ejs'), charset);
const folders = docs || fs.readdirSync(target).filter(file => fs.statSync(path.join(target, file)).isDirectory());

// render markup (ejs to html)
const html = ejs.render(template, {
    title: title,
    language: language,
    charset: charset,
    folders: folders
});

// save to destination
fs.writeFile(path.join(target, name), html, (error) => {
    if (error) {
        return console.log(error);
    }

    console.log(`The portal has been generated to ${path.join(target, name)} for the docs:\n\t* ${folders.join('\n\t* ')}`);
});
