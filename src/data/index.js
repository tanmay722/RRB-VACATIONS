import domesticTours from "./domestic-tours";
import internationalTours from "./international-tours";

// Combine all tours
const allTours = [...domesticTours, ...internationalTours];

// Function to get tour by ID
export const getTourById = (id) => {
  return allTours.find((tour) => tour.id === Number.parseInt(id));
};

// Function to get all domestic tours
export const getDomesticTours = () => {
  return domesticTours;
};

// Function to get all international tours
export const getInternationalTours = () => {
  return internationalTours;
};

// Function to get all tours
export const getAllTours = () => {
  return allTours;
};

// Export the tour data
export { domesticTours, internationalTours };
