#!bin/bash
#save_today_log.sh

DIR_LOG="/home/`whoami`/date_log"
YYMMDD=`date "+%y%m%d"`
FILE_NAME="Date_${YYMMDD}.txt"

if [ ! -d ${DIR_LOG} ]
then
	`mkdir -p ${DIR_LOG}`
fi

`date > ${DIR_LOG}/${FILE_NAME}`


