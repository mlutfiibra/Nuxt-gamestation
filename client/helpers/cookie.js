export function getCookieByName(name) {
  let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return match[2]
  } else {
    return ''
  }
}

export function eraseCookie(name) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}

export function clearCookie() {
  document.cookie = 'id=; Max-Age=-99999999;';
  document.cookie = 'token=; Max-Age=-99999999;';
}