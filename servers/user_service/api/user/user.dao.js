const users = [

];

export function createUser(user) {
  users.push(user);
  //console.log(service);
  return user;
}


export function findUserByID(id) {
    return users.find(s => s.id === id)
}


export function findUserByMail(mail) {
  return users.find(s => s.mail === mail);
}


export function getAllUsers(filters = {}) {
  let result = users;

  if (filters.ban_list) {
    const ids = new Set(
      filters.ban_list.split(",").map(id => id.trim())
    );

    result = result.filter(user => ids.has(user.id));
  }

  if (filters.name_search) {
    result = result.filter(user => user.name === filters.name_search
    );
  }

  return result;
}


export function updateUser(id, updatedService) {
  const index = users.findIndex(s => s.id === id);

  if (index === -1) return null;

  users[index] = updatedService;
  return users[index];
}