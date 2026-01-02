export class CocosByteArray {
    public view:DataView;
    public buffer:ArrayBuffer;
    public byteLength:number
    
    constructor(buffer) {  
      if (buffer instanceof ArrayBuffer) {  
        this.view = new DataView(buffer);  
        this.byteLength = buffer.byteLength;  
      } else {  
        this.buffer = new ArrayBuffer(buffer || 0);  
        this.view = new DataView(this.buffer);  
        this.byteLength = this.buffer.byteLength;  
      }  
    }  
    
    // 写入字节  
    writeByte(offset, value) {  
      this.view.setInt8(offset, value);  
    }  
    
    // 写入短整型  
    writeShort(offset, value) {  
      this.view.setInt16(offset, value, true); // true 表示使用小端字节序  
    }  
    
    // 写入整型  
    writeInt(offset, value) {  
      this.view.setInt32(offset, value, true); // true 表示使用小端字节序  
    }  
    
    // 写入浮点型  
    writeFloat(offset, value) {  
      this.view.setFloat32(offset, value, true); // true 表示使用小端字节序  
    }  
    
    // 读取字节  
    readByte(offset) {  
      return this.view.getInt8(offset);  
    }  
    
    // 读取短整型  
    readShort(offset) {  
      return this.view.getInt16(offset, true); // true 表示使用小端字节序  
    }  
    
    // 读取整型  
    readInt(offset) {  
      return this.view.getInt32(offset, true); // true 表示使用小端字节序  
    }  
    
    // 读取浮点型  
    readFloat(offset) {  
      return this.view.getFloat32(offset, true); // true 表示使用小端字节序  
    }  
    
    // 获取字节长度  
    getLength() {  
      return this.byteLength;  
    }  
  }  