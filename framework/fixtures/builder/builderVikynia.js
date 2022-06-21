import constants from "../../config/constants";
import api from "../../services";


export const BuilderRegLogin = async () => {
   
  const credentials = {
    "email": constants.email,
    "password": constants.password,
    "username": constants.username,
  };
  const r = await api().VikunjaRegister().post_register(credentials);
  const cred = {
    "long_token": true,
    "password": constants.password,
    "username": constants.username
  };
  const response = await api().VikunjaLogin().post_login(cred);
  const jsonData = response.body;
  const token = jsonData.token;
  return token;    
};

export const BuilderNamespace = async (token) => {
  const response = await api().VikunjaNamespaces().get_namespaces(token);
  const jsonData = response.body;
  const namespaceID = jsonData[0].id;
  return namespaceID;    
};

export const BuilderList = async (token) => {
  const namespaceID = await BuilderNamespace(token);
  const list = constants.list;
  list.namespace_id = namespaceID;
  const response = await api().VikunjaNamespaces().put_createList(namespaceID,token,list);
  const jsonData = response.body;
  const listID = jsonData.id;
  return [namespaceID, listID];   
};








