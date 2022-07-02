#!/bin/bash
needBranch="master"
current=$(git symbolic-ref --short HEAD)
echo $current
if [ "$current" != "$needBranch" ]
then
    echo "当前在${current}分支，需要切换到${needBranch}分支，切换中"
    git checkout $needBranch
    echo "切换至${needBranch}分支成功"
fi
echo "当前在${current}分支，无需切换"
git add .
read -t 10 -p '请输入你commit的内容=>' message
echo $message
git commit -m $message
git push
echo "提交完成了！"
