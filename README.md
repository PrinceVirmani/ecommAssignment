# Leegality Frontend Engineer Assessment

A fully functional Amazon-style e-commerce product listing and detail application built with React + Vite + Tailwind CSS.

## Setup Instructions

### Installation

# Clone the repository
git clone <https://github.com/PrinceVirmani/ecommAssignment.git>
cd ecommAssignment

# Install dependencies
npm install

# make .env file and use this variable - 
VITE_BASE_URL for the dummyjson URL

# Start the server
npm run dev

# Open in browser
http://localhost:5173

### Key Decisions
- **Context API over Redux**: Filter state is simple enough that a single context handles it cleanly without the overhead of Redux or Zustand.
- **Client-side filtering for Price & Brand**: DummyJSON doesn't support server-side price/brand filtering, so these are applied client-side after fetching all products in a category.
- **pagination**: Pagination resets automatically when any filter changes to avoid empty pages.

## Assumptions Made

1. The "Brand" field is not always present in DummyJSON products — items without a brand fall back to showing their category.
2. Price filtering is applied client-side since the API does not support price range queries.
3. Pagination shows 12 products per page.
4. Ratings are rounded to the nearest whole number for star display.

## Improvements Given More Time

1. **Search bar** — full-text search using `/products/search?q=` endpoint
2. **Cart functionality** — add to cart with a persistent cart drawer
3. **Debounced price input** — avoid re-filtering on every keystroke
4. **Sort options** — sort by price (low→high, high→low), rating, newest
