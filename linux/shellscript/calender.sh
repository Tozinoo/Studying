#!/bin/bash

read IYEAR 
read IMONTH


IDATE=$(date -d "${IYEAR}${IMONTH}01")
str_array=($IDATE)

YEAR=${str_array[5]}
MONTH=${str_array[1]}
DAY=${str_array[0]}

YUN=0
LASTDAY=0
FIRSTDAY=1

MOD1=$(expr $YEAR % 4)
MOD2=$(expr $YEAR % 100)
MOD3=$(expr $YEAR % 400)

if [ $MOD1 -eq 0 -a $MOD2 -ne 0 -o $MOD3 -eq 0 ]; then
	YUN=29
else
	YUN=28
fi


if [ $MONTH == "Jan" ] || [ $MONTH == "Mar" ] || [ $MONTH == "May" ] || [ $MONTH == "Jul" ] || [ $MONTH == "Aug" ] || [ $MONTH == "Oct" ] || [ $MONTH == "Dec" ]; then 
	LASTDAY=31  
elif [ $MONTH == "Apr" ] || [ $MONTH == "Jun" ] || [ $MONTH == "Sep" ] || [ $MONTH == "Nov" ]; then
	LASTDAY=30 
else
	LASTDAY=$YUN 
fi

printf "SUN\tMON\tTUS\tWED\tTHU\tFRI\tSAT\n"
echo "====================================================="

FIRST=""
case ${DAY} in
	Sun) FIRST=""
		;;
	Mon) FIRST="\t"
		;;
	Tue) FIRST="\t\t"
		;;
	Wed) FIRST="\t\t\t"
		;;
	Thu) FIRST="\t\t\t\t"
		;;
	Fri) FIRST="\t\t\t\t\t"
		;;
	Sat) FIRST="\t\t\t\t\t\t"
		;;
esac	
TDATE=$(date -d "${IYEAR}${IMONTH}01")


while [ $FIRSTDAY -le $LASTDAY ]; do
	TDATE=$(date -d "${IYEAR}${IMONTH}$( printf '%02d' $FIRSTDAY)"); tstr_array=($TDATE); FIRST+=${FIRSTDAY}	
	if [ "${tstr_array[0]}" != "Sat" ]; then
		FIRST+="\t" 
	else 
		FIRST+="\n" 
	fi
	FIRSTDAY=$(expr $FIRSTDAY + 1)
done

printf $FIRST		
printf "\n"

