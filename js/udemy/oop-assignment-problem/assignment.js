class Course {
  #price;

  constructor(title, length, price) {
    this.title = title;
    this.length = length;
    this.price = price;
  }

  set price(price) {
    this.#price = price > 0 ? price : 0;
  }

  get price() {
    return `\$${this.#price.toFixed(2)}`;
  }

  lengthByPrice() {
    return (this.length / this.#price).toFixed(2);
  }

  summary() {
    console.log('Title: ', this.title);
    console.log('Length: ', this.length);
    console.log('Price', this.price);
  }
}

const course1 = new Course('JavaScript', 53, 22.9);
const course2 = new Course('CSS', 23, 21.9);

console.log(course1);
console.log(course2);

course1.summary();
console.log(course1.lengthByPrice());
course2.summary();
console.log(course2.lengthByPrice());

class PracticalCourse extends Course {
  constructor(title, length, price, numOfExercises) {
    super(title, length, price);
    this.numOfExercises = numOfExercises;
  }

  summary() {
    super.summary();
    console.log(this.numOfExercises);
  }
}

class TheoreticalCourse extends Course {
  constructor(title, length, price) {
    super(title, length, price);
  }

  publish() {
    console.log('This is the use of the publish method.');
  }
}

const practicalCourse = new PracticalCourse(
  'Practical Course',
  54,
  225.87,
  200
);

console.log(practicalCourse.title);
console.log(practicalCourse.length);
console.log(practicalCourse.price);
console.log(practicalCourse.numOfExercises);
practicalCourse.summary();
console.log(practicalCourse.lengthByPrice());

const theoricalCourse = new TheoreticalCourse('Theorical Course', 55, 11);

console.log(theoricalCourse.title);
console.log(theoricalCourse.length);
console.log(theoricalCourse.price);
theoricalCourse.summary();
theoricalCourse.publish();
console.log(theoricalCourse.lengthByPrice());
