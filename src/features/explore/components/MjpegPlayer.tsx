import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { WebView } from "react-native-webview";

interface MjpegPlayerProps {
    // 절대 URL (http://host:port/video/{droneId}) 형태의 MJPEG 스트림 주소.
    streamUrl: string;
    style?: StyleProp<ViewStyle>;
}

// MJPEG(multipart/x-mixed-replace) 스트림은 RN 기본 <Image> 로 재생되지 않아
// WebView 안의 <img> 태그로 렌더링한다. (드론 서버 /test 모니터와 동일한 방식)
function buildHtml(streamUrl: string): string {
    const safe = streamUrl.replace(/"/g, "&quot;");
    return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<style>
  html, body { margin:0; padding:0; height:100%; background:#000; overflow:hidden; }
  .wrap { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
  img { width:100%; height:100%; object-fit:contain; display:block; }
  .msg { color:#888; font-family:-apple-system, sans-serif; font-size:14px; text-align:center; padding:0 16px; }
</style>
</head>
<body>
  <div class="wrap">
    <img src="${safe}"
         onerror="this.style.display='none';document.getElementById('msg').style.display='block';" />
    <div id="msg" class="msg" style="display:none;">드론 영상을 불러올 수 없습니다.</div>
  </div>
</body>
</html>`;
}

export default function MjpegPlayer({ streamUrl, style }: MjpegPlayerProps) {
    return (
        <WebView
            originWhitelist={["*"]}
            source={{ html: buildHtml(streamUrl), baseUrl: streamUrl }}
            style={style}
            scrollEnabled={false}
            javaScriptEnabled
            domStorageEnabled={false}
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback
            // 백엔드/드론 서버가 http 라서 Android WebView 에서 cleartext 허용 필요.
            mixedContentMode="always"
        />
    );
}
