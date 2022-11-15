import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const DEFAULT_PROJECTS_ORDER = ensureExistenceOfProjects(['component-library', 'simple-spa-app', 'app-with-library']);

const [commandInput, ...projects] = process.argv.slice(2);
const commands = commandInput?.split('+') ?? []; // e.g. "install+build" -> ["install", "build"]
const projectsBuildOrder = projects.length ? projects : DEFAULT_PROJECTS_ORDER;

if (!commands.length) {
  console.log(redColor('No commands provided. Exiting.'));
  process.exit(1);
}

if (!projectsBuildOrder.length) {
  console.log(redColor('No projects provided. Exiting.'));
  process.exit(1);
}

console.log(greenColor(`[Info] Running commands: ${commands.join(' -> ')}`));
console.log(greenColor(`[Info] Projects build order: ${projectsBuildOrder.join(' -> ')} `));

const operations = {
  install: () => operateOnEach(projectsBuildOrder, install),
  ci: () => operateOnEach(projectsBuildOrder, ci),
  build: () => operateOnEach(projectsBuildOrder, build),
};

for (const command of commands) {
  const op = operations[command];
  if (op) {
    await op();
  } else {
    console.log(redColor(`[Error] Unknown command: ${command}`));
  }
}

async function operateOnEach(projects, op) {
  for (const project of projects) {
    console.log(greenColor(`[Info] ${op.name} ${project} `));
    await op(project);
  }
}

function install(project) {
  execSync(`npm install`, { cwd: project, stdio: 'inherit' });
}

function ci(project) {
  execSync(`npm ci`, { cwd: project, stdio: 'inherit' });
}

function build(project) {
  execSync(`npm run build`, { cwd: project, stdio: 'inherit' });
}

function greenColor(str) {
  return `\x1b[32m${str}\x1b[0m`;
}

function redColor(str) {
  return `\x1b[31m${str}\x1b[0m`;
}

function ensureExistenceOfProjects(projects) {
  const missingProjects = projects.filter((project) => !existsSync(project));
  if (missingProjects.length > 0) {
    throw new Error(`The following projects are missing: ${missingProjects.join(', ')}`);
  }
  return projects;
}
