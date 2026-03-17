/**
 * Parser for brModelo 2.0 native binary format (.brM)
 * This format uses Delphi's TReader/TWriter serialization.
 * 
 * Signature: \x052.0.0 TPF0 TModelo
 */

export class BrmSerializer {
    // Write Delphi string (1 byte length + ASCII chars)
    static writeString(buffer, offset, str) {
        if (!str) {
            buffer.setUint8(offset++, 0);
            return offset;
        }
        buffer.setUint8(offset++, str.length);
        for (let i = 0; i < str.length; i++) {
            buffer.setUint8(offset++, str.charCodeAt(i));
        }
        return offset;
    }

    // Write Delphi 32-bit integer (little endian)
    static writeInt32(buffer, offset, val) {
        // TValueType.vaInt32 = 3
        buffer.setUint8(offset++, 3);
        buffer.setInt32(offset, val, true);
        offset += 4;
        return offset;
    }

    // Write Delphi 8-bit integer
    static writeInt8(buffer, offset, val) {
        // TValueType.vaInt8 = 2
        buffer.setUint8(offset++, 2);
        buffer.setInt8(offset++, val);
        return offset;
    }

    // Export current state to .brM Blob
    static export(modelData) {
        const objects = Object.values(modelData.objects);
        const connections = Object.values(modelData.connections);

        // Pre-allocate a large enough buffer (we'll slice it later)
        const arrayBuffer = new ArrayBuffer(1024 * 1024);
        const view = new DataView(arrayBuffer);
        let offset = 0;

        // Header: [0x05] "2.0.0"
        offset = this.writeString(view, offset, "2.0.0");
        
        // TPF0 magic
        view.setUint8(offset++, 0x54); // T
        view.setUint8(offset++, 0x50); // P
        view.setUint8(offset++, 0x46); // F
        view.setUint8(offset++, 0x30); // 0

        // Class Name: TModelo
        offset = this.writeString(view, offset, "TModelo");
        
        // Instance Name: ""
        offset = this.writeString(view, offset, "");

        // TModelo Properties:
        // Left, Top, Width, Height
        offset = this.writeString(view, offset, "Left");
        offset = this.writeInt32(view, offset, 0);
        offset = this.writeString(view, offset, "Top");
        offset = this.writeInt32(view, offset, 0);

        // End of properties
        view.setUint8(offset++, 0x00);

        // Children of TModelo
        for (const obj of objects) {
            if (obj.type === 'entity') {
                offset = this.writeString(view, offset, "TEntidade");
                offset = this.writeString(view, offset, `Entity_${obj.id.replace(/-/g, '')}`);
                
                offset = this.writeString(view, offset, "Left");
                offset = this.writeInt32(view, offset, Math.round(obj.x));
                offset = this.writeString(view, offset, "Top");
                offset = this.writeInt32(view, offset, Math.round(obj.y));
                offset = this.writeString(view, offset, "Width");
                offset = this.writeInt32(view, offset, Math.round(obj.width));
                offset = this.writeString(view, offset, "Height");
                offset = this.writeInt32(view, offset, Math.round(obj.height));
                offset = this.writeString(view, offset, "Nome");
                offset = this.writeString(view, offset, obj.name || "");
                offset = this.writeString(view, offset, "OID");
                offset = this.writeString(view, offset, obj.id);

                view.setUint8(offset++, 0x00); // End properties
                view.setUint8(offset++, 0x00); // End children
            }
            if (obj.type === 'relationship') {
                offset = this.writeString(view, offset, "TRelacao");
                offset = this.writeString(view, offset, `Rel_${obj.id.replace(/-/g, '')}`);
                
                offset = this.writeString(view, offset, "Left");
                offset = this.writeInt32(view, offset, Math.round(obj.x));
                offset = this.writeString(view, offset, "Top");
                offset = this.writeInt32(view, offset, Math.round(obj.y));
                offset = this.writeString(view, offset, "Width");
                offset = this.writeInt32(view, offset, Math.round(obj.width));
                offset = this.writeString(view, offset, "Height");
                offset = this.writeInt32(view, offset, Math.round(obj.height));
                offset = this.writeString(view, offset, "Nome");
                offset = this.writeString(view, offset, obj.name || "");
                offset = this.writeString(view, offset, "OID");
                offset = this.writeString(view, offset, obj.id);

                view.setUint8(offset++, 0x00); // End properties
                view.setUint8(offset++, 0x00); // End children
            }
            if (obj.type === 'attribute') {
                offset = this.writeString(view, offset, "TAtributo");
                offset = this.writeString(view, offset, `Attr_${obj.id.replace(/-/g, '')}`);
                
                offset = this.writeString(view, offset, "Left");
                offset = this.writeInt32(view, offset, Math.round(obj.x - obj.rx));
                offset = this.writeString(view, offset, "Top");
                offset = this.writeInt32(view, offset, Math.round(obj.y - obj.ry));
                offset = this.writeString(view, offset, "Nome");
                offset = this.writeString(view, offset, obj.name || "");
                offset = this.writeString(view, offset, "OID");
                offset = this.writeString(view, offset, obj.id);
                // TipoDoValo: 1=Identificador, 3=Opcional, 4=Multivalorado, 0=Normal
                const typeVal = obj.identifier ? 1 : (obj.multiValued ? 4 : (obj.optional ? 3 : 0));
                offset = this.writeString(view, offset, "TipoDoValo");
                offset = this.writeInt8(view, offset, typeVal);
                offset = this.writeString(view, offset, "Opciona");
                view.setUint8(offset++, 6); // vaTrue (7) or vaFalse (6)
                view.setUint8(offset - 1, obj.optional ? 7 : 6);

                view.setUint8(offset++, 0x00); // End properties
                view.setUint8(offset++, 0x00); // End children
            }
            if (obj.type === 'associative') {
                offset = this.writeString(view, offset, "TEntidadeAssociativa");
                offset = this.writeString(view, offset, `Assoc_${obj.id.replace(/-/g, '')}`);
                
                offset = this.writeString(view, offset, "Left");
                offset = this.writeInt32(view, offset, Math.round(obj.x));
                offset = this.writeString(view, offset, "Top");
                offset = this.writeInt32(view, offset, Math.round(obj.y));
                offset = this.writeString(view, offset, "Width");
                offset = this.writeInt32(view, offset, Math.round(obj.width || 120));
                offset = this.writeString(view, offset, "Height");
                offset = this.writeInt32(view, offset, Math.round(obj.height || 60));
                offset = this.writeString(view, offset, "Nome");
                offset = this.writeString(view, offset, obj.name || "");
                offset = this.writeString(view, offset, "OID");
                offset = this.writeString(view, offset, obj.id);

                view.setUint8(offset++, 0x00); // End properties
                view.setUint8(offset++, 0x00); // End children
            }
            if (obj.type === 'specialization') {
                offset = this.writeString(view, offset, "TEspecializacao");
                offset = this.writeString(view, offset, `Spec_${obj.id.replace(/-/g, '')}`);
                
                offset = this.writeString(view, offset, "Left");
                offset = this.writeInt32(view, offset, Math.round(obj.x));
                offset = this.writeString(view, offset, "Top");
                offset = this.writeInt32(view, offset, Math.round(obj.y));
                offset = this.writeString(view, offset, "OID");
                offset = this.writeString(view, offset, obj.id);
                offset = this.writeString(view, offset, "Sobreposta");
                view.setUint8(offset++, obj.disjoint ? 6 : 7); // 6=vaFalse, 7=vaTrue

                view.setUint8(offset++, 0x00); // End properties
                view.setUint8(offset++, 0x00); // End children
            }
            if (obj.type === 'text') {
                offset = this.writeString(view, offset, "TComentario");
                offset = this.writeString(view, offset, `Text_${obj.id.replace(/-/g, '')}`);
                
                offset = this.writeString(view, offset, "Left");
                offset = this.writeInt32(view, offset, Math.round(obj.x));
                offset = this.writeString(view, offset, "Top");
                offset = this.writeInt32(view, offset, Math.round(obj.y));
                offset = this.writeString(view, offset, "Texto");
                offset = this.writeString(view, offset, obj.text || "Texto");
                offset = this.writeString(view, offset, "OID");
                offset = this.writeString(view, offset, obj.id);

                view.setUint8(offset++, 0x00); // End properties
                view.setUint8(offset++, 0x00); // End children
            }
            // For Connections: TCardinalidade
        }

        // Connections mapping
        for (const conn of connections) {
            offset = this.writeString(view, offset, "TCardinalidade");
            offset = this.writeString(view, offset, `Card_${conn.id.replace(/-/g, '')}`);
            offset = this.writeString(view, offset, "Comando_Oid");
            offset = this.writeString(view, offset, conn.from);
            offset = this.writeString(view, offset, "SubComando_Oid");
            offset = this.writeString(view, offset, conn.to);
            offset = this.writeString(view, offset, "MinCard");
            offset = this.writeString(view, offset, conn.cardFrom?.split(',')[0] || "1");
            offset = this.writeString(view, offset, "MaxCard");
            offset = this.writeString(view, offset, conn.cardFrom?.split(',')[1] || "n");

            view.setUint8(offset++, 0x00); // End properties
            view.setUint8(offset++, 0x00); // End children
        }

        // End of all children
        view.setUint8(offset++, 0x00);

        // Create Blob
        const finalBuffer = arrayBuffer.slice(0, offset);
        return new Blob([finalBuffer], { type: 'application/octet-stream' });
    }
}
