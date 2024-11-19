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
fs.mkdir(`../src/views/${screenFolderName}`, err => {
  if (err) throw err;
  console.debug(`Folder ${screenFolderName} created successfully`);

  const fileName = screenFolderName + 'Screen';
  const styleFileName = smallFirstLetter(fileName) + 'Styles';

  // Create hook file - useExampleScreen.ts
  const hookFile = `
import {useAppTheme} from '@app/theme';
import {useMemo} from 'react';
import ${styleFileName} from './${fileName}.style';
import {useAppTranslation} from '@app/i18n';

const use${fileName} = () => {
  const theme = useAppTheme();
  const t = useAppTranslation();
  const styles = useMemo(() => ${styleFileName}(theme), [theme]);
  return {
    styles,
    theme,
    t
  };
};

export default use${fileName};
`;

  fs.writeFileSync(
    path.join(`../src/views/${screenFolderName}`, `use${fileName}.ts`),
    hookFile,
    errHook => {
      if (errHook) throw errHook;
      console.log(`use${fileName}.ts file created successfully`);
    },
  );

  // Create style file - ExampleScreen.style.ts
  const styleFile = `
import {StyleSheet} from 'react-native';

const ${styleFileName} = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
  });

export default ${styleFileName};
`;

  fs.writeFileSync(
    path.join(`../src/views/${screenFolderName}`, `${fileName}.style.ts`),
    styleFile,
    errStyles => {
      if (errStyles) throw errStyles;
      console.log(`${fileName}.style.ts file created successfully`);
    },
  );

  // Create screen component - ExampleScreen.tsx
  const screenFile = `
import React from 'react';
import { View, Text } from 'react-native';
import use${fileName} from './use${fileName}';

const ${fileName} = () => {
  const { styles } = use${fileName}();

  return (
    <View style={styles.container}>
      <Text>${fileName}</Text>
    </View>
  );
};

export default React.memo(${fileName});
`;

  fs.writeFileSync(
    path.join(`../src/views/${screenFolderName}`, `${fileName}.tsx`),
    screenFile,
    errScreen => {
      if (errScreen) throw errScreen;
      console.log(`${fileName}.tsx file created successfully`);
    },
  );

  // Append export to index.ts
  const exportToIndex = `export { default as ${fileName} } from './${screenFolderName}/${fileName}';\n`;

  fs.appendFile(`../src/views/index.ts`, exportToIndex, errExport => {
    if (errExport) throw errExport;
    console.log(`${fileName} added to index.ts successfully`);
  });
});
