'use strict';

const isCi = process.env.CI === 'true';
const isFastPackaging = process.env.FAST_PACKAGING === 'true';

const compression = isFastPackaging || !isCi ? 'store' : 'maximum';
// eslint-disable-next-line no-console
console.info(`Compression level: ${compression}`);

module.exports = {
  appId: 'com.YOUR_NAME_HERE.onboarding-project-template',
  copyright: 'Copyright © 2020 ${author}',
  asar: true,
  compression,
  mac: {
    identity: null,
    target: [
      {
        target: 'dmg',
        arch: 'x64',
      },
    ],
  },
  dmg: {
    format: 'ULFO',
  },
  win: {
    target: [
      {
        target: 'nsis',
        arch: 'x64',
      },
    ],
  },
  nsis: {
    artifactName: '${productName}-setup-${version}.${ext}',
    uninstallDisplayName: '${productName}',
    menuCategory: true,
    oneClick: false,
    perMachine: true,
    packElevateHelper: true,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: true,
  },
  linux: {
    target: [
      {
        target: 'AppImage',
        arch: 'x64',
      },
    ],
  },
  appImage: {
    artifactName: '${productName}.${ext}',
  },
};
