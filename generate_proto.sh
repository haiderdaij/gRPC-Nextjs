mkdir generated 
protoc -I=. ./proto/product.proto \
  --js_out=import_style=commonjs:./generated \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:./generated