import jwt_decode from 'jwt-decode';

const serverVars = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL
};

const localVars = {
  apiUrl: 'http://localhost:8080'
};

export function getApiUrl() {
  if (process.env.NODE_ENV === 'production') {
    return serverVars.apiUrl;
  }

  return localVars.apiUrl;
}

const createTokenProvider = () => {
  const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

    return jwt && jwt.exp && jwt.exp * 1000 || null;
  };

  const isExpired = (exp) => {
    if (!exp) {
      return false;
    }

    return Date.now() > exp;
  };

  const getToken = () => {
    if (isValidToken()) {
      return JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH')).accessToken;
    } else {
      return null;
    }
  };

  const isValidToken = () => {
    if (JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH')) !== null) {
      let _token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || '');

      if (_token !== null && _token.hasOwnProperty('accessToken')) {
        return !isExpired(getExpirationDate(_token.accessToken));
      } else {
        setToken(null);
        return false;
      }
    }

    return false;
  };

  const setToken = (token) => {
    if (token) {
      localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
    } else {
      localStorage.removeItem('REACT_TOKEN_AUTH');
    }
  };

  return {
    getToken,
    setToken,
    isValidToken
  };
};

const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const login = (newTokens) => {
    tokenProvider.setToken(newTokens);
  };

  const logout = () => {
    tokenProvider.setToken(null);
  };

  const authFetch = (input, init) => {
    const token = tokenProvider.getToken();

    init = init || {};

    init.headers = {
      ...init.headers,
      Authorization: `Bearer ${token}`
    };

    return fetch(input, init);
  };

  const useAuth = () => {
    return tokenProvider.isValidToken();
  };

  return {
    useAuth,
    authFetch,
    login,
    logout
  };
};

export const { login, logout, authFetch, useAuth } = createAuthProvider();

const getCurrentDate = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;

  if ((String(day)).length === 1) {
    day = '0' + day;
  }

  if ((String(month)).length === 1) {
    month = '0' + month;
  }

  return day + '/' + month + '/' + date.getFullYear();
};

export function signUpFree(firstName, lastName, email, password) {
  return fetch(getApiUrl() + '/auth/sign-up', {
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'X-Tenant': process.env.NEXT_PUBLIC_TENANT },
    body: JSON.stringify({
      'email': email,
      'password': password,
      'firstName': firstName,
      'lastName': lastName,
      'subModel': 'free',
      'phone': '',
      'entranceDate': getCurrentDate(),
      'avatarUrl': '',
      'roles': [
        'ROLE_ADMIN',
        'ROLE_USER'
      ]
    })
  })
    .then(response => response.json());
}

export function signInFree(email, password) {
  return fetch(getApiUrl() + '/auth/sign-in', {
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'X-Tenant': process.env.NEXT_PUBLIC_TENANT },
    body: JSON.stringify({
      'username': email,
      'password': password
    })
  })
    .then(response => response.json())
    .then(json => {
      if (json.data.hasOwnProperty('accessToken')) {
        login(json.data);
      }

      if (json.data.hasOwnProperty('idToken')) {
        const token = json.data.idToken;
        const decoded = jwt_decode(token);

        const userInformation = {
          roles: decoded['cognito:groups'],
          userId: decoded['cognito:username'],
          firstName: decoded['custom:first_name'],
          lastName: decoded['custom:last_name'],
          email: decoded['email'],
          phone: decoded['custom:phone'],
          avatarUrl: decoded['custom:avatar_url'],
          subModel: decoded['custom:sub_model'],
          entranceDate: decoded['custom:entrance_date']
        };

        localStorage.setItem('USER_INFORMATION', JSON.stringify(userInformation));
      }
    });
}

export function signOutFree(token) {
  return fetch(getApiUrl() + '/auth/logout', {
    method: 'delete',
    headers: { 'X-Tenant': process.env.NEXT_PUBLIC_TENANT, 'Authorization': `Bearer ${token}` }
  })
    .then(response => response.json())
    .then(() => {
      localStorage.removeItem('USER_INFORMATION');
      logout();
    });
}

export function updatePasswordFree(email, password, passwordConfirm) {
  return fetch(getApiUrl() + '/auth/change-password', {
    method: 'put',
    headers: { 'Content-Type': 'application/json', 'X-Tenant': process.env.NEXT_PUBLIC_TENANT },
    body: JSON.stringify({
      'username': email,
      'password': password,
      'passwordConfirm': passwordConfirm
    })
  })
    .then(response => response.json())
    .then(() => {
      localStorage.removeItem('USER_INFORMATION');
      logout();
    });
}

export function updateAttributesFree(token, firstName, lastName, email, phone) {
  return fetch(getApiUrl() + '/auth/update-attributes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json', 'X-Tenant': process.env.NEXT_PUBLIC_TENANT },
    body: JSON.stringify({
      'token': token,
      'attributes': [
        {
          'name': 'custom:first_name',
          'value': firstName
        },
        {
          'name': 'custom:last_name',
          'value': lastName
        },
        {
          'name': 'email',
          'value': email
        },
        {
          'name': 'custom:phone',
          'value': phone
        }
      ]
    })
  })
    .then(response => response.json())
    .then(() => {
      localStorage.removeItem('USER_INFORMATION');
      logout();
    });
}

export function getUsers() {
  return fetch(getApiUrl() + '/auth/get-users', {
    method: 'get',
    headers: { 'X-Tenant': process.env.NEXT_PUBLIC_TENANT }
  })
    .then(response => response.json())
    .then(response => console.log(response));
}

export function getOrganizationName() {
  return fetch(getApiUrl() + '/auth/get-organization', {
    method: 'get',
    headers: { 'X-Tenant': process.env.NEXT_PUBLIC_TENANT }
  })
    .then(response => response.text());
}
