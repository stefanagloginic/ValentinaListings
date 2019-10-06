# ValentinaListings

# AWS Elastic Beansalk (aka EB)

Clone the following repo 

```
git clone https://github.com/aws/aws-elastic-beanstalk-cli-setup $HOME/aws-elastic-beanstalk-cli-setup
```

EB requires python so we will use a python version manager
```
brew install pyenv
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

Once this has succeded we will install the EB CLI
```
$HOME/aws-elastic-beanstalk-cli-setup/scripts/bundled_installer
```

There will be output from the installer you will need to add certian env variables to your path look at the output for something like the following:

```
When done run this `echo 'export PATH=/Users/arivera01/.pyenv/versions/3.7.2/bin:$PATH' >> /Users/arivera01/.bash_profile && source /Users/arivera01/.bash_profile` it should be output once the previous command finishes

Also run this echo 'export PATH="/Users/arivera01/.ebcli-virtual-env/executables:$PATH"' >> ~/.bash_profile && source ~/.bash_profile
```

You will setup the basic stuff for EB. run the init script
```
eb init
```

You will see the following prompt you can find the id & key in the [AWS Console](https://console.aws.amazon.com/iam/home?region=us-west-1#/security_credentials) under Access Keys. Use the IAM account set on slack. 
```
You have not yet set up your credentials or your credentials are incorrect 
You must provide your credentials.
(aws-access-id): <You can find in the AWS console>
(aws-secret-key): <You can find in the AWS console>
```

Select a default region
2) us-west-1 : US West (N. California)

Next select the applicaton 
1) ValentinaListings

Do you wish to continue with CodeCommit?
No

Now we can make changes and deploy them to an enviroment

Change the welcome message in Home.js

Now you will need to create the build, since AWS doesn't install dev dependencies
```
npm run build
```
You can do
```
git status
```
and see that the build folder was updated

You will need to commit these changes before you can push to aws

```
git add .
git commit -n -m "My message"
```

Now you can deploy it!
```
# Wait until this command is finished completely
eb deploy production
```

Now you can see your changes! 
```
eb open
```
Try reloading if the page isn't responding at first





