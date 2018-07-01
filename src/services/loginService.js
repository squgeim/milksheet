export function login(email, password) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: 122232,
        name: 'Shreya Dahal',
        email: email,
        organization: {
          id: 21,
          name: 'SKKChowk',
        },
      });
    }, 5000);
  });
}
