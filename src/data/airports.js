export const AIRPORTS = [
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi Intl Airport', country: 'India' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'United Arab Emirates' },
  { code: 'LHR', city: 'London', name: 'Heathrow Airport', country: 'United Kingdom' },
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy Intl Airport', country: 'United States' },
  { code: 'SIN', city: 'Singapore', name: 'Changi Airport', country: 'Singapore' },
  { code: 'HND', city: 'Tokyo', name: 'Haneda Airport', country: 'Japan' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj Intl', country: 'India' },
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi Intl Airport', country: 'India' },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle Airport', country: 'France' },
  { code: 'SFO', city: 'San Francisco', name: 'San Francisco Intl Airport', country: 'United States' },
  { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt Airport', country: 'Germany' },
  { code: 'SYD', city: 'Sydney', name: 'Kingsford Smith Airport', country: 'Australia' }
];

export function searchAirports(query) {
  if (!query) return AIRPORTS.slice(0, 6);
  const q = query.toLowerCase().trim();
  return AIRPORTS.filter(
    a =>
      a.code.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q)
  );
}
