const fs = require('fs');
    const path = require('path');

    // Folders to ignore
    const IGNORE = ['node_modules', '.git', 'dist', 'build', '.vscode', 'coverage', '.DS_Store'];

    function printTree(dir, prefix = '') {
        let files = [];
        try {
            files = fs.readdirSync(dir);
        } catch (e) {
            return; 
        }

        // Filter ignored folders
        const filteredFiles = files.filter(file => !IGNORE.includes(file));

        filteredFiles.forEach((file, index) => {
            const isLast = index === filteredFiles.length - 1;
            const filePath = path.join(dir, file);
            
            let stats;
            try {
                stats = fs.statSync(filePath);
            } catch (e) {
                return;
            }
            
            // Print the file/folder
            const connector = isLast ? '---- ' : '|--- ';
            console.log(`${prefix}${connector}${file}`);

            // Recurse if directory
            if (stats.isDirectory()) {
                const newPrefix = prefix + (isLast ? '    ' : '|   ');
                printTree(filePath, newPrefix);
            }
        });
    }

    console.log(`Project Structure for: ${path.resolve('./')}`);
    printTree('./');
   
