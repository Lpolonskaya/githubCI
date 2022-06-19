import constants from "../../config/constants";
import api from "../../services";


export const BuilderReg = async () => {
  const credentials = {
    "email": constants.email,
    "password": constants.password,
    "username": constants.username,
  };
  const r = await api().VikunjaRegister().post_register(credentials);
  return r;
};

export const BuilderRegLogin = async () => {
   
  const credentials  = {
    "email": constants.email,
    "password": constants.password,
    "username": constants.username,
  };
  let response = await api().VikunjaRegister().post_register(credentials);
  const cred = {
    "long_token": true,
    "password": constants.password,
    "username": constants.username
  };
  response = await api().VikunjaLogin().post_login(cred);
  const jsonData = response.body;
  const token = jsonData.token;
  return token;    
};

export const BuilderNamespace = async () => {
  const credentials  = {
    "email": constants.email,
    "password": constants.password,
    "username": constants.username,
  };
  let response = await api().VikunjaRegister().post_register(credentials);
  const cred = {
    "long_token": true,
    "password": constants.password,
    "username": constants.username
  };
  response = await api().VikunjaLogin().post_login(cred);
  let jsonData = response.body;
  const token = jsonData.token;
  response = await api().VikunjaNamespaces().get_namespaces(token);
  jsonData = response.body;
  const namespaceID = jsonData[0].id;
  return [token, namespaceID];    
};

export const BuilderList = async () => {
  const cred = {
    "email": constants.email,
    "password": constants.password,
    "username": constants.username,
  };
  let response = await api().VikunjaRegister().post_register(cred);
  const credentials = {
    "long_token": true,
    "password": constants.password,
    "username": constants.username
  };
  response = await api().VikunjaLogin().post_login(credentials);
  let jsonData = response.body;
  const token = jsonData.token;  
  response = await api().VikunjaNamespaces().get_namespaces(token);
  jsonData = response.body;
  const namespaceID = jsonData[0].id;
  const list = constants.list;
  list.namespace_id = namespaceID;
  response = await api().VikunjaNamespaces().put_createList(namespaceID,token,list);
  jsonData = response.body;
  const listID = jsonData.id;
  return [token, namespaceID, listID];   
};








