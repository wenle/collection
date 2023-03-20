#!/usr/bin/env bash
# try to recover deleted file from disk
# search per GB to avoid memory exhausted

for((i=1;i<259;i++))
do
  echo "search the ${i}th GB"
  let skip=$i*1024
  echo $skip
  dd if=/dev/sda1 bs=1048576 skip=$skip count=1024 | grep -a -B50 -A100 "readUserInput gateway" > /boot/result.txt
  if [ $? -eq 0 ]; then
    echo "found, $i"
    break
  fi
done
