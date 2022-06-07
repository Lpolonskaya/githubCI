import VikunjaRegister from './vikynia.register.service';
import VikunjaLogin from './vikynia.login.service';
import VikunjaNamespaces from './vikynia.namespaces.service';
import VikunjaList from './vikynia.list.service';

const api = () => ({
  VikunjaRegister: () => ({ ...VikunjaRegister }),
  VikunjaLogin: () => ({ ...VikunjaLogin }),
  VikunjaNamespaces: () => ({ ...VikunjaNamespaces }),
  VikunjaList: () => ({ ...VikunjaList }),
});
export default api;


