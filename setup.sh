#!/usr/bin/env bash
set -euo pipefail

if [[ -z "$(find . -mindepth 1 -maxdepth 1 -not -name .git -print -quit)" ]]; then
  npx create-expo-app@latest . --template blank-typescript
fi

npx expo install expo-router expo-sqlite expo-system-ui react-native-safe-area-context react-native-screens

printf '%s\n' 'Setup complete. Run `npx expo start --tunnel` and scan the QR code with Expo Go.'