import time
import math
import sys

# Retry decorator with exponential backoff
def retry(tries, delay=3, backoff=2, progress_bar=None):
    '''Retries a function or method until it returns True.
    
    delay sets the initial delay in seconds, and backoff sets the factor by which
    the delay should lengthen after each failure.
    backoff must be at least 1. when backoff is 1, it becomes a fixed delay 
    tries must be at least 0, and delay
    greater than 0.'''
    
    if backoff < 1:
        raise ValueError("backoff must be 1 or greater")
    
    tries = math.floor(tries)
    if tries < 0:
        raise ValueError("tries must be 0 or greater")
    
    if delay <= 0:
        raise ValueError("delay must be greater than 0")
    
    def sleep(seconds):
        if progress_bar:
            for x in range(seconds):
                time.sleep(1)
                print ".",
                sys.stdout.flush()
        else:
            time.sleep(seconds)
    
    def deco_retry(f):
        def f_retry(*args, **kwargs):
            mtries, mdelay = tries, delay # make mutable
    
            rv = f(*args, **kwargs) # first attempt
            while mtries > 0:
                if rv is True: # Done on success
                    if progress_bar and mtries < tries:
                        print "." # add new line
                    return True
    
                mtries -= 1      # consume an attempt
                sleep(mdelay) # wait...
                mdelay *= backoff  # make future wait longer
        
                rv = f(*args, **kwargs) # Try again
            
            if progress_bar and mtries < tries:
                print "." # add new line
            return rv
    
        return f_retry # true decorator -> decorated function
    return deco_retry  # @retry(arg[, ...]) -> true decorator