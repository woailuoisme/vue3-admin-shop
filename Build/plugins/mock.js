import {viteMockServe} from 'vite-plugin-mock';

export default (mode) => {
  const prodMock = true
  // const {VITE_SERVICE_ENV = 'dev'} = env;
  return viteMockServe({
    mockPath: 'mock',
    localEnabled: mode === 'dev',
    prodEnabled: mode === 'prod' && prodMock,
    injectCode: `
		import { setupMockServer } from '../mock';
		setupMockServer();
	`
  });
}
