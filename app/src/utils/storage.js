const hasLocalStorage = !!window.localStorage;

export function get(key) {
  if (!hasLocalStorage) {
    return;
  }

  return parse(localStorage.getItem(key));
}

export function put(key, value) {
  if (!hasLocalStorage) {
    return;
  }

  return localStorage.setItem(key, serialise(value));
}

function serialise(data) {
  return JSON.stringify(data);
}

function parse(data) {
  try {
    return JSON.parse(data);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Can't parse data as JSON.`, data);
      console.warn(err);
    }

    return;
  }
}
