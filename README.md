## What are some differences between interfaces and types in TypeScript?

### `Answer:`

### `interface`

- অবজেক্ট বা ক্লাসের আকৃতি বর্ণনা করার জন্য সাধারণত ব্যবহৃত হয়।
- Declaration merging সমর্থন করে — একই নামে একাধিক interface ঘোষণা করলে তারা একত্রিত হয়.

  ```ts
  interface User {
    name: string;
  }

  interface User {
    age: number;
  }

  const u: User = { name: "Nishat", age: 30 };
  ```

- অন্যান্য interface গুলো extend করতে পারে এবং একাধিকটি একসাথে extend করা যায়।

  ```ts
  interface Person {
    name: string;
  }
  interface Employee extends Person {
    id: number;
  }
  ```

- ক্লাসে implements দিয়ে ব্যবহার করা সহজ ও স্পষ্ট:

  ```ts
  class MyUser implements User {
    name = "A";
    age = 20;
  }
  ```

### `type` (type alias)

- কোনোটাই কেবল একটি নাম দিয়ে টাইপ alias করে; শুধুমাত্র অবজেক্ট নয়—প্রিমিটিভ, ইউনিয়ন, টিউপল, mapped types সবকিছু alias করা যায়।

  ```ts
  type ID = string | number;
  type Point = [number, number];
  type UserObj = { name: string; age: number };
  ```

- declaration merging সমর্থন করে না — একবার type ঘোষণা করলে পরে একই নামে নতুন প্রপার্টি যোগ করা যাবে না।
- interface-কে extend করার মত কাজ করতে পারে intersection বা extends ব্যবহার করে:

  ```ts
  type Person = { name: string };
  type Employee = Person & { id: number };
  ```

- union এবং tuple তৈরির জন্য interface ব্যবহারে সীমাবদ্ধতা থাকে; তাই এমন ক্ষেত্রে type প্রয়োজনীয়।

## Explain the difference between any, unknown, and never types in TypeScript.

### `Answer:`

### `any`

- যে কোনো ধরনের মান অ্যাসাইন করা যায়

  ```ts
  let value: any;
  value = "hello";
  value = 10;
  value = true;
  value = [1, 2, 3];
  value = { user: "Nishat" };
  ```

  যেহুতু আমরা any Type ব্যবহার করেছি তাই আমরা যেকোন ধরনের ভ্যালু এখানে অ্যাসাইন করতে পারব

- এই টাইপ ব্যবহার করা হলে টাইপস্ক্রিপ্ট টাইপ চেক করে না, ফলে টাইপ সেফটি হারায় যায়

  ```ts
  value.toUpperCase();
  ```

  আমরা জানি toUpperCase শুধুমাত্র স্ট্রিং টাইপের জন্য ব্যবহার করা হয়, কিন্তু any Type ব্যবহারের জন্য আমরা যেকোন ডাটাটাইপের জন্য এটি ব্যবহার করতে পারছি, যা আমাদের কম্পাইল টাইমে ইরোর দিবে না কিন্তু রাইটাইমে ইরোর দিতে পারে।

- তাই এই টাইপ ব্যবহার করা সবচেয়ে কম নিরাপদ কিন্তু একই সাথে এটি অনেক ফ্লেক্সিবল। এজন্য শুধুমাত্র পুরনো কোড মাইগ্রেট কিংবা দ্রুত কিছু টেস্ট করার জন্য শুধু এই টাইপ ব্যবহার করা উচিত।

### `unknown`

- এই টাইপটিতে `any` এর মতোই যেকোন মান অ্যাসাইন করা যায় , কিন্তু এখানে কিছু পার্থক্য আছে। এটিকে ব্যবহার করতে চাইলে আগেই টাইপ চেক করতে হবে

  ```ts
  let value: unknown;
  value = "hello";
  value = 10;
  value = true;
  value = [1, 2, 3];
  value = { user: "Nishat" };
  ```

  যেকোন ভ্যালু অ্যাসাইন করা গেলেও যখন আমি

  ```ts
  value.toUpperCase();
  ```

  চেক করতে যাব তখন টাইপস্ক্রিপ্ট আমাকে ইরোর দিবে যে শিউর না এটি স্ট্রিং কি না।

  তাই এই টাইপ ব্যবহার করলে আমাকে আগে টাইপ চেক করে নিতে হবে

  ```ts
  if (typeof value === "string") {
    value.toUpperCase(); //
  }
  ```

  এভাবে আগে থেকে টাইপ চেক করার মাধ্যমে ইরোরটি চলে যাবে

- তাই unknown টাইপ একটি নিরাপদ বিকল্প, কারন এখানে যেকোন মান রাখা গেলেও আমাকে টাইপ চেক করে কাজ করতে হয়, ফলে কম্পাইল টাইমেই ইরোর ধরা পড়ে, সেক্ষেত্রে কোড হয় নির্ভুল।

- টাইপস্ক্রিপ্ট টাইপ সম্পর্কে নিশ্চিত না হতে পারলে error দেয়।

### `never`

- এমন টাইপ যা কখনো কোনো মান ধারণ করে না।

- সাধারণত নিচের পরিস্থিতিগুলোতে ব্যবহার করা হয়:

  - ফাংশন যেগুলি exception ছুড়ে এবং কখনো return করে না

    ```ts
    function fail(message: string): never {
      throw new Error(message);
    }
    ```

  - অনন্ত লুপ (infinite loop) যেগুলি কখনো শেষ হয় না

    ```ts
    function keepRunning(): never {
      while (true) {
        // কখনো রিটার্ন করবে না
      }
    }
    ```

- এটি টাইপ সিস্টেমকে বলে যে ওই কোডের পথে কখনই পৌঁছানো হবে না, তাই কম্পাইল‑টাইমে ত্রুটি ধরতে সাহায্য করে।
