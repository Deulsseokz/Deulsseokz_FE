// plugins/with-provider-paths.js
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

/**
 * provider_paths.xml을 자동 생성하는 Config Plugin
 */
module.exports = function withProviderPaths(config) {
  return withDangerousMod(config, [
    'android',
    config => {
      const filePath = path.join(config.modRequest.projectRoot, 'android/app/src/main/res/xml/provider_paths.xml');

      // 디렉토리 없으면 생성
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      // 파일 내용 작성
      const xmlContent = `<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <cache-path name="cache" path="." />
    <external-cache-path name="external_cache" path="." />
    <files-path name="files" path="." />
    <external-files-path name="external_files" path="." />
</paths>`;

      fs.writeFileSync(filePath, xmlContent, 'utf8');
      console.log('✅ provider_paths.xml created or updated at:', filePath);

      return config;
    },
  ]);
};
