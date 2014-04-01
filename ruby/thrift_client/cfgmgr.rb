#!/usr/bin/env ruby
require 'client'

host = ENV['CFGMGR_HOST'] ||= "1.1.1.1"
port = (ENV['CFGMGR_PORT'] ||= '9090').to_i
user = ENV['CFGMGR_USER'] ||= 'username'
passwd = ENV['CFGMGR_PASSWD'] ||= 'password'
abort 'CFGMGR_HOST is not specified' if host.nil?
Client = ThriftClient.new(:url => [host, port], :auth => [user, passwd])
begin 
  unless ARGV.empty?
    execution(ARGV.join(' '))
  else
    ARGF.each_line do |line|
      next if line =~ /^#/
      execution(line)
    end
  end
rescue Exception => err
  puts "Error: #{err.errMsg}" if err.respond_to?(:errMsg)
  puts "Error: #{err.message}" if err.respond_to?(:message)
  puts err.backtrace
end
puts "Logout ..."
Client.close
