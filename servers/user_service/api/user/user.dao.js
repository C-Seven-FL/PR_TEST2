const users = [
  {
  id: "mock-client-1",
  mail: "bernard@gmail.com",
  name: "Bernard Colt",
  gender: "Male",
  phone_number: "+420777666555",
  birthdate: "1999-10-03",
  address: "Jateční 53",
  user_type: "client",
  notifications: [],
  notification_turn: true,
  blocked: false
  },
  {
  id: "mock-client-2",
  mail: "melina@gmail.com",
  name: "Melina Remedy",
  gender: "Female",
  phone_number: "+420774332135",
  birthdate: "2001-04-06",
  address: "Razská 12",
  user_type: "client",
  notifications: [],
  notification_turn: true,
  blocked: false
  },
  {
  id: "mock-client-3",
  mail: "lebot@gmail.com",
  name: "Lebomir Grants",
  gender: "Male",
  phone_number: "+420772123234",
  birthdate: "1989-05-22",
  address: "Banková 4",
  user_type: "client",
  notifications: [],
  notification_turn: true,
  blocked: false
  },

  {
  id: "mock-provider-1",
  mail: "milavo@gmail.com",
  name: "Mila Vojage",
  gender: "Female",
  phone_number: "+420774554665",
  birthdate: "1996-02-13",
  address: "Jateční 26",
  user_type: "provider",
  notifications: [],
  notification_turn: true,
  blocked: false
  },
  {
  id: "mock-provider-2",
  mail: "cola@gmail.com",
  name: "Santa Cola",
  gender: "Female",
  phone_number: "+42077221423",
  birthdate: "2000-07-07",
  address: "Motorká 21",
  user_type: "provider",
  notifications: [],
  notification_turn: true,
  blocked: false
  },
  {
  id: "mock-provider-3",
  mail: "maus@gmail.com",
  name: "Gander Maus",
  gender: "Male",
  phone_number: "+42077442335",
  birthdate: "1975-11-27",
  address: "Čižní 1",
  user_type: "provider",
  notifications: [],
  notification_turn: true,
  blocked: false
  },
];

export function createUser(user) {
  users.push(user);

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