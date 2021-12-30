#!/bin/bash
X=0
Y=12
Z=`expr $X + $Y`
echo $Z

Z=`expr $X \* $Y`
echo $Z

Z=`expr $X % $Y`
echo $Z

Z=`expr $X \& $Y`
echo $Z

Z=`expr $X \| $Y`
echo $Z


