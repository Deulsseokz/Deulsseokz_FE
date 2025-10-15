// plugins/with-queries.js
const { withAndroidManifest } = require('@expo/config-plugins');

/**
 * 안드로이드 Manifest에 <queries>를 추가하는 플러그인
 * @param {object} config Expo config
 * @param {object} options { packages: string[] }
 */
module.exports = function withQueries(config, { packages = [] } = {}) {
  return withAndroidManifest(config, config => {
    const manifest = config.modResults.manifest;

    // <queries> 섹션이 없으면 새로 생성
    if (!manifest.queries) {
      manifest.queries = [{}];
    }

    const queries = manifest.queries[0];
    if (!queries.package) queries.package = [];

    // 이미 추가된 패키지 중복 방지
    const existing = new Set((queries.package || []).map(p => p.$['android:name']));

    packages.forEach(pkg => {
      if (!existing.has(pkg)) {
        queries.package.push({ $: { 'android:name': pkg } });
      }
    });

    return config;
  });
};
