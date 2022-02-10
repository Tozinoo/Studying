#!/bin/bash

today="Date_$(date '+%y%m%d').txt"

if [ -d /home/chs/date_log ]; then
	echo '/date_log가 존재합니다'
else
	mkdir /home/chs/date_log
fi

if [ -f /home/chs/date_log/$today ]
then 
	echo "$today 파일이 존재합니다."
else
	date > /home/chs/date_log/$today
fi


