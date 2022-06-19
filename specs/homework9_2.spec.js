import api from '../framework/services';
import constants, { listEdit } from '../framework/config/constants';
import {BuilderList, BuilderNamespace, BuilderReg, BuilderRegLogin} from '../framework/fixtures/builder/builderVikynia';

describe('Отправляем http запросы через Мини фреймфорк', () => {
  test('Авторизация пользователя. получение токена post api/v1/login 200', async () => {
    const Registration = await BuilderReg();
    const credentials = {
      "long_token": true,
      "password": constants.password,
      "username": constants.username
    };
    const response = await api().VikunjaLogin().post_login(credentials);
    const jsonData = response.body;
    expect(response.status).toEqual(200);
    expect(jsonData.token).toBeDefined();
    expect(jsonData.token.length).toBeGreaterThan(0);    
  });
  test('Создание списка put api/v1/namespaces/{{namespaceID}}/lists 201', async () => {
    const ArrayVariables = await BuilderNamespace();
    const token = ArrayVariables[0];
    const namespaceID = ArrayVariables[1];
    const list = constants.list;
    list.namespace_id = namespaceID;
    let response = await api().VikunjaNamespaces().put_createList(namespaceID,token,list);
    expect(response.status).toEqual(201); 
    let jsonData = response.body;
    const listID = jsonData.id;
    response = await api().VikunjaList().get_list(listID, token);
    jsonData = response.body;
    expect(response.status).toEqual(200);
    expect(jsonData.id).toEqual(listID); 
  });
  test.each`
  title               |description                 |archived|color      |favour  
  ${'День Космонавта'}|${'Супер тестовое описание'}|${false}|${''}      |${false}
  ${'День Космонавта'}|${'Супер тестовое описание'}|${false}|${''}      |${true}     
  `('Редактирование списка post api/v1/lists/{{listID}} 200', async ({title, description, archived, color , favour  }) => {
    const ArrayVariables = await BuilderList();
    const token = ArrayVariables[0];
    const namespaceID = ArrayVariables[1];    
    const listID = ArrayVariables[2];
    const list = constants.listEdit;
    listEdit.id = listID;
    listEdit.title = title;
    listEdit.description = description;
    listEdit.owner.username = constants.username;
    listEdit.namespace_id = namespaceID;
    listEdit.is_archived = archived;
    listEdit.hex_color = color;
    listEdit.is_favorite = favour;
    const response = await api().VikunjaList().post_updateList(listID, list,token);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    expect(jsonData.id).toEqual(listID);
    expect(jsonData.title).toEqual(title);
    expect(jsonData.description).toEqual(description);
    expect(jsonData.hex_color).toEqual(color);
    expect(jsonData.is_favorite).toEqual(favour);
    expect(jsonData.is_archived).toEqual(archived);
  });
  test('Удаление списка c невалидным токеном api/v1/lists/{{listID}} 200', async () => {
    const token = '';
    const ArrayVariables = await BuilderList();      
    const listID = ArrayVariables[2];
    const response = await api().VikunjaList().delete_list(listID, token);
    expect(response.status).toEqual(400);
    const jsonData = response.body;
    expect(jsonData.message).toEqual("missing or malformed jwt");
  });
  test('Удаление списка api/v1/lists/{{listID}} 200', async () => {
    const ArrayVariables = await BuilderList();
    const token = ArrayVariables[0];     
    const listID = ArrayVariables[2];
    const response = await api().VikunjaList().delete_list(listID, token);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    expect(jsonData.message).toEqual("Successfully deleted.");
  });
});
