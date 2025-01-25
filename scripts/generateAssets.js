/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Utility function to get all file names from a given directory
const getFileNames = (dir, extensions) => {
  return fs
    .readdirSync(dir)
    .filter(file =>
      extensions.includes(path.extname(file).toLowerCase().substring(1)),
    )
    .map(file => file);
};

// Function to generate imports for images, GIFs, and Lottie files
const generateImports = (fileNames, folderPath, type) => {
  let imports = fileNames
    .map(name => {
      const baseName = path.parse(name).name.toUpperCase().replace(/\s/g, '_');
      if (type === 'IMAGE') {
        return `${baseName}_IMAGE: require('./${name}')`;
      } else if (type === 'GIF') {
        return `${baseName}_GIF: require('./${name}')`;
      } else if (type === 'LOTTIE') {
        return `${baseName}_LOTTIE: require('./${name}')`;
      }
      return null;
    })
    .filter(Boolean)
    .join(',\n  ');

  const string = `const ${type}S = Object.freeze({
  ${imports}
});

export default ${type}S;
`;

  fs.writeFileSync(path.join(folderPath, 'index.ts'), string, 'utf8');
  console.log(
    `${type}S imports with Object.freeze have been generated in index.ts`,
  );
};

// Function to generate imports and frozen object for SVGs
const generateSVGEnum = (fileNames, folderPath) => {
  let imports = fileNames
    .map(name => {
      const baseName = path.parse(name).name.toUpperCase().replace(/\s/g, '_');
      return `import ${baseName}_ICON from './${name}';`;
    })
    .join('\n');

  let enumEntries = fileNames
    .map((name, index) => {
      const baseName = path.parse(name).name.toUpperCase().replace(/\s/g, '_');
      return `${baseName}= ${index + 1},`;
    })
    .join('\n  ');

  let mapperEntries = fileNames
    .map((name, index) => {
      const baseName = path.parse(name).name.toUpperCase().replace(/\s/g, '_');
      return `${index + 1}: ${baseName}_ICON,`;
    })
    .join('\n  ');

  const string = `/* eslint-disable no-unused-vars */
${imports}

export enum SVGIcons {
  ${enumEntries}
}

export const SVGIconsMapper = Object.freeze({
  ${mapperEntries}
});
`;

  fs.writeFileSync(path.join(folderPath, 'index.ts'), string, 'utf8');
  console.log(`SVG imports and frozen objects have been generated in index.ts`);
};

// Function to generate imports for all asset types
const generateAllImports = () => {
  const assetFolders = {
    Image: '../src/assets/images',
    Lottie: '../src/assets/lottie',
    GIF: '../src/assets/gif',
    SVG: '../src/assets/svg',
  };

  const extensions = {
    Image: ['png', 'jpeg', 'jpg', 'webp'],
    Lottie: ['json'],
    GIF: ['gif'],
    SVG: ['svg'],
  };

  // Loop through each asset type and generate the respective imports
  Object.keys(assetFolders).forEach(assetType => {
    const folderPath = assetFolders[assetType];
    const fileNames = getFileNames(folderPath, extensions[assetType]);

    if (assetType === 'SVG') {
      generateSVGEnum(fileNames, folderPath);
    } else {
      generateImports(fileNames, folderPath, assetType.toUpperCase());
    }
  });
};

// Main function to prompt user and generate appropriate imports
const runGenerator = async () => {
  const {assetType} = await inquirer.createPromptModule()([
    {
      type: 'list',
      name: 'assetType',
      message: 'Select the asset type you want to generate:',
      choices: ['Image', 'Lottie', 'GIF', 'SVG', 'All'],
    },
  ]);

  const assetFolder = {
    Image: '../src/assets/images',
    Lottie: '../src/assets/lottie',
    GIF: '../src/assets/gif',
    SVG: '../src/assets/svg',
  };

  const extensions = {
    Image: ['png', 'jpeg', 'jpg', 'webp'],
    Lottie: ['json'],
    GIF: ['gif'],
    SVG: ['svg'],
  };

  // Handle the 'All' option
  if (assetType === 'All') {
    generateAllImports();
  } else {
    const folderPath = assetFolder[assetType];
    const fileNames = getFileNames(folderPath, extensions[assetType]);

    if (assetType === 'Image') {
      generateImports(fileNames, folderPath, 'IMAGE');
    } else if (assetType === 'Lottie') {
      generateImports(fileNames, folderPath, 'LOTTIE');
    } else if (assetType === 'GIF') {
      generateImports(fileNames, folderPath, 'GIF');
    } else if (assetType === 'SVG') {
      generateSVGEnum(fileNames, folderPath);
    }
  }
};

// Run the generator
runGenerator();
