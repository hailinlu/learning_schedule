## git 常用指令集

    2020年9月21日，开始记录每日随笔，写完想要上传至github，突然发现我已经习惯了使用小乌龟(TortoiseGit)了，而对于git的命令行方式确是一窍不通，总感觉欠缺点什么，所以又写下了这篇随笔。

```javascript
    // 设置基本信息
    git config --global user.name "your name"
    git config --global user.email "your email"

    // 切换到需要上传的目录下，初始化本地仓库
    git init

    // 添加文件和目录追踪
    git add 文件名/目录名

    // 仅更新已有文件，不添加新的文件
    // modified at 2020/12/11
    git add -u

    // 添加提交信息
    git commit -m "提交信息"

    // 关联代码仓库到github
    git remote add origin "github代码仓库的url地址"

    // 将远程仓库代码拉取到本地
    git pull origin master

    // 提交代码到远程仓库(需要输入用户名和密码)
    git push -u origin master
```

```javascript
    // 额外的一些git命令
    git status // 显示代码库状态
    git log // 打印提交信息
    git diff // 对比当前状态和版本库中状态的变化

    // modified at 2020/09/22
    git clone github代码仓库url
```

### modified at 2020/09/22  

    每次提交代码总要输入用户名密码，太麻烦了，那怎么办呢，哈哈，没错，我们可以记住用户名密码。

```javascript
    // 全局配置
    git config --global credential.helper cache  // 设置记住密码(15分钟)
    git config --global credential.helper "cache --timeout=3600"  // 设置记住密码(1小時)
    git config --global credential.helper store  // 设置永久记住密码
    
    // 针对单个项目配置，可以修改.git/config,配置如下
    [credential]
	    helper=store
	    username = "替换你的用户名"
```