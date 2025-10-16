// plugins/with-fileprovider.js
const { withAndroidManifest } = require('@expo/config-plugins');

/**
 * AndroidManifest.xml에 FileProvider 등록을 자동 추가하는 플러그인
 */
module.exports = function withFileProvider(config) {
  return withAndroidManifest(config, config => {
    const manifest = config.modResults.manifest;
    const application = manifest.application?.[0];

    if (!application) {
      console.warn('⚠️ [withFileProvider] No <application> tag found.');
      return config;
    }

    // 이미 FileProvider가 있으면 중복 추가 안 함
    const existingProviders = application.provider || [];
    const hasProvider = existingProviders.some(p =>
      p.$?.['android:name']?.includes('androidx.core.content.FileProvider'),
    );

    if (!hasProvider) {
      application.provider = [
        ...(application.provider || []),
        {
          $: {
            'android:name': 'androidx.core.content.FileProvider',
            'android:authorities': '${applicationId}.provider',
            'android:exported': 'false',
            'android:grantUriPermissions': 'true',
          },
          'meta-data': [
            {
              $: {
                'android:name': 'android.support.FILE_PROVIDER_PATHS',
                'android:resource': '@xml/provider_paths',
              },
            },
          ],
        },
      ];
    }

    return config;
  });
};
