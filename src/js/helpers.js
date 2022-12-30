import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, upload = undefined) {
  try {
    const fetchpro = !upload
      ? fetch(url)
      : fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(upload),
        });

    const res = await Promise.race([fetchpro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${data.status}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} ${data.status}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const sendJSON = async function (url, upload) {
//   try {
//     const fetchpro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(upload),
//     });
//     const res = await Promise.race([fetchpro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok) throw new Error(`${data.message} ${data.status}`);
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
