#!/usr/bin/python
# by poplax [linjiang9999@gmail.com]

import sys
#import os

#print sys.argv

if 2 != len(sys.argv) :
	print "Useage : unicodePrint.py [unicode string, example: '\U6f14\U793a\U5b50\U7248']."
	print "Only support one Param!"
	sys.exit(0) 


p=unicode(sys.argv[1], 'utf-8')
print "unicode String : " + p

output = eval("u'" + p.replace('\U', '\u') + "'")
print output

