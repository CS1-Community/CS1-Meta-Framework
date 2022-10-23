export const utils = {
  loadScript: function (url, test) {
    return new Promise(function (resolve, reject) {
      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.addEventListener("load", function () {
        this.removeEventListener("load", this);
        if (test) {
          utils.resolveWhenTrue(resolve, reject, test);
        } else {
          console.log("Resolving loadScript in utils!");
          resolve();
        }
      });
      script.src = url;
      head.appendChild(script);
    });
  },

  resolveWhenTrue: function (resolve, reject, test) {
    let count = 0;
    setTimeout(() => {
      if (test) {
        resolve();
      } else if (count < 1000) {
        utils.resolveWhenTrue(resolve, test);
        count++;
      } else {
        reject(test);
      }
    }, 200);
  },

  uuid: function () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  },

  equals: function (a, b) {
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
  },

  deepCopy: (inObject) => {
    let outObject, value, key;

    if (typeof inObject !== "object" || inObject === null) {
      return inObject; // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
      value = inObject[key];

      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = utils.deepCopy(value);
    }

    return outObject;
  },

  getDecendantProp: function (obj, desc) {
    var arr = desc.split(".");
    while (arr.length) {
      obj = obj[arr.shift()];
    }
    return obj;
  },

  setDecendantProp: function (obj, desc, value) {
    var arr = desc.split(".");
    while (arr.length > 1) {
      obj = obj[arr.shift()];
    }
    return (obj[arr[0]] = value);
  },
};

export const uuid = utils.uuid;
export const loadScript = utils.loadScript;
export const equals = utils.equals;
export const deepCopy = utils.deepCopy;
export const getDecendantProp = utils.getDecendantProp;
export const setDecendantProp = utils.setDecendantProp;
