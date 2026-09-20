#!/bin/sh
# WRBrain — 1-Command Universal Test Runner

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TEST_FILE="$SCRIPT_DIR/tests/run_all_tests.js"

# Check for Bun
if command -v "/Users/Chris David/.bun/bin/bun" >/dev/null 2>&1; then
  exec "/Users/Chris David/.bun/bin/bun" run "$TEST_FILE" "$@"
elif command -v bun >/dev/null 2>&1; then
  exec bun run "$TEST_FILE" "$@"
elif command -v node >/dev/null 2>&1; then
  exec node "$TEST_FILE" "$@"
elif [ -f "/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc" ]; then
  exec "/System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc" "$TEST_FILE" "$@"
else
  echo "Error: No JavaScript engine found (bun, node, or jsc)."
  exit 1
fi
