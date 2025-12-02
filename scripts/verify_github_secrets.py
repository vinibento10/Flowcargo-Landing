#!/usr/bin/env python3
"""
GitHub Secrets Verification Script
Verifica se todos os 5 secrets obrigatórios foram adicionados corretamente ao repositório.

Uso:
    python3 scripts/verify_github_secrets.py --token <GITHUB_TOKEN>
    
    ou com variável de ambiente:
    export GITHUB_TOKEN=ghp_xxxxx
    python3 scripts/verify_github_secrets.py
"""

import os
import sys
import json
import argparse
import requests
from typing import Dict, List, Tuple
from datetime import datetime
from pathlib import Path


class GitHubSecretsVerifier:
    """Classe para verificar secrets do GitHub."""
    
    # Secrets obrigatórios
    REQUIRED_SECRETS = {
        "VITE_N8N_WEBHOOK_URL": {
            "description": "Webhook URL do n8n para ROI reports",
            "pattern": r"^https://n8n\.",
            "example": "https://n8n.mindlinklab.com.br/webhook/roi-report"
        },
        "VITE_PDFMONKEY_API_KEY": {
            "description": "API Key do PDFMonkey",
            "pattern": r"^[a-zA-Z0-9_-]{20,}$",
            "example": "sk_live_xxxxx"
        },
        "VERCEL_TOKEN": {
            "description": "Token de autenticação do Vercel",
            "pattern": r"^[a-zA-Z0-9_-]{20,}$",
            "example": "vercel_xxxxx"
        },
        "VERCEL_ORG_ID": {
            "description": "ID da organização no Vercel",
            "pattern": r"^[a-zA-Z0-9]{20,}$",
            "example": "team_xxxxx"
        },
        "VERCEL_PROJECT_ID": {
            "description": "ID do projeto no Vercel",
            "pattern": r"^[a-zA-Z0-9]{20,}$",
            "example": "prj_xxxxx"
        }
    }
    
    # Secrets opcionais
    OPTIONAL_SECRETS = {
        "SLACK_WEBHOOK_URL": "Webhook do Slack para notificações",
        "VITE_ANALYTICS_ENDPOINT": "Endpoint de analytics",
        "VITE_ANALYTICS_WEBSITE_ID": "ID do website no analytics"
    }
    
    def __init__(self, token: str, owner: str = "vinibento10", repo: str = "Flowcargo-Landing"):
        """
        Inicializar verificador.
        
        Args:
            token: GitHub Personal Access Token
            owner: Proprietário do repositório
            repo: Nome do repositório
        """
        self.token = token
        self.owner = owner
        self.repo = repo
        self.base_url = "https://api.github.com"
        self.headers = {
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json"
        }
        self.results = {
            "required": {},
            "optional": {},
            "errors": []
        }
    
    def verify_token(self) -> bool:
        """Verificar se o token é válido."""
        try:
            response = requests.get(
                f"{self.base_url}/user",
                headers=self.headers,
                timeout=10
            )
            if response.status_code == 200:
                user = response.json()
                print(f"✅ Token válido - Usuário: {user['login']}")
                return True
            else:
                print(f"❌ Token inválido: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Erro ao validar token: {str(e)}")
            return False
    
    def get_secrets(self) -> Dict[str, bool]:
        """
        Obter lista de secrets do repositório.
        
        Returns:
            Dicionário com nomes de secrets existentes
        """
        try:
            response = requests.get(
                f"{self.base_url}/repos/{self.owner}/{self.repo}/actions/secrets",
                headers=self.headers,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                secrets = {secret["name"]: True for secret in data.get("secrets", [])}
                return secrets
            else:
                error_msg = f"Erro ao obter secrets: {response.status_code}"
                self.results["errors"].append(error_msg)
                print(f"❌ {error_msg}")
                return {}
        except Exception as e:
            error_msg = f"Exceção ao obter secrets: {str(e)}"
            self.results["errors"].append(error_msg)
            print(f"❌ {error_msg}")
            return {}
    
    def verify_required_secrets(self, existing_secrets: Dict[str, bool]) -> Tuple[int, int]:
        """
        Verificar secrets obrigatórios.
        
        Args:
            existing_secrets: Dicionário de secrets existentes
            
        Returns:
            Tupla (encontrados, total)
        """
        found = 0
        total = len(self.REQUIRED_SECRETS)
        
        print("\n📋 Verificando Secrets Obrigatórios:")
        print("=" * 60)
        
        for secret_name, secret_info in self.REQUIRED_SECRETS.items():
            if secret_name in existing_secrets:
                print(f"✅ {secret_name}")
                print(f"   └─ {secret_info['description']}")
                self.results["required"][secret_name] = "✅ Encontrado"
                found += 1
            else:
                print(f"❌ {secret_name}")
                print(f"   └─ {secret_info['description']}")
                print(f"   └─ Exemplo: {secret_info['example']}")
                self.results["required"][secret_name] = "❌ Não encontrado"
        
        return found, total
    
    def verify_optional_secrets(self, existing_secrets: Dict[str, bool]) -> Tuple[int, int]:
        """
        Verificar secrets opcionais.
        
        Args:
            existing_secrets: Dicionário de secrets existentes
            
        Returns:
            Tupla (encontrados, total)
        """
        found = 0
        total = len(self.OPTIONAL_SECRETS)
        
        print("\n📋 Verificando Secrets Opcionais:")
        print("=" * 60)
        
        for secret_name, description in self.OPTIONAL_SECRETS.items():
            if secret_name in existing_secrets:
                print(f"✅ {secret_name}")
                print(f"   └─ {description}")
                self.results["optional"][secret_name] = "✅ Encontrado"
                found += 1
            else:
                print(f"⚪ {secret_name}")
                print(f"   └─ {description}")
                print(f"   └─ (Opcional - não configurado)")
                self.results["optional"][secret_name] = "⚪ Não configurado"
        
        return found, total
    
    def generate_report(self, required_found: int, required_total: int, 
                       optional_found: int, optional_total: int) -> None:
        """
        Gerar relatório final.
        
        Args:
            required_found: Secrets obrigatórios encontrados
            required_total: Total de secrets obrigatórios
            optional_found: Secrets opcionais encontrados
            optional_total: Total de secrets opcionais
        """
        print("\n" + "=" * 60)
        print("📊 RELATÓRIO FINAL")
        print("=" * 60)
        
        # Status geral
        all_required = required_found == required_total
        status_emoji = "✅" if all_required else "❌"
        status_text = "COMPLETO" if all_required else "INCOMPLETO"
        
        print(f"\n{status_emoji} Status Geral: {status_text}")
        print(f"\n📌 Secrets Obrigatórios: {required_found}/{required_total}")
        
        if all_required:
            print("   ✅ Todos os secrets obrigatórios foram configurados!")
        else:
            missing = required_total - required_found
            print(f"   ❌ Faltam {missing} secret(s) obrigatório(s)")
        
        print(f"\n📌 Secrets Opcionais: {optional_found}/{optional_total}")
        if optional_found == optional_total:
            print("   ✅ Todos os secrets opcionais foram configurados!")
        elif optional_found > 0:
            print(f"   ⚪ {optional_found} de {optional_total} configurados")
        else:
            print("   ⚪ Nenhum secret opcional configurado")
        
        # Detalhes
        print("\n" + "=" * 60)
        print("📝 DETALHES")
        print("=" * 60)
        
        print("\nSecrets Obrigatórios:")
        for secret, status in self.results["required"].items():
            print(f"  {status} {secret}")
        
        if self.results["optional"]:
            print("\nSecrets Opcionais:")
            for secret, status in self.results["optional"].items():
                print(f"  {status} {secret}")
        
        if self.results["errors"]:
            print("\n⚠️  Erros Encontrados:")
            for error in self.results["errors"]:
                print(f"  ❌ {error}")
        
        # Instruções
        if not all_required:
            print("\n" + "=" * 60)
            print("📖 PRÓXIMOS PASSOS")
            print("=" * 60)
            print("\n1. Acesse: https://github.com/vinibento10/Flowcargo-Landing/settings/secrets/actions")
            print("2. Clique em 'New repository secret'")
            print("3. Adicione os secrets faltantes:")
            
            missing_secrets = [
                name for name, status in self.results["required"].items()
                if "Não encontrado" in status
            ]
            
            for secret_name in missing_secrets:
                info = self.REQUIRED_SECRETS[secret_name]
                print(f"\n   • {secret_name}")
                print(f"     Descrição: {info['description']}")
                print(f"     Exemplo: {info['example']}")
        
        # Resumo JSON
        print("\n" + "=" * 60)
        print("💾 RESUMO (JSON)")
        print("=" * 60)
        print(json.dumps(self.results, indent=2, ensure_ascii=False))
        
        # Salvar relatório
        self.save_report(required_found, required_total, optional_found, optional_total)
    
    def save_report(self, required_found: int, required_total: int,
                   optional_found: int, optional_total: int) -> None:
        """Salvar relatório em arquivo."""
        report_dir = Path("reports")
        report_dir.mkdir(exist_ok=True)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_file = report_dir / f"secrets_verification_{timestamp}.json"
        
        report_data = {
            "timestamp": datetime.now().isoformat(),
            "repository": f"{self.owner}/{self.repo}",
            "summary": {
                "required": {
                    "found": required_found,
                    "total": required_total,
                    "complete": required_found == required_total
                },
                "optional": {
                    "found": optional_found,
                    "total": optional_total
                }
            },
            "details": self.results
        }
        
        with open(report_file, "w") as f:
            json.dump(report_data, f, indent=2, ensure_ascii=False)
        
        print(f"\n💾 Relatório salvo em: {report_file}")
    
    def run(self) -> bool:
        """
        Executar verificação completa.
        
        Returns:
            True se todos os secrets obrigatórios estão configurados
        """
        print("🔍 Iniciando verificação de GitHub Secrets...")
        print("=" * 60)
        
        # Verificar token
        if not self.verify_token():
            return False
        
        # Obter secrets existentes
        existing_secrets = self.get_secrets()
        if not existing_secrets and not self.results["errors"]:
            print("⚠️  Nenhum secret encontrado no repositório")
        
        # Verificar secrets obrigatórios
        required_found, required_total = self.verify_required_secrets(existing_secrets)
        
        # Verificar secrets opcionais
        optional_found, optional_total = self.verify_optional_secrets(existing_secrets)
        
        # Gerar relatório
        self.generate_report(required_found, required_total, optional_found, optional_total)
        
        # Retornar sucesso se todos os obrigatórios estão presentes
        return required_found == required_total


def main():
    """Função principal."""
    parser = argparse.ArgumentParser(
        description="Verificar GitHub Secrets do repositório FlowCargo Landing",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos de uso:
  python3 scripts/verify_github_secrets.py --token ghp_xxxxx
  export GITHUB_TOKEN=ghp_xxxxx && python3 scripts/verify_github_secrets.py
  python3 scripts/verify_github_secrets.py --owner vinibento10 --repo Flowcargo-Landing
        """
    )
    
    parser.add_argument(
        "--token",
        help="GitHub Personal Access Token (ou use GITHUB_TOKEN env var)",
        default=os.getenv("GITHUB_TOKEN")
    )
    parser.add_argument(
        "--owner",
        help="Proprietário do repositório",
        default="vinibento10"
    )
    parser.add_argument(
        "--repo",
        help="Nome do repositório",
        default="Flowcargo-Landing"
    )
    
    args = parser.parse_args()
    
    # Validar token
    if not args.token:
        print("❌ Erro: GitHub token não fornecido")
        print("\nUse uma das opções:")
        print("  1. --token ghp_xxxxx")
        print("  2. export GITHUB_TOKEN=ghp_xxxxx")
        print("\nObter token em: https://github.com/settings/tokens")
        sys.exit(1)
    
    # Executar verificação
    verifier = GitHubSecretsVerifier(args.token, args.owner, args.repo)
    success = verifier.run()
    
    # Retornar código de saída apropriado
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
