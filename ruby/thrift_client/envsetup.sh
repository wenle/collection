#!/bin/sh
export CFGMGR_HOST=1.1.1.1
export CFGMGR_PORT=9090
export CFGMGR_USER="username"
export CFGMGR_PASSWD="password"

_cfgMgr ()
{
  methods=`ruby .methods.rb ${COMP_LINE}`
  local cur
  cur=${COMP_WORDS[COMP_CWORD]}
  COMPREPLY=( $( compgen -W "$methods" -- $cur ) )
  return 0
}

complete -F _cfgMgr -o filenames ./cfgmgr.rb
