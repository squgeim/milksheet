export const STORE_USER = 'STORE_USER';
export function storeUser(user) {
  return {
    type: STORE_USER,
    payload: { user },
  };
}
