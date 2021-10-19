# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based web application using TypeScript. The main application code is located in the `app/` directory, which contains a basic Astro starter template.

## Development Commands

All commands should be run from the `app/` directory:

- `yarn install` - Install dependencies
- `yarn dev` - Start development server at localhost:4321
- `yarn build` - Build production site to ./dist/
- `yarn preview` - Preview build locally
- `yarn astro` - Run Astro CLI commands

## Architecture

- **Framework**: Astro v5.9.4 with TypeScript
- **Configuration**: TypeScript strict mode enabled via `astro/tsconfigs/strict`
- **Structure**: Standard Astro project structure with:
  - `src/layouts/` - Layout components (Layout.astro)
  - `src/pages/` - Page routes (index.astro)
  - `src/components/` - Reusable components (Welcome.astro)
  - `public/` - Static assets

## Key Files

- `app/astro.config.mjs` - Astro configuration (currently minimal)
- `app/tsconfig.json` - TypeScript configuration extending Astro strict presets
- `app/package.json` - Project dependencies and scripts