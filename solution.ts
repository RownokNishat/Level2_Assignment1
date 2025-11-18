function formatValue(
  params: string | number | boolean
): string | number | boolean {
  if (typeof params === "string") {
    return params.toUpperCase();
  } else if (typeof params === "number") {
    return params * 10;
  } else if (typeof params === "boolean") {
    return !params;
  }
  throw new Error("Invalid input format");
}

function getLength(params: string | any[]): number {
  if (typeof params === "string" || Array.isArray(params)) {
    return params.length;
  }
  throw new Error("Invalid input");
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
  return users.filter((user) => user.isActive);
}

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}
function printBookDetails(book: Book): void {
  console.log(
    `Title: ${book.title}, Author: ${book.author}, Published: ${
      book.publishedYear
    }, Available: ${book.isAvailable ? "Yes" : "No"}`
  );
}

function getUniqueValues(
  arrA: (string | number)[],
  arrB: (string | number)[]
): (string | number)[] {
  const result: (string | number)[] = [];

  for (let i = 0; i < arrA.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < result.length; j++) {
      if (result[j] === arrA[i]) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      result[result.length] = arrA[i];
    }
  }

  for (let i = 0; i < arrB.length; i++) {
    let isDuplicate = false;
    for (let j = 0; j < result.length; j++) {
      if (result[j] === arrB[i]) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      result[result.length] = arrB[i];
    }
  }

  return result;
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
