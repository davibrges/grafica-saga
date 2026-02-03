#!/bin/bash

set -e

echo "🔄 Syncing with GitHub..."

# garante que está no repo
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "❌ Not inside a git repository."
  exit 1
}

# vai para main
git checkout main

# busca atualizações
git fetch origin
git pull --rebase origin main

echo "📂 Checking for changes..."

git status --short

git add .

# se nada mudou, sai
if git diff --cached --quiet; then
  echo "⚠️ No changes to commit."
else
  TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
  git commit -m "deploy: update site @ $TIMESTAMP"
  git push origin main
  echo "✅ Changes pushed to GitHub."
fi

echo "" 
echo "ℹ️ Make sure all files are saved in VS Code."
read -p "❓ Close VS Code now? (y/N): " close

if [[ "$close" == "y" || "$close" == "Y" ]]; then
  pkill -f code || true
  echo "🧹 VS Code closed."
fi

echo "🏁 Deploy finished."