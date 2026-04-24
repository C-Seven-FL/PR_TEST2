const services = [
  {
    id: "32rqty57o9809",
    userID: "412f4f21",
    categoryID: "cat1",
    name: "Barbershop Best",
    description: "Hair saloon for every people",
    address: "Jateční 1112",
    working_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    hour_start: "11:00",
    hour_end: "19:00",
    slot_duration: "2:00",
    banned_users: [],
    active: true,
    blocked: false
  },
  {
    id: "dfqg2efdq3fq3f",
    userID: "a1b2c3d4e5f67890",
    categoryID: "cat1",
    name: "Haircut Basic",
    description: "Simple haircut service",
    address: "Ostrava 101",
    working_days: ["Monday", "Tuesday"],
    hour_start: "09:00",
    hour_end: "17:00",
    slot_duration: "1:00",
    banned_users: [],
    active: true,
    blocked: false
  },
  {
    id: "q2efdgw3th4grqrg3",
    userID: "b2c3d4e5f6789012",
    categoryID: "cat2",
    name: "Car Repair",
    description: "Basic car maintenance and repair",
    address: "Brno 22",
    working_days: ["Wednesday", "Thursday"],
    hour_start: "08:00",
    hour_end: "16:00",
    slot_duration: "2:00",
    banned_users: [],
    active: true,
    blocked: false
  },
  {
    id: "q2ef3gfw43rgq3r",
    userID: "b2c3d41e2f2e1f12ef",
    categoryID: "cat3",
    name: "Psychologist Mark",
    description: "Clean and effective psychology by professional",
    address: "Praha 4",
    working_days: ["Monday", "Wednesday", "Saturday"],
    hour_start: "10:00",
    hour_end: "20:00",
    slot_duration: "1:00",
    banned_users: [],
    active: true,
    blocked: false
  }
];

export function createService(service) {
  services.push(service);
  //console.log(service);
  return service;
}


export function findServiceByID(id) {
    return services.find(s => s.id === id)
}


export function findServiceByName(name) {
  return services.find(s => s.name === name);
}


export function getAllServices(filters = {}) {
  let result = services;

  if (filters.name_search) {
    result = result.filter(s => s.name === filters.name_search);
  }

  if (filters.category_search) {
    result = result.filter(s => s.categoryID === filters.category_search);
  }

  if (filters.userID) {
    result = result.filter(s => s.userID === filters.userID);
  }


  const allowedSortFields = ["name", "hour_start", "hour_end"];

  if (filters.sort_by && allowedSortFields.includes(filters.sort_by)) {
    const field = filters.sort_by;

    result = result.sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  }

  return result;
}


export function updateService(id, updatedService) {
  const index = services.findIndex(s => s.id === id);

  if (index === -1) return null;

  services[index] = updatedService;
  return services[index];
}