import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';

const TEST_COMMAND = {
  name: 'test',
  description: 'Test to see if f1buddy is running',
  type: 1,
  integration_types: [0, 1],
  context: [0, 1, 2],
}

const RACE = {
  name: 'race',
  description: 'Get latest Race results',
  type: 1,
  integration_types: [0, 1],
  context: [0, 1, 2],
}

const QUALI = {
  name: 'quali',
  description: 'Get latest Qualifying results',
  type: 1,
  integration_types: [0, 1],
  context: [0, 1, 2],
}

const FP3 = {
  name: 'fp3',
  description: 'Get latest Free Practice 3 results',
  type: 1,
  integration_types: [0, 1],
  context: [0, 1, 2],
}

const FP2 = {
  name: 'fp2',
  description: 'Get latest Free Practice 2 results',
  type: 1,
  integration_types: [0, 1],
  context: [0, 1, 2],
}

const FP1 = {
  name: 'fp1',
  description: 'Get latest Free Practice 1 results',
  type: 1,
  integration_types: [0, 1],
  context: [0, 1, 2],
}

const SPRINTQ = {
  name: 'sprintq',
  description: 'Get latest Sprint Qualifying results',
  type: 1,
  integration_types: [0, 1],
  context: [0, 1, 2],
}

const SPRINTR = {
  name: 'sprintr',
  description: 'Get latest Sprint Race results',
  type: 1,
  integration_types: [0, 1],
  context: [0, 1, 2],
}



const ALL_COMMANDS = [TEST_COMMAND, RACE, QUALI, FP3, FP2, FP1, SPRINTQ, SPRINTR];
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);