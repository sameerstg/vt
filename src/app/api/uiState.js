const offersState = new Map();
const projectsState = new Map();
const milestonesState = new Map();
const reviewsState = new Map();

export function getOffersState() {
  return offersState;
}

export function getProjectsState() {
  return projectsState;
}

export function getMilestonesState() {
  return milestonesState;
}

export function getReviewsState() {
  return reviewsState;
}

export function resetOffersState() {
  offersState.clear();
}

export function resetProjectsState() {
  projectsState.clear();
}

export function resetMilestonesState() {
  milestonesState.clear();
}

export function resetReviewsState() {
  reviewsState.clear();
}

export function resetAllState() {
  offersState.clear();
  projectsState.clear();
  milestonesState.clear();
  reviewsState.clear();
}
