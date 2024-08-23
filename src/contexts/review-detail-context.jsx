import { createContext, useContext } from "react";

export const ReviewDetailContext = createContext();

export const useReviewDetailContext = () => useContext(ReviewDetailContext);

export const ReviewDetailProvider = ({ children, value }) => {
  return (
    <ReviewDetailContext.Provider value={value}>
      {children}
    </ReviewDetailContext.Provider>
  );
};
