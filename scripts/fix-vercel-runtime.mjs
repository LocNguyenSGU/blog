#!/usr/bin/env node
/**
 * Post-build script to fix Vercel runtime configuration.
 * The @astrojs/vercel adapter generates "nodejs24.x" which doesn't exist.
 * This script patches it to use "nodejs20.x".
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const configPath = join(process.cwd(), '.vercel/output/functions/_render.func/.vc-config.json');

if (existsSync(configPath)) {
  const config = JSON.parse(readFileSync(configPath, 'utf-8'));
  
  if (config.runtime === 'nodejs24.x') {
    config.runtime = 'nodejs20.x';
    writeFileSync(configPath, JSON.stringify(config, null, '\t'));
    console.log('✓ Fixed Vercel runtime: nodejs24.x → nodejs20.x');
  } else {
    console.log(`ℹ Runtime is already ${config.runtime}`);
  }
} else {
  console.log('⚠ No .vc-config.json found, skipping runtime fix');
}
