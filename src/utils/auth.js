import Cookies from 'js-cookie';

// Cookies存token
export function getToken() {
  return Cookies.get('accessToken');
}
export function setToken(token) {
  return Cookies.set('accessToken', token);
}
export function removeToken() {
  return Cookies.remove('accessToken');
}


// Cookies存userId
export function getuserId() {
  return Cookies.get('userId');
}
export function setuserId(userId) {
  return Cookies.set('userId', userId);
}
export function removeuserId() {
  return Cookies.remove('userId');
}

// Cookies存roles
export function getroles() {
  return Cookies.get('roles');
}
export function setroles(roles) {
  return Cookies.set('roles', roles);
}
export function removeroles() {
  return Cookies.remove('roles');
}

// Cookies存username
export function getusername() {
  return Cookies.get('username');
}
export function setusername(username) {
  return Cookies.set('username', username);
}
export function removeusername() {
  return Cookies.remove('username');
}


// Cookies存password
export function getpassword() {
  return Cookies.get('password');
}
export function setpassword(password) {
  return Cookies.set('password', password);
}
export function removepassword() {
  return Cookies.remove('password');
}










// Cookies存hasInfo
export function getEmail() {
  return Cookies.get('emailAddress');
}
export function setEmail(emailAddress) {
  return Cookies.set('emailAddress', emailAddress);
}
export function removeEmail() {
  return Cookies.remove('emailAddress');
}


// Cookies存selectid
export function getSelect() {
  return Cookies.get('theselect');
}
export function setSelect(theselect) {
  return Cookies.set('theselect', theselect);
}
export function removeSelect() {
  return Cookies.remove('theselect');
}

