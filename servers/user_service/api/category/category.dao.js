const categories = [
  {
    id: "cat001",
    name: "Saloon",
    description: "Beauty services for every type of human."
  },
  {
    id: "cat002",
    name: "Fitness",
    description: "Personal training and physical activities."
  },
  {
    id: "cat003",
    name: "Healthcare",
    description: "Medical services, clinics, and wellness care."
  },
  {
    id: "cat004",
    name: "Education",
    description: "Courses, tutoring, and skill development."
  },
  {
    id: "cat005",
    name: "Automotive",
    description: "Car repair, maintenance, and diagnostics."
  },
  {
    id: "cat006",
    name: "Home Services",
    description: "Cleaning, repairs, and household maintenance."
  }
];

export function createCategory(category) {
  categories.push(category);
  return category;
}


export function findCategoryByID(id) {
    return categories.find(s => s.id === id)
}


export function findCategoryByName(name) {
  return categories.find(s => s.name === name);
}


export function getAllCategories() {
  let result = categories;

  return result;
}


export function updateCategory(id, updatedCategory) {
  const index = categories.findIndex(s => s.id === id);

  if (index === -1) return null;

  categories[index] = updatedCategory;
  return categories[index];
}