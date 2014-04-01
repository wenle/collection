#!/usr/bin/env ruby

require 'rubygems'
require '.get_args'
require 'thrift'

$: << './gen-rb'
require 'cfg_mgr'

methods = CfgMgr::Client.instance_methods - ::Thrift::Client.instance_methods - Object.instance_methods
methods = methods.delete_if do |m|
  m =~ /^send_/ or m =~ /^recv_/
end

method_name = ARGV[1]
if method_name.nil?
  puts methods.join(' ')
else
  regex = Regexp.compile("^#{method_name}")
  matched = methods.select {|m| regex.match(m) }
  unless matched.empty?
    if matched.size == 1
      matched_method = matched[0]
      method = CfgMgr::Client.instance_method(matched_method.to_sym)
      if method_name != matched[0]
        puts matched_method
      else
        method_args = method.get_args.flatten.map{|f| f.to_s}
        method_args = method_args.delete_if {|arg| arg == 'ssId'}
        puts method_args.join(' ')
#         args_size = method_args.size - (ARGV.size - 2)
#         if args_size >= 0
#           puts method_args.last(args_size).join(' ')
#         end
      end
    else
      puts matched.join(' ')
    end
  end
end

