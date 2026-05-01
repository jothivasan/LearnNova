const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(path.join(dirPath, '/', file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(srcDir);

let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Major component blocks / layouts 
  content = content.replace(/brutal-shadow-sm/g, 'shadow-sm rounded-xl');
  content = content.replace(/brutal-shadow/g, 'shadow-md rounded-2xl');
  
  // High stress text to clean text
  content = content.replace(/font-display font-black text-(xs|sm|base|lg|xl) tracking-widest uppercase/g, 'font-semibold text-$1');
  content = content.replace(/font-display text-xs font-bold tracking-widest uppercase/g, 'font-medium text-sm text-text-muted');
  content = content.replace(/font-display text-\[10px\] tracking-widest text-text-muted uppercase/g, 'font-medium text-xs text-text-muted');
  content = content.replace(/font-display text-\[10px\] tracking-widest uppercase/g, 'font-medium text-xs');
  content = content.replace(/font-display text-xs tracking-widest text-text-muted uppercase/g, 'font-medium text-sm text-text-muted');
  content = content.replace(/font-display font-black/g, 'font-semibold');
  content = content.replace(/font-black/g, 'font-bold');
  content = content.replace(/tracking-widest uppercase/g, 'font-medium');
  content = content.replace(/uppercase tracking-widest/g, 'font-medium');
  content = content.replace(/uppercase tracking-tighter/g, 'tracking-tight');
  content = content.replace(/tracking-\[.*?\] uppercase/g, 'tracking-normal font-medium');

  // Hard borders and boxes
  content = content.replace(/border border-border bg-surface p-/g, 'border border-border bg-surface rounded-2xl p-');
  content = content.replace(/border border-border bg-dark p-/g, 'border border-border bg-surface-light rounded-2xl p-');
  
  // Specific Buttons
  content = content.replace(/bg-accent text-dark/g, 'bg-accent text-white');
  content = content.replace(/bg-dark text-accent/g, 'bg-surface-light text-accent');
  content = content.replace(/hover:bg-dark hover:text-accent border border-transparent hover:border-accent/g, 'hover:bg-accent/90 border border-transparent');
  content = content.replace(/hover:bg-text hover:text-dark/g, 'hover:bg-surface-light hover:text-text');
  content = content.replace(/border border-text text-text/g, 'border border-border text-text bg-surface hover:bg-surface-light');

  // Misc 
  content = content.replace(/bg-dark/g, 'bg-surface-light');
  content = content.replace(/font-serif italic/g, 'font-sans text-text-muted');
  content = content.replace(/text-stroke-accent/g, 'text-accent');
  content = content.replace(/text-stroke/g, 'text-text-muted');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated: ${file.replace(srcDir, '')}`);
  }
});

console.log(`\nFinished replacing brutalist terminology. Total files updated: ${changedFiles}`);
