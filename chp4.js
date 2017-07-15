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