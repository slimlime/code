/*
    Jenkins lookup3 (hashlittle2)
    ---------------
    Jenkins lookup3 hash implemented by bryc (github.com/bryc)
    Can also output good quality 64-bit hash using b.
    
    c is better mixed than b, which is better mixed than a.
    thus a+b+c is not a high quality 96-bit hash.
*/

function lookup3(k, init = 0, init2 = 0) {
    var len = k.length, o = 0,
        a = 0xdeadbeef + len + init | 0,
        b = 0xdeadbeef + len + init | 0,
        c = 0xdeadbeef + len + init + init2 | 0;
  
    while (len > 12) {
        a += k[o]   | k[o+1] << 8 | k[o+2]  << 16 | k[o+3]  << 24;
        b += k[o+4] | k[o+5] << 8 | k[o+6]  << 16 | k[o+7]  << 24;
        c += k[o+8] | k[o+9] << 8 | k[o+10] << 16 | k[o+11] << 24;
        
        a -= c; a ^= c<<4  | c>>>28; c = c+b | 0;
        b -= a; b ^= a<<6  | a>>>26; a = a+c | 0;
        c -= b; c ^= b<<8  | b>>>24; b = b+a | 0;
        a -= c; a ^= c<<16 | c>>>16; c = c+b | 0;
        b -= a; b ^= a<<19 | a>>>13; a = a+c | 0;
        c -= b; c ^= b<<4  | b>>>28; b = b+a | 0;

        len -= 12, o += 12;
    }

    if(len > 0) { // final mix only if len > 0
        switch (len) {
            case 12: c += k[o+11] << 24;
            case 11: c += k[o+10] << 16;
            case 10: c += k[o+9] << 8;
            case  9: c += k[o+8];
            case  8: b += k[o+7] << 24;
            case  7: b += k[o+6] << 16;
            case  6: b += k[o+5] << 8;
            case  5: b += k[o+4];
            case  4: a += k[o+3] << 24;
            case  3: a += k[o+2] << 16;
            case  2: a += k[o+1] << 8;
            case  1: a += k[o];
        }

        c ^= b; c -= b<<14 | b>>>18;
        a ^= c; a -= c<<11 | c>>>21;
        b ^= a; b -= a<<25 | a>>>7;
        c ^= b; c -= b<<16 | b>>>16;
        a ^= c; a -= c<<4  | c>>>28;
        b ^= a; b -= a<<14 | a>>>18;
        c ^= b; c -= b<<24 | b>>>8;
    }

    return [b >>> 0, c >>> 0];
}
