#!/bin/bash                            
                                       
set -e                                 
                                       
APPNAME=fuel   
                                       
APPDIR=/srv/www/fuelagent/repo/server/ 
                                       
LOGFILE=$APPDIRfuelagent.log           
                                       
ERRORFILE=$APPDIRerror.log             
                                       
LOGDIR=$(dirname $LOGFILE)             

NUM_WORKERS=3

SETTINGS=$APPNAME.settings

#The below address:port info will be used later to configure Nginx with Gunicorn

ADDRESS=127.0.0.1:8000

# user/group to run as

#USER=yiksurnc

#GROUP=your_unix_group

cd $APPDIR

source env/bin/activate

exec gunicorn -e DJANGO_SETTINGS_MODULE=$SETTINGS $APPNAME.wsgi \
-w $NUM_WORKERS --bind=$ADDRESS \
--log-level=debug \
--log-file=$LOGFILE 2>>$LOGFILE  1>>$ERRORFILE  &
