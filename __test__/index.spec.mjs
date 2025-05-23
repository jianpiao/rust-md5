import test from 'ava';
import { md5 } from '../index.js';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取当前模块的文件路径和目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.serial('md5 应该正确计算本地文件内容的 MD5 哈希值', async (t) => {
  const tempFilePath = join(__dirname, 'temp_test_file.txt');
  const fileContent = 'hello world';
  const expected = '5eb63bbbe01eeed093cb22bb8f5acdc3';

  try {
    // 创建临时文件
    await writeFile(tempFilePath, fileContent);

    // 读取文件内容并计算 MD5
    const result = md5(tempFilePath);
    t.is(result, expected);
  } catch (error) {
    t.fail(`测试过程中出现错误: ${error.message}`);
  } finally {
    // 删除临时文件
    try {
      await unlink(tempFilePath);
    } catch (error) {
      console.warn(`删除临时文件时出错: ${error.message}`);
    }
  }
});