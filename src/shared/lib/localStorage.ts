const get = (key: string) => {
  const item = localStorage.getItem(key);

  if (!item) return null;

  return JSON.parse(item);
};

const set = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));

  return true;
};

const setItems = (data: Record<string, any>) => {
  const entries = Object.entries(data);
  entries.forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return true;
};

const remove = (key: string) => {
  localStorage.removeItem(key);

  return true;
};

export default {
  get,
  set,
  setItems,
  remove,
};
