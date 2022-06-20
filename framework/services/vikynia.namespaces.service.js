import supertest from 'supertest';
import urls from '../config/urls';


const VikunNamespaces = {
  get_namespaces: async (token) => {
    const r = await supertest(`${urls.vikunja}`).get('api/v1/namespaces').set('Content-Type', 'application/json').set('Authorization','Bearer ' + token);
    return r;
  },
  put_createList: async (namespaceID,token,list) => {
    const r = await supertest(`${urls.vikunja}`).put('api/v1/namespaces/' + namespaceID + '/lists').set('Content-Type', 'application/json').set('Authorization','Bearer ' + token).send(list);
    return r;
  },
};

export default VikunNamespaces;
