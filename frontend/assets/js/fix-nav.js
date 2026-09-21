const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Atharv Jain\\Downloads\\SIH 2 honeychain';
const files = [
  { name: 'index.html', title: 'Home' },
  { name: 'problem.html', title: 'Problem' },
  { name: 'architecture.html', title: 'Architecture' },
  { name: 'dashboard.html', title: 'Dashboard' },
  { name: 'traceability.html', title: 'Traceability' },
  { name: 'verify.html', title: 'Verify' },
  { name: 'marketplace.html', title: 'Marketplace' },
  { name: 'economics.html', title: 'Economics' },
  { name: 'team.html', title: 'Team' }
];

// Read index.html to get the template header
let indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
let headerMatch = indexContent.match(/<header[\s\S]*?<\/header>/);

if (!headerMatch) {
    console.error("Could not find <header> in index.html");
    process.exit(1);
}
let baseHeader = headerMatch[0];

files.forEach(f => {
    let filePath = path.join(dir, f.name);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the existing header in this file with the base header
    let newContent = content.replace(/<header[\s\S]*?<\/header>/, baseHeader);
    
    // Now, we need to adjust the active state inside the newly injected header
    // First, remove the active state from "Home" in the base header if we are not on Home
    // Active class for Home: `text-[#E8A33D] font-medium transition-colors relative py-1 text-sm`
    // Inactive class: `text-[#F6F1E4]/80 font-normal transition-colors hover:text-[#E8A33D] duration-150 text-sm`
    
    const activeClasses = 'text-[#E8A33D] font-medium transition-colors relative py-1 text-sm';
    const inactiveClasses = 'text-[#F6F1E4]/80 font-normal transition-colors hover:text-[#E8A33D] duration-150 text-sm';
    
    // Reset all links to inactive
    files.forEach(linkFile => {
        // Regex to find any link matching this href
        const regex = new RegExp(`<a class="[^"]*" href="${linkFile.name}">\\s*${linkFile.title}(?:\\s*<span[^>]*><\\/span>)?\\s*<\\/a>`, 'g');
        newContent = newContent.replace(regex, `<a class="${inactiveClasses}" href="${linkFile.name}">${linkFile.title}</a>`);
    });

    // Set the active link for the current file
    const activeRegex = new RegExp(`<a class="${inactiveClasses.replace(/\//g, '\\/')}" href="${f.name}">${f.title}<\\/a>`);
    const activeHTML = `<a class="${activeClasses}" href="${f.name}">
          ${f.title}
          <span class="absolute bottom-0 left-0 w-full h-[2px] bg-[#E8A33D] rounded-full"></span>
</a>`;
    newContent = newContent.replace(activeRegex, activeHTML);

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated navigation for ${f.name}`);
});
console.log("Navigation update complete.");
