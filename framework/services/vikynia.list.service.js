import supertest from 'supertest';
import urls from '../config/urls';

const VikunjaList = {
  post_updateList: async (listID, list, token) => {
    const r = await supertest(`${urls.vikunja}`).post('api/v1/lists/' + listID).set('Content-Type', 'application/json').set('Authorization','Bearer ' + token).send(list);
    return r;
  },
  delete_list: async (listID, token) => {
    const r = await supertest(`${urls.vikunja}`).delete('api/v1/lists/' + listID).set('Content-Type', 'application/json').set('Authorization','Bearer ' + token);
    return r;
  },
};

export default VikunjaList;
