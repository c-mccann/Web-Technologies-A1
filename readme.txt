Runs on apache server. Code might not run locally
but following these steps might allow it:

1: start cmd under windows 7
2: direct to chrome.exe folder
3: run command: chrome --allow-file-access-from-files file:///C:/path/to/file

this worked on MacOS when testing, and should on windows. This did not on Linux however, which is why I ran it on the server.
