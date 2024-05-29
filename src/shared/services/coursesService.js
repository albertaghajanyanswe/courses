import { get } from './client';
import { apiEndpoints } from './configs';

export default {
  getCourses: async () => {
    const options = { url: apiEndpoints.courses };
    return get(options);
  },
};
