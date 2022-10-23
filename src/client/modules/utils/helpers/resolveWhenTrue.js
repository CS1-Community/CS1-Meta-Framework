export function resolveWhenTrue (resolve, reject, test) {
    let count = 0;
    setTimeout(() => {
      if (test) {
        resolve();
      } else if (count < 1000) {
        resolveWhenTrue(resolve, test);
        count++;
      } else {
        reject(test);
      }
    }, 200);
  }