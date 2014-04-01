#!/usr/bin/env ruby
$:.push('./gen-rb')

require 'rubygems'
require 'thrift'
require 'cfg_mgr'
require 'inventory_types'
require '.get_args'
require 'pp'
require 'csv'
require 'socket'
require 'openssl'

module Thrift
  class SSLSocket < Socket
    def initialize(host='localhost', port=9090, timeout=nil, ca=nil)
     super(host, port, timeout)

     @ssl_context = OpenSSL::SSL::SSLContext.new()

     if ca != nil
       @ssl_context.verify_mode = OpenSSL::SSL::VERIFY_PEER
       @ssl_context.ca_file = ca
     end
    end

    def open
     begin
       socket = super
       @handle = OpenSSL::SSL::SSLSocket.new(socket, @ssl_context)
       begin
         @handle.connect
       rescue Errno::EINPROGRESS
         unless IO.select(nil, [ @handle ], nil, @timeout)
           raise TransportException.new(TransportException::NOT_OPEN, "Connection timeout to #{@desc}")
         end
         begin
           @handle.connect
         rescue Errno::EISCONN
         end
       end
       @handle
     rescue StandardError => e
       raise TransportException.new(TransportException::NOT_OPEN, "Could not connect to #{@desc}: #{e}")
     end
     end
  end
end

class ThriftClient
  def initialize(options)
    url = options[:url]
    @transport = Thrift::SSLSocket.new(*url)
    protocol = Thrift::BinaryProtocol.new(@transport)
    @client = CfgMgr::Client.new(protocol)
    @transport.open
    invoke {
      auth = options[:auth]
      auth ||= ['username', 'password']
      @session = @client.UserLogin(*auth)
      puts "User Logged in #{url.inspect} #{@session.inspect}"
    }
  end

  def invoke(&block)
    begin
      block.call
    rescue ::Thrift::Exception => tx
      puts tx.errMsg if tx.respond_to?(:errMsg)
      puts tx.message if tx.respond_to?(:message)
      puts tx.backtrace
      raise "Can't invoke! #{block}"
    end
  end

  def method_missing(name, *args)
    method = @client.method(name)
      if method.arity == 0
        method.call()
      else
        method.call(@session.sessionId, *args)
      end
  end

  def close
    @client.UserLogout(@session.sessionId)
    @transport.close
  end
end

def execution(csv_arg)
  arg_values = CSV.parse_line(csv_arg, ' ').map {|v| v.data}
  puts "Executing: #{arg_values.join(' ')}"
  method = arg_values[0]
  raise "Method not provided!" if method.nil?
  unless CfgMgr::Client.instance_methods.include?(method)
    abort "No such method(\"#{method}\")!"
  end
  arg_values.shift
  invokcation = "Client.#{method}(#{arg_values.join(',')})"
  puts "Invoking #{invokcation}"
  pp eval(invokcation)
end
