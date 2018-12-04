# Pomodoro Traffic Light Visualizer Service

## Installation Instructions

It is configured to use Visual Studio Code as an IDE.

If you want to configure it, you must run the following npm commands:
- `npm install`
- `npm install -g typescript`
- `npm install -g rimraf`

The following user settings are also helpful for hiding unnecessary files:
```json
{
    "files.exclude": {
        "**/.git": true
    }
}
```

# Pomodoro Traffic Light Arduino Plugin

## Installation Instructions

It is configured to use Visual Studio Code as an IDE.

If you use Windows for development, you should do the following steps to ensure that the installation of `serialport` is working correctly:
1. Update Node.js to 8.11.1
2. Create a Visual C++ Project in VS 2017, and make sure it built succesfully
3. Execute the command `npm config set msvs_version 2017 --global`

If you want to configure it, you must run the following npm commands:
- `npm install`
- `npm install -g typescript`
- `npm install -g rimraf`

The following user settings are also helpful for hiding unnecessary files:
```json
{
    "files.exclude": {
        "**/.git": true
    }
}
```