#!/bin/sh

set -e
sync="false"
if [ "$1" = "true" ]; then
  sync="true"
fi

if ! [ -d idl ]; then
  sync="true"
fi

if [ "$sync" = "true" ]; then
  DIR=`dirname $0`
  DIR=`cd $DIR; pwd -P`
  STR=$(tr -dc _A-Z-a-z-0-9 < /dev/urandom | head -c12)
#  DATE_STR=$(date +"%Y-%m-%d-%H-%M-%S" )
  CLIENT="$USER-$STR"
  P4="p4 -P eshiny718 -p bjvc:1666 -u $USER "
  $P4 client -i <<__EOF

Client: $CLIENT

Root: $DIR

View:

    //depot/shared/ems/common/components/management/commons-ne/src/main/thrift/... //$CLIENT/idl/...

__EOF

  echo "Fetching .thrift file from //depot"
  $P4 -c $CLIENT sync > /dev/null
  $P4 client -d $CLIENT 
fi
if ! [ -d idl ]; then
  echo "Please sync first!"
  exit -1
fi
echo "Generating Ruby code ..."
for f in idl/T3100/7.0.1/*.thrift; do
#for f in idl/T2100/1.2.0/*.thrift; do
  name=`basename $f`
  thrift --gen rb $f
  echo "gen-rb/${name%%.thrift}.rb"
done
