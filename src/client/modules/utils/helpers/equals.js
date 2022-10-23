export function equals (a, b) {
    var typeofa, typeofb, i, len, key;

    // If a and b refer to the same object then they are equal.
    if (a === b) return true;

    // Get the native type of both a and b. Use the built-in valueOf()
    // function to get the native object of each variable.
    typeofa = a === null ? "null" : typeof (a = a ? a.valueOf() : a);
    typeofb = b === null ? "null" : typeof (b = b ? b.valueOf() : b);

    // If a and b are not the same native type.
    if (typeofa !== typeofb) return false;

    switch (typeofa) {
      case "string":
      case "boolean":
      case "number":
      case "functon":
      case "undefined":
      case "null":
        return a === b;
    }

    // Convert the native type to a string. This allows us to test
    // if either a or b are Arrays and then handle accordingly.
    typeofa = {}.toString.call(a);
    typeofb = {}.toString.call(b);

    if (typeofa === typeofb) {
      // Compare the items of two arrays
      if (typeofa === "[object Array]") {
        if (a.length !== b.length) return false;

        len = a.length;
        for (i = 0; i < len; i++) {
          if (!utils.equals(a[i], b[i])) return false;
        }
        // Compare the keys of two objects
      } else {
        for (key in a) {
          if (!(key in b)) return false;

          if (!utils.equals(a[key], b[key])) return false;
        }
      }
    } else {
      return false;
    }

    return true;
  }