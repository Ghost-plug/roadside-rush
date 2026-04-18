export type MenuItem = {
  id: string;
  name: string;
  price: number;
  desc: string;
  emoji: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
};

export const MENU: MenuCategory[] = [
  {
    id: "burgers",
    name: "Burgers & Sandwiches",
    emoji: "🍔",
    items: [
      { id: "b1", name: "Dairy Mart Double", price: 8.99, desc: "Two smashed patties, American cheese, house sauce", emoji: "🍔" },
      { id: "b2", name: "Jefferson Classic", price: 6.49, desc: "Single patty, lettuce, tomato, onion, pickle", emoji: "🍔" },
      { id: "b3", name: "Bacon Cheddar", price: 9.49, desc: "Thick-cut bacon, sharp cheddar, BBQ", emoji: "🥓" },
      { id: "b4", name: "Chicken Sandwich", price: 7.99, desc: "Crispy buttermilk chicken, slaw, pickles", emoji: "🍗" },
      { id: "b5", name: "Philly Cheesesteak", price: 9.99, desc: "Shaved beef, peppers, onions, melted provolone", emoji: "🥖" },
      { id: "b6", name: "Patty Melt", price: 8.49, desc: "Grilled rye, swiss, caramelized onions", emoji: "🧀" },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    emoji: "🍟",
    items: [
      { id: "s1", name: "Crispy Fries", price: 3.49, desc: "Golden, salted, hot from the fryer", emoji: "🍟" },
      { id: "s2", name: "Loaded Tots", price: 5.99, desc: "Cheese, bacon, jalapeños, sour cream", emoji: "🧀" },
      { id: "s3", name: "Onion Rings", price: 4.49, desc: "Hand-battered, ranch dipping sauce", emoji: "🧅" },
      { id: "s4", name: "Mozzarella Sticks", price: 5.49, desc: "6 pieces with marinara", emoji: "🧀" },
    ],
  },
  {
    id: "treats",
    name: "Cold Treats",
    emoji: "🍦",
    items: [
      { id: "t1", name: "Vanilla Shake", price: 4.99, desc: "Hand-spun, real vanilla bean", emoji: "🥤" },
      { id: "t2", name: "Strawberry Shake", price: 4.99, desc: "Fresh strawberries, whipped cream", emoji: "🍓" },
      { id: "t3", name: "Oreo Blizzard", price: 5.49, desc: "Vanilla soft-serve blended with Oreos", emoji: "🍪" },
      { id: "t4", name: "Banana Split", price: 6.49, desc: "Three scoops, syrups, nuts, cherry on top", emoji: "🍨" },
      { id: "t5", name: "Root Beer Float", price: 4.49, desc: "Cold root beer, vanilla soft-serve", emoji: "🍺" },
    ],
  },
];

export const RESTAURANT = {
  name: "Dairy Mart",
  address: "3622 Jefferson Blvd, Dallas, TX",
  phone: "+12145550100",
  phoneDisplay: "(214) 555-0100",
  hours: [
    { day: "Monday", open: "6:00 AM", close: "1:00 AM" },
    { day: "Tuesday", open: "6:00 AM", close: "1:00 AM" },
    { day: "Wednesday", open: "6:00 AM", close: "1:00 AM" },
    { day: "Thursday", open: "6:00 AM", close: "1:00 AM" },
    { day: "Friday", open: "6:00 AM", close: "2:00 AM" },
    { day: "Saturday", open: "6:00 AM", close: "2:00 AM" },
    { day: "Sunday", open: "7:00 AM", close: "12:00 AM" },
  ],
  mapsUrl: "https://maps.google.com/?q=3622+Jefferson+Blvd,+Dallas,+TX",
};

export function currentStatus(): { open: boolean; closesAt: string } {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  const idx = day === 0 ? 6 : day - 1;
  const today = RESTAURANT.hours[idx];
  return { open: true, closesAt: today.close };
}
