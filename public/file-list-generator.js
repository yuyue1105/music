// file-list-generator.js
const fs = require('fs');
const path = require('path');

// 配置参数
const TARGET_DIR = './public/music'; // 要扫描的文件夹路径
const OUTPUT_FILE = './src/utils/music.ts'; // 生成的 TS 文件路径

// 确保输出目录存在
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 读取目标文件夹
fs.readdir(TARGET_DIR, (err, files) => {
  if (err) {
    console.error(`读取文件夹失败: ${err}`);
    return;
  }

  // 过滤出文件（排除目录）
  const fileNames = files.filter(file =>{ 
    let fileArray=file.split('.')
    return fs.statSync(path.join(TARGET_DIR, file)).isFile()&&['mp3'].includes(fileArray[fileArray.length-1])
  });

  // 生成 TS 文件内容
  const tsContent = `
// 此文件由脚本自动生成，请勿手动修改
const fileList = ${JSON.stringify(fileNames, null, 2)};
export default fileList
  `;

  // 写入文件
  fs.writeFile(OUTPUT_FILE, tsContent, (writeErr) => {
    if (writeErr) {
      console.error(`写入文件失败: ${writeErr}`);
      return;
    }
    console.log(`✅ 成功生成文件列表到: ${OUTPUT_FILE}`);
    console.log(`✅ 共找到 ${fileNames.length} 个文件`);
  });
});