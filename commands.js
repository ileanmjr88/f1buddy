import 'dotenv/config';
import { capitalize, InstallGlobalCommands } from './utils.js';

const TEST_COMMAND = {
  name: 'test',
  description: 'Test to see if f1buddy is running',
  type: 1,
  integration_types: [0, 1],
  context: [0, 1, 2],
}






const ALL_COMMANDS = [TEST_COMMAND];
InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);