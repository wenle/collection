# clear log
> /opt/var/log/ems/ems.log

# enable java remote debug
echo "enable servicemix remote debug"
sed -i '/PROGNAME/ a\
KARAF_DEBUG=true' /opt/bmi/ems/servicemix/bin/servicemix

# modify debug level and log size
echo "modify log level to DEBUG and log size to 100MB"
sed -i 's/INFO/DEBUG/' /opt/bmi/ems/servicemix/etc/org.ops4j.pax.logging.cfg
