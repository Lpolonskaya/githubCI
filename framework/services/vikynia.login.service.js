import supertest from 'supertest';
import urls from '../config/urls';


const VikunjaLogin = {
  post_login: async (credentials) => {
    const r = await supertest(`${urls.vikunja}`).post(`api/v1/login`).set('Content-Type', 'application/json').send(credentials);
    return r;
  },
};

export default VikunjaLogin;
