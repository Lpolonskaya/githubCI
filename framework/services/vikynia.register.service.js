import supertest from 'supertest';
import urls from '../config/urls';


const VikunjaRegister = {
  post_register: async (credentials) => {
    const r = await supertest(`${urls.vikunja}`).post(`api/v1/register`).set('Content-Type', 'application/json').
    send(credentials);
    return r;
  },  
};

export default VikunjaRegister;
