function formatValue(
  params: string | number | boolean
): string | number | boolean | undefined {
  if (typeof params === "string") {
    return params.toUpperCase();
  } else if (typeof params === "number") {
    return params * 10;
  } else if (typeof params === "boolean") {
    return !params;
  }
}
function getLength(params: string | unknown[]): number | undefined {
  if (typeof params === "string") {
    return params.length;
  } else if (Array.isArray(params)) {
    return params.length;
  }
}

class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getDetails(): string {
    return `'Name: ${this.name}, Age: ${this.age}'`;
  }
}

interface SingleBook {
  title: string;
  rating: number;
}

function filterByRating(books: SingleBook[]): SingleBook[] {
  return books.filter((book: SingleBook) => book.rating >= 4);
}

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}
function filterActiveUsers(users: User[]): User[] {
  return users.filter((user: User) => {
    return user.isActive === true;
  });
}

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}
function printBookDetails(book: Book): string {
  return `Title: ${book.title}, Author: ${book.author} , Published: ${
    book.publishedYear
  }, Available: ${book.isAvailable ? "Yes" : "No"}`;
}

function getUniqueValues<T, X>(arrA: T[], arrB: X[]) {
  const uniqueArrayMap = new Map();
  for (let i = 0; i < arrA.length; i++) {
    if (!uniqueArrayMap.has(arrA[i])) {
      uniqueArrayMap.set(arrA[i], 1);
    }
  }
  for (let i = 0; i < arrB.length; i++) {
    if (!uniqueArrayMap.has(arrB[i])) {
      uniqueArrayMap.set(arrB[i], 1);
    }
  }
  return Array.from(uniqueArrayMap.keys());
}

interface Product {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
}

function calculateTotalPrice(products: Product[]): number {
  const totalPrice = products.reduce(
    (acc: number, product: Product): number => {
      const totalProductPrice = product.price * product.quantity;
      const discountPrice =
        (totalProductPrice * (product?.discount || 0)) / 100;
      return acc + (totalProductPrice - discountPrice);
    },
    0
  );
  return totalPrice;
}
const products = [
  { name: "Pen", price: 10, quantity: 2 },
  { name: "Notebook", price: 25, quantity: 3, discount: 10 },
  { name: "Bag", price: 50, quantity: 1, discount: 20 },
];

console.log(calculateTotalPrice(products));
