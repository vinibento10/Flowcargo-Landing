#!/bin/bash

# Script auxiliar para verificar GitHub Secrets
# Uso: ./scripts/verify_secrets.sh [TOKEN]

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir com cor
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 não está instalado"
    exit 1
fi

# Obter token
TOKEN="${1:-$GITHUB_TOKEN}"

if [ -z "$TOKEN" ]; then
    print_error "GitHub token não fornecido"
    echo ""
    echo "Uso:"
    echo "  ./scripts/verify_secrets.sh ghp_xxxxx"
    echo "  export GITHUB_TOKEN=ghp_xxxxx && ./scripts/verify_secrets.sh"
    echo ""
    echo "Obter token em: https://github.com/settings/tokens"
    exit 1
fi

print_info "Verificando GitHub Secrets..."
echo ""

# Executar script Python
export GITHUB_TOKEN="$TOKEN"
python3 "$(dirname "$0")/verify_github_secrets.py" \
    --owner vinibento10 \
    --repo Flowcargo-Landing

exit_code=$?

if [ $exit_code -eq 0 ]; then
    print_success "Todos os secrets obrigatórios estão configurados!"
    echo ""
    print_info "Você pode agora fazer um push para disparar o CI/CD:"
    echo "  git commit --allow-empty -m 'test: trigger CI/CD'"
    echo "  git push origin main"
else
    print_error "Alguns secrets obrigatórios estão faltando"
    echo ""
    print_warning "Configure os secrets faltantes em:"
    echo "  https://github.com/vinibento10/Flowcargo-Landing/settings/secrets/actions"
fi

exit $exit_code
