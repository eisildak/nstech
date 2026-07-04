#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# Hostinger Deploy Script — Nexus Global Certificate
# Domain: certificate-nexus-global.de
# ═══════════════════════════════════════════════════════════════
# Kullanım:
#   ./deploy.sh
#
# Hedef: Hostinger shared hosting — public_html/
# Aktarım: rsync over SSH (port 65002)
# ═══════════════════════════════════════════════════════════════

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}══════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Nexus Global Certificate — Deploy${NC}"
echo -e "${GREEN}  → certificate-nexus-global.de${NC}"
echo -e "${GREEN}══════════════════════════════════════════════${NC}"

# ── SSH Bilgileri ────────────────────────────────────────────
SSH_USER="u744325746"
SSH_HOST="147.93.93.195"
SSH_PORT="65002"
TARGET="${SSH_USER}@${SSH_HOST}:domains/certificate-nexus-global.de/public_html"

SSH_CMD="ssh -p $SSH_PORT -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"

# ── 1. Build yok (statik site) ───────────────────────────────
echo -e "\n${YELLOW}[1/3] Static site — build gerekmiyor${NC}"
echo -e "${GREEN}  ✓ HTML/CSS/JS dosyaları hazır${NC}"

# ── 2. Deploy ───────────────────────────────────────────────
echo -e "\n${YELLOW}[2/3] Sunucuya yükleniyor...${NC}"
echo -e "  → ${TARGET}"

# Sadece deploy edilmesi gereken dosyalar (node_modules, .git, .env HARİÇ)
rsync -avz --delete -e "$SSH_CMD" \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='.DS_Store' \
  --exclude='node_modules' \
  --exclude='n8n-workflows' \
  --exclude='.vscode' \
  --exclude='deploy.sh' \
  --exclude='MAIL_SETUP.md' \
  --exclude='CHATBOT_SETUP.md' \
  --exclude='SECURITY_ALERT.md' \
  --exclude='TODO.md' \
  --exclude='README.md' \
  --exclude='docs/' \
  ./ \
  "$TARGET/"

echo -e "${GREEN}  ✓ Dosyalar yüklendi${NC}"

# ── 3. Node.js kurulumu (express server) ─────────────────────
echo -e "\n${YELLOW}[3/3] Node.js bağımlılıkları kuruluyor...${NC}"
$SSH_CMD "${SSH_USER}@${SSH_HOST}" << 'ENDSSH'
  cd domains/certificate-nexus-global.de/public_html
  command -v npm && (npm install --production 2>/dev/null && echo "npm install OK" || echo "npm install failed, continuing...") || echo "npm not available on shared hosting (static site only)"
ENDSSH
echo -e "${GREEN}  ✓ Bağımlılıklar kontrol edildi${NC}"

echo -e "\n${GREEN}══════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ Deploy tamamlandı!${NC}"
echo -e "${GREEN}  → https://certificate-nexus-global.de${NC}"
echo -e "${GREEN}══════════════════════════════════════════════${NC}"
