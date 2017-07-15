Minimum

The previous chapter introduced the standard function Math.min that returns its smallest argument. 
We can do that ourselves now. Write a function min that takes two arguments and returns their minimum.

function min(x, y) {
  if (x < y)
    return x;
  else
    return y;
}

Recursion

We’ve seen that % (the remainder operator) can be used to test whether a number is even or odd by using % 2 to check whether it’s divisible by two. 
Here’s another way to define whether a positive whole number is even or odd:

 Zero is even.

 One is odd.

 For any other number N, its evenness is the same as N - 2.

Define a recursive function isEven corresponding to this description. 
The function should accept a number parameter and return a Boolean.

Test it on 50 and 75. See how it behaves on -1. Why? Can you think of a way to fix this?

function isEven(n) {
  if (n == 0)
    return true;
  else if (n == 1)
    return false;
  else if (n < 0)
    return isEven(-n);
  else
    return isEven(n - 2);
}

Bean counting

You can get the Nth character, 
or letter, 
from a string by writing "string".charAt(N), 
similar to how you get its length with "s".length. 
The returned value will be a string containing only one character (for example, "b"). 
The first character has position zero, which causes the last one to be found at position string.length - 1. 
In other words, a two-character string has length 2, and its characters have positions 0 and 1.

Write a function countBs that takes a string as its only argument and returns a number that indicates how many uppercase “B” characters are in the string.

Next, write a function called countChar that behaves like countBs, except it takes a second argument that indicates the character that is to be counted (rather than counting only uppercase “B” characters). 
Rewrite countBs to make use of this new function.

function countChar(string, ch) {
  var counted = 0;
  for (var i = 0; i < string.length; i++)
    if (string.charAt(i) == ch)
      counted += 1;
  return counted;
}

The sum of a range

The introduction of this book alluded to the following as a nice way to compute the sum of a range of numbers:

console.log(sum(range(1, 10)));
Write a range function that takes two arguments, 
start and end, and returns an array containing all the numbers from start up to (and including) end.

Next, write a sum function that takes an array of numbers and returns the sum of these numbers. 
Run the previous program and see whether it does indeed return 55.

As a bonus assignment, 
modify your range function to take an optional third argument that indicates the “step” value used to build up the array. 
If no step is given, the array elements go up by increments of one, corresponding to the old behavior. 
The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. 
Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2].

function range(start, end) {
  var arr = [];
  if (end > start)
    for (var i = start; i <= end; i++)
      arr.push(i);
  else
    for (var i = start; i >= end; i--)
      arr.push(i);
  return arr;
}

function sum(array) {
  var total = 0;
  for (var i = 0; i < array.length; i++)
    total += array[i];
  return total;
}

Reversing an array

Arrays have a method reverse, 
which changes the array by inverting the order in which its elements appear. 
For this exercise, write two functions, reverseArray and reverseArrayInPlace. 
The first, 
reverseArray, 
takes an array as argument and produces a new array that has the same elements in the inverse order. 
The second, 
reverseArrayInPlace, 
does what the reverse method does: it modifies the array given as argument in order to reverse its elements. 
Neither may use the standard reverse method.

Thinking back to the notes about side effects and pure functions in the previous chapter, 
which variant do you expect to be useful in more situations? 
Which one is more efficient?

function reverseArray(array) {
  var output = [];
  for (var i = array.length - 1; i >= 0; i--)
    output.push(array[i]);
  return output;
}

function reverseArrayInPlace(array) {
  for (var i = 0; i < Math.floor(array.length / 2); i++) {
    var old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
  return array;
}

Write a function arrayToList that builds up a data structure like the previous one when given [1, 2, 3] as argument, 
and write a listToArray function that produces an array from a list. 
Also write the helper functions prepend, 
which takes an element and a list and creates a new list that adds the element to the front of the input list, 
and nth, 
which takes a list and a number and returns the element at the given position in the list, 
or undefined when there is no such element.

function arrayToList(array) {
  var list = null;
  for (var i = array.length - 1; i >= 0; i--)
    list = {value: array[i], rest: list};
  return list;
}

function listToArray(list) {
  var array = [];
  for (var node = list; node; node = node.rest)
    array.push(node.value);
  return array;
}

function prepend(value, list) {
  return {value: value, rest: list};
}

function nth(list, n) {
  if (!list)
    return undefined;
  else if (n == 0)
    return list.value;
  else
    return nth(list.rest, n - 1);
}

Write a function, 
deepEqual, 
that takes two values and returns true only if they are the same value or are objects with the same properties whose values are also equal when compared with a recursive call to deepEqual.

To find out whether to compare two things by identity (use the === operator for that) or by looking at their properties, 
you can use the typeof operator. 
If it produces "object" for both values, 
you should do a deep comparison. 
But you have to take one silly exception into account: by a historical accident, 
typeof null also produces "object".

function deepEqual(a, b) {
  if (a === b) return true;
  
  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object")
    return false;
  
  var propsInA = 0, propsInB = 0;

  for (var prop in a)
    propsInA += 1;

  for (var prop in b) {
    propsInB += 1;
    if (!(prop in a) || !deepEqual(a[prop], b[prop]))
      return false;
  }

  return propsInA == propsInB;
}

Flattening

Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the input arrays.

var arrays = [[1, 2, 3], [4, 5], [6]];

console.log(arrays.reduce(function(flat, current) {
  return flat.concat(current);
}, []));

Mother-child age difference

Using the example data set from this chapter, 
compute the average age difference between mothers and children (the age of the mother when the child is born). 
You can use the average function defined earlier in this chapter.

Note that not all the mothers mentioned in the data are themselves present in the array. 
The byName object, 
which makes it easy to find a person’s object from their name, 
might be useful here.

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

var differences = ancestry.filter(function(person) {
  return byName[person.mother] != null;
}).map(function(person) {
  return person.born - byName[person.mother].born;
});

Historical life expectancy

When we looked up all the people in our data set that lived more than 90 years, 
only the latest generation in the data came out. 
Let’s take a closer look at that phenomenon.

Compute and output the average age of the people in the ancestry data set per century. 
A person is assigned to a century by taking their year of death, dividing it by 100, 
and rounding it up, 
as in Math.ceil(person.died / 100).

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

function groupBy(array, groupOf) {
  var groups = {};
  array.forEach(function(element) {
    var groupName = groupOf(element);
    if (groupName in groups)
      groups[groupName].push(element);
    else
      groups[groupName] = [element];
  });
  return groups;
}

var byCentury = groupBy(ancestry, function(person) {
  return Math.ceil(person.died / 100);
});

for (var century in byCentury) {
  var ages = byCentury[century].map(function(person) {
    return person.died - person.born;
  });
  console.log(century + ": " + average(ages));
}

Every and then some

Arrays also come with the standard methods every and some. 
Both take a predicate function that, 
when called with an array element as argument, 
returns true or false. 
Just like && returns a true value only when the expressions on both sides are true, 
every returns true only when the predicate returns true for all elements of the array. 
Similarly, 
some returns true as soon as the predicate returns true for any of the elements. 
They do not process more elements than necessary—for example, 
if some finds that the predicate holds for the first element of the array, 
it will not look at the values after that.

Write two functions, 
every and some, 
that behave like these methods, 
except that they take the array as their first argument rather than being a method.

function every(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (!predicate(array[i]))
      return false;
  }
  return true;
}

function some(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (predicate(array[i]))
      return true;
  }
  return false;
}
