import { create } from 'zustand';

const useGoogleReviewsStore = create((set) => ({
  googleReviews: [],
  placeDetails: null,
  setGoogleReviews: (reviews) => set({ googleReviews: reviews }),
  setPlaceDetails: (details) => set({ placeDetails: details }),
  clearGoogleReviews: () => set({ googleReviews: [], placeDetails: null }),
}));

export default useGoogleReviewsStore; 