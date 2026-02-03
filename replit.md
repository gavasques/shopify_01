# BKZA - Tema Shopify Moderno

## Visão Geral
Tema Shopify personalizado para a BKZA (www.bkza.com.br), uma loja especializada em Macas Portáteis Estáticas e equipamentos profissionais para saúde e estética.

## Identidade Visual
- **Paleta de Cores**: Preto (#0A0A0A), Dourado (#C5A94D), Branco (#FFFFFF)
- **Estilo**: Moderno e minimalista
- **Tipografia**: Inter (sans-serif)
- **Logo**: Localizado em `assets/logo-dark.png` e `assets/logo-gold.png`

## Estrutura do Projeto
```
├── assets/           # CSS, JS, imagens e logos
│   ├── base.css      # Estilos base do tema
│   ├── bkza-custom.css # Estilos personalizados BKZA
│   ├── logo-dark.png # Logo versão escura
│   └── logo-gold.png # Logo versão dourada
├── config/           # Configurações do tema
│   ├── settings_data.json  # Cores e configurações
│   └── settings_schema.json
├── layout/           # Layouts principais
│   └── theme.liquid  # Layout principal
├── locales/          # Traduções
│   ├── pt-BR.json    # Português (Brasil)
│   └── en.default.json
├── sections/         # Seções do tema
│   ├── header-group.json  # Configuração do header
│   └── footer-group.json  # Configuração do footer
├── snippets/         # Componentes reutilizáveis
│   └── stylesheets.liquid # Importação de CSS
└── templates/        # Templates de páginas
    ├── index.json    # Homepage
    ├── product.json  # Página de produto padrão
    └── product.landing.json # Produto estilo landing page
```

## Templates Disponíveis
1. **Homepage (index.json)**: Hero banner, badges de confiança, produtos em destaque, CTA
2. **Produto Padrão (product.json)**: Layout tradicional de e-commerce
3. **Produto Landing Page (product.landing.json)**: Página de produto estilo landing page com:
   - Hero section com imagem grande
   - Seção de features/benefícios
   - Descrição completa
   - Produtos relacionados

## Color Schemes
- **Scheme 1**: Fundo branco (páginas de conteúdo)
- **Scheme 2**: Fundo preto (header, footer, hero sections)
- **Scheme 3**: Fundo cinza claro (seções alternadas)

## Servidor de Desenvolvimento
O projeto inclui um servidor Node.js (`server.js`) na porta 5000 para visualizar a estrutura de arquivos do tema.

## Deploy para Shopify
Para atualizar o tema na loja Shopify:
1. **Via GitHub**: Conectar repositório no admin da Shopify
2. **Via Shopify CLI**: `shopify theme push`
3. **Upload Manual**: Baixar como ZIP e fazer upload no admin

## Alterações Recentes
- Rebrand completo para identidade BKZA
- Nova paleta de cores (preto/dourado/branco)
- Template de produto estilo landing page
- Homepage otimizada para conversão
- Traduções em português brasileiro
- Header e footer atualizados com branding BKZA
