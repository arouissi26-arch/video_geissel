import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import {dirname, join, resolve} from 'node:path';
import {tmpdir} from 'node:os';
import chromium, {inflate, setupLambdaEnvironment} from '@sparticuz/chromium';

const [command, ...args] = process.argv.slice(2);
if (!command) throw new Error('Usage: node scripts/remotion-cli.mjs <render|still> [Remotion arguments]');
const root = process.cwd();
const require = createRequire(import.meta.url);
const cliEntry = resolve(root, 'node_modules/@remotion/cli/remotion-cli.js');
if (!existsSync(cliEntry)) throw new Error('Remotion CLI is missing. Run npm install first.');

const hasBrowserFlag = args.some((arg) => arg === '--browser-executable' || arg.startsWith('--browser-executable='));
let browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || null;
if (!browserExecutable && process.platform === 'linux' && !hasBrowserFlag) {
  // The sandbox cannot download Remotion's browser from remotion.media. Use the
  // npm-hosted headless Chromium build and its Amazon Linux compatibility libs.
  const entry = require.resolve('@sparticuz/chromium');
  const packageRoot = resolve(dirname(entry), '..');
  const al2023 = join(packageRoot, 'bin', 'al2023.tar.br');
  if (!existsSync(join(tmpdir(), 'al2023', 'lib', 'libnspr4.so'))) {
    await inflate(al2023);
  }
  setupLambdaEnvironment(join(tmpdir(), 'al2023', 'lib'));
  browserExecutable = await chromium.executablePath();
}

const finalArgs = [command, ...args];
if (browserExecutable && !hasBrowserFlag) finalArgs.push(`--browser-executable=${browserExecutable}`);
const result = spawnSync(process.execPath, [cliEntry, ...finalArgs], {stdio: 'inherit', env: process.env});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
