function getLyrics(songID) {
  const https = require('https');

  const url = `https://ncmapi.tidex.host/lyric/new?id=${songID}`;

  https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      return data;
      // console.log(data); // 打印响应数据
    });
  }).on('error', (error) => {
    console.error(error);
  });
}
module.exports = getLyrics();