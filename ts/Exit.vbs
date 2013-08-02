CreateObject("WScript.Shell").AppActivate "mathcad"
CreateObject("WScript.Shell").SendKeys "{F10}" 
CreateObject("WScript.Shell").SendKeys "w" 
CreateObject("WScript.Shell").SendKeys "1" 
Wscript.Sleep 1*1000 
CreateObject("WScript.Shell").SendKeys "{F10}" 
CreateObject("WScript.Shell").SendKeys "f" 
CreateObject("WScript.Shell").SendKeys "x"
