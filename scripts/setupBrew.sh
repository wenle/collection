# https://mirrors.ustc.edu.cn
# https://mirrors.aliyun.com/homebrew
# https://mirrors.tuna.tsinghua.edu.cn/git/homebrew
# https://mirrors.cloud.tencent.com/homebrew # 无cask

git -C "$(brew --repo)" remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-cask.git

if [ $SHELL = "/bin/bash" ] # 如果你的是bash
then 
    echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles/' >> ~/.bash_profile
    source ~/.bash_profile
elif [ $SHELL = "/bin/zsh" ] # 如果用的shell 是zsh 的话
then
    echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles/' >> ~/.zshrc
    source ~/.zshrc
fi

brew update

