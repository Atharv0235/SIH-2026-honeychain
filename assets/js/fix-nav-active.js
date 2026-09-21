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

let indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
let headerMatch = indexContent.match(/<header[\s\S]*?<\/header>/);

if (!headerMatch) {
    console.error("Could not find <header> in index.html");
    process.exit(1);
}
let baseHeader = headerMatch[0];

const activeClasses = 'text-[#E8A33D] font-medium transition-colors relative py-1 text-sm';
const inactiveClasses = 'text-[#F6F1E4]/80 font-normal transition-colors hover:text-[#E8A33D] duration-150 text-sm';

files.forEach(f => {
    let filePath = path.join(dir, f.name);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the existing header in this file with the base header
    let newContent = content.replace(/<header[\s\S]*?<\/header>/, baseHeader);
    
    // Strip any existing active span inside the nav (just in case)
    newContent = newContent.replace(/<span class="absolute bottom-0 left-0 w-full h-\[2px\] bg-\[#E8A33D\] rounded-full"><\/span>/g, '');
    // Reset all nav links to inactive classes
    newContent = newContent.replace(/text-\[#E8A33D\] font-medium transition-colors relative py-1 text-sm/g, inactiveClasses);
    
    // Now replace the specific link for the current page to be ACTIVE
    // E.g. find: <a class="inactiveClasses" href="f.name">
    let searchString = `<a class="${inactiveClasses}" href="${f.name}">\n          ${f.title}\n          \n</a>`; // for index.html edge case
    let searchString2 = `<a class="${inactiveClasses}" href="${f.name}">${f.title}</a>`; // for others
    
    let replaceString = `<a class="${activeClasses}" href="${f.name}">
          ${f.title}
          <span class="absolute bottom-0 left-0 w-full h-[2px] bg-[#E8A33D] rounded-full"></span>
</a>`;

    if (newContent.includes(searchString)) {
        newContent = newContent.replace(searchString, replaceString);
    } else if (newContent.includes(searchString2)) {
        newContent = newContent.replace(searchString2, replaceString);
    } else {
        // Fallback replacement if whitespace differs
        const regexStr = `<a class="${inactiveClasses.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*href="${f.name}"\\s*>\\s*${f.title}\\s*<\\/a>`;
        const fallbackRegex = new RegExp(regexStr);
        newContent = newContent.replace(fallbackRegex, replaceString);
    }

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated navigation for ${f.name}`);
});
console.log("Navigation update complete.");
