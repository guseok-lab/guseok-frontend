// Expo SDK 54 + @react-native-seoul/kakao-login 조합에서
// 'folly/coro/Coroutine.h' file not found 빌드 에러를 회피.
// 모든 Pod 에 GCC_PREPROCESSOR_DEFINITIONS=FOLLY_HAS_COROUTINES=0 을 강제로 박아
// folly/Expected.h 의 #if FOLLY_HAS_COROUTINES 분기를 끈다.
const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const PATCH_MARKER = "# >>> FOLLY_HAS_COROUTINES patch (do not edit)";
const PATCH_BLOCK = `
${PATCH_MARKER}
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)']
        unless config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'].include?('FOLLY_HAS_COROUTINES=0')
          config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FOLLY_HAS_COROUTINES=0'
        end
      end
    end
# <<< FOLLY_HAS_COROUTINES patch
`;

const withFollyCoroutinesFix = (config) =>
    withDangerousMod(config, [
        "ios",
        async (config) => {
            const podfilePath = path.join(
                config.modRequest.platformProjectRoot,
                "Podfile",
            );
            if (!fs.existsSync(podfilePath)) return config;

            let contents = fs.readFileSync(podfilePath, "utf8");
            if (contents.includes(PATCH_MARKER)) return config;

            if (contents.includes("post_install do |installer|")) {
                contents = contents.replace(
                    "post_install do |installer|",
                    `post_install do |installer|${PATCH_BLOCK}`,
                );
            } else {
                contents += `\npost_install do |installer|${PATCH_BLOCK}end\n`;
            }
            fs.writeFileSync(podfilePath, contents, "utf8");
            return config;
        },
    ]);

module.exports = withFollyCoroutinesFix;
