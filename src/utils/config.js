const serverVars = {
  apiUrl: 'http://localhost:8081' // TODO
};

const localVars = {
  apiUrl: 'http://localhost:8081'
};

export function getApiUrl() {
  if (process.env.NODE_ENV === 'production') {
    return serverVars.apiUrl;
  }

  return localVars.apiUrl;
}

export function signUpFree(firstName, lastName, email, password) {
  return fetch(getApiUrl() + '/auth/sign-up', {
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'X-Tenant': 'time-tracker-free' },
    body: JSON.stringify({
      'email': email,
      'password': password,
      'firstName': firstName,
      'lastName': lastName,
      'subModel': 'free',
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
    headers: { 'Content-Type': 'application/json', 'X-Tenant': 'time-tracker-free' },
    body: JSON.stringify({
      'username': email,
      'password': password
    })
  })
    .then(response => {
      console.log(response.json());
    });
}

export function signOutFree(token) {
  return fetch(getApiUrl() + '/auth/logout', {
    method: 'delete',
    headers: { 'X-Tenant': 'time-tracker-free' },
    authorization: `Bearer ${token}`
  })
    .then(response => {
      console.log(response.json());
    });
}
