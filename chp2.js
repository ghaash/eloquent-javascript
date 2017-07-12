// Write a loop that makes seven calls to console.log to output the following triangle:

// #
// ##
// ###
// ####
// #####
// ######
// #######

for (var triangle = "#"; triangle.length < 8; triangle += "#")
  console.log(triangle);

// FizzBuzz

// Write a program that uses console.log to print all the numbers from 1 to 100, 
// with two exceptions. For numbers divisible by 3, 
// print "Fizz" instead of the number, 
// and for numbers divisible by 5 (and not 3), print "Buzz" instead.

// When you have that working, 
// modify your program to print "FizzBuzz", 
// for numbers that are divisible by both 3 and 5 
// (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).

for (var number = 1; number <= 100; number++) {
  var print = "";
  if (number % 3 == 0)
    print += "Fizz";
  if (number % 5 == 0)
    print += "Buzz";
  console.log(print || number);
}

// Chess board

// Write a program that creates a string that represents an 8×8 grid, 
// using newline characters to separate lines. 
// At each position of the grid there is either a space or a “#” character. 
// The characters should form a chess board.

// Passing this string to console.log should show something like this:

//  # # # #
// # # # #
//  # # # #
// # # # #
//  # # # #
// # # # #
//  # # # #
// # # # #
// When you have a program that generates this pattern, 
// define a variable size = 8 and change the program so that it works for any size, 
// outputting a grid of the given width and height.

var size = 8;
var chessboard = "";

for (var y = 0; y < size; y++) {
  for (var x = 0; x < size; x++) {
    if ((x + y) % 2 == 0)
      chessboard += " ";
    else
      chessboard += "#";
  }
  chessboard += "\n";
}

console.log(chessboard);