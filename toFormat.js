function toFormat(Lyrics){
        // 使用正则表达式匹配时间标签 [hh:mm:ss]
    // const timeTagRegex = /\[\d{2}:\d{2}.\d{2}\]/g;
    const timeTagRegex = /\[\d{2}:\d{2}.\d{2,3}\]/g;

    // 将文本按行分割成数组
    const lines = Lyrics.replace(/\\n/g, "\r\n").split('\n');

    // 存储结果的数组
    const result = [];

    // 遍历每一行
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // 在当前行中查找时间标签
        const timeTags = line.match(timeTagRegex);

        // 如果当前行包含时间标签
        if (timeTags) {
            // 提取歌词
            const lyrics = line.replace(timeTagRegex, '').trim();

            // 复制歌词到下一行，并插入时间标签
            for (const timeTag of timeTags) {
                result.push(`${timeTag}${lyrics}`);
            }
        }
    }

    // 以下为时间排序

    // 存储时间标签和行的映射关系的数组
    const timeTagMap = [];

    // 遍历每一行
    for (let i = 0; i < result.join("\r\n").split('\n').length; i++) {
        const line = result.join("\r\n").split('\n')[i];

        // 在当前行中查找时间标签
        const timeTags = line.match(timeTagRegex);

        // 如果当前行包含时间标签
        if (timeTags) {
            // 提取第一个时间标签
            const timeTag = timeTags[0];

            // 将时间标签和行的映射关系存储到数组中
            timeTagMap.push({
                timeTag: timeTag,
                line: line
            });
        }
    }

    // 根据时间标签对映射关系进行排序
    timeTagMap.sort((a, b) => {
        // 提取时间标签中的时间部分，并转换为秒数进行比较
        const timeA = parseFloat(a.timeTag.substring(1, 9).replace(':', '.'));
        const timeB = parseFloat(b.timeTag.substring(1, 9).replace(':', '.'));

        return timeA - timeB;
    });
    return timeTagMap.map(item => item.line).join('\n');
}
module.exports = toFormat();