import api from '../framework/services';
import constants, { listEdit } from '../framework/config/constants';
import {BuilderNamespace} from '../framework/fixtures/builder/builderVikynia';
const environment = {};

describe('Отправляем http запросы через Мини фреймфорк', () => {
  test('Регистрация пользователя post api/v1/register 200', async () => {
    const credentials = {
      "email": constants.email,
      "password": constants.password,
      "username": constants.username,
    };
    const response = await api().VikunjaRegister().post_register(credentials);
    expect(response.status).toBeGreaterThanOrEqual(200);
  });
  test('Авторизация пользователя. получение токена post api/v1/login 200', async () => {
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
    environment.token = jsonData.token;
  });
  test('Создание списка put api/v1/namespaces/{{namespaceID}}/lists 201', async () => {
    const token = environment.token;
    const namespaceID = await BuilderNamespace();
    const list = constants.list;
    list.namespace_id = namespaceID;
    const response = await api().VikunjaNamespaces().put_createList(namespaceID,token,list);
    const jsonData = response.body;
    expect(response.status).toEqual(201);
    environment.listID = jsonData.id;
  });
  test.each`
  title               |description                 |archived|color      |favour  
  ${'День Космонавта'}|${''}                       |${false}|${''}      |${false} 
  ${'День Космонавта'}|${'Супер тестовое описание'}|${false}|${''}      |${false}
  ${'День Космонавта'}|${'Супер тестовое описание'}|${false}|${''}      |${true} 
  ${'День Космонавта'}|${'Супер тестовое описание'}|${false}|${'525eb4'}|${true} 
  ${'День Космонавта'}|${'Супер тестовое описание'}|${true} |${'525eb4'}|${true}    

  `('Редактирование списка post api/v1/lists/{{listID}} 200', async ({title, description, archived, color , favour  }) => {
    const token = environment.token;
    const listID = environment.listID;
    const list = constants.listEdit;
    listEdit.id = listID;
    listEdit.title = title;
    listEdit.description = description;
    listEdit.owner.username = constants.username;
    listEdit.namespace_id = await BuilderNamespace();
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
    const listID = environment.listID;
    const response = await api().VikunjaList().delete_list(listID, token);
    expect(response.status).toEqual(400);
    const jsonData = response.body;
    expect(jsonData.message).toEqual("missing or malformed jwt");
  });
  test('Удаление списка api/v1/lists/{{listID}} 200', async () => {
    const token = environment.token;
    const listID = environment.listID;
    const response = await api().VikunjaList().delete_list(listID, token);
    expect(response.status).toEqual(200);
    const jsonData = response.body;
    expect(jsonData.message).toEqual("Successfully deleted.");
  });
});
