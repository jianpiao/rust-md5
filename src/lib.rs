#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use std::fs::File;
use std::io::{BufReader, Read};
use md5::{Md5, Digest};

#[napi]
pub fn md5(path: String) -> napi::Result<String> {
    let file = File::open(path).map_err(|e| napi::Error::from_reason(format!("文件打开失败: {}", e)))?;
    let mut reader = BufReader::with_capacity(65536, file);
    let mut hasher = Md5::new();
    let mut buffer = [0; 65536];

    while let Ok(n) = reader.read(&mut buffer) {
        if n == 0 {
            break;
        }
        hasher.update(&buffer[..n]);
    }

    let result = hasher.finalize();
    Ok(format!("{:x}", result))
}
