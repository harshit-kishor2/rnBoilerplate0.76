/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// Get folder name from terminal argument
const folderName = process.argv[2];
if (!folderName) {
  console.error('Please provide a folder name');
  process.exit(1);
}

const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const smallFirstLetter = str => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

// Create screen folder
const screenFolderName = capitalizeFirstLetter(folderName);
fs.mkdir(`../src/views/${screenFolderName}`, {recursive: true}, err => {
  if (err) throw err;
  console.debug(`Folder ${screenFolderName} created successfully`);

  const fileName = screenFolderName + 'Screen';
  const styleFunctionName = smallFirstLetter(fileName) + 'Styles';

  // Create single index.tsx file
  const singleFileContent = `
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme';
import { useAppTranslation } from '@app/i18n';

const ${fileName}: React.FC = () => {
  const theme = useAppTheme();
  const translate = useAppTranslation();
  const styles = useMemo(() => ${styleFunctionName}(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text> {translate('greeting')} ${fileName}</Text>
    </View>
  );
};

export default ${fileName};

const ${styleFunctionName} = (theme: IAppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });
`;

  fs.writeFileSync(
    path.join(`../src/views/${screenFolderName}`, 'index.tsx'),
    singleFileContent,
    errWrite => {
      if (errWrite) throw errWrite;
      console.log(`index.tsx file created successfully in ${screenFolderName}`);
    }
  );

  // Append export to index.ts
  const exportToIndex = `export { default as ${fileName} } from './${screenFolderName}';\n`;

  fs.appendFile(`../src/views/index.ts`, exportToIndex, errExport => {
    if (errExport) throw errExport;
    console.log(`${fileName} added to index.ts successfully`);
  });
});
