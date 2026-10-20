import http.server, os, sys, re
class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
    def send_head(self):
        path=self.translate_path(self.path); r=self.headers.get('Range')
        if not r or not os.path.isfile(path): return super().send_head()
        m=re.match(r'bytes=(\d*)-(\d*)',r); size=os.path.getsize(path); a=int(m.group(1) or 0); b=int(m.group(2) or size-1); b=min(b,size-1)
        f=open(path,'rb'); f.seek(a); self.send_response(206); self.send_header('Content-Type',self.guess_type(path)); self.send_header('Accept-Ranges','bytes')
        self.send_header('Content-Range',f'bytes {a}-{b}/{size}'); self.send_header('Content-Length',str(b-a+1)); self.end_headers()
        class R:
            def __init__(s,f,n): s.f,s.n=f,n
            def read(s,k=-1):
                if s.n<=0: return b''
                d=s.f.read(s.n if k<0 else min(k,s.n)); s.n-=len(d); return d
            def close(s): s.f.close()
        return R(f,b-a+1)
os.chdir(sys.argv[1]); http.server.ThreadingHTTPServer(('127.0.0.1',int(sys.argv[2])),H).serve_forever()
