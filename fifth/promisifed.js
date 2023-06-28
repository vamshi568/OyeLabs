import request from 'request';

function getGoogleHomePageAsync(url) {
  let results= new Promise((res, rej) => {
    request(url, (e, response, body)=> {
      if (e) {
        console.error('error:', e);
        rej(e);
      } else {
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        res(body);
      }
    });
  });
  return results;
}

getGoogleHomePageAsync('http://www.google.com')
  .then((result) => {
    console.log('RESULT ==>', result);
  })
  .catch((error) => {
    console.log('ERROR ==>', error);
  });
