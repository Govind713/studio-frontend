const STORAGE_KEYS = {
  categories: "admin-frontend:categories",
  works: "admin-frontend:works",
  complaints: "admin-frontend:complaints",
};

// Categories
export function getCategories() {
  const raw = localStorage.getItem(STORAGE_KEYS.categories);
  if (!raw) {
    const defaultCategories = [
      { id: 1, name: "Technology", description: "Tech-related categories" },
      { id: 2, name: "Design", description: "Creative design works" },
      { id: 3, name: "Marketing", description: "Marketing and promotions" },
      { id: 4, name: "Education", description: "Educational content" },
      { id: 5, name: "Health", description: "Health and wellness" },
    ];
    setCategories(defaultCategories);
    return defaultCategories;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function setCategories(categories) {
  localStorage.setItem(STORAGE_KEYS.categories, JSON.stringify(categories));
}

export function addCategory(category) {
  const existing = getCategories();
  const newId =
    existing.length > 0 ? Math.max(...existing.map((c) => c.id)) + 1 : 1;
  const newCategory = { ...category, id: newId };
  setCategories([...existing, newCategory]);
  return newCategory;
}

export function updateCategory(id, updates) {
  const existing = getCategories();
  const updated = existing.map((cat) =>
    cat.id === id ? { ...cat, ...updates } : cat,
  );
  setCategories(updated);
}

export function deleteCategory(id) {
  const existing = getCategories();
  setCategories(existing.filter((cat) => cat.id !== id));
}

// Works
export function getWorks() {
  const raw = localStorage.getItem(STORAGE_KEYS.works);
  if (!raw) {
    const defaultWorks = [
      {
        id: 1,
        title: "Website Redesign",
        category: "Technology",
        submittedBy: "John Doe",
        date: "2023-10-01",
        status: "Approved",
      },
      {
        id: 2,
        title: "Logo Design",
        category: "Design",
        submittedBy: "Jane Smith",
        date: "2023-09-15",
        status: "Pending",
      },
      {
        id: 3,
        title: "Marketing Campaign",
        category: "Marketing",
        submittedBy: "Bob Johnson",
        date: "2023-08-20",
        status: "Rejected",
      },
      {
        id: 4,
        title: "Online Course",
        category: "Education",
        submittedBy: "Alice Brown",
        date: "2023-07-10",
        status: "Approved",
      },
    ];
    setWorks(defaultWorks);
    return defaultWorks;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function setWorks(works) {
  localStorage.setItem(STORAGE_KEYS.works, JSON.stringify(works));
}

// Complaints
export function getComplaints() {
  const raw = localStorage.getItem(STORAGE_KEYS.complaints);
  if (!raw) {
    const defaultComplaints = [
      {
        id: 1,
        title: "Issue with login",
        description: "Unable to log in with correct credentials.",
        submittedBy: "User1",
        date: "2023-10-05",
        status: "Open",
        response: "",
      },
      {
        id: 2,
        title: "Slow performance",
        description: "The app is running very slowly.",
        submittedBy: "User2",
        date: "2023-09-28",
        status: "In Progress",
        response: "",
      },
      {
        id: 3,
        title: "Bug in dashboard",
        description: "Dashboard not loading properly.",
        submittedBy: "User3",
        date: "2023-09-20",
        status: "Resolved",
        response: "Fixed in latest update.",
      },
    ];
    setComplaints(defaultComplaints);
    return defaultComplaints;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function setComplaints(complaints) {
  localStorage.setItem(STORAGE_KEYS.complaints, JSON.stringify(complaints));
}

export function updateComplaint(id, updates) {
  const existing = getComplaints();
  const updated = existing.map((comp) =>
    comp.id === id ? { ...comp, ...updates } : comp,
  );
  setComplaints(updated);
}

// Reports
export function getFilteredData(startDate, endDate) {
  const works = getWorks();
  const complaints = getComplaints();

  const filteredWorks = works.filter((work) => {
    if (!startDate || !endDate) return true;
    const workDate = new Date(work.date);
    return workDate >= new Date(startDate) && workDate <= new Date(endDate);
  });

  const filteredComplaints = complaints.filter((comp) => {
    if (!startDate || !endDate) return true;
    const compDate = new Date(comp.date);
    return compDate >= new Date(startDate) && compDate <= new Date(endDate);
  });

  return {
    totalCategories: getCategories().length,
    totalWorks: works.length,
    totalComplaints: complaints.length,
    filteredWorks: filteredWorks.length,
    filteredComplaints: filteredComplaints.length,
  };
}
