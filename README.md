# ValentinaListings

# AWS Elastic Beansalk (aka EB)

Clone the following repo anywhere in any directory

```
$ Git clone https://github.com/aws/aws-elastic-beanstalk-cli-setup $HOME/aws-elastic-beanstalk-cli-setup
```

EB requires python so we will use a python version manager
```
$ brew install pyenv
```

Once installed we will be using Python 3.7.2 since that is what EB expects
We have to set the C compiler to clang otherwise pyenv will look for gcc-4.0
```
CC=clang pyenv install 3.7.2
```

if any issues occur you may have to install command line software with xcode
```
xcode-select --install
```