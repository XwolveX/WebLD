import { useState } from 'react';

/* Không gian listing page — filters project cards by category.
   Pure React state instead of direct DOM style toggling. */
export function useFilterChips(initial = 'all') {
  const [active, setActive] = useState(initial);
  return { active, setActive };
}
