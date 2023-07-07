import URI, { WS } from './env';   // импортируем адрес порта и websocket

export class BankingApi {   // этот класс содержит api для банковского приложения
  constructor() {}

  static pushlogin(log, pass) {     // статический метод pushlogin для отправки POST запроса на сервер
    return fetch(`${URI}/login`, {    // отправка запроса на адрес `${URI}/login`
      method: 'POST',
      body: JSON.stringify({ login: log, password: pass }),     // данные в формате JSON
      headers: { 'Content-Type': 'application/json' },          // заголовки запроса (контент - JSON)
    })
      .then((res) => {    // обработка ответа от сервера
        if (399 < res.status && res.status < 500) {
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 400;
          throw err;
        }
        if (res.status > 499) {
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 500;
          throw err;
        }
        return res.json();  //преобразование ответа в JSON
      })
      .then((res) => {
        const data = res;
        if (data.error === '`No such user') {
          const err = new Error('Вы ввели неверный логин!');
          err.type = 'login';
          throw err;
        } else if (data.error === 'Invalid password') {
          const err = new Error('Вы ввели неверный пароль!');
          err.type = 'password';
          throw err;
        }
        return data;  // возврат данных
      });
  }

  static pullAccaunts(token) {
    return fetch(`${URI}/accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        if (399 < res.status && res.status < 500) {
          const err = new Error(
            'Что то пошло не так попробуйте перезагрузить позже!'
          );
          err.type = 400;
          throw err;
        }
        if (res.status > 499) {
          const err = new Error(
            'Что то пошло не так попробуйте перезагрузить позже!'
          );
          err.type = 500;
          throw err;
        }
        return res.json();  //преобразование ответа в JSON
      })
      .then((res) => {
        if (res.error === 'Unauthorized') {
          const err = new Error();
          err.type = 'Unauthorized';
          throw err;
        }
        return res;  // возврат данных
      });
  }

  static pullDetailsAccaunts(token, id) {
    return fetch(`${URI}/account/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`,  // токен в заголовке запроса
      },
    })
      .then((res) => {
        if (399 < res.status && res.status < 500) { 
          const err = new Error(
            'Что то пошло не так попробуйте перезагрузить позже!'
          );
          err.type = 400;
          throw err;
        }
        if (res.status > 499) {  
          const err = new Error(
            'Что то пошло не так попробуйте перезагрузить позже!'
          );
          err.type = 500;
          throw err;
        }
        return res.json(); // преобразование ответа в JSON
      })
      .then((res) => {
        if (res.error === 'Unauthorized') { // проверка поля error в ответе
          const err = new Error();
          err.type = 'Unauthorized';
          throw err;
        }
        if (res.error === 'No such account') { // проверка поля error в ответе
          const err = new Error();
          err.type = 'No such account';
          throw err;
        }
        return res;
      });
  }

  static getBanks() {
    return fetch(`${URI}/banksAdress`)
      .then((res) => {
        if (399 < res.status && res.status < 500) {   
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 400;
          throw err;
        }
        if (res.status > 499) {  
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 500;
          throw err;
        }
        return res.json();  // преобразование ответа в JSON
      })
      .then((data) => {
        return data;
      });
  }

  static createAccount(token) {
    return fetch(`${URI}/create-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`,  // токен в заголовке запроса
      },
    })
      .then((res) => {
        if (399 < res.status && res.status < 500) {  
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 400;
          throw err;
        }
        if (res.status > 499) {   
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 500;
          throw err;
        }
        return res.json();   // преобразование ответа в JSON
      })
      .then((data) => {
        if (data.error === 'Unauthorized') {  // проверка поля error в ответе
          const err = new Error();
          err.type = 'Unauthorized';
          throw err;
        }
        return data;
      });
  }

  static async transferFunds(from, to, amount, token) {  // Отправляем запрос на сервер, передав параметры в теле запроса и токен авторизации в заголовке
    return fetch(`${URI}/transfer-funds`, {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        if (399 < res.status && res.status < 500) {
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 400;
          throw err;
        }
        if (res.status > 499) {
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 500;
          throw err;
        }
        return res.json();
      })
      .then((res) => {
        if (res.error === 'Unauthorized') {
          const err = new Error();
          err.type = 'Unauthorized';
          throw err;
        }
        return res;
      });
  }

  static getCurrencyAccounts(token) {
    return fetch(`${URI}/currencies`, {  // Отправляем GET-запрос на сервер и передаем токен авторизации в заголовке
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        if (399 < res.status && res.status < 500) {
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 400;
          throw err;
        }
        if (res.status > 499) {
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 500;
          throw err;
        }
        return res.json();
      })
      .then((res) => {
        if (res.error === 'Unauthorized') {
          const err = new Error();
          err.type = 'Unauthorized';
          throw err;
        }
        return res;
      });
  }

  static getKnownCurrwncies() {
    return fetch(`${URI}/all-currencies`)
      .then((res) => {
        if (399 < res.status && res.status < 500) {
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 400;
          throw err;
        }
        if (res.status > 499) {
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 500;
          throw err;
        }
        return res.json();
      })
      .then((res) => {
        if (res.error === 'Unauthorized') {
          const err = new Error();
          err.type = 'Unauthorized';
          throw err;
        }
        return res;
      });
  }

  static exchangeCurrency(from, to, amount, token) {
    return fetch(`${URI}/currency-buy`, { // Отправляем запрос на сервер, передав параметры в теле запроса и токен авторизации в заголовке
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${token}`,
      },
    })
      .then((res) => {
        if (399 < res.status && res.status < 500) {
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 400;
          throw err;
        }
        if (res.status > 499) {
          const err = new Error('Что то пошло не так попробуйте еще раз!');
          err.type = 500;
          throw err;
        }
        return res.json();
      })
      .then((res) => {
        if (res.error === 'Unauthorized') {
          const err = new Error();
          err.type = 'Unauthorized';
          throw err;
        }
        if (res.error === 'Overdraft prevented') {
          const err = new Error('Некорректное значение перевода');
          err.type = 'Overdraft';
          throw err;
        }
        if (res.error === 'Unknown currency code') {
          const err = new Error('Передан неверный валютный код');
          err.type = 'Unknown';
          throw err;
        }
        if (res.error === 'Invalid amount') {
          const err = new Error(
            'Не указана сумма перевода, или она отрицательная'
          );
          err.type = 'Invalid';
          throw err;
        }
        if (res.error === 'Not enough currency') {
          const err = new Error('На валютном счёте списания нет средств');
          err.type = 'NotEnough';
          throw err;
        }
        return res;
      });
  }

  static getChangedCurrency() {  // Устанавливаем WebSocket соединение с сервером для получения обновлений по курсам валют
    return new WebSocket(`${WS}/currency-feed`); // Возвращаем объект WebSocket
  }
}
