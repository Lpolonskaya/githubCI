import constants from "../../config/constants";
import api from "../../services";


export const BuilderNamespace = async () => {
  const credentials = {
    "long_token": true,
    "password": constants.password,
    "username": constants.username
  };
  const response = await api().VikunjaLogin().post_login(credentials);
  const jsonData = response.body;
  const token = jsonData.token;
  const r = await api().VikunjaNamespaces().get_namespaces(token);
  const jsData = r.body;
  const namespaceID = jsData[0].id;
  return namespaceID;  
  
};

