const fs = require('fs');

// 读取文件内容
fs.readFile('input.txt', 'utf8', function(err, data) {
  if (err) {
    console.error(err);
    return;
  }

  // 替换换行符
  var replacedText = data.replace(/\\n/g, "\r\n");
  console.log(replacedText);
  // 写入替换后的内容到新文件
  fs.writeFile('output.txt', replacedText, 'utf8', function(err) {
    if (err) {
      console.error(err);
      return;
    }
    
    console.log('替换完成并写入新文件');
  });
});
